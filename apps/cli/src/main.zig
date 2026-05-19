const std = @import("std");
const cli = @import("cli.zig");
const timing = @import("timing.zig");

pub fn main() !u8 {
    var t = try timing.Timing.init();

    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const allocator = arena.allocator();

    const args = try std.process.argsAlloc(allocator);

    var stdout_buf: [4096]u8 = undefined;
    var stderr_buf: [4096]u8 = undefined;
    var stdout_writer = std.fs.File.stdout().writer(&stdout_buf);
    var stderr_writer = std.fs.File.stderr().writer(&stderr_buf);

    const code = try cli.run(
        allocator,
        args,
        &stdout_writer.interface,
        &stderr_writer.interface,
        &t,
    );

    stdout_writer.interface.flush() catch {};
    stderr_writer.interface.flush() catch {};

    return code;
}

test {
    std.testing.refAllDecls(@This());
    std.testing.refAllDecls(@import("tree_sitter.zig"));
    _ = @import("cli.zig");
    _ = @import("diagnostics.zig");
    _ = @import("ast.zig");
    _ = @import("lower.zig");
    _ = @import("timing.zig");
    _ = @import("check.zig");
}
