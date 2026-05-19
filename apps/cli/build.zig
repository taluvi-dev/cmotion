const std = @import("std");

const ts_runtime_root = "vendor/tree-sitter";
const ts_runtime_lib = ts_runtime_root ++ "/lib/src/lib.c";
const grammar_root = "../../packages/tree-sitter-cmotion";
const grammar_parser = grammar_root ++ "/src/parser.c";
const stb_root = "vendor/stb";
const stb_header = stb_root ++ "/stb_truetype.h";
const stb_impl = "src/stb_impl.c";
const font_file = "vendor/fonts/DMSans-Bold.ttf";

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    requireVendoredDeps(b);

    const c_flags: []const []const u8 = &.{
        "-std=c11",
        "-D_DEFAULT_SOURCE", // tree-sitter uses be16toh/le16toh/fdopen
        "-Wno-unused-but-set-variable",
        "-Wno-unused-variable",
        "-Wno-unused-parameter",
        "-fno-sanitize=undefined",
    };

    const exe_mod = b.createModule(.{
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
        .link_libc = true,
    });

    exe_mod.addIncludePath(b.path(ts_runtime_root ++ "/lib/include"));
    exe_mod.addIncludePath(b.path(ts_runtime_root ++ "/lib/src"));
    exe_mod.addIncludePath(b.path(grammar_root ++ "/src"));
    exe_mod.addIncludePath(b.path(stb_root));

    exe_mod.addCSourceFile(.{ .file = b.path(ts_runtime_lib), .flags = c_flags });
    exe_mod.addCSourceFile(.{ .file = b.path(grammar_parser), .flags = c_flags });
    exe_mod.addCSourceFile(.{ .file = b.path(stb_impl), .flags = c_flags });

    // Expose the bundled font under a named import so `@embedFile`
    // in src/font.zig can reach it — `@embedFile` is gated to the
    // module's package path, so a sibling vendor/ directory needs
    // this indirection.
    exe_mod.addAnonymousImport("font_ttf", .{ .root_source_file = b.path(font_file) });

    const exe = b.addExecutable(.{
        .name = "cmotion",
        .root_module = exe_mod,
    });

    b.installArtifact(exe);

    const run_cmd = b.addRunArtifact(exe);
    run_cmd.step.dependOn(b.getInstallStep());
    if (b.args) |args| run_cmd.addArgs(args);

    const run_step = b.step("run", "Run cmotion (forward args after --)");
    run_step.dependOn(&run_cmd.step);

    const tests = b.addTest(.{ .root_module = exe_mod });
    const run_tests = b.addRunArtifact(tests);
    const test_step = b.step("test", "Run unit tests");
    test_step.dependOn(&run_tests.step);

    // ---- WASM build target ---------------------------------------
    //
    // A second build of the renderer + supporting modules, compiled
    // to wasm32-freestanding for the browser, Cloudflare container,
    // and anything else that can't load the native binary. Same
    // source as the native CLI; the entry point is the only
    // wasm-specific file.
    //
    // Run with: `zig build wasm` → apps/cli/zig-out/bin/cmotion-render.wasm
    const wasm_step = addWasmStep(b);

    // ---- WASM ↔ native parity test --------------------------------
    //
    // Runs `tests/wasm-parity.mjs` under Node. The script renders the
    // same fixture two ways (native CLI, WASM via Node's
    // WebAssembly.instantiate) and asserts byte-equality on the RGB
    // pixel channels. Depends on both artifacts existing.
    const parity_cmd = b.addSystemCommand(&.{ "node", "tests/wasm-parity.mjs" });
    parity_cmd.step.dependOn(b.getInstallStep()); // native exe
    parity_cmd.step.dependOn(wasm_step); // wasm artifact
    const parity_step = b.step("test-parity", "Render a fixture via native + WASM and assert pixel equality");
    parity_step.dependOn(&parity_cmd.step);

    // ---- WASM interpreter smoke test --------------------------------
    //
    // Drives the parse_eval / sample_at exports through Node, parses
    // the resulting JSON value tree, and asserts the expected shape.
    // This is the contract a JS-side renderer (Three.js, canvas, etc.)
    // depends on, so a regression here would break every downstream
    // consumer.
    const interp_cmd = b.addSystemCommand(&.{ "node", "tests/wasm-interp-smoke.mjs" });
    interp_cmd.step.dependOn(wasm_step);
    const interp_step = b.step("test-interp", "Drive the WASM interpreter (parse_eval + sample_at) from Node");
    interp_step.dependOn(&interp_cmd.step);
}

fn addWasmStep(b: *std.Build) *std.Build.Step {
    // wasm32-wasi: gives us a libc layer (wasi-libc bundled with Zig)
    // so tree-sitter's `parser.c` + `lib.c` compile cleanly without
    // hand-rolling shims for `fdopen` / endian intrinsics / etc.
    // Artifact is larger than freestanding (we pay for libc), but it
    // unlocks the *interpreter* in WASM — parse + lower + eval +
    // sampler all live in the artifact, so the browser can drive a
    // renderer (Three.js) from a sampled value tree without round-
    // tripping to a server.
    const wasm_target = b.resolveTargetQuery(.{
        .cpu_arch = .wasm32,
        .os_tag = .wasi,
    });
    const wasm_optimize: std.builtin.OptimizeMode = .ReleaseSmall;

    const wasm_c_flags: []const []const u8 = &.{
        "-std=c11",
        "-D_DEFAULT_SOURCE",
        // tree-sitter's portable/endian.h has no wasi branch; force it onto
        // the `<endian.h>` path so we pick up wasi-libc's musl-derived
        // le16toh/be16toh instead of falling through to `#error`.
        "-DHAVE_ENDIAN_H=1",
        "-Wno-unused-but-set-variable",
        "-Wno-unused-variable",
        "-Wno-unused-parameter",
        "-fno-sanitize=undefined",
    };

    const wasm_mod = b.createModule(.{
        .root_source_file = b.path("src/wasm_entry.zig"),
        .target = wasm_target,
        .optimize = wasm_optimize,
        .link_libc = true,
    });

    // Tree-sitter runtime + cmotion grammar. Same C sources as the
    // native build; wasi-libc picks them up cleanly.
    wasm_mod.addIncludePath(b.path(ts_runtime_root ++ "/lib/include"));
    wasm_mod.addIncludePath(b.path(ts_runtime_root ++ "/lib/src"));
    wasm_mod.addIncludePath(b.path(grammar_root ++ "/src"));
    wasm_mod.addCSourceFile(.{ .file = b.path(ts_runtime_lib), .flags = wasm_c_flags });
    wasm_mod.addCSourceFile(.{ .file = b.path(grammar_parser), .flags = wasm_c_flags });

    const wasm_exe = b.addExecutable(.{
        .name = "cmotion-render",
        .root_module = wasm_mod,
    });
    wasm_exe.rdynamic = true;
    wasm_exe.entry = .disabled;

    const wasm_install = b.addInstallArtifact(wasm_exe, .{});
    const wasm_step = b.step("wasm", "Build the WASM artifact for browser / Cloudflare hosts");
    wasm_step.dependOn(&wasm_install.step);
    return wasm_step;
}

fn requireVendoredDeps(b: *std.Build) void {
    const cwd = std.fs.cwd();
    cwd.access(ts_runtime_lib, .{}) catch {
        std.debug.print(
            \\error: tree-sitter runtime not found at {s}.
            \\
            \\Run apps/cli/scripts/fetch-deps.sh to vendor it, then re-run zig build.
            \\
            \\
        , .{ts_runtime_lib});
        std.process.exit(1);
    };
    cwd.access(grammar_parser, .{}) catch {
        std.debug.print(
            \\error: generated parser.c not found at {s}.
            \\
            \\Run `pnpm --filter @cmotion/tree-sitter-cmotion generate` (or
            \\`tree-sitter generate` inside packages/tree-sitter-cmotion) to
            \\regenerate it.
            \\
            \\
        , .{grammar_parser});
        std.process.exit(1);
    };
    cwd.access(stb_header, .{}) catch {
        std.debug.print(
            \\error: stb_truetype.h not found at {s}.
            \\
            \\Run apps/cli/scripts/fetch-deps.sh to vendor it, then re-run zig build.
            \\
            \\
        , .{stb_header});
        std.process.exit(1);
    };
    cwd.access(font_file, .{}) catch {
        std.debug.print(
            \\error: bundled font not found at {s}.
            \\
            \\Run apps/cli/scripts/fetch-deps.sh to fetch DM Sans Bold, then
            \\re-run zig build.
            \\
            \\
        , .{font_file});
        std.process.exit(1);
    };
    _ = b;
}
