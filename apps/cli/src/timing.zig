//! Always-on, monotonic timing for every CLI invocation.
//!
//! One Timing per `cmo` invocation, created in main.zig and threaded
//! through Context. Captures the total wall time from process start
//! through to the end of envelope serialization. No per-stage laps —
//! the total is what consumers (humans and agents) actually care about
//! and keeps the envelope tiny.

const std = @import("std");

pub const Writer = std.Io.Writer;

pub const Timing = struct {
    timer: std.time.Timer,

    pub fn init() !Timing {
        return .{ .timer = try std.time.Timer.start() };
    }

    pub fn totalNs(self: *const Timing) u64 {
        const mut: *Timing = @constCast(self);
        return mut.timer.read();
    }

    pub fn writeJson(self: *const Timing, w: *Writer) !void {
        try w.print("{{\"totalNs\":{d}}}", .{self.totalNs()});
    }

    pub fn writeText(self: *const Timing, w: *Writer) !void {
        try w.print("timing: {d:.3}ms\n", .{nsToMs(self.totalNs())});
    }
};

fn nsToMs(ns: u64) f64 {
    return @as(f64, @floatFromInt(ns)) / 1_000_000.0;
}

test "totalNs is monotonic" {
    const t = try Timing.init();
    const a = t.totalNs();
    const b = t.totalNs();
    try std.testing.expect(b >= a);
}
