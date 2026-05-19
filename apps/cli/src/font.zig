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
