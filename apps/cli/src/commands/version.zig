const std = @import("std");
const diag = @import("../diagnostics.zig");
const Context = @import("../cli.zig").Context;

pub const version_string: []const u8 = "0.0.1";

pub fn run(ctx: Context, args: []const []const u8) !u8 {
    _ = args;
    const w = ctx.stdout;
    if (ctx.options.json) {
        try ctx.openJsonEnvelope(true, &.{});
        try w.writeAll(",\"name\":");
        try diag.writeJsonString(w, "cmotion");
        try w.writeAll(",\"version\":");
        try diag.writeJsonString(w, version_string);
        try ctx.closeJsonEnvelope();
    } else {
        try w.print("cmotion {s}\n", .{version_string});
        try ctx.timing.writeText(w);
    }
    return 0;
}
