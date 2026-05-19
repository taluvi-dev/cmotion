//! Software renderer — the first one. Walks a sampled (still-frame)
//! Value tree and produces an RGBA8 pixel buffer.
//!
//! Architecture
//! ============
//! Today this is a Zig module called directly from `commands/render.zig`.
//! Tomorrow the same code (or its equivalent) lives in a WASM component
//! that the CLI loads via wasmtime, per the WIT
//!   render: func(time-samples: u64, scene: u32) -> frame
//! contract. The renderer logic is structured to make that swap
//! mechanical: `renderTree` takes a value tree + canvas size and
//! produces pixels — no hidden CLI/host dependencies.
//!
//! Scope (v0)
//! ==========
//! Honoured:
//!   - `compose [layers]` — paints layers back-to-front (later layers
//!     on top), each onto the same canvas.
//!   - `rect(width, height, fill, at?)` — fills an axis-aligned
//!     rectangle. The rect is centered at the canvas center by default;
//!     `at: vec2(x, y)` offsets that center in pixel units (positive x
//!     right, positive y down). Lengths are taken in pixel units (a
//!     `1920px` rect on a 1920×1080 canvas covers it exactly when
//!     centered). Named args only; positional are ignored.
//!   - `translate(shape, x:, y:)` — paints `shape` with its coordinates
//!     shifted by (x, y) pixels. Composes with `at:` and with outer
//!     translates; method-chain form (`rect(...).translate(x:, y:)`)
//!     stages as the same `Constructed("translate", …)` shape and works
//!     identically.
//!   - Color: `#rrggbb` hex (with or without alpha), and `oklch(l, c, h)`
//!     — converted to sRGB through standard oklab → linear-sRGB →
//!     gamma matrices. Animated channels are expected to already be
//!     resolved by the sampler before they reach the renderer.
//!
//! Ignored:
//!   - 3D content (`extrude`, `render3d`, lights, materials, ...). The
//!     glyph in cmotion.org's taste sample renders as nothing — only
//!     the background rect is visible.
//!   - srgb()/oklab() color literals — not yet wired through.
//!   - Stroke, gradients, blur, filters. Future renderer slices.
//!
//! Coordinate system
//! =================
//! The position pipeline is centered-by-default: (0, 0) names the
//! canvas center, +x is right, +y is down. This matches the
//! motion-graphics convention (After Effects / Motion anchor at
//! shape center, position relative to canvas), at the cost of
//! disagreeing with CSS / SVG (top-left, +y down). Internal pixel
//! buffers stay top-down row-major — only the *user-facing*
//! coordinate origin is centered.
//!
//! Memory
//! ======
//! The framebuffer is allocated by the caller (via the eval/render
//! arena). `renderTree` writes into it in place; it doesn't allocate
//! pixel storage itself. That's the shape a WASM guest will want too:
//! the host provides a `list<u8>` of the right size and the guest
//! writes into it.

const std = @import("std");
const value = @import("value.zig");

pub const Framebuffer = struct {
    /// RGBA8, row-major, top-down. Size = width * height * 4.
    pixels: []u8,
    width: u32,
    height: u32,
};

pub const RenderError = error{OutOfMemory};

/// Default canvas size when the caller didn't override. Picked small so
/// the renderer round-trips fast on every test save.
pub const default_width: u32 = 320;
pub const default_height: u32 = 180;

/// Translation accumulated as we descend the tree. `translate(...)`
/// adds to it; `paintRect` reads it (plus the rect's own `at:`) to
/// compute its centre on the canvas.
const Offset = struct {
    x: f64 = 0,
    y: f64 = 0,

    fn plus(self: Offset, other: Offset) Offset {
        return .{ .x = self.x + other.x, .y = self.y + other.y };
    }
};

/// Painting context inherited from outer wrappers. Currently just the
/// active fill: `.material(child, fill: c)` sets it so that a child
/// without its own `fill:` (e.g. `extrude(text.glyph(...))`) still
/// picks up the colour the user asked for. As more material properties
/// land (stroke, opacity, …) they'll thread through here too.
const Style = struct {
    fill: ?value.Value = null,
};

/// Top-level entry point. Allocates a framebuffer in `arena` and paints
/// `tree` onto it. The caller picks the canvas size — typically passed
/// from CLI flags. `tree` is expected to be the output of `sampler.sampleAt`
/// (a still-frame description); animations should already be resolved.
pub fn renderTree(
    arena: std.mem.Allocator,
    tree: value.Value,
    width: u32,
    height: u32,
) RenderError!Framebuffer {
    const pixels = try arena.alloc(u8, @as(usize, width) * @as(usize, height) * 4);
    @memset(pixels, 0);
    var fb: Framebuffer = .{ .pixels = pixels, .width = width, .height = height };
    paintValue(tree, &fb, .{}, .{});
    return fb;
}

/// Dispatch over the value tree. Compose and individual shape
/// constructors paint; 3D wrappers descend to the inner shape
/// (flat fallback — see paintWrapper); everything else (numbers,
/// strings, lambdas, …) is silently ignored. `off` is the
/// accumulated translation in canvas pixels; `style` is the inherited
/// fill / material context.
fn paintValue(v: value.Value, fb: *Framebuffer, off: Offset, style: Style) void {
    switch (v) {
        .constructed => |c| {
            if (std.mem.eql(u8, c.name, "compose")) {
                paintCompose(c, fb, off, style);
            } else if (std.mem.eql(u8, c.name, "rect")) {
                paintRect(c, fb, off, style);
            } else if (std.mem.eql(u8, c.name, "translate")) {
                paintTranslate(c, fb, off, style);
            } else if (std.mem.eql(u8, c.name, "text.glyph")) {
                paintTextGlyph(c, fb, off, style);
            } else if (isFlatFallback(c.name)) {
                paintWrapper(c, fb, off, style);
            }
        },
        // Arrays/records/colors/etc. at the root aren't paintable shapes
        // today; they could be addressed by a later "paint anything that
        // contains paintable children" pass, but v0 keeps the rules
        // explicit.
        else => {},
    }
}

/// Constructors that the v0 renderer doesn't model but whose inner
/// shape is still meaningful in 2D: drop the 3D semantics, paint the
/// wrapped child flat. The taste sample stacks `render3d` ▸ `.scale`
/// ▸ `.rotate` ▸ `.material` ▸ `extrude` ▸ `text.glyph` — without this
/// fallback every one of those layers would silently zero out the
/// glyph.
fn isFlatFallback(name: []const u8) bool {
    return std.mem.eql(u8, name, "render3d")
        or std.mem.eql(u8, name, "extrude")
        or std.mem.eql(u8, name, "material")
        or std.mem.eql(u8, name, "rotate")
        or std.mem.eql(u8, name, "scale");
}

/// `text.glyph(string, font?, size?)` — low-fi block-letter renderer.
/// Each character is a 5×7 bit grid scaled to roughly `size` pixels
/// tall (default 96px); the bitmap font covers uppercase A–Z, digits,
/// space, `.,:-!?` and a placeholder box for anything else. The
/// `font:` arg is read but unused (the renderer ships exactly one
/// font); real TTF rasterization is a later slice.
fn paintTextGlyph(c: value.Constructed, fb: *Framebuffer, off: Offset, style: Style) void {
    var text_raw: []const u8 = "";
    var size_px: f64 = 96;
    for (c.fields) |f| {
        if (f.name.len == 0) {
            if (text_raw.len == 0 and f.value == .string) text_raw = f.value.string;
        } else if (std.mem.eql(u8, f.name, "size")) {
            if (numberAsPixels(f.value)) |s| size_px = s;
        }
    }
    const text = stripQuotes(text_raw);
    if (text.len == 0) return;

    // The bitmap font is 5×7; pick an integer pixel size for each cell
    // so straight strokes stay crisp. A cell of 0 collapses the glyph
    // entirely — clamp to at least 1.
    const cell_i: i64 = @max(1, @as(i64, @intFromFloat(@round(size_px / 7))));
    const cell: f64 = @floatFromInt(cell_i);
    const glyph_w = 5 * cell;
    const glyph_h = 7 * cell;
    const advance = 6 * cell; // one-cell gap between glyphs
    const total_w: f64 = if (text.len == 0)
        0
    else
        advance * @as(f64, @floatFromInt(text.len - 1)) + glyph_w;

    const cx = @as(f64, @floatFromInt(fb.width)) / 2.0 + off.x;
    const cy = @as(f64, @floatFromInt(fb.height)) / 2.0 + off.y;
    var origin_x = cx - total_w / 2.0;
    const origin_y = cy - glyph_h / 2.0;

    // `text.glyph` doesn't take its own fill; pick up the inherited
    // material colour (or white if none).
    const rgba: [4]u8 = if (style.fill) |fv| valueToRgba(fv) else .{ 255, 255, 255, 255 };

    for (text) |ch| {
        const bits = lookupGlyph(ch);
        var row: u3 = 0;
        while (row < 7) : (row += 1) {
            var col: u3 = 0;
            while (col < 5) : (col += 1) {
                const set = (bits[row] >> (4 - col)) & 1 == 1;
                if (set) {
                    const px = origin_x + @as(f64, @floatFromInt(col)) * cell;
                    const py = origin_y + @as(f64, @floatFromInt(row)) * cell;
                    fillRect(fb, px, py, cell, cell, rgba);
                }
            }
        }
        origin_x += advance;
    }
}

fn stripQuotes(s: []const u8) []const u8 {
    if (s.len >= 2 and s[0] == '"' and s[s.len - 1] == '"') return s[1 .. s.len - 1];
    return s;
}

fn paintCompose(c: value.Constructed, fb: *Framebuffer, off: Offset, style: Style) void {
    for (c.fields) |f| {
        if (!std.mem.eql(u8, f.name, "layers")) continue;
        switch (f.value) {
            .array => |arr| for (arr.elems) |elem| paintValue(elem, fb, off, style),
            else => {},
        }
    }
}

fn paintRect(c: value.Constructed, fb: *Framebuffer, off: Offset, style: Style) void {
    var w: f64 = @floatFromInt(fb.width);
    var h: f64 = @floatFromInt(fb.height);
    var fill: ?value.Value = null;
    var at: Offset = .{};
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "width")) {
            if (numberAsPixels(f.value)) |px| w = px;
        } else if (std.mem.eql(u8, f.name, "height")) {
            if (numberAsPixels(f.value)) |px| h = px;
        } else if (std.mem.eql(u8, f.name, "fill")) {
            fill = f.value;
        } else if (std.mem.eql(u8, f.name, "at")) {
            if (valueAsOffset(f.value)) |a| at = a;
        }
    }
    // Rect's own `fill:` wins over the inherited material `fill:` —
    // it's the more specific signal. Fall back to white if nothing's
    // set so the rect remains visible against a transparent canvas.
    const rgba: [4]u8 = if (fill) |fv|
        valueToRgba(fv)
    else if (style.fill) |sf|
        valueToRgba(sf)
    else
        .{ 255, 255, 255, 255 };

    // Centered-by-default: the rect's geometric centre lands at the
    // canvas centre, shifted by the accumulated translate and the
    // rect's own `at:` offset.
    const cx = @as(f64, @floatFromInt(fb.width)) / 2.0 + off.x + at.x;
    const cy = @as(f64, @floatFromInt(fb.height)) / 2.0 + off.y + at.y;
    fillRect(fb, cx - w / 2.0, cy - h / 2.0, w, h, rgba);
}

/// `translate(shape, x:, y:)` — paint the wrapped shape with the
/// accumulated offset shifted by (x, y). The shape is the first
/// positional field (from a method-chain receiver `rect(...).translate(...)`
/// or a direct call `translate(rect(...), x:, y:)`); named-only forms
/// without a shape are a no-op.
fn paintTranslate(c: value.Constructed, fb: *Framebuffer, off: Offset, style: Style) void {
    var dx: f64 = 0;
    var dy: f64 = 0;
    var child: ?value.Value = null;
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "x")) {
            if (numberAsPixels(f.value)) |px| dx = px;
        } else if (std.mem.eql(u8, f.name, "y")) {
            if (numberAsPixels(f.value)) |px| dy = px;
        } else if (f.name.len == 0 and child == null) {
            child = f.value;
        }
    }
    if (child) |ch| paintValue(ch, fb, off.plus(.{ .x = dx, .y = dy }), style);
}

/// Flat fallback for 3D constructors the renderer doesn't model
/// (render3d / extrude / material / rotate / scale). The first
/// positional is treated as the wrapped child; any `fill:` becomes
/// the inherited style (so `.material(fill: ...)` reaches the inner
/// glyph). Every other arg — depth, metalness, axis angles, scale
/// factors — is dropped silently. The result: a flat 2D shape in
/// roughly the right place, painted in roughly the right colour.
fn paintWrapper(c: value.Constructed, fb: *Framebuffer, off: Offset, style: Style) void {
    var child: ?value.Value = null;
    var new_style = style;
    for (c.fields) |f| {
        if (f.name.len == 0) {
            if (child == null) child = f.value;
        } else if (std.mem.eql(u8, f.name, "fill")) {
            new_style.fill = f.value;
        }
    }
    if (child) |ch| paintValue(ch, fb, off, new_style);
}

fn numberAsPixels(v: value.Value) ?f64 {
    if (v != .number) return null;
    return v.number.value;
}

/// Read a `vec2(...)` value as an (x, y) offset in pixels. Accepts
/// both positional (`vec2(100, 50)`) and named (`vec2(x: 100, y: 50)`)
/// forms; missing components default to 0. Any other shape returns
/// null so the caller falls back to the default offset.
fn valueAsOffset(v: value.Value) ?Offset {
    if (v != .constructed) return null;
    const c = v.constructed;
    if (!std.mem.eql(u8, c.name, "vec2")) return null;
    var x: f64 = 0;
    var y: f64 = 0;
    var pos: usize = 0;
    for (c.fields) |f| {
        const n = numberAsPixels(f.value) orelse continue;
        if (std.mem.eql(u8, f.name, "x")) {
            x = n;
        } else if (std.mem.eql(u8, f.name, "y")) {
            y = n;
        } else if (f.name.len == 0) {
            if (pos == 0) x = n else if (pos == 1) y = n;
            pos += 1;
        }
    }
    return .{ .x = x, .y = y };
}

/// Fill an axis-aligned rectangle [x0, x0+w) × [y0, y0+h) with `rgba`,
/// clipping to the framebuffer bounds. Coordinates are in canvas
/// pixels and may be fractional or outside the canvas — the
/// rasteriser floors/ceils to the nearest integer pixel grid and
/// clamps before drawing.
fn fillRect(fb: *Framebuffer, x0: f64, y0: f64, w: f64, h: f64, rgba: [4]u8) void {
    if (w <= 0 or h <= 0) return;
    const fb_w: i64 = @intCast(fb.width);
    const fb_h: i64 = @intCast(fb.height);
    const xs = @max(0, @as(i64, @intFromFloat(@floor(x0))));
    const ys = @max(0, @as(i64, @intFromFloat(@floor(y0))));
    const xe = @min(fb_w, @as(i64, @intFromFloat(@ceil(x0 + w))));
    const ye = @min(fb_h, @as(i64, @intFromFloat(@ceil(y0 + h))));
    if (xs >= xe or ys >= ye) return;
    var row: i64 = ys;
    while (row < ye) : (row += 1) {
        var col: i64 = xs;
        while (col < xe) : (col += 1) {
            const i = (@as(usize, @intCast(row)) * fb.width + @as(usize, @intCast(col))) * 4;
            // Source-over compositing: rgba on top of fb pixel.
            const sa = @as(f32, @floatFromInt(rgba[3])) / 255.0;
            const ia = 1.0 - sa;
            inline for (0..3) |k| {
                const dst = @as(f32, @floatFromInt(fb.pixels[i + k])) / 255.0;
                const src = @as(f32, @floatFromInt(rgba[k])) / 255.0;
                const out = src * sa + dst * ia;
                fb.pixels[i + k] = @intFromFloat(@round(out * 255.0));
            }
            fb.pixels[i + 3] = 255;
        }
    }
}

/// Convert a Value (expected to be a color literal — hex or oklch) into
/// an sRGB RGBA tuple. Unknown shapes return opaque magenta as a visible
/// "I don't know how to render this color" signal.
fn valueToRgba(v: value.Value) [4]u8 {
    return switch (v) {
        .color => |c| colorToRgba(c),
        else => .{ 255, 0, 255, 255 }, // fallback magenta
    };
}

fn colorToRgba(c: value.Color) [4]u8 {
    return switch (c) {
        .hex => |h| hexToRgba(h.digits),
        .oklch => |v| oklchToRgba(v.l.*, v.c.*, v.h.*),
        // oklab / srgb literals aren't wired through yet — render as
        // magenta so the gap is visible rather than silent black.
        else => .{ 255, 0, 255, 255 },
    };
}

fn hexToRgba(digits: []const u8) [4]u8 {
    // Accept #rgb, #rrggbb, #rrggbbaa. Anything else falls back to white.
    return switch (digits.len) {
        3 => .{
            expandHexNibble(digits[0]),
            expandHexNibble(digits[1]),
            expandHexNibble(digits[2]),
            255,
        },
        6 => .{
            parseHexByte(digits[0..2]),
            parseHexByte(digits[2..4]),
            parseHexByte(digits[4..6]),
            255,
        },
        8 => .{
            parseHexByte(digits[0..2]),
            parseHexByte(digits[2..4]),
            parseHexByte(digits[4..6]),
            parseHexByte(digits[6..8]),
        },
        else => .{ 255, 255, 255, 255 },
    };
}

fn expandHexNibble(c: u8) u8 {
    const v = hexValue(c);
    return v * 16 + v;
}

fn parseHexByte(s: []const u8) u8 {
    return hexValue(s[0]) * 16 + hexValue(s[1]);
}

fn hexValue(c: u8) u8 {
    return switch (c) {
        '0'...'9' => c - '0',
        'a'...'f' => c - 'a' + 10,
        'A'...'F' => c - 'A' + 10,
        else => 0,
    };
}

/// Convert a still oklch triple to sRGB8. `l`, `c`, `h` must already be
/// sampled scalars (sampler resolves any animated channels first); if
/// they aren't numbers we render the fallback magenta.
fn oklchToRgba(l: value.Value, c: value.Value, h: value.Value) [4]u8 {
    if (l != .number or c != .number or h != .number) return .{ 255, 0, 255, 255 };
    const ll = l.number.value;
    const cc = c.number.value;
    // Hue is conventionally degrees in oklch literals; convert.
    const hh_deg = h.number.value;
    const hh_rad = hh_deg * std.math.pi / 180.0;
    const a = cc * std.math.cos(hh_rad);
    const b = cc * std.math.sin(hh_rad);
    return oklabToRgba(ll, a, b);
}

fn oklabToRgba(L: f64, a: f64, b: f64) [4]u8 {
    // Björn Ottosson's reference oklab → linear sRGB matrices.
    // https://bottosson.github.io/posts/oklab/
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

    const l3 = l_ * l_ * l_;
    const m3 = m_ * m_ * m_;
    const s3 = s_ * s_ * s_;

    const r_lin = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
    const g_lin = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
    const b_lin = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

    return .{
        srgbEncode(r_lin),
        srgbEncode(g_lin),
        srgbEncode(b_lin),
        255,
    };
}

fn srgbEncode(linear: f64) u8 {
    const x = std.math.clamp(linear, 0.0, 1.0);
    const gamma = if (x <= 0.0031308)
        12.92 * x
    else
        1.055 * std.math.pow(f64, x, 1.0 / 2.4) - 0.055;
    return @intFromFloat(@round(std.math.clamp(gamma, 0.0, 1.0) * 255.0));
}

// -------- bitmap font --------
//
// A 5-wide × 7-tall bitmap glyph for each supported character. Each
// row is a u8 whose low five bits are the column pixels, MSB-leftmost
// (bit 4 = leftmost pixel). The set covers what the taste sample and
// most short labels need: uppercase A-Z, digits 0-9, space, and the
// punctuation that shows up in marketing copy. Unknown characters
// fall back to a filled box so the gap is visible rather than silent.
//
// This is the minimum viable text path. The real one is a TTF / OTF
// rasteriser (see Plan.md priority 1.c → real fonts); this lets the
// taste sample read as a glyph today without dragging in a font.

const Glyph = [7]u8;

fn lookupGlyph(c: u8) Glyph {
    return switch (c) {
        'A' => .{ 0b01110, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001 },
        'B' => .{ 0b11110, 0b10001, 0b10001, 0b11110, 0b10001, 0b10001, 0b11110 },
        'C' => .{ 0b01110, 0b10001, 0b10000, 0b10000, 0b10000, 0b10001, 0b01110 },
        'D' => .{ 0b11110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b11110 },
        'E' => .{ 0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b11111 },
        'F' => .{ 0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b10000 },
        'G' => .{ 0b01110, 0b10001, 0b10000, 0b10111, 0b10001, 0b10001, 0b01110 },
        'H' => .{ 0b10001, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001 },
        'I' => .{ 0b01110, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b01110 },
        'J' => .{ 0b00111, 0b00010, 0b00010, 0b00010, 0b00010, 0b10010, 0b01100 },
        'K' => .{ 0b10001, 0b10010, 0b10100, 0b11000, 0b10100, 0b10010, 0b10001 },
        'L' => .{ 0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b11111 },
        'M' => .{ 0b10001, 0b11011, 0b10101, 0b10101, 0b10001, 0b10001, 0b10001 },
        'N' => .{ 0b10001, 0b11001, 0b10101, 0b10011, 0b10001, 0b10001, 0b10001 },
        'O' => .{ 0b01110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110 },
        'P' => .{ 0b11110, 0b10001, 0b10001, 0b11110, 0b10000, 0b10000, 0b10000 },
        'Q' => .{ 0b01110, 0b10001, 0b10001, 0b10001, 0b10101, 0b10010, 0b01101 },
        'R' => .{ 0b11110, 0b10001, 0b10001, 0b11110, 0b10100, 0b10010, 0b10001 },
        'S' => .{ 0b01111, 0b10000, 0b10000, 0b01110, 0b00001, 0b00001, 0b11110 },
        'T' => .{ 0b11111, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100 },
        'U' => .{ 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110 },
        'V' => .{ 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01010, 0b00100 },
        'W' => .{ 0b10001, 0b10001, 0b10001, 0b10101, 0b10101, 0b10101, 0b01010 },
        'X' => .{ 0b10001, 0b10001, 0b01010, 0b00100, 0b01010, 0b10001, 0b10001 },
        'Y' => .{ 0b10001, 0b10001, 0b10001, 0b01010, 0b00100, 0b00100, 0b00100 },
        'Z' => .{ 0b11111, 0b00001, 0b00010, 0b00100, 0b01000, 0b10000, 0b11111 },
        '0' => .{ 0b01110, 0b10001, 0b10011, 0b10101, 0b11001, 0b10001, 0b01110 },
        '1' => .{ 0b00100, 0b01100, 0b00100, 0b00100, 0b00100, 0b00100, 0b01110 },
        '2' => .{ 0b01110, 0b10001, 0b00001, 0b00010, 0b00100, 0b01000, 0b11111 },
        '3' => .{ 0b11110, 0b00001, 0b00001, 0b01110, 0b00001, 0b00001, 0b11110 },
        '4' => .{ 0b00010, 0b00110, 0b01010, 0b10010, 0b11111, 0b00010, 0b00010 },
        '5' => .{ 0b11111, 0b10000, 0b11110, 0b00001, 0b00001, 0b10001, 0b01110 },
        '6' => .{ 0b00110, 0b01000, 0b10000, 0b11110, 0b10001, 0b10001, 0b01110 },
        '7' => .{ 0b11111, 0b00001, 0b00010, 0b00100, 0b01000, 0b01000, 0b01000 },
        '8' => .{ 0b01110, 0b10001, 0b10001, 0b01110, 0b10001, 0b10001, 0b01110 },
        '9' => .{ 0b01110, 0b10001, 0b10001, 0b01111, 0b00001, 0b00010, 0b01100 },
        ' ' => .{ 0, 0, 0, 0, 0, 0, 0 },
        '.' => .{ 0, 0, 0, 0, 0, 0b00110, 0b00110 },
        ',' => .{ 0, 0, 0, 0, 0b00110, 0b00110, 0b00100 },
        ':' => .{ 0, 0b00110, 0b00110, 0, 0b00110, 0b00110, 0 },
        '-' => .{ 0, 0, 0, 0b11111, 0, 0, 0 },
        '!' => .{ 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0, 0b00100 },
        '?' => .{ 0b01110, 0b10001, 0b00010, 0b00100, 0b00100, 0, 0b00100 },
        // Unknown: filled 5×7 box. Visible, makes the gap easy to spot.
        else => .{ 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111 },
    };
}

/// Write the framebuffer as a PNG. RGBA8, no interlacing, stored
/// deflate (no compression of the pixel data — keeps the encoder under
/// 200 lines of Zig with no external deps). For 320×180 the file is
/// ~230 KB; for a typical preview that's fine. We'll switch to real
/// deflate when we render anything bigger than a phone screen.
///
/// Spec: https://www.w3.org/TR/PNG/. Sections referenced inline.
pub fn writePng(arena: std.mem.Allocator, fb: Framebuffer, writer: anytype) !void {
    // §5.2 — file signature.
    try writer.writeAll(&[_]u8{ 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A });

    // §11.2.2 IHDR.
    var ihdr: [13]u8 = undefined;
    std.mem.writeInt(u32, ihdr[0..4], fb.width, .big);
    std.mem.writeInt(u32, ihdr[4..8], fb.height, .big);
    ihdr[8] = 8; // bit depth
    ihdr[9] = 6; // color type: RGBA (truecolor + alpha)
    ihdr[10] = 0; // compression method (0 = deflate)
    ihdr[11] = 0; // filter method (0 = adaptive per-scanline)
    ihdr[12] = 0; // interlace method (0 = none)
    try writePngChunk(writer, "IHDR", &ihdr);

    // §11.2.4 IDAT — build the zlib-wrapped, deflate-stored pixel
    // stream, then drop it in a single chunk. Filter byte 0 (None) per
    // scanline means we just prepend a zero to each row of raw bytes.
    const row_bytes: usize = @as(usize, fb.width) * 4;
    const raw_size = @as(usize, fb.height) * (1 + row_bytes);
    const raw = try arena.alloc(u8, raw_size);
    var ro: usize = 0;
    var y: u32 = 0;
    while (y < fb.height) : (y += 1) {
        raw[ro] = 0; // filter: None
        ro += 1;
        const src = @as(usize, y) * row_bytes;
        @memcpy(raw[ro .. ro + row_bytes], fb.pixels[src .. src + row_bytes]);
        ro += row_bytes;
    }

    // RFC 1950 zlib wrapper around RFC 1951 deflate stored blocks. Two-
    // byte zlib header is `78 01` — fastest/least-compression preset,
    // matches stored deflate.
    const stored_overhead = 5; // per block: 1 byte BFINAL/BTYPE + 4 bytes LEN/NLEN
    const max_block = 0xFFFF;
    const num_blocks = if (raw.len == 0) 1 else (raw.len + max_block - 1) / max_block;
    const idat_size = 2 + raw.len + num_blocks * stored_overhead + 4;
    const idat = try arena.alloc(u8, idat_size);
    var p: usize = 0;
    idat[p] = 0x78;
    idat[p + 1] = 0x01;
    p += 2;
    var off: usize = 0;
    var blocks_written: usize = 0;
    while (true) : (blocks_written += 1) {
        const remaining = raw.len - off;
        const block_len: u16 = @intCast(@min(remaining, max_block));
        const is_last = blocks_written + 1 == num_blocks;
        idat[p] = if (is_last) 0x01 else 0x00; // BFINAL bit + BTYPE=00 (stored)
        p += 1;
        // §3.2.4 — LEN little-endian, NLEN is one's complement.
        std.mem.writeInt(u16, idat[p..][0..2], block_len, .little);
        p += 2;
        std.mem.writeInt(u16, idat[p..][0..2], ~block_len, .little);
        p += 2;
        if (block_len > 0) {
            @memcpy(idat[p .. p + block_len], raw[off .. off + block_len]);
            p += block_len;
            off += block_len;
        }
        if (is_last) break;
    }
    const adler = std.hash.Adler32.hash(raw);
    std.mem.writeInt(u32, idat[p..][0..4], adler, .big);
    p += 4;
    try writePngChunk(writer, "IDAT", idat[0..p]);

    // §11.2.5 IEND.
    try writePngChunk(writer, "IEND", &.{});
}

fn writePngChunk(writer: anytype, chunk_type: []const u8, data: []const u8) !void {
    var len_bytes: [4]u8 = undefined;
    std.mem.writeInt(u32, &len_bytes, @intCast(data.len), .big);
    try writer.writeAll(&len_bytes);
    try writer.writeAll(chunk_type);
    try writer.writeAll(data);

    // §5.5 — CRC32 over chunk_type + data.
    var crc = std.hash.Crc32.init();
    crc.update(chunk_type);
    crc.update(data);
    var crc_bytes: [4]u8 = undefined;
    std.mem.writeInt(u32, &crc_bytes, crc.final(), .big);
    try writer.writeAll(&crc_bytes);
}

/// Write the framebuffer out as binary PPM (P6). PPM is the simplest
/// format around; useful for piping into ImageMagick or `display`.
/// Alpha is composited against black during the write — PPM is RGB-only.
pub fn writePpm(fb: Framebuffer, writer: anytype) !void {
    try writer.print("P6\n{d} {d}\n255\n", .{ fb.width, fb.height });
    var i: usize = 0;
    while (i < fb.pixels.len) : (i += 4) {
        const a = @as(f32, @floatFromInt(fb.pixels[i + 3])) / 255.0;
        const rgb = [3]u8{
            @intFromFloat(@as(f32, @floatFromInt(fb.pixels[i + 0])) * a),
            @intFromFloat(@as(f32, @floatFromInt(fb.pixels[i + 1])) * a),
            @intFromFloat(@as(f32, @floatFromInt(fb.pixels[i + 2])) * a),
        };
        try writer.writeAll(&rgb);
    }
}

//
// Tests
//

test "fillRect: a single rect paints inside its bounds and not outside" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    var fb = Framebuffer{
        .pixels = try a.alloc(u8, 16 * 16 * 4),
        .width = 16,
        .height = 16,
    };
    @memset(fb.pixels, 0);

    fillRect(&fb, 0, 0, 4, 4, .{ 200, 100, 50, 255 });

    // Inside
    try std.testing.expectEqual(@as(u8, 200), fb.pixels[(0 * 16 + 0) * 4 + 0]);
    try std.testing.expectEqual(@as(u8, 100), fb.pixels[(0 * 16 + 0) * 4 + 1]);
    try std.testing.expectEqual(@as(u8, 50), fb.pixels[(3 * 16 + 3) * 4 + 2]);
    // Outside
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[(4 * 16 + 4) * 4 + 0]);
}

test "renderTree: a single rect is centered on the canvas by default" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // 8×8 rect on a 16×16 canvas → spans rows 4-11, cols 4-11 (inclusive),
    // leaving the corners untouched.
    const rect_fields = try a.alloc(value.Field, 3);
    rect_fields[0] = .{ .name = "width", .value = .{ .number = .{ .value = 8, .unit = .px } } };
    rect_fields[1] = .{ .name = "height", .value = .{ .number = .{ .value = 8, .unit = .px } } };
    rect_fields[2] = .{ .name = "fill", .value = .{ .color = .{ .hex = .{ .digits = "ff0000" } } } };
    const tree: value.Value = .{ .constructed = .{ .name = "rect", .fields = rect_fields } };

    const fb = try renderTree(a, tree, 16, 16);
    // Centre pixel is filled.
    const c = (8 * 16 + 8) * 4;
    try std.testing.expectEqual(@as(u8, 255), fb.pixels[c + 0]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[c + 1]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[c + 2]);
    // Top-left corner is untouched (alpha 0).
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[3]);
}

test "renderTree: rect honours `at: vec2(x, y)` to shift its centre" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // 4×4 rect on a 16×16 canvas, shifted (+4, +4) from centre →
    // centre lands at (12, 12), so the rect spans rows 10-13 cols 10-13.
    const vec_fields = try a.alloc(value.Field, 2);
    vec_fields[0] = .{ .name = "", .value = .{ .number = .{ .value = 4, .unit = null } } };
    vec_fields[1] = .{ .name = "", .value = .{ .number = .{ .value = 4, .unit = null } } };
    const vec: value.Value = .{ .constructed = .{ .name = "vec2", .fields = vec_fields } };

    const rect_fields = try a.alloc(value.Field, 4);
    rect_fields[0] = .{ .name = "width", .value = .{ .number = .{ .value = 4, .unit = .px } } };
    rect_fields[1] = .{ .name = "height", .value = .{ .number = .{ .value = 4, .unit = .px } } };
    rect_fields[2] = .{ .name = "fill", .value = .{ .color = .{ .hex = .{ .digits = "00ff00" } } } };
    rect_fields[3] = .{ .name = "at", .value = vec };
    const tree: value.Value = .{ .constructed = .{ .name = "rect", .fields = rect_fields } };

    const fb = try renderTree(a, tree, 16, 16);
    // Inside the shifted rect.
    const inside = (11 * 16 + 11) * 4;
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[inside + 0]);
    try std.testing.expectEqual(@as(u8, 255), fb.pixels[inside + 1]);
    // Canvas centre (8, 8) is now outside the rect.
    const center = (8 * 16 + 8) * 4;
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[center + 3]);
}

test "renderTree: translate(shape, x:, y:) shifts the wrapped shape" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // A centered 4×4 rect wrapped in translate(x: -4, y: -4) lands at
    // canvas-centre minus 4 → centre at (4, 4), spans rows 2-5 cols 2-5.
    const rect_fields = try a.alloc(value.Field, 3);
    rect_fields[0] = .{ .name = "width", .value = .{ .number = .{ .value = 4, .unit = .px } } };
    rect_fields[1] = .{ .name = "height", .value = .{ .number = .{ .value = 4, .unit = .px } } };
    rect_fields[2] = .{ .name = "fill", .value = .{ .color = .{ .hex = .{ .digits = "0000ff" } } } };
    const inner: value.Value = .{ .constructed = .{ .name = "rect", .fields = rect_fields } };

    const tr_fields = try a.alloc(value.Field, 3);
    tr_fields[0] = .{ .name = "", .value = inner }; // method-chain receiver
    tr_fields[1] = .{ .name = "x", .value = .{ .number = .{ .value = -4, .unit = .px } } };
    tr_fields[2] = .{ .name = "y", .value = .{ .number = .{ .value = -4, .unit = .px } } };
    const tree: value.Value = .{ .constructed = .{ .name = "translate", .fields = tr_fields } };

    const fb = try renderTree(a, tree, 16, 16);
    const inside = (3 * 16 + 3) * 4;
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[inside + 0]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[inside + 1]);
    try std.testing.expectEqual(@as(u8, 255), fb.pixels[inside + 2]);
    // Canvas centre is now untouched.
    const center = (8 * 16 + 8) * 4;
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[center + 3]);
}

test "renderTree: compose stacks layers — later wins" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    var bg_fields = try a.alloc(value.Field, 3);
    bg_fields[0] = .{ .name = "width", .value = .{ .number = .{ .value = 8, .unit = .px } } };
    bg_fields[1] = .{ .name = "height", .value = .{ .number = .{ .value = 8, .unit = .px } } };
    bg_fields[2] = .{ .name = "fill", .value = .{ .color = .{ .hex = .{ .digits = "ff0000" } } } };

    var fg_fields = try a.alloc(value.Field, 3);
    fg_fields[0] = .{ .name = "width", .value = .{ .number = .{ .value = 4, .unit = .px } } };
    fg_fields[1] = .{ .name = "height", .value = .{ .number = .{ .value = 4, .unit = .px } } };
    fg_fields[2] = .{ .name = "fill", .value = .{ .color = .{ .hex = .{ .digits = "00ff00" } } } };

    const layers = try a.alloc(value.Value, 2);
    layers[0] = .{ .constructed = .{ .name = "rect", .fields = bg_fields } };
    layers[1] = .{ .constructed = .{ .name = "rect", .fields = fg_fields } };

    const compose_fields = try a.alloc(value.Field, 1);
    compose_fields[0] = .{ .name = "layers", .value = .{ .array = .{ .elems = layers } } };
    const tree: value.Value = .{ .constructed = .{ .name = "compose", .fields = compose_fields } };

    const fb = try renderTree(a, tree, 8, 8);
    // Both rects centre on (4, 4). The fg 4×4 covers rows 2-5 cols 2-5;
    // the bg 8×8 covers the whole canvas. So the canvas centre is green,
    // and a corner is red.
    const center = (4 * 8 + 4) * 4;
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[center + 0]);
    try std.testing.expectEqual(@as(u8, 255), fb.pixels[center + 1]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[center + 2]);
    // Bottom-right corner is bg only.
    const i = (7 * 8 + 7) * 4;
    try std.testing.expectEqual(@as(u8, 255), fb.pixels[i + 0]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[i + 1]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[i + 2]);
}

test "renderTree: 3D wrappers (render3d / extrude / rotate / scale) descend to the inner shape" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // The taste sample's shape: render3d ▸ scale ▸ rotate ▸ material ▸
    // extrude ▸ <leaf>. Substitute a plain rect for the leaf so the
    // renderer has something it knows how to paint, and confirm every
    // wrapper transparently descends.
    const rect_fields = try a.alloc(value.Field, 3);
    rect_fields[0] = .{ .name = "width", .value = .{ .number = .{ .value = 4, .unit = .px } } };
    rect_fields[1] = .{ .name = "height", .value = .{ .number = .{ .value = 4, .unit = .px } } };
    rect_fields[2] = .{ .name = "fill", .value = .{ .color = .{ .hex = .{ .digits = "00ff00" } } } };
    const leaf: value.Value = .{ .constructed = .{ .name = "rect", .fields = rect_fields } };

    const stack = struct {
        fn wrap(alloc: std.mem.Allocator, name: []const u8, child: value.Value) !value.Value {
            const fs = try alloc.alloc(value.Field, 1);
            fs[0] = .{ .name = "", .value = child };
            return .{ .constructed = .{ .name = name, .fields = fs } };
        }
    };
    var tree = leaf;
    inline for (.{ "extrude", "material", "rotate", "scale", "render3d" }) |name| {
        tree = try stack.wrap(a, name, tree);
    }

    const fb = try renderTree(a, tree, 16, 16);
    const center = (8 * 16 + 8) * 4;
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[center + 0]);
    try std.testing.expectEqual(@as(u8, 255), fb.pixels[center + 1]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[center + 2]);
    // Corners stay untouched — the wrappers don't expand the shape.
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[3]);
}

test "renderTree: material(fill:) propagates to a fill-less inner shape" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // Rect without its own fill — should inherit the material's red.
    const rect_fields = try a.alloc(value.Field, 2);
    rect_fields[0] = .{ .name = "width", .value = .{ .number = .{ .value = 4, .unit = .px } } };
    rect_fields[1] = .{ .name = "height", .value = .{ .number = .{ .value = 4, .unit = .px } } };
    const leaf: value.Value = .{ .constructed = .{ .name = "rect", .fields = rect_fields } };

    const mat_fields = try a.alloc(value.Field, 2);
    mat_fields[0] = .{ .name = "", .value = leaf };
    mat_fields[1] = .{ .name = "fill", .value = .{ .color = .{ .hex = .{ .digits = "ff0000" } } } };
    const tree: value.Value = .{ .constructed = .{ .name = "material", .fields = mat_fields } };

    const fb = try renderTree(a, tree, 16, 16);
    const center = (8 * 16 + 8) * 4;
    try std.testing.expectEqual(@as(u8, 255), fb.pixels[center + 0]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[center + 1]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[center + 2]);
}

test "renderTree: an inner `fill:` beats the outer material `fill:`" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // Rect with its own green fill inside a red material — green wins.
    const rect_fields = try a.alloc(value.Field, 3);
    rect_fields[0] = .{ .name = "width", .value = .{ .number = .{ .value = 4, .unit = .px } } };
    rect_fields[1] = .{ .name = "height", .value = .{ .number = .{ .value = 4, .unit = .px } } };
    rect_fields[2] = .{ .name = "fill", .value = .{ .color = .{ .hex = .{ .digits = "00ff00" } } } };
    const leaf: value.Value = .{ .constructed = .{ .name = "rect", .fields = rect_fields } };

    const mat_fields = try a.alloc(value.Field, 2);
    mat_fields[0] = .{ .name = "", .value = leaf };
    mat_fields[1] = .{ .name = "fill", .value = .{ .color = .{ .hex = .{ .digits = "ff0000" } } } };
    const tree: value.Value = .{ .constructed = .{ .name = "material", .fields = mat_fields } };

    const fb = try renderTree(a, tree, 16, 16);
    const center = (8 * 16 + 8) * 4;
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[center + 0]);
    try std.testing.expectEqual(@as(u8, 255), fb.pixels[center + 1]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[center + 2]);
}

test "renderTree: text.glyph(\"C\") paints non-empty pixels at canvas centre" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // 64×64 canvas, default 96px → cell ≈ 14px. The "C" bitmap's
    // top-left bit is OFF (the curve), but the cell at (col 1, row 0)
    // is ON. Easier: count non-zero pixels and expect more than zero.
    const fields = try a.alloc(value.Field, 1);
    fields[0] = .{ .name = "", .value = .{ .string = "\"C\"" } };
    const tree: value.Value = .{ .constructed = .{ .name = "text.glyph", .fields = fields } };

    const fb = try renderTree(a, tree, 128, 128);
    var any: usize = 0;
    var i: usize = 3;
    while (i < fb.pixels.len) : (i += 4) {
        if (fb.pixels[i] != 0) any += 1;
    }
    try std.testing.expect(any > 100);
}

test "renderTree: text.glyph honours `size:` to scale the bitmap" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    const small_fields = try a.alloc(value.Field, 2);
    small_fields[0] = .{ .name = "", .value = .{ .string = "\"O\"" } };
    small_fields[1] = .{ .name = "size", .value = .{ .number = .{ .value = 14, .unit = .px } } };
    const small_tree: value.Value = .{ .constructed = .{ .name = "text.glyph", .fields = small_fields } };

    const big_fields = try a.alloc(value.Field, 2);
    big_fields[0] = .{ .name = "", .value = .{ .string = "\"O\"" } };
    big_fields[1] = .{ .name = "size", .value = .{ .number = .{ .value = 70, .unit = .px } } };
    const big_tree: value.Value = .{ .constructed = .{ .name = "text.glyph", .fields = big_fields } };

    const small = try renderTree(a, small_tree, 128, 128);
    const big = try renderTree(a, big_tree, 128, 128);

    var small_count: usize = 0;
    var big_count: usize = 0;
    var i: usize = 3;
    while (i < small.pixels.len) : (i += 4) {
        if (small.pixels[i] != 0) small_count += 1;
        if (big.pixels[i] != 0) big_count += 1;
    }
    try std.testing.expect(big_count > small_count * 4);
}

test "renderTree: text.glyph picks up the inherited material `fill:`" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // material(text.glyph("X"), fill: #00ff00) — the painted pixels
    // should land in the green range.
    const glyph_fields = try a.alloc(value.Field, 1);
    glyph_fields[0] = .{ .name = "", .value = .{ .string = "\"X\"" } };
    const glyph: value.Value = .{ .constructed = .{ .name = "text.glyph", .fields = glyph_fields } };

    const mat_fields = try a.alloc(value.Field, 2);
    mat_fields[0] = .{ .name = "", .value = glyph };
    mat_fields[1] = .{ .name = "fill", .value = .{ .color = .{ .hex = .{ .digits = "00ff00" } } } };
    const tree: value.Value = .{ .constructed = .{ .name = "material", .fields = mat_fields } };

    const fb = try renderTree(a, tree, 128, 128);
    // Find any painted pixel and check it's green, not white.
    var i: usize = 3;
    var found = false;
    while (i < fb.pixels.len) : (i += 4) {
        if (fb.pixels[i] != 0) {
            try std.testing.expectEqual(@as(u8, 0), fb.pixels[i - 3]);
            try std.testing.expectEqual(@as(u8, 255), fb.pixels[i - 2]);
            try std.testing.expectEqual(@as(u8, 0), fb.pixels[i - 1]);
            found = true;
            break;
        }
    }
    try std.testing.expect(found);
}

test "oklch: known sanity values land in plausible sRGB range" {
    // oklch(0.5, 0, 0) is mid-grey (no chroma).
    const grey = oklchToRgba(
        .{ .number = .{ .value = 0.5, .unit = null } },
        .{ .number = .{ .value = 0, .unit = null } },
        .{ .number = .{ .value = 0, .unit = null } },
    );
    // Equal channels, in the rough middle of the brightness range.
    try std.testing.expectEqual(grey[0], grey[1]);
    try std.testing.expectEqual(grey[1], grey[2]);
    try std.testing.expect(grey[0] > 80 and grey[0] < 200);
}

test "writePng: emits a well-formed file with expected signature and chunks" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    var fb = Framebuffer{
        .pixels = try a.alloc(u8, 4 * 4 * 4),
        .width = 4,
        .height = 4,
    };
    @memset(fb.pixels, 0);
    fb.pixels[0] = 255;
    fb.pixels[3] = 255;

    var buf: [4096]u8 = undefined;
    var stream = std.Io.Writer.fixed(&buf);
    try writePng(a, fb, &stream);
    const out = stream.buffered();

    const sig = [_]u8{ 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A };
    try std.testing.expect(std.mem.startsWith(u8, out, &sig));
    // Each PNG file ends with an IEND chunk: 4-byte zero length, "IEND",
    // 4-byte CRC. The chunk type makes a reliable terminal marker.
    try std.testing.expect(std.mem.indexOf(u8, out, "IHDR") != null);
    try std.testing.expect(std.mem.indexOf(u8, out, "IDAT") != null);
    try std.testing.expect(std.mem.indexOf(u8, out, "IEND") != null);
}

test "writePpm: header + payload byte count" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    var fb = Framebuffer{
        .pixels = try a.alloc(u8, 4 * 4 * 4),
        .width = 4,
        .height = 4,
    };
    @memset(fb.pixels, 0);
    // Make one pixel fully opaque red so the alpha-multiplication path runs.
    fb.pixels[0] = 255;
    fb.pixels[3] = 255;

    var buf: [256]u8 = undefined;
    var stream = std.Io.Writer.fixed(&buf);
    try writePpm(fb, &stream);
    const out = stream.buffered();
    // Header form is fixed; payload is 4*4*3 = 48 bytes.
    try std.testing.expect(std.mem.startsWith(u8, out, "P6\n4 4\n255\n"));
    try std.testing.expectEqual(@as(usize, "P6\n4 4\n255\n".len + 48), out.len);
}
