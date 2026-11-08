//! The `runner "x.y.z";` pin, compared against the version a behaviour
//! change first shipped in.
//!
//! A change that would move pixels of an existing source is opt-in by
//! version: the evaluator asks `atLeast(program.runner, …)` and, if the
//! source opted in, writes the new default into the value tree (e.g.
//! `blend: oklab` on an `animate`). The sampler and renderers then just
//! read the tree. A source with no pin gets the latest behaviour, as
//! the API loader picks the latest runner for it.

const std = @import("std");
const ast = @import("ast.zig");

pub const Version = [3]u32;

/// Parse `"0.0.14"` (quotes optional) into its three parts.
pub fn parse(raw: []const u8) ?Version {
    const text = std.mem.trim(u8, raw, "\"");
    var out: Version = .{ 0, 0, 0 };
    var it = std.mem.splitScalar(u8, text, '.');
    var i: usize = 0;
    while (it.next()) |part| : (i += 1) {
        if (i >= 3) return null;
        out[i] = std.fmt.parseInt(u32, part, 10) catch return null;
    }
    return if (i == 3) out else null;
}

/// True when the source opted into `min` or later, or pinned nothing.
/// An unparseable pin counts as the oldest behaviour.
pub fn atLeast(pin: ?ast.RunnerDecl, min: Version) bool {
    const p = pin orelse return true;
    const v = parse(p.version_raw) orelse return false;
    return std.mem.order(u32, &v, &min) != .lt;
}

test "runner: versions compare part by part" {
    const decl = struct {
        fn of(raw: []const u8) ast.RunnerDecl {
            return .{ .span = .{ .start = 0, .end = 0 }, .version_raw = raw, .version_span = .{ .start = 0, .end = 0 } };
        }
    };
    try std.testing.expect(atLeast(null, .{ 0, 0, 14 }));
    try std.testing.expect(atLeast(decl.of("\"0.0.14\""), .{ 0, 0, 14 }));
    try std.testing.expect(atLeast(decl.of("\"0.1.0\""), .{ 0, 0, 14 }));
    try std.testing.expect(!atLeast(decl.of("\"0.0.13\""), .{ 0, 0, 14 }));
    try std.testing.expect(!atLeast(decl.of("\"0.0.9\""), .{ 0, 0, 14 }));
    try std.testing.expect(!atLeast(decl.of("\"latest\""), .{ 0, 0, 14 }));
}
