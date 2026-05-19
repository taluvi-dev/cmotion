const std = @import("std");
const diag = @import("../diagnostics.zig");
const Context = @import("../cli.zig").Context;

/// Long-form explanations for diagnostic codes. Stable text per code; agents
/// look these up via `cmo explain <CODE>` when they need more than the
/// one-line `message` in a diagnostic packet.
const Entry = struct {
    code: []const u8,
    title: []const u8,
    body: []const u8,
};

const entries = [_]Entry{
    .{
        .code = "CLI001",
        .title = "Unknown subcommand",
        .body =
        \\The CLI was invoked with a subcommand it does not recognise.
        \\Run `cmo help` to see the list of available subcommands.
        ,
    },
    .{
        .code = "CLI002",
        .title = "Missing required argument",
        .body =
        \\A subcommand expected a positional argument that was not supplied.
        \\Most subcommands take exactly one .cm source file path.
        ,
    },
    .{
        .code = "CLI003",
        .title = "Unknown flag",
        .body =
        \\A flag was passed that this subcommand does not accept. Global flags
        \\are `--json` and `--no-color`; subcommand-specific flags are listed
        \\in `cmo <subcommand> --help`.
        ,
    },
    .{
        .code = "CLI004",
        .title = "Subcommand not yet implemented",
        .body =
        \\The subcommand exists but its implementation is still a stub.
        \\See the cmotion roadmap in README.md for the order in which stages
        \\land. The diagnostic's repair id names the stage that needs to ship.
        ,
    },
    .{
        .code = "CLI005",
        .title = "Source file not found",
        .body =
        \\The path passed to the subcommand does not resolve to a readable
        \\file. Check the path, file permissions, and current working
        \\directory.
        ,
    },
    .{
        .code = "CLI006",
        .title = "No explanation registered",
        .body =
        \\`cmo explain CODE` was called with a code that has no long-form
        \\entry. Usually means the code is mistyped or the binary is
        \\older than the code you're looking up. Run `cmo help` for the
        \\list of subcommands, or visit /language/diagnostics on the
        \\site for the full code table.
        ,
    },
    .{
        .code = "PAR000",
        .title = "Parser failed to initialise",
        .body =
        \\The tree-sitter parser could not be created or could not accept
        \\the generated cmotion language. This is an internal error — the
        \\runtime and the grammar are out of sync, or the binary was built
        \\against the wrong runtime version.
        ,
    },
    .{
        .code = "PAR100",
        .title = "Syntax error in source",
        .body =
        \\The parser produced a tree containing ERROR or MISSING nodes.
        \\The span on the diagnostic points at the first invalid token.
        \\Run `cmo parse --json <file>` to inspect the full CST and locate
        \\every error node.
        ,
    },
    .{
        .code = "NAM003",
        .title = "Unknown identifier",
        .body =
        \\A name was referenced that resolves to nothing in the current
        \\scope chain (local lets, parameters, top-level declarations,
        \\imported names). The check is suppressed when any `use foo.*`
        \\wildcard import is present, since we don't yet know what names
        \\that brings into scope — once module manifests land, NAM003
        \\will fire through wildcards too.
        \\
        \\The repair is one of:
        \\  - add a `let name = ...;` before the use site
        \\  - bring the name into scope with `use mod.name;` or
        \\    `use mod as alias;`
        \\  - fix a typo
        ,
    },
    .{
        .code = "NAM004",
        .title = "Forward reference within a block",
        .body =
        \\A name was referenced before its `let` declaration in the same
        \\block. Block lets are lexically scoped — they're visible only
        \\to code that appears after their declaration. The diagnostic's
        \\`actual` field names the line and column where the binding
        \\actually lives so an agent can choose between two repairs:
        \\
        \\  - move the declaration above the use (when the order is the
        \\    only issue), or
        \\  - hoist the declaration to an enclosing scope (when several
        \\    lets need to see it)
        \\
        \\Distinct from NAM003 (unknown identifier): if the name is
        \\never declared anywhere in the block, you get NAM003 instead.
        \\Self-reference (`let x = x + 1`) is also NAM003 — the name
        \\doesn't exist yet at that point even though it will.
        ,
    },
    .{
        .code = "NAM005",
        .title = "Duplicate top-level declaration",
        .body =
        \\Two top-level declarations resolve to the same local name. The
        \\offending span points at the duplicate; the diagnostic's
        \\`actual` field names the previous declaration's location.
        \\Rename one of them, or remove the duplicate.
        ,
    },
    .{
        .code = "NAM006",
        .title = "Duplicate parameter name",
        .body =
        \\A signature lists the same parameter name twice. Parameter
        \\names must be unique within a single component / scene /
        \\filter / lambda. Rename one of the parameters.
        ,
    },
    .{
        .code = "LWR000",
        .title = "Lowering failed on a clean CST",
        .body =
        \\The tree-sitter parse produced no ERROR/MISSING nodes, but
        \\src/lower.zig failed to map some node kind into the AST. This
        \\means the lowering pass has a gap. The diagnostic's `message`
        \\field names the Zig error variant that fired.
        ,
    },
    .{
        .code = "TYP002",
        .title = "Type mismatch on an annotated value",
        .body =
        \\An annotated `let`, `param`, or `export` was assigned a literal
        \\value whose category doesn't match the annotation. The check is
        \\deliberately narrow: it only fires when the annotation is a
        \\simple type name with a known category (String, Bool, Color, or
        \\one of the number-like types: Number, Int, Float, Duration,
        \\Time, Angle, Length, Pixels, Frequency, Tempo, Bars, Beats,
        \\Percent) AND the value is a literal (number, string, bool,
        \\color). Anything more complex — calls, identifiers, generic
        \\types — is left to the full typechecker once it lands.
        \\
        \\Repair: change the value to match the type, or change the type
        \\annotation to match the value. Unit-category checks within the
        \\number family (e.g. `let x: Duration = 6deg`) belong to UNT*
        \\codes, not TYP002.
        ,
    },
    .{
        .code = "UNT001",
        .title = "Unit category mismatch",
        .body =
        \\An annotated number-family `let`, `param`, or `export` was
        \\assigned a number literal whose unit suffix lives in the wrong
        \\category. Type-to-unit-category mapping:
        \\
        \\  Duration / Time  -> s, ms, us, ns
        \\  Angle            -> deg, rad, turn
        \\  Length / Pixels  -> px
        \\  Percent          -> %
        \\  Frequency        -> hz, khz
        \\  Tempo            -> bpm
        \\  Bars             -> bars
        \\  Beats            -> beats
        \\  Number/Int/Float -> no unit suffix
        \\
        \\Example: `let timeout: Duration = 6deg` -> UNT001, because
        \\Duration expects a Time-category literal (s/ms/us/ns), and
        \\`6deg` is in the Angle category.
        \\
        \\If the literal has NO unit at all (`let x: Duration = 42`),
        \\see UNT002 (missing required unit) instead.
        ,
    },
    .{
        .code = "UNT002",
        .title = "Missing required unit",
        .body =
        \\An annotated number-family `let`, `param`, or `export` was
        \\assigned a unitless number literal where a unit is required.
        \\The repair summary names the canonical unit for the annotated
        \\category so an agent can fix it in one edit (`42` -> `42s` for
        \\Duration, `42` -> `42deg` for Angle, and so on).
        \\
        \\Canonical units (also used in the repair suggestion):
        \\
        \\  Duration / Time   -> 's'
        \\  Angle             -> 'deg'
        \\  Length / Pixels   -> 'px'
        \\  Percent           -> '%'
        \\  Frequency         -> 'hz'
        \\  Tempo             -> 'bpm'
        \\  Bars              -> 'bars'
        \\  Beats             -> 'beats'
        \\
        \\Silent for `Number` / `Int` / `Float` annotations, which
        \\actually require an unmarked literal.
        ,
    },
    .{
        .code = "CLI007",
        .title = "Unknown fmt flag",
        .body =
        \\`cmo fmt` accepts only `--write` (rewrite the file in place)
        \\and `--check` (exit non-zero when the file would change).
        \\Global flags like `--json` and `--no-color` work as usual.
        \\Any other flag is rejected to keep the surface tight while
        \\the formatter is still v0.
        ,
    },
    .{
        .code = "CLI008",
        .title = "Too many source files passed to fmt",
        .body =
        \\`cmo fmt` is single-file for now. Pass exactly one .cm path
        \\and loop in your shell for multiple files
        \\(`for f in src/*.cm; do cmo fmt --write "$f"; done`).
        \\A batch mode will land when there's a reason to coordinate
        \\across files (e.g. import sorting that spans a project).
        ,
    },
    .{
        .code = "CLI009",
        .title = "--write and --check are mutually exclusive",
        .body =
        \\`--write` rewrites the file in place; `--check` only reports
        \\whether the file would change. Passing both is ambiguous, so
        \\the CLI refuses. Use `--check` in CI to fail the build on
        \\unformatted code, and `--write` locally to apply the rewrite.
        ,
    },
    .{
        .code = "CLI010",
        .title = "Could not write formatted output",
        .body =
        \\`cmo fmt --write` produced a formatted buffer but the write
        \\to the source file failed. Common causes: the file is
        \\read-only, the directory is missing, or the filesystem is
        \\out of space. Re-run after fixing the underlying I/O error.
        \\To get the formatted output without rewriting the file, drop
        \\`--write` (default mode prints to stdout) or use `--json`
        \\and read the `formatted` field from the envelope.
        ,
    },
    .{
        .code = "FMT001",
        .title = "File is not formatted",
        .body =
        \\`cmo fmt --check` ran the formatter and the result differs
        \\from the source on disk. The check is byte-exact: any change
        \\in whitespace, ordering, or canonicalised syntax counts.
        \\Run `cmo fmt --write <path>` to apply the rewrite. In CI,
        \\the non-zero exit code is the signal — the diagnostic
        \\itself doesn't include the diff (use `cmo fmt <path>` and
        \\diff against the source if you need to see what would change).
        ,
    },
};

pub fn run(ctx: Context, args: []const []const u8) !u8 {
    if (args.len == 0) {
        try ctx.emitError(.{
            .code = "CLI002",
            .message = "`explain` requires a diagnostic code",
            .help = "pass a diagnostic code: `cmo explain CLI001`",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "supply-diagnostic-code",
                .summary = "Add a diagnostic code (e.g. CLI001) as the first positional argument.",
            },
        });
        return 2;
    }

    const code = args[0];
    const entry = lookup(code) orelse {
        try ctx.emitError(.{
            .code = "CLI006",
            .message = try std.fmt.allocPrint(ctx.allocator, "no explanation registered for '{s}'", .{code}),
            .help = "diagnostic codes are namespaced; see README.md for the current set",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "register-diagnostic-code",
                .summary = "Add an entry to src/commands/explain.zig if this code should exist.",
            },
        });
        return 2;
    };

    const w = ctx.stdout;
    if (ctx.options.json) {
        try ctx.openJsonEnvelope(true, &.{});
        try w.writeAll(",\"code\":");
        try diag.writeJsonString(w, entry.code);
        try w.writeAll(",\"title\":");
        try diag.writeJsonString(w, entry.title);
        try w.writeAll(",\"body\":");
        try diag.writeJsonString(w, entry.body);
        try ctx.closeJsonEnvelope();
    } else {
        try w.print("{s}: {s}\n\n{s}\n", .{ entry.code, entry.title, entry.body });
        try ctx.timing.writeText(w);
    }
    return 0;
}

fn lookup(code: []const u8) ?Entry {
    for (entries) |e| if (std.mem.eql(u8, e.code, code)) return e;
    return null;
}

// Every diagnostic code emitted anywhere in the CLI must resolve through
// `lookup`, or `cmo explain CODE` falls back to CLI006 ("no explanation
// registered"). Past regressions shipped because the emit site and the
// explain table drifted; this test closes the loop by scanning the source
// for emit-site code literals (the field assignment used in every
// `ctx.emit*` call) and asserting every one is registered.
//
// The file list is hand-maintained: adding a new module with diagnostics
// means adding it here. If a file is missing, its codes are simply not
// checked — there's no way to recover the directory listing at comptime.
test "every emitted diagnostic code has an explain entry" {
    const sources = [_][]const u8{
        @embedFile("../cli.zig"),
        @embedFile("../check.zig"),
        @embedFile("../diagnostics.zig"),
        @embedFile("../fmt.zig"),
        @embedFile("../lower.zig"),
        @embedFile("../main.zig"),
        @embedFile("../tree_sitter.zig"),
        @embedFile("check.zig"),
        @embedFile("explain.zig"),
        @embedFile("fmt.zig"),
        @embedFile("parse.zig"),
        @embedFile("version.zig"),
    };

    const needle = ".code = \"";
    var missing: u32 = 0;
    for (sources) |src| {
        var i: usize = 0;
        while (std.mem.indexOfPos(u8, src, i, needle)) |hit| {
            const code_start = hit + needle.len;
            const code_end = std.mem.indexOfScalarPos(u8, src, code_start, '"') orelse {
                i = code_start;
                continue;
            };
            const code = src[code_start..code_end];
            if (lookup(code) == null) {
                std.debug.print("emitted code '{s}' has no explain entry\n", .{code});
                missing += 1;
            }
            i = code_end + 1;
        }
    }
    try std.testing.expectEqual(@as(u32, 0), missing);
}
