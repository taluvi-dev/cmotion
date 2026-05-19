const std = @import("std");

const ts_runtime_root = "vendor/tree-sitter";
const ts_runtime_lib = ts_runtime_root ++ "/lib/src/lib.c";
const grammar_root = "../../packages/tree-sitter-cmotion";
const grammar_parser = grammar_root ++ "/src/parser.c";

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    requireVendoredDeps(b);

    const c_flags: []const []const u8 = &.{
        "-std=c11",
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

    exe_mod.addCSourceFile(.{ .file = b.path(ts_runtime_lib), .flags = c_flags });
    exe_mod.addCSourceFile(.{ .file = b.path(grammar_parser), .flags = c_flags });

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
    _ = b;
}
