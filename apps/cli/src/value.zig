//! Cmotion runtime values — the output type of the stage-4 reference
//! interpreter (`src/eval.zig`).
//!
//! Design notes:
//!   - Arena-allocated like the AST. The interpreter owns the arena that
//!     backs every value it produces; primitive payloads (number text,
//!     string raw, color hex digits) may also be slices into the source
//!     buffer, so the source must outlive the value tree.
//!   - Stdlib constructors return *typed* variants (`Value.color`,
//!     `Value.shape`, ...) rather than a generic `(name, args)` record.
//!     This is deliberate: the renderer (stage 6) wants to switch on the
//!     value's shape, not parse a name string. The Plan.md decision was
//!     "typed records, keep the stage-4 / stage-6 boundary clean".
//!   - Unknown builtins (functions we haven't typed yet) raise an EVL
//!     diagnostic at eval time. There is no escape hatch into a generic
//!     `dyn` value — that path lets the renderer drift away from the
//!     reference interpreter's value shapes.
//!
//! Stage-4 v0 covers a small core: literals, scalars, colors, arrays,
//! records. Functions/closures/animations/frames will land as the
//! evaluator grows; each gets a new variant here, not a fallback.

const std = @import("std");
const ast = @import("ast.zig");

/// A numeric value carries the original textual representation and the
/// optional unit suffix. Arithmetic is done as f64 internally; the text
/// is preserved so JSON output is byte-stable across rebuilds and so
/// future high-precision modes (e.g. exact rationals) can slot in without
/// changing the value's external shape.
pub const Number = struct {
    /// f64 value of the literal, with the unit suffix stripped.
    value: f64,
    unit: ?ast.Unit,
};

/// Color mirrors the AST `Color` union — the evaluator preserves the
/// constructor form (hex / oklch / oklab / srgb) rather than collapsing
/// to a single normalized space. The renderer chooses the working space.
///
/// Components are `*const Value`, not `Number`, because cmotion colors
/// can have *animated* channels (`oklch(0.78, 0.20, hue)` where `hue` is
/// an animation). The renderer is responsible for resolving each
/// component at render time: a `Number` is used directly, a
/// `Constructed("animate", ...)` evaluates the animation at the current
/// frame, and so on. The interpreter doesn't pre-bake this — its job is
/// to carry the program's structure forward verbatim.
pub const Color = union(enum) {
    hex: struct { digits: []const u8 },
    oklch: struct { l: *const Value, c: *const Value, h: *const Value },
    oklab: struct { l: *const Value, a: *const Value, b: *const Value },
    srgb: struct { r: *const Value, g: *const Value, b: *const Value },
};

pub const Field = struct {
    name: []const u8,
    value: Value,
};

pub const Record = struct {
    fields: []const Field,
};

pub const Array = struct {
    elems: []const Value,
};

/// A closure: an AST lambda paired with a snapshot of the bindings
/// visible at the point of its creation. `params` and `body` borrow
/// directly into the AST arena (the AST outlives the value), while
/// `captured` lives in the evaluator's value arena.
///
/// Late binding is not modelled: each capture is a value-at-creation
/// snapshot, not a pointer into a live scope. That means mutual
/// recursion via two `let`s in the same block won't see each other;
/// once we need it we'll switch to scope-chained captures.
pub const Lambda = struct {
    params: []const ast.Param,
    body: ast.Block,
    captured: []const Field,
};

/// Staging variant for stdlib constructors that haven't been typed yet.
/// Each one preserves its constructor name and its (named or positional)
/// arguments — the renderer can switch on `.name` to recognise it. As
/// renderer needs pin down a constructor's shape, it graduates from
/// `Value.constructed` to a dedicated variant on this union (e.g. a
/// future `Value.frame`, `Value.shape`, `Value.animation`). This keeps
/// the typed-records decision intact while letting the interpreter run
/// against samples that use a wider stdlib than we've nailed down.
pub const Constructed = struct {
    name: []const u8,
    fields: []const Field,
};

pub const Value = union(enum) {
    nil,
    number: Number,
    /// Raw quoted source slice. Unescaping is deferred to the consumer.
    string: []const u8,
    @"bool": bool,
    color: Color,
    array: Array,
    record: Record,
    constructed: Constructed,
    lambda: Lambda,

    /// Write the JSON encoding of the value (no surrounding key, no
    /// trailing comma). Stable: `kind` is the discriminator, every variant
    /// uses a documented shape so downstream tools can match on it.
    ///
    /// Recursive (color components are nested values), so the error set
    /// is explicit — Zig can't infer it through the cycle.
    pub fn writeJson(self: Value, w: anytype) anyerror!void {
        switch (self) {
            .nil => try w.writeAll("{\"kind\":\"nil\"}"),
            .number => |n| {
                try w.writeAll("{\"kind\":\"number\",\"value\":");
                try writeF64(w, n.value);
                try w.writeAll(",\"unit\":");
                if (n.unit) |u| {
                    try w.writeAll("\"");
                    try w.writeAll(@tagName(u));
                    try w.writeAll("\"");
                } else {
                    try w.writeAll("null");
                }
                try w.writeAll("}");
            },
            .string => |s| {
                try w.writeAll("{\"kind\":\"string\",\"raw\":");
                try writeJsonString(w, s);
                try w.writeAll("}");
            },
            .@"bool" => |b| {
                try w.writeAll("{\"kind\":\"bool\",\"value\":");
                try w.writeAll(if (b) "true" else "false");
                try w.writeAll("}");
            },
            .color => |c| try writeColorJson(c, w),
            .array => |a| {
                try w.writeAll("{\"kind\":\"array\",\"elems\":[");
                for (a.elems, 0..) |elem, i| {
                    if (i != 0) try w.writeAll(",");
                    try elem.writeJson(w);
                }
                try w.writeAll("]}");
            },
            .record => |r| {
                try w.writeAll("{\"kind\":\"record\",\"fields\":[");
                for (r.fields, 0..) |f, i| {
                    if (i != 0) try w.writeAll(",");
                    try w.writeAll("{\"name\":");
                    try writeJsonString(w, f.name);
                    try w.writeAll(",\"value\":");
                    try f.value.writeJson(w);
                    try w.writeAll("}");
                }
                try w.writeAll("]}");
            },
            .constructed => |c| {
                try w.writeAll("{\"kind\":\"constructed\",\"name\":");
                try writeJsonString(w, c.name);
                try w.writeAll(",\"fields\":[");
                for (c.fields, 0..) |f, i| {
                    if (i != 0) try w.writeAll(",");
                    try w.writeAll("{\"name\":");
                    try writeJsonString(w, f.name);
                    try w.writeAll(",\"value\":");
                    try f.value.writeJson(w);
                    try w.writeAll("}");
                }
                try w.writeAll("]}");
            },
            .lambda => |l| {
                try w.writeAll("{\"kind\":\"lambda\",\"params\":[");
                for (l.params, 0..) |p, i| {
                    if (i != 0) try w.writeAll(",");
                    try writeJsonString(w, p.name.name);
                }
                try w.writeAll("]}");
            },
        }
    }

    /// Write the human text encoding. Intended for the default (non-JSON)
    /// `cmo eval` output. Mirrors the JSON shape loosely but keeps it
    /// scannable on a terminal.
    pub fn writeText(self: Value, w: anytype) anyerror!void {
        switch (self) {
            .nil => try w.writeAll("nil"),
            .number => |n| {
                try writeF64(w, n.value);
                if (n.unit) |u| try w.writeAll(@tagName(u));
            },
            .string => |s| try w.writeAll(s),
            .@"bool" => |b| try w.writeAll(if (b) "true" else "false"),
            .color => |c| try writeColorText(c, w),
            .array => |a| {
                try w.writeAll("[");
                for (a.elems, 0..) |elem, i| {
                    if (i != 0) try w.writeAll(", ");
                    try elem.writeText(w);
                }
                try w.writeAll("]");
            },
            .record => |r| {
                try w.writeAll("{");
                for (r.fields, 0..) |f, i| {
                    if (i != 0) try w.writeAll(", ");
                    try w.writeAll(f.name);
                    try w.writeAll(": ");
                    try f.value.writeText(w);
                }
                try w.writeAll("}");
            },
            .constructed => |c| {
                try w.writeAll(c.name);
                try w.writeAll("(");
                for (c.fields, 0..) |f, i| {
                    if (i != 0) try w.writeAll(", ");
                    if (!std.mem.eql(u8, f.name, "")) {
                        try w.writeAll(f.name);
                        try w.writeAll(": ");
                    }
                    try f.value.writeText(w);
                }
                try w.writeAll(")");
            },
            .lambda => |l| {
                try w.writeAll("|");
                for (l.params, 0..) |p, i| {
                    if (i != 0) try w.writeAll(", ");
                    try w.writeAll(p.name.name);
                }
                try w.writeAll("| { ... }");
            },
        }
    }
};

fn writeColorJson(c: Color, w: anytype) !void {
    switch (c) {
        .hex => |h| {
            try w.writeAll("{\"kind\":\"color\",\"form\":\"hex\",\"digits\":");
            try writeJsonString(w, h.digits);
            try w.writeAll("}");
        },
        .oklch => |v| {
            try w.writeAll("{\"kind\":\"color\",\"form\":\"oklch\",\"l\":");
            try v.l.writeJson(w);
            try w.writeAll(",\"c\":");
            try v.c.writeJson(w);
            try w.writeAll(",\"h\":");
            try v.h.writeJson(w);
            try w.writeAll("}");
        },
        .oklab => |v| {
            try w.writeAll("{\"kind\":\"color\",\"form\":\"oklab\",\"l\":");
            try v.l.writeJson(w);
            try w.writeAll(",\"a\":");
            try v.a.writeJson(w);
            try w.writeAll(",\"b\":");
            try v.b.writeJson(w);
            try w.writeAll("}");
        },
        .srgb => |v| {
            try w.writeAll("{\"kind\":\"color\",\"form\":\"srgb\",\"r\":");
            try v.r.writeJson(w);
            try w.writeAll(",\"g\":");
            try v.g.writeJson(w);
            try w.writeAll(",\"b\":");
            try v.b.writeJson(w);
            try w.writeAll("}");
        },
    }
}

fn writeColorText(c: Color, w: anytype) !void {
    switch (c) {
        .hex => |h| {
            try w.writeAll("#");
            try w.writeAll(h.digits);
        },
        .oklch => |v| {
            try w.writeAll("oklch(");
            try v.l.writeText(w);
            try w.writeAll(", ");
            try v.c.writeText(w);
            try w.writeAll(", ");
            try v.h.writeText(w);
            try w.writeAll(")");
        },
        .oklab => |v| {
            try w.writeAll("oklab(");
            try v.l.writeText(w);
            try w.writeAll(", ");
            try v.a.writeText(w);
            try w.writeAll(", ");
            try v.b.writeText(w);
            try w.writeAll(")");
        },
        .srgb => |v| {
            try w.writeAll("srgb(");
            try v.r.writeText(w);
            try w.writeAll(", ");
            try v.g.writeText(w);
            try w.writeAll(", ");
            try v.b.writeText(w);
            try w.writeAll(")");
        },
    }
}

fn writeF64(w: anytype, x: f64) !void {
    // Use a fixed format to keep JSON output stable. Integers print
    // without a fractional part; non-integers print with enough digits
    // to round-trip the f64 source.
    if (std.math.isFinite(x) and @floor(x) == x and @abs(x) < 1e16) {
        try w.print("{d}", .{@as(i64, @intFromFloat(x))});
    } else {
        try w.print("{d}", .{x});
    }
}

fn writeJsonString(w: anytype, s: []const u8) !void {
    try w.writeAll("\"");
    for (s) |c| {
        switch (c) {
            '"' => try w.writeAll("\\\""),
            '\\' => try w.writeAll("\\\\"),
            '\n' => try w.writeAll("\\n"),
            '\r' => try w.writeAll("\\r"),
            '\t' => try w.writeAll("\\t"),
            0...8, 11, 12, 14...0x1f => try w.print("\\u{x:0>4}", .{c}),
            else => try w.writeByte(c),
        }
    }
    try w.writeAll("\"");
}

test "Value.writeJson covers every variant" {
    var buf: [1024]u8 = undefined;
    var stream = std.Io.Writer.fixed(&buf);
    const w = &stream;

    const fields = [_]Field{
        .{ .name = "x", .value = .{ .number = .{ .value = 1, .unit = .px } } },
        .{ .name = "ok", .value = .{ .@"bool" = true } },
    };
    const elems = [_]Value{
        .{ .number = .{ .value = 3.5, .unit = null } },
        .{ .string = "\"hi\"" },
    };
    const v: Value = .{ .record = .{ .fields = &fields } };
    try v.writeJson(w);
    try w.writeAll(";");
    const arr: Value = .{ .array = .{ .elems = &elems } };
    try arr.writeJson(w);
    try w.writeAll(";");
    const col: Value = .{ .color = .{ .hex = .{ .digits = "ff00aa" } } };
    try col.writeJson(w);
    try w.writeAll(";");
    const l_val: Value = .{ .number = .{ .value = 0.5, .unit = null } };
    const c_val: Value = .{ .number = .{ .value = 0.2, .unit = null } };
    const h_val: Value = .{ .number = .{ .value = 280, .unit = .deg } };
    const oklch: Value = .{ .color = .{ .oklch = .{ .l = &l_val, .c = &c_val, .h = &h_val } } };
    try oklch.writeJson(w);

    const written = stream.buffered();
    try std.testing.expectEqualStrings(
        \\{"kind":"record","fields":[{"name":"x","value":{"kind":"number","value":1,"unit":"px"}},{"name":"ok","value":{"kind":"bool","value":true}}]};{"kind":"array","elems":[{"kind":"number","value":3.5,"unit":null},{"kind":"string","raw":"\"hi\""}]};{"kind":"color","form":"hex","digits":"ff00aa"};{"kind":"color","form":"oklch","l":{"kind":"number","value":0.5,"unit":null},"c":{"kind":"number","value":0.2,"unit":null},"h":{"kind":"number","value":280,"unit":"deg"}}
    , written);
}
