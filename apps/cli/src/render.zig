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
//!   - `rect(width, height, fill)` — fills an axis-aligned rectangle
//!     anchored at the canvas's top-left. Named args only; positional
//!     are ignored. Lengths are taken in pixel units (a `1920px` rect
//!     fills a 1920×1080 canvas exactly).
//!   - Color: `#rrggbb` hex (with or without alpha), and `oklch(l, c, h)`
//!     — converted to sRGB through standard oklab → linear-sRGB →
//!     gamma matrices. Animated channels are expected to already be
//!     resolved by the sampler before they reach the renderer.
//!
//! Ignored:
//!   - 3D content (`extrude`, `render3d`, lights, materials, ...). The
//!     glyph in cmotion.org's taste sample renders as nothing — only
//!     the background rect is visible.
//!   - `rect` positioning (no `at:` / `translate(...)` yet). Every rect
//!     paints from the top-left.
//!   - srgb()/oklab() color literals — not yet wired through.
//!   - Stroke, gradients, blur, filters. Future renderer slices.
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
    paintValue(tree, &fb);
    return fb;
}

/// Dispatch over the value tree. Compose and individual shape
/// constructors paint; everything else (numbers, strings, lambdas, ...
/// at the root or nested) is silently ignored.
fn paintValue(v: value.Value, fb: *Framebuffer) void {
    switch (v) {
        .constructed => |c| {
            if (std.mem.eql(u8, c.name, "compose")) {
                paintCompose(c, fb);
            } else if (std.mem.eql(u8, c.name, "rect")) {
                paintRect(c, fb);
            }
            // Anything else (render3d, extrude, vec3, ...) is a no-op
            // in v0. Stage 6/7 will pick these up.
        },
        // Arrays/records/colors/etc. at the root aren't paintable shapes
        // today; they could be addressed by a later "paint anything that
        // contains paintable children" pass, but v0 keeps the rules
        // explicit.
        else => {},
    }
}

fn paintCompose(c: value.Constructed, fb: *Framebuffer) void {
    for (c.fields) |f| {
        if (!std.mem.eql(u8, f.name, "layers")) continue;
        switch (f.value) {
            .array => |arr| for (arr.elems) |elem| paintValue(elem, fb),
            else => {},
        }
    }
}

fn paintRect(c: value.Constructed, fb: *Framebuffer) void {
    var w: u32 = fb.width;
    var h: u32 = fb.height;
    var fill: ?value.Value = null;
    for (c.fields) |f| {
        if (std.mem.eql(u8, f.name, "width")) {
            if (numberAsPixels(f.value)) |px| w = px;
        } else if (std.mem.eql(u8, f.name, "height")) {
            if (numberAsPixels(f.value)) |px| h = px;
        } else if (std.mem.eql(u8, f.name, "fill")) {
            fill = f.value;
        }
    }
    const rgba: [4]u8 = if (fill) |fv| valueToRgba(fv) else .{ 255, 255, 255, 255 };
    fillRect(fb, 0, 0, w, h, rgba);
}

fn numberAsPixels(v: value.Value) ?u32 {
    if (v != .number) return null;
    const n = v.number.value;
    if (n < 0) return null;
    if (n > @as(f64, @floatFromInt(std.math.maxInt(u32)))) return null;
    return @intFromFloat(n);
}

fn fillRect(fb: *Framebuffer, x: u32, y: u32, w: u32, h: u32, rgba: [4]u8) void {
    const x_end = @min(x + w, fb.width);
    const y_end = @min(y + h, fb.height);
    if (x >= fb.width or y >= fb.height) return;
    var row = y;
    while (row < y_end) : (row += 1) {
        var col = x;
        while (col < x_end) : (col += 1) {
            const i = (@as(usize, row) * fb.width + col) * 4;
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

test "renderTree: a single rect with hex fill produces the right pixels" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    const rect_fields = try a.alloc(value.Field, 3);
    rect_fields[0] = .{ .name = "width", .value = .{ .number = .{ .value = 8, .unit = .px } } };
    rect_fields[1] = .{ .name = "height", .value = .{ .number = .{ .value = 8, .unit = .px } } };
    rect_fields[2] = .{ .name = "fill", .value = .{ .color = .{ .hex = .{ .digits = "ff0000" } } } };
    const tree: value.Value = .{ .constructed = .{ .name = "rect", .fields = rect_fields } };

    const fb = try renderTree(a, tree, 16, 16);
    try std.testing.expectEqual(@as(u8, 255), fb.pixels[0]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[1]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[2]);
    try std.testing.expectEqual(@as(u8, 255), fb.pixels[3]);
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
    // Top-left: green (fg on top)
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[0]);
    try std.testing.expectEqual(@as(u8, 255), fb.pixels[1]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[2]);
    // Bottom-right (outside fg, inside bg): red
    const i = (7 * 8 + 7) * 4;
    try std.testing.expectEqual(@as(u8, 255), fb.pixels[i + 0]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[i + 1]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[i + 2]);
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
