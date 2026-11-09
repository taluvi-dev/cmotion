//! WASM entry point — exposes the cmotion *interpreter* (parse +
//! lower + eval + sampler) as host-callable functions. The renderer
//! (Three.js, our own `render.zig`, anything else) becomes a
//! swappable consumer of the JSON value-tree this module produces.
//!
//! The canonical flow:
//!   1. host calls `parse_eval(source_ptr, source_len)` — or
//!      `parse_eval_with(…, args_ptr, args_len)` to bind the entry
//!      scene's parameters — → opaque handle (Session*), 0 on failure.
//!   2. host repeatedly calls `sample_at(handle, t_ns, out_ptr,
//!      out_cap)` → number of JSON bytes written into `out_ptr`.
//!   3. host calls `release(handle)` when done.
//!
//! Alongside: `scene_params` lists the entry scene's parameters (the
//! clip's props) without evaluating, and `diagnostics` returns the
//! diagnostic envelope of the last `parse_eval` / `parse_eval_with`,
//! so a host can say *why* a handle is 0. The logic lives in
//! `host.zig`, unit-tested natively; this file is only the ABI.
//!
//! Every function that writes JSON returns the bytes written, or 0 when
//! `out_cap` is too small — the host retries with a bigger buffer.
//!
//! Compiled to `wasm32-wasi` (see `build.zig`'s `addWasmStep`). The
//! wasi target gets us libc shims that tree-sitter's C runtime
//! needs (`fdopen` and friends) for free; freestanding would
//! require hand-rolled stubs.

const std = @import("std");
const value = @import("value.zig");
const render = @import("render.zig");
const diag = @import("diagnostics.zig");
const host = @import("host.zig");
const shape2d = @import("shape2d.zig");
const sampler_mod = @import("sampler.zig");

const gpa = std.heap.wasm_allocator;

/// Pinned semantic version of the cmotion DSL + WASM ABI exposed
/// here. Bundles ship this verbatim so a saved `.cm` + interpreter
/// version produces a reproducible render. Bump on any breaking
/// ABI / language change; additions bump the minor version.
/// 0.3.0: `parse_eval_with` takes `$output` and list / record arguments;
/// `scene_params` describes a list's `item` and a record's `fields`.
const cmotion_version: []const u8 = "0.4.0";

/// Path diagnostics name; a host has no file.
const source_path = "<source>";

// -------- host-allocated buffers --------
//
// Exported under cmotion-namespaced names so we don't collide with
// wasi-libc's own `malloc` / `free` symbols (wasi-libc bundles
// emmalloc, which exports `free(ptr)` — a 1-arg signature that
// differs from ours).

export fn cm_alloc(n: usize) ?[*]u8 {
    const slice = gpa.alloc(u8, n) catch return null;
    return slice.ptr;
}

export fn cm_free(ptr: [*]u8, n: usize) void {
    gpa.free(ptr[0..n]);
}

// wasi-libc's startup pulls in `__main_void` which requires `main`.
// We don't run a wasi command — the host calls our exports directly —
// but the linker still wants the symbol. Stub it out.
export fn main() c_int {
    return 0;
}

// -------- version --------

/// Write the cmotion DSL version string into `out_ptr`. Returns
/// the number of bytes written, 0 if the buffer is too small.
export fn get_version(out_ptr: [*]u8, out_cap: usize) usize {
    return copyOut(cmotion_version, out_ptr, out_cap);
}

fn copyOut(bytes: []const u8, out_ptr: [*]u8, out_cap: usize) usize {
    if (out_cap < bytes.len) return 0;
    @memcpy(out_ptr[0..bytes.len], bytes);
    return bytes.len;
}

// -------- diagnostics of the last evaluation --------

/// The envelope (`{ schemaVersion, ok, diagnostics }`) of the last
/// `parse_eval` / `parse_eval_with`, owned by `gpa`. The host is single-
/// threaded, so one slot is enough.
var last_report: []u8 = &.{};

fn setReport(items: []const diag.Diagnostic) void {
    clearReport();
    var aw = std.Io.Writer.Allocating.init(gpa);
    diag.writeJson(&aw.writer, .{
        .ok = !host.anyError(items),
        .diagnostics = items,
    }) catch {
        aw.deinit();
        return;
    };
    last_report = aw.toOwnedSlice() catch {
        aw.deinit();
        return;
    };
}

fn clearReport() void {
    if (last_report.len != 0) gpa.free(last_report);
    last_report = &.{};
}

/// Write the diagnostic envelope of the last `parse_eval` /
/// `parse_eval_with` into `out_ptr`. Returns bytes written, 0 when the
/// buffer is too small or nothing has been evaluated yet.
export fn diagnostics(out_ptr: [*]u8, out_cap: usize) usize {
    return copyOut(last_report, out_ptr, out_cap);
}

// -------- scene parameters --------

/// List the entry scene's parameters (`host.writeSceneParams`): the
/// diagnostic envelope plus `scene` and `params`. Nothing is evaluated
/// beyond the parameters' defaults. Returns bytes written, 0 when the
/// buffer is too small.
export fn scene_params(src_ptr: [*]const u8, src_len: usize, out_ptr: [*]u8, out_cap: usize) usize {
    var arena = std.heap.ArenaAllocator.init(gpa);
    defer arena.deinit();
    const a = arena.allocator();
    const source = a.dupe(u8, src_ptr[0..src_len]) catch return 0;
    var aw = std.Io.Writer.Allocating.init(a);
    host.writeSceneParams(&aw.writer, a, source, source_path) catch return 0;
    return copyOut(aw.written(), out_ptr, out_cap);
}

// -------- 2D shapes --------

/// Outline rings of a 2D shape for the viewer, from a `shape2d.Spec` as
/// JSON (`{"kind":"star","radius":100,"sides":5,"stroke_width":4,…}`):
/// `{"fill": [[[x, y], …]], "stroke": [...]}`, pixels, y down, centred.
/// The native renderer fills the same rings, so both draw one polygon.
/// Returns bytes written, 0 when the buffer is too small or the spec is
/// not valid.
export fn shape_rings(spec_ptr: [*]const u8, spec_len: usize, out_ptr: [*]u8, out_cap: usize) usize {
    var arena = std.heap.ArenaAllocator.init(gpa);
    defer arena.deinit();
    const a = arena.allocator();
    const spec = std.json.parseFromSliceLeaky(shape2d.Spec, a, spec_ptr[0..spec_len], .{ .ignore_unknown_fields = true }) catch return 0;
    const r = shape2d.rings(a, spec) catch return 0;
    var aw = std.Io.Writer.Allocating.init(a);
    shape2d.writeJson(&aw.writer, r) catch return 0;
    return copyOut(aw.written(), out_ptr, out_cap);
}

// -------- interpreter session --------

/// Owns the lowered AST + evaluated value tree for one `.cm` source.
/// Sampling at a given `t` happens against `scene_value` without
/// re-parsing or re-evaluating.
const Session = struct {
    arena: *std.heap.ArenaAllocator,
    scene_value: value.Value,
};

/// Parse + lower + eval a `.cm` source and sample its first top-level
/// binding. Returns an opaque handle (the pointer-as-integer is the
/// handle from the host's POV) or 0 if anything fails; `diagnostics`
/// then says why.
export fn parse_eval(src_ptr: [*]const u8, src_len: usize) usize {
    return openSession(src_ptr[0..src_len], null);
}

/// Like `parse_eval`, with the entry scene's arguments as a JSON object
/// by parameter name (`{}` for none): times in seconds, angles in
/// degrees, lengths in pixels, colours as `"#rrggbb"`. The source is
/// also checked as `cmo check` does, the entry scene (the first
/// `scene`) is what gets sampled, and a wrong argument fails with an
/// EVL005 diagnostic naming it.
export fn parse_eval_with(
    src_ptr: [*]const u8,
    src_len: usize,
    args_ptr: [*]const u8,
    args_len: usize,
) usize {
    return openSession(src_ptr[0..src_len], args_ptr[0..args_len]);
}

fn openSession(src: []const u8, args: ?[]const u8) usize {
    clearReport();
    const arena_ptr = gpa.create(std.heap.ArenaAllocator) catch return 0;
    arena_ptr.* = std.heap.ArenaAllocator.init(gpa);
    const a = arena_ptr.allocator();

    const scene_value: ?value.Value = blk: {
        // Copy the inputs into the session's arena — the AST keeps
        // zero-copy slices into the source buffer, so it must outlive
        // the lowered program.
        const source = a.dupe(u8, src) catch break :blk null;
        const args_copy: ?[]const u8 = if (args) |x| (a.dupe(u8, x) catch break :blk null) else null;
        const built = host.build(a, source, source_path, args_copy) catch break :blk null;
        setReport(built.diagnostics);
        break :blk built.value;
    };

    const v = scene_value orelse {
        arena_ptr.deinit();
        gpa.destroy(arena_ptr);
        return 0;
    };
    const session = gpa.create(Session) catch {
        arena_ptr.deinit();
        gpa.destroy(arena_ptr);
        return 0;
    };
    session.* = .{ .arena = arena_ptr, .scene_value = v };
    return @intFromPtr(session);
}

/// Sample the session's scene at time `t_ns` (nanoseconds), writing
/// the resulting JSON value-tree into `out_ptr` (up to `out_cap`
/// bytes). Returns bytes written, or 0 on failure.
export fn sample_at(handle: usize, t_ns: u64, out_ptr: [*]u8, out_cap: usize) usize {
    if (handle == 0) return 0;
    const session: *Session = @ptrFromInt(handle);

    const t_seconds = @as(f64, @floatFromInt(t_ns)) / 1_000_000_000.0;

    var sample_arena = std.heap.ArenaAllocator.init(gpa);
    defer sample_arena.deinit();
    const a = sample_arena.allocator();

    const sampled = sampler_mod.sampleAt(a, session.scene_value, t_seconds) catch return 0;

    var stream = std.Io.Writer.fixed(out_ptr[0..out_cap]);
    sampled.writeJson(&stream) catch return 0;
    return stream.buffered().len;
}

/// Release a session's resources. After this the handle is invalid.
export fn release(handle: usize) void {
    if (handle == 0) return;
    const session: *Session = @ptrFromInt(handle);
    session.arena.deinit();
    gpa.destroy(session.arena);
    gpa.destroy(session);
}

// -------- legacy: hardcoded-scene rasteriser path --------
//
// Kept for the WASM↔native parity test (`zig build test-parity`),
// which renders the same fixture both ways and asserts byte
// equality. Once we have a `render_cm` that consumes a .cm
// source end-to-end via WASM, this can graduate or retire.

export fn render_taste(w: u32, h: u32, out_ptr: [*]u8) i32 {
    var arena = std.heap.ArenaAllocator.init(gpa);
    defer arena.deinit();
    const a = arena.allocator();

    const tree = buildTasteSample(a) catch return 1;
    const fb = render.renderTree(a, tree, w, h) catch return 2;
    @memcpy(out_ptr[0 .. @as(usize, w) * @as(usize, h) * 4], fb.pixels);
    return 0;
}

fn buildTasteSample(a: std.mem.Allocator) !value.Value {
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
