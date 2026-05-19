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
