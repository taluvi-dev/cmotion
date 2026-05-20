//! Cmotion reference interpreter — stage 4.
//!
//! Tree-walking evaluator over the typed AST. Covers every expression
//! form the EBNF (GRAMMAR.md / https://cmotion.org/language/grammar/#ebnf)
//! defines: literals, identifiers, paren, unary, binary, blocks-with-let,
//! arrays, records, indexing, field access, if / else, match, function
//! calls (positional + named args with defaults), method chains,
//! `animate { ... }` and `compose [ ... ]` syntactic forms, and lambdas
//! with lexical closure capture. Top-level scenes / components / filters
//! whose params all have defaults are invoked automatically.
//!
//! Calls to names that aren't bound at eval time (e.g. `rect(...)` in a
//! file with `use std.shapes.*;`) become typed `Constructed` staging
//! values that carry the call's name and evaluated args verbatim. The
//! renderer (stage 6) is responsible for matching on these — every value
//! a program produces is a description, never a pixel.
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
            .scene, .component, .filter => |cl| {
                // Invoke the body when every parameter has a default —
                // that's the only safe way to drive it from the top
                // level without a user-supplied argument set. Components
                // with required params get skipped silently for now;
                // a future `cmo eval --scene name --args k=v` flag will
                // let the caller supply them.
                if (!allParamsHaveDefaults(cl.params)) continue;
                const v = try self.invokeComponent(cl, &top);
                try top.names.put(self.gpa, cl.name.name, v);
                try bindings.append(self.gpa, .{
                    .name = cl.name.name,
                    .value = v,
                    .span = cl.span,
                });
            },
            .@"export" => |e| {
                const v = try self.evalExpr(e.value.*, &top);
                try top.names.put(self.gpa, e.name.name, v);
                try bindings.append(self.gpa, .{
                    .name = e.name.name,
                    .value = v,
                    .span = e.span,
                });
            },
            .import => {},
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
            .array => |a| try self.evalArray(a, scope),
            .record => |r| try self.evalRecord(r, scope),
            .index => |idx| try self.evalIndex(idx, scope),
            .field_access => |fa| try self.evalFieldAccess(fa, scope),
            .if_ => |i| try self.evalIf(i, scope),
            .match => |m| try self.evalMatch(m, scope),
            .call => |c| try self.evalCall(c, scope),
            .method_call => |mc| try self.evalMethodCall(mc, scope),
            .animate => |a| try self.evalAnimate(a, scope),
            .compose => |c| try self.evalCompose(c, scope),
            .lambda => |l| try self.evalLambda(l, scope),
        };
    }

    fn evalLambda(self: *Evaluator, l: ast.Lambda, scope: *Scope) EvalError!Value {
        const captured = try self.snapshotScope(scope);
        return .{ .lambda = .{
            .params = l.params,
            .body = l.body,
            .captured = captured,
        } };
    }

    /// Walk the scope chain inner-to-outer, collecting every visible
    /// binding into an arena-allocated slice. Inner names shadow outer
    /// ones (we only record a name the first time we see it).
    fn snapshotScope(self: *Evaluator, scope: *Scope) EvalError![]const value.Field {
        var seen = std.StringHashMap(Value).init(self.gpa);
        defer seen.deinit();
        var current: ?*const Scope = scope;
        while (current) |s| {
            var it = s.names.iterator();
            while (it.next()) |entry| {
                const gop = try seen.getOrPut(entry.key_ptr.*);
                if (!gop.found_existing) gop.value_ptr.* = entry.value_ptr.*;
            }
            current = s.parent;
        }
        const fields = try self.arena.alloc(value.Field, seen.count());
        var it2 = seen.iterator();
        var i: usize = 0;
        while (it2.next()) |entry| : (i += 1) {
            fields[i] = .{ .name = entry.key_ptr.*, .value = entry.value_ptr.* };
        }
        return fields;
    }

    //
    // Calls + stdlib staging
    //
    // Today's policy: the v0 interpreter has no callable Value type.
    // Every call expression therefore resolves to a `Value.constructed`
    // staging record — the callee's syntactic name plus the evaluated
    // arguments. This lets samples that lean on the stdlib (`rect(...)`,
    // `vec3(...)`, `text.glyph(...)`, ...) evaluate cleanly without
    // having to type every constructor up front. The renderer (stage 6)
    // can decide which constructed names it understands; the rest stay
    // as opaque records the interpreter has preserved verbatim.

    fn evalCall(self: *Evaluator, c: ast.Call, scope: *Scope) EvalError!Value {
        if (try self.constructorName(c.callee.*, scope)) |name| {
            const fields = try self.evalArgs(c.args, scope, null);
            return .{ .constructed = .{ .name = name, .fields = fields } };
        }
        const callee = try self.evalExpr(c.callee.*, scope);
        switch (callee) {
            .lambda => |l| return self.invokeLambda(l, c.args, scope, c.span),
            else => {
                try self.notCallable(c.span, callee);
                return .nil;
            },
        }
    }

    /// Invoke a closure: bind the call's arguments to the lambda's
    /// params (positional, then named, then defaults), build a scope
    /// chain over the captured snapshot, and evaluate the body.
    fn invokeLambda(
        self: *Evaluator,
        lambda: value.Lambda,
        args: []const ast.Arg,
        caller_scope: *Scope,
        call_span: ast.Span,
    ) EvalError!Value {
        var captured_scope = Scope{ .parent = null };
        defer captured_scope.names.deinit(self.gpa);
        for (lambda.captured) |f| try captured_scope.names.put(self.gpa, f.name, f.value);

        var params_scope = Scope{ .parent = &captured_scope };
        defer params_scope.names.deinit(self.gpa);
        try self.bindArgs(lambda.params, args, caller_scope, &params_scope, call_span);

        return self.evalBlock(lambda.body, &params_scope);
    }

    fn bindArgs(
        self: *Evaluator,
        params: []const ast.Param,
        args: []const ast.Arg,
        caller_scope: *Scope,
        target: *Scope,
        call_span: ast.Span,
    ) EvalError!void {
        // Track which call args have already been bound to a param so
        // a name can't be double-consumed (and so we can later warn
        // about leftover args — TODO when we add EVL005 for that).
        const consumed = try self.gpa.alloc(bool, args.len);
        defer self.gpa.free(consumed);
        @memset(consumed, false);

        for (params) |p| {
            var picked: ?usize = null;
            // First, a named arg whose name matches this param.
            for (args, 0..) |a, i| {
                if (consumed[i]) continue;
                if (a.name) |n| if (std.mem.eql(u8, n.name, p.name.name)) {
                    picked = i;
                    break;
                };
            }
            // Otherwise, the next unconsumed positional arg.
            if (picked == null) {
                for (args, 0..) |a, i| {
                    if (consumed[i]) continue;
                    if (a.name == null) {
                        picked = i;
                        break;
                    }
                }
            }

            const v: Value = if (picked) |i| blk: {
                consumed[i] = true;
                break :blk try self.evalExpr(args[i].value.*, caller_scope);
            } else if (p.default) |d|
                // Defaults evaluate in the lambda's scope (with params
                // bound so far). That matches the obvious reading: a
                // later param's default can reference an earlier one.
                try self.evalExpr(d.*, target)
            else blk: {
                try self.missingArg(call_span, p.name.name);
                break :blk .nil;
            };

            try target.names.put(self.gpa, p.name.name, v);
        }
    }

    fn evalMethodCall(self: *Evaluator, mc: ast.MethodCall, scope: *Scope) EvalError!Value {
        // `text.glyph(...)` parses as a method_call but is really a
        // namespace call — same shape as `text.glyph` were a single
        // dotted name. Detect that by checking whether the receiver is
        // itself a name path rooted at an unresolved ident; if so,
        // treat the whole thing as `Constructed("text.glyph", args)`
        // without evaluating the receiver. Otherwise it's a real method
        // call: evaluate the receiver, prepend it as a positional `self`.
        if (try self.constructorPath(mc.receiver.*, scope)) |root| {
            const name = try std.fmt.allocPrint(self.arena, "{s}.{s}", .{ root, mc.name.name });
            const fields = try self.evalArgs(mc.args, scope, null);
            return .{ .constructed = .{ .name = name, .fields = fields } };
        }
        const receiver = try self.evalExpr(mc.receiver.*, scope);
        const fields = try self.evalArgs(mc.args, scope, receiver);
        return .{ .constructed = .{ .name = mc.name.name, .fields = fields } };
    }

    /// Evaluate a call's argument list into a flat `Field` slice. Positional
    /// args use the empty string for the name (the staging convention).
    /// `prepend_self` is non-null for method calls: that value becomes the
    /// first positional field, before any source-level args.
    fn evalArgs(
        self: *Evaluator,
        args: []const ast.Arg,
        scope: *Scope,
        prepend_self: ?Value,
    ) EvalError![]const value.Field {
        const extra: usize = if (prepend_self != null) 1 else 0;
        const fields = try self.arena.alloc(value.Field, args.len + extra);
        if (prepend_self) |s| {
            fields[0] = .{ .name = "", .value = s };
        }
        for (args, 0..) |a, i| {
            const v = try self.evalExpr(a.value.*, scope);
            const name = if (a.name) |n| n.name else "";
            fields[i + extra] = .{ .name = name, .value = v };
        }
        return fields;
    }

    /// If the callee expression looks like an unresolved name path (an
    /// ident, or a chain of `.field` accesses rooted at an unresolved
    /// ident), return the dotted path as the constructor name. Otherwise
    /// return null — the caller will treat it as a real value-style call.
    fn constructorName(self: *Evaluator, callee: ast.Expr, scope: *Scope) EvalError!?[]const u8 {
        switch (callee) {
            .ident => |id| {
                if (scope.lookup(id.name) != null) return null;
                return id.name;
            },
            .field_access => |fa| {
                const root = try self.constructorPath(fa.receiver.*, scope) orelse return null;
                return try std.fmt.allocPrint(self.arena, "{s}.{s}", .{ root, fa.name.name });
            },
            else => return null,
        }
    }

    fn constructorPath(self: *Evaluator, expr: ast.Expr, scope: *Scope) EvalError!?[]const u8 {
        switch (expr) {
            .ident => |id| {
                if (scope.lookup(id.name) != null) return null;
                return id.name;
            },
            .field_access => |fa| {
                const root = try self.constructorPath(fa.receiver.*, scope) orelse return null;
                return try std.fmt.allocPrint(self.arena, "{s}.{s}", .{ root, fa.name.name });
            },
            else => return null,
        }
    }

    fn evalAnimate(self: *Evaluator, a: ast.Animate, scope: *Scope) EvalError!Value {
        // Encode keyframes as an array of records {at, value}. The opts
        // (the `with { ... }` clause) become a single record value, or
        // nil when absent. The result is a Constructed("animate", ...)
        // — symmetric with how the renderer will see other staged calls.
        const keyframe_elems = try self.arena.alloc(Value, a.keyframes.len);
        for (a.keyframes, 0..) |kf, i| {
            const kf_fields = try self.arena.alloc(value.Field, 2);
            kf_fields[0] = .{ .name = "at", .value = try self.evalExpr(kf.at.*, scope) };
            kf_fields[1] = .{ .name = "value", .value = try self.evalExpr(kf.value.*, scope) };
            keyframe_elems[i] = .{ .record = .{ .fields = kf_fields } };
        }
        const opts_value: Value = if (a.opts) |inits| blk: {
            const fs = try self.arena.alloc(value.Field, inits.len);
            for (inits, 0..) |ri, i| fs[i] = .{
                .name = ri.name.name,
                .value = try self.evalExpr(ri.value.*, scope),
            };
            break :blk .{ .record = .{ .fields = fs } };
        } else .nil;
        const fields = try self.arena.alloc(value.Field, 2);
        fields[0] = .{ .name = "keyframes", .value = .{ .array = .{ .elems = keyframe_elems } } };
        fields[1] = .{ .name = "opts", .value = opts_value };
        return .{ .constructed = .{ .name = "animate", .fields = fields } };
    }

    fn evalCompose(self: *Evaluator, c: ast.Compose, scope: *Scope) EvalError!Value {
        const elems = try self.arena.alloc(Value, c.layers.len);
        for (c.layers, 0..) |layer, i| elems[i] = try self.evalExpr(layer, scope);
        const fields = try self.arena.alloc(value.Field, 1);
        fields[0] = .{ .name = "layers", .value = .{ .array = .{ .elems = elems } } };
        return .{ .constructed = .{ .name = "compose", .fields = fields } };
    }

    fn evalArray(self: *Evaluator, a: ast.ArrayExpr, scope: *Scope) EvalError!Value {
        const elems = try self.arena.alloc(Value, a.elems.len);
        for (a.elems, 0..) |e, i| elems[i] = try self.evalExpr(e, scope);
        return .{ .array = .{ .elems = elems } };
    }

    fn evalRecord(self: *Evaluator, r: ast.RecordExpr, scope: *Scope) EvalError!Value {
        const fields = try self.arena.alloc(value.Field, r.inits.len);
        for (r.inits, 0..) |ri, i| {
            fields[i] = .{
                .name = ri.name.name,
                .value = try self.evalExpr(ri.value.*, scope),
            };
        }
        return .{ .record = .{ .fields = fields } };
    }

    fn evalIndex(self: *Evaluator, idx: ast.Index, scope: *Scope) EvalError!Value {
        const receiver = try self.evalExpr(idx.receiver.*, scope);
        const index = try self.evalExpr(idx.index.*, scope);
        switch (receiver) {
            .array => |arr| {
                const n = numberOrError(self, idx.span, "array index", index) orelse return .nil;
                if (n.unit != null) {
                    try self.typeError(idx.span, "array index", "unitless integer", index);
                    return .nil;
                }
                const i: i64 = @intFromFloat(n.value);
                if (i < 0 or @as(usize, @intCast(i)) >= arr.elems.len) {
                    try self.outOfBounds(idx.span, i, arr.elems.len);
                    return .nil;
                }
                return arr.elems[@intCast(i)];
            },
            .record => |rec| {
                // String-keyed indexing into a record (`r["field"]`). The
                // raw payload includes the surrounding quotes, so strip
                // them before comparing.
                if (index != .string) {
                    try self.typeError(idx.span, "record index", "string", index);
                    return .nil;
                }
                const key = stripQuotes(index.string);
                for (rec.fields) |f| if (std.mem.eql(u8, f.name, key)) return f.value;
                try self.fieldMissing(idx.span, key);
                return .nil;
            },
            else => {
                try self.typeError(idx.span, "indexing", "array or record", receiver);
                return .nil;
            },
        }
    }

    fn evalFieldAccess(self: *Evaluator, fa: ast.FieldAccess, scope: *Scope) EvalError!Value {
        // If the receiver is a chain of dotted names rooted at an
        // unresolved ident (e.g. `easing.out_cubic`), the whole thing
        // is a namespace reference, not a record access — return a
        // zero-arg Constructed staging value so the renderer still
        // sees the name.
        if (try self.constructorPath(fa.receiver.*, scope)) |root| {
            const name = try std.fmt.allocPrint(self.arena, "{s}.{s}", .{ root, fa.name.name });
            return .{ .constructed = .{ .name = name, .fields = &.{} } };
        }
        const receiver = try self.evalExpr(fa.receiver.*, scope);
        switch (receiver) {
            .record => |rec| {
                for (rec.fields) |f| if (std.mem.eql(u8, f.name, fa.name.name)) return f.value;
                try self.fieldMissing(fa.span, fa.name.name);
                return .nil;
            },
            .constructed => {
                // The receiver is a staged value (e.g. `bounce(...)`) that
                // won't be a real record until the sampler resolves it.
                // Defer the access: emit `field_of(self, name)`; the sampler
                // samples `self` first and then extracts the field.
                const fields = try self.arena.alloc(value.Field, 2);
                fields[0] = .{ .name = "self", .value = receiver };
                const quoted = try std.fmt.allocPrint(self.arena, "\"{s}\"", .{fa.name.name});
                fields[1] = .{ .name = "name", .value = .{ .string = quoted } };
                return .{ .constructed = .{ .name = "field_of", .fields = fields } };
            },
            else => {
                try self.typeError(fa.span, "field access", "record", receiver);
                return .nil;
            },
        }
    }

    fn evalIf(self: *Evaluator, i: ast.If, scope: *Scope) EvalError!Value {
        const cond = try self.evalExpr(i.condition.*, scope);
        const truthy = switch (cond) {
            .@"bool" => |b| b,
            else => {
                try self.typeError(i.span, "if condition", "bool", cond);
                return .nil;
            },
        };
        if (truthy) return self.evalBlock(i.then, scope);
        if (i.else_branch) |eb| return switch (eb) {
            .block => |blk| self.evalBlock(blk, scope),
            .if_ => |e| self.evalExpr(e.*, scope),
        };
        return .nil;
    }

    fn evalMatch(self: *Evaluator, m: ast.Match, scope: *Scope) EvalError!Value {
        const subject = try self.evalExpr(m.subject.*, scope);
        for (m.arms) |arm| switch (arm.pattern) {
            .wildcard => return self.evalExpr(arm.body.*, scope),
            .ident => |id| {
                // Bind the subject under the pattern name in a fresh scope.
                var bound = Scope{ .parent = scope };
                defer bound.names.deinit(self.gpa);
                try bound.names.put(self.gpa, id.name, subject);
                return self.evalExpr(arm.body.*, &bound);
            },
            .literal => |lit| {
                const lit_value = try self.evalLiteral(lit, scope);
                if (valuesEqual(subject, lit_value)) {
                    return self.evalExpr(arm.body.*, scope);
                }
            },
        };
        // No arm matched. Report it under EVL002 — the value lies outside
        // the match's covered set, a runtime type error at this stage.
        try self.noMatchingArm(m.span, subject);
        return .nil;
    }

    /// Invoke a scene/component/filter at the top level with every
    /// parameter bound to its default value. The body is a `Block`;
    /// we evaluate it in a fresh scope that chains to the top-level
    /// scope `parent`.
    fn invokeComponent(
        self: *Evaluator,
        decl: ast.ComponentLike,
        parent: *Scope,
    ) EvalError!Value {
        var params_scope = Scope{ .parent = parent };
        defer params_scope.names.deinit(self.gpa);
        for (decl.params) |p| {
            const default = p.default orelse continue;
            const v = try self.evalExpr(default.*, parent);
            try params_scope.names.put(self.gpa, p.name.name, v);
        }
        return self.evalBlock(decl.body, &params_scope);
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
        // Unresolved bare ident: promote to a zero-arg `Constructed`
        // staging value. Without module manifests we can't tell a real
        // typo from a name brought in by `use std.foo.*;`, so the
        // interpreter defers that judgement to `cmo check` (NAM003).
        // EVL003 stays reserved in the explain table for when modules
        // land and we can tell the two apart.
        _ = self;
        return .{ .constructed = .{ .name = id.name, .fields = &.{} } };
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
                .l = try self.evalToBoxedValue(v.l.*, scope),
                .c = try self.evalToBoxedValue(v.c.*, scope),
                .h = try self.evalToBoxedValue(v.h.*, scope),
            } } },
            .oklab => |v| .{ .color = .{ .oklab = .{
                .l = try self.evalToBoxedValue(v.l.*, scope),
                .a = try self.evalToBoxedValue(v.a.*, scope),
                .b = try self.evalToBoxedValue(v.b.*, scope),
            } } },
            .srgb => |v| .{ .color = .{ .srgb = .{
                .r = try self.evalToBoxedValue(v.r.*, scope),
                .g = try self.evalToBoxedValue(v.g.*, scope),
                .b = try self.evalToBoxedValue(v.b.*, scope),
            } } },
        };
    }

    /// Evaluate `expr` in `scope` and store the resulting `Value` in the
    /// arena, returning a pointer to it. Used for value positions that
    /// the AST models with `*const Expr` and that we need to expose as
    /// `*const Value` on the runtime side (e.g. color components).
    fn evalToBoxedValue(
        self: *Evaluator,
        expr: ast.Expr,
        scope: *Scope,
    ) EvalError!*const Value {
        const v = try self.evalExpr(expr, scope);
        const slot = try self.arena.create(Value);
        slot.* = v;
        return slot;
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

    fn outOfBounds(self: *Evaluator, span: ast.Span, i: i64, len: usize) EvalError!void {
        const loc = span.location(self.source);
        const msg = try std.fmt.allocPrint(
            self.arena,
            "array index {d} is out of bounds (length {d})",
            .{ i, len },
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
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "fix-index",
                .summary = "Use an index in the range [0, length).",
            },
        });
    }

    fn fieldMissing(self: *Evaluator, span: ast.Span, name: []const u8) EvalError!void {
        const loc = span.location(self.source);
        const msg = try std.fmt.allocPrint(
            self.arena,
            "record has no field '{s}'",
            .{name},
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
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "add-or-rename-field",
                .summary = "Add the field to the record literal, or rename the access to an existing field.",
            },
        });
    }

    fn missingArg(self: *Evaluator, span: ast.Span, name: []const u8) EvalError!void {
        const loc = span.location(self.source);
        const msg = try std.fmt.allocPrint(
            self.arena,
            "missing required argument '{s}'",
            .{name},
        );
        try self.diagnostics.append(self.gpa, .{
            .code = "EVL004",
            .message = msg,
            .span = .{
                .path = self.path,
                .line = loc.line,
                .column = loc.column,
                .length = span.end - span.start,
            },
            .expected = name,
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "supply-argument",
                .summary = "Pass a value for this parameter, either positionally or as a named argument.",
            },
        });
    }

    fn notCallable(self: *Evaluator, span: ast.Span, callee: Value) EvalError!void {
        const loc = span.location(self.source);
        const tag = @tagName(@as(std.meta.Tag(Value), callee));
        const msg = try std.fmt.allocPrint(
            self.arena,
            "value of kind '{s}' is not callable",
            .{tag},
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
            .help = "the v0 interpreter has no callable Value type; only syntactic name paths (e.g. `rect(...)`, `text.glyph(...)`) become staged constructor records",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "use-named-constructor",
                .summary = "Replace the call with a named constructor, or wait for closure support in a later commit.",
            },
        });
    }

    fn noMatchingArm(self: *Evaluator, span: ast.Span, subject: Value) EvalError!void {
        const loc = span.location(self.source);
        const tag = @tagName(@as(std.meta.Tag(Value), subject));
        const msg = try std.fmt.allocPrint(
            self.arena,
            "match has no arm for subject of kind '{s}'",
            .{tag},
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
            .help = "add an arm covering this value, or a trailing `_ =>` wildcard arm",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "add-match-arm",
                .summary = "Add a match arm whose pattern matches this value, or a `_` wildcard.",
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

fn allParamsHaveDefaults(params: []const ast.Param) bool {
    for (params) |p| if (p.default == null) return false;
    return true;
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

fn stripQuotes(raw: []const u8) []const u8 {
    if (raw.len >= 2 and raw[0] == '"' and raw[raw.len - 1] == '"') {
        return raw[1 .. raw.len - 1];
    }
    return raw;
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

test "eval: unresolved ident becomes a staging Constructed value" {
    var r = try evalSource("let x = forever;");
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqualStrings("forever", r.program.bindings[0].value.constructed.name);
    try std.testing.expectEqual(@as(usize, 0), r.program.bindings[0].value.constructed.fields.len);
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
    try std.testing.expectApproxEqAbs(@as(f64, 0.10), c.l.number.value, 1e-9);
    try std.testing.expectApproxEqAbs(@as(f64, 0.04), c.c.number.value, 1e-9);
    try std.testing.expectApproxEqAbs(@as(f64, 280), c.h.number.value, 1e-9);
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

test "eval: bare call becomes a staged Constructed value" {
    var r = try evalSource("let r = rect(width: 100px, height: 50px);");
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    const c = r.program.bindings[0].value.constructed;
    try std.testing.expectEqualStrings("rect", c.name);
    try std.testing.expectEqual(@as(usize, 2), c.fields.len);
    try std.testing.expectEqualStrings("width", c.fields[0].name);
    try std.testing.expectEqual(ast.Unit.px, c.fields[0].value.number.unit.?);
}

test "eval: namespace path becomes a dotted constructor name" {
    var r = try evalSource("let g = text.glyph(\"C\");");
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqualStrings("text.glyph", r.program.bindings[0].value.constructed.name);
}

test "eval: method chain stacks Constructed values" {
    var r = try evalSource(
        \\let glyph = extrude("C").material(fill: #ff0000).rotate(y: 90deg);
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    const outer = r.program.bindings[0].value.constructed;
    try std.testing.expectEqualStrings("rotate", outer.name);
    // First field is the implicit positional receiver — itself a
    // Constructed("material", ...) wrapping Constructed("extrude", ...).
    const material = outer.fields[0].value.constructed;
    try std.testing.expectEqualStrings("material", material.name);
    const extrude = material.fields[0].value.constructed;
    try std.testing.expectEqualStrings("extrude", extrude.name);
}

test "eval: animate syntactic form becomes Constructed(\"animate\", ...)" {
    var r = try evalSource(
        \\let rot = animate { 0s => 0deg, 6s => 360deg } with { repeat: forever };
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    const c = r.program.bindings[0].value.constructed;
    try std.testing.expectEqualStrings("animate", c.name);
    try std.testing.expectEqualStrings("keyframes", c.fields[0].name);
    try std.testing.expectEqual(@as(usize, 2), c.fields[0].value.array.elems.len);
    try std.testing.expectEqualStrings("opts", c.fields[1].name);
}

test "eval: compose syntactic form becomes Constructed(\"compose\", layers)" {
    var r = try evalSource(
        \\let frame = compose [
        \\  rect(width: 100px),
        \\  rect(width: 200px),
        \\];
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    const c = r.program.bindings[0].value.constructed;
    try std.testing.expectEqualStrings("compose", c.name);
    try std.testing.expectEqual(@as(usize, 2), c.fields[0].value.array.elems.len);
}

test "eval: calling a bound value emits EVL002 (not callable)" {
    var r = try evalSource(
        \\let n = 1;
        \\let oops = n(2);
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 1), r.diagnostics.len);
    try std.testing.expectEqualStrings("EVL002", r.diagnostics[0].code);
}

test "eval: scene with all-default params is invoked at top level" {
    var r = try evalSource(
        \\scene title(duration: Duration = 6s) -> Frame {
        \\  let bg = rect(width: 1920px, height: 1080px);
        \\  compose [bg]
        \\}
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(usize, 1), r.program.bindings.len);
    try std.testing.expectEqualStrings("title", r.program.bindings[0].name);
    try std.testing.expectEqualStrings("compose", r.program.bindings[0].value.constructed.name);
}

test "eval: scene with a required param is skipped" {
    var r = try evalSource(
        \\scene title(label: String) -> Frame {
        \\  compose [rect(width: 100px)]
        \\}
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(usize, 0), r.program.bindings.len);
}

test "eval: animated color component evaluates without complaint" {
    var r = try evalSource(
        \\let hue = animate { 0s => 280deg, 4s => 640deg };
        \\let c = oklch(0.5, 0.2, hue);
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    const c = r.program.bindings[1].value.color.oklch;
    try std.testing.expectEqualStrings("animate", c.h.constructed.name);
}

test "eval: lambda binds positional args and evaluates its body" {
    var r = try evalSource(
        \\let add = |a: Number, b: Number| { a + b };
        \\let total = add(3, 4);
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(f64, 7), r.program.bindings[1].value.number.value);
}

test "eval: lambda mixes positional and named args" {
    var r = try evalSource(
        \\let f = |a: Number, b: Number, c: Number| { a * 100 + b * 10 + c };
        \\let x = f(1, c: 3, b: 2);
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(f64, 123), r.program.bindings[1].value.number.value);
}

test "eval: lambda parameter default fires when the arg is omitted" {
    var r = try evalSource(
        \\let f = |a: Number, b: Number = 10| { a + b };
        \\let x = f(5);
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(f64, 15), r.program.bindings[1].value.number.value);
}

test "eval: missing required argument emits EVL004" {
    // Body intentionally doesn't use `b` so we get exactly one
    // diagnostic — using nil for the missing arg downstream would
    // cascade into EVL002s that aren't what this test is checking.
    var r = try evalSource(
        \\let f = |a: Number, b: Number| { a };
        \\let x = f(1);
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 1), r.diagnostics.len);
    try std.testing.expectEqualStrings("EVL004", r.diagnostics[0].code);
}

test "eval: lambda closes over its lexical environment" {
    var r = try evalSource(
        \\let outer = 100;
        \\let add_outer = |x: Number| { x + outer };
        \\let r = add_outer(5);
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(f64, 105), r.program.bindings[2].value.number.value);
}

test "eval: lambda captures snapshot — later let doesn't leak in" {
    // The closure captures `x` as it was when the lambda evaluated, so
    // shadowing `x` later (or never seeing it at all) leaves the
    // closure's view intact.
    var r = try evalSource(
        \\let inner = {
        \\  let x = 1;
        \\  let f = |y: Number| { x + y };
        \\  f(10)
        \\};
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(f64, 11), r.program.bindings[0].value.number.value);
}

test "eval: taste sample from index.mdx evaluates to a Frame with no diagnostics" {
    const taste =
        \\use std.shapes.*;
        \\use std.mesh3d.*;
        \\use std.text;
        \\use std.lighting.*;
        \\use std.scene3d.*;
        \\use std.anim.*;
        \\
        \\scene title(duration: Duration = 6s) -> Frame {
        \\  let bg = rect(width: 1920px, height: 1080px, fill: oklch(0.10, 0.04, 280));
        \\
        \\  let rot   = animate { 0s => 0deg,   6s => 360deg } with { repeat: forever };
        \\  let hue   = animate { 0s => 280deg, 4s => 640deg } with { repeat: forever };
        \\  let pulse = animate {
        \\                0s    => 1.00,
        \\                500ms => 1.06,
        \\                1s    => 1.00,
        \\              } with { easing: easing.out_cubic, repeat: forever };
        \\
        \\  let wobble = wave(amplitude: 8.6deg, period: 12s);
        \\
        \\  let glyph = extrude(text.glyph("C", font: "Inter Bold"), depth: 80px)
        \\                .material(fill: oklch(0.78, 0.20, hue),
        \\                          metalness: 0.25,
        \\                          roughness: 0.35)
        \\                .rotate(x: wobble, y: rot)
        \\                .scale(pulse);
        \\
        \\  let lights = [
        \\    ambient(0.35),
        \\    directional(from: vec3(3, 4, 5),    intensity: 1.6),
        \\    directional(from: vec3(-4, -2, -3), intensity: 0.9),
        \\  ];
        \\
        \\  compose [
        \\    bg,
        \\    render3d(glyph, lights: lights),
        \\  ]
        \\}
    ;
    var r = try evalSource(taste);
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(usize, 1), r.program.bindings.len);
    try std.testing.expectEqualStrings("title", r.program.bindings[0].name);
    try std.testing.expectEqualStrings("compose", r.program.bindings[0].value.constructed.name);
}

test "eval: array literal" {
    var r = try evalSource("let xs = [1, 2, 3];");
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    const arr = r.program.bindings[0].value.array;
    try std.testing.expectEqual(@as(usize, 3), arr.elems.len);
    try std.testing.expectEqual(@as(f64, 2), arr.elems[1].number.value);
}

test "eval: record literal and field access" {
    var r = try evalSource(
        \\let r = { x: 10, y: 20 };
        \\let y = r.y;
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(f64, 20), r.program.bindings[1].value.number.value);
}

test "eval: missing record field emits EVL002" {
    var r = try evalSource(
        \\let r = { x: 1 };
        \\let z = r.nope;
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 1), r.diagnostics.len);
    try std.testing.expectEqualStrings("EVL002", r.diagnostics[0].code);
}

test "eval: array indexing" {
    var r = try evalSource(
        \\let xs = [10, 20, 30];
        \\let mid = xs[1];
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(f64, 20), r.program.bindings[1].value.number.value);
}

test "eval: array index out of bounds emits EVL002" {
    var r = try evalSource(
        \\let xs = [1, 2];
        \\let bad = xs[5];
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 1), r.diagnostics.len);
    try std.testing.expectEqualStrings("EVL002", r.diagnostics[0].code);
}

test "eval: if/else picks the right branch" {
    var r = try evalSource(
        \\let a = if 1 < 2 { 10 } else { 20 };
        \\let b = if false { 1 } else if false { 2 } else { 3 };
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(f64, 10), r.program.bindings[0].value.number.value);
    try std.testing.expectEqual(@as(f64, 3), r.program.bindings[1].value.number.value);
}

test "eval: match on literal patterns" {
    var r = try evalSource(
        \\let x = match 2 {
        \\  1 => 100,
        \\  2 => 200,
        \\  _ => 999,
        \\};
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(f64, 200), r.program.bindings[0].value.number.value);
}

test "eval: match with ident pattern binds the subject" {
    var r = try evalSource(
        \\let x = match 7 {
        \\  n => n + 1,
        \\};
    );
    defer r.arena.deinit();
    defer std.testing.allocator.free(r.diagnostics);

    try std.testing.expectEqual(@as(usize, 0), r.diagnostics.len);
    try std.testing.expectEqual(@as(f64, 8), r.program.bindings[0].value.number.value);
}
