//! Easing curves and springs — the timing vocabulary Motion shares
//! between cmotion and PSL.
//!
//! Every curve maps a fraction `u` in [0, 1] to progress, with
//! `curve(0) = 0` and `curve(1) = 1` so keyframes, loops and clamps
//! stay seamless; `back` and `elastic` overshoot in between. Names are
//! `<in | out | in_out>_<family>` for the families quad, cubic, quart,
//! quint, sine, expo, circ, back, elastic, bounce, plus `linear`; the
//! formulas are the standard Penner set (as in CSS, Remotion's `Easing`
//! and easings.net). PSL exposes the same set as `ease_<name>(u)`; keep
//! the two in step (`psl/src/interp.rs`, `ease_curve`).
//!
//! Parameterised curves: `bezier(x1, y1, x2, y2)` (CSS
//! `cubic-bezier`), `steps(n)` (jump at the end of each step) and
//! `spring(stiffness, damping, mass)` stretched over the segment.
//!
//! Springs are evaluated in closed form at a time, not stepped frame by
//! frame, so a spring looks the same at any frame rate. The model is a
//! unit mass-spring-damper released from 0 towards 1 at rest; the
//! defaults (stiffness 100, damping 10, mass 1) are Remotion's.

const std = @import("std");

pub const Family = enum { quad, cubic, quart, quint, sine, expo, circ, back, elastic, bounce };
pub const Mode = enum { in, out, in_out };

pub const Spring = struct {
    stiffness: f64 = 100,
    damping: f64 = 10,
    mass: f64 = 1,
};

pub const Easing = union(enum) {
    linear,
    curve: struct { family: Family, mode: Mode },
    bezier: [4]f64,
    steps: u32,
    spring: Spring,
};

/// `"out_cubic"`, `"linear"`, … → a curve; null for an unknown name.
pub fn named(name: []const u8) ?Easing {
    if (std.mem.eql(u8, name, "linear")) return .linear;
    const modes = [_]struct { prefix: []const u8, mode: Mode }{
        .{ .prefix = "in_out_", .mode = .in_out },
        .{ .prefix = "in_", .mode = .in },
        .{ .prefix = "out_", .mode = .out },
    };
    for (modes) |m| {
        if (!std.mem.startsWith(u8, name, m.prefix)) continue;
        const fam = std.meta.stringToEnum(Family, name[m.prefix.len..]) orelse return null;
        return .{ .curve = .{ .family = fam, .mode = m.mode } };
    }
    return null;
}

/// Every name `named` accepts, for diagnostics.
pub const names_help = "linear, or in_ / out_ / in_out_ + quad, cubic, quart, quint, sine, expo, circ, back, elastic, bounce; or bezier(x1, y1, x2, y2), steps(n), spring(stiffness:, damping:, mass:)";

pub fn apply(e: Easing, u_in: f64) f64 {
    const u = std.math.clamp(u_in, 0, 1);
    return switch (e) {
        .linear => u,
        .curve => |c| curve(c.family, c.mode, u),
        .bezier => |b| cubicBezier(b[0], b[1], b[2], b[3], u),
        .steps => |n| if (n == 0) u else @min(1.0, @floor(u * @as(f64, @floatFromInt(n))) / @as(f64, @floatFromInt(n))),
        .spring => |s| springEasing(s, u),
    };
}

fn curve(f: Family, m: Mode, u: f64) f64 {
    return switch (m) {
        .in => easeIn(f, u),
        .out => 1 - easeIn(f, 1 - u),
        .in_out => if (u < 0.5) easeIn(f, 2 * u) / 2 else 1 - easeIn(f, 2 - 2 * u) / 2,
    };
}

/// The `in` form of each family; `out` and `in_out` are derived from it.
fn easeIn(f: Family, u: f64) f64 {
    const pi = std.math.pi;
    return switch (f) {
        .quad => u * u,
        .cubic => u * u * u,
        .quart => u * u * u * u,
        .quint => u * u * u * u * u,
        .sine => 1 - @cos(u * pi / 2),
        .expo => if (u == 0) 0 else std.math.pow(f64, 2, 10 * u - 10),
        .circ => 1 - @sqrt(@max(0, 1 - u * u)),
        .back => blk: {
            const c1: f64 = 1.70158;
            const c3: f64 = c1 + 1;
            break :blk c3 * u * u * u - c1 * u * u;
        },
        .elastic => blk: {
            if (u == 0 or u == 1) break :blk u;
            const c4: f64 = (2.0 * pi) / 3.0;
            break :blk -std.math.pow(f64, 2, 10 * u - 10) * @sin((u * 10 - 10.75) * c4);
        },
        .bounce => 1 - bounceOut(1 - u),
    };
}

fn bounceOut(u: f64) f64 {
    const n1: f64 = 7.5625;
    const d1: f64 = 2.75;
    if (u < 1 / d1) return n1 * u * u;
    if (u < 2 / d1) {
        const v = u - 1.5 / d1;
        return n1 * v * v + 0.75;
    }
    if (u < 2.5 / d1) {
        const v = u - 2.25 / d1;
        return n1 * v * v + 0.9375;
    }
    const v = u - 2.625 / d1;
    return n1 * v * v + 0.984375;
}

/// CSS `cubic-bezier(x1, y1, x2, y2)` at `x = u`: solve the curve's x
/// for its parameter (Newton, then bisection), return its y.
pub fn cubicBezier(x1: f64, y1: f64, x2: f64, y2: f64, u: f64) f64 {
    if (u <= 0) return 0;
    if (u >= 1) return 1;
    const bx = struct {
        fn at(a: f64, b: f64, s: f64) f64 {
            const inv = 1 - s;
            return 3 * inv * inv * s * a + 3 * inv * s * s * b + s * s * s;
        }
        fn slope(a: f64, b: f64, s: f64) f64 {
            const inv = 1 - s;
            return 3 * inv * inv * a + 6 * inv * s * (b - a) + 3 * s * s * (1 - b);
        }
    };
    var s = u;
    var i: usize = 0;
    while (i < 8) : (i += 1) {
        const err = bx.at(x1, x2, s) - u;
        if (@abs(err) < 1e-9) return bx.at(y1, y2, s);
        const d = bx.slope(x1, x2, s);
        if (@abs(d) < 1e-9) break;
        s -= err / d;
    }
    var lo: f64 = 0;
    var hi: f64 = 1;
    s = u;
    i = 0;
    while (i < 60) : (i += 1) {
        const x = bx.at(x1, x2, s);
        if (@abs(x - u) < 1e-9) break;
        if (x < u) lo = s else hi = s;
        s = (lo + hi) / 2;
    }
    return bx.at(y1, y2, s);
}

/// Progress of a spring released from 0 towards 1, at `t` seconds after
/// release (0 before it). Under-, critically and over-damped cases in
/// closed form.
pub fn spring(cfg: Spring, t: f64) f64 {
    if (t <= 0) return 0;
    const k = @max(cfg.stiffness, 1e-9);
    const m = @max(cfg.mass, 1e-9);
    const c = @max(cfg.damping, 0);
    const w0 = @sqrt(k / m);
    const zeta = c / (2 * @sqrt(k * m));
    if (zeta < 1) {
        const wd = w0 * @sqrt(1 - zeta * zeta);
        const env = @exp(-zeta * w0 * t);
        return 1 - env * (@cos(wd * t) + (zeta * w0 / wd) * @sin(wd * t));
    }
    if (zeta == 1) return 1 - @exp(-w0 * t) * (1 + w0 * t);
    const r = w0 * @sqrt(zeta * zeta - 1);
    const r1 = -zeta * w0 + r;
    const r2 = -zeta * w0 - r;
    // x(t) = 1 + A e^{r1 t} + B e^{r2 t}, x(0) = 0, x'(0) = 0.
    const a = r2 / (r1 - r2);
    const b = -r1 / (r1 - r2);
    return 1 + a * @exp(r1 * t) + b * @exp(r2 * t);
}

/// Seconds until the spring stays within 0.1 % of its target: the decay
/// envelope of its slowest mode, so it can be used as a duration.
pub fn springDuration(cfg: Spring) f64 {
    const k = @max(cfg.stiffness, 1e-9);
    const m = @max(cfg.mass, 1e-9);
    const c = @max(cfg.damping, 0);
    const w0 = @sqrt(k / m);
    const zeta = c / (2 * @sqrt(k * m));
    if (zeta == 0) return std.math.inf(f64);
    const rate = if (zeta <= 1) zeta * w0 else w0 * (zeta - @sqrt(zeta * zeta - 1));
    return @log(1000.0) / rate;
}

/// A spring as an easing over a segment: the segment's duration is the
/// spring's settle time, and the last 0.1 % is snapped so `u = 1` lands
/// exactly on 1.
fn springEasing(cfg: Spring, u: f64) f64 {
    if (u >= 1) return 1;
    const d = springDuration(cfg);
    if (!std.math.isFinite(d)) return spring(cfg, u);
    return spring(cfg, u * d);
}

//
// Seeded randomness and noise
//

/// A deterministic number in [0, 1) for a seed (a string or the bits of
/// a number): the same seed gives the same number on every renderer.
pub fn random(seed: []const u8) f64 {
    const h = std.hash.Wyhash.hash(0x636d6f74696f6e, seed);
    return @as(f64, @floatFromInt(h >> 11)) / @as(f64, @floatFromInt(@as(u64, 1) << 53));
}

/// 1D gradient noise in [-1, 1], smooth, with value 0 at integers.
pub fn noise1(seed: []const u8, x: f64) f64 {
    const i = @floor(x);
    const f = x - i;
    const g0 = gradient(seed, i);
    const g1 = gradient(seed, i + 1);
    const fade = f * f * f * (f * (f * 6 - 15) + 10);
    const v = g0 * f + (g1 * (f - 1) - g0 * f) * fade;
    // The 1D Perlin range is ±0.5; scale to ±1.
    return std.math.clamp(v * 2, -1, 1);
}

fn gradient(seed: []const u8, lattice: f64) f64 {
    var buf: [256]u8 = undefined;
    const key = std.fmt.bufPrint(&buf, "{s}:{d}", .{ seed[0..@min(seed.len, 200)], lattice }) catch seed;
    return random(key) * 2 - 1;
}

//
// Tests
//

const testing = std.testing;

test "easing: every named curve maps 0 to 0 and 1 to 1" {
    inline for (std.meta.fields(Family)) |f| {
        inline for (std.meta.fields(Mode)) |m| {
            const e: Easing = .{ .curve = .{ .family = @enumFromInt(f.value), .mode = @enumFromInt(m.value) } };
            try testing.expectApproxEqAbs(@as(f64, 0), apply(e, 0), 1e-9);
            try testing.expectApproxEqAbs(@as(f64, 1), apply(e, 1), 1e-9);
        }
    }
}

test "easing: names resolve, unknown ones do not" {
    try testing.expect(named("out_back") != null);
    try testing.expect(named("in_out_bounce") != null);
    try testing.expect(named("linear") != null);
    try testing.expect(named("ease_out") == null);
    try testing.expect(named("out_wobble") == null);
}

test "easing: out_cubic leads, in_cubic lags, back overshoots" {
    try testing.expect(apply(named("out_cubic").?, 0.5) > 0.8);
    try testing.expect(apply(named("in_cubic").?, 0.5) < 0.2);
    var max: f64 = 0;
    var u: f64 = 0;
    while (u <= 1) : (u += 0.01) max = @max(max, apply(named("out_back").?, u));
    try testing.expect(max > 1.05);
}

test "easing: cubic-bezier(.25,.1,.25,1) is CSS `ease`" {
    // Reference values of CSS `ease` (Chromium) at x = 0.25 and 0.5.
    try testing.expectApproxEqAbs(@as(f64, 0.4094), cubicBezier(0.25, 0.1, 0.25, 1, 0.25), 2e-3);
    try testing.expectApproxEqAbs(@as(f64, 0.8024), cubicBezier(0.25, 0.1, 0.25, 1, 0.5), 2e-3);
}

test "easing: steps jump at the end of each step" {
    try testing.expectEqual(@as(f64, 0), apply(.{ .steps = 4 }, 0.2));
    try testing.expectEqual(@as(f64, 0.25), apply(.{ .steps = 4 }, 0.3));
    try testing.expectEqual(@as(f64, 1), apply(.{ .steps = 4 }, 1));
}

test "spring: starts at rest, overshoots when under-damped, settles" {
    const s: Spring = .{};
    try testing.expectEqual(@as(f64, 0), spring(s, 0));
    var max: f64 = 0;
    var t: f64 = 0;
    while (t < 2) : (t += 0.005) max = @max(max, spring(s, t));
    try testing.expect(max > 1.1);
    try testing.expectApproxEqAbs(@as(f64, 1), spring(s, springDuration(s)), 2e-3);
    // Critically and over-damped springs never overshoot.
    const crit: Spring = .{ .stiffness = 100, .damping = 20, .mass = 1 };
    const over: Spring = .{ .stiffness = 100, .damping = 40, .mass = 1 };
    t = 0;
    while (t < 3) : (t += 0.01) {
        try testing.expect(spring(crit, t) <= 1 + 1e-9);
        try testing.expect(spring(over, t) <= 1 + 1e-9);
    }
    try testing.expectEqual(@as(f64, 1), apply(.{ .spring = s }, 1));
}

test "random and noise are deterministic and in range" {
    try testing.expectEqual(random("a"), random("a"));
    try testing.expect(random("a") != random("b"));
    var x: f64 = -3;
    while (x < 3) : (x += 0.07) {
        const n = noise1("seed", x);
        try testing.expect(n >= -1 and n <= 1);
    }
    try testing.expectApproxEqAbs(@as(f64, 0), noise1("seed", 2), 1e-12);
    try testing.expectEqual(noise1("s", 1.3), noise1("s", 1.3));
}
