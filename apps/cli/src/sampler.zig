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
//! Scope:
//!   - Interpolation between adjacent keyframes for `number` values.
//!     The interpolated number takes the first keyframe's unit (the
//!     EBNF lets keyframes have different units; we don't try to
//!     reconcile yet — that lands with stage-2 unit algebra).
//!   - `opts.repeat == Constructed("forever", [])` wraps `t` modulo
//!     the keyframe span. Other `repeat:` values are silently
//!     ignored for now (treated as "no repeat").
//!   - `opts.easing == Constructed("easing.<name>", [])` applies the
//!     named curve to the interpolation fraction. Supported names:
//!     `linear`, `in_cubic`, `out_cubic`, `in_out_cubic`, `in_quad`,
//!     `out_quad`, `in_out_quad`. Unknown names fall back to linear.
//!   - `wave(amplitude, period)` resolves to `amplitude · sin(2π·t /
//!     period)` — continuous trig oscillation, not keyframes. The
//!     amplitude's unit (deg, rad, px, …) carries through to the
//!     output number.
//!   - Non-number keyframe values (colors, records) use floor sampling
//!     — the value of the keyframe at or before `t` is returned.
//!     Linear blending of colors lands when we pin down a working
//!     space.
//!
//! Out of scope (will surface as no-ops or pass-throughs):
//!   - Spring / inertial animation.
//!   - Color-space interpolation.
//!   - `delay`, `direction`, multi-segment timelines.
//!   - Cubic-bezier control points (`bezier(x1, y1, x2, y2)`); the
//!     named curves cover the common cases.

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
    // animate(...) and wave(...) collapse to scalar values at t.
    // Anything else just recurses into its fields.
    if (std.mem.eql(u8, c.name, "animate")) {
        if (try tryEvalAnimate(arena, c, t)) |sampled| return sampled;
        // Malformed — fall through to the verbatim recursion below so
        // the structure stays inspectable.
    } else if (std.mem.eql(u8, c.name, "wave")) {
        if (tryEvalWave(c, t)) |sampled| return sampled;
    }
    const fields = try arena.alloc(value.Field, c.fields.len);
    for (c.fields, 0..) |f, i| fields[i] = .{
        .name = f.name,
        .value = try sampleAt(arena, f.value, t),
    };
    return .{ .constructed = .{ .name = c.name, .fields = fields } };
}

/// `wave(amplitude, period)` → `amplitude · sin(2π · t / period)`.
/// The amplitude's unit (deg / rad / px / …) carries through to the
/// output number. `period` is read in time units (s / ms / us / ns);
/// dropping the unit defaults to seconds. Returns null if either
/// arg is missing, non-numeric, or the period is zero.
fn tryEvalWave(c: value.Constructed, t: f64) ?Value {
    var amplitude: ?value.Number = null;
    var period: ?value.Number = null;
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "amplitude") and f.value == .number) {
            amplitude = f.value.number;
        } else if (std.mem.eql(u8, f.name, "period") and f.value == .number) {
            period = f.value.number;
        }
    }
    const amp = amplitude orelse return null;
    const per_seconds = numberToSeconds(period orelse return null);
    if (per_seconds == 0) return null;

    const phase = (2.0 * std.math.pi * t) / per_seconds;
    const result = amp.value * std.math.sin(phase);
    return .{ .number = .{ .value = result, .unit = amp.unit } };
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

    return interpolate(times, values, t, opts_rec);
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

/// Read the `easing:` slot of an animate's opts record and return the
/// curve name (e.g. `"easing.out_cubic"`). Null if absent or wrong shape.
fn easingName(opts: value.Record) ?[]const u8 {
    for (opts.fields) |f| {
        if (!std.mem.eql(u8, f.name, "easing")) continue;
        return switch (f.value) {
            .constructed => |c| c.name,
            else => null,
        };
    }
    return null;
}

/// Map a linear interpolation fraction [0, 1] through a named curve.
/// Endpoints are preserved (curve(0) = 0, curve(1) = 1) for every
/// supported name so loops and clamps stay seamless. Unknown names
/// fall back to linear.
fn applyEasing(name: []const u8, frac: f64) f64 {
    // Plain `linear` and the identity short-circuit avoid a pointless
    // multiplication when the curve is the default.
    if (std.mem.eql(u8, name, "easing.linear")) return frac;
    if (std.mem.eql(u8, name, "easing.in_quad")) return frac * frac;
    if (std.mem.eql(u8, name, "easing.out_quad")) {
        const inv = 1.0 - frac;
        return 1.0 - inv * inv;
    }
    if (std.mem.eql(u8, name, "easing.in_out_quad")) {
        if (frac < 0.5) return 2.0 * frac * frac;
        const inv = -2.0 * frac + 2.0;
        return 1.0 - (inv * inv) / 2.0;
    }
    if (std.mem.eql(u8, name, "easing.in_cubic")) return frac * frac * frac;
    if (std.mem.eql(u8, name, "easing.out_cubic")) {
        const inv = 1.0 - frac;
        return 1.0 - inv * inv * inv;
    }
    if (std.mem.eql(u8, name, "easing.in_out_cubic")) {
        if (frac < 0.5) return 4.0 * frac * frac * frac;
        const inv = -2.0 * frac + 2.0;
        return 1.0 - (inv * inv * inv) / 2.0;
    }
    return frac;
}

fn interpolate(
    times: []const f64,
    values: []const Value,
    t_in: f64,
    opts: ?value.Record,
) Value {
    if (times.len == 1) return values[0];

    const t_min = times[0];
    const t_max = times[times.len - 1];
    var t = t_in;

    // Wrap when the animation loops. We wrap into the half-open span
    // [t_min, t_max) so the loop endpoint connects cleanly to its start.
    const repeat_forever = opts != null and isForever(opts.?);
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
    const linear_frac = (t - lo_t) / (hi_t - lo_t);
    const eased = if (opts) |o|
        if (easingName(o)) |n| applyEasing(n, linear_frac) else linear_frac
    else
        linear_frac;
    return interpolatePair(values[i], values[i + 1], eased);
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

test "applyEasing: every supported curve maps endpoints to endpoints" {
    inline for ([_][]const u8{
        "easing.linear",
        "easing.in_quad",          "easing.out_quad",          "easing.in_out_quad",
        "easing.in_cubic",         "easing.out_cubic",         "easing.in_out_cubic",
        "easing.unknown_fallback",
    }) |name| {
        try std.testing.expectEqual(@as(f64, 0), applyEasing(name, 0));
        try std.testing.expectEqual(@as(f64, 1), applyEasing(name, 1));
    }
    // Midpoint of out_cubic should be well past 0.5 (slow end → most
    // of the motion is finished by the halfway point).
    try std.testing.expect(applyEasing("easing.out_cubic", 0.5) > 0.8);
    // Midpoint of in_cubic should be well under 0.5 (slow start).
    try std.testing.expect(applyEasing("easing.in_cubic", 0.5) < 0.2);
    // in_out_cubic is symmetric at 0.5.
    try std.testing.expectApproxEqAbs(@as(f64, 0.5), applyEasing("easing.in_out_cubic", 0.5), 1e-9);
}

test "sampleAt: out_cubic easing reaches the endpoint faster than linear" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // pulse animation: 0..1 over 1s. At t=0.25:
    //   linear   → 0.25
    //   out_cubic → 1 - 0.75³ = 1 - 0.421875 = 0.578125
    const linear = try buildAnimate(a, &.{ .{ .at = 0, .value = 0 }, .{ .at = 1, .value = 1 } }, false);
    const eased = try buildAnimateWithEasing(
        a,
        &.{ .{ .at = 0, .value = 0 }, .{ .at = 1, .value = 1 } },
        "easing.out_cubic",
    );

    const lin_v = try sampleAt(a, linear, 0.25);
    const eas_v = try sampleAt(a, eased, 0.25);
    try std.testing.expectApproxEqAbs(@as(f64, 0.25), lin_v.number.value, 1e-9);
    try std.testing.expectApproxEqAbs(@as(f64, 0.578125), eas_v.number.value, 1e-9);
}

fn buildAnimateWithEasing(
    arena: std.mem.Allocator,
    keyframes: []const struct { at: f64, value: f64 },
    easing: []const u8,
) !Value {
    const kfs = try arena.alloc(Value, keyframes.len);
    for (keyframes, 0..) |kf, i| {
        const fs = try arena.alloc(value.Field, 2);
        fs[0] = .{ .name = "at", .value = .{ .number = .{ .value = kf.at, .unit = .s } } };
        fs[1] = .{ .name = "value", .value = .{ .number = .{ .value = kf.value, .unit = null } } };
        kfs[i] = .{ .record = .{ .fields = fs } };
    }
    const opts_fs = try arena.alloc(value.Field, 1);
    opts_fs[0] = .{
        .name = "easing",
        .value = .{ .constructed = .{ .name = easing, .fields = &.{} } },
    };
    const top_fs = try arena.alloc(value.Field, 2);
    top_fs[0] = .{ .name = "keyframes", .value = .{ .array = .{ .elems = kfs } } };
    top_fs[1] = .{ .name = "opts", .value = .{ .record = .{ .fields = opts_fs } } };
    return .{ .constructed = .{ .name = "animate", .fields = top_fs } };
}

test "sampleAt: wave(amplitude, period) resolves to amplitude·sin(2π·t/period)" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    const fs = try a.alloc(value.Field, 2);
    fs[0] = .{ .name = "amplitude", .value = .{ .number = .{ .value = 8.6, .unit = .deg } } };
    fs[1] = .{ .name = "period", .value = .{ .number = .{ .value = 12, .unit = .s } } };
    const wave: Value = .{ .constructed = .{ .name = "wave", .fields = fs } };

    // Quarter-period sample → sin(π/2) = 1 → full amplitude.
    const peak = try sampleAt(a, wave, 3.0);
    try std.testing.expectApproxEqAbs(@as(f64, 8.6), peak.number.value, 1e-9);
    try std.testing.expectEqual(ast.Unit.deg, peak.number.unit.?);

    // Half-period sample → sin(π) ≈ 0.
    const zero = try sampleAt(a, wave, 6.0);
    try std.testing.expectApproxEqAbs(@as(f64, 0), zero.number.value, 1e-9);

    // Three-quarter-period sample → sin(3π/2) = -1 → negative amplitude.
    const trough = try sampleAt(a, wave, 9.0);
    try std.testing.expectApproxEqAbs(@as(f64, -8.6), trough.number.value, 1e-9);
}

test "sampleAt: malformed wave (zero period) is preserved verbatim" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    const fs = try a.alloc(value.Field, 2);
    fs[0] = .{ .name = "amplitude", .value = .{ .number = .{ .value = 1, .unit = .deg } } };
    fs[1] = .{ .name = "period", .value = .{ .number = .{ .value = 0, .unit = .s } } };
    const wave: Value = .{ .constructed = .{ .name = "wave", .fields = fs } };

    const sampled = try sampleAt(a, wave, 1.0);
    try std.testing.expect(sampled == .constructed);
    try std.testing.expectEqualStrings("wave", sampled.constructed.name);
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
