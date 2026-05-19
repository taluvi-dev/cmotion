//! Lowering: tree-sitter CST -> typed AST in `ast.zig`.
//!
//! The `Lowerer` owns an arena allocator (one per parse) and a reference
//! to the source buffer. Every AST node we produce either lives in the
//! arena or holds a zero-copy slice into the source, so the entire AST
//! goes away in one `arena.deinit()`.
//!
//! The mapping is mechanical: CST node kinds match the EBNF rule names,
//! field names match the `field('foo', ...)` annotations in grammar.js,
//! and tree-sitter's hidden-rule inlining (`_expr`, `_type`, `_pattern`,
//! `_literal`) means a `field('value', $._expr)` lookup returns the
//! concrete expression node directly — no wrapper to peel.

const std = @import("std");
const ast = @import("ast.zig");
const ts = @import("tree_sitter.zig");

pub const LoweringError = error{
    OutOfMemory,
    UnexpectedNodeKind,
    MissingRequiredField,
    BadOperator,
    BadColorLiteral,
};

pub const Lowerer = struct {
    arena: std.mem.Allocator,
    source: []const u8,

    pub fn init(arena: std.mem.Allocator, source: []const u8) Lowerer {
        return .{ .arena = arena, .source = source };
    }

    //
    // Entry point
    //

    pub fn lowerProgram(self: *Lowerer, root: ts.Node) LoweringError!ast.Program {
        if (!std.mem.eql(u8, ts.kind(root), "program")) return error.UnexpectedNodeKind;

        var decls: std.ArrayListUnmanaged(ast.TopDecl) = .{};
        const n = ts.namedChildCount(root);
        var i: u32 = 0;
        while (i < n) : (i += 1) {
            const child = ts.namedChild(root, i);
            if (ts.isExtra(child) or ts.isMissing(child)) continue;
            try decls.append(self.arena, try self.lowerTopDecl(child));
        }

        return .{
            .span = self.spanOf(root),
            .decls = try decls.toOwnedSlice(self.arena),
        };
    }

    //
    // Top declarations
    //

    fn lowerTopDecl(self: *Lowerer, node: ts.Node) LoweringError!ast.TopDecl {
        const k = ts.kind(node);
        if (std.mem.eql(u8, k, "import_decl")) return .{ .import = try self.lowerImportDecl(node) };
        if (std.mem.eql(u8, k, "let_decl")) return .{ .let = try self.lowerLetDecl(node) };
        if (std.mem.eql(u8, k, "component_decl")) return .{ .component = try self.lowerComponentLike(node) };
        if (std.mem.eql(u8, k, "scene_decl")) return .{ .scene = try self.lowerComponentLike(node) };
        if (std.mem.eql(u8, k, "filter_decl")) return .{ .filter = try self.lowerComponentLike(node) };
        if (std.mem.eql(u8, k, "export_decl")) return .{ .@"export" = try self.lowerExportDecl(node) };
        return error.UnexpectedNodeKind;
    }

    fn lowerImportDecl(self: *Lowerer, node: ts.Node) LoweringError!ast.ImportDecl {
        const path_node = ts.childByFieldName(node, "path") orelse return error.MissingRequiredField;
        const alias_node = ts.childByFieldName(node, "alias");
        return .{
            .span = self.spanOf(node),
            .path = try self.lowerPath(path_node),
            .alias = if (alias_node) |a| self.identOf(a) else null,
        };
    }

    fn lowerLetDecl(self: *Lowerer, node: ts.Node) LoweringError!ast.LetDecl {
        return .{
            .span = self.spanOf(node),
            .name = self.identOf(ts.childByFieldName(node, "name") orelse return error.MissingRequiredField),
            .type = if (ts.childByFieldName(node, "type")) |t| try self.lowerType(t) else null,
            .value = try self.lowerExprPtr(ts.childByFieldName(node, "value") orelse return error.MissingRequiredField),
        };
    }

    fn lowerComponentLike(self: *Lowerer, node: ts.Node) LoweringError!ast.ComponentLike {
        return .{
            .span = self.spanOf(node),
            .name = self.identOf(ts.childByFieldName(node, "name") orelse return error.MissingRequiredField),
            .params = try self.lowerParamList(ts.childByFieldName(node, "params") orelse return error.MissingRequiredField),
            .return_type = try self.lowerType(ts.childByFieldName(node, "return_type") orelse return error.MissingRequiredField),
            .body = try self.lowerBlock(ts.childByFieldName(node, "body") orelse return error.MissingRequiredField),
        };
    }

    fn lowerExportDecl(self: *Lowerer, node: ts.Node) LoweringError!ast.ExportDecl {
        return .{
            .span = self.spanOf(node),
            .name = self.identOf(ts.childByFieldName(node, "name") orelse return error.MissingRequiredField),
            .type = try self.lowerType(ts.childByFieldName(node, "type") orelse return error.MissingRequiredField),
            .value = try self.lowerExprPtr(ts.childByFieldName(node, "value") orelse return error.MissingRequiredField),
        };
    }

    //
    // Params / Block
    //

    fn lowerParamList(self: *Lowerer, node: ts.Node) LoweringError![]const ast.Param {
        var out: std.ArrayListUnmanaged(ast.Param) = .{};
        const n = ts.namedChildCount(node);
        var i: u32 = 0;
        while (i < n) : (i += 1) {
            const c = ts.namedChild(node, i);
            if (!std.mem.eql(u8, ts.kind(c), "param")) continue;
            try out.append(self.arena, try self.lowerParam(c));
        }
        return out.toOwnedSlice(self.arena);
    }

    fn lowerParam(self: *Lowerer, node: ts.Node) LoweringError!ast.Param {
        return .{
            .span = self.spanOf(node),
            .name = self.identOf(ts.childByFieldName(node, "name") orelse return error.MissingRequiredField),
            .type = try self.lowerType(ts.childByFieldName(node, "type") orelse return error.MissingRequiredField),
            .default = if (ts.childByFieldName(node, "default")) |d| try self.lowerExprPtr(d) else null,
        };
    }

    fn lowerBlock(self: *Lowerer, node: ts.Node) LoweringError!ast.Block {
        var lets: std.ArrayListUnmanaged(ast.LetDecl) = .{};
        const n = ts.namedChildCount(node);
        var i: u32 = 0;
        while (i < n) : (i += 1) {
            const c = ts.namedChild(node, i);
            if (std.mem.eql(u8, ts.kind(c), "let_decl")) {
                try lets.append(self.arena, try self.lowerLetDecl(c));
            }
        }
        const result = ts.childByFieldName(node, "result") orelse return error.MissingRequiredField;
        return .{
            .span = self.spanOf(node),
            .lets = try lets.toOwnedSlice(self.arena),
            .result = try self.lowerExprPtr(result),
        };
    }

    //
    // Types
    //

    fn lowerType(self: *Lowerer, node: ts.Node) LoweringError!ast.Type {
        const k = ts.kind(node);
        if (std.mem.eql(u8, k, "simple_type")) {
            const name_node = ts.namedChild(node, 0);
            var args: []const ast.Type = &.{};
            if (ts.childByFieldName(node, "args") == null) {
                // type_args isn't fielded in our grammar; look for it as a named child.
                const nc = ts.namedChildCount(node);
                if (nc >= 2) {
                    const second = ts.namedChild(node, 1);
                    if (std.mem.eql(u8, ts.kind(second), "type_args")) {
                        args = try self.lowerTypeArgs(second);
                    }
                }
            }
            return .{ .simple = .{
                .span = self.spanOf(node),
                .name = self.identOf(name_node),
                .args = args,
            } };
        }
        if (std.mem.eql(u8, k, "tuple_type")) {
            var elems: std.ArrayListUnmanaged(ast.Type) = .{};
            const n = ts.namedChildCount(node);
            var i: u32 = 0;
            while (i < n) : (i += 1) {
                try elems.append(self.arena, try self.lowerType(ts.namedChild(node, i)));
            }
            return .{ .tuple = .{
                .span = self.spanOf(node),
                .elems = try elems.toOwnedSlice(self.arena),
            } };
        }
        if (std.mem.eql(u8, k, "record_type")) {
            var fields: std.ArrayListUnmanaged(ast.RecordTypeField) = .{};
            const n = ts.namedChildCount(node);
            var i: u32 = 0;
            while (i < n) : (i += 1) {
                const f = ts.namedChild(node, i);
                if (!std.mem.eql(u8, ts.kind(f), "record_type_field")) continue;
                try fields.append(self.arena, .{
                    .name = self.identOf(ts.childByFieldName(f, "name") orelse return error.MissingRequiredField),
                    .type = try self.lowerType(ts.childByFieldName(f, "type") orelse return error.MissingRequiredField),
                });
            }
            return .{ .record = .{
                .span = self.spanOf(node),
                .fields = try fields.toOwnedSlice(self.arena),
            } };
        }
        if (std.mem.eql(u8, k, "function_type")) {
            // The grammar emits an arrow plus a trailing return type. The
            // return type is the *last* named child; everything before it
            // (if any) is a parameter type.
            const n = ts.namedChildCount(node);
            if (n == 0) return error.MissingRequiredField;
            var params: std.ArrayListUnmanaged(ast.Type) = .{};
            var i: u32 = 0;
            while (i + 1 < n) : (i += 1) {
                try params.append(self.arena, try self.lowerType(ts.namedChild(node, i)));
            }
            const ret_node = ts.namedChild(node, n - 1);
            const ret_ptr = try self.arena.create(ast.Type);
            ret_ptr.* = try self.lowerType(ret_node);
            return .{ .function = .{
                .span = self.spanOf(node),
                .params = try params.toOwnedSlice(self.arena),
                .ret = ret_ptr,
            } };
        }
        return error.UnexpectedNodeKind;
    }

    fn lowerTypeArgs(self: *Lowerer, node: ts.Node) LoweringError![]const ast.Type {
        var out: std.ArrayListUnmanaged(ast.Type) = .{};
        const n = ts.namedChildCount(node);
        var i: u32 = 0;
        while (i < n) : (i += 1) {
            try out.append(self.arena, try self.lowerType(ts.namedChild(node, i)));
        }
        return out.toOwnedSlice(self.arena);
    }

    //
    // Patterns
    //

    fn lowerPattern(self: *Lowerer, node: ts.Node) LoweringError!ast.Pattern {
        const k = ts.kind(node);
        if (std.mem.eql(u8, k, "identifier")) return .{ .ident = self.identOf(node) };
        if (std.mem.eql(u8, k, "wildcard_pattern")) return .{ .wildcard = self.spanOf(node) };
        // Otherwise it's a literal — let the literal lowerer handle dispatch.
        return .{ .literal = try self.lowerLiteral(node) };
    }

    //
    // Expressions
    //

    fn lowerExprPtr(self: *Lowerer, node: ts.Node) LoweringError!*const ast.Expr {
        const ptr = try self.arena.create(ast.Expr);
        ptr.* = try self.lowerExpr(node);
        return ptr;
    }

    fn lowerExpr(self: *Lowerer, node: ts.Node) LoweringError!ast.Expr {
        const k = ts.kind(node);

        // Literals
        if (std.mem.eql(u8, k, "number_lit") or
            std.mem.eql(u8, k, "string_lit") or
            std.mem.eql(u8, k, "bool_lit") or
            std.mem.eql(u8, k, "color_lit"))
        {
            return .{ .literal = try self.lowerLiteral(node) };
        }

        if (std.mem.eql(u8, k, "identifier")) return .{ .ident = self.identOf(node) };

        if (std.mem.eql(u8, k, "paren_expr")) {
            return .{ .paren = .{
                .span = self.spanOf(node),
                .inner = try self.lowerExprPtr(ts.namedChild(node, 0)),
            } };
        }

        // Binary expressions — node kind names the precedence family, the
        // `op` field carries the actual operator text.
        if (std.mem.startsWith(u8, k, "binary_expr_")) {
            const left = ts.childByFieldName(node, "left") orelse return error.MissingRequiredField;
            const right = ts.childByFieldName(node, "right") orelse return error.MissingRequiredField;
            const op_node = ts.childByFieldName(node, "op") orelse return error.MissingRequiredField;
            return .{ .binary = .{
                .span = self.spanOf(node),
                .op = try parseBinOp(ts.sourceSlice(op_node, self.source)),
                .left = try self.lowerExprPtr(left),
                .right = try self.lowerExprPtr(right),
            } };
        }

        if (std.mem.eql(u8, k, "unary_expr")) {
            const op_node = ts.childByFieldName(node, "op") orelse return error.MissingRequiredField;
            const operand = ts.childByFieldName(node, "operand") orelse return error.MissingRequiredField;
            return .{ .unary = .{
                .span = self.spanOf(node),
                .op = try parseUnaryOp(ts.sourceSlice(op_node, self.source)),
                .operand = try self.lowerExprPtr(operand),
            } };
        }

        if (std.mem.eql(u8, k, "field_access")) {
            return .{ .field_access = .{
                .span = self.spanOf(node),
                .receiver = try self.lowerExprPtr(ts.childByFieldName(node, "receiver") orelse return error.MissingRequiredField),
                .name = self.identOf(ts.childByFieldName(node, "name") orelse return error.MissingRequiredField),
            } };
        }

        if (std.mem.eql(u8, k, "method_call")) {
            return .{ .method_call = .{
                .span = self.spanOf(node),
                .receiver = try self.lowerExprPtr(ts.childByFieldName(node, "receiver") orelse return error.MissingRequiredField),
                .name = self.identOf(ts.childByFieldName(node, "name") orelse return error.MissingRequiredField),
                .args = try self.lowerArgList(ts.childByFieldName(node, "args") orelse return error.MissingRequiredField),
            } };
        }

        if (std.mem.eql(u8, k, "call_expr")) {
            return .{ .call = .{
                .span = self.spanOf(node),
                .callee = try self.lowerExprPtr(ts.childByFieldName(node, "callee") orelse return error.MissingRequiredField),
                .args = try self.lowerArgList(ts.childByFieldName(node, "args") orelse return error.MissingRequiredField),
            } };
        }

        if (std.mem.eql(u8, k, "index_expr")) {
            return .{ .index = .{
                .span = self.spanOf(node),
                .receiver = try self.lowerExprPtr(ts.childByFieldName(node, "receiver") orelse return error.MissingRequiredField),
                .index = try self.lowerExprPtr(ts.childByFieldName(node, "index") orelse return error.MissingRequiredField),
            } };
        }

        if (std.mem.eql(u8, k, "if_expr")) {
            const cond = ts.childByFieldName(node, "condition") orelse return error.MissingRequiredField;
            const then_node = ts.childByFieldName(node, "then") orelse return error.MissingRequiredField;
            const else_node = ts.childByFieldName(node, "else");
            var else_branch: ?ast.ElseBranch = null;
            if (else_node) |en| {
                if (std.mem.eql(u8, ts.kind(en), "if_expr")) {
                    else_branch = .{ .if_ = try self.lowerExprPtr(en) };
                } else {
                    else_branch = .{ .block = try self.lowerBlock(en) };
                }
            }
            return .{ .if_ = .{
                .span = self.spanOf(node),
                .condition = try self.lowerExprPtr(cond),
                .then = try self.lowerBlock(then_node),
                .else_branch = else_branch,
            } };
        }

        if (std.mem.eql(u8, k, "match_expr")) {
            const subject = ts.childByFieldName(node, "subject") orelse return error.MissingRequiredField;
            var arms: std.ArrayListUnmanaged(ast.MatchArm) = .{};
            const n = ts.namedChildCount(node);
            var i: u32 = 0;
            while (i < n) : (i += 1) {
                const c = ts.namedChild(node, i);
                if (!std.mem.eql(u8, ts.kind(c), "match_arm")) continue;
                try arms.append(self.arena, .{
                    .pattern = try self.lowerPattern(ts.childByFieldName(c, "pattern") orelse return error.MissingRequiredField),
                    .body = try self.lowerExprPtr(ts.childByFieldName(c, "body") orelse return error.MissingRequiredField),
                });
            }
            return .{ .match = .{
                .span = self.spanOf(node),
                .subject = try self.lowerExprPtr(subject),
                .arms = try arms.toOwnedSlice(self.arena),
            } };
        }

        if (std.mem.eql(u8, k, "lambda")) {
            var params: std.ArrayListUnmanaged(ast.Param) = .{};
            const n = ts.namedChildCount(node);
            var i: u32 = 0;
            while (i < n) : (i += 1) {
                const c = ts.namedChild(node, i);
                if (std.mem.eql(u8, ts.kind(c), "param")) {
                    try params.append(self.arena, try self.lowerParam(c));
                }
            }
            const ret_node = ts.childByFieldName(node, "return_type");
            const body_node = ts.childByFieldName(node, "body") orelse return error.MissingRequiredField;
            return .{ .lambda = .{
                .span = self.spanOf(node),
                .params = try params.toOwnedSlice(self.arena),
                .return_type = if (ret_node) |rn| try self.lowerType(rn) else null,
                .body = try self.lowerBlock(body_node),
            } };
        }

        if (std.mem.eql(u8, k, "animate_expr")) {
            var keyframes: std.ArrayListUnmanaged(ast.KeyFrame) = .{};
            const n = ts.namedChildCount(node);
            var i: u32 = 0;
            while (i < n) : (i += 1) {
                const c = ts.namedChild(node, i);
                if (!std.mem.eql(u8, ts.kind(c), "keyframe")) continue;
                try keyframes.append(self.arena, .{
                    .at = try self.lowerExprPtr(ts.childByFieldName(c, "at") orelse return error.MissingRequiredField),
                    .value = try self.lowerExprPtr(ts.childByFieldName(c, "value") orelse return error.MissingRequiredField),
                });
            }
            const opts_node = ts.childByFieldName(node, "opts");
            const opts: ?[]const ast.RecordInit = if (opts_node) |on|
                try self.lowerRecordInits(on)
            else
                null;
            return .{ .animate = .{
                .span = self.spanOf(node),
                .keyframes = try keyframes.toOwnedSlice(self.arena),
                .opts = opts,
            } };
        }

        if (std.mem.eql(u8, k, "compose_expr")) {
            var layers: std.ArrayListUnmanaged(ast.Expr) = .{};
            const n = ts.namedChildCount(node);
            var i: u32 = 0;
            while (i < n) : (i += 1) {
                try layers.append(self.arena, try self.lowerExpr(ts.namedChild(node, i)));
            }
            return .{ .compose = .{
                .span = self.spanOf(node),
                .layers = try layers.toOwnedSlice(self.arena),
            } };
        }

        if (std.mem.eql(u8, k, "record_expr")) {
            return .{ .record = .{
                .span = self.spanOf(node),
                .inits = try self.lowerRecordInits(node),
            } };
        }

        if (std.mem.eql(u8, k, "array_expr")) {
            var elems: std.ArrayListUnmanaged(ast.Expr) = .{};
            const n = ts.namedChildCount(node);
            var i: u32 = 0;
            while (i < n) : (i += 1) {
                try elems.append(self.arena, try self.lowerExpr(ts.namedChild(node, i)));
            }
            return .{ .array = .{
                .span = self.spanOf(node),
                .elems = try elems.toOwnedSlice(self.arena),
            } };
        }

        if (std.mem.eql(u8, k, "block")) {
            return .{ .block = try self.lowerBlock(node) };
        }

        return error.UnexpectedNodeKind;
    }

    fn lowerArgList(self: *Lowerer, node: ts.Node) LoweringError![]const ast.Arg {
        var out: std.ArrayListUnmanaged(ast.Arg) = .{};
        const n = ts.namedChildCount(node);
        var i: u32 = 0;
        while (i < n) : (i += 1) {
            const c = ts.namedChild(node, i);
            if (!std.mem.eql(u8, ts.kind(c), "arg")) continue;
            const name_node = ts.childByFieldName(c, "name");
            const value_node = ts.childByFieldName(c, "value") orelse return error.MissingRequiredField;
            try out.append(self.arena, .{
                .span = self.spanOf(c),
                .name = if (name_node) |n_| self.identOf(n_) else null,
                .value = try self.lowerExprPtr(value_node),
            });
        }
        return out.toOwnedSlice(self.arena);
    }

    fn lowerRecordInits(self: *Lowerer, node: ts.Node) LoweringError![]const ast.RecordInit {
        var out: std.ArrayListUnmanaged(ast.RecordInit) = .{};
        const n = ts.namedChildCount(node);
        var i: u32 = 0;
        while (i < n) : (i += 1) {
            const c = ts.namedChild(node, i);
            if (!std.mem.eql(u8, ts.kind(c), "record_init")) continue;
            try out.append(self.arena, .{
                .name = self.identOf(ts.childByFieldName(c, "name") orelse return error.MissingRequiredField),
                .value = try self.lowerExprPtr(ts.childByFieldName(c, "value") orelse return error.MissingRequiredField),
            });
        }
        return out.toOwnedSlice(self.arena);
    }

    //
    // Literals
    //

    fn lowerLiteral(self: *Lowerer, node: ts.Node) LoweringError!ast.Literal {
        const k = ts.kind(node);
        if (std.mem.eql(u8, k, "number_lit")) {
            const raw = ts.sourceSlice(node, self.source);
            const unit = matchUnitSuffix(raw);
            const text = if (unit) |u| raw[0 .. raw.len - unitLen(u)] else raw;
            return .{ .number = .{
                .span = self.spanOf(node),
                .text = text,
                .unit = unit,
            } };
        }
        if (std.mem.eql(u8, k, "string_lit")) {
            return .{ .string = .{ .span = self.spanOf(node), .raw = ts.sourceSlice(node, self.source) } };
        }
        if (std.mem.eql(u8, k, "bool_lit")) {
            const raw = ts.sourceSlice(node, self.source);
            return .{ .@"bool" = .{ .span = self.spanOf(node), .value = std.mem.eql(u8, raw, "true") } };
        }
        if (std.mem.eql(u8, k, "color_lit")) {
            return .{ .color = try self.lowerColor(node) };
        }
        return error.UnexpectedNodeKind;
    }

    fn lowerColor(self: *Lowerer, node: ts.Node) LoweringError!ast.Color {
        const raw = ts.sourceSlice(node, self.source);
        if (raw.len == 0) return error.BadColorLiteral;

        if (raw[0] == '#') {
            return .{ .hex = .{
                .span = self.spanOf(node),
                .digits = raw[1..],
            } };
        }

        // Function-call colour forms. Field names (l/c/h, l/a/b, r/g/b)
        // disambiguate which constructor was used.
        if (std.mem.startsWith(u8, raw, "oklch")) {
            return .{ .oklch = .{
                .span = self.spanOf(node),
                .l = try self.lowerExprPtr(ts.childByFieldName(node, "l") orelse return error.BadColorLiteral),
                .c = try self.lowerExprPtr(ts.childByFieldName(node, "c") orelse return error.BadColorLiteral),
                .h = try self.lowerExprPtr(ts.childByFieldName(node, "h") orelse return error.BadColorLiteral),
            } };
        }
        if (std.mem.startsWith(u8, raw, "oklab")) {
            return .{ .oklab = .{
                .span = self.spanOf(node),
                .l = try self.lowerExprPtr(ts.childByFieldName(node, "l") orelse return error.BadColorLiteral),
                .a = try self.lowerExprPtr(ts.childByFieldName(node, "a") orelse return error.BadColorLiteral),
                .b = try self.lowerExprPtr(ts.childByFieldName(node, "b") orelse return error.BadColorLiteral),
            } };
        }
        if (std.mem.startsWith(u8, raw, "srgb")) {
            return .{ .srgb = .{
                .span = self.spanOf(node),
                .r = try self.lowerExprPtr(ts.childByFieldName(node, "r") orelse return error.BadColorLiteral),
                .g = try self.lowerExprPtr(ts.childByFieldName(node, "g") orelse return error.BadColorLiteral),
                .b = try self.lowerExprPtr(ts.childByFieldName(node, "b") orelse return error.BadColorLiteral),
            } };
        }
        return error.BadColorLiteral;
    }

    //
    // Paths
    //

    fn lowerPath(self: *Lowerer, node: ts.Node) LoweringError!ast.Path {
        var segments: std.ArrayListUnmanaged(ast.Ident) = .{};
        const n = ts.namedChildCount(node);
        var i: u32 = 0;
        while (i < n) : (i += 1) {
            const c = ts.namedChild(node, i);
            if (!std.mem.eql(u8, ts.kind(c), "identifier")) continue;
            try segments.append(self.arena, self.identOf(c));
        }
        const raw = ts.sourceSlice(node, self.source);
        const glob = std.mem.endsWith(u8, raw, ".*");
        return .{
            .span = self.spanOf(node),
            .segments = try segments.toOwnedSlice(self.arena),
            .glob = glob,
        };
    }

    //
    // Leaf helpers
    //

    fn identOf(self: *Lowerer, node: ts.Node) ast.Ident {
        return .{
            .span = self.spanOf(node),
            .name = ts.sourceSlice(node, self.source),
        };
    }

    fn spanOf(self: *Lowerer, node: ts.Node) ast.Span {
        _ = self;
        return .{
            .start = ts.startByte(node),
            .end = ts.endByte(node),
        };
    }
};

//
// Operator parsing — pulled out as free fns so they're trivially testable.
//

fn parseBinOp(s: []const u8) LoweringError!ast.BinOp {
    if (std.mem.eql(u8, s, "||")) return .@"or";
    if (std.mem.eql(u8, s, "&&")) return .@"and";
    if (std.mem.eql(u8, s, "==")) return .eq;
    if (std.mem.eql(u8, s, "!=")) return .neq;
    if (std.mem.eql(u8, s, "<")) return .lt;
    if (std.mem.eql(u8, s, "<=")) return .lte;
    if (std.mem.eql(u8, s, ">")) return .gt;
    if (std.mem.eql(u8, s, ">=")) return .gte;
    if (std.mem.eql(u8, s, "+")) return .add;
    if (std.mem.eql(u8, s, "-")) return .sub;
    if (std.mem.eql(u8, s, "*")) return .mul;
    if (std.mem.eql(u8, s, "/")) return .div;
    if (std.mem.eql(u8, s, "%")) return .mod;
    if (std.mem.eql(u8, s, "**")) return .pow;
    return error.BadOperator;
}

fn parseUnaryOp(s: []const u8) LoweringError!ast.UnaryOp {
    if (std.mem.eql(u8, s, "-")) return .neg;
    if (std.mem.eql(u8, s, "!")) return .not;
    return error.BadOperator;
}

/// Match the longest valid unit suffix on a number literal's source bytes.
/// Returns null if the literal has no unit (a plain number).
fn matchUnitSuffix(raw: []const u8) ?ast.Unit {
    // Order matters: longest match first so "khz" beats "hz" and
    // "beats" beats "s".
    const table = [_]struct { suffix: []const u8, unit: ast.Unit }{
        .{ .suffix = "beats", .unit = .beats },
        .{ .suffix = "bars", .unit = .bars },
        .{ .suffix = "turn", .unit = .turn },
        .{ .suffix = "khz", .unit = .khz },
        .{ .suffix = "bpm", .unit = .bpm },
        .{ .suffix = "deg", .unit = .deg },
        .{ .suffix = "rad", .unit = .rad },
        .{ .suffix = "ms", .unit = .ms },
        .{ .suffix = "us", .unit = .us },
        .{ .suffix = "ns", .unit = .ns },
        .{ .suffix = "hz", .unit = .hz },
        .{ .suffix = "px", .unit = .px },
        .{ .suffix = "%", .unit = .percent },
        .{ .suffix = "s", .unit = .s },
    };
    for (table) |e| if (std.mem.endsWith(u8, raw, e.suffix)) return e.unit;
    return null;
}

fn unitLen(u: ast.Unit) usize {
    return switch (u) {
        .beats => 5,
        .bars, .turn => 4,
        .khz, .bpm, .deg, .rad => 3,
        .ms, .us, .ns, .hz, .px => 2,
        .s, .percent => 1,
    };
}

test "binop parsing" {
    try std.testing.expectEqual(ast.BinOp.add, try parseBinOp("+"));
    try std.testing.expectEqual(ast.BinOp.pow, try parseBinOp("**"));
    try std.testing.expectEqual(ast.BinOp.@"or", try parseBinOp("||"));
    try std.testing.expectError(error.BadOperator, parseBinOp("???"));
}

test "unit suffix matching" {
    try std.testing.expectEqual(@as(?ast.Unit, .ms), matchUnitSuffix("500ms"));
    try std.testing.expectEqual(@as(?ast.Unit, .khz), matchUnitSuffix("44khz"));
    try std.testing.expectEqual(@as(?ast.Unit, .hz), matchUnitSuffix("60hz"));
    try std.testing.expectEqual(@as(?ast.Unit, .beats), matchUnitSuffix("4beats"));
    try std.testing.expectEqual(@as(?ast.Unit, .s), matchUnitSuffix("6s"));
    try std.testing.expectEqual(@as(?ast.Unit, null), matchUnitSuffix("3.14"));
}
