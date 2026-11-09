//! The unit table: every `ast.Unit`, the family it belongs to and its
//! scale in that family's base unit. The one place this lives — the
//! evaluator (a ratio of like units is a plain number), the host API
//! (`@ui(max: 500ms)` in a parameter's unit) and the checker (UNT001)
//! all read it, so adding a unit or correcting a scale is one edit.
const std = @import("std");
const ast = @import("ast.zig");

pub const Family = enum { time, angle, length, percent, frequency, tempo, bars, beats };

pub fn family(u: ast.Unit) Family {
    return switch (u) {
        .s, .ms, .us, .ns => .time,
        .deg, .rad, .turn => .angle,
        .px => .length,
        .percent => .percent,
        .hz, .khz => .frequency,
        .bpm => .tempo,
        .bars => .bars,
        .beats => .beats,
    };
}

/// A unit in its family's base unit (s, deg, px, %, hz, bpm, bars, beats).
pub fn scale(u: ast.Unit) f64 {
    return switch (u) {
        .ms => 1e-3,
        .us => 1e-6,
        .ns => 1e-9,
        .rad => 180.0 / std.math.pi,
        .turn => 360,
        .khz => 1000,
        .s, .deg, .px, .percent, .hz, .bpm, .bars, .beats => 1,
    };
}

/// The unit as written in a source.
pub fn name(u: ast.Unit) []const u8 {
    return switch (u) {
        .s => "s",
        .ms => "ms",
        .us => "us",
        .ns => "ns",
        .deg => "deg",
        .rad => "rad",
        .turn => "turn",
        .px => "px",
        .percent => "%",
        .hz => "hz",
        .khz => "khz",
        .bpm => "bpm",
        .bars => "bars",
        .beats => "beats",
    };
}

test "units: every unit has a family, a scale and a name" {
    inline for (std.meta.fields(ast.Unit)) |f| {
        const u: ast.Unit = @enumFromInt(f.value);
        _ = family(u);
        try std.testing.expect(scale(u) > 0);
        try std.testing.expect(name(u).len > 0);
    }
    try std.testing.expectEqual(Family.time, family(.ms));
    try std.testing.expectApproxEqAbs(@as(f64, 57.29577951308232), scale(.rad), 1e-9);
}
