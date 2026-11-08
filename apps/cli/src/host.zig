//! Host API — what a program embedding cmotion needs beyond `cmo`: the
//! entry scene's parameters, evaluation with host-supplied arguments,
//! and the diagnostics of every step.
//!
//! The entry scene is the first `scene` declaration in the source. Its
//! parameters are the clip's props: a host lists them (`writeSceneParams`)
//! to build a props panel, then evaluates the source with values for
//! them (`build` with `args_json`).
//!
//! Plain Zig over the parser, lowerer, checker and evaluator, so it is
//! unit-tested natively. `wasm_entry.zig` is a thin ABI shim over it.
//! Everything is allocated in the caller's arena.

const std = @import("std");
const ast = @import("ast.zig");
const diag = @import("diagnostics.zig");
const ts = @import("tree_sitter.zig");
const lower_mod = @import("lower.zig");
const check_mod = @import("check.zig");
const eval_mod = @import("eval.zig");
const value = @import("value.zig");

pub const Value = value.Value;

/// A line comment's byte range, collected from the CST (the AST drops
/// trivia), so parameter doc comments can be found.
const Comment = struct { start: u32, end: u32 };

pub const Analysis = struct {
    program: ?ast.Program = null,
    diagnostics: std.ArrayListUnmanaged(diag.Diagnostic) = .{},
    comments: []const Comment = &.{},

    pub fn hasError(self: Analysis) bool {
        return anyError(self.diagnostics.items);
    }
};

pub const CheckMode = enum {
    /// Parse and lower only — what `parse_eval` has always done.
    none,
    /// Also run the semantic checks `cmo check` runs.
    full,
};

pub fn anyError(items: []const diag.Diagnostic) bool {
    for (items) |d| if (d.severity == .@"error") return true;
    return false;
}

/// Parse, lower and, in `.full` mode, check `source`. A syntax error
/// stops before lowering and is reported at the first error node.
pub fn analyze(
    arena: std.mem.Allocator,
    source: []const u8,
    path: []const u8,
    mode: CheckMode,
) !Analysis {
    var out: Analysis = .{};

    var parsed = ts.parse(source) catch |err| {
        try out.diagnostics.append(arena, .{
            .code = "PAR000",
            .message = try std.fmt.allocPrint(arena, "parser failed to initialise: {s}", .{@errorName(err)}),
            .span = .{ .path = path },
            .repair = .{
                .id = "report-bug",
                .summary = "Open an issue against cmotion with the source that triggered this.",
            },
        });
        return out;
    };
    defer parsed.deinit();

    const root = parsed.root();
    out.comments = try collectComments(arena, root);

    if (ts.firstError(root)) |e| {
        const p = ts.startPoint(e);
        try out.diagnostics.append(arena, .{
            .code = "PAR100",
            .message = if (ts.isMissing(e))
                try std.fmt.allocPrint(arena, "syntax error: missing `{s}`", .{ts.kind(e)})
            else
                "syntax error in source",
            .span = .{
                .path = path,
                .line = p.row + 1,
                .column = p.column + 1,
                .length = ts.endByte(e) - ts.startByte(e),
            },
            .help = "fix the syntax error first; nothing else runs on a source that does not parse",
            .repair = .{
                .id = "fix-syntax",
                .summary = "Resolve the syntax error reported by the parser.",
            },
        });
        return out;
    }

    var lowerer = lower_mod.Lowerer.init(arena, source);
    const program = lowerer.lowerProgram(root) catch |err| {
        try out.diagnostics.append(arena, .{
            .code = "LWR000",
            .message = try std.fmt.allocPrint(arena, "lowering failed on a clean CST: {s}", .{@errorName(err)}),
            .span = .{ .path = path },
            .help = "the parser accepted a form the interpreter does not lower yet",
            .repair = .{
                .id = "extend-lowering",
                .summary = "Add a branch to lower.zig for the missing CST node kind.",
            },
        });
        return out;
    };
    out.program = program;

    if (mode == .full) {
        var checker = check_mod.Checker.init(arena, source, path);
        const semantic = try checker.check(program);
        try out.diagnostics.appendSlice(arena, semantic);
    }
    return out;
}

/// The entry scene: the first `scene` declaration, or null.
pub fn entryScene(program: ast.Program) ?ast.ComponentLike {
    for (program.decls) |d| switch (d) {
        .scene => |s| return s,
        else => {},
    };
    return null;
}

//
// Props: how a host value maps onto a parameter type
//

/// What kind of host value a parameter accepts. `number` carries the
/// unit the host's number is in (null for a plain number); hosts pass
/// times in seconds, angles in degrees, lengths in pixels.
pub const PropKind = union(enum) {
    number: ?ast.Unit,
    int,
    boolean,
    string,
    color,
    /// A file the host resolved: the argument is its URL, and the value
    /// is the matching constructor (`image("…")`, `font("…")`, …), so a
    /// parameter can stand wherever the call would.
    asset: AssetKind,
    /// No host value maps onto this type yet (records, tuples,
    /// functions, `Animation<T>`, unknown names).
    unsupported,
};

/// Asset parameter types. cmotion never fetches by asset id: the host
/// resolves its own asset to a URL and passes that.
pub const AssetKind = enum {
    image,
    video,
    audio,
    font,

    /// The parameter type that declares it (`Image`, …).
    pub fn typeName(self: AssetKind) []const u8 {
        return switch (self) {
            .image => "Image",
            .video => "Video",
            .audio => "Audio",
            .font => "Font",
        };
    }
};

pub fn propKind(t: ast.Type) PropKind {
    const st = switch (t) {
        .simple => |s| s,
        else => return .unsupported,
    };
    if (st.args.len != 0) return .unsupported;
    const n = st.name.name;
    const eq = std.mem.eql;
    if (eq(u8, n, "Duration") or eq(u8, n, "Time")) return .{ .number = .s };
    if (eq(u8, n, "Angle")) return .{ .number = .deg };
    if (eq(u8, n, "Length") or eq(u8, n, "Pixels")) return .{ .number = .px };
    if (eq(u8, n, "Percent")) return .{ .number = .percent };
    if (eq(u8, n, "Frequency")) return .{ .number = .hz };
    if (eq(u8, n, "Tempo")) return .{ .number = .bpm };
    if (eq(u8, n, "Bars")) return .{ .number = .bars };
    if (eq(u8, n, "Beats")) return .{ .number = .beats };
    if (eq(u8, n, "Number") or eq(u8, n, "Float")) return .{ .number = null };
    if (eq(u8, n, "Int")) return .int;
    if (eq(u8, n, "Bool")) return .boolean;
    if (eq(u8, n, "String")) return .string;
    if (eq(u8, n, "Color")) return .color;
    inline for (std.meta.fields(AssetKind)) |f| {
        const k: AssetKind = @enumFromInt(f.value);
        if (eq(u8, n, k.typeName())) return .{ .asset = k };
    }
    return .unsupported;
}

fn propKindName(k: PropKind) ?[]const u8 {
    return switch (k) {
        .number => "number",
        .int => "int",
        .boolean => "bool",
        .string => "string",
        .color => "color",
        .asset => "asset",
        .unsupported => null,
    };
}

fn typeSpan(t: ast.Type) ast.Span {
    return switch (t) {
        .simple => |s| s.span,
        .tuple => |s| s.span,
        .record => |s| s.span,
        .function => |s| s.span,
    };
}

fn spanText(source: []const u8, s: ast.Span) []const u8 {
    return source[s.start..s.end];
}

//
// Scene parameters
//

/// Write the entry scene's parameters as the diagnostic envelope plus
/// `scene` and `params`:
///
///   { "schemaVersion": 1, "ok": true, "diagnostics": [],
///     "scene": "title",
///     "params": [ { "name": "duration", "type": "Duration",
///                   "prop": "number", "unit": "s", "required": false,
///                   "default": { "source": "12s",
///                                "value": { "kind": "number", "value": 12, "unit": "s" } },
///                   "doc": "How long the title runs." } ] }
///
/// The scene body does not run. `prop` is the host value kind that sets
/// the parameter (null: props cannot set it yet), `unit` the unit that
/// value is in. For `prop: "asset"`, `asset` names the kind (`image`,
/// `video`, `audio`, `font`) and `default.url` is the URL a default
/// `image("…")` names. `doc` is the `//` comment block directly above the
/// parameter. `ok` is false when the source has errors; `params` is then
/// whatever could still be read (empty after a syntax error).
pub fn writeSceneParams(
    w: *std.Io.Writer,
    arena: std.mem.Allocator,
    source: []const u8,
    path: []const u8,
) !void {
    var analysis = try analyze(arena, source, path, .full);

    const scene: ?ast.ComponentLike = if (analysis.program) |p| entryScene(p) else null;
    var defaults: []const ?Value = &.{};
    if (scene) |s| {
        var ev = eval_mod.Evaluator.init(arena, arena, source, path);
        defaults = try ev.evalDefaults(analysis.program.?, s);
        try analysis.diagnostics.appendSlice(arena, ev.diagnostics.items);
    }

    try diag.writeJsonHeader(w, !analysis.hasError(), analysis.diagnostics.items);
    try w.writeAll(",\"scene\":");
    if (scene) |s| try diag.writeJsonString(w, s.name.name) else try w.writeAll("null");
    try w.writeAll(",\"params\":[");
    if (scene) |s| {
        for (s.params, 0..) |p, i| {
            if (i != 0) try w.writeAll(",");
            const kind = propKind(p.type);
            try w.writeAll("{\"name\":");
            try diag.writeJsonString(w, p.name.name);
            try w.writeAll(",\"type\":");
            try diag.writeJsonString(w, spanText(source, typeSpan(p.type)));
            try w.writeAll(",\"prop\":");
            if (propKindName(kind)) |k| try diag.writeJsonString(w, k) else try w.writeAll("null");
            try w.writeAll(",\"asset\":");
            switch (kind) {
                .asset => |k| try diag.writeJsonString(w, @tagName(k)),
                else => try w.writeAll("null"),
            }
            try w.writeAll(",\"unit\":");
            switch (kind) {
                .number => |u| if (u) |unit| try diag.writeJsonString(w, @tagName(unit)) else try w.writeAll("null"),
                else => try w.writeAll("null"),
            }
            try w.writeAll(",\"required\":");
            try w.writeAll(if (p.default == null) "true" else "false");
            try w.writeAll(",\"default\":");
            if (p.default) |d| {
                try w.writeAll("{\"source\":");
                try diag.writeJsonString(w, spanText(source, d.span()));
                try w.writeAll(",\"value\":");
                if (defaults[i]) |v| try v.writeJson(w) else try w.writeAll("null");
                if (kind == .asset) {
                    try w.writeAll(",\"url\":");
                    if (defaultUrl(kind.asset, d.*)) |url| try diag.writeJsonString(w, url) else try w.writeAll("null");
                }
                try w.writeAll("}");
            } else try w.writeAll("null");
            try w.writeAll(",\"ui\":");
            try writeUi(w, p, kind);
            try w.writeAll(",\"doc\":");
            const lower_bound = if (i == 0) s.name.span.end else s.params[i - 1].span.end;
            if (try docComment(arena, source, analysis.comments, lower_bound, p.span.start)) |doc|
                try diag.writeJsonString(w, doc)
            else
                try w.writeAll("null");
            try w.writeAll("}");
        }
    }
    try w.writeAll("]");
    try diag.writeJsonFooter(w);
}

//
// `@ui(...)` hints
//

/// The `@ui` keys a host reads, and the kind of literal each takes.
pub const ui_keys = [_]struct { name: []const u8, number: bool }{
    .{ .name = "min", .number = true },
    .{ .name = "max", .number = true },
    .{ .name = "step", .number = true },
    .{ .name = "label", .number = false },
};

/// Write the parameter's `@ui` hints as a plain JSON object, or `null`
/// without one. Numbers are converted into the parameter's prop unit
/// (`@ui(max: 500ms)` on a Duration is `0.5`), so a host can compare
/// them with the values it passes. Keys or values `cmo check` warns
/// about (NAM008, TYP003) are left out.
fn writeUi(w: *std.Io.Writer, p: ast.Param, kind: PropKind) !void {
    const ann = for (p.annotations) |a| {
        if (std.mem.eql(u8, a.name.name, "ui")) break a;
    } else {
        try w.writeAll("null");
        return;
    };
    const prop_unit: ?ast.Unit = switch (kind) {
        .number => |u| u,
        else => null,
    };
    try w.writeAll("{");
    var first = true;
    for (ann.args) |arg| {
        const key = (arg.name orelse continue).name;
        const spec = for (ui_keys) |k| {
            if (std.mem.eql(u8, k.name, key)) break k;
        } else continue;
        if (spec.number) {
            const n = literalNumber(arg.value.*) orelse continue;
            const v = toUnit(n, prop_unit) orelse continue;
            if (!first) try w.writeAll(",");
            first = false;
            try diag.writeJsonString(w, key);
            try w.print(":{d}", .{v});
        } else {
            const text = literalString(arg.value.*) orelse continue;
            if (!first) try w.writeAll(",");
            first = false;
            try diag.writeJsonString(w, key);
            try w.writeAll(":");
            try diag.writeJsonString(w, text);
        }
    }
    try w.writeAll("}");
}

/// A number literal, optionally negated.
pub fn literalNumber(e: ast.Expr) ?value.Number {
    return switch (e) {
        .literal => |l| switch (l) {
            .number => |n| eval_mod.parseNumber(n),
            else => null,
        },
        .unary => |u| if (u.op == .neg) blk: {
            const n = literalNumber(u.operand.*) orelse break :blk null;
            break :blk .{ .value = -n.value, .unit = n.unit };
        } else null,
        .paren => |p| literalNumber(p.inner.*),
        else => null,
    };
}

/// The text of a string literal, without its quotes.
pub fn literalString(e: ast.Expr) ?[]const u8 {
    return switch (e) {
        .literal => |l| switch (l) {
            .string => |s| if (s.raw.len >= 2) s.raw[1 .. s.raw.len - 1] else s.raw,
            else => null,
        },
        else => null,
    };
}

/// `n` in `target` (the prop unit), or null when the units belong to
/// different families. A unitless number is taken as already in the
/// prop unit.
pub fn toUnit(n: value.Number, target: ?ast.Unit) ?f64 {
    const from = n.unit orelse return n.value;
    const to = target orelse return null;
    const f = unitFactor(from) orelse return null;
    const t = unitFactor(to) orelse return null;
    if (f.family != t.family) return null;
    return n.value * f.scale / t.scale;
}

const UnitFamily = enum { time, angle, frequency, length, percent, tempo, bars, beats };

fn unitFactor(u: ast.Unit) ?struct { family: UnitFamily, scale: f64 } {
    return switch (u) {
        .s => .{ .family = .time, .scale = 1 },
        .ms => .{ .family = .time, .scale = 1e-3 },
        .us => .{ .family = .time, .scale = 1e-6 },
        .ns => .{ .family = .time, .scale = 1e-9 },
        .deg => .{ .family = .angle, .scale = 1 },
        .rad => .{ .family = .angle, .scale = 180.0 / std.math.pi },
        .turn => .{ .family = .angle, .scale = 360 },
        .hz => .{ .family = .frequency, .scale = 1 },
        .khz => .{ .family = .frequency, .scale = 1000 },
        .px => .{ .family = .length, .scale = 1 },
        .percent => .{ .family = .percent, .scale = 1 },
        .bpm => .{ .family = .tempo, .scale = 1 },
        .bars => .{ .family = .bars, .scale = 1 },
        .beats => .{ .family = .beats, .scale = 1 },
    };
}

fn collectComments(arena: std.mem.Allocator, root: ts.Node) ![]const Comment {
    var list: std.ArrayListUnmanaged(Comment) = .{};
    try walkComments(arena, root, &list);
    return list.items;
}

fn walkComments(arena: std.mem.Allocator, node: ts.Node, list: *std.ArrayListUnmanaged(Comment)) !void {
    if (std.mem.eql(u8, ts.kind(node), "line_comment")) {
        try list.append(arena, .{ .start = ts.startByte(node), .end = ts.endByte(node) });
        return;
    }
    const n = ts.childCount(node);
    var i: u32 = 0;
    while (i < n) : (i += 1) try walkComments(arena, ts.child(node, i), list);
}

/// The doc comment of a parameter: the run of `//` lines directly above
/// it, each alone on its line, after `lower_bound` (the end of the
/// previous parameter, or of the scene name). A comment trailing the
/// previous parameter on its own line is not this parameter's doc.
fn docComment(
    arena: std.mem.Allocator,
    source: []const u8,
    comments: []const Comment,
    lower_bound: u32,
    param_start: u32,
) !?[]const u8 {
    var expected_line = ast.locate(source, param_start).line;
    var first: usize = comments.len;
    var i = comments.len;
    while (i > 0) {
        i -= 1;
        const c = comments[i];
        if (c.end > param_start) continue;
        if (c.start < lower_bound) break;
        if (expected_line <= 1 or ast.locate(source, c.start).line != expected_line - 1) break;
        if (!aloneOnLine(source, c.start)) break;
        expected_line -= 1;
        first = i;
    }
    if (first == comments.len) return null;

    var out: std.ArrayListUnmanaged(u8) = .{};
    var j = first;
    while (j < comments.len and comments[j].end <= param_start) : (j += 1) {
        if (j != first) try out.append(arena, '\n');
        var text = source[comments[j].start..comments[j].end];
        while (text.len > 0 and text[0] == '/') text = text[1..];
        if (text.len > 0 and text[0] == ' ') text = text[1..];
        try out.appendSlice(arena, std.mem.trimRight(u8, text, " \t\r"));
    }
    return out.items;
}

fn aloneOnLine(source: []const u8, start: u32) bool {
    var k: usize = start;
    while (k > 0) {
        k -= 1;
        switch (source[k]) {
            '\n' => return true,
            ' ', '\t', '\r' => {},
            else => return false,
        }
    }
    return true;
}

//
// Evaluation
//

pub const Built = struct {
    /// The value to sample, or null when the source failed (see
    /// `diagnostics`).
    value: ?Value,
    diagnostics: []const diag.Diagnostic,
};

/// Evaluate `source` for a host.
///
/// - `args_json == null` is the original `parse_eval` contract, kept
///   byte-for-byte: parse, lower, evaluate, sample the first top-level
///   binding. No semantic checks.
/// - `args_json` is a JSON object of entry-scene arguments by parameter
///   name (`{}` for none). The source is also checked, the arguments
///   are converted by parameter type (`propKind`), and the entry scene
///   is what gets sampled. Any error diagnostic fails the build.
pub fn build(
    arena: std.mem.Allocator,
    source: []const u8,
    path: []const u8,
    args_json: ?[]const u8,
) !Built {
    var analysis = try analyze(arena, source, path, if (args_json == null) .none else .full);
    if (analysis.hasError() or analysis.program == null)
        return .{ .value = null, .diagnostics = analysis.diagnostics.items };
    const program = analysis.program.?;

    var ev = eval_mod.Evaluator.init(arena, arena, source, path);
    var args: std.StringHashMapUnmanaged(Value) = .{};
    const scene = entryScene(program);
    if (args_json) |json| {
        try bindArgs(arena, source, path, scene, json, &args, &analysis.diagnostics);
        if (analysis.hasError()) return .{ .value = null, .diagnostics = analysis.diagnostics.items };
        if (scene != null) ev.entry_args = &args;
    }

    const result = try ev.evalProgram(program);
    try analysis.diagnostics.appendSlice(arena, ev.diagnostics.items);
    if (analysis.hasError()) return .{ .value = null, .diagnostics = analysis.diagnostics.items };

    const index: ?usize = if (args_json != null and scene != null)
        result.entry
    else if (result.bindings.len > 0) 0 else null;
    if (index) |k| return .{ .value = result.bindings[k].value, .diagnostics = analysis.diagnostics.items };

    try analysis.diagnostics.append(arena, .{
        .code = "REN001",
        .message = "no scene to render: the program has no top-level binding",
        .span = .{ .path = path },
        .help = "declare a scene, e.g. `scene main() -> Frame { … }`",
        .repair = .{
            .id = "add-scene",
            .summary = "Add a top-level scene whose parameters all have defaults, or pass its arguments.",
        },
    });
    return .{ .value = null, .diagnostics = analysis.diagnostics.items };
}

/// Convert the host's JSON arguments into values for the entry scene's
/// parameters. Every problem is an EVL005 naming the parameter.
fn bindArgs(
    arena: std.mem.Allocator,
    source: []const u8,
    path: []const u8,
    scene: ?ast.ComponentLike,
    json: []const u8,
    out: *std.StringHashMapUnmanaged(Value),
    diags: *std.ArrayListUnmanaged(diag.Diagnostic),
) !void {
    const parsed = std.json.parseFromSliceLeaky(std.json.Value, arena, json, .{}) catch {
        try argError(arena, diags, path, null, source, "scene arguments are not valid JSON", "a JSON object", null);
        return;
    };
    const obj = switch (parsed) {
        .object => |o| o,
        else => {
            try argError(arena, diags, path, null, source, "scene arguments must be a JSON object", "a JSON object", jsonKind(parsed));
            return;
        },
    };
    const s = scene orelse {
        if (obj.count() != 0)
            try argError(arena, diags, path, null, source, "the source declares no scene to pass arguments to", null, null);
        return;
    };

    var it = obj.iterator();
    while (it.next()) |entry| {
        const name = entry.key_ptr.*;
        const param = for (s.params) |p| {
            if (std.mem.eql(u8, p.name.name, name)) break p;
        } else {
            var names: std.ArrayListUnmanaged(u8) = .{};
            for (s.params, 0..) |p, i| {
                if (i != 0) try names.appendSlice(arena, ", ");
                try names.appendSlice(arena, p.name.name);
            }
            const msg = try std.fmt.allocPrint(arena, "scene '{s}' has no parameter '{s}'", .{ s.name.name, name });
            try argError(arena, diags, path, s.name.span, source, msg, if (names.items.len > 0) names.items else "no parameters", null);
            continue;
        };
        if (try argValue(arena, param, entry.value_ptr.*)) |v| {
            try out.put(arena, param.name.name, v);
        } else {
            const kind = propKind(param.type);
            const type_text = spanText(source, typeSpan(param.type));
            const msg = if (kind == .unsupported)
                try std.fmt.allocPrint(arena, "parameter '{s}' has type {s}, which scene arguments cannot set yet", .{ name, type_text })
            else
                try std.fmt.allocPrint(arena, "parameter '{s}' expects {s}, got {s}", .{ name, expectedText(kind, type_text, arena) catch type_text, jsonKind(entry.value_ptr.*) });
            try argError(arena, diags, path, param.span, source, msg, type_text, jsonKind(entry.value_ptr.*));
        }
    }
}

fn expectedText(kind: PropKind, type_text: []const u8, arena: std.mem.Allocator) ![]const u8 {
    return switch (kind) {
        .number => |u| if (u) |unit|
            try std.fmt.allocPrint(arena, "{s} as a number in {s}", .{ type_text, unitWord(unit) })
        else
            try std.fmt.allocPrint(arena, "{s} as a number", .{type_text}),
        .int => "Int as a whole number",
        .boolean => "Bool as true or false",
        .string => "String as a string",
        .color => "Color as a \"#rrggbb\" string",
        .asset => try std.fmt.allocPrint(arena, "{s} as a URL string", .{type_text}),
        .unsupported => type_text,
    };
}

fn unitWord(u: ast.Unit) []const u8 {
    return switch (u) {
        .s => "seconds",
        .deg => "degrees",
        .px => "pixels",
        .percent => "percent",
        .hz => "hertz",
        .bpm => "beats per minute",
        .bars => "bars",
        .beats => "beats",
        else => @tagName(u),
    };
}

fn argValue(arena: std.mem.Allocator, param: ast.Param, j: std.json.Value) !?Value {
    return switch (propKind(param.type)) {
        .number => |unit| switch (j) {
            .integer => |n| .{ .number = .{ .value = @floatFromInt(n), .unit = unit } },
            .float => |f| .{ .number = .{ .value = f, .unit = unit } },
            else => null,
        },
        .int => switch (j) {
            .integer => |n| .{ .number = .{ .value = @floatFromInt(n), .unit = null } },
            .float => |f| if (@floor(f) == f) .{ .number = .{ .value = f, .unit = null } } else null,
            else => null,
        },
        .boolean => switch (j) {
            .bool => |b| .{ .bool = b },
            else => null,
        },
        .string => switch (j) {
            .string => |s| .{ .string = try quote(arena, s) },
            else => null,
        },
        .color => switch (j) {
            .string => |s| if (hexDigits(s)) |digits| .{ .color = .{ .hex = .{ .digits = try arena.dupe(u8, digits) } } } else null,
            else => null,
        },
        .asset => |k| switch (j) {
            .string => |s| if (s.len == 0) null else try assetValue(arena, k, s),
            else => null,
        },
        .unsupported => null,
    };
}

/// The constructor value an asset argument stands for: `image("url")`.
fn assetValue(arena: std.mem.Allocator, kind: AssetKind, url: []const u8) !Value {
    const fields = try arena.alloc(value.Field, 1);
    fields[0] = .{ .name = "", .value = .{ .string = try quote(arena, url) } };
    return .{ .constructed = .{ .name = @tagName(kind), .fields = fields } };
}

/// The URL in an asset default written as the constructor call with a
/// string literal (`image("/logo.png")`), else null.
fn defaultUrl(kind: AssetKind, e: ast.Expr) ?[]const u8 {
    const call = switch (e) {
        .call => |c| c,
        else => return null,
    };
    const callee = switch (call.callee.*) {
        .ident => |id| id.name,
        else => return null,
    };
    if (!std.mem.eql(u8, callee, @tagName(kind)) or call.args.len == 0) return null;
    return literalString(call.args[0].value.*);
}

/// `Value.string` is the raw quoted source slice, so a host string is
/// stored the way the literal would be written in source.
fn quote(arena: std.mem.Allocator, s: []const u8) ![]const u8 {
    var out: std.ArrayListUnmanaged(u8) = .{};
    try out.append(arena, '"');
    for (s) |b| switch (b) {
        '"' => try out.appendSlice(arena, "\\\""),
        '\\' => try out.appendSlice(arena, "\\\\"),
        '\n' => try out.appendSlice(arena, "\\n"),
        else => try out.append(arena, b),
    };
    try out.append(arena, '"');
    return out.items;
}

/// The digits of `#rgb`, `#rgba`, `#rrggbb` or `#rrggbbaa`, else null.
fn hexDigits(s: []const u8) ?[]const u8 {
    if (s.len < 2 or s[0] != '#') return null;
    const d = s[1..];
    if (d.len != 3 and d.len != 4 and d.len != 6 and d.len != 8) return null;
    for (d) |c| if (!std.ascii.isHex(c)) return null;
    return d;
}

fn jsonKind(j: std.json.Value) []const u8 {
    return switch (j) {
        .null => "null",
        .bool => "a boolean",
        .integer, .float, .number_string => "a number",
        .string => "a string",
        .array => "an array",
        .object => "an object",
    };
}

fn argError(
    arena: std.mem.Allocator,
    diags: *std.ArrayListUnmanaged(diag.Diagnostic),
    path: []const u8,
    span: ?ast.Span,
    source: []const u8,
    message: []const u8,
    expected: ?[]const u8,
    actual: ?[]const u8,
) !void {
    var d: diag.Diagnostic = .{
        .code = "EVL005",
        .message = message,
        .span = .{ .path = path },
        .expected = expected,
        .actual = actual,
        .repair = .{
            .id = "fix-scene-argument",
            .summary = "Pass each argument under a parameter name the entry scene declares, as a value of its type.",
        },
    };
    if (span) |s| {
        const loc = s.location(source);
        d.span = .{ .path = path, .line = loc.line, .column = loc.column, .length = s.end - s.start };
    }
    try diags.append(arena, d);
}

//
// Tests
//

const testing = std.testing;

fn paramsJson(arena: std.mem.Allocator, source: []const u8) ![]const u8 {
    var aw = std.Io.Writer.Allocating.init(arena);
    try writeSceneParams(&aw.writer, arena, source, "<test>");
    return aw.written();
}

const title_src =
    \\use std.shapes.*;
    \\scene title(
    \\  // How long the title runs.
    \\  // Seconds.
    \\  duration: Duration = 6s,
    \\  label: String = "Hello", // trails label, not doc for fill
    \\  fill: Color = #ff3399,
    \\  spin: Angle = 90deg,
    \\) -> Frame {
    \\  rect(width: 100px, height: 100px, fill: fill)
    \\}
;

test "host: scene params list name, type, unit, default and doc" {
    var arena = std.heap.ArenaAllocator.init(testing.allocator);
    defer arena.deinit();
    const out = try paramsJson(arena.allocator(), title_src);
    const parsed = try std.json.parseFromSliceLeaky(std.json.Value, arena.allocator(), out, .{});
    const root = parsed.object;
    try testing.expect(root.get("ok").?.bool);
    try testing.expectEqualStrings("title", root.get("scene").?.string);
    const params = root.get("params").?.array.items;
    try testing.expectEqual(@as(usize, 4), params.len);

    const duration = params[0].object;
    try testing.expectEqualStrings("duration", duration.get("name").?.string);
    try testing.expectEqualStrings("Duration", duration.get("type").?.string);
    try testing.expectEqualStrings("number", duration.get("prop").?.string);
    try testing.expectEqualStrings("s", duration.get("unit").?.string);
    try testing.expect(!duration.get("required").?.bool);
    const dflt = duration.get("default").?.object;
    try testing.expectEqualStrings("6s", dflt.get("source").?.string);
    try testing.expectEqual(@as(f64, 6), switch (dflt.get("value").?.object.get("value").?) {
        .integer => |n| @as(f64, @floatFromInt(n)),
        .float => |f| f,
        else => -1,
    });
    try testing.expectEqualStrings("How long the title runs.\nSeconds.", duration.get("doc").?.string);

    // A comment trailing `label` on its own line is nobody's doc.
    try testing.expect(params[1].object.get("doc").? == .null);
    try testing.expect(params[2].object.get("doc").? == .null);
    try testing.expectEqualStrings("color", params[2].object.get("prop").?.string);
    try testing.expectEqualStrings("deg", params[3].object.get("unit").?.string);
}

test "host: a required parameter has no default" {
    var arena = std.heap.ArenaAllocator.init(testing.allocator);
    defer arena.deinit();
    const out = try paramsJson(arena.allocator(), "scene s(label: String) -> Frame { label }");
    try testing.expect(std.mem.indexOf(u8, out, "\"required\":true,\"default\":null") != null);
}

test "host: a syntax error is located at the offending token" {
    var arena = std.heap.ArenaAllocator.init(testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const built = try build(a, "let a = 1;\nlet b = ;\n", "<test>", "{}");
    try testing.expect(built.value == null);
    try testing.expectEqualStrings("PAR100", built.diagnostics[0].code);
    try testing.expectEqual(@as(u32, 2), built.diagnostics[0].span.?.line);
}

test "host: empty arguments render what parse_eval renders" {
    var arena = std.heap.ArenaAllocator.init(testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const legacy = try build(a, title_src, "<test>", null);
    const with = try build(a, title_src, "<test>", "{}");
    var x = std.Io.Writer.Allocating.init(a);
    var y = std.Io.Writer.Allocating.init(a);
    try legacy.value.?.writeJson(&x.writer);
    try with.value.?.writeJson(&y.writer);
    try testing.expectEqualStrings(x.written(), y.written());
}

test "host: arguments override defaults by type" {
    var arena = std.heap.ArenaAllocator.init(testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const built = try build(a, title_src, "<test>", "{\"fill\":\"#00ff00\"}");
    var w = std.Io.Writer.Allocating.init(a);
    try built.value.?.writeJson(&w.writer);
    try testing.expect(std.mem.indexOf(u8, w.written(), "00ff00") != null);
    try testing.expect(std.mem.indexOf(u8, w.written(), "ff3399") == null);
}

test "host: a wrong argument type is EVL005 naming the parameter" {
    var arena = std.heap.ArenaAllocator.init(testing.allocator);
    defer arena.deinit();
    const built = try build(arena.allocator(), title_src, "<test>", "{\"duration\":\"long\"}");
    try testing.expect(built.value == null);
    try testing.expectEqualStrings("EVL005", built.diagnostics[0].code);
    try testing.expect(std.mem.indexOf(u8, built.diagnostics[0].message, "'duration'") != null);
    try testing.expectEqual(@as(u32, 5), built.diagnostics[0].span.?.line);
}

test "host: an unknown argument is EVL005 listing the parameters" {
    var arena = std.heap.ArenaAllocator.init(testing.allocator);
    defer arena.deinit();
    const built = try build(arena.allocator(), title_src, "<test>", "{\"colour\":\"#000\"}");
    try testing.expect(built.value == null);
    try testing.expectEqualStrings("EVL005", built.diagnostics[0].code);
    try testing.expectEqualStrings("duration, label, fill, spin", built.diagnostics[0].expected.?);
}

test "host: a required parameter can be supplied, and is EVL004 when not" {
    var arena = std.heap.ArenaAllocator.init(testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const src = "scene s(label: String) -> Frame { label }";
    const ok = try build(a, src, "<test>", "{\"label\":\"Hi\"}");
    try testing.expectEqualStrings("\"Hi\"", ok.value.?.string);
    const missing = try build(a, src, "<test>", "{}");
    try testing.expect(missing.value == null);
    try testing.expectEqualStrings("EVL004", missing.diagnostics[0].code);
}

test "host: the entry scene is sampled even after a top-level let" {
    var arena = std.heap.ArenaAllocator.init(testing.allocator);
    defer arena.deinit();
    const built = try build(arena.allocator(), "let n = 1;\nscene s(x: Number = 2) -> Frame { x }", "<test>", "{\"x\":5}");
    try testing.expectEqual(@as(f64, 5), built.value.?.number.value);
}

test "host: @ui hints come out in the parameter's unit, with the doc above them" {
    var arena = std.heap.ArenaAllocator.init(testing.allocator);
    defer arena.deinit();
    const out = try paramsJson(arena.allocator(),
        \\scene s(
        \\  // Fade length.
        \\  @ui(min: 0, max: 500ms, step: 0.05, label: "Fade", bogus: 1)
        \\  fade: Duration = 0.2s,
        \\  plain: Number = 1,
        \\) -> Frame { fade }
    );
    const parsed = try std.json.parseFromSliceLeaky(std.json.Value, arena.allocator(), out, .{});
    const params = parsed.object.get("params").?.array.items;
    const ui = params[0].object.get("ui").?.object;
    try testing.expectEqual(@as(f64, 0.5), ui.get("max").?.float);
    try testing.expectEqualStrings("Fade", ui.get("label").?.string);
    try testing.expect(ui.get("bogus") == null);
    try testing.expectEqualStrings("Fade length.", params[0].object.get("doc").?.string);
    try testing.expect(params[1].object.get("ui").? == .null);
    // The unknown key is a warning, not an error.
    try testing.expect(parsed.object.get("ok").?.bool);
}

test "host: asset parameters take a URL and stand for their constructor" {
    var arena = std.heap.ArenaAllocator.init(testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const src =
        \\use std.shapes.*;
        \\scene card(logo: Image = image("/logo.png"), face: Font = font("/DMSans-Bold.ttf")) -> Frame {
        \\  rect(width: 10px, height: 10px, fill: logo)
        \\}
    ;
    const out = try paramsJson(a, src);
    const parsed = try std.json.parseFromSliceLeaky(std.json.Value, a, out, .{});
    const params = parsed.object.get("params").?.array.items;
    try testing.expectEqualStrings("asset", params[0].object.get("prop").?.string);
    try testing.expectEqualStrings("image", params[0].object.get("asset").?.string);
    try testing.expectEqualStrings("/logo.png", params[0].object.get("default").?.object.get("url").?.string);
    try testing.expectEqualStrings("font", params[1].object.get("asset").?.string);

    const built = try build(a, src, "<test>", "{\"logo\":\"https://cdn.example/a.png\"}");
    var w = std.Io.Writer.Allocating.init(a);
    try built.value.?.writeJson(&w.writer);
    try testing.expect(std.mem.indexOf(u8, w.written(), "{\"kind\":\"constructed\",\"name\":\"image\",\"fields\":[{\"name\":\"\",\"value\":{\"kind\":\"string\",\"raw\":\"\\\"https://cdn.example/a.png\\\"\"}}]}") != null);

    const bad = try build(a, src, "<test>", "{\"logo\":42}");
    try testing.expectEqualStrings("EVL005", bad.diagnostics[0].code);
}
