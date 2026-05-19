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
