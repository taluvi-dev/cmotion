const std = @import("std");
const Context = @import("../cli.zig").Context;

pub const version_string: []const u8 = "0.0.1";

pub fn run(ctx: Context, args: []const []const u8) !u8 {
    _ = args;
    if (ctx.options.json) {
        try ctx.stdout.writer().print(
            "{{\"schemaVersion\":1,\"name\":\"cmotion\",\"version\":\"{s}\"}}\n",
            .{version_string},
        );
    } else {
        try ctx.stdout.writer().print("cmotion {s}\n", .{version_string});
    }
    return 0;
}
