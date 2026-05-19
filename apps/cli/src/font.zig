//! TTF text rendering — `text.glyph(string, font?, size?)` paints
//! through stb_truetype's outline rasteriser instead of the 5×7
//! bitmap fallback.
//!
//! Architecture
//! ============
//! One shared font (DM Sans Bold, OFL 1.1) is embedded into the
//! binary via `@embedFile`. stb_truetype reads the bytes directly
//! — no on-disk lookup at runtime. The `font:` arg in source code
//! is read but ignored for now; we ship exactly one font until the
//! font-selection story is designed (probably a vendored bundle
//! plus a `font.*` namespace).
//!
//! Per-glyph rasterisation goes through `stbtt_GetCodepointBitmap`
//! which gives us a single-channel coverage bitmap (8-bit alpha).
//! The renderer composites that bitmap into the framebuffer with
//! the active material colour, treating coverage as alpha. This is
//! exactly the path `stbtt_RenderText` would have taken if it
//! existed — we just open the stb output and place the bitmap
//! manually.
//!
//! Native-only. The WASM build keeps the block-letter path for now
//! because stb_truetype pulls in libm symbols (sqrtf, floorf, …)
//! that the freestanding target doesn't provide. When the WASM
//! gets a text-using export, we either add the math shims or
//! switch to wasm32-wasi.

const std = @import("std");

const c = @cImport({
    @cInclude("stb_truetype.h");
});

/// The bundled font, embedded at compile time. Wired via
/// `addAnonymousImport("font_ttf", …)` in `build.zig` because
/// `@embedFile` is gated to this module's package path and the TTF
/// lives outside it under `apps/cli/vendor/fonts/`.
const font_bytes: []const u8 = @embedFile("font_ttf");

var info: c.stbtt_fontinfo = undefined;
var initialised: bool = false;

fn ensureInit() void {
    if (initialised) return;
    _ = c.stbtt_InitFont(&info, font_bytes.ptr, 0);
    initialised = true;
}

/// A single rasterised glyph — coverage bitmap plus the offsets that
/// position it relative to a baseline / horizontal cursor.
pub const GlyphBitmap = struct {
    /// 8-bit coverage values (0 = transparent, 255 = opaque).
    pixels: []u8,
    width: u32,
    height: u32,
    /// Horizontal offset from the cursor's x-position to the bitmap's
    /// left edge (the glyph's left side bearing, in pixels at `size`).
    x_offset: i32,
    /// Vertical offset from the baseline to the bitmap's top edge —
    /// negative for glyphs that extend above the baseline (most do).
    y_offset: i32,
    /// Pixels to advance the cursor after drawing this glyph,
    /// including the trailing side bearing. Used for layout.
    advance: f32,
};

/// Rasterise the codepoint at the given pixel size. The returned
/// bitmap is allocated by stb_truetype's internal allocator; callers
/// must free it with `freeBitmap()` when done. Returns null on
/// unsupported codepoints (no glyph in the font).
pub fn rasterise(codepoint: u32, size_px: f32) ?GlyphBitmap {
    ensureInit();
    const scale = c.stbtt_ScaleForPixelHeight(&info, size_px);

    var w: c_int = 0;
    var h: c_int = 0;
    var xoff: c_int = 0;
    var yoff: c_int = 0;
    const pixels_ptr = c.stbtt_GetCodepointBitmap(
        &info,
        0,
        scale,
        @intCast(codepoint),
        &w,
        &h,
        &xoff,
        &yoff,
    );
    if (pixels_ptr == null) return null;

    var advance_raw: c_int = 0;
    var lsb_raw: c_int = 0;
    c.stbtt_GetCodepointHMetrics(&info, @intCast(codepoint), &advance_raw, &lsb_raw);
    const advance = @as(f32, @floatFromInt(advance_raw)) * scale;

    const total: usize = @as(usize, @intCast(w)) * @as(usize, @intCast(h));
    return .{
        .pixels = pixels_ptr[0..total],
        .width = @intCast(w),
        .height = @intCast(h),
        .x_offset = @intCast(xoff),
        .y_offset = @intCast(yoff),
        .advance = advance,
    };
}

/// Return the (ascent, descent, line_gap) triple for the font, scaled
/// to `size_px`. Used for centred vertical placement: the visual
/// centre of a single-line string sits at `(ascent + descent) / 2`
/// below the baseline.
pub const VMetrics = struct {
    ascent: f32,
    descent: f32, // negative — points below the baseline
    line_gap: f32,
};

pub fn vmetrics(size_px: f32) VMetrics {
    ensureInit();
    const scale = c.stbtt_ScaleForPixelHeight(&info, size_px);
    var asc: c_int = 0;
    var desc: c_int = 0;
    var gap: c_int = 0;
    c.stbtt_GetFontVMetrics(&info, &asc, &desc, &gap);
    return .{
        .ascent = @as(f32, @floatFromInt(asc)) * scale,
        .descent = @as(f32, @floatFromInt(desc)) * scale,
        .line_gap = @as(f32, @floatFromInt(gap)) * scale,
    };
}

/// Return the total horizontal advance of `text` at `size_px`. Used
/// for centred placement: each glyph's `advance` value plus the
/// final glyph's right side bearing approximation.
pub fn measureWidth(text: []const u8, size_px: f32) f32 {
    ensureInit();
    const scale = c.stbtt_ScaleForPixelHeight(&info, size_px);
    var total: f32 = 0;
    for (text) |ch| {
        var adv: c_int = 0;
        var lsb: c_int = 0;
        c.stbtt_GetCodepointHMetrics(&info, ch, &adv, &lsb);
        total += @as(f32, @floatFromInt(adv)) * scale;
    }
    return total;
}

pub fn freeBitmap(bitmap: GlyphBitmap) void {
    // stb_truetype uses its own malloc (STBTT_malloc → malloc by default).
    // Free with the matching deallocator.
    c.stbtt_FreeBitmap(bitmap.pixels.ptr, null);
}

/// A 2D point in glyph-outline space (pixel units, y-up — matches the
/// TTF convention, *not* the renderer's framebuffer convention).
/// The 3D pipeline flips y when projecting to screen.
pub const Vec2 = struct { x: f32, y: f32 };

/// Glyph outline as a list of closed contours. Each contour is a
/// flattened polyline (curves already subdivided into line segments)
/// in TTF y-up coordinates, scaled to `size_px` pixel height. For
/// letters without holes (most uppercase except A, B, D, O, P, Q, R)
/// this is a single contour; letters with holes carry multiple.
///
/// Caller owns the slices via `arena`.
pub fn glyphContours(
    arena: std.mem.Allocator,
    codepoint: u32,
    size_px: f32,
    curve_segments: u32,
) !?[]const []const Vec2 {
    ensureInit();
    var vertices: [*c]c.stbtt_vertex = undefined;
    const n = c.stbtt_GetCodepointShape(&info, @intCast(codepoint), &vertices);
    if (n <= 0) return null;
    defer c.stbtt_FreeShape(&info, vertices);

    const scale = c.stbtt_ScaleForPixelHeight(&info, size_px);

    // First pass: count contours (each STBTT_vmove starts one).
    var num_contours: usize = 0;
    for (0..@intCast(n)) |i| {
        if (vertices[i].type == c.STBTT_vmove) num_contours += 1;
    }
    if (num_contours == 0) return null;

    var contours = try arena.alloc([]const Vec2, num_contours);
    var contour_idx: usize = 0;

    var current = std.array_list.Managed(Vec2).init(arena);
    var i: usize = 0;
    while (i < @as(usize, @intCast(n))) : (i += 1) {
        const v = vertices[i];
        const x = @as(f32, @floatFromInt(v.x)) * scale;
        const y = @as(f32, @floatFromInt(v.y)) * scale;
        switch (v.type) {
            c.STBTT_vmove => {
                if (current.items.len > 0) {
                    contours[contour_idx] = try current.toOwnedSlice();
                    contour_idx += 1;
                    current = std.array_list.Managed(Vec2).init(arena);
                }
                try current.append(.{ .x = x, .y = y });
            },
            c.STBTT_vline => {
                try current.append(.{ .x = x, .y = y });
            },
            c.STBTT_vcurve => {
                // Quadratic Bézier — subdivide into `curve_segments`
                // straight chunks. Three.js's ExtrudeGeometry defaults
                // to 64; 32 is enough for ~96-px-tall glyphs at HD
                // viewing distance while keeping the triangle count
                // sane through the bevel rings.
                const p0 = current.items[current.items.len - 1];
                const cx = @as(f32, @floatFromInt(v.cx)) * scale;
                const cy = @as(f32, @floatFromInt(v.cy)) * scale;
                const steps = curve_segments;
                var s: usize = 1;
                while (s <= steps) : (s += 1) {
                    const t = @as(f32, @floatFromInt(s)) / @as(f32, @floatFromInt(steps));
                    const inv = 1.0 - t;
                    const bx = inv * inv * p0.x + 2.0 * inv * t * cx + t * t * x;
                    const by = inv * inv * p0.y + 2.0 * inv * t * cy + t * t * y;
                    try current.append(.{ .x = bx, .y = by });
                }
            },
            c.STBTT_vcubic => {
                // CFF / OTF cubics. DM Sans is TTF (quadratics only)
                // so this branch is dead for our bundled font, but
                // it stays in for future fonts. Use a few more
                // segments since cubics curve harder.
                const p0 = current.items[current.items.len - 1];
                const cx = @as(f32, @floatFromInt(v.cx)) * scale;
                const cy = @as(f32, @floatFromInt(v.cy)) * scale;
                const cx1 = @as(f32, @floatFromInt(v.cx1)) * scale;
                const cy1 = @as(f32, @floatFromInt(v.cy1)) * scale;
                const steps = curve_segments + curve_segments / 2;
                var s: usize = 1;
                while (s <= steps) : (s += 1) {
                    const t = @as(f32, @floatFromInt(s)) / @as(f32, @floatFromInt(steps));
                    const inv = 1.0 - t;
                    const bx = inv * inv * inv * p0.x +
                        3.0 * inv * inv * t * cx +
                        3.0 * inv * t * t * cx1 +
                        t * t * t * x;
                    const by = inv * inv * inv * p0.y +
                        3.0 * inv * inv * t * cy +
                        3.0 * inv * t * t * cy1 +
                        t * t * t * y;
                    try current.append(.{ .x = bx, .y = by });
                }
            },
            else => {},
        }
    }
    if (current.items.len > 0) {
        contours[contour_idx] = try current.toOwnedSlice();
        contour_idx += 1;
    }
    return contours[0..contour_idx];
}

test "font: rasterise produces a non-empty 'C' bitmap" {
    const g = rasterise('C', 96) orelse {
        try std.testing.expect(false);
        return;
    };
    defer freeBitmap(g);
    try std.testing.expect(g.width > 0);
    try std.testing.expect(g.height > 0);
    var any_lit: usize = 0;
    for (g.pixels) |p| if (p > 0) {
        any_lit += 1;
    };
    try std.testing.expect(any_lit > 100);
}
