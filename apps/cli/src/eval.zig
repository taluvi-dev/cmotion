//! Cmotion reference interpreter — stage 4, v0.
//!
//! Tree-walking evaluator over the typed AST. Today's scope is narrow on
//! purpose: top-level `let` bindings, literals, identifiers, paren,
//! unary, binary, blocks-with-lets, and color literals. Every other
//! expression form emits `EVL001` (unsupported in v0) and the surrounding
//! let evaluates to `nil` so the rest of the program still gets to run.
//!
//! Things deliberately deferred to future commits on this branch:
//!   - function calls + builtin stdlib (rect, vec3, animate, compose, ...)
//!   - method calls, field access, indexing
//!   - if / else, match
//!   - lambdas + closures
//!   - `animate { ... }` and `compose [ ... ]` syntactic forms
//!   - scene / component / filter / export evaluation (only their bodies'
//!     top-level lets are sidestepped — these decls are recorded but not
//!     entered)
//!
//! Design notes:
//!   - Diagnostic-first error handling, like the rest of the CLI. Eval
//!     failures don't `@panic` or bubble Zig errors; they emit an `EVL*`
//!     diagnostic and the offending sub-expression evaluates to `nil`.
//!   - Numbers are computed as f64 with the unit suffix carried alongside.
//!     Same-unit arithmetic propagates the unit; mismatched-unit arithmetic
//!     emits `EVL002` and the result drops the unit. The full UNT/unit
//!     algebra (e.g. `Duration * Hz -> Number`) lands later.
//!   - The evaluator owns an arena passed in by the caller. Every Value
//!     payload (record field slices, array elem slices, color components)
//!     is allocated in that arena. Source-borrowed slices stay valid as
//!     long as the original buffer outlives the eval result.

const std = @import("std");
const ast = @import("ast.zig");
const diag = @import("diagnostics.zig");
const value = @import("value.zig");

pub const Value = value.Value;

pub const EvalError = error{OutOfMemory};

pub const Binding = struct {
    name: []const u8,
    value: Value,
    span: ast.Span,
};

/// The top-level eval result. Today it's just the list of evaluated
/// let bindings, in source order. Scenes/components/filters/exports
/// don't evaluate yet, but their presence doesn't break the pass.
pub const Program = struct {
    bindings: []const Binding,

    pub fn writeJson(self: Program, w: anytype) !void {
        try w.writeAll("{\"bindings\":[");
        for (self.bindings, 0..) |b, i| {
            if (i != 0) try w.writeAll(",");
            try w.writeAll("{\"name\":");
            try writeJsonStr(w, b.name);
            try w.writeAll(",\"value\":");
            try b.value.writeJson(w);
            try w.writeAll("}");
        }
        try w.writeAll("]}");
    }

    pub fn writeText(self: Program, w: anytype) !void {
        if (self.bindings.len == 0) {
            try w.writeAll("(no top-level let bindings)\n");
            return;
        }
        for (self.bindings) |b| {
            try w.writeAll(b.name);
            try w.writeAll(" = ");
            try b.value.writeText(w);
            try w.writeAll("\n");
        }
    }
};

const Scope = struct {
    parent: ?*const Scope,
    /// Bindings visible at this scope, keyed by name. Values are owned by
    /// the evaluator's arena.
    names: std.StringHashMapUnmanaged(Value) = .{},

    fn lookup(self: *const Scope, name: []const u8) ?Value {
        if (self.names.get(name)) |v| return v;
        if (self.parent) |p| return p.lookup(name);
        return null;
    }
};

pub const Evaluator = struct {
    arena: std.mem.Allocator,
    /// Allocator for transient state (the scope hashmaps, the diagnostics
    /// list). Caller usually passes a long-lived allocator like the cli
    /// context's; only `Value` payloads need to live as long as the result.
    gpa: std.mem.Allocator,
    source: []const u8,
    path: []const u8,
    diagnostics: std.ArrayListUnmanaged(diag.Diagnostic) = .{},

    pub fn init(
        arena: std.mem.Allocator,
        gpa: std.mem.Allocator,
        source: []const u8,
        path: []const u8,
    ) Evaluator {
        return .{ .arena = arena, .gpa = gpa, .source = source, .path = path };
    }

    pub fn deinit(self: *Evaluator) void {
        self.diagnostics.deinit(self.gpa);
    }

    pub fn evalProgram(self: *Evaluator, program: ast.Program) EvalError!Program {
        var top = Scope{ .parent = null };
        defer top.names.deinit(self.gpa);

        var bindings: std.ArrayListUnmanaged(Binding) = .{};
        defer bindings.deinit(self.gpa);

        for (program.decls) |decl| switch (decl) {
            .let => |d| {
                const v = try self.evalExpr(d.value.*, &top);
                try top.names.put(self.gpa, d.name.name, v);
                try bindings.append(self.gpa, .{
                    .name = d.name.name,
                    .value = v,
                    .span = d.span,
                });
            },
            // The other top-level forms don't evaluate to a value today.
            // We record nothing for them; future commits will let `cmo
            // eval --scene <name>` invoke a scene body.
            .import, .component, .scene, .filter, .@"export" => {},
        };

        const owned = try self.arena.alloc(Binding, bindings.items.len);
        @memcpy(owned, bindings.items);
        return .{ .bindings = owned };
    }

    pub fn takeDiagnostics(self: *Evaluator) ![]const diag.Diagnostic {
        return self.diagnostics.toOwnedSlice(self.gpa);
    }

    //
    // Expression evaluator
    //

    fn evalExpr(self: *Evaluator, expr: ast.Expr, scope: *Scope) EvalError!Value {
        return switch (expr) {
            .literal => |lit| try self.evalLiteral(lit, scope),
            .ident => |id| self.evalIdent(id, scope),
            .paren => |p| self.evalExpr(p.inner.*, scope),
            .unary => |u| try self.evalUnary(u, scope),
            .binary => |b| try self.evalBinary(b, scope),
            .block => |blk| try self.evalBlock(blk, scope),
            else => try self.unsupported(expr),
        };
    }

    fn evalBlock(self: *Evaluator, block: ast.Block, parent: *Scope) EvalError!Value {
        var local = Scope{ .parent = parent };
        defer local.names.deinit(self.gpa);
        for (block.lets) |l| {
            const v = try self.evalExpr(l.value.*, &local);
            try local.names.put(self.gpa, l.name.name, v);
        }
        return self.evalExpr(block.result.*, &local);
    }

    fn evalIdent(self: *Evaluator, id: ast.Ident, scope: *Scope) Value {
        if (scope.lookup(id.name)) |v| return v;
        // EVL003 — unresolved at eval time. `cmo check` normally catches
        // this as NAM003 first; we still surface it from eval so the
        // pipelines stay independent.
        const loc = id.span.location(self.source);
        const msg = std.fmt.allocPrint(
            self.arena,
            "name '{s}' is not bound at eval time",
            .{id.name},
        ) catch return .nil;
        self.diagnostics.append(self.gpa, .{
            .code = "EVL003",
            .message = msg,
            .span = .{
                .path = self.path,
                .line = loc.line,
                .column = loc.column,
                .length = id.span.end - id.span.start,
            },
            .help = "declare the name with `let` or import it before this use",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "bind-or-import-name",
                .summary = "Add a `let` or `use` that introduces this name into the current scope.",
            },
        }) catch {};
        return .nil;
    }

    fn evalLiteral(self: *Evaluator, lit: ast.Literal, scope: *Scope) EvalError!Value {
        return switch (lit) {
            .number => |n| .{ .number = parseNumber(n) },
            .string => |s| .{ .string = s.raw },
            .@"bool" => |b| .{ .@"bool" = b.value },
            .color => |c| try self.evalColor(c, scope),
        };
    }

    fn evalColor(self: *Evaluator, c: ast.Color, scope: *Scope) EvalError!Value {
        return switch (c) {
            .hex => |h| .{ .color = .{ .hex = .{ .digits = h.digits } } },
            .oklch => |v| .{ .color = .{ .oklch = .{
                .l = try self.evalNumberArg(v.l.*, scope, "oklch.l"),
                .c = try self.evalNumberArg(v.c.*, scope, "oklch.c"),
                .h = try self.evalNumberArg(v.h.*, scope, "oklch.h"),
            } } },
            .oklab => |v| .{ .color = .{ .oklab = .{
                .l = try self.evalNumberArg(v.l.*, scope, "oklab.l"),
                .a = try self.evalNumberArg(v.a.*, scope, "oklab.a"),
                .b = try self.evalNumberArg(v.b.*, scope, "oklab.b"),
            } } },
            .srgb => |v| .{ .color = .{ .srgb = .{
                .r = try self.evalNumberArg(v.r.*, scope, "srgb.r"),
                .g = try self.evalNumberArg(v.g.*, scope, "srgb.g"),
                .b = try self.evalNumberArg(v.b.*, scope, "srgb.b"),
            } } },
        };
    }

    fn evalNumberArg(
        self: *Evaluator,
        expr: ast.Expr,
        scope: *Scope,
        what: []const u8,
    ) EvalError!value.Number {
        const v = try self.evalExpr(expr, scope);
        return switch (v) {
            .number => |n| n,
            else => blk: {
                try self.typeError(expr.span(), what, "number", v);
                break :blk .{ .value = 0, .unit = null };
            },
        };
    }

    fn evalUnary(self: *Evaluator, u: ast.Unary, scope: *Scope) EvalError!Value {
        const operand = try self.evalExpr(u.operand.*, scope);
        return switch (u.op) {
            .neg => switch (operand) {
                .number => |n| Value{ .number = .{ .value = -n.value, .unit = n.unit } },
                else => blk: {
                    try self.typeError(u.span, "unary -", "number", operand);
                    break :blk .nil;
                },
            },
            .not => switch (operand) {
                .@"bool" => |b| Value{ .@"bool" = !b },
                else => blk: {
                    try self.typeError(u.span, "unary !", "bool", operand);
                    break :blk .nil;
                },
            },
        };
    }

    fn evalBinary(self: *Evaluator, b: ast.Binary, scope: *Scope) EvalError!Value {
        const left = try self.evalExpr(b.left.*, scope);
        const right = try self.evalExpr(b.right.*, scope);
        return switch (b.op) {
            .add, .sub, .mul, .div, .mod, .pow => try self.evalArith(b, left, right),
            .eq, .neq => self.evalEquality(b.op, left, right),
            .lt, .lte, .gt, .gte => try self.evalCompare(b, left, right),
            .@"and", .@"or" => try self.evalLogic(b, left, right),
        };
    }

    fn evalArith(self: *Evaluator, b: ast.Binary, left: Value, right: Value) EvalError!Value {
        const ln = numberOrError(self, b.span, "arithmetic", left) orelse return .nil;
        const rn = numberOrError(self, b.span, "arithmetic", right) orelse return .nil;
        // Unit handling for v0: addition/subtraction require matching
        // units (or both unitless); multiplication / division produce a
        // result with whichever side had a unit (or unitless if both
        // sides were unitless). The real unit algebra grows out of stage
        // 2 once it lands.
        const unit: ?ast.Unit = switch (b.op) {
            .add, .sub, .mod => unit: {
                if (unitsMatch(ln.unit, rn.unit)) break :unit ln.unit;
                try self.unitMismatch(b.span, b.op, ln, rn);
                break :unit null;
            },
            .mul, .div, .pow => ln.unit orelse rn.unit,
            else => unreachable,
        };
        const v: f64 = switch (b.op) {
            .add => ln.value + rn.value,
            .sub => ln.value - rn.value,
            .mul => ln.value * rn.value,
            .div => if (rn.value == 0) 0 else ln.value / rn.value,
            .mod => @rem(ln.value, if (rn.value == 0) 1 else rn.value),
            .pow => std.math.pow(f64, ln.value, rn.value),
            else => unreachable,
        };
        return .{ .number = .{ .value = v, .unit = unit } };
    }

    fn evalEquality(self: *Evaluator, op: ast.BinOp, left: Value, right: Value) Value {
        _ = self;
        const eq = valuesEqual(left, right);
        return .{ .@"bool" = if (op == .eq) eq else !eq };
    }

    fn evalCompare(self: *Evaluator, b: ast.Binary, left: Value, right: Value) EvalError!Value {
        const ln = numberOrError(self, b.span, "comparison", left) orelse return .nil;
        const rn = numberOrError(self, b.span, "comparison", right) orelse return .nil;
        if (!unitsMatch(ln.unit, rn.unit)) {
            try self.unitMismatch(b.span, b.op, ln, rn);
            return .nil;
        }
        const result = switch (b.op) {
            .lt => ln.value < rn.value,
            .lte => ln.value <= rn.value,
            .gt => ln.value > rn.value,
            .gte => ln.value >= rn.value,
            else => unreachable,
        };
        return .{ .@"bool" = result };
    }

    fn evalLogic(self: *Evaluator, b: ast.Binary, left: Value, right: Value) EvalError!Value {
        const lb = boolOrError(self, b.span, b.op, left) orelse return .nil;
        const rb = boolOrError(self, b.span, b.op, right) orelse return .nil;
        return .{ .@"bool" = switch (b.op) {
            .@"and" => lb and rb,
            .@"or" => lb or rb,
            else => unreachable,
        } };
    }

    //
    // Diagnostic helpers
    //

    fn unsupported(self: *Evaluator, expr: ast.Expr) EvalError!Value {
        const span = expr.span();
        const loc = span.location(self.source);
        const tag = @tagName(@as(std.meta.Tag(ast.Expr), expr));
        const msg = try std.fmt.allocPrint(
            self.arena,
            "expression form '{s}' is not yet supported by the interpreter",
            .{tag},
        );
        try self.diagnostics.append(self.gpa, .{
            .code = "EVL001",
            .message = msg,
            .span = .{
                .path = self.path,
                .line = loc.line,
                .column = loc.column,
                .length = span.end - span.start,
            },
            .help = "stage-4 v0 covers literals, identifiers, paren, unary, binary, blocks-with-let, and color literals; everything else is on the roadmap",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "wait-for-stage-4-expansion",
                .summary = "Track the interpreter roadmap; this form will land in a later commit on the same branch.",
            },
        });
        return .nil;
    }

    fn typeError(
        self: *Evaluator,
        span: ast.Span,
        what: []const u8,
        expected: []const u8,
        got: Value,
    ) EvalError!void {
        const loc = span.location(self.source);
        const got_tag = @tagName(@as(std.meta.Tag(Value), got));
        const msg = try std.fmt.allocPrint(
            self.arena,
            "{s} expected {s}, got {s}",
            .{ what, expected, got_tag },
        );
        try self.diagnostics.append(self.gpa, .{
            .code = "EVL002",
            .message = msg,
            .span = .{
                .path = self.path,
                .line = loc.line,
                .column = loc.column,
                .length = span.end - span.start,
            },
            .expected = expected,
            .actual = got_tag,
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "match-operand-type",
                .summary = "Change the operand so its type matches the operator's expected category.",
            },
        });
    }

    fn unitMismatch(
        self: *Evaluator,
        span: ast.Span,
        op: ast.BinOp,
        left: value.Number,
        right: value.Number,
    ) EvalError!void {
        const loc = span.location(self.source);
        const ltag = if (left.unit) |u| @tagName(u) else "<unitless>";
        const rtag = if (right.unit) |u| @tagName(u) else "<unitless>";
        const msg = try std.fmt.allocPrint(
            self.arena,
            "operator '{s}' mixes units: {s} vs {s}",
            .{ binOpSymbol(op), ltag, rtag },
        );
        try self.diagnostics.append(self.gpa, .{
            .code = "EVL002",
            .message = msg,
            .span = .{
                .path = self.path,
                .line = loc.line,
                .column = loc.column,
                .length = span.end - span.start,
            },
            .expected = ltag,
            .actual = rtag,
            .help = "the v0 interpreter requires matching units for add/sub/mod/compare. The full unit algebra will land alongside stage 2.",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "match-operand-units",
                .summary = "Convert one operand so both sides carry the same unit.",
            },
        });
    }
};

//
// Helpers (pure)
//

fn parseNumber(n: ast.NumberLit) value.Number {
    // The lexer guarantees `n.text` is a well-formed numeric literal
    // (digits + optional `.` + digits + optional `_` separators). We
    // strip the underscores and feed it to std.fmt.parseFloat. An
    // unrecoverable parse here would mean the grammar accepted something
    // the float parser can't read — treat as 0 rather than panic.
    var buf: [64]u8 = undefined;
    var len: usize = 0;
    for (n.text) |c| {
        if (c == '_') continue;
        if (len >= buf.len) break;
        buf[len] = c;
        len += 1;
    }
    const slice = buf[0..len];
    const v = std.fmt.parseFloat(f64, slice) catch 0;
    return .{ .value = v, .unit = n.unit };
}

fn numberOrError(
    self: *Evaluator,
    span: ast.Span,
    what: []const u8,
    v: Value,
) ?value.Number {
    return switch (v) {
        .number => |n| n,
        else => blk: {
            self.typeError(span, what, "number", v) catch {};
            break :blk null;
        },
    };
}

fn boolOrError(
    self: *Evaluator,
    span: ast.Span,
    op: ast.BinOp,
    v: Value,
) ?bool {
    return switch (v) {
        .@"bool" => |b| b,
        else => blk: {
            self.typeError(span, binOpSymbol(op), "bool", v) catch {};
            break :blk null;
        },
    };
}

fn unitsMatch(a: ?ast.Unit, b: ?ast.Unit) bool {
    if (a == null and b == null) return true;
    if (a == null or b == null) return false;
    return a.? == b.?;
}

fn valuesEqual(a: Value, b: Value) bool {
    const ta = @as(std.meta.Tag(Value), a);
    const tb = @as(std.meta.Tag(Value), b);
    if (ta != tb) return false;
    return switch (a) {
        .nil => true,
        .number => |n| n.value == b.number.value and unitsMatch(n.unit, b.number.unit),
        .string => |s| std.mem.eql(u8, s, b.string),
        .@"bool" => |x| x == b.@"bool",
        // Aggregate equality is deferred. Returning false for non-trivial
        // forms is conservative — `==` on records/arrays/colors will get
        // real semantics once the language pins them down.
        else => false,
    };
}

fn binOpSymbol(op: ast.BinOp) []const u8 {
    return switch (op) {
        .add => "+",
        .sub => "-",
        .mul => "*",
        .div => "/",
        .mod => "%",
        .pow => "**",
        .eq => "==",
        .neq => "!=",
        .lt => "<",
        .lte => "<=",
        .gt => ">",
        .gte => ">=",
        .@"and" => "&&",
        .@"or" => "||",
    };
}

fn writeJsonStr(w: anytype, s: []const u8) !void {
    try w.writeAll("\"");
    for (s) |c| {
        switch (c) {
            '"' => try w.writeAll("\\\""),
            '\\' => try w.writeAll("\\\\"),
            '\n' => try w.writeAll("\\n"),
            '\r' => try w.writeAll("\\r"),
            '\t' => try w.writeAll("\\t"),
            0...8, 11, 12, 14...0x1f => try w.print("\\u{x:0>4}", .{c}),
            else => try w.writeByte(c),
        }
    }
    try w.writeAll("\"");
}

//
// Tests — end-to-end through parse + lower + eval.
//

const ts = @import("tree_sitter.zig");
const lower = @import("lower.zig");

fn evalSource(source: []const u8) !struct {
    arena: std.heap.ArenaAllocator,
    program: Program,
    diagnostics: []const diag.Diagnostic,
} {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    errdefer arena.deinit();

    var parsed = try ts.parse(source);
    defer parsed.deinit();

    var lowerer = lower.Lowerer.init(arena.allocator(), source);
    const program = try lowerer.lowerProgram(parsed.root());

    var evaluator = Evaluator.init(arena.allocator(), std.testing.allocator, source, "<test>");
    const result = try evaluator.evalProgram(program);
    const diagnostics_owned = try evaluator.diagnostics.toOwnedSlice(std.testing.allocator);

    return .{ .arena = arena, .program = result, .diagnostics = diagnostics_owned };
}

test "eval: numeric literal with unit" {
    var r = try evalSource("let x = 42px;");
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(usize, 1), r.program.bindings.len);
    const v = r.program.bindings[0].value;
    try std.testing.expectEqual(@as(f64, 42), v.number.value);
    try std.testing.expectEqual(ast.Unit.px, v.number.unit.?);
}

test "eval: same-unit arithmetic propagates the unit" {
    var r = try evalSource("let x = 3px + 4px;");
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(f64, 7), r.program.bindings[0].value.number.value);
    try std.testing.expectEqual(ast.Unit.px, r.program.bindings[0].value.number.unit.?);
}

test "eval: mismatched-unit arithmetic emits EVL002" {
    var r = try evalSource("let x = 3px + 4s;");
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 1), r.diagnostics.len);
    try std.testing.expectEqualStrings("EVL002", r.diagnostics[0].code);
}

test "eval: ident lookup across let bindings" {
    var r = try evalSource(
        \\let a = 10;
        \\let b = a + 5;
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(f64, 15), r.program.bindings[1].value.number.value);
}

test "eval: unresolved ident emits EVL003" {
    var r = try evalSource("let x = nope;");
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 1), r.diagnostics.len);
    try std.testing.expectEqualStrings("EVL003", r.diagnostics[0].code);
}

test "eval: color literal — hex preserved verbatim" {
    var r = try evalSource("let bg = #ff00aa;");
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqualStrings("ff00aa", r.program.bindings[0].value.color.hex.digits);
}

test "eval: color literal — oklch evaluates its components" {
    var r = try evalSource("let bg = oklch(0.10, 0.04, 280);");
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    const c = r.program.bindings[0].value.color.oklch;
    try std.testing.expectApproxEqAbs(@as(f64, 0.10), c.l.value, 1e-9);
    try std.testing.expectApproxEqAbs(@as(f64, 0.04), c.c.value, 1e-9);
    try std.testing.expectApproxEqAbs(@as(f64, 280), c.h.value, 1e-9);
}

test "eval: block-with-let introduces a local scope" {
    var r = try evalSource(
        \\let outer = {
        \\  let inner = 7;
        \\  inner * 2
        \\};
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(f64, 14), r.program.bindings[0].value.number.value);
}

test "eval: comparison + boolean logic" {
    var r = try evalSource(
        \\let a = 3 < 4 && !(5 == 6);
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(true, r.program.bindings[0].value.@"bool");
}

test "eval: function call emits EVL001 (not yet supported)" {
    var r = try evalSource("let f = rect(width: 100px);");
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expect(r.diagnostics.len >= 1);
    try std.testing.expectEqualStrings("EVL001", r.diagnostics[0].code);
}
