//! Text layout for `text.block(...)` — line breaks, wrapping, kerning
//! and alignment, independent of how glyphs are drawn.
//!
//! The native renderer paints and extrudes from the placed glyphs; the
//! web viewer runs the same algorithm in TypeScript
//! (`apps/web/src/scripts/cmotion-viewer.ts`, `layoutBlock`). Keep the
//! two in step: same escapes, same greedy wrap, same box.
//!
//! Coordinates are pixels, y down, relative to the box's top-left. A
//! glyph's `y` is its baseline. Line `i`'s baseline sits at
//! `ascent + i · line_height · size`; the box is as wide as its widest
//! line, or `width` when given, and runs from the first line's ascent
//! to the last line's descent.
//!
//! `text.glyph` keeps its original single-line, unkerned layout so
//! existing sources render exactly as before.

const std = @import("std");

pub const Align = enum { left, center, right };

pub const Options = struct {
    size: f32 = 96,
    /// Baseline-to-baseline distance as a multiple of `size`.
    line_height: f32 = 1.2,
    @"align": Align = .left,
    /// Wrap at this width in pixels; null breaks only at `\n`.
    width: ?f32 = null,
    kerning: bool = true,
};

/// Font metrics at a pixel size. Function pointers so the layout is
/// testable without a font.
pub const Metrics = struct {
    advance: *const fn (cp: u32, size: f32) f32,
    kern: *const fn (left: u32, right: u32, size: f32) f32,
    /// Above the baseline, positive.
    ascent: f32,
    /// Below the baseline, negative (the TTF convention).
    descent: f32,
};

pub const Placed = struct {
    cp: u32,
    x: f32,
    y: f32,
};

pub const Layout = struct {
    glyphs: []const Placed,
    width: f32,
    height: f32,
    lines: usize,
};

/// The text of a string value: the raw quoted source slice with its
/// quotes removed and `\n`, `\t`, `\"`, `\\` decoded.
pub fn unescape(arena: std.mem.Allocator, raw: []const u8) ![]const u8 {
    const inner = if (raw.len >= 2 and raw[0] == '"' and raw[raw.len - 1] == '"') raw[1 .. raw.len - 1] else raw;
    var out: std.ArrayListUnmanaged(u8) = .{};
    var i: usize = 0;
    while (i < inner.len) : (i += 1) {
        const ch = inner[i];
        if (ch == '\\' and i + 1 < inner.len) {
            i += 1;
            switch (inner[i]) {
                'n' => try out.append(arena, '\n'),
                't' => try out.append(arena, '\t'),
                '"' => try out.append(arena, '"'),
                '\\' => try out.append(arena, '\\'),
                else => {
                    try out.append(arena, '\\');
                    try out.append(arena, inner[i]);
                },
            }
            continue;
        }
        try out.append(arena, ch);
    }
    return out.items;
}

fn codepoints(arena: std.mem.Allocator, text: []const u8) ![]const u32 {
    var out: std.ArrayListUnmanaged(u32) = .{};
    var view = std.unicode.Utf8View.init(text) catch {
        // Not UTF-8: fall back to bytes rather than dropping the text.
        for (text) |b| try out.append(arena, b);
        return out.items;
    };
    var it = view.iterator();
    while (it.nextCodepoint()) |cp| try out.append(arena, cp);
    return out.items;
}

fn runWidth(run: []const u32, opts: Options, m: Metrics) f32 {
    var w: f32 = 0;
    for (run, 0..) |cp, i| {
        w += m.advance(cp, opts.size);
        if (opts.kerning and i + 1 < run.len) w += m.kern(cp, run[i + 1], opts.size);
    }
    return w;
}

/// Split into lines: at every `\n`, and, with `width`, greedily at
/// spaces so no line is wider than `width` (a single word wider than
/// `width` stays whole on its own line). Spaces at a wrap are dropped.
fn breakLines(arena: std.mem.Allocator, cps: []const u32, opts: Options, m: Metrics) ![]const []const u32 {
    var lines: std.ArrayListUnmanaged([]const u32) = .{};
    var start: usize = 0;
    var i: usize = 0;
    while (i <= cps.len) : (i += 1) {
        if (i < cps.len and cps[i] != '\n') continue;
        const para = cps[start..i];
        start = i + 1;
        const limit = opts.width orelse {
            try lines.append(arena, para);
            continue;
        };
        // Greedy wrap over words.
        var line_start: usize = 0;
        var last_break: ?usize = null; // index of a space inside `para`
        var j: usize = 0;
        while (j < para.len) : (j += 1) {
            if (para[j] == ' ') last_break = j;
            if (runWidth(para[line_start .. j + 1], opts, m) <= limit) continue;
            if (last_break) |b| if (b > line_start) {
                try lines.append(arena, para[line_start..b]);
                line_start = b + 1;
                last_break = null;
                continue;
            };
        }
        try lines.append(arena, para[line_start..]);
    }
    return lines.items;
}

pub fn layout(arena: std.mem.Allocator, text: []const u8, opts: Options, m: Metrics) !Layout {
    const cps = try codepoints(arena, text);
    const lines = try breakLines(arena, cps, opts, m);

    const widths = try arena.alloc(f32, lines.len);
    var widest: f32 = 0;
    for (lines, 0..) |line, i| {
        widths[i] = runWidth(line, opts, m);
        widest = @max(widest, widths[i]);
    }
    const box_w = opts.width orelse widest;
    const step = opts.line_height * opts.size;

    var placed: std.ArrayListUnmanaged(Placed) = .{};
    for (lines, 0..) |line, i| {
        var x: f32 = switch (opts.@"align") {
            .left => 0,
            .center => (box_w - widths[i]) / 2,
            .right => box_w - widths[i],
        };
        const y = m.ascent + @as(f32, @floatFromInt(i)) * step;
        for (line, 0..) |cp, k| {
            try placed.append(arena, .{ .cp = cp, .x = x, .y = y });
            x += m.advance(cp, opts.size);
            if (opts.kerning and k + 1 < line.len) x += m.kern(cp, line[k + 1], opts.size);
        }
    }

    const last_baseline = m.ascent + @as(f32, @floatFromInt(lines.len -| 1)) * step;
    return .{
        .glyphs = placed.items,
        .width = box_w,
        .height = last_baseline - m.descent,
        .lines = lines.len,
    };
}

//
// Tests — a monospace fake font: every glyph advances 10 px at size 10,
// "AV" kerns by -2.
//

fn fakeAdvance(_: u32, size: f32) f32 {
    return size;
}

fn fakeKern(a: u32, b: u32, _: f32) f32 {
    return if (a == 'A' and b == 'V') -2 else 0;
}

const fake: Metrics = .{ .advance = fakeAdvance, .kern = fakeKern, .ascent = 8, .descent = -2 };

test "text_layout: unescape decodes line breaks and quotes" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    try std.testing.expectEqualStrings("a\nb \"c\" \\", try unescape(arena.allocator(), "\"a\\nb \\\"c\\\" \\\\\""));
}

test "text_layout: kerning narrows a pair, and can be turned off" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const kerned = try layout(arena.allocator(), "AV", .{ .size = 10 }, fake);
    try std.testing.expectEqual(@as(f32, 18), kerned.width);
    try std.testing.expectEqual(@as(f32, 8), kerned.glyphs[1].x);
    const plain = try layout(arena.allocator(), "AV", .{ .size = 10, .kerning = false }, fake);
    try std.testing.expectEqual(@as(f32, 20), plain.width);
}

test "text_layout: line breaks stack baselines by line height" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const l = try layout(arena.allocator(), "ab\nc", .{ .size = 10, .line_height = 1.5 }, fake);
    try std.testing.expectEqual(@as(usize, 2), l.lines);
    try std.testing.expectEqual(@as(f32, 8), l.glyphs[0].y);
    try std.testing.expectEqual(@as(f32, 23), l.glyphs[2].y);
    try std.testing.expectEqual(@as(f32, 25), l.height);
}

test "text_layout: wrapping breaks at spaces within the width" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    // 10 px per glyph: "one two" is 70 px and fits 75; "six" wraps.
    const l = try layout(arena.allocator(), "one two six", .{ .size = 10, .width = 75 }, fake);
    try std.testing.expectEqual(@as(usize, 2), l.lines);
    try std.testing.expectEqual(@as(u32, 's'), l.glyphs[7].cp);
    try std.testing.expectEqual(@as(f32, 0), l.glyphs[7].x);
}

test "text_layout: a word wider than the width stays whole" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const l = try layout(arena.allocator(), "abcdefgh ij", .{ .size = 10, .width = 30 }, fake);
    try std.testing.expectEqual(@as(usize, 2), l.lines);
}

test "text_layout: alignment places each line in the box" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const c = try layout(arena.allocator(), "abcd\nab", .{ .size = 10, .@"align" = .center, .kerning = false }, fake);
    try std.testing.expectEqual(@as(f32, 10), c.glyphs[4].x);
    const r = try layout(arena.allocator(), "abcd\nab", .{ .size = 10, .@"align" = .right, .kerning = false }, fake);
    try std.testing.expectEqual(@as(f32, 20), r.glyphs[4].x);
}
