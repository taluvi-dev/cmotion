const std = @import("std");
const cli = @import("cli.zig");

pub fn main() !u8 {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const allocator = arena.allocator();

    const args = try std.process.argsAlloc(allocator);
    return cli.run(allocator, args);
}

test {
    std.testing.refAllDecls(@This());
    _ = @import("cli.zig");
    _ = @import("diagnostics.zig");
}
