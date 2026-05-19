const std = @import("std");
const diag = @import("../diagnostics.zig");
const Context = @import("../cli.zig").Context;

pub fn run(ctx: Context, args: []const []const u8) !u8 {
    if (args.len == 0) {
        try ctx.emitError(.{
            .code = "CLI002",
            .message = "`check` requires a source file argument",
            .help = "pass a .cm source file: `cmo check src/main.cm`",
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
        .message = "`cmotion check` is not implemented yet",
        .help = "type-checker stage will land after the parser and AST stages",
        .fix_safety = .@"requires-human-review",
        .repair = .{
            .id = "implement-type-checker",
            .summary = "Implement the typechecker against the AST emitted by `cmotion parse`.",
        },
    });
    return 64;
}
