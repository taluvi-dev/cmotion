const std = @import("std");
const diag = @import("../diagnostics.zig");
const Context = @import("../cli.zig").Context;

pub fn run(ctx: Context, args: []const []const u8) !u8 {
    if (args.len == 0) {
        try ctx.emitError(.{
            .code = "CLI002",
            .message = "`parse` requires a source file argument",
            .help = "pass a .cm source file: `cmo parse src/main.cm`",
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
        .message = "`cmotion parse` is not implemented yet",
        .help = "the tree-sitter grammar in packages/tree-sitter-cmotion is still a stub",
        .fix_safety = .@"requires-human-review",
        .repair = .{
            .id = "wire-tree-sitter-grammar",
            .summary = "Implement packages/tree-sitter-cmotion/grammar.js and link it into the CLI build.",
        },
    });
    return 64;
}
