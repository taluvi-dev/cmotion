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
//!   - Color literals: `#rrggbb` hex (with or without alpha),
//!     `oklch(l, c, h)`, `oklab(l, a, b)`, `srgb(r, g, b)` (channels
//!     in 0..1). All routed through the same oklab→linear-sRGB→gamma
//!     pipeline. Animated channels are expected to already be
//!     resolved by the sampler before they reach the renderer.
//!
//! Ignored:
//!   - 3D content's *3D-ness* — `render3d`, `extrude`, `material`,
//!     `rotate`, `scale` paint the wrapped child flat (see Coordinate
//!     system); depth, lights, axis angles, scale factors, metalness
//!     etc. are silently dropped.
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
const builtin = @import("builtin");
const value = @import("value.zig");
const mesh_mod = @import("mesh.zig");

/// True for the native build only. The 3D rasteriser needs libm
/// (sqrt, sin, cos, tan, …) which the freestanding WASM target
/// doesn't ship. The flat fallback continues to do for WASM until
/// either we vendor math shims or move WASM to wasm32-wasi.
const has_3d = !builtin.target.cpu.arch.isWasm();
const render3d = if (has_3d) @import("render3d.zig") else void;
const font_mod = if (has_3d) @import("font.zig") else void;

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

/// Painting context inherited from outer wrappers. `fill:` flows
/// through every paint path (2D and 3D); `metalness:` / `roughness:`
/// only matter to the 3D rasteriser but live in the same Style so
/// `.material(fill:, metalness:, roughness:)` has one source of
/// truth. 2D paint functions silently ignore the 3D-only fields.
const Style = struct {
    fill: ?value.Value = null,
    /// PBR-style "how metal-ish is this surface". Defaults nil →
    /// the renderer treats unset as 0 (pure dielectric).
    metalness: ?f32 = null,
    /// PBR-style "how rough is this surface". Defaults nil →
    /// renderer treats unset as 1 (fully rough, essentially diffuse).
    roughness: ?f32 = null,
    /// Self-illuminating colour added after lighting. Lets faces
    /// facing away from every light still read as the material
    /// rather than going pitch-black. `null` = no emission.
    emissive: ?value.Value = null,
    /// Multiplier on `emissive`. `null` defaults to 1.0.
    emissive_intensity: ?f32 = null,
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
/// constructors paint; `render3d(...)` switches into the 3D
/// rasteriser when available; the remaining 3D wrappers descend to
/// the inner shape (flat fallback — see paintWrapper) when 3D
/// isn't compiled in.
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
            } else if (std.mem.eql(u8, c.name, "sprite")) {
                paintSprite(c, fb, off, style);
            } else if (has_3d and std.mem.eql(u8, c.name, "render3d")) {
                paintRender3D(c, fb, off, style);
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

/// True for the native build, false for `wasm32-*`. Gates the TTF
/// path (stb_truetype needs libm symbols the freestanding WASM
/// target doesn't provide). WASM keeps the block-letter fallback
/// until that target either gains math shims or moves to wasm32-wasi.
const has_ttf_font = !@import("builtin").target.cpu.arch.isWasm();
const font = if (has_ttf_font) @import("font.zig") else void;

/// `text.glyph(string, font?, size?)` — paints each character through
/// the bundled TTF on native, or as 5×7 block letters on WASM. The
/// `font:` arg is read but unused (one font ships); `size:` controls
/// the cap height in pixels (default 96). Glyphs are anti-aliased on
/// native (coverage from stb_truetype composited via source-over);
/// the block-letter WASM fallback is binary on/off.
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

    const rgba: [4]u8 = if (style.fill) |fv| valueToRgba(fv) else .{ 255, 255, 255, 255 };

    if (has_ttf_font) {
        paintTextGlyphTTF(text, size_px, fb, off, rgba);
    } else {
        paintTextGlyphBlocks(text, size_px, fb, off, rgba);
    }
}

/// Outline-based path: rasterise each codepoint via stb_truetype and
/// composite the coverage bitmap into the framebuffer with the active
/// material colour. Centres the run vertically on the cap-height
/// midpoint (so a centred "C" sits visually at the canvas centre,
/// not at the baseline) and horizontally on the total advance width.
fn paintTextGlyphTTF(
    text: []const u8,
    size_px: f64,
    fb: *Framebuffer,
    off: Offset,
    rgba: [4]u8,
) void {
    const size_f32: f32 = @floatCast(size_px);
    const vm = font.vmetrics(size_f32);
    const total_w: f32 = font.measureWidth(text, size_f32);

    // Centre the visual block on the canvas centre + outer offset.
    // We position the baseline so that (ascent + descent) / 2 sits at
    // the requested centre — that's the visual middle of the glyphs,
    // not the baseline itself.
    const cx = @as(f64, @floatFromInt(fb.width)) / 2.0 + off.x;
    const cy = @as(f64, @floatFromInt(fb.height)) / 2.0 + off.y;
    var pen_x: f64 = cx - @as(f64, @floatCast(total_w)) / 2.0;
    const baseline_y: f64 = cy - @as(f64, @floatCast(vm.ascent + vm.descent)) / 2.0;

    for (text) |ch| {
        const g = font.rasterise(ch, size_f32) orelse {
            // No glyph in the font — advance by a quarter of the size
            // as a placeholder (better than collapsing to zero).
            pen_x += size_px * 0.25;
            continue;
        };
        defer font.freeBitmap(g);

        const gx = pen_x + @as(f64, @floatFromInt(g.x_offset));
        const gy = baseline_y + @as(f64, @floatFromInt(g.y_offset));
        blitCoverage(fb, g.pixels, g.width, g.height, gx, gy, rgba);
        pen_x += @as(f64, @floatCast(g.advance));
    }
}

/// Place an 8-bit coverage bitmap at (x0, y0) and composite it into
/// the framebuffer as `rgba` with coverage-as-alpha. Source-over
/// against whatever's already there. Clips to canvas bounds. The
/// coverage path is the hot one for text — every glyph goes through
/// this — so it's worth keeping it tight.
fn blitCoverage(
    fb: *Framebuffer,
    coverage: []const u8,
    cw: u32,
    ch: u32,
    x0: f64,
    y0: f64,
    rgba: [4]u8,
) void {
    const fb_w: i64 = @intCast(fb.width);
    const fb_h: i64 = @intCast(fb.height);
    const gx0_i: i64 = @intFromFloat(@floor(x0));
    const gy0_i: i64 = @intFromFloat(@floor(y0));
    const gw: i64 = @intCast(cw);
    const gh: i64 = @intCast(ch);

    const xs = @max(0, gx0_i);
    const ys = @max(0, gy0_i);
    const xe = @min(fb_w, gx0_i + gw);
    const ye = @min(fb_h, gy0_i + gh);
    if (xs >= xe or ys >= ye) return;

    var row: i64 = ys;
    while (row < ye) : (row += 1) {
        const src_row: usize = @intCast(row - gy0_i);
        var col: i64 = xs;
        while (col < xe) : (col += 1) {
            const src_col: usize = @intCast(col - gx0_i);
            const cov = coverage[src_row * @as(usize, cw) + src_col];
            if (cov == 0) continue;
            const i = (@as(usize, @intCast(row)) * fb.width + @as(usize, @intCast(col))) * 4;
            // Source colour pre-multiplied by coverage; source-over
            // against destination. Final alpha clamps to opaque since
            // text doesn't introduce transparency.
            const sa = (@as(f32, @floatFromInt(rgba[3])) / 255.0) * (@as(f32, @floatFromInt(cov)) / 255.0);
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

/// Block-letter fallback — the 5×7 bitmap path that shipped before
/// TTF rasterisation. Used by the WASM build (no libm in freestanding)
/// and as a safety net if the bundled font ever fails to load.
fn paintTextGlyphBlocks(
    text: []const u8,
    size_px: f64,
    fb: *Framebuffer,
    off: Offset,
    rgba: [4]u8,
) void {
    const cell_i: i64 = @max(1, @as(i64, @intFromFloat(@round(size_px / 7))));
    const cell: f64 = @floatFromInt(cell_i);
    const glyph_w = 5 * cell;
    const glyph_h = 7 * cell;
    const advance = 6 * cell;
    const total_w: f64 = advance * @as(f64, @floatFromInt(text.len - 1)) + glyph_w;

    const cx = @as(f64, @floatFromInt(fb.width)) / 2.0 + off.x;
    const cy = @as(f64, @floatFromInt(fb.height)) / 2.0 + off.y;
    var origin_x = cx - total_w / 2.0;
    const origin_y = cy - glyph_h / 2.0;

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

/// `sprite(image(src), width:, height:, ...)` — the native 2D build has
/// no image decoder (the textured render lives in the Three.js viewer,
/// per TODO.md), so paint a sized, positioned placeholder block where the
/// sprite goes. Honours `width`/`height` (default 256px), an optional
/// `at:` offset, and a `fill:`/`tint:` colour (default neutral gray) so
/// `cmo render`/`cmo open` read as "an image lands here" rather than
/// silently dropping the layer.
fn paintSprite(c: value.Constructed, fb: *Framebuffer, off: Offset, style: Style) void {
    var w: f64 = 256;
    var h: f64 = 256;
    var fill: ?value.Value = null;
    var at: Offset = .{};
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "width")) {
            if (numberAsPixels(f.value)) |px| w = px;
        } else if (std.mem.eql(u8, f.name, "height")) {
            if (numberAsPixels(f.value)) |px| h = px;
        } else if (std.mem.eql(u8, f.name, "fill") or std.mem.eql(u8, f.name, "tint")) {
            fill = f.value;
        } else if (std.mem.eql(u8, f.name, "at")) {
            if (valueAsOffset(f.value)) |a| at = a;
        }
    }
    const rgba: [4]u8 = if (fill) |fv|
        valueToRgba(fv)
    else if (style.fill) |sf|
        valueToRgba(sf)
    else
        .{ 128, 128, 128, 255 };

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

// ============================================================
// 3D dispatch — only compiled into the native build.
// ============================================================

/// `render3d(scene, lights:?)` — promote a 3D scene into a 2D layer.
/// Extracts the `lights:` array, walks the scene through wrapper
/// nodes (`.rotate`, `.scale`, `translate`, `.material`, `extrude`)
/// accumulating model transform + material, then rasterises the
/// resulting mesh via `render3d.drawMesh`.
///
/// Allocations (the z-buffer, transformed vertex arrays, glyph
/// outlines) are arena-rooted on a per-call arena so the renderer
/// stays free of long-lived heap state.
fn paintRender3D(c: value.Constructed, fb: *Framebuffer, off: Offset, style: Style) void {
    if (!has_3d) return;

    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const a = arena.allocator();

    var scene: ?value.Value = null;
    var lights_v: ?value.Value = null;
    var camera_v: ?value.Value = null;
    for (c.fields) |f| {
        if (f.name.len == 0) {
            if (scene == null) scene = f.value;
        } else if (std.mem.eql(u8, f.name, "lights")) {
            lights_v = f.value;
        } else if (std.mem.eql(u8, f.name, "camera")) {
            camera_v = f.value;
        }
    }
    const sc = scene orelse return;

    const lights = parseLights(a, lights_v) catch return;
    const camera = parseCamera(camera_v);

    var rfb: render3d.Framebuffer = .{ .pixels = fb.pixels, .width = fb.width, .height = fb.height };
    paint3DTree(a, sc, &rfb, mesh_mod.Mat4.identity(), style, lights, camera, off) catch {
        // Anything that fails (out of memory, mesh with degenerate
        // triangulation, etc.) falls through silently — the bg
        // layer is still on the framebuffer, which is preferable
        // to a crash. Stage 2 will turn this into a diagnostic.
    };
}

/// Walk a 3D scene tree, accumulating transforms / material until we
/// hit a leaf that produces a mesh (today: `extrude(text.glyph(...),
/// depth: ...)`). On the leaf, rasterise via render3d.
fn paint3DTree(
    arena: std.mem.Allocator,
    v: value.Value,
    fb: *render3d.Framebuffer,
    transform: mesh_mod.Mat4,
    style: Style,
    lights: []const render3d.Light,
    camera: render3d.Camera,
    off: Offset,
) !void {
    if (v != .constructed) return;
    const c = v.constructed;

    // A `compose [...]` inside a 3D scene groups several objects under
    // one camera + light rig (e.g. a title built from one extrude per
    // letter). Paint each child with the same accumulated state.
    if (std.mem.eql(u8, c.name, "compose")) {
        for (c.fields) |f| {
            if (std.mem.eql(u8, f.name, "layers") and f.value == .array) {
                for (f.value.array.elems) |layer| {
                    try paint3DTree(arena, layer, fb, transform, style, lights, camera, off);
                }
            }
        }
        return;
    }
    if (std.mem.eql(u8, c.name, "rotate")) {
        const new_transform = applyRotateArgs(c, transform);
        if (firstPositional(c)) |child| try paint3DTree(arena, child, fb, new_transform, style, lights, camera, off);
        return;
    }
    if (std.mem.eql(u8, c.name, "scale")) {
        const new_transform = applyScaleArgs(c, transform);
        if (firstPositional(c)) |child| try paint3DTree(arena, child, fb, new_transform, style, lights, camera, off);
        return;
    }
    if (std.mem.eql(u8, c.name, "translate")) {
        const new_transform = applyTranslateArgs(c, transform);
        if (firstPositional(c)) |child| try paint3DTree(arena, child, fb, new_transform, style, lights, camera, off);
        return;
    }
    if (std.mem.eql(u8, c.name, "material")) {
        // `.material(fill:, metalness:, roughness:, emissive:,
        // emissive_intensity:)` becomes the active Style for the
        // inner mesh.
        var new_style = style;
        for (c.fields) |f| {
            if (std.mem.eql(u8, f.name, "fill")) {
                new_style.fill = f.value;
            } else if (std.mem.eql(u8, f.name, "metalness")) {
                if (numberAsF32(f.value)) |n| new_style.metalness = n;
            } else if (std.mem.eql(u8, f.name, "roughness")) {
                if (numberAsF32(f.value)) |n| new_style.roughness = n;
            } else if (std.mem.eql(u8, f.name, "emissive")) {
                new_style.emissive = f.value;
            } else if (std.mem.eql(u8, f.name, "emissive_intensity")) {
                if (numberAsF32(f.value)) |n| new_style.emissive_intensity = n;
            }
        }
        if (firstPositional(c)) |child| try paint3DTree(arena, child, fb, transform, new_style, lights, camera, off);
        return;
    }
    if (std.mem.eql(u8, c.name, "extrude")) {
        try drawExtrude(arena, c, fb, transform, style, lights, camera, off);
        return;
    }
    // Unknown wrapper / leaf in 3D context — fall through silently
    // for now. A future Plan.md item: distinguish "leaf I don't know
    // how to render as 3D" from "this should be flat 2D below me".
}

fn firstPositional(c: value.Constructed) ?value.Value {
    for (c.fields) |f| if (f.name.len == 0) return f.value;
    return null;
}

/// `rotate(child, x: A, y: B, z: C)` → premultiply rotations onto
/// the current transform. Each axis defaults to 0; angles read as
/// degrees if untyped (cmotion default), radians otherwise.
fn applyRotateArgs(c: value.Constructed, transform: mesh_mod.Mat4) mesh_mod.Mat4 {
    var t = transform;
    for (c.fields) |f| {
        const angle = readAngleRad(f.value) orelse continue;
        if (std.mem.eql(u8, f.name, "x")) {
            t = t.mul(mesh_mod.Mat4.rotationX(angle));
        } else if (std.mem.eql(u8, f.name, "y")) {
            t = t.mul(mesh_mod.Mat4.rotationY(angle));
        } else if (std.mem.eql(u8, f.name, "z")) {
            t = t.mul(mesh_mod.Mat4.rotationZ(angle));
        }
    }
    return t;
}

/// `scale(child, factor)` or `scale(child, x: a, y: b, z: c)`.
/// Single positional after the child is uniform scale; named axes
/// scale per-axis. Missing axes default to 1.
fn applyScaleArgs(c: value.Constructed, transform: mesh_mod.Mat4) mesh_mod.Mat4 {
    var sx: f32 = 1;
    var sy: f32 = 1;
    var sz: f32 = 1;
    var positional_idx: usize = 0;
    for (c.fields) |f| {
        if (f.name.len == 0) {
            positional_idx += 1;
            if (positional_idx == 1) continue; // first positional = the child
            if (numberAsF32(f.value)) |n| {
                sx = n;
                sy = n;
                sz = n;
            }
        } else if (numberAsF32(f.value)) |n| {
            if (std.mem.eql(u8, f.name, "x")) sx = n;
            if (std.mem.eql(u8, f.name, "y")) sy = n;
            if (std.mem.eql(u8, f.name, "z")) sz = n;
        }
    }
    return transform.mul(mesh_mod.Mat4.scaling(sx, sy, sz));
}

fn applyTranslateArgs(c: value.Constructed, transform: mesh_mod.Mat4) mesh_mod.Mat4 {
    var tx: f32 = 0;
    var ty: f32 = 0;
    var tz: f32 = 0;
    for (c.fields) |f| {
        if (numberAsF32(f.value)) |n| {
            if (std.mem.eql(u8, f.name, "x")) tx = n;
            if (std.mem.eql(u8, f.name, "y")) ty = n;
            if (std.mem.eql(u8, f.name, "z")) tz = n;
        }
    }
    return transform.mul(mesh_mod.Mat4.translation(tx, ty, tz));
}

fn readAngleRad(v: value.Value) ?f32 {
    if (v != .number) return null;
    const n = v.number;
    const val: f32 = @floatCast(n.value);
    // Default unit interpretation: deg if untagged or .deg, rad otherwise.
    const unit = n.unit orelse return val * std.math.pi / 180.0;
    return switch (unit) {
        .deg => val * std.math.pi / 180.0,
        .rad => val,
        else => val * std.math.pi / 180.0,
    };
}

fn numberAsF32(v: value.Value) ?f32 {
    if (v != .number) return null;
    return @floatCast(v.number.value);
}

/// Build a mesh from `extrude(<leaf>, depth: N)` and rasterise it
/// with the accumulated transform / style / lights.
fn drawExtrude(
    arena: std.mem.Allocator,
    extrude: value.Constructed,
    fb: *render3d.Framebuffer,
    transform: mesh_mod.Mat4,
    style: Style,
    lights: []const render3d.Light,
    camera: render3d.Camera,
    off: Offset,
) !void {
    var leaf: ?value.Value = null;
    var depth: f32 = 80;
    var bevel: ?f32 = null;
    var bevel_segments: u32 = 4; // matches Three.js ExtrudeGeometry default
    for (extrude.fields) |f| {
        if (f.name.len == 0) {
            if (leaf == null) leaf = f.value;
        } else if (std.mem.eql(u8, f.name, "depth")) {
            if (numberAsF32(f.value)) |d| depth = d;
        } else if (std.mem.eql(u8, f.name, "bevel")) {
            if (numberAsF32(f.value)) |b| bevel = b;
        } else if (std.mem.eql(u8, f.name, "bevel_segments")) {
            if (numberAsF32(f.value)) |s| bevel_segments = @intFromFloat(@max(1.0, s));
        }
    }
    const inner = leaf orelse return;
    // Default bevel: 10 % of depth (matching Three.js's
    // ScenePreview `bevelSize: 0.04` on `depth: 0.4`), with a
    // 1.5 px minimum so thin extrusions still have a visible
    // bevel. Users override via `extrude(..., bevel: <px>)`.
    const eff_bevel: f32 = bevel orelse @max(depth * 0.10, 1.5);
    const m = (try meshFromShape(arena, inner, depth, eff_bevel, bevel_segments)) orelse return;

    // Centre the mesh on its own bounding-box centre, then apply the
    // user transform, then apply the canvas-centre offset. This way
    // the un-transformed glyph sits at the canvas centre and the
    // user's `.rotate`/`.scale`/`translate` move it from there.
    const centred = centreMesh(arena, m) catch return;

    // Outer 2D `translate(...)` and the canvas centring are folded
    // into one additional translation on the world transform. `off`
    // is in screen pixels; the 3D pipeline's world space is also in
    // pixels (we extruded glyphs at pixel-scale heights), so this is
    // a direct mapping.
    const world_offset = mesh_mod.Mat4.translation(@floatCast(off.x), @floatCast(off.y), 0);
    const final_transform = world_offset.mul(transform);

    const material: render3d.Material = .{
        .albedo = if (style.fill) |fv| valueToRgba(fv) else .{ 220, 220, 220, 255 },
        .metalness = style.metalness orelse 0.0,
        .roughness = style.roughness orelse 1.0,
        .emissive = if (style.emissive) |ev| valueToRgba(ev) else .{ 0, 0, 0, 255 },
        .emissive_intensity = style.emissive_intensity orelse 1.0,
    };

    // 2× supersampling smooths the rasteriser's hard silhouette
    // edges at the cost of 4× the per-fragment work. For a 320×180
    // canvas that's well under a second total; if perf becomes a
    // need we can drop to 1× via a render flag.
    // Supersampling cost is 4× the rasteriser; the visual win
    // diminishes as the native canvas resolution grows. Adaptive:
    // SS=2 below ~1080p (small canvases gain a lot from the box
    // filter softening hard silhouette edges), SS=1 at 1080p+
    // (the rasteriser already produces edges below the perceptible
    // threshold at typical viewing distances). Saves 4× at 4K /
    // 8K renders for ~zero visible loss.
    const pixels: usize = @as(usize, fb.width) * fb.height;
    const supersample_factor: u32 = if (pixels < 2_073_600) 2 else 1; // 1920×1080 = 2.07M
    try render3d.drawMeshSupersampled(
        arena,
        fb,
        centred,
        final_transform,
        camera,
        material,
        lights,
        supersample_factor,
    );
}

/// Compute the mesh's bounding-box centre and subtract it from every
/// vertex, returning a centred copy. The original isn't mutated.
fn centreMesh(arena: std.mem.Allocator, m: mesh_mod.Mesh) !mesh_mod.Mesh {
    if (m.positions.len == 0) return m;
    var min_x: f32 = m.positions[0].x;
    var max_x: f32 = min_x;
    var min_y: f32 = m.positions[0].y;
    var max_y: f32 = min_y;
    var min_z: f32 = m.positions[0].z;
    var max_z: f32 = min_z;
    for (m.positions[1..]) |p| {
        min_x = @min(min_x, p.x);
        max_x = @max(max_x, p.x);
        min_y = @min(min_y, p.y);
        max_y = @max(max_y, p.y);
        min_z = @min(min_z, p.z);
        max_z = @max(max_z, p.z);
    }
    const cx = (min_x + max_x) * 0.5;
    const cy = (min_y + max_y) * 0.5;
    const cz = (min_z + max_z) * 0.5;

    const new_positions = try arena.alloc(mesh_mod.Vec3, m.positions.len);
    for (m.positions, 0..) |p, i| {
        new_positions[i] = .{ .x = p.x - cx, .y = p.y - cy, .z = p.z - cz };
    }
    return .{
        .positions = new_positions,
        .normals = m.normals,
        .indices = m.indices,
    };
}

/// Build a mesh for the leaf shape inside an `extrude(...)`. Today
/// only `text.glyph` is supported; rects / paths land later.
fn meshFromShape(
    arena: std.mem.Allocator,
    leaf: value.Value,
    depth: f32,
    bevel: f32,
    bevel_segments: u32,
) !?mesh_mod.Mesh {
    if (leaf != .constructed) return null;
    const c = leaf.constructed;
    if (std.mem.eql(u8, c.name, "text.glyph")) {
        var text_raw: []const u8 = "";
        var size_px: f32 = 96;
        var curve_segments: u32 = 32;
        for (c.fields) |f| {
            if (f.name.len == 0 and f.value == .string) {
                text_raw = f.value.string;
            } else if (std.mem.eql(u8, f.name, "size")) {
                if (numberAsF32(f.value)) |s| size_px = s;
            } else if (std.mem.eql(u8, f.name, "curve_segments")) {
                if (numberAsF32(f.value)) |s| curve_segments = @intFromFloat(@max(2.0, s));
            }
        }
        const text = stripQuotes(text_raw);
        if (text.len == 0) return null;
        return try mesh_mod.extrudeText(arena, text, size_px, depth, bevel, bevel_segments, curve_segments);
    }
    return null;
}

/// Walk the `lights: [...]` array, parsing each entry into a render3d.Light.
/// Recognises `ambient(intensity)` (positional or named) and
/// `directional(from: vec3(x, y, z), intensity: N)`. Anything else is
/// silently dropped (no lights at all if the array is empty).
/// Parse `camera(fov:, distance:, near:, far:)` into a `render3d.Camera`.
/// Missing fields keep the engine default. Recognises angle units
/// (deg / rad) on `fov:` so `camera(fov: 28deg)` works as expected.
/// Unknown / non-camera input returns the default camera.
fn parseCamera(camera_v: ?value.Value) render3d.Camera {
    var cam = render3d.Camera{};
    const v = camera_v orelse return cam;
    if (v != .constructed) return cam;
    const c = v.constructed;
    if (!std.mem.eql(u8, c.name, "camera")) return cam;
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "fov")) {
            if (readAngleRad(f.value)) |rad| cam.fov_rad = rad;
        } else if (std.mem.eql(u8, f.name, "distance")) {
            if (numberAsF32(f.value)) |d| cam.distance = d;
        } else if (std.mem.eql(u8, f.name, "near")) {
            if (numberAsF32(f.value)) |n| cam.near = n;
        } else if (std.mem.eql(u8, f.name, "far")) {
            if (numberAsF32(f.value)) |fa| cam.far = fa;
        }
    }
    return cam;
}

fn parseLights(arena: std.mem.Allocator, lights_v: ?value.Value) ![]const render3d.Light {
    if (lights_v == null) return &.{};
    if (lights_v.? != .array) return &.{};
    const arr = lights_v.?.array;

    var out = try std.array_list.Managed(render3d.Light).initCapacity(arena, arr.elems.len);
    for (arr.elems) |elem| {
        if (elem != .constructed) continue;
        const lc = elem.constructed;
        if (std.mem.eql(u8, lc.name, "ambient")) {
            const intensity = readIntensityArg(lc) orelse 0.3;
            try out.append(.{ .ambient = .{ .intensity = intensity, .color = readLightColor(lc) } });
        } else if (std.mem.eql(u8, lc.name, "directional")) {
            var direction: mesh_mod.Vec3 = .{ .x = 0, .y = 0, .z = -1 };
            var intensity: f32 = 1.0;
            for (lc.fields) |f| {
                if (std.mem.eql(u8, f.name, "from")) {
                    if (readVec3(f.value)) |v| direction = v.scale(-1).normalise(); // point toward origin
                } else if (std.mem.eql(u8, f.name, "intensity")) {
                    if (numberAsF32(f.value)) |n| intensity = n;
                }
            }
            try out.append(.{ .directional = .{ .direction = direction, .intensity = intensity, .color = readLightColor(lc) } });
        } else if (std.mem.eql(u8, lc.name, "spotlight") or std.mem.eql(u8, lc.name, "point")) {
            var position: mesh_mod.Vec3 = .{ .x = 0, .y = 0, .z = 0 };
            var intensity: f32 = 1.0;
            var range: f32 = 600;
            for (lc.fields) |f| {
                if (std.mem.eql(u8, f.name, "at") or std.mem.eql(u8, f.name, "position")) {
                    if (readVec3(f.value)) |v| position = v;
                } else if (std.mem.eql(u8, f.name, "intensity")) {
                    if (numberAsF32(f.value)) |n| intensity = n;
                } else if (std.mem.eql(u8, f.name, "range")) {
                    if (numberAsF32(f.value)) |n| range = n;
                }
            }
            try out.append(.{ .point = .{ .position = position, .intensity = intensity, .range = range, .color = readLightColor(lc) } });
        }
    }
    return try out.toOwnedSlice();
}

/// Read an optional `color:`/`tint:` on a light into an sRGB triple
/// (white when absent). Animated colours arrive here already sampled
/// to a concrete value at `t`, so a wave/animate on the hue just works.
fn readLightColor(c: value.Constructed) [3]u8 {
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "color") or std.mem.eql(u8, f.name, "tint")) {
            const rgba = valueToRgba(f.value);
            return .{ rgba[0], rgba[1], rgba[2] };
        }
    }
    return .{ 255, 255, 255 };
}

fn readIntensityArg(c: value.Constructed) ?f32 {
    // Accept both positional (`ambient(0.35)`) and named (`ambient(intensity: 0.35)`).
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "intensity") or f.name.len == 0) {
            if (numberAsF32(f.value)) |n| return n;
        }
    }
    return null;
}

fn readVec3(v: value.Value) ?mesh_mod.Vec3 {
    if (v != .constructed) return null;
    const c = v.constructed;
    if (!std.mem.eql(u8, c.name, "vec3")) return null;
    var x: f32 = 0;
    var y: f32 = 0;
    var z: f32 = 0;
    var pos: usize = 0;
    for (c.fields) |f| {
        const n = numberAsF32(f.value) orelse continue;
        if (std.mem.eql(u8, f.name, "x")) {
            x = n;
        } else if (std.mem.eql(u8, f.name, "y")) {
            y = n;
        } else if (std.mem.eql(u8, f.name, "z")) {
            z = n;
        } else if (f.name.len == 0) {
            if (pos == 0) x = n else if (pos == 1) y = n else if (pos == 2) z = n;
            pos += 1;
        }
    }
    return .{ .x = x, .y = y, .z = z };
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
        .oklab => |v| oklabComponentsToRgba(v.l.*, v.a.*, v.b.*),
        .srgb => |v| srgbComponentsToRgba(v.r.*, v.g.*, v.b.*),
    };
}

/// Direct oklab triple — same matrices as oklch, but the a/b
/// components are passed straight through (no polar conversion).
fn oklabComponentsToRgba(l: value.Value, a: value.Value, b: value.Value) [4]u8 {
    if (l != .number or a != .number or b != .number) return .{ 255, 0, 255, 255 };
    return oklabToRgba(l.number.value, a.number.value, b.number.value);
}

/// `srgb(r, g, b)` — components are read in the 0..1 range (the cmotion
/// convention; matches CSS `color(srgb r g b)`). Out-of-range values
/// clamp through the encoder. A 0..255 byte triple `srgb(255, 0, 0)`
/// also lands as red because 255 clamps to 1.0 after the implicit
/// max-1 ceiling — fine for a v0, refine when the typechecker can
/// distinguish the two unit conventions.
fn srgbComponentsToRgba(r: value.Value, g: value.Value, b: value.Value) [4]u8 {
    if (r != .number or g != .number or b != .number) return .{ 255, 0, 255, 255 };
    return .{
        srgbChannelToByte(r.number.value),
        srgbChannelToByte(g.number.value),
        srgbChannelToByte(b.number.value),
        255,
    };
}

fn srgbChannelToByte(x: f64) u8 {
    const clamped = std.math.clamp(x, 0.0, 1.0);
    return @intFromFloat(@round(clamped * 255.0));
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

/// Write the framebuffer as a PNG. RGBA8, no interlacing, per-row Up
/// PNG filter (row 0 falls back to None), wrapped in a single zlib
/// stream that uses real deflate (fixed Huffman + naive LZ77) instead
/// of the v0 stored-only path. On the 320×180 taste sample this drops
/// the file from ~230 KB to a few KB — small enough to commit golden
/// fixtures and to ship over a phone connection.
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

    // §11.2.4 IDAT — build the filtered byte stream, deflate-encode
    // it as a single zlib stream, drop the result in one chunk.
    const filtered = try filterFramebuffer(arena, fb);
    var idat = std.Io.Writer.Allocating.init(arena);
    defer idat.deinit();
    try deflateZlib(arena, filtered, &idat.writer);
    try writePngChunk(writer, "IDAT", idat.written());

    // §11.2.5 IEND.
    try writePngChunk(writer, "IEND", &.{});
}

/// Apply PNG filter type 2 (Up) to every row past the first; the
/// first row has no row above so it falls back to type 0 (None).
/// PNG filters work per-byte: filtered[i] = raw[i] - raw_above[i],
/// taken modulo 256 (the wrap is what makes the inverse trivial on
/// the decode side).
///
/// Up is near-optimal for our renderer's output, which is dominated
/// by vertically-uniform regions (flat backgrounds, axis-aligned
/// rectangles, the bitmap glyph's horizontal strokes). Adaptive
/// filter selection would help on more textured content; punt until
/// the renderer produces some.
fn filterFramebuffer(arena: std.mem.Allocator, fb: Framebuffer) ![]u8 {
    const row_bytes: usize = @as(usize, fb.width) * 4;
    const out = try arena.alloc(u8, @as(usize, fb.height) * (1 + row_bytes));
    var o: usize = 0;
    var y: u32 = 0;
    while (y < fb.height) : (y += 1) {
        const src = @as(usize, y) * row_bytes;
        if (y == 0) {
            out[o] = 0; // filter type: None
            o += 1;
            @memcpy(out[o .. o + row_bytes], fb.pixels[src .. src + row_bytes]);
            o += row_bytes;
        } else {
            out[o] = 2; // filter type: Up
            o += 1;
            const above = src - row_bytes;
            for (0..row_bytes) |i| {
                out[o + i] = fb.pixels[src + i] -% fb.pixels[above + i];
            }
            o += row_bytes;
        }
    }
    return out;
}

// -------- deflate encoder (RFC 1951) --------
//
// Single fixed-Huffman block (BTYPE=01) with a small-window LZ77
// match finder. The point is just to get past stored deflate without
// dragging in a third-party dep — Zig 0.15.1's std.compress.flate
// has a half-deleted Compress path (no `bit_writer`, no
// `writeFooter`), so we drop down to the codes ourselves and reuse
// the stdlib's `HuffmanEncoder.fixedLiteralEncoder` (it returns the
// codes pre-bit-reversed for LSB-first emission, which is the
// part that's actually fiddly to get right).
//
// Quality: a single-entry hash chain finds the most-recent match for
// each 3-byte prefix. For flat-color PNG output post-Up-filter that
// degenerates into run-length encoding — exactly what we want, and
// the source of the ~50× size reduction vs stored deflate. More
// textured content would benefit from a chained matcher; we'll
// upgrade the encoder when the renderer produces output that needs
// it.

const flate_encoder = std.compress.flate.HuffmanEncoder;

/// RFC 1951 §3.2.5 length codes 257..285 → length base + extra bits.
const length_base = [_]u16{ 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258 };
const length_extra = [_]u4{ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0 };

/// RFC 1951 §3.2.5 distance codes 0..29 → distance base + extra bits.
const distance_base = [_]u16{ 1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577 };
const distance_extra = [_]u4{ 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13 };

fn lengthCodeIndex(L: u16) usize {
    var i: usize = length_base.len - 1;
    while (i > 0 and length_base[i] > L) : (i -= 1) {}
    return i;
}

fn distanceCodeIndex(d: u16) usize {
    var i: usize = distance_base.len - 1;
    while (i > 0 and distance_base[i] > d) : (i -= 1) {}
    return i;
}

const BitWriter = struct {
    out: *std.Io.Writer,
    bits: u32 = 0,
    nbits: u6 = 0,

    fn write(self: *BitWriter, val: u32, n: u6) !void {
        self.bits |= val << @intCast(self.nbits);
        self.nbits += n;
        while (self.nbits >= 8) {
            try self.out.writeByte(@truncate(self.bits));
            self.bits >>= 8;
            self.nbits -= 8;
        }
    }

    fn flushPartial(self: *BitWriter) !void {
        if (self.nbits > 0) {
            try self.out.writeByte(@truncate(self.bits));
            self.bits = 0;
            self.nbits = 0;
        }
    }
};

/// Encode `input` as a zlib stream (RFC 1950 wrapper around a single
/// RFC 1951 fixed-Huffman deflate block) and write it to `writer`.
fn deflateZlib(arena: std.mem.Allocator, input: []const u8, writer: *std.Io.Writer) !void {
    // Zlib header: CMF (deflate, 32K window) + FLG (default level, no preset dict).
    try writer.writeAll(&[_]u8{ 0x78, 0x01 });

    var lit_codes: [flate_encoder.max_num_frequencies]flate_encoder.Code = undefined;
    var dist_codes: [flate_encoder.distance_code_count]flate_encoder.Code = undefined;
    const lit_enc = flate_encoder.fixedLiteralEncoder(&lit_codes);
    const dist_enc = flate_encoder.fixedDistanceEncoder(&dist_codes);

    var bw: BitWriter = .{ .out = writer };

    // BFINAL=1, BTYPE=01 (fixed Huffman). Emitted LSB-first: bit 0 is
    // BFINAL, bits 1..2 are BTYPE → 0b011.
    try bw.write(0b011, 3);

    // Hash3 → most recent position. A 4K-entry table is enough for
    // our flat-color workload (longer chains would help on textured
    // input — but the renderer doesn't produce any yet).
    const hash_bits = 12;
    const hash_size: usize = 1 << hash_bits;
    const hash_mask: u32 = @intCast(hash_size - 1);
    const table = try arena.alloc(i32, hash_size);
    @memset(table, -1);

    var pos: usize = 0;
    while (pos < input.len) {
        var best_len: usize = 0;
        var best_dist: usize = 0;
        if (pos + 2 < input.len) {
            const h: u32 = (@as(u32, input[pos]) << 8) ^ (@as(u32, input[pos + 1]) << 4) ^ input[pos + 2];
            const idx = h & hash_mask;
            const prev_pos = table[idx];
            table[idx] = @intCast(pos);
            if (prev_pos >= 0) {
                const prev: usize = @intCast(prev_pos);
                const dist = pos - prev;
                if (dist >= 1 and dist <= 32768) {
                    var len: usize = 0;
                    const max_len = @min(@as(usize, 258), input.len - pos);
                    while (len < max_len and input[prev + len] == input[pos + len]) : (len += 1) {}
                    if (len >= 3) {
                        best_len = len;
                        best_dist = dist;
                    }
                }
            }
        }

        if (best_len >= 3) {
            const li = lengthCodeIndex(@intCast(best_len));
            const lc = lit_enc.codes[257 + li];
            try bw.write(lc.code, @intCast(lc.len));
            if (length_extra[li] > 0) {
                try bw.write(@intCast(best_len - length_base[li]), @intCast(length_extra[li]));
            }
            const di = distanceCodeIndex(@intCast(best_dist));
            const dc = dist_enc.codes[di];
            try bw.write(dc.code, @intCast(dc.len));
            if (distance_extra[di] > 0) {
                try bw.write(@intCast(best_dist - distance_base[di]), @intCast(distance_extra[di]));
            }
            pos += best_len;
        } else {
            const c = lit_enc.codes[input[pos]];
            try bw.write(c.code, @intCast(c.len));
            pos += 1;
        }
    }

    // End-of-block marker.
    const eob = lit_enc.codes[256];
    try bw.write(eob.code, @intCast(eob.len));
    try bw.flushPartial();

    // Adler32 footer over the *uncompressed* input, big-endian.
    var adler_bytes: [4]u8 = undefined;
    std.mem.writeInt(u32, &adler_bytes, std.hash.Adler32.hash(input), .big);
    try writer.writeAll(&adler_bytes);
}

/// Streaming APNG writer. Builds an animated PNG (RFC unofficial,
/// W3C "PNG Working Group" extension — supported by every modern
/// browser and image viewer) by interleaving frame-control chunks
/// (`fcTL`) with image data chunks (`IDAT` for frame 0, `fdAT`
/// for subsequent frames). The base PNG is the first frame, so
/// any non-APNG viewer falls back to a still image cleanly.
///
/// Usage:
///   var aw = try ApngWriter.init(arena, writer, w, h, fps_num, fps_den, total_frames);
///   for each frame: try aw.writeFrame(framebuffer);
///   try aw.finish();
///
/// Each `writeFrame` filter + deflate-compresses the framebuffer
/// independently — there's no inter-frame delta encoding (the
/// PNG/APNG format doesn't support it). For static-background
/// scenes the per-frame compression still benefits from Up-filter
/// + LZ77 on the within-frame regularities, so file sizes stay
/// reasonable (~1/10 the size of the raw RGBA payload).
pub const ApngWriter = struct {
    arena: std.mem.Allocator,
    output: *std.Io.Writer,
    width: u32,
    height: u32,
    fps_num: u16,
    fps_den: u16,
    seq: u32 = 0,
    frame_idx: u32 = 0,

    pub fn init(
        arena: std.mem.Allocator,
        output: *std.Io.Writer,
        width: u32,
        height: u32,
        fps_num: u16,
        fps_den: u16,
        total_frames: u32,
    ) !ApngWriter {
        // PNG file signature.
        try output.writeAll(&[_]u8{ 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A });

        // IHDR — same shape as a static PNG (RGBA8, no interlace).
        var ihdr: [13]u8 = undefined;
        std.mem.writeInt(u32, ihdr[0..4], width, .big);
        std.mem.writeInt(u32, ihdr[4..8], height, .big);
        ihdr[8] = 8; // bit depth
        ihdr[9] = 6; // RGBA
        ihdr[10] = 0;
        ihdr[11] = 0;
        ihdr[12] = 0;
        try writePngChunk(output, "IHDR", &ihdr);

        // acTL — animation control. `num_plays = 0` is "loop forever".
        var actl: [8]u8 = undefined;
        std.mem.writeInt(u32, actl[0..4], total_frames, .big);
        std.mem.writeInt(u32, actl[4..8], 0, .big);
        try writePngChunk(output, "acTL", &actl);

        return .{
            .arena = arena,
            .output = output,
            .width = width,
            .height = height,
            .fps_num = fps_num,
            .fps_den = fps_den,
        };
    }

    pub fn writeFrame(self: *ApngWriter, fb: Framebuffer) !void {
        // fcTL — frame control. Each frame: full-canvas, dispose
        // NONE + blend SOURCE (frames are fully opaque replacements).
        var fctl: [26]u8 = undefined;
        std.mem.writeInt(u32, fctl[0..4], self.seq, .big);
        std.mem.writeInt(u32, fctl[4..8], fb.width, .big);
        std.mem.writeInt(u32, fctl[8..12], fb.height, .big);
        std.mem.writeInt(u32, fctl[12..16], 0, .big); // x_offset
        std.mem.writeInt(u32, fctl[16..20], 0, .big); // y_offset
        std.mem.writeInt(u16, fctl[20..22], self.fps_num, .big);
        std.mem.writeInt(u16, fctl[22..24], self.fps_den, .big);
        fctl[24] = 0; // dispose_op: NONE
        fctl[25] = 0; // blend_op: SOURCE
        try writePngChunk(self.output, "fcTL", &fctl);
        self.seq += 1;

        // Filter + deflate-compress the frame.
        const filtered = try filterFramebuffer(self.arena, fb);
        var idat_buf = std.Io.Writer.Allocating.init(self.arena);
        defer idat_buf.deinit();
        try deflateZlib(self.arena, filtered, &idat_buf.writer);
        const compressed = idat_buf.written();

        if (self.frame_idx == 0) {
            // First frame goes in IDAT (no sequence prefix). This
            // makes the APNG fall back to a static PNG when viewed
            // in a non-APNG viewer.
            try writePngChunk(self.output, "IDAT", compressed);
        } else {
            // Subsequent frames go in fdAT with a sequence prefix.
            const fdat = try self.arena.alloc(u8, 4 + compressed.len);
            std.mem.writeInt(u32, fdat[0..4], self.seq, .big);
            @memcpy(fdat[4..], compressed);
            try writePngChunk(self.output, "fdAT", fdat);
            self.seq += 1;
        }
        self.frame_idx += 1;
    }

    pub fn finish(self: *ApngWriter) !void {
        try writePngChunk(self.output, "IEND", &.{});
    }
};

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

test "renderTree: 3D wrappers without `render3d` still flat-fallback to the inner shape" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // Without an enclosing `render3d`, extrude/material/rotate/scale
    // continue to flat-unwrap to their first positional child (the
    // pre-3D-rasteriser behaviour). With a `render3d` on top, control
    // flow shifts into the actual 3D pipeline — that's tested via the
    // end-to-end taste-sample render, not here.
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
    inline for (.{ "extrude", "material", "rotate", "scale" }) |name| {
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
    // The TTF path produces anti-aliased coverage — edge pixels are
    // partially covered, so the green channel ranges 1..255 across
    // the glyph. Find a *core* pixel (>90% covered) and assert it's
    // green-on-black, not white, magenta, or some other fallback.
    var i: usize = 3;
    var found = false;
    while (i < fb.pixels.len) : (i += 4) {
        if (fb.pixels[i - 2] > 230) {
            try std.testing.expectEqual(@as(u8, 0), fb.pixels[i - 3]);
            try std.testing.expect(fb.pixels[i - 2] > 230); // mostly green
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

test "oklab: zero chroma matches oklch with zero chroma" {
    const num = struct {
        fn n(x: f64) value.Value {
            return .{ .number = .{ .value = x, .unit = null } };
        }
    };
    const lab = oklabComponentsToRgba(num.n(0.5), num.n(0), num.n(0));
    const lch = oklchToRgba(num.n(0.5), num.n(0), num.n(0));
    try std.testing.expectEqualSlices(u8, &lch, &lab);
}

test "srgb: pure red maps to (255, 0, 0)" {
    const num = struct {
        fn n(x: f64) value.Value {
            return .{ .number = .{ .value = x, .unit = null } };
        }
    };
    const red = srgbComponentsToRgba(num.n(1), num.n(0), num.n(0));
    try std.testing.expectEqual(@as(u8, 255), red[0]);
    try std.testing.expectEqual(@as(u8, 0), red[1]);
    try std.testing.expectEqual(@as(u8, 0), red[2]);
    try std.testing.expectEqual(@as(u8, 255), red[3]);
}

test "deflateZlib: round-trips through stdlib Decompress" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // A run-heavy payload: the LZ77 matcher should compress it well,
    // and decode must reproduce it exactly.
    const input = try a.alloc(u8, 4096);
    @memset(input, 0);
    // Salt a few non-zero bytes so the encoder also exercises literals.
    input[0] = 0xAA;
    input[100] = 0x55;
    input[input.len - 1] = 0xFF;

    var aw = std.Io.Writer.Allocating.init(a);
    defer aw.deinit();
    try deflateZlib(a, input, &aw.writer);
    const compressed = aw.written();
    // Sanity: it actually compressed.
    try std.testing.expect(compressed.len < input.len / 4);

    var reader = std.Io.Reader.fixed(compressed);
    var window: [std.compress.flate.max_window_len]u8 = undefined;
    var dec = std.compress.flate.Decompress.init(&reader, .zlib, &window);
    const round = try a.alloc(u8, input.len);
    const n = try dec.reader.readSliceShort(round);
    try std.testing.expectEqual(input.len, n);
    try std.testing.expectEqualSlices(u8, input, round[0..n]);
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
