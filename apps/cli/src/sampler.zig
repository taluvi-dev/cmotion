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
//!   - Easing (`easing.zig`): `opts.easing` is the default curve of every
//!     segment; a keyframe's own `with <easing>` overrides it for the
//!     segment arriving at that keyframe. Curves: `easing.linear`,
//!     `easing.<in|out|in_out>_<quad|cubic|quart|quint|sine|expo|circ|
//!     back|elastic|bounce>`, `easing.bezier(x1, y1, x2, y2)`,
//!     `easing.steps(n)`, `easing.spring(stiffness:, damping:, mass:)`.
//!     Unknown names fall back to linear (`cmo check` warns, NAM009).
//!   - `opts.before` / `opts.after`: `hold` (default), `extend` (carry
//!     the end segment's slope on), and for `after` also `loop` and
//!     `ping_pong`. `repeat: forever` is `after: loop`.
//!   - `opts.blend: oklab` blends colour keyframes in OKLab (the
//!     evaluator sets it by default from runner 0.0.14); without it
//!     colours step from keyframe to keyframe.
//!   - `spring(from:, to:, at:, stiffness:, damping:, mass:)`, `noise(seed,
//!     period, amplitude?)` and `random(seed)` resolve to numbers.
//!   - Time structure on any layer — `shift(by, layer)`, `loop(period,
//!     layer)`, `freeze(at, layer)`, `during(from, to, layer, fade_in?,
//!     fade_out?)`, `series([layers], [durations])` — resolve to the inner
//!     layer sampled at its own local time. Called or chained
//!     (`title.during(1s, 4s)`): the layer is the argument that is not a
//!     number. A layer outside its window, or fading, comes out as
//!     `opacity(k, layer)`, the one node renderers need to know.
//!   - `wave(amplitude, period)` resolves to `amplitude · sin(2π·t /
//!     period)` — continuous trig oscillation, not keyframes. The
//!     amplitude's unit (deg, rad, px, …) carries through to the
//!     output number.
//!   - Other non-number keyframe values (records, strings) step: the
//!     value of the keyframe at or before `t` is returned.

const std = @import("std");
const value = @import("value.zig");
const easing = @import("easing.zig");
const ast = @import("ast.zig");
const units = @import("units.zig");

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
    } else if (std.mem.eql(u8, c.name, "spring")) {
        if (tryEvalSpring(c, t)) |sampled| return sampled;
    } else if (std.mem.eql(u8, c.name, "noise")) {
        if (tryEvalNoise(c, t)) |sampled| return sampled;
    } else if (std.mem.eql(u8, c.name, "random")) {
        if (tryEvalRandom(c)) |sampled| return sampled;
    } else if (isTimeCombinator(c.name)) {
        if (try tryEvalTimeCombinator(arena, c, t)) |sampled| return sampled;
    } else if (std.mem.eql(u8, c.name, "bounce")) {
        if (try tryEvalBounce(arena, c, t)) |sampled| return sampled;
    } else if (std.mem.eql(u8, c.name, "on_event")) {
        if (try tryEvalOnEvent(arena, c, t)) |sampled| return sampled;
    } else if (std.mem.eql(u8, c.name, "field_of")) {
        if (try tryEvalFieldOf(arena, c, t)) |sampled| return sampled;
    } else if (std.mem.eql(u8, c.name, "media_clock")) {
        // a video's clock (eval.zig `withMediaClock`): the local time here
        return .{ .number = .{ .value = t, .unit = .s } };
    } else if (std.mem.eql(u8, c.name, "host_track")) {
        // a Track the host fed (`$tracks`): its samples read at t
        return .{ .number = .{ .value = hostTrackAt(c, t), .unit = null } };
    } else if (std.mem.eql(u8, c.name, "track")) {
        // a Track nobody fed: silence
        return .{ .number = .{ .value = 0, .unit = null } };
    } else if (std.mem.eql(u8, c.name, "expr")) {
        if (try tryEvalExpr(arena, c, t)) |sampled| return sampled;
    }
    const fields = try arena.alloc(value.Field, c.fields.len);
    for (c.fields, 0..) |f, i| fields[i] = .{
        .name = f.name,
        .value = try sampleAt(arena, f.value, t),
    };
    return .{ .constructed = .{ .name = c.name, .fields = fields } };
}

/// `host_track(rate, values)` at t: linear between the two samples around
/// `t · rate`, the first or last sample outside the range, 0 when empty.
fn hostTrackAt(c: value.Constructed, t: f64) f64 {
    var rate: f64 = 0;
    var vals: []const Value = &.{};
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "rate") and f.value == .number) {
            rate = f.value.number.value;
        } else if (std.mem.eql(u8, f.name, "values") and f.value == .array) {
            vals = f.value.array.elems;
        }
    }
    if (vals.len == 0 or !(rate > 0)) return 0;
    const at = struct {
        fn of(v: Value) f64 {
            return if (v == .number) v.number.value else 0;
        }
    }.of;
    const pos = t * rate;
    const last: f64 = @floatFromInt(vals.len - 1);
    if (!(pos > 0)) return at(vals[0]);
    if (pos >= last) return at(vals[vals.len - 1]);
    const i: usize = @intFromFloat(@floor(pos));
    const frac = pos - @floor(pos);
    return at(vals[i]) * (1 - frac) + at(vals[i + 1]) * frac;
}

/// `expr(op, left, right)` — arithmetic eval staged because a side varies
/// with time: both sides sampled at t and folded under eval's unit rules
/// (a sum keeps the left unit, a product whichever side has one, a ratio
/// of like units is a plain number). Null when a side is still not a
/// number, which leaves the expr in the tree.
fn tryEvalExpr(arena: std.mem.Allocator, c: value.Constructed, t: f64) SampleError!?Value {
    var op: []const u8 = "";
    var left: ?Value = null;
    var right: ?Value = null;
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "op") and f.value == .string) {
            op = std.mem.trim(u8, f.value.string, "\"");
        } else if (std.mem.eql(u8, f.name, "left")) {
            left = try sampleAt(arena, f.value, t);
        } else if (std.mem.eql(u8, f.name, "right")) {
            right = try sampleAt(arena, f.value, t);
        }
    }
    const l = left orelse return null;
    const r = right orelse return null;
    if (l != .number or r != .number) return null;
    const ln = l.number;
    const rn = r.number;
    const eq = std.mem.eql;
    if (eq(u8, op, "div") and ln.unit != null and rn.unit != null and units.family(ln.unit.?) == units.family(rn.unit.?)) {
        const den = rn.value * units.scale(rn.unit.?);
        return .{ .number = .{ .value = if (den == 0) 0 else ln.value * units.scale(ln.unit.?) / den, .unit = null } };
    }
    const unit: ?ast.Unit = if (eq(u8, op, "add") or eq(u8, op, "sub") or eq(u8, op, "mod")) ln.unit orelse rn.unit else ln.unit orelse rn.unit;
    const v: f64 = if (eq(u8, op, "add"))
        ln.value + rn.value
    else if (eq(u8, op, "sub"))
        ln.value - rn.value
    else if (eq(u8, op, "mul"))
        ln.value * rn.value
    else if (eq(u8, op, "div"))
        (if (rn.value == 0) 0 else ln.value / rn.value)
    else if (eq(u8, op, "mod"))
        @rem(ln.value, if (rn.value == 0) 1 else rn.value)
    else if (eq(u8, op, "pow"))
        std.math.pow(f64, ln.value, rn.value)
    else
        return null;
    return .{ .number = .{ .value = v, .unit = unit } };
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

fn isTimeCombinator(name: []const u8) bool {
    const names = [_][]const u8{ "shift", "loop", "freeze", "during", "series", "transition" };
    for (names) |n| if (std.mem.eql(u8, n, name)) return true;
    return false;
}

/// The arguments of a combinator call: its layer (the positional
/// argument that is not a plain number, or a `layer:` field), its
/// positional numbers in order, and its named numbers.
const CombinatorArgs = struct {
    layer: ?Value = null,
    nums: [3]?f64 = .{ null, null, null },
    n_nums: usize = 0,

    fn num(self: CombinatorArgs, i: usize) ?f64 {
        return if (i < self.n_nums) self.nums[i] else null;
    }
};

fn combinatorArgs(arena: std.mem.Allocator, c: value.Constructed, t: f64, named_order: []const []const u8) SampleError!CombinatorArgs {
    var out: CombinatorArgs = .{};
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "layer") or std.mem.eql(u8, f.name, "layers")) {
            out.layer = f.value;
            continue;
        }
        // The layer is the positional argument that is not a plain
        // number: last in the called form, first (the receiver) in the
        // chained form `layer.during(1s, 3s)`.
        if (f.name.len == 0 and f.value != .number) {
            out.layer = f.value;
            continue;
        }
        const sampled = try sampleAt(arena, f.value, t);
        if (sampled != .number) continue;
        const secs = numberToSeconds(sampled.number);
        if (f.name.len == 0) {
            if (out.n_nums < out.nums.len) {
                out.nums[out.n_nums] = secs;
                out.n_nums += 1;
            }
            continue;
        }
        for (named_order, 0..) |n, i| {
            if (!std.mem.eql(u8, n, f.name)) continue;
            while (out.n_nums <= i) : (out.n_nums += 1) out.nums[out.n_nums] = null;
            out.nums[i] = secs;
        }
    }
    return out;
}

fn namedSeconds(c: value.Constructed, name: []const u8) ?f64 {
    for (c.fields) |f| if (std.mem.eql(u8, f.name, name) and f.value == .number) return numberToSeconds(f.value.number);
    return null;
}

/// `opacity(k, layer)` with `k` clamped to 0..1.
fn opacityNode(arena: std.mem.Allocator, k: f64, layer: Value) SampleError!Value {
    const fields = try arena.alloc(value.Field, 2);
    fields[0] = .{ .name = "", .value = .{ .number = .{ .value = std.math.clamp(k, 0, 1), .unit = null } } };
    fields[1] = .{ .name = "", .value = layer };
    return .{ .constructed = .{ .name = "opacity", .fields = fields } };
}

fn tryEvalTimeCombinator(arena: std.mem.Allocator, c: value.Constructed, t: f64) SampleError!?Value {
    if (std.mem.eql(u8, c.name, "series")) return try tryEvalSeries(arena, c, t);
    if (std.mem.eql(u8, c.name, "transition")) return try tryEvalTransition(arena, c, t);
    const order: []const []const u8 = if (std.mem.eql(u8, c.name, "shift"))
        &.{"by"}
    else if (std.mem.eql(u8, c.name, "loop"))
        &.{"period"}
    else if (std.mem.eql(u8, c.name, "freeze"))
        &.{"at"}
    else
        &.{ "from", "to" };
    const args = try combinatorArgs(arena, c, t, order);
    const layer = args.layer orelse return null;

    if (std.mem.eql(u8, c.name, "shift")) return try sampleAt(arena, layer, t - (args.num(0) orelse return null));
    if (std.mem.eql(u8, c.name, "freeze")) return try sampleAt(arena, layer, args.num(0) orelse return null);
    if (std.mem.eql(u8, c.name, "loop")) {
        const p = args.num(0) orelse return null;
        if (p <= 0) return null;
        return try sampleAt(arena, layer, @mod(t, p));
    }

    // during(from, to, layer, fade_in?, fade_out?): the layer runs on its
    // own clock from `from`; outside [from, to) it is hidden.
    const from = args.num(0) orelse 0;
    const to = args.num(1) orelse std.math.inf(f64);
    const local = t - from;
    const inner = try sampleAt(arena, layer, std.math.clamp(local, 0, @max(0, to - from)));
    if (t < from or t >= to) return try opacityNode(arena, 0, inner);
    var k: f64 = 1;
    if (namedSeconds(c, "fade_in")) |d| if (d > 0) {
        k = @min(k, local / d);
    };
    if (namedSeconds(c, "fade_out")) |d| if (d > 0) {
        k = @min(k, (to - t) / d);
    };
    return if (k < 1) try opacityNode(arena, k, inner) else inner;
}

/// `transition(a, b, at:, duration:, kind:, easing:, distance:)` —
/// Remotion's `TransitionSeries` inside one clip: `a` until `at`, then
/// over `duration` from `a` to `b`, then `b`. `a` keeps its clip time;
/// `b` starts its own clock at `at`. Kinds: `fade` (default), and
/// `slide_left` / `slide_right` / `slide_up` / `slide_down`, which push
/// `a` out and `b` in by `distance` (default 1920px). Built from
/// `compose`, `opacity` and `translate`, which every renderer draws.
fn tryEvalTransition(arena: std.mem.Allocator, c: value.Constructed, t: f64) SampleError!?Value {
    var a: ?Value = null;
    var b: ?Value = null;
    var kind: []const u8 = "fade";
    var ease: ?easing.Easing = null;
    var distance: f64 = 1920;
    for (c.fields) |f| {
        if (f.name.len == 0 and f.value != .number) {
            if (a == null) a = f.value else if (b == null) b = f.value;
        } else if (std.mem.eql(u8, f.name, "kind")) {
            if (f.value == .constructed and f.value.constructed.fields.len == 0) kind = f.value.constructed.name;
        } else if (std.mem.eql(u8, f.name, "easing")) {
            ease = easingOf(f.value);
        } else if (std.mem.eql(u8, f.name, "distance") and f.value == .number) {
            distance = f.value.number.value;
        }
    }
    const from = a orelse return null;
    const to = b orelse return null;
    const at = namedSeconds(c, "at") orelse 0;
    const dur = namedSeconds(c, "duration") orelse 0.5;
    if (t < at) return try sampleAt(arena, from, t);
    if (t >= at + dur) return try sampleAt(arena, to, t - at);
    const lin = if (dur > 0) (t - at) / dur else 1;
    const p = if (ease) |e| easing.apply(e, lin) else lin;
    const out_layer = try sampleAt(arena, from, t);
    const in_layer = try sampleAt(arena, to, t - at);
    const pair = try arena.alloc(Value, 2);
    if (std.mem.startsWith(u8, kind, "slide_")) {
        // Direction b travels in; a leaves the same way.
        const dir: [2]f64 = if (std.mem.eql(u8, kind, "slide_left"))
            .{ -1, 0 }
        else if (std.mem.eql(u8, kind, "slide_right"))
            .{ 1, 0 }
        else if (std.mem.eql(u8, kind, "slide_up"))
            .{ 0, 1 }
        else
            .{ 0, -1 };
        pair[0] = try translated(arena, out_layer, dir[0] * distance * p, dir[1] * distance * p);
        pair[1] = try translated(arena, in_layer, -dir[0] * distance * (1 - p), -dir[1] * distance * (1 - p));
    } else {
        pair[0] = try opacityNode(arena, 1 - p, out_layer);
        pair[1] = try opacityNode(arena, p, in_layer);
    }
    const fields = try arena.alloc(value.Field, 1);
    fields[0] = .{ .name = "layers", .value = .{ .array = .{ .elems = pair } } };
    return .{ .constructed = .{ .name = "compose", .fields = fields } };
}

fn translated(arena: std.mem.Allocator, layer: Value, x: f64, y: f64) SampleError!Value {
    const fields = try arena.alloc(value.Field, 3);
    fields[0] = .{ .name = "", .value = layer };
    fields[1] = .{ .name = "x", .value = .{ .number = .{ .value = x, .unit = .px } } };
    fields[2] = .{ .name = "y", .value = .{ .number = .{ .value = y, .unit = .px } } };
    return .{ .constructed = .{ .name = "translate", .fields = fields } };
}

/// `series([a, b, c], [2s, 1s, 3s])`: each layer in turn, each on its
/// own clock from 0; nothing after the last one ends (Remotion's
/// `<Series>`).
fn tryEvalSeries(arena: std.mem.Allocator, c: value.Constructed, t: f64) SampleError!?Value {
    var layers: ?[]const Value = null;
    var durs: ?[]const Value = null;
    for (c.fields) |f| {
        if (f.value != .array) continue;
        if (std.mem.eql(u8, f.name, "layers") or (f.name.len == 0 and layers == null)) {
            layers = f.value.array.elems;
        } else if (std.mem.eql(u8, f.name, "durations") or f.name.len == 0) {
            durs = f.value.array.elems;
        }
    }
    const ls = layers orelse return null;
    const ds = durs orelse return null;
    if (ls.len == 0 or ls.len != ds.len) return null;
    var start: f64 = 0;
    for (ls, ds) |layer, d| {
        if (d != .number) return null;
        const len = numberToSeconds(d.number);
        if (t < start + len) return try sampleAt(arena, layer, @max(0, t - start));
        start += len;
    }
    const last = ls[ls.len - 1];
    return try opacityNode(arena, 0, try sampleAt(arena, last, numberToSeconds(ds[ds.len - 1].number)));
}

/// `spring(from:, to:, at:, stiffness:, damping:, mass:)` → the value a
/// damped spring has reached at `t`: `from` until `at` (default 0s),
/// then on towards `to`, overshooting when under-damped. Closed form,
/// so the same at any frame rate. Defaults (100, 10, 1) are Remotion's.
fn tryEvalSpring(c: value.Constructed, t: f64) ?Value {
    var from: ?value.Number = null;
    var to: ?value.Number = null;
    var at: f64 = 0;
    for (c.fields) |f| {
        if (f.value != .number) continue;
        if (std.mem.eql(u8, f.name, "from")) from = f.value.number;
        if (std.mem.eql(u8, f.name, "to")) to = f.value.number;
        if (std.mem.eql(u8, f.name, "at")) at = numberToSeconds(f.value.number);
    }
    const a = from orelse value.Number{ .value = 0, .unit = if (to) |x| x.unit else null };
    const b = to orelse value.Number{ .value = 1, .unit = a.unit };
    const p = easing.spring(springConfig(c), t - at);
    return .{ .number = .{ .value = a.value + p * (b.value - a.value), .unit = a.unit orelse b.unit } };
}

/// `noise(seed, period, amplitude?)` → smooth gradient noise over time:
/// one random hill or valley per `period`, scaled to ±`amplitude`
/// (unit carried, default 1). The seed is a string or a number.
fn tryEvalNoise(c: value.Constructed, t: f64) ?Value {
    var seed_buf: [64]u8 = undefined;
    var seed: ?[]const u8 = null;
    var period: ?f64 = null;
    var amp: value.Number = .{ .value = 1, .unit = null };
    var pos: usize = 0;
    for (c.fields) |f| {
        const slot: usize = if (f.name.len == 0) blk: {
            pos += 1;
            break :blk pos - 1;
        } else if (std.mem.eql(u8, f.name, "seed")) 0 else if (std.mem.eql(u8, f.name, "period")) 1 else if (std.mem.eql(u8, f.name, "amplitude")) 2 else continue;
        switch (slot) {
            0 => seed = seedBytes(f.value, &seed_buf),
            1 => if (f.value == .number) {
                period = numberToSeconds(f.value.number);
            },
            2 => if (f.value == .number) {
                amp = f.value.number;
            },
            else => {},
        }
    }
    const p = period orelse return null;
    if (p == 0) return null;
    const n = easing.noise1(seed orelse "", t / p);
    return .{ .number = .{ .value = n * amp.value, .unit = amp.unit } };
}

/// `random(seed)` → a number in [0, 1), the same on every renderer.
fn tryEvalRandom(c: value.Constructed) ?Value {
    var buf: [64]u8 = undefined;
    for (c.fields) |f| {
        if (f.name.len != 0 and !std.mem.eql(u8, f.name, "seed")) continue;
        const seed = seedBytes(f.value, &buf) orelse return null;
        return .{ .number = .{ .value = easing.random(seed), .unit = null } };
    }
    return null;
}

/// A seed's bytes: a string's text, or a number's decimal form.
fn seedBytes(v: Value, buf: []u8) ?[]const u8 {
    return switch (v) {
        .string => |s| s,
        .number => |n| std.fmt.bufPrint(buf, "{d}", .{n.value}) catch null,
        else => null,
    };
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

    // Resolve keyframes — each one is a record `{at, value, easing?}`.
    const times = try arena.alloc(f64, kfs.elems.len);
    const values = try arena.alloc(Value, kfs.elems.len);
    const eases = try arena.alloc(?easing.Easing, kfs.elems.len);
    for (kfs.elems, 0..) |elem, i| {
        if (elem != .record) return null;
        var at_v: ?Value = null;
        var val_v: ?Value = null;
        eases[i] = null;
        for (elem.record.fields) |f| {
            if (std.mem.eql(u8, f.name, "at")) at_v = f.value;
            if (std.mem.eql(u8, f.name, "value")) val_v = f.value;
            if (std.mem.eql(u8, f.name, "easing")) eases[i] = easingOf(f.value);
        }
        const at = at_v orelse return null;
        if (at != .number) return null;
        times[i] = numberToSeconds(at.number);
        // Sample the keyframe's value too — handles `value:` containing
        // another animate (uncommon but the type doesn't forbid it).
        values[i] = try sampleAt(arena, val_v orelse return null, t);
    }

    return try interpolate(arena, times, values, eases, t, opts_rec);
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

const Extrapolate = enum { hold, extend, loop, ping_pong };

fn optField(opts: ?value.Record, name: []const u8) ?Value {
    const o = opts orelse return null;
    for (o.fields) |f| if (std.mem.eql(u8, f.name, name)) return f.value;
    return null;
}

/// A bare name option (`forever`, `oklab`, `loop`, …), or null.
fn optName(opts: ?value.Record, name: []const u8) ?[]const u8 {
    const v = optField(opts, name) orelse return null;
    return switch (v) {
        .constructed => |c| if (c.fields.len == 0) c.name else null,
        else => null,
    };
}

fn isForever(opts: value.Record) bool {
    const n = optName(opts, "repeat") orelse return false;
    return std.mem.eql(u8, n, "forever");
}

fn extrapolation(opts: ?value.Record, side: []const u8) Extrapolate {
    if (std.mem.eql(u8, side, "after")) {
        if (opts) |o| if (isForever(o)) return .loop;
    }
    const n = optName(opts, side) orelse return .hold;
    return std.meta.stringToEnum(Extrapolate, n) orelse .hold;
}

/// An easing value (`easing.out_cubic`, `easing.bezier(...)`,
/// `easing.steps(n)`, `easing.spring(...)`) as a curve, or null for
/// anything else (the segment is then linear).
pub fn easingOf(v: Value) ?easing.Easing {
    const c = switch (v) {
        .constructed => |c| c,
        else => return null,
    };
    const prefix = "easing.";
    if (!std.mem.startsWith(u8, c.name, prefix)) return null;
    const name = c.name[prefix.len..];
    if (std.mem.eql(u8, name, "bezier")) {
        var p: [4]f64 = undefined;
        var n: usize = 0;
        for (c.fields) |f| {
            if (f.name.len != 0 or f.value != .number or n == 4) continue;
            p[n] = f.value.number.value;
            n += 1;
        }
        return if (n == 4) .{ .bezier = p } else null;
    }
    if (std.mem.eql(u8, name, "steps")) {
        // Bounded before the cast: a huge step count is a mistake, not
        // a reason to trap (u32 overflow panics natively, traps in WASM).
        for (c.fields) |f| if (f.value == .number and f.value.number.value >= 1)
            return .{ .steps = @intFromFloat(@min(@floor(f.value.number.value), 1_000_000)) };
        return null;
    }
    if (std.mem.eql(u8, name, "spring")) return .{ .spring = springConfig(c) };
    if (c.fields.len != 0) return null;
    return easing.named(name);
}

fn springConfig(c: value.Constructed) easing.Spring {
    var cfg: easing.Spring = .{};
    for (c.fields) |f| {
        if (f.value != .number) continue;
        const x = f.value.number.value;
        if (std.mem.eql(u8, f.name, "stiffness")) cfg.stiffness = x;
        if (std.mem.eql(u8, f.name, "damping")) cfg.damping = x;
        if (std.mem.eql(u8, f.name, "mass")) cfg.mass = x;
    }
    return cfg;
}

/// Kept for the curve tests: a `"easing.<name>"` constructor name
/// through its curve (linear when unknown).
fn applyEasing(name: []const u8, frac: f64) f64 {
    const e = easingOf(.{ .constructed = .{ .name = name, .fields = &.{} } }) orelse return frac;
    return easing.apply(e, frac);
}

fn interpolate(
    arena: std.mem.Allocator,
    times: []const f64,
    values: []const Value,
    eases: []const ?easing.Easing,
    t_in: f64,
    opts: ?value.Record,
) SampleError!Value {
    if (times.len == 1) return values[0];

    const t_min = times[0];
    const t_max = times[times.len - 1];
    const span = t_max - t_min;
    var t = t_in;

    // Outside the keyframes: hold, carry the slope on (extend), wrap
    // (loop, into the half-open span so the loop closes cleanly) or
    // bounce back and forth (ping_pong).
    if (t > t_max and span > 0) switch (extrapolation(opts, "after")) {
        .hold => return values[values.len - 1],
        .extend => return extendLinear(times, values, values.len - 2, t),
        .loop => t = t_min + @mod(t_in - t_min, span),
        .ping_pong => {
            const k = @mod(t_in - t_min, 2 * span);
            t = if (k <= span) t_min + k else t_max - (k - span);
        },
    };
    // `repeat: forever` always wrapped the whole time line, before the
    // first keyframe too (a loop that starts at 1s is mid-cycle at 0.5s):
    // kept as it was, so pinned sources keep their first cycle.
    if (t < t_min and span > 0 and opts != null and isForever(opts.?)) t = t_min + @mod(t_in - t_min, span);
    if (t < t_min) switch (extrapolation(opts, "before")) {
        .extend => return extendLinear(times, values, 0, t),
        else => return values[0],
    };
    if (t >= t_max) return values[values.len - 1];
    if (t <= t_min) return values[0];

    // Find the bracketing pair. Linear scan is fine — animations have
    // a handful of keyframes, not thousands.
    var i: usize = 0;
    while (i + 1 < times.len and t > times[i + 1]) i += 1;
    const lo_t = times[i];
    const hi_t = times[i + 1];
    if (hi_t == lo_t) return values[i];
    const linear_frac = (t - lo_t) / (hi_t - lo_t);
    const segment_ease = eases[i + 1] orelse if (optField(opts, "easing")) |e| easingOf(e) else null;
    const eased = if (segment_ease) |e| easing.apply(e, linear_frac) else linear_frac;
    const blend_colors = if (optName(opts, "blend")) |b| std.mem.eql(u8, b, "oklab") else false;
    return try interpolatePair(arena, values[i], values[i + 1], eased, blend_colors);
}

/// The straight line through segment `i` (numbers only), continued to `t`.
fn extendLinear(times: []const f64, values: []const Value, i: usize, t: f64) Value {
    const a = values[i];
    const b = values[i + 1];
    if (a != .number or b != .number or times[i + 1] == times[i])
        return if (t < times[0]) values[0] else values[values.len - 1];
    const slope = (b.number.value - a.number.value) / (times[i + 1] - times[i]);
    return .{ .number = .{ .value = a.number.value + slope * (t - times[i]), .unit = a.number.unit } };
}

fn interpolatePair(arena: std.mem.Allocator, a: Value, b: Value, frac: f64, blend_colors: bool) SampleError!Value {
    // Numbers blend linearly, preserving the first keyframe's unit.
    if (a == .number and b == .number) {
        return .{ .number = .{
            .value = a.number.value + frac * (b.number.value - a.number.value),
            .unit = a.number.unit,
        } };
    }
    if (blend_colors and a == .color and b == .color) {
        if (oklabOf(a.color)) |la| if (oklabOf(b.color)) |lb| {
            return try oklchValue(arena, .{
                la[0] + frac * (lb[0] - la[0]),
                la[1] + frac * (lb[1] - la[1]),
                la[2] + frac * (lb[2] - la[2]),
            });
        };
    }
    // Anything else steps; frac can pass 1 under `back` / `elastic`.
    return if (frac < 1.0) a else b;
}

/// A colour with plain-number channels as OKLab [L, a, b], or null
/// when a channel is not a number yet.
fn oklabOf(c: value.Color) ?[3]f64 {
    return switch (c) {
        .hex => |h| blk: {
            const rgb = hexChannels(h.digits) orelse break :blk null;
            break :blk linearSrgbToOklab(srgbDecode(rgb[0]), srgbDecode(rgb[1]), srgbDecode(rgb[2]));
        },
        .srgb => |v| blk: {
            const r = num(v.r.*) orelse break :blk null;
            const g = num(v.g.*) orelse break :blk null;
            const b = num(v.b.*) orelse break :blk null;
            break :blk linearSrgbToOklab(srgbDecode(r), srgbDecode(g), srgbDecode(b));
        },
        .oklab => |v| .{ num(v.l.*) orelse return null, num(v.a.*) orelse return null, num(v.b.*) orelse return null },
        .oklch => |v| blk: {
            const l = num(v.l.*) orelse break :blk null;
            const ch = num(v.c.*) orelse break :blk null;
            const h = (num(v.h.*) orelse break :blk null) * std.math.pi / 180.0;
            break :blk .{ l, ch * @cos(h), ch * @sin(h) };
        },
    };
}

fn num(v: Value) ?f64 {
    return if (v == .number) v.number.value else null;
}

/// `#rgb`, `#rrggbb` (alpha ignored) → channels in 0..1.
fn hexChannels(d: []const u8) ?[3]f64 {
    var out: [3]f64 = undefined;
    switch (d.len) {
        3, 4 => for (0..3) |i| {
            const x = std.fmt.charToDigit(d[i], 16) catch return null;
            out[i] = @as(f64, @floatFromInt(x * 17)) / 255.0;
        },
        6, 8 => for (0..3) |i| {
            const x = std.fmt.parseInt(u8, d[i * 2 .. i * 2 + 2], 16) catch return null;
            out[i] = @as(f64, @floatFromInt(x)) / 255.0;
        },
        else => return null,
    }
    return out;
}

fn srgbDecode(x: f64) f64 {
    return if (x <= 0.04045) x / 12.92 else std.math.pow(f64, (x + 0.055) / 1.055, 2.4);
}

// Björn Ottosson's linear sRGB → OKLab (the inverse of render.zig's
// oklabToRgba matrices).
fn linearSrgbToOklab(r: f64, g: f64, b: f64) [3]f64 {
    const l = std.math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = std.math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = std.math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return .{
        0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
        1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
        0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
    };
}

/// A blended colour, written as `oklch(L, C, h°)` — the form every
/// renderer reads.
fn oklchValue(arena: std.mem.Allocator, lab: [3]f64) SampleError!Value {
    const ch = @sqrt(lab[1] * lab[1] + lab[2] * lab[2]);
    var h = std.math.atan2(lab[2], lab[1]) * 180.0 / std.math.pi;
    if (h < 0) h += 360;
    const channels = try arena.alloc(Value, 3);
    channels[0] = .{ .number = .{ .value = lab[0], .unit = null } };
    channels[1] = .{ .number = .{ .value = ch, .unit = null } };
    channels[2] = .{ .number = .{ .value = h, .unit = .deg } };
    return .{ .color = .{ .oklch = .{ .l = &channels[0], .c = &channels[1], .h = &channels[2] } } };
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
    // Before the first keyframe too: t=-2 wraps to 2 (the loop runs on
    // the whole time line, as it always did).
    const early = try sampleAt(a, anim, -2.0);
    try std.testing.expectApproxEqAbs(@as(f64, 180), early.number.value, 1e-9);
}

test "easingOf: a huge steps() count is bounded, not a trap" {
    var fields = [_]value.Field{.{ .name = "", .value = .{ .number = .{ .value = 1e12, .unit = null } } }};
    const e = easingOf(.{ .constructed = .{ .name = "easing.steps", .fields = &fields } }) orelse return error.TestUnexpectedResult;
    try std.testing.expectEqual(@as(u32, 1_000_000), e.steps);
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
    easing_name: []const u8,
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
        .value = .{ .constructed = .{ .name = easing_name, .fields = &.{} } },
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

fn evalAndSample(arena: std.mem.Allocator, source: []const u8, t: f64) !Value {
    const ts = @import("tree_sitter.zig");
    const lower = @import("lower.zig");
    const eval = @import("eval.zig");
    var parsed = try ts.parse(source);
    defer parsed.deinit();
    var lowerer = lower.Lowerer.init(arena, source);
    const program = try lowerer.lowerProgram(parsed.root());
    var ev = eval.Evaluator.init(arena, arena, source, "<test>");
    const result = try ev.evalProgram(program);
    return sampleAt(arena, result.bindings[0].value, t);
}

test "sampleAt: a keyframe's own easing overrides the animate's" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const src = "let x = animate { 0s => 0px, 1s => 100px with easing.in_cubic, 2s => 200px } with { easing: easing.out_cubic };";
    // First segment (into 1s) is in_cubic: lags at its midpoint.
    try std.testing.expect((try evalAndSample(a, src, 0.5)).number.value < 20);
    // Second segment falls back to out_cubic: leads at its midpoint.
    try std.testing.expect((try evalAndSample(a, src, 1.5)).number.value > 180);
}

test "sampleAt: extend, loop and ping_pong past the last keyframe" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const ext = "let x = animate { 0s => 0px, 1s => 10px } with { after: extend };";
    try std.testing.expectApproxEqAbs(@as(f64, 30), (try evalAndSample(a, ext, 3)).number.value, 1e-9);
    const loop = "let x = animate { 0s => 0px, 1s => 10px } with { after: loop };";
    try std.testing.expectApproxEqAbs(@as(f64, 5), (try evalAndSample(a, loop, 2.5)).number.value, 1e-9);
    const pp = "let x = animate { 0s => 0px, 1s => 10px } with { after: ping_pong };";
    try std.testing.expectApproxEqAbs(@as(f64, 7.5), (try evalAndSample(a, pp, 1.25)).number.value, 1e-9);
    const hold = "let x = animate { 0s => 0px, 1s => 10px };";
    try std.testing.expectApproxEqAbs(@as(f64, 10), (try evalAndSample(a, hold, 3)).number.value, 1e-9);
}

test "sampleAt: colours blend from runner 0.0.14, and step before it" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const new = "runner \"0.0.14\";\nlet c = animate { 0s => #000000, 1s => #ffffff };";
    const mid = try evalAndSample(a, new, 0.5);
    try std.testing.expect(mid.color == .oklch);
    try std.testing.expectApproxEqAbs(@as(f64, 0.5), mid.color.oklch.l.number.value, 1e-3);
    const old = "runner \"0.0.13\";\nlet c = animate { 0s => #000000, 1s => #ffffff };";
    const stepped = try evalAndSample(a, old, 0.5);
    try std.testing.expectEqualStrings("000000", stepped.color.hex.digits);
}

test "sampleAt: spring, noise and random resolve to numbers" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const spring_src = "let x = spring(from: 0px, to: 100px, at: 1s);";
    try std.testing.expectEqual(@as(f64, 0), (try evalAndSample(a, spring_src, 0.5)).number.value);
    try std.testing.expect((try evalAndSample(a, spring_src, 1.3)).number.value > 100); // overshoot
    try std.testing.expectApproxEqAbs(@as(f64, 100), (try evalAndSample(a, spring_src, 4)).number.value, 0.2);
    const n = try evalAndSample(a, "let x = noise(\"wind\", 2s, 30deg);", 0.7);
    try std.testing.expect(n.number.unit.? == .deg and @abs(n.number.value) <= 30);
    const r1 = try evalAndSample(a, "let x = random(\"a\");", 0);
    const r2 = try evalAndSample(a, "let x = random(\"a\");", 5);
    try std.testing.expectEqual(r1.number.value, r2.number.value);
}

test "sampleAt: during shows a layer on its own clock, hidden outside" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const src = "let x = during(1s, 3s, animate { 0s => 0px, 1s => 100px }, fade_in: 0.5s);";
    const before = try evalAndSample(a, src, 0.5);
    try std.testing.expectEqualStrings("opacity", before.constructed.name);
    try std.testing.expectEqual(@as(f64, 0), before.constructed.fields[0].value.number.value);
    const fading = try evalAndSample(a, src, 1.25);
    try std.testing.expectEqualStrings("opacity", fading.constructed.name);
    try std.testing.expectApproxEqAbs(@as(f64, 0.5), fading.constructed.fields[0].value.number.value, 1e-9);
    try std.testing.expectApproxEqAbs(@as(f64, 25), fading.constructed.fields[1].value.number.value, 1e-9);
    const on = try evalAndSample(a, src, 2);
    try std.testing.expectApproxEqAbs(@as(f64, 100), on.number.value, 1e-9);
}

test "sampleAt: shift, loop, freeze and the chained form" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const anim = "animate { 0s => 0px, 1s => 100px }";
    const shift_src = try std.fmt.allocPrint(a, "let x = shift(2s, {s});", .{anim});
    try std.testing.expectApproxEqAbs(@as(f64, 50), (try evalAndSample(a, shift_src, 2.5)).number.value, 1e-9);
    const loop_src = try std.fmt.allocPrint(a, "let x = {s}.loop(0.5s);", .{anim});
    try std.testing.expectApproxEqAbs(@as(f64, 25), (try evalAndSample(a, loop_src, 1.25)).number.value, 1e-9);
    const freeze_src = try std.fmt.allocPrint(a, "let x = freeze(0.3s, {s});", .{anim});
    try std.testing.expectApproxEqAbs(@as(f64, 30), (try evalAndSample(a, freeze_src, 9)).number.value, 1e-9);
}

test "sampleAt: series plays each layer in turn, then nothing" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const src = "let x = series([animate { 0s => 0px, 1s => 10px }, animate { 0s => 100px, 1s => 200px }], [1s, 2s]);";
    try std.testing.expectApproxEqAbs(@as(f64, 5), (try evalAndSample(a, src, 0.5)).number.value, 1e-9);
    try std.testing.expectApproxEqAbs(@as(f64, 150), (try evalAndSample(a, src, 1.5)).number.value, 1e-9);
    try std.testing.expectEqualStrings("opacity", (try evalAndSample(a, src, 3.5)).constructed.name);
}

test "sampleAt: transition fades or slides from one layer to the next" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const src = "let x = transition(rect(width: 10px), circle(radius: 5px), at: 1s, duration: 1s);";
    try std.testing.expectEqualStrings("rect", (try evalAndSample(a, src, 0.5)).constructed.name);
    const mid = try evalAndSample(a, src, 1.5);
    try std.testing.expectEqualStrings("compose", mid.constructed.name);
    const pair = mid.constructed.fields[0].value.array.elems;
    try std.testing.expectApproxEqAbs(@as(f64, 0.5), pair[0].constructed.fields[0].value.number.value, 1e-9);
    try std.testing.expectEqualStrings("circle", (try evalAndSample(a, src, 2.5)).constructed.name);
    const slide = "let x = transition(rect(width: 10px), circle(radius: 5px), at: 0s, duration: 1s, kind: slide_left, distance: 100px);";
    const s_mid = try evalAndSample(a, slide, 0.25);
    const in_layer = s_mid.constructed.fields[0].value.array.elems[1];
    try std.testing.expectEqualStrings("translate", in_layer.constructed.name);
    try std.testing.expectApproxEqAbs(@as(f64, 75), in_layer.constructed.fields[1].value.number.value, 1e-9);
}

test "eval: for loops make arrays, nest, and splice into compose" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const xs = try evalAndSample(a, "let xs = for i in 0..4 { i * 10px };", 0);
    try std.testing.expectEqual(@as(usize, 4), xs.array.elems.len);
    try std.testing.expectEqual(@as(f64, 30), xs.array.elems[3].number.value);
    try std.testing.expectEqual(ast_unit_px, xs.array.elems[3].number.unit.?);
    const grid = try evalAndSample(a, "let g = compose [rect(width: 1px), for r in 0..2 { for c in 0..3 { rect(width: (r * 3 + c) * 1px) } }];", 0);
    const layers = grid.constructed.fields[0].value.array.elems;
    try std.testing.expectEqual(@as(usize, 7), layers.len);
    try std.testing.expectEqual(@as(f64, 5), layers[6].constructed.fields[0].value.number.value);
    // A staggered entrance: each layer's window starts later.
    const stag = try evalAndSample(a, "let s = compose [for i in 0..3 { during(i * 1s, 10s, rect(width: 1px)) }];", 1.5);
    const sl = stag.constructed.fields[0].value.array.elems;
    try std.testing.expectEqualStrings("rect", sl[1].constructed.name);
    try std.testing.expectEqualStrings("opacity", sl[2].constructed.name);
}

const ast_unit_px = @import("ast.zig").Unit.px;

test "sampleAt: arithmetic with a time-varying side is folded at t" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    // an animate times a number, a number plus a wave: both staged as expr by eval
    const scaled = try evalAndSample(a, "let x = animate { 0s => 0px, 1s => 10px } * 2;", 0.5);
    try std.testing.expectApproxEqAbs(@as(f64, 10), scaled.number.value, 1e-9);
    try std.testing.expect(scaled.number.unit.? == .px);
    const summed = try evalAndSample(a, "let x = 10px + wave(amplitude: 4px, period: 1s);", 0.25);
    try std.testing.expectApproxEqAbs(@as(f64, 14), summed.number.value, 1e-9);
    // a ratio of like units is a plain number, as eval's own rule
    const ratio = try evalAndSample(a, "let x = animate { 0s => 0px, 1s => 100px } / 50px;", 0.5);
    try std.testing.expectApproxEqAbs(@as(f64, 1), ratio.number.value, 1e-9);
    try std.testing.expect(ratio.number.unit == null);
}

test "sampleAt: a video plays on its layer's clock, through during, freeze and loop" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const clockOf = struct {
        fn of(v: Value) f64 {
            for (v.constructed.fields) |f| if (std.mem.eql(u8, f.name, "media_clock")) return f.value.number.value;
            return -1;
        }
    }.of;
    // plain: the scene's time
    const plain = try evalAndSample(a, "runner \"0.0.14\";\nlet x = video(\"/a.mp4\", width: 100px);", 2.5);
    try std.testing.expectApproxEqAbs(@as(f64, 2.5), clockOf(plain), 1e-9);
    // during starts it at its window; freeze holds a frame; loop repeats
    const late = try evalAndSample(a, "runner \"0.0.14\";\nlet x = during(1s, 9s, video(\"/a.mp4\", width: 100px));", 3);
    try std.testing.expectApproxEqAbs(@as(f64, 2), clockOf(late), 1e-9);
    const held = try evalAndSample(a, "runner \"0.0.14\";\nlet x = freeze(0.5s, video(\"/a.mp4\", width: 100px));", 4);
    try std.testing.expectApproxEqAbs(@as(f64, 0.5), clockOf(held), 1e-9);
    const looped = try evalAndSample(a, "runner \"0.0.14\";\nlet x = loop(2s, video(\"/a.mp4\", width: 100px));", 5);
    try std.testing.expectApproxEqAbs(@as(f64, 1), clockOf(looped), 1e-9);
    // an older pin keeps its tree: no clock
    const old = try evalAndSample(a, "runner \"0.0.13\";\nlet x = video(\"/a.mp4\");", 1);
    try std.testing.expectEqual(@as(f64, -1), clockOf(old));
}
