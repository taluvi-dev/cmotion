//! 2D vector shapes as outline rings — `ellipse`, `circle`, `polygon`,
//! `star`, `pie`, rounded `rect`, `path` — plus `stroke` and draw-on.
//!
//! One geometry for both renderers: the native renderer fills these
//! rings itself (`render.zig`, `fillRings`), and the web viewer asks the
//! WASM for them (`shape_rings`), so a star or a stroke is the same
//! polygon in the CLI, the editor and a bake.
//!
//! Coordinates are pixels, y down, the shape centred on the origin.
//! Rings are closed (the last point joins the first) and wound the same
//! way, so a non-zero fill unions them: a stroke is the union of one quad
//! per segment and a disc per joint, which gives round joins and caps
//! without polygon offsetting.

const std = @import("std");

pub const Vec2 = struct { x: f64, y: f64 };
pub const Ring = []const Vec2;

pub const Kind = enum { ellipse, circle, polygon, star, pie, rect, path };

/// What a host or the native renderer reads off a shape node.
pub const Spec = struct {
    kind: Kind,
    width: f64 = 0,
    height: f64 = 0,
    radius: f64 = 0,
    /// `star`: the radius of the inner corners (default half `radius`).
    inner_radius: f64 = 0,
    /// `polygon`: sides; `star`: points.
    sides: u32 = 0,
    /// `pie`: the swept angle and where it starts, degrees clockwise
    /// from 12 o'clock.
    angle: f64 = 360,
    start: f64 = 0,
    /// `rect`: the corner radius.
    corner: f64 = 0,
    /// `path`: its points, and whether the last joins the first.
    points: []const [2]f64 = &.{},
    closed: bool = true,
    /// A stroke of this width along the outline, if set.
    stroke_width: ?f64 = null,
    /// Draw-on: how much of the outline the stroke covers, 0..1.
    draw: f64 = 1,
};

pub const Rings = struct {
    fill: []const Ring,
    stroke: []const Ring,
};

/// Segments per full turn for curves, so a circle of radius 500 px
/// stays round.
const curve_segments = 96;

pub fn rings(arena: std.mem.Allocator, spec: Spec) !Rings {
    const outline = try outlineOf(arena, spec);
    const closed = spec.kind != .path or spec.closed;
    const fill: []const Ring = if (closed and outline.len >= 3)
        try oneRing(arena, try ccw(arena, outline))
    else
        &.{};
    const stroke: []const Ring = if (spec.stroke_width) |w|
        try strokeRings(arena, outline, closed, w, std.math.clamp(spec.draw, 0, 1))
    else
        &.{};
    return .{ .fill = fill, .stroke = stroke };
}

fn oneRing(arena: std.mem.Allocator, r: []const Vec2) ![]const Ring {
    const out = try arena.alloc(Ring, 1);
    out[0] = r;
    return out;
}

fn outlineOf(arena: std.mem.Allocator, spec: Spec) ![]const Vec2 {
    var pts: std.ArrayListUnmanaged(Vec2) = .{};
    switch (spec.kind) {
        .ellipse, .circle => {
            const rx = if (spec.kind == .circle) spec.radius else spec.width / 2;
            const ry = if (spec.kind == .circle) spec.radius else spec.height / 2;
            for (0..curve_segments) |i| {
                const a = @as(f64, @floatFromInt(i)) / curve_segments * 2 * std.math.pi;
                try pts.append(arena, .{ .x = rx * @sin(a), .y = -ry * @cos(a) });
            }
        },
        .polygon => {
            const n = @max(spec.sides, 3);
            for (0..n) |i| try pts.append(arena, polar(spec.radius, @as(f64, @floatFromInt(i)) / @as(f64, @floatFromInt(n)) * 360));
        },
        .star => {
            const n = @max(spec.sides, 2);
            const inner = if (spec.inner_radius > 0) spec.inner_radius else spec.radius / 2;
            for (0..n * 2) |i| {
                const r = if (i % 2 == 0) spec.radius else inner;
                try pts.append(arena, polar(r, @as(f64, @floatFromInt(i)) / @as(f64, @floatFromInt(n * 2)) * 360));
            }
        },
        .pie => {
            const sweep = std.math.clamp(spec.angle, 0, 360);
            const steps: usize = @max(2, @as(usize, @intFromFloat(@ceil(sweep / 360 * curve_segments))));
            if (sweep < 360) try pts.append(arena, .{ .x = 0, .y = 0 });
            for (0..steps + @intFromBool(sweep < 360)) |i| {
                const a = spec.start + sweep * @as(f64, @floatFromInt(i)) / @as(f64, @floatFromInt(steps));
                try pts.append(arena, polar(spec.radius, a));
            }
        },
        .rect => {
            const hw = spec.width / 2;
            const hh = spec.height / 2;
            const r = std.math.clamp(spec.corner, 0, @min(hw, hh));
            if (r <= 0) {
                try pts.appendSlice(arena, &.{ .{ .x = -hw, .y = -hh }, .{ .x = hw, .y = -hh }, .{ .x = hw, .y = hh }, .{ .x = -hw, .y = hh } });
            } else {
                // Each corner a quarter circle, clockwise from top-left.
                const corners = [_]struct { cx: f64, cy: f64, a0: f64 }{
                    .{ .cx = -hw + r, .cy = -hh + r, .a0 = 270 },
                    .{ .cx = hw - r, .cy = -hh + r, .a0 = 0 },
                    .{ .cx = hw - r, .cy = hh - r, .a0 = 90 },
                    .{ .cx = -hw + r, .cy = hh - r, .a0 = 180 },
                };
                const per = curve_segments / 4;
                for (corners) |cn| for (0..per + 1) |i| {
                    const p = polar(r, cn.a0 + 90 * @as(f64, @floatFromInt(i)) / @as(f64, @floatFromInt(per)));
                    try pts.append(arena, .{ .x = cn.cx + p.x, .y = cn.cy + p.y });
                };
            }
        },
        .path => for (spec.points) |p| try pts.append(arena, .{ .x = p[0], .y = p[1] }),
    }
    return pts.items;
}

/// A point at `r` from the origin, `deg` clockwise from 12 o'clock.
fn polar(r: f64, deg: f64) Vec2 {
    const a = deg * std.math.pi / 180;
    return .{ .x = r * @sin(a), .y = -r * @cos(a) };
}

fn signedArea(r: []const Vec2) f64 {
    var a: f64 = 0;
    for (r, 0..) |p, i| {
        const q = r[(i + 1) % r.len];
        a += p.x * q.y - q.x * p.y;
    }
    return a / 2;
}

/// The ring wound positively (counter-clockwise in y-up terms), so every
/// ring adds coverage under a non-zero fill.
fn ccw(arena: std.mem.Allocator, r: []const Vec2) ![]const Vec2 {
    if (signedArea(r) >= 0) return r;
    const out = try arena.alloc(Vec2, r.len);
    for (r, 0..) |p, i| out[r.len - 1 - i] = p;
    return out;
}

/// The outline as a polyline, cut to the first `draw` of its length.
fn trimmed(arena: std.mem.Allocator, outline: []const Vec2, closed: bool, draw: f64) ![]const Vec2 {
    var line: std.ArrayListUnmanaged(Vec2) = .{};
    try line.appendSlice(arena, outline);
    if (closed and outline.len > 0) try line.append(arena, outline[0]);
    if (draw >= 1) return line.items;
    var total: f64 = 0;
    for (1..line.items.len) |i| total += dist(line.items[i - 1], line.items[i]);
    var left = total * draw;
    var out: std.ArrayListUnmanaged(Vec2) = .{};
    if (line.items.len == 0 or left <= 0) return out.items;
    try out.append(arena, line.items[0]);
    for (1..line.items.len) |i| {
        const a = line.items[i - 1];
        const b = line.items[i];
        const d = dist(a, b);
        if (d >= left) {
            const k = if (d > 0) left / d else 0;
            try out.append(arena, .{ .x = a.x + (b.x - a.x) * k, .y = a.y + (b.y - a.y) * k });
            break;
        }
        try out.append(arena, b);
        left -= d;
    }
    return out.items;
}

fn dist(a: Vec2, b: Vec2) f64 {
    return @sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
}

fn strokeRings(arena: std.mem.Allocator, outline: []const Vec2, closed: bool, width: f64, draw: f64) ![]const Ring {
    const line = try trimmed(arena, outline, closed, draw);
    var out: std.ArrayListUnmanaged(Ring) = .{};
    if (line.len < 2 or width <= 0) return out.items;
    const hw = width / 2;
    for (1..line.len) |i| {
        const a = line[i - 1];
        const b = line[i];
        const d = dist(a, b);
        if (d == 0) continue;
        const nx = -(b.y - a.y) / d * hw;
        const ny = (b.x - a.x) / d * hw;
        const quad = try arena.alloc(Vec2, 4);
        quad[0] = .{ .x = a.x + nx, .y = a.y + ny };
        quad[1] = .{ .x = b.x + nx, .y = b.y + ny };
        quad[2] = .{ .x = b.x - nx, .y = b.y - ny };
        quad[3] = .{ .x = a.x - nx, .y = a.y - ny };
        try out.append(arena, try ccw(arena, quad));
    }
    // Round joins and caps: a disc at every vertex.
    const disc_n = 24;
    for (line) |p| {
        const disc = try arena.alloc(Vec2, disc_n);
        for (0..disc_n) |i| {
            const a = @as(f64, @floatFromInt(i)) / disc_n * 2 * std.math.pi;
            disc[i] = .{ .x = p.x + hw * @cos(a), .y = p.y + hw * @sin(a) };
        }
        try out.append(arena, try ccw(arena, disc));
    }
    return out.items;
}

/// `{ "fill": [[[x, y], …], …], "stroke": [...] }` for the viewer.
pub fn writeJson(w: *std.Io.Writer, r: Rings) !void {
    try w.writeAll("{\"fill\":");
    try writeRings(w, r.fill);
    try w.writeAll(",\"stroke\":");
    try writeRings(w, r.stroke);
    try w.writeAll("}");
}

fn writeRings(w: *std.Io.Writer, rs: []const Ring) !void {
    try w.writeAll("[");
    for (rs, 0..) |ring, i| {
        if (i != 0) try w.writeAll(",");
        try w.writeAll("[");
        for (ring, 0..) |p, j| {
            if (j != 0) try w.writeAll(",");
            try w.print("[{d:.3},{d:.3}]", .{ p.x, p.y });
        }
        try w.writeAll("]");
    }
    try w.writeAll("]");
}

//
// Tests
//

const testing = std.testing;

fn area(rs: []const Ring) f64 {
    var a: f64 = 0;
    for (rs) |r| a += signedArea(r);
    return a;
}

test "shape2d: shapes enclose about the right area" {
    var arena = std.heap.ArenaAllocator.init(testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const circle = try rings(a, .{ .kind = .circle, .radius = 100 });
    try testing.expectApproxEqRel(@as(f64, std.math.pi * 100 * 100), area(circle.fill), 0.01);
    const rect = try rings(a, .{ .kind = .rect, .width = 200, .height = 100 });
    try testing.expectApproxEqRel(@as(f64, 20000), area(rect.fill), 1e-9);
    const rounded = try rings(a, .{ .kind = .rect, .width = 200, .height = 100, .corner = 20 });
    // Each corner loses r² − πr²/4.
    try testing.expectApproxEqRel(@as(f64, 20000 - 4 * (400 - std.math.pi * 100)), area(rounded.fill), 0.01);
    const half = try rings(a, .{ .kind = .pie, .radius = 100, .angle = 180 });
    try testing.expectApproxEqRel(@as(f64, std.math.pi * 100 * 100 / 2.0), area(half.fill), 0.01);
    const star = try rings(a, .{ .kind = .star, .radius = 100, .sides = 5 });
    try testing.expectEqual(@as(usize, 10), star.fill[0].len);
    const hex = try rings(a, .{ .kind = .polygon, .radius = 100, .sides = 6 });
    try testing.expectApproxEqRel(@as(f64, 3 * @sqrt(3.0) / 2.0 * 100 * 100), area(hex.fill), 1e-9);
}

test "shape2d: a stroke covers its length, draw-on covers part of it" {
    var arena = std.heap.ArenaAllocator.init(testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const pts = [_][2]f64{ .{ -100, 0 }, .{ 100, 0 } };
    const full = try rings(a, .{ .kind = .path, .points = &pts, .closed = false, .stroke_width = 10 });
    try testing.expectEqual(@as(usize, 0), full.fill.len);
    // One quad (200 × 10) and two caps.
    try testing.expectEqual(@as(usize, 3), full.stroke.len);
    try testing.expectApproxEqRel(@as(f64, 2000), signedArea(full.stroke[0]), 1e-9);
    const half = try rings(a, .{ .kind = .path, .points = &pts, .closed = false, .stroke_width = 10, .draw = 0.5 });
    try testing.expectApproxEqRel(@as(f64, 1000), signedArea(half.stroke[0]), 1e-9);
    const none = try rings(a, .{ .kind = .path, .points = &pts, .closed = false, .stroke_width = 10, .draw = 0 });
    try testing.expectEqual(@as(usize, 0), none.stroke.len);
}
