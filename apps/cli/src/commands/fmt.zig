const std = @import("std");
const diag = @import("../diagnostics.zig");
const Context = @import("../cli.zig").Context;

pub fn run(ctx: Context, args: []const []const u8) !u8 {
    if (args.len == 0) {
        try ctx.emitError(.{
            .code = "CLI002",
            .message = "`fmt` requires a source file argument",
            .help = "pass a .cm source file: `cmo fmt src/main.cm`",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "supply-source-file",
                .summary = "Add a single .cm source file as the first positional argument.",
            },
        });
        return 2;
    }

    try ctx.emitError(.{
        .code = "CLI004",
        .message = "`cmotion fmt` is not implemented yet",
        .help = "formatter is gated on the tree-sitter grammar landing",
        .fix_safety = .@"format-only",
        .repair = .{
            .id = "implement-formatter",
            .summary = "Implement a deterministic pretty-printer over the tree-sitter CST.",
        },
    });
    return 64;
}
