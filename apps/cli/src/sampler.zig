//! Stream sampler — turns a video-stream *description* (the Value tree
//! emitted by `eval.zig`) into a still-frame description at a specific
//! time `t`. Mirrors the cmajor pattern where a `processor` is a
//! function of time and the runtime drives it at a sample rate.
//!
//! Today the sampler resolves every `Constructed("animate", ...)`
//! staging value into its interpolated value at `t`. Everything else
//! (rect, vec3, compose, color components, ...) is preserved verbatim
//! with its sub-trees recursed through. The output is the same `Value`
//! shape `eval.zig` produces — same JSON contract, same renderer-facing
//! tree. That's the boundary the WIT `render: func(time-samples, scene)
//! -> frame` will sit on: this module gives you the *frame description*;
//! the renderer (stage 6 CanvasKit / stage 7 WGSL) turns it into pixels.
//!
//! Scope of v0:
//!   - Linear interpolation between adjacent keyframes for `number`
//!     values. The interpolated number takes the first keyframe's unit
//!     (the EBNF lets keyframes have different units; we don't try to
//!     reconcile yet — that lands with stage-2 unit algebra).
//!   - `opts.repeat == Constructed("forever", [])` wraps `t` modulo the
//!     keyframe span. Other `repeat:` values are silently ignored for
//!     now (treated as "no repeat").
//!   - `opts.easing == Constructed("easing.<name>", [])` is *recognised*
//!     but ignored — every animation is linear in v0. The easing name
//!     stays in the opts of any nested animate that's not itself the
//!     direct sample target, so the renderer can still see it.
//!   - Non-number keyframe values (colors, records) use floor sampling
//!     — the value of the keyframe at or before `t` is returned. Linear
//!     blending of colors lands when we pin down a working space.
//!
//! Out of scope (will surface as no-ops or pass-throughs):
//!   - Easing curves (linear only).
//!   - Spring / inertial animation.
//!   - Color-space interpolation.
//!   - `delay`, `direction`, multi-segment timelines.

const std = @import("std");
const value = @import("value.zig");
const ast = @import("ast.zig");

pub const SampleError = error{OutOfMemory};

pub const Value = value.Value;

/// Sample a Value at time `t_seconds`. Allocates the new (or unchanged)
/// tree in `arena`. The input value is treated as read-only.
pub fn sampleAt(
    arena: std.mem.Allocator,
    v: Value,
    t_seconds: f64,
) SampleError!Value {
    return switch (v) {
        .nil, .number, .string, .@"bool", .lambda => v,
        .color => |c| .{ .color = try sampleColor(arena, c, t_seconds) },
        .array => |a| blk: {
            const elems = try arena.alloc(Value, a.elems.len);
            for (a.elems, 0..) |elem, i| elems[i] = try sampleAt(arena, elem, t_seconds);
            break :blk .{ .array = .{ .elems = elems } };
        },
        .record => |r| blk: {
            const fields = try arena.alloc(value.Field, r.fields.len);
            for (r.fields, 0..) |f, i| fields[i] = .{
                .name = f.name,
                .value = try sampleAt(arena, f.value, t_seconds),
            };
            break :blk .{ .record = .{ .fields = fields } };
        },
        .constructed => |c| try sampleConstructed(arena, c, t_seconds),
    };
}

fn sampleColor(
    arena: std.mem.Allocator,
    c: value.Color,
    t: f64,
) SampleError!value.Color {
    return switch (c) {
        .hex => c,
        .oklch => |v| .{ .oklch = .{
            .l = try boxSample(arena, v.l.*, t),
            .c = try boxSample(arena, v.c.*, t),
            .h = try boxSample(arena, v.h.*, t),
        } },
        .oklab => |v| .{ .oklab = .{
            .l = try boxSample(arena, v.l.*, t),
            .a = try boxSample(arena, v.a.*, t),
            .b = try boxSample(arena, v.b.*, t),
        } },
        .srgb => |v| .{ .srgb = .{
            .r = try boxSample(arena, v.r.*, t),
            .g = try boxSample(arena, v.g.*, t),
            .b = try boxSample(arena, v.b.*, t),
        } },
    };
}

fn boxSample(arena: std.mem.Allocator, v: Value, t: f64) SampleError!*const Value {
    const sampled = try sampleAt(arena, v, t);
    const slot = try arena.create(Value);
    slot.* = sampled;
    return slot;
}

fn sampleConstructed(
    arena: std.mem.Allocator,
    c: value.Constructed,
    t: f64,
) SampleError!Value {
    // If this is an animate(...) staging value, collapse it to its
    // sampled value at t. Otherwise just recurse into its fields.
    if (std.mem.eql(u8, c.name, "animate")) {
        if (try tryEvalAnimate(arena, c, t)) |sampled| return sampled;
        // Malformed — fall through to the verbatim recursion below so
        // the structure stays inspectable.
    }
    const fields = try arena.alloc(value.Field, c.fields.len);
    for (c.fields, 0..) |f, i| fields[i] = .{
        .name = f.name,
        .value = try sampleAt(arena, f.value, t),
    };
    return .{ .constructed = .{ .name = c.name, .fields = fields } };
}

/// Resolve an `animate(...)` Constructed to its value at `t`, or return
/// null if the shape doesn't look like a well-formed animation (the
/// caller falls back to verbatim recursion in that case).
fn tryEvalAnimate(
    arena: std.mem.Allocator,
    c: value.Constructed,
    t: f64,
) SampleError!?Value {
    var keyframes_arr: ?value.Array = null;
    var opts_rec: ?value.Record = null;
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "keyframes") and f.value == .array) {
            keyframes_arr = f.value.array;
        } else if (std.mem.eql(u8, f.name, "opts") and f.value == .record) {
            opts_rec = f.value.record;
        }
    }
    const kfs = keyframes_arr orelse return null;
    if (kfs.elems.len == 0) return null;

    // Resolve keyframes — each one is a record `{at: number, value: ...}`.
    const times = try arena.alloc(f64, kfs.elems.len);
    const values = try arena.alloc(Value, kfs.elems.len);
    for (kfs.elems, 0..) |elem, i| {
        if (elem != .record) return null;
        var at_v: ?Value = null;
        var val_v: ?Value = null;
        for (elem.record.fields) |f| {
            if (std.mem.eql(u8, f.name, "at")) at_v = f.value;
            if (std.mem.eql(u8, f.name, "value")) val_v = f.value;
        }
        const at = at_v orelse return null;
        if (at != .number) return null;
        times[i] = numberToSeconds(at.number);
        // Sample the keyframe's value too — handles `value:` containing
        // another animate (uncommon but the type doesn't forbid it).
        values[i] = try sampleAt(arena, val_v orelse return null, t);
    }

    const repeat_forever = opts_rec != null and isForever(opts_rec.?);
    return interpolate(times, values, t, repeat_forever);
}

fn isForever(opts: value.Record) bool {
    for (opts.fields) |f| {
        if (!std.mem.eql(u8, f.name, "repeat")) continue;
        return switch (f.value) {
            .constructed => |c| std.mem.eql(u8, c.name, "forever") and c.fields.len == 0,
            else => false,
        };
    }
    return false;
}

fn interpolate(
    times: []const f64,
    values: []const Value,
    t_in: f64,
    repeat_forever: bool,
) Value {
    if (times.len == 1) return values[0];

    const t_min = times[0];
    const t_max = times[times.len - 1];
    var t = t_in;

    // Wrap when the animation loops. We wrap into the half-open span
    // [t_min, t_max) so the loop endpoint connects cleanly to its start.
    if (repeat_forever and t_max > t_min) {
        const span = t_max - t_min;
        t = t_min + @mod(t_in - t_min, span);
    }

    if (t <= t_min) return values[0];
    if (t >= t_max) return values[values.len - 1];

    // Find the bracketing pair. Linear scan is fine — animations have
    // a handful of keyframes, not thousands.
    var i: usize = 0;
    while (i + 1 < times.len and t > times[i + 1]) i += 1;
    const lo_t = times[i];
    const hi_t = times[i + 1];
    if (hi_t == lo_t) return values[i];
    const frac = (t - lo_t) / (hi_t - lo_t);
    return interpolatePair(values[i], values[i + 1], frac);
}

fn interpolatePair(a: Value, b: Value, frac: f64) Value {
    // Numbers blend linearly, preserving the first keyframe's unit.
    // Anything else falls back to floor sampling for now.
    if (a == .number and b == .number) {
        return .{ .number = .{
            .value = a.number.value + frac * (b.number.value - a.number.value),
            .unit = a.number.unit,
        } };
    }
    return if (frac < 1.0) a else b;
}

fn numberToSeconds(n: value.Number) f64 {
    const unit = n.unit orelse return n.value;
    return switch (unit) {
        .s => n.value,
        .ms => n.value / 1_000.0,
        .us => n.value / 1_000_000.0,
        .ns => n.value / 1_000_000_000.0,
        else => n.value, // non-time units sampled as raw seconds — caller's call
    };
}

/// Parse a duration spec accepted on the CLI (`--at 1.5s`, `500ms`, ...).
/// Returns seconds as f64. Errors if the input isn't a recognised
/// duration; callers turn that into a CLI-level diagnostic.
pub const ParseError = error{InvalidDuration};

pub fn parseDuration(text: []const u8) ParseError!f64 {
    if (text.len == 0) return error.InvalidDuration;

    // Split into digit part and unit part. We accept ASCII digits, one
    // optional dot, and an optional unit suffix (s/ms/us/ns). No sign,
    // no underscores — keep the CLI surface narrow.
    var i: usize = 0;
    var saw_dot = false;
    while (i < text.len) : (i += 1) {
        const ch = text[i];
        if (ch >= '0' and ch <= '9') continue;
        if (ch == '.' and !saw_dot) {
            saw_dot = true;
            continue;
        }
        break;
    }
    if (i == 0) return error.InvalidDuration;

    const digits = text[0..i];
    const unit = text[i..];
    const v = std.fmt.parseFloat(f64, digits) catch return error.InvalidDuration;

    if (unit.len == 0 or std.mem.eql(u8, unit, "s")) return v;
    if (std.mem.eql(u8, unit, "ms")) return v / 1_000.0;
    if (std.mem.eql(u8, unit, "us")) return v / 1_000_000.0;
    if (std.mem.eql(u8, unit, "ns")) return v / 1_000_000_000.0;
    return error.InvalidDuration;
}

//
// Tests
//

test "parseDuration: unit-suffixed forms" {
    try std.testing.expectEqual(@as(f64, 1.5), try parseDuration("1.5s"));
    try std.testing.expectEqual(@as(f64, 0.5), try parseDuration("500ms"));
    try std.testing.expectEqual(@as(f64, 0.000001), try parseDuration("1us"));
    try std.testing.expectEqual(@as(f64, 0.000000001), try parseDuration("1ns"));
    try std.testing.expectEqual(@as(f64, 2), try parseDuration("2"));
}

test "parseDuration: rejects junk" {
    try std.testing.expectError(error.InvalidDuration, parseDuration(""));
    try std.testing.expectError(error.InvalidDuration, parseDuration("abc"));
    try std.testing.expectError(error.InvalidDuration, parseDuration("1.5px"));
    try std.testing.expectError(error.InvalidDuration, parseDuration("1.2.3s"));
}

fn buildAnimate(arena: std.mem.Allocator, keyframes: []const struct { at: f64, value: f64 }, forever: bool) !Value {
    const kfs = try arena.alloc(Value, keyframes.len);
    for (keyframes, 0..) |kf, i| {
        const fs = try arena.alloc(value.Field, 2);
        fs[0] = .{ .name = "at", .value = .{ .number = .{ .value = kf.at, .unit = .s } } };
        fs[1] = .{ .name = "value", .value = .{ .number = .{ .value = kf.value, .unit = .deg } } };
        kfs[i] = .{ .record = .{ .fields = fs } };
    }
    var opts: Value = .nil;
    if (forever) {
        const opts_fs = try arena.alloc(value.Field, 1);
        opts_fs[0] = .{
            .name = "repeat",
            .value = .{ .constructed = .{ .name = "forever", .fields = &.{} } },
        };
        opts = .{ .record = .{ .fields = opts_fs } };
    }
    const top_fs = try arena.alloc(value.Field, 2);
    top_fs[0] = .{ .name = "keyframes", .value = .{ .array = .{ .elems = kfs } } };
    top_fs[1] = .{ .name = "opts", .value = opts };
    return .{ .constructed = .{ .name = "animate", .fields = top_fs } };
}

test "sampleAt: linear interpolation between two keyframes" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const anim = try buildAnimate(a, &.{ .{ .at = 0, .value = 0 }, .{ .at = 4, .value = 360 } }, false);

    const sampled = try sampleAt(a, anim, 2.0);
    try std.testing.expectEqual(@as(f64, 180), sampled.number.value);
    try std.testing.expectEqual(ast.Unit.deg, sampled.number.unit.?);
}

test "sampleAt: clamps before first and after last keyframe" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const anim = try buildAnimate(a, &.{ .{ .at = 1, .value = 10 }, .{ .at = 3, .value = 30 } }, false);

    const before = try sampleAt(a, anim, 0.0);
    const after = try sampleAt(a, anim, 10.0);
    try std.testing.expectEqual(@as(f64, 10), before.number.value);
    try std.testing.expectEqual(@as(f64, 30), after.number.value);
}

test "sampleAt: repeat: forever wraps modulo the span" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const anim = try buildAnimate(a, &.{ .{ .at = 0, .value = 0 }, .{ .at = 4, .value = 360 } }, true);

    // t=6 wraps to 2 → halfway → 180deg.
    const wrapped = try sampleAt(a, anim, 6.0);
    try std.testing.expectApproxEqAbs(@as(f64, 180), wrapped.number.value, 1e-9);
}

test "sampleAt: passes plain values through unchanged" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    const n = Value{ .number = .{ .value = 42, .unit = .px } };
    const sampled = try sampleAt(a, n, 1.0);
    try std.testing.expectEqual(@as(f64, 42), sampled.number.value);
    try std.testing.expectEqual(ast.Unit.px, sampled.number.unit.?);
}

test "sampleAt: recurses into Constructed fields and array elems" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // rect(width: animate(0s => 0px, 2s => 100px))
    const w_kfs = try a.alloc(Value, 2);
    inline for (.{ .{ 0.0, 0.0 }, .{ 2.0, 100.0 } }, 0..) |pair, i| {
        const fs = try a.alloc(value.Field, 2);
        fs[0] = .{ .name = "at", .value = .{ .number = .{ .value = pair[0], .unit = .s } } };
        fs[1] = .{ .name = "value", .value = .{ .number = .{ .value = pair[1], .unit = .px } } };
        w_kfs[i] = .{ .record = .{ .fields = fs } };
    }
    const w_top = try a.alloc(value.Field, 2);
    w_top[0] = .{ .name = "keyframes", .value = .{ .array = .{ .elems = w_kfs } } };
    w_top[1] = .{ .name = "opts", .value = .nil };
    const w_anim = Value{ .constructed = .{ .name = "animate", .fields = w_top } };

    const rect_fs = try a.alloc(value.Field, 1);
    rect_fs[0] = .{ .name = "width", .value = w_anim };
    const rect = Value{ .constructed = .{ .name = "rect", .fields = rect_fs } };

    const sampled = try sampleAt(a, rect, 1.0);
    try std.testing.expectEqualStrings("rect", sampled.constructed.name);
    try std.testing.expectEqualStrings("width", sampled.constructed.fields[0].name);
    try std.testing.expectEqual(@as(f64, 50), sampled.constructed.fields[0].value.number.value);
}
