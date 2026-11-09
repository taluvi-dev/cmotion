//! The stdlib manifest: every name the evaluator, the sampler or a
//! renderer gives meaning to, with the named arguments each reads.
//!
//! The evaluator stages any call it doesn't know as `Constructed(name,
//! fields)` so a new stdlib form needs no eval change — which also means
//! a misspelt function, or an argument nothing reads, renders as nothing
//! without an error. `cmo check` reads this table to tell the two apart
//! (NAM003 for an unknown name, NAM010 for an argument nothing reads,
//! UNT001 / UNT003 for an argument's unit, TYP004 for a choice that isn't
//! one).
//!
//! Keep it in step with the renderers: a name a renderer translates but
//! this table lacks becomes a false NAM003. `zig build test-interp`
//! checks every name the web viewer translates against it.
//!
//! An argument spec is a space-separated list of `name:kind`, where kind
//! is `px` (a length), `s` (a time), `deg` (an angle), `num`, `int`,
//! `bool`, `color`, `string`, `any`, or a choice `a|b|c` of bare names
//! (`|str` at the end: the names may also be written as strings). `@N`
//! is the number of positional arguments read. A lone `*` accepts
//! anything (the function's arguments are open-ended).

const std = @import("std");

pub const Kind = enum { px, s, deg, num, int, bool, color, string, any, choice };

pub const Arg = struct {
    name: []const u8,
    kind: Kind,
    /// For `.choice`: the `|`-separated names.
    choices: []const u8 = "",

    pub fn allows(self: Arg, symbol: []const u8) bool {
        if (std.mem.eql(u8, symbol, "str")) return false;
        var it = std.mem.splitScalar(u8, self.choices, '|');
        while (it.next()) |c| if (std.mem.eql(u8, c, symbol)) return true;
        return false;
    }

    /// A choice that also takes its names as strings (`align: "center"`),
    /// marked `|str` in the spec.
    pub fn takesStrings(self: Arg) bool {
        var it = std.mem.splitScalar(u8, self.choices, '|');
        while (it.next()) |c| if (std.mem.eql(u8, c, "str")) return true;
        return false;
    }

    /// The choices without the `str` marker, for messages.
    pub fn names(self: Arg, buf: [][]const u8) [][]const u8 {
        var n: usize = 0;
        var it = std.mem.splitScalar(u8, self.choices, '|');
        while (it.next()) |c| {
            if (std.mem.eql(u8, c, "str") or n == buf.len) continue;
            buf[n] = c;
            n += 1;
        }
        return buf[0..n];
    }
};

pub const Fn = struct {
    name: []const u8,
    spec: []const u8,

    pub fn open(self: Fn) bool {
        return std.mem.eql(u8, std.mem.trim(u8, self.spec, " "), "*");
    }

    /// How many positional arguments the function reads, if the table
    /// says (`@N`).
    pub fn positional(self: Fn) ?usize {
        var it = std.mem.tokenizeScalar(u8, self.spec, ' ');
        while (it.next()) |tok| {
            if (tok.len > 1 and tok[0] == '@') return std.fmt.parseInt(usize, tok[1..], 10) catch null;
        }
        return null;
    }

    /// The argument named `name`, or null if nothing reads it.
    pub fn arg(self: Fn, name: []const u8) ?Arg {
        var it = std.mem.tokenizeScalar(u8, self.spec, ' ');
        while (it.next()) |tok| {
            const colon = std.mem.indexOfScalar(u8, tok, ':') orelse continue;
            if (!std.mem.eql(u8, tok[0..colon], name)) continue;
            return parseKind(name, tok[colon + 1 ..]);
        }
        return null;
    }

    /// The argument names, for a "did you mean" over arguments.
    pub fn argNames(self: Fn, buf: [][]const u8) [][]const u8 {
        var n: usize = 0;
        var it = std.mem.tokenizeScalar(u8, self.spec, ' ');
        while (it.next()) |tok| {
            const colon = std.mem.indexOfScalar(u8, tok, ':') orelse continue;
            if (n == buf.len) break;
            buf[n] = tok[0..colon];
            n += 1;
        }
        return buf[0..n];
    }
};

fn parseKind(name: []const u8, k: []const u8) Arg {
    if (std.mem.indexOfScalar(u8, k, '|') != null) return .{ .name = name, .kind = .choice, .choices = k };
    inline for (std.meta.fields(Kind)) |f| {
        if (std.mem.eql(u8, k, f.name)) return .{ .name = name, .kind = @field(Kind, f.name) };
    }
    // a lone name that isn't a kind is a one-name choice
    return .{ .name = name, .kind = .choice, .choices = k };
}

// The table, from what eval.zig, sampler.zig, the native renderer
// (render.zig, render3d.zig, shape2d.zig) and the web viewer read. `@N`
// is how many positional arguments the function reads, counting a
// method call's receiver (`x.f(a)` is `f(x, a)`); omitted = unchecked.
// Lengths, times and angles a renderer reads as plain numbers anyway
// (camera distance, light intensities, vec components) are `num` or
// `any`, so the bare numbers every source writes there stay clean.
pub const functions = [_]Fn{
    // 2D shapes
    .{ .name = "rect", .spec = "@0 width:px height:px fill:color at:any radius:px" },
    .{ .name = "circle", .spec = "@0 radius:px fill:color" },
    .{ .name = "ellipse", .spec = "@0 width:px height:px fill:color" },
    .{ .name = "polygon", .spec = "@0 sides:int points:int radius:px fill:color" },
    .{ .name = "star", .spec = "@0 points:int sides:int radius:px inner_radius:px fill:color" },
    .{ .name = "pie", .spec = "@0 radius:px angle:deg start:deg fill:color" },
    .{ .name = "path", .spec = "@1 points:any closed:bool fill:color" },
    .{ .name = "stroke", .spec = "@1 width:px color:color draw:num" },
    .{ .name = "vec2", .spec = "@2 x:any y:any" },
    .{ .name = "vec3", .spec = "@3 x:any y:any z:any" },
    // text
    .{ .name = "text.glyph", .spec = "@1 size:px font:any curve_segments:int" },
    .{ .name = "text.block", .spec = "@1 size:px line_height:num width:px kerning:bool align:left|center|right|str fill:color reveal:num by:char|word|line|str rise:px fit:px font:any curve_segments:int" },
    // assets
    .{ .name = "image", .spec = "@1" },
    .{ .name = "fit", .spec = "@2" },
    .{ .name = "as_texture", .spec = "@1 projection:equirectangular" },
    .{ .name = "font", .spec = "@1" },
    .{ .name = "video", .spec = "@1" },
    .{ .name = "audio", .spec = "@1" },
    .{ .name = "size", .spec = "@2" },
    // 3D
    .{ .name = "extrude", .spec = "@1 depth:px bevel:px bevel_segments:int curve_segments:int" },
    .{ .name = "material", .spec = "@1 fill:any metalness:num roughness:num emissive:color emissive_intensity:any opacity:num" },
    .{ .name = "gradient", .spec = "@0 top:num bottom:num" },
    .{ .name = "sphere", .spec = "@1 r:px radius:px" },
    .{ .name = "metaballs", .spec = "@1 blobs:any smoothing:any" },
    .{ .name = "blob", .spec = "@0 at:any radius:px" },
    .{ .name = "svg", .spec = "@1 source:string depth:px size:px round:any" },
    .{ .name = "vectorize", .spec = "@1 source:any depth:px size:px round:any stroke_width:any strokeWidth:any simplify:num bridge:num threshold:num stitch:num" },
    .{ .name = "render3d", .spec = "@1 lights:any camera:any" },
    .{ .name = "camera", .spec = "@0 fov:deg distance:any near:num far:num" },
    .{ .name = "ambient", .spec = "@1 intensity:num color:color tint:color" },
    .{ .name = "directional", .spec = "@0 from:any intensity:num color:color tint:color" },
    .{ .name = "point", .spec = "@0 at:any position:any intensity:num range:any color:color tint:color" },
    .{ .name = "spotlight", .spec = "@0 at:any position:any intensity:num range:any color:color tint:color" },
    .{ .name = "bloom", .spec = "@0 strength:num radius:num threshold:num" },
    // transforms
    .{ .name = "translate", .spec = "@1 x:px y:px z:px" },
    .{ .name = "rotate", .spec = "@1 x:deg y:deg z:deg" },
    .{ .name = "scale", .spec = "@2 x:num y:num z:num" },
    .{ .name = "pivot", .spec = "@2" },
    .{ .name = "squash", .spec = "@2 factor:num" },
    .{ .name = "opacity", .spec = "@2" },
    // time (the sampler resolves these, whatever the renderer)
    .{ .name = "wave", .spec = "@0 amplitude:any period:s" },
    .{ .name = "spring", .spec = "@0 from:any to:any at:s stiffness:num damping:num mass:num" },
    .{ .name = "noise", .spec = "@3 seed:any period:s amplitude:any" },
    .{ .name = "random", .spec = "@1 seed:any" },
    .{ .name = "bounce", .spec = "@0 height:px period:s floor:px" },
    .{ .name = "on_event", .spec = "@1 events:any decay:s peak:any" },
    .{ .name = "during", .spec = "@3 from:s to:s layer:any layers:any fade_in:s fade_out:s" },
    .{ .name = "shift", .spec = "@2 by:s layer:any layers:any" },
    .{ .name = "loop", .spec = "@2 period:s layer:any layers:any" },
    .{ .name = "freeze", .spec = "@2 at:s layer:any layers:any" },
    .{ .name = "series", .spec = "@2 layers:any durations:any" },
    .{ .name = "transition", .spec = "@2 at:s duration:s kind:fade|slide_left|slide_right|slide_up|slide_down easing:any distance:px" },
};

/// Bare names that stand for a value outside any named argument's
/// choices: `animate`'s options, and the positional choices of `fit` and
/// `pivot`.
pub const values = [_][]const u8{ "forever", "hold", "extend", "loop", "ping_pong", "step", "cover", "contain", "bottom", "top", "left", "right" };

/// Roots of dotted names (`text.block`, `easing.out_cubic`).
pub const namespaces = [_][]const u8{ "text", "easing" };

pub fn function(name: []const u8) ?Fn {
    for (functions) |f| if (std.mem.eql(u8, f.name, name)) return f;
    return null;
}

pub fn isNamespace(name: []const u8) bool {
    for (namespaces) |n| if (std.mem.eql(u8, n, name)) return true;
    return false;
}

/// A bare name that is a value: a listed value, or a choice of any
/// argument (`center`, `word`, `fade`, …).
pub fn isValue(name: []const u8) bool {
    for (values) |v| if (std.mem.eql(u8, v, name)) return true;
    for (functions) |f| {
        var it = std.mem.tokenizeScalar(u8, f.spec, ' ');
        while (it.next()) |tok| {
            const colon = std.mem.indexOfScalar(u8, tok, ':') orelse continue;
            const a = parseKind(tok[0..colon], tok[colon + 1 ..]);
            if (a.kind == .choice and a.allows(name)) return true;
        }
    }
    return false;
}

/// Every choice of every argument, for "did you mean" over bare names.
pub fn appendChoices(allocator: std.mem.Allocator, out: *std.ArrayListUnmanaged([]const u8)) !void {
    for (functions) |f| {
        var it = std.mem.tokenizeScalar(u8, f.spec, ' ');
        while (it.next()) |tok| {
            const colon = std.mem.indexOfScalar(u8, tok, ':') orelse continue;
            const a = parseKind(tok[0..colon], tok[colon + 1 ..]);
            if (a.kind != .choice) continue;
            var buf: [16][]const u8 = undefined;
            for (a.names(&buf)) |c| try out.append(allocator, c);
        }
    }
}

/// Edit distance (insert, delete, substitute, and swap of neighbours),
/// for "did you mean". Names are short; a fixed row bound is enough.
pub fn distance(a: []const u8, b: []const u8) usize {
    const max = 64;
    if (a.len >= max or b.len >= max) return std.math.maxInt(usize);
    var prev2: [max]usize = undefined;
    var prev: [max]usize = undefined;
    var cur: [max]usize = undefined;
    for (0..b.len + 1) |j| prev[j] = j;
    for (1..a.len + 1) |i| {
        cur[0] = i;
        for (1..b.len + 1) |j| {
            const cost: usize = if (a[i - 1] == b[j - 1]) 0 else 1;
            var d = @min(@min(prev[j] + 1, cur[j - 1] + 1), prev[j - 1] + cost);
            if (i > 1 and j > 1 and a[i - 1] == b[j - 2] and a[i - 2] == b[j - 1]) d = @min(d, prev2[j - 2] + 1);
            cur[j] = d;
        }
        prev2 = prev;
        prev = cur;
    }
    return prev[b.len];
}

/// The closest of `candidates` to `name`, if it is close enough to be a
/// likely typo: within 1 edit for short names, 2 for longer ones.
pub fn nearest(name: []const u8, candidates: []const []const u8) ?[]const u8 {
    var best: ?[]const u8 = null;
    var best_d: usize = if (name.len <= 4) 1 else 2;
    for (candidates) |c| {
        if (std.mem.eql(u8, c, name)) continue;
        const d = distance(name, c);
        if (d < best_d or (d == best_d and best == null)) {
            best = c;
            best_d = d;
        }
    }
    return best;
}

test "stdlib: distance counts a swap as one edit" {
    try std.testing.expectEqual(@as(usize, 1), distance("circl", "circle"));
    try std.testing.expectEqual(@as(usize, 1), distance("cirlce", "circle"));
    try std.testing.expectEqual(@as(usize, 0), distance("rect", "rect"));
    try std.testing.expectEqual(@as(usize, 3), distance("abc", "xyz"));
}

test "stdlib: nearest only suggests a likely typo" {
    const c = [_][]const u8{ "circle", "rect", "ellipse" };
    try std.testing.expectEqualStrings("circle", nearest("circl", &c).?);
    try std.testing.expectEqualStrings("rect", nearest("rekt", &c).?);
    try std.testing.expect(nearest("banana", &c) == null);
}

test "stdlib: an argument spec reads kinds and choices" {
    const f = Fn{ .name = "t", .spec = "size:px align:left|center|right fill:color" };
    try std.testing.expectEqual(Kind.px, f.arg("size").?.kind);
    try std.testing.expect(f.arg("align").?.allows("center"));
    try std.testing.expect(!f.arg("align").?.allows("word"));
    try std.testing.expect(f.arg("colour") == null);
    try std.testing.expect(!f.open());
    try std.testing.expect((Fn{ .name = "o", .spec = "*" }).open());
}
