//! Name resolution — the first real stage of `cmo check`.
//!
//! Scope of this pass:
//!   - NAM003: unknown identifier. Walks every expression and flags any
//!     `ident` whose name isn't in scope. Suppressed when any
//!     `use path.*` wildcard import is in effect, since we don't have
//!     module manifests yet.
//!   - NAM005: duplicate top-level declaration. Two `component foo` or
//!     two imports landing on the same local name.
//!   - NAM006: duplicate parameter name in a signature.
//!
//! Out of scope (for now): types, units, forward-reference rules inside
//! a block, fuzzy-suggest for typos.

const std = @import("std");
const ast = @import("ast.zig");
const diag = @import("diagnostics.zig");

const SymbolKind = enum {
    import,
    let,
    component,
    scene,
    filter,
    @"export",
    param,
};

const Symbol = struct {
    name: []const u8,
    span: ast.Span,
    kind: SymbolKind,
};

const Scope = struct {
    parent: ?*const Scope,
    symbols: std.StringHashMapUnmanaged(Symbol) = .{},
    /// Inherited along the chain so any scope query can ask once.
    has_wildcard_import: bool,

    fn lookup(self: *const Scope, name: []const u8) ?Symbol {
        if (self.symbols.get(name)) |s| return s;
        if (self.parent) |p| return p.lookup(name);
        return null;
    }
};

pub const Checker = struct {
    allocator: std.mem.Allocator,
    source: []const u8,
    path: []const u8,
    diagnostics: std.ArrayListUnmanaged(diag.Diagnostic) = .{},

    pub fn init(allocator: std.mem.Allocator, source: []const u8, path: []const u8) Checker {
        return .{ .allocator = allocator, .source = source, .path = path };
    }

    pub fn check(self: *Checker, program: ast.Program) ![]const diag.Diagnostic {
        var top: Scope = .{ .parent = null, .has_wildcard_import = false };
        defer top.symbols.deinit(self.allocator);

        // Pass 1: collect every name a program-level scope can resolve.
        // Top decls are mutually visible (forward references between
        // components/scenes are fine), so we hoist them all before
        // walking any body.
        for (program.decls) |decl| {
            try self.collectTopName(&top, decl);
        }

        // Pass 2: walk each body against the populated top scope.
        for (program.decls) |decl| {
            try self.checkTopDecl(decl, &top);
        }

        return self.diagnostics.toOwnedSlice(self.allocator);
    }

    //
    // Pass 1: build the top-level symbol table.
    //

    fn collectTopName(self: *Checker, scope: *Scope, decl: ast.TopDecl) !void {
        switch (decl) {
            .import => |imp| {
                if (imp.path.glob) {
                    scope.has_wildcard_import = true;
                    return;
                }
                const local_name = if (imp.alias) |a|
                    a.name
                else if (imp.path.segments.len > 0)
                    imp.path.segments[imp.path.segments.len - 1].name
                else
                    return;
                try self.declare(scope, local_name, .import, imp.span);
            },
            .let => |d| try self.declare(scope, d.name.name, .let, d.name.span),
            .component => |d| try self.declare(scope, d.name.name, .component, d.name.span),
            .scene => |d| try self.declare(scope, d.name.name, .scene, d.name.span),
            .filter => |d| try self.declare(scope, d.name.name, .filter, d.name.span),
            .@"export" => |d| try self.declare(scope, d.name.name, .@"export", d.name.span),
        }
    }

    fn declare(self: *Checker, scope: *Scope, name: []const u8, kind: SymbolKind, span: ast.Span) !void {
        const gop = try scope.symbols.getOrPut(self.allocator, name);
        if (gop.found_existing) {
            try self.emitDuplicate(name, span, gop.value_ptr.*.span);
            return;
        }
        gop.value_ptr.* = .{ .name = name, .span = span, .kind = kind };
    }

    fn emitDuplicate(self: *Checker, name: []const u8, span: ast.Span, prior: ast.Span) !void {
        const loc = span.location(self.source);
        const prior_loc = prior.location(self.source);
        try self.diagnostics.append(self.allocator, .{
            .code = "NAM005",
            .message = try std.fmt.allocPrint(
                self.allocator,
                "duplicate top-level declaration '{s}'",
                .{name},
            ),
            .span = .{
                .path = self.path,
                .line = loc.line,
                .column = loc.column,
                .length = span.end - span.start,
            },
            .expected = "exactly one declaration per top-level name",
            .actual = try std.fmt.allocPrint(
                self.allocator,
                "name '{s}' previously declared at line {d} column {d}",
                .{ name, prior_loc.line, prior_loc.column },
            ),
            .help = "rename one of the declarations, or remove the duplicate",
            .fix_safety = .@"api-changing",
            .repair = .{
                .id = "rename-duplicate",
                .summary = "Pick a unique name for this declaration.",
            },
        });
    }

    //
    // Pass 2: walk bodies.
    //

    fn checkTopDecl(self: *Checker, decl: ast.TopDecl, parent: *const Scope) !void {
        switch (decl) {
            .import => {},
            .let => |d| try self.checkExpr(d.value.*, parent),
            .component, .scene, .filter => |d| try self.checkComponentLike(d, parent),
            .@"export" => |d| try self.checkExpr(d.value.*, parent),
        }
    }

    fn checkComponentLike(self: *Checker, d: ast.ComponentLike, parent: *const Scope) !void {
        var body_scope: Scope = .{
            .parent = parent,
            .has_wildcard_import = parent.has_wildcard_import,
        };
        defer body_scope.symbols.deinit(self.allocator);

        for (d.params) |p| {
            try self.declareParam(&body_scope, p);
            if (p.default) |def| try self.checkExpr(def.*, parent); // defaults see only the outer scope
        }

        try self.checkBlock(d.body, &body_scope);
    }

    fn declareParam(self: *Checker, scope: *Scope, p: ast.Param) !void {
        const gop = try scope.symbols.getOrPut(self.allocator, p.name.name);
        if (gop.found_existing) {
            const loc = p.name.span.location(self.source);
            const prior_loc = gop.value_ptr.*.span.location(self.source);
            try self.diagnostics.append(self.allocator, .{
                .code = "NAM006",
                .message = try std.fmt.allocPrint(
                    self.allocator,
                    "duplicate parameter name '{s}'",
                    .{p.name.name},
                ),
                .span = .{
                    .path = self.path,
                    .line = loc.line,
                    .column = loc.column,
                    .length = p.name.span.end - p.name.span.start,
                },
                .expected = "each parameter name appears once in a signature",
                .actual = try std.fmt.allocPrint(
                    self.allocator,
                    "name '{s}' already used at line {d} column {d}",
                    .{ p.name.name, prior_loc.line, prior_loc.column },
                ),
                .help = "rename this parameter",
                .fix_safety = .@"api-changing",
                .repair = .{
                    .id = "rename-duplicate-param",
                    .summary = "Give this parameter a unique name within the signature.",
                },
            });
            return;
        }
        gop.value_ptr.* = .{ .name = p.name.name, .span = p.name.span, .kind = .param };
    }

    fn checkBlock(self: *Checker, block: ast.Block, parent: *const Scope) !void {
        var block_scope: Scope = .{
            .parent = parent,
            .has_wildcard_import = parent.has_wildcard_import,
        };
        defer block_scope.symbols.deinit(self.allocator);

        // Block lets are sequential — check the value against the
        // currently-visible names, THEN declare. That preserves
        // `let x = x + 1` as an error (NAM003 on the rhs).
        for (block.lets) |l| {
            try self.checkExpr(l.value.*, &block_scope);
            const gop = try block_scope.symbols.getOrPut(self.allocator, l.name.name);
            if (!gop.found_existing) {
                gop.value_ptr.* = .{ .name = l.name.name, .span = l.name.span, .kind = .let };
            }
        }

        try self.checkExpr(block.result.*, &block_scope);
    }

    //
    // Expression walk.
    //

    fn checkExpr(self: *Checker, expr: ast.Expr, scope: *const Scope) anyerror!void {
        switch (expr) {
            .literal => |lit| try self.checkLiteral(lit, scope),
            .ident => |id| try self.checkIdent(id, scope),
            .paren => |p| try self.checkExpr(p.inner.*, scope),
            .binary => |b| {
                try self.checkExpr(b.left.*, scope);
                try self.checkExpr(b.right.*, scope);
            },
            .unary => |u| try self.checkExpr(u.operand.*, scope),
            .call => |c| {
                try self.checkExpr(c.callee.*, scope);
                for (c.args) |a| try self.checkExpr(a.value.*, scope);
            },
            .method_call => |m| {
                try self.checkExpr(m.receiver.*, scope);
                // .name is the method name; resolution against the type is
                // the typechecker's job once it exists. Skip.
                for (m.args) |a| try self.checkExpr(a.value.*, scope);
            },
            .field_access => |f| try self.checkExpr(f.receiver.*, scope),
            .index => |i| {
                try self.checkExpr(i.receiver.*, scope);
                try self.checkExpr(i.index.*, scope);
            },
            .if_ => |if_e| {
                try self.checkExpr(if_e.condition.*, scope);
                try self.checkBlock(if_e.then, scope);
                if (if_e.else_branch) |eb| switch (eb) {
                    .block => |b| try self.checkBlock(b, scope),
                    .if_ => |e| try self.checkExpr(e.*, scope),
                };
            },
            .match => |m| {
                try self.checkExpr(m.subject.*, scope);
                // Patterns can bind names; for the scaffold we treat
                // ident-patterns as binders rather than references.
                for (m.arms) |arm| try self.checkMatchArm(arm, scope);
            },
            .lambda => |l| try self.checkLambda(l, scope),
            .animate => |a| {
                for (a.keyframes) |kf| {
                    try self.checkExpr(kf.at.*, scope);
                    try self.checkExpr(kf.value.*, scope);
                }
                if (a.opts) |opts| for (opts) |o| try self.checkExpr(o.value.*, scope);
            },
            .compose => |c| for (c.layers) |layer| try self.checkExpr(layer, scope),
            .record => |r| for (r.inits) |ri| try self.checkExpr(ri.value.*, scope),
            .array => |a| for (a.elems) |elem| try self.checkExpr(elem, scope),
            .block => |b| try self.checkBlock(b, scope),
        }
    }

    fn checkLiteral(self: *Checker, lit: ast.Literal, scope: *const Scope) !void {
        // The only literal that holds sub-expressions is a color in its
        // oklch/oklab/srgb form.
        switch (lit) {
            .number, .string, .@"bool" => {},
            .color => |c| switch (c) {
                .hex => {},
                .oklch => |x| {
                    try self.checkExpr(x.l.*, scope);
                    try self.checkExpr(x.c.*, scope);
                    try self.checkExpr(x.h.*, scope);
                },
                .oklab => |x| {
                    try self.checkExpr(x.l.*, scope);
                    try self.checkExpr(x.a.*, scope);
                    try self.checkExpr(x.b.*, scope);
                },
                .srgb => |x| {
                    try self.checkExpr(x.r.*, scope);
                    try self.checkExpr(x.g.*, scope);
                    try self.checkExpr(x.b.*, scope);
                },
            },
        }
    }

    fn checkIdent(self: *Checker, id: ast.Ident, scope: *const Scope) !void {
        if (scope.lookup(id.name) != null) return;
        if (scope.has_wildcard_import) return;

        const loc = id.span.location(self.source);
        try self.diagnostics.append(self.allocator, .{
            .code = "NAM003",
            .message = try std.fmt.allocPrint(self.allocator, "unknown identifier '{s}'", .{id.name}),
            .span = .{
                .path = self.path,
                .line = loc.line,
                .column = loc.column,
                .length = id.span.end - id.span.start,
            },
            .expected = "visible local, parameter, top-level declaration, or imported name",
            .actual = try std.fmt.allocPrint(self.allocator, "no visible symbol named '{s}'", .{id.name}),
            .help = "declare the name before using it, or import the module that exports it",
            .fix_safety = .@"local-edit",
            .repair = .{
                .id = "declare-or-import",
                .summary = "Add a let-binding or `use ...` for this name.",
            },
        });
    }

    fn checkMatchArm(self: *Checker, arm: ast.MatchArm, scope: *const Scope) !void {
        // Treat ident-patterns as binders, not references. Anything
        // else in a pattern (literal, wildcard) is a value/structural
        // form — nothing to resolve.
        switch (arm.pattern) {
            .ident => |id| {
                var arm_scope: Scope = .{
                    .parent = scope,
                    .has_wildcard_import = scope.has_wildcard_import,
                };
                defer arm_scope.symbols.deinit(self.allocator);
                _ = try arm_scope.symbols.getOrPut(self.allocator, id.name);
                arm_scope.symbols.getPtr(id.name).?.* = .{
                    .name = id.name,
                    .span = id.span,
                    .kind = .let,
                };
                try self.checkExpr(arm.body.*, &arm_scope);
            },
            .literal, .wildcard => try self.checkExpr(arm.body.*, scope),
        }
    }

    fn checkLambda(self: *Checker, l: ast.Lambda, parent: *const Scope) !void {
        var body_scope: Scope = .{
            .parent = parent,
            .has_wildcard_import = parent.has_wildcard_import,
        };
        defer body_scope.symbols.deinit(self.allocator);

        for (l.params) |p| {
            try self.declareParam(&body_scope, p);
            if (p.default) |def| try self.checkExpr(def.*, parent);
        }

        try self.checkBlock(l.body, &body_scope);
    }
};
