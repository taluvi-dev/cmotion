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
    // Named constructors that collapse to a concrete value at t. Others
    // recurse verbatim so the structure stays inspectable downstream.
    if (std.mem.eql(u8, c.name, "animate")) {
        if (try tryEvalAnimate(arena, c, t)) |sampled| return sampled;
    } else if (std.mem.eql(u8, c.name, "wave")) {
        if (tryEvalWave(c, t)) |sampled| return sampled;
    } else if (std.mem.eql(u8, c.name, "bounce")) {
        if (try tryEvalBounce(arena, c, t)) |sampled| return sampled;
    } else if (std.mem.eql(u8, c.name, "on_event")) {
        if (try tryEvalOnEvent(arena, c, t)) |sampled| return sampled;
    } else if (std.mem.eql(u8, c.name, "field_of")) {
        if (try tryEvalFieldOf(arena, c, t)) |sampled| return sampled;
    }
    const fields = try arena.alloc(value.Field, c.fields.len);
    for (c.fields, 0..) |f, i| fields[i] = .{
        .name = f.name,
        .value = try sampleAt(arena, f.value, t),
    };
    return .{ .constructed = .{ .name = c.name, .fields = fields } };
}

/// `wave(amplitude, period, phase?)` → `amplitude · sin(2π · t / period +
/// phase)`. The amplitude's unit (deg / rad / px / …) carries through to the
/// output number. `period` is read in time units (s / ms / us / ns); dropping
/// the unit defaults to seconds. `phase` is an angle (deg / turn / rad,
/// default 0) added to the argument — two waves a quarter-turn apart give the
/// (cos, sin) pair for circular/orbital motion. Returns null if amplitude or
/// period is missing, non-numeric, or the period is zero.
fn tryEvalWave(c: value.Constructed, t: f64) ?Value {
    var amplitude: ?value.Number = null;
    var period: ?value.Number = null;
    var phase: ?value.Number = null;
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "amplitude") and f.value == .number) {
            amplitude = f.value.number;
        } else if (std.mem.eql(u8, f.name, "period") and f.value == .number) {
            period = f.value.number;
        } else if (std.mem.eql(u8, f.name, "phase") and f.value == .number) {
            phase = f.value.number;
        }
    }
    const amp = amplitude orelse return null;
    const per_seconds = numberToSeconds(period orelse return null);
    if (per_seconds == 0) return null;

    const phase_offset = if (phase) |p| numberToRadians(p) else 0.0;
    const theta = (2.0 * std.math.pi * t) / per_seconds + phase_offset;
    const result = amp.value * std.math.sin(theta);
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

/// `bounce(height: <px>, period: <s>, floor: <px>)` resolves to a record
/// `{ position: <px>, impacts: [<s>] }` at `t`. The arc is the standard
/// projectile parabola per period (apex at the midpoint), so the ball
/// dwells near the top and snaps through the floor contact. `position`
/// swings between `floor` (at impact) and `floor + height` (at apex);
/// `impacts` is a windowed list of impact times around `t` — enough for
/// `on_event(...)` to evaluate a decay envelope without scanning a list
/// that grows with the timeline.
///
/// Returns null if any required field is missing or non-numeric (the
/// caller then preserves the staging Constructed verbatim).
fn tryEvalBounce(
    arena: std.mem.Allocator,
    c: value.Constructed,
    t: f64,
) SampleError!?Value {
    var height: ?value.Number = null;
    var period: ?value.Number = null;
    var floor: ?value.Number = null;
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "height") and f.value == .number) {
            height = f.value.number;
        } else if (std.mem.eql(u8, f.name, "period") and f.value == .number) {
            period = f.value.number;
        } else if (std.mem.eql(u8, f.name, "floor") and f.value == .number) {
            floor = f.value.number;
        }
    }
    const h = height orelse return null;
    const fl = floor orelse return null;
    const per_seconds = numberToSeconds(period orelse return null);
    if (per_seconds <= 0) return null;

    // Position: parabolic arc per period, `arc(t_norm) = 4·t_norm·(1-t_norm)`,
    // so arc is 0 at the impacts and 1 at the apex.
    const t_clamped = if (t < 0) 0 else t;
    const t_norm = @mod(t_clamped, per_seconds) / per_seconds;
    const arc = 4.0 * t_norm * (1.0 - t_norm);
    const position = fl.value + h.value * arc;
    const pos_unit = fl.unit orelse h.unit;

    // Impacts: emit a small window — recent past + the next impact. That's
    // all `on_event(decay: ...)` ever consults; keeping the list bounded
    // means the cost doesn't grow with `t`.
    const back_window: f64 = 2.0;
    const start_idx_f = @floor(@max(0.0, t_clamped - back_window) / per_seconds);
    const end_idx_f = @floor((t_clamped + per_seconds) / per_seconds);
    const start_idx: usize = @intFromFloat(start_idx_f);
    const end_idx: usize = @intFromFloat(end_idx_f);
    const count: usize = end_idx - start_idx + 1;
    const impacts = try arena.alloc(Value, count);
    var i: usize = 0;
    while (i < count) : (i += 1) {
        const idx_f = @as(f64, @floatFromInt(start_idx + i));
        impacts[i] = .{ .number = .{ .value = idx_f * per_seconds, .unit = .s } };
    }

    const fields = try arena.alloc(value.Field, 2);
    fields[0] = .{ .name = "position", .value = .{ .number = .{ .value = position, .unit = pos_unit } } };
    fields[1] = .{ .name = "impacts", .value = .{ .array = .{ .elems = impacts } } };
    return .{ .record = .{ .fields = fields } };
}

/// `on_event(events, decay: <s>, peak: <number>)` resolves to a scalar
/// envelope at `t`: `peak · exp(-(t - t_last) / decay)`, where `t_last`
/// is the most recent event time ≤ `t`. Returns 0 (preserving `peak`'s
/// unit) when no event has fired yet — a clean cold-start.
///
/// The `events` arg may be the first positional or a named `events:`;
/// it's sampled before reading so `bounce(...).impacts` resolves
/// through `field_of` first.
fn tryEvalOnEvent(
    arena: std.mem.Allocator,
    c: value.Constructed,
    t: f64,
) SampleError!?Value {
    var events_v: ?Value = null;
    var decay: ?value.Number = null;
    var peak: ?value.Number = null;
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "events")) {
            events_v = f.value;
        } else if (f.name.len == 0 and events_v == null) {
            events_v = f.value;
        } else if (std.mem.eql(u8, f.name, "decay") and f.value == .number) {
            decay = f.value.number;
        } else if (std.mem.eql(u8, f.name, "peak") and f.value == .number) {
            peak = f.value.number;
        }
    }
    const events_unsampled = events_v orelse return null;
    const d_seconds = numberToSeconds(decay orelse return null);
    const p = peak orelse return null;
    if (d_seconds <= 0) return null;

    // Resolve the events arg — it's typically a `field_of` staged value
    // pulled off a `bounce(...)` result, so we have to sample before reading.
    const sampled = try sampleAt(arena, events_unsampled, t);
    if (sampled != .array) return null;

    var t_last: ?f64 = null;
    for (sampled.array.elems) |elem| {
        if (elem != .number) continue;
        const event_t = numberToSeconds(elem.number);
        if (event_t <= t and (t_last == null or event_t > t_last.?)) {
            t_last = event_t;
        }
    }
    if (t_last == null) {
        return .{ .number = .{ .value = 0, .unit = p.unit } };
    }
    const dt = t - t_last.?;
    const envelope = p.value * @exp(-dt / d_seconds);
    return .{ .number = .{ .value = envelope, .unit = p.unit } };
}

/// `field_of(self, name)` — deferred record-field access. The eval pass
/// emits this when the user writes `x.name` and `x` is a Constructed
/// staging value (not a real record yet). At sample time we resolve
/// `self` first; if the result is a record, return the named field's
/// value. Anything else falls back to nil.
fn tryEvalFieldOf(
    arena: std.mem.Allocator,
    c: value.Constructed,
    t: f64,
) SampleError!?Value {
    var self_value: ?Value = null;
    var name: ?[]const u8 = null;
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "self")) {
            self_value = f.value;
        } else if (std.mem.eql(u8, f.name, "name") and f.value == .string) {
            // Strip the surrounding quotes the lexer leaves on string lits.
            const raw = f.value.string;
            name = if (raw.len >= 2 and raw[0] == '"' and raw[raw.len - 1] == '"')
                raw[1 .. raw.len - 1]
            else
                raw;
        }
    }
    const self_v = self_value orelse return null;
    const field_name = name orelse return null;

    const sampled = try sampleAt(arena, self_v, t);
    return switch (sampled) {
        .record => |r| blk: {
            for (r.fields) |f| if (std.mem.eql(u8, f.name, field_name)) break :blk f.value;
            break :blk .nil;
        },
        else => .nil,
    };
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

/// Read a numeric angle as radians. `deg`/`turn` convert; `rad` and a bare
/// unitless number pass through as radians.
fn numberToRadians(n: value.Number) f64 {
    const unit = n.unit orelse return n.value;
    return switch (unit) {
        .deg => n.value * std.math.pi / 180.0,
        .turn => n.value * 2.0 * std.math.pi,
        else => n.value,
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

test "sampleAt: wave phase offset gives the (cos, sin) orbit pair" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // y = wave(amplitude: 100px, period: 4s)            → sin
    // x = wave(amplitude: 100px, period: 4s, phase: 90deg) → cos
    // At t=0: y = sin(0) = 0, x = sin(90°) = 1 → (100, 0) on the circle.
    const ys = try a.alloc(value.Field, 2);
    ys[0] = .{ .name = "amplitude", .value = .{ .number = .{ .value = 100, .unit = .px } } };
    ys[1] = .{ .name = "period", .value = .{ .number = .{ .value = 4, .unit = .s } } };
    const ywave: Value = .{ .constructed = .{ .name = "wave", .fields = ys } };

    const xs = try a.alloc(value.Field, 3);
    xs[0] = .{ .name = "amplitude", .value = .{ .number = .{ .value = 100, .unit = .px } } };
    xs[1] = .{ .name = "period", .value = .{ .number = .{ .value = 4, .unit = .s } } };
    xs[2] = .{ .name = "phase", .value = .{ .number = .{ .value = 90, .unit = .deg } } };
    const xwave: Value = .{ .constructed = .{ .name = "wave", .fields = xs } };

    const y0 = try sampleAt(a, ywave, 0.0);
    const x0 = try sampleAt(a, xwave, 0.0);
    try std.testing.expectApproxEqAbs(@as(f64, 0), y0.number.value, 1e-9);
    try std.testing.expectApproxEqAbs(@as(f64, 100), x0.number.value, 1e-9);

    // A quarter period later (t=1s) the orbit has advanced 90°: (x, y) = (0, 100).
    const y1 = try sampleAt(a, ywave, 1.0);
    const x1 = try sampleAt(a, xwave, 1.0);
    try std.testing.expectApproxEqAbs(@as(f64, 100), y1.number.value, 1e-9);
    try std.testing.expectApproxEqAbs(@as(f64, 0), x1.number.value, 1e-9);

    // Radius is invariant: x² + y² == amplitude² at both samples.
    try std.testing.expectApproxEqAbs(@as(f64, 10000), x0.number.value * x0.number.value + y0.number.value * y0.number.value, 1e-6);
    try std.testing.expectApproxEqAbs(@as(f64, 10000), x1.number.value * x1.number.value + y1.number.value * y1.number.value, 1e-6);
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

test "sampleAt: sprite frame: animates via the verbatim recurse" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // sprite(frame: animate(0s => 0, 2s => 8)) → at t=1s, frame = 4.
    // `sprite` isn't special-cased; this proves the renderer-agnostic
    // recurse resolves an animated grid-atlas cell index.
    const kfs = try a.alloc(Value, 2);
    inline for (.{ .{ 0.0, 0.0 }, .{ 2.0, 8.0 } }, 0..) |pair, i| {
        const fs = try a.alloc(value.Field, 2);
        fs[0] = .{ .name = "at", .value = .{ .number = .{ .value = pair[0], .unit = .s } } };
        fs[1] = .{ .name = "value", .value = .{ .number = .{ .value = pair[1], .unit = null } } };
        kfs[i] = .{ .record = .{ .fields = fs } };
    }
    const top = try a.alloc(value.Field, 2);
    top[0] = .{ .name = "keyframes", .value = .{ .array = .{ .elems = kfs } } };
    top[1] = .{ .name = "opts", .value = .nil };
    const anim = Value{ .constructed = .{ .name = "animate", .fields = top } };

    const sprite_fs = try a.alloc(value.Field, 1);
    sprite_fs[0] = .{ .name = "frame", .value = anim };
    const sprite = Value{ .constructed = .{ .name = "sprite", .fields = sprite_fs } };

    const sampled = try sampleAt(a, sprite, 1.0);
    try std.testing.expectEqualStrings("sprite", sampled.constructed.name);
    try std.testing.expectEqualStrings("frame", sampled.constructed.fields[0].name);
    try std.testing.expectEqual(@as(f64, 4), sampled.constructed.fields[0].value.number.value);
}

fn buildBounce(a: std.mem.Allocator, height_px: f64, period_s: f64, floor_px: f64) !Value {
    const fs = try a.alloc(value.Field, 3);
    fs[0] = .{ .name = "height", .value = .{ .number = .{ .value = height_px, .unit = .px } } };
    fs[1] = .{ .name = "period", .value = .{ .number = .{ .value = period_s, .unit = .s } } };
    fs[2] = .{ .name = "floor", .value = .{ .number = .{ .value = floor_px, .unit = .px } } };
    return .{ .constructed = .{ .name = "bounce", .fields = fs } };
}

test "sampleAt: bounce resolves to {position, impacts} at t" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const b = try buildBounce(a, 400, 1.0, -200);

    // At impact (t=0): position = floor, arc = 0.
    const at_impact = try sampleAt(a, b, 0);
    try std.testing.expect(at_impact == .record);
    try std.testing.expectEqualStrings("position", at_impact.record.fields[0].name);
    try std.testing.expectEqual(@as(f64, -200), at_impact.record.fields[0].value.number.value);
    try std.testing.expectEqual(ast.Unit.px, at_impact.record.fields[0].value.number.unit.?);

    // At apex (t = period/2): position = floor + height.
    const at_apex = try sampleAt(a, b, 0.5);
    try std.testing.expectEqual(@as(f64, 200), at_apex.record.fields[0].value.number.value);

    // Impacts: an array containing 0s (the current cycle's impact).
    const impacts = at_impact.record.fields[1].value.array;
    try std.testing.expect(impacts.elems.len >= 1);
    try std.testing.expectEqual(@as(f64, 0), impacts.elems[0].number.value);
}

test "sampleAt: field_of(staged-record, name) defers through the sampler" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const b = try buildBounce(a, 400, 1.0, -200);

    // field_of(self: bounce(...), name: "position")
    const fields = try a.alloc(value.Field, 2);
    fields[0] = .{ .name = "self", .value = b };
    fields[1] = .{ .name = "name", .value = .{ .string = "\"position\"" } };
    const f = Value{ .constructed = .{ .name = "field_of", .fields = fields } };

    const sampled = try sampleAt(a, f, 0.5);
    try std.testing.expect(sampled == .number);
    try std.testing.expectEqual(@as(f64, 200), sampled.number.value);
}

test "sampleAt: on_event(bounce.impacts, …) peaks on impact then decays" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // field_of(self: bounce(period:1s), name: "impacts")
    const b = try buildBounce(a, 400, 1.0, -200);
    const fa_fields = try a.alloc(value.Field, 2);
    fa_fields[0] = .{ .name = "self", .value = b };
    fa_fields[1] = .{ .name = "name", .value = .{ .string = "\"impacts\"" } };
    const impacts = Value{ .constructed = .{ .name = "field_of", .fields = fa_fields } };

    // on_event(impacts, decay: 0.2s, peak: 0.5)
    const oe_fields = try a.alloc(value.Field, 3);
    oe_fields[0] = .{ .name = "", .value = impacts };
    oe_fields[1] = .{ .name = "decay", .value = .{ .number = .{ .value = 0.2, .unit = .s } } };
    oe_fields[2] = .{ .name = "peak", .value = .{ .number = .{ .value = 0.5, .unit = null } } };
    const oe = Value{ .constructed = .{ .name = "on_event", .fields = oe_fields } };

    // Right at the impact at t=1.0s — full peak.
    const at_impact = try sampleAt(a, oe, 1.0);
    try std.testing.expectApproxEqAbs(@as(f64, 0.5), at_impact.number.value, 1e-9);

    // One decay constant later — peak / e.
    const after_decay = try sampleAt(a, oe, 1.2);
    try std.testing.expectApproxEqAbs(@as(f64, 0.5 / std.math.e), after_decay.number.value, 1e-9);
}
