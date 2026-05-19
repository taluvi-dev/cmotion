//! WASM entry point — the renderer-as-callable-function shape used by
//! the browser editor, the Cloudflare container, and anything else
//! that can't link `render.zig` natively.
//!
//! The ABI is the v0 contract Plan.md priority (3) sketched: host
//! pre-allocates the output framebuffer via `alloc()`, then calls
//! `render_cm()` with the .cm source bytes, time in ns, dimensions,
//! and the output pointer. The renderer writes into the buffer in
//! place. No pointer round-trip, no JSON across the boundary for
//! the framebuffer itself.
//!
//! This file is wasm32-only — referenced exclusively from the WASM
//! build step in `build.zig`. The native CLI doesn't go through it.

const std = @import("std");
const value = @import("value.zig");
const render = @import("render.zig");

/// Heap allocator backed by Zig's stdlib `wasm_allocator`. Linear
/// memory grows on demand. Every allocation the host requests goes
/// through here; every allocation the renderer makes during a frame
/// is an arena rooted at this allocator.
const gpa = std.heap.wasm_allocator;

/// Host-allocated framebuffer slot. The host calls `alloc(size)` to
/// reserve memory in our linear address space and gets a pointer
/// back; the renderer writes RGBA8 into that buffer; the host reads
/// it out by indexing into the WASM module's linear memory.
export fn alloc(n: usize) ?[*]u8 {
    const slice = gpa.alloc(u8, n) catch return null;
    return slice.ptr;
}

export fn free(ptr: [*]u8, n: usize) void {
    gpa.free(ptr[0..n]);
}

/// Render the cmotion taste sample's bg + centred-rect substitute
/// into `out_ptr` (RGBA8, w*h*4 bytes). This is the bring-up export
/// — it proves the renderer cross-compiled to WASM produces pixels.
/// The full `render_cm(source, t, w, h, out)` lands once the parse
/// path (which needs tree-sitter in WASM) is wired up.
export fn render_taste(w: u32, h: u32, out_ptr: [*]u8) i32 {
    var arena = std.heap.ArenaAllocator.init(gpa);
    defer arena.deinit();
    const a = arena.allocator();

    const tree = buildTasteSample(a) catch return 1;
    const fb = render.renderTree(a, tree, w, h) catch return 2;
    @memcpy(out_ptr[0 .. @as(usize, w) * @as(usize, h) * 4], fb.pixels);
    return 0;
}

/// Hand-built Value tree mirroring the relevant slice of the taste
/// sample: a full-canvas oklch background plus a coloured rect at
/// the canvas centre. Stand-in for the 3D-glyph stack until we have
/// the parser in WASM.
fn buildTasteSample(a: std.mem.Allocator) !value.Value {
    // bg: rect(width: 1920px, height: 1080px, fill: oklch(0.10, 0.04, 280))
    const bg_l = try a.create(value.Value);
    bg_l.* = .{ .number = .{ .value = 0.10, .unit = null } };
    const bg_c = try a.create(value.Value);
    bg_c.* = .{ .number = .{ .value = 0.04, .unit = null } };
    const bg_h = try a.create(value.Value);
    bg_h.* = .{ .number = .{ .value = 280, .unit = null } };

    const bg_fields = try a.alloc(value.Field, 3);
    bg_fields[0] = .{ .name = "width", .value = .{ .number = .{ .value = 1920, .unit = .px } } };
    bg_fields[1] = .{ .name = "height", .value = .{ .number = .{ .value = 1080, .unit = .px } } };
    bg_fields[2] = .{ .name = "fill", .value = .{ .color = .{ .oklch = .{ .l = bg_l, .c = bg_c, .h = bg_h } } } };
    const bg: value.Value = .{ .constructed = .{ .name = "rect", .fields = bg_fields } };

    // fg: rect(width: 96px, height: 96px, fill: #ff3399) — placeholder
    // for the glyph until the parser lands.
    const fg_fields = try a.alloc(value.Field, 3);
    fg_fields[0] = .{ .name = "width", .value = .{ .number = .{ .value = 96, .unit = .px } } };
    fg_fields[1] = .{ .name = "height", .value = .{ .number = .{ .value = 96, .unit = .px } } };
    fg_fields[2] = .{ .name = "fill", .value = .{ .color = .{ .hex = .{ .digits = "ff3399" } } } };
    const fg: value.Value = .{ .constructed = .{ .name = "rect", .fields = fg_fields } };

    const layers = try a.alloc(value.Value, 2);
    layers[0] = bg;
    layers[1] = fg;

    const compose_fields = try a.alloc(value.Field, 1);
    compose_fields[0] = .{ .name = "layers", .value = .{ .array = .{ .elems = layers } } };
    return .{ .constructed = .{ .name = "compose", .fields = compose_fields } };
}
