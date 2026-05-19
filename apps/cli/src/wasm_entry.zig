//! WASM entry point — exposes the cmotion *interpreter* (parse +
//! lower + eval + sampler) as host-callable functions. The renderer
//! (Three.js, our own `render.zig`, anything else) becomes a
//! swappable consumer of the JSON value-tree this module produces.
//!
//! The canonical flow:
//!   1. host calls `parse_eval(source_ptr, source_len)` → opaque
//!      handle (Session*).
//!   2. host repeatedly calls `sample_at(handle, t_ns, out_ptr,
//!      out_cap)` → number of JSON bytes written into `out_ptr`.
//!   3. host calls `release(handle)` when done.
//!
//! Compiled to `wasm32-wasi` (see `build.zig`'s `addWasmStep`). The
//! wasi target gets us libc shims that tree-sitter's C runtime
//! needs (`fdopen` and friends) for free; freestanding would
//! require hand-rolled stubs.

const std = @import("std");
const value = @import("value.zig");
const render = @import("render.zig");
const ts = @import("tree_sitter.zig");
const ast = @import("ast.zig");
const lower_mod = @import("lower.zig");
const eval_mod = @import("eval.zig");
const sampler_mod = @import("sampler.zig");

const gpa = std.heap.wasm_allocator;

/// Pinned semantic version of the cmotion DSL + WASM ABI exposed
/// here. Bundles ship this verbatim so a saved `.cm` + interpreter
/// version produces a reproducible render. Bump on any breaking
/// ABI / language change.
const cmotion_version: []const u8 = "0.1.0";

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
    if (out_cap < cmotion_version.len) return 0;
    @memcpy(out_ptr[0..cmotion_version.len], cmotion_version);
    return cmotion_version.len;
}

// -------- interpreter session --------

/// Owns the parsed tree + lowered AST + evaluated value tree for
/// one `.cm` source. Sampling at a given `t` happens against
/// `scene_value` without re-parsing or re-evaluating.
const Session = struct {
    arena: *std.heap.ArenaAllocator,
    parsed: ts.Parsed,
    scene_value: value.Value,
};

/// Parse + lower + eval a `.cm` source. Returns an opaque handle
/// (the pointer-as-integer is the handle from the host's POV) or
/// 0 if anything fails. Diagnostics are dropped silently in v0 —
/// surfacing them is a follow-up.
export fn parse_eval(src_ptr: [*]const u8, src_len: usize) usize {
    const session = gpa.create(Session) catch return 0;
    errdefer gpa.destroy(session);

    const arena_ptr = gpa.create(std.heap.ArenaAllocator) catch return 0;
    arena_ptr.* = std.heap.ArenaAllocator.init(gpa);
    errdefer {
        arena_ptr.deinit();
        gpa.destroy(arena_ptr);
    }

    session.arena = arena_ptr;
    const a = arena_ptr.allocator();

    // Copy the source into the session's arena — the AST keeps
    // zero-copy slices into the source buffer, so it must outlive
    // the lowered program.
    const source = a.dupe(u8, src_ptr[0..src_len]) catch return 0;

    session.parsed = ts.parse(source) catch return 0;
    errdefer session.parsed.deinit();

    const root = session.parsed.root();
    if (ts.hasError(root)) return 0;

    var lowerer = lower_mod.Lowerer.init(a, source);
    const program = lowerer.lowerProgram(root) catch return 0;

    var evaluator = eval_mod.Evaluator.init(a, gpa, source, "<wasm>");
    defer evaluator.deinit();
    const eval_result = evaluator.evalProgram(program) catch return 0;

    var has_error = false;
    for (evaluator.diagnostics.items) |d| {
        if (d.severity == .@"error") has_error = true;
    }
    if (has_error) return 0;
    if (eval_result.bindings.len == 0) return 0;

    session.scene_value = eval_result.bindings[0].value;

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
    session.parsed.deinit();
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
