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
///
/// Two arenas: `ast_arena` holds the source, CST and lowered program for
/// the session's whole life; `eval_arena` holds evaluation results and is
/// reset on every re-evaluation (`apply_args`), so repeated parameter
/// tweaks from a host UI don't grow memory without bound.
const Session = struct {
    ast_arena: *std.heap.ArenaAllocator,
    eval_arena: *std.heap.ArenaAllocator,
    source: []const u8,
    parsed: ts.Parsed,
    program: ast.Program,
    scene_value: value.Value,
};

/// Reset the eval arena and re-run the evaluator over the session's
/// program, optionally with per-name scene argument overrides (which must
/// be allocated from the eval arena AFTER the caller reset it — this
/// helper does not reset so overrides survive; plain parse_eval resets
/// via `resetEval`). Picks the binding of the first top-level scene decl,
/// falling back to the first binding for scene-less sources.
fn runEval(session: *Session, overrides: ?*const std.StringArrayHashMapUnmanaged(value.Value)) bool {
    const a = session.eval_arena.allocator();
    var evaluator = eval_mod.Evaluator.init(a, gpa, sessionSource(session), "<wasm>");
    defer evaluator.deinit();
    evaluator.arg_overrides = overrides;
    const eval_result = evaluator.evalProgram(session.program) catch return false;

    var has_error = false;
    for (evaluator.diagnostics.items) |d| {
        if (d.severity == .@"error") has_error = true;
    }
    if (has_error) return false;
    if (eval_result.bindings.len == 0) return false;

    // Prefer the first scene's binding: top-level lets also bind, and
    // bindings[0] would silently pick one of those for sources that put a
    // `let` before the scene.
    if (firstScene(session.program)) |scene| {
        for (eval_result.bindings) |b| {
            if (std.mem.eql(u8, b.name, scene.name.name)) {
                session.scene_value = b.value;
                return true;
            }
        }
    }
    session.scene_value = eval_result.bindings[0].value;
    return true;
}

fn resetEval(session: *Session) void {
    _ = session.eval_arena.reset(.retain_capacity);
}

fn sessionSource(session: *Session) []const u8 {
    // The lowerer and evaluator both slice into the same source buffer the
    // AST was built from; it lives in the ast arena for the session's life.
    return session.source;
}

fn firstScene(program: ast.Program) ?ast.ComponentLike {
    for (program.decls) |decl| switch (decl) {
        .scene => |cl| return cl,
        else => {},
    };
    return null;
}

/// Parse + lower + eval a `.cm` source. Returns an opaque handle
/// (the pointer-as-integer is the handle from the host's POV) or
/// 0 if anything fails. Diagnostics are dropped silently in v0 —
/// surfacing them is a follow-up.
export fn parse_eval(src_ptr: [*]const u8, src_len: usize) usize {
    const session = gpa.create(Session) catch return 0;
    errdefer gpa.destroy(session);

    const ast_arena = gpa.create(std.heap.ArenaAllocator) catch return 0;
    ast_arena.* = std.heap.ArenaAllocator.init(gpa);
    errdefer {
        ast_arena.deinit();
        gpa.destroy(ast_arena);
    }
    const eval_arena = gpa.create(std.heap.ArenaAllocator) catch return 0;
    eval_arena.* = std.heap.ArenaAllocator.init(gpa);
    errdefer {
        eval_arena.deinit();
        gpa.destroy(eval_arena);
    }

    session.ast_arena = ast_arena;
    session.eval_arena = eval_arena;
    const a = ast_arena.allocator();

    // Copy the source into the session's arena — the AST keeps
    // zero-copy slices into the source buffer, so it must outlive
    // the lowered program.
    const source = a.dupe(u8, src_ptr[0..src_len]) catch return 0;
    session.source = source;

    session.parsed = ts.parse(source) catch return 0;
    errdefer session.parsed.deinit();

    const root = session.parsed.root();
    if (ts.hasError(root)) return 0;

    var lowerer = lower_mod.Lowerer.init(a, source);
    session.program = lowerer.lowerProgram(root) catch return 0;

    resetEval(session);
    if (!runEval(session, null)) return 0;

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
    session.eval_arena.deinit();
    gpa.destroy(session.eval_arena);
    session.ast_arena.deinit();
    gpa.destroy(session.ast_arena);
    gpa.destroy(session);
}

// -------- scene parameter reflection + overrides --------

fn typeName(t: ast.Type) []const u8 {
    return switch (t) {
        .simple => |st| st.name.name,
        .tuple => "tuple",
        .record => "record",
        .function => "function",
    };
}

/// Write the first scene's parameter surface as JSON:
///   {"params":[{"name":"duration","type":"Duration","default":<Value|null>}, ...]}
/// Defaults are evaluated (with preceding top-level lets in scope) so the
/// host sees concrete values, not source expressions. Returns bytes
/// written, 0 on failure or when the buffer is too small (the host
/// retries with a bigger buffer, same contract as sample_at).
export fn scene_params(handle: usize, out_ptr: [*]u8, out_cap: usize) usize {
    if (handle == 0) return 0;
    const session: *Session = @ptrFromInt(handle);
    const scene = firstScene(session.program) orelse return 0;

    // Transient arena: reflection must not disturb the session's eval
    // arena (scene_value keeps pointing into it).
    var arena = std.heap.ArenaAllocator.init(gpa);
    defer arena.deinit();
    const a = arena.allocator();

    var evaluator = eval_mod.Evaluator.init(a, gpa, sessionSource(session), "<wasm>");
    defer evaluator.deinit();
    const defaults = evaluator.sceneParamDefaults(session.program) catch return 0;

    var stream = std.Io.Writer.fixed(out_ptr[0..out_cap]);
    stream.writeAll("{\"params\":[") catch return 0;
    for (scene.params, 0..) |p, i| {
        if (i != 0) stream.writeAll(",") catch return 0;
        stream.writeAll("{\"name\":\"") catch return 0;
        stream.writeAll(p.name.name) catch return 0;
        stream.writeAll("\",\"type\":\"") catch return 0;
        stream.writeAll(typeName(p.type)) catch return 0;
        stream.writeAll("\",\"default\":") catch return 0;
        if (defaults.get(p.name.name)) |v| {
            v.writeJson(&stream) catch return 0;
        } else {
            stream.writeAll("null") catch return 0;
        }
        stream.writeAll("}") catch return 0;
    }
    stream.writeAll("]}") catch return 0;
    return stream.buffered().len;
}

fn numberWithDefaultUnit(v: f64, default: ?value.Value) value.Value {
    // A bare JSON number carries no unit; inherit the declared default's
    // unit so `duration: Duration = 6s` overridden with 8 means 8s.
    var unit: ?ast.Unit = null;
    if (default) |d| {
        if (d == .number) unit = d.number.unit;
    }
    return .{ .number = .{ .value = v, .unit = unit } };
}

fn jsonToValue(a: std.mem.Allocator, j: std.json.Value, default: ?value.Value) ?value.Value {
    switch (j) {
        .integer => |i| return numberWithDefaultUnit(@floatFromInt(i), default),
        .float => |f| return numberWithDefaultUnit(f, default),
        .bool => |b| return .{ .@"bool" = b },
        .string => |str| {
            if (default) |d| {
                if (d == .color and str.len >= 4 and str[0] == '#') {
                    const digits = a.dupe(u8, str[1..]) catch return null;
                    return .{ .color = .{ .hex = .{ .digits = digits } } };
                }
            }
            // Value.string convention is the raw *quoted* source slice.
            const quoted = std.fmt.allocPrint(a, "\"{s}\"", .{str}) catch return null;
            return .{ .string = quoted };
        },
        else => return null,
    }
}

/// Re-evaluate the session's scene with parameter overrides supplied as a
/// JSON object of name → number | string | bool ({"duration": 8,
/// "accent": "#ff5050"}). Unknown names are ignored; a bare number
/// inherits the default's unit; a '#'-string overriding a color default
/// becomes a hex color. Returns 1 on success, 0 on failure — on failure
/// the previous defaults-evaluation is restored so sample_at stays valid.
export fn apply_args(handle: usize, json_ptr: [*]const u8, json_len: usize) usize {
    if (handle == 0) return 0;
    const session: *Session = @ptrFromInt(handle);

    resetEval(session);
    const a = session.eval_arena.allocator();

    var evaluator = eval_mod.Evaluator.init(a, gpa, sessionSource(session), "<wasm>");
    defer evaluator.deinit();
    const defaults = evaluator.sceneParamDefaults(session.program) catch {
        _ = runEval(session, null);
        return 0;
    };

    const parsed = std.json.parseFromSliceLeaky(std.json.Value, a, json_ptr[0..json_len], .{}) catch {
        _ = runEval(session, null);
        return 0;
    };
    if (parsed != .object) {
        _ = runEval(session, null);
        return 0;
    }

    var overrides: std.StringArrayHashMapUnmanaged(value.Value) = .{};
    var it = parsed.object.iterator();
    while (it.next()) |entry| {
        const v = jsonToValue(a, entry.value_ptr.*, defaults.get(entry.key_ptr.*)) orelse continue;
        const name = a.dupe(u8, entry.key_ptr.*) catch continue;
        overrides.put(a, name, v) catch continue;
    }

    if (!runEval(session, &overrides)) {
        // Restore the defaults evaluation; parse_eval succeeded once and
        // evaluation is deterministic, so this cannot fail in practice.
        _ = runEval(session, null);
        return 0;
    }
    return 1;
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
