//! Name resolution + a narrow type-annotation check — `cmo check`.
//!
//! Scope of this pass:
//!   - NAM003: unknown identifier. Walks every expression and flags any
//!     `ident` whose name isn't in scope. Suppressed when any
//!     `use path.*` wildcard import is in effect, since we don't have
//!     module manifests yet.
//!   - NAM004: forward reference to a block-local `let` that's declared
//!     later in the same block (`let a = b; let b = 1;`). We pre-scan
//!     each block so an unresolved ident can be upgraded from NAM003
//!     to NAM004 with a cross-reference to where the binding actually
//!     lives. `let x = x + 1` still fires NAM003 (the name truly isn't
//!     visible — it's not "future" either, it doesn't exist yet).
//!   - NAM005: duplicate top-level declaration. Two `component foo` or
//!     two imports landing on the same local name.
//!   - NAM006: duplicate parameter name in a signature.
//!   - TYP002: literal value doesn't match an annotated type. Fires
//!     only when both sides are inferable: a `simple_type` whose name
//!     names a known category (String / Bool / Color / Number / unit-
//!     bearing) and a literal value (number / string / bool / color).
//!     Skipped when the value is a call, ident, or anything else that
//!     needs real type inference — that's the full typechecker's job.
//!   - UNT001: unit-category mismatch within the number family. Fires
//!     when both sides are number-side AND the annotation pins a unit
//!     category (Duration -> time, Angle -> angle, ...) AND the literal
//!     carries a unit whose category doesn't match.
//!   - UNT002: missing required unit. Fires when the annotation pins a
//!     non-`.none` unit category AND the literal has no unit suffix
//!     at all (`let timeout: Duration = 42`). The repair names the
//!     canonical unit for the category so an agent can fix it in one
//!     edit (`42` -> `42s` for Duration).
//!
//! Out of scope (for now): unit-category matching (UNT* codes), generic
//! types, function types, real inference, forward-reference rules in
//! blocks, fuzzy-suggest for typos.

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
    /// Names that WILL be declared later in this block scope. Only set
    /// during a block walk. Consulted by `checkIdent` when a name fails
    /// `lookup` — a hit here turns NAM003 into NAM004 (forward reference).
    future_names: ?*const std.StringHashMapUnmanaged(ast.Span) = null,

    fn lookup(self: *const Scope, name: []const u8) ?Symbol {
        if (self.symbols.get(name)) |s| return s;
        if (self.parent) |p| return p.lookup(name);
        return null;
    }

    fn lookupFuture(self: *const Scope, name: []const u8) ?ast.Span {
        if (self.future_names) |fns| if (fns.get(name)) |s| return s;
        if (self.parent) |p| return p.lookupFuture(name);
        return null;
    }
};

/// Coarse type categories the literal checker can compare. Unit-bearing
/// types all collapse to `.number` here; the unit-category check (UNT*)
/// will land as its own pass.
const Category = enum { number, string, @"bool", color, unknown };

fn nameToCategory(name: []const u8) Category {
    if (std.mem.eql(u8, name, "String")) return .string;
    if (std.mem.eql(u8, name, "Bool")) return .@"bool";
    if (std.mem.eql(u8, name, "Color")) return .color;
    const number_names = [_][]const u8{
        "Number", "Int", "Float",
        // Unit-bearing types — all numbers as far as TYP002 is concerned.
        "Duration", "Time", "Angle", "Length", "Pixels",
        "Frequency", "Tempo", "Bars", "Beats", "Percent",
    };
    for (number_names) |s| if (std.mem.eql(u8, name, s)) return .number;
    return .unknown;
}

fn literalCategory(lit: ast.Literal) Category {
    return switch (lit) {
        .number => .number,
        .string => .string,
        .@"bool" => .@"bool",
        .color => .color,
    };
}

fn categoryName(c: Category) []const u8 {
    return switch (c) {
        .number => "number",
        .string => "string",
        .@"bool" => "bool",
        .color => "color",
        .unknown => "unknown",
    };
}

/// Unit categories, mirroring the families in /language/types/. `.none`
/// stands for an unmarked number literal — the `Number` / `Int` / `Float`
/// row of the table.
const UnitCategory = enum {
    none,
    time,
    angle,
    length,
    percent,
    frequency,
    tempo,
    bars,
    beats,
};

fn unitCategory(u: ast.Unit) UnitCategory {
    return switch (u) {
        .s, .ms, .us, .ns => .time,
        .hz, .khz => .frequency,
        .deg, .rad, .turn => .angle,
        .px => .length,
        .percent => .percent,
        .bpm => .tempo,
        .bars => .bars,
        .beats => .beats,
    };
}

/// Map a type name to the unit category its values must inhabit, or null
/// if the name doesn't pin a unit category (so UNT001 stays silent).
fn nameToUnitCategory(name: []const u8) ?UnitCategory {
    if (std.mem.eql(u8, name, "Duration") or std.mem.eql(u8, name, "Time")) return .time;
    if (std.mem.eql(u8, name, "Angle")) return .angle;
    if (std.mem.eql(u8, name, "Length") or std.mem.eql(u8, name, "Pixels")) return .length;
    if (std.mem.eql(u8, name, "Percent")) return .percent;
    if (std.mem.eql(u8, name, "Frequency")) return .frequency;
    if (std.mem.eql(u8, name, "Tempo")) return .tempo;
    if (std.mem.eql(u8, name, "Bars")) return .bars;
    if (std.mem.eql(u8, name, "Beats")) return .beats;
    if (std.mem.eql(u8, name, "Number") or std.mem.eql(u8, name, "Int") or std.mem.eql(u8, name, "Float")) return .none;
    return null;
}

fn unitCategoryName(c: UnitCategory) []const u8 {
    return switch (c) {
        .none => "unitless",
        .time => "Time",
        .angle => "Angle",
        .length => "Length",
        .percent => "Percent",
        .frequency => "Frequency",
        .tempo => "Tempo",
        .bars => "Bars",
        .beats => "Beats",
    };
}

fn unitName(u: ast.Unit) []const u8 {
    return switch (u) {
        .s => "s",
        .ms => "ms",
        .us => "us",
        .ns => "ns",
        .hz => "hz",
        .khz => "khz",
        .deg => "deg",
        .rad => "rad",
        .turn => "turn",
        .px => "px",
        .percent => "%",
        .bpm => "bpm",
        .bars => "bars",
        .beats => "beats",
    };
}

/// Canonical unit per category, used to suggest a concrete repair for
/// UNT002. Pick the one a working designer reaches for first.
fn defaultUnitFor(c: UnitCategory) ?[]const u8 {
    return switch (c) {
        .none => null,
        .time => "s",
        .angle => "deg",
        .length => "px",
        .percent => "%",
        .frequency => "hz",
        .tempo => "bpm",
        .bars => "bars",
        .beats => "beats",
    };
}

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
            .let => |d| {
                try self.checkExpr(d.value.*, parent);
                try self.checkLetAnnotation(d);
            },
            .component, .scene, .filter => |d| try self.checkComponentLike(d, parent),
            .@"export" => |d| {
                try self.checkExpr(d.value.*, parent);
                try self.checkAnnotation(d.type, d.value.*);
            },
        }
    }

    //
    // Type annotation check (TYP002).
    //

    fn checkLetAnnotation(self: *Checker, d: ast.LetDecl) !void {
        if (d.type) |t| try self.checkAnnotation(t, d.value.*);
    }

    fn checkParamAnnotation(self: *Checker, p: ast.Param) !void {
        if (p.default) |def| try self.checkAnnotation(p.type, def.*);
    }

    /// Compare an annotated type against a literal value. Skips silently
    /// when either side isn't in TYP002's conservative scope (annotation
    /// not a simple_type / not a known category name; value not a literal).
    /// The real typechecker takes over for everything else.
    fn checkAnnotation(self: *Checker, type_node: ast.Type, value: ast.Expr) !void {
        const simple = switch (type_node) {
            .simple => |s| s,
            else => return,
        };
        const expected = nameToCategory(simple.name.name);
        if (expected == .unknown) return;

        const lit = switch (value) {
            .literal => |l| l,
            else => return,
        };
        const actual = literalCategory(lit);
        if (actual != expected) {
            const span = value.span();
            const loc = span.location(self.source);
            try self.diagnostics.append(self.allocator, .{
                .code = "TYP002",
                .message = try std.fmt.allocPrint(
                    self.allocator,
                    "type mismatch: expected '{s}', got a {s} literal",
                    .{ simple.name.name, categoryName(actual) },
                ),
                .span = .{
                    .path = self.path,
                    .line = loc.line,
                    .column = loc.column,
                    .length = span.end - span.start,
                },
                .expected = try std.fmt.allocPrint(self.allocator, "{s} value", .{simple.name.name}),
                .actual = try std.fmt.allocPrint(self.allocator, "{s} literal", .{categoryName(actual)}),
                .help = "change the value to match the type, or change the type annotation to match the value",
                .fix_safety = .@"local-edit",
                .repair = .{
                    .id = "align-value-with-type",
                    .summary = "Use a value whose category matches the annotation.",
                },
            });
            return;
        }

        // Broad categories agree. If both sides are number-family,
        // descend into the unit-category check.
        if (expected == .number) try self.checkUnitAnnotation(simple, lit.number);
    }

    fn checkUnitAnnotation(self: *Checker, simple: ast.SimpleType, number: ast.NumberLit) !void {
        const expected_unit = nameToUnitCategory(simple.name.name) orelse return;

        if (number.unit) |lit_unit| {
            const actual_unit = unitCategory(lit_unit);
            if (actual_unit == expected_unit) return;
            try self.emitUnt001(simple, number, lit_unit, actual_unit, expected_unit);
            return;
        }

        // Unitless literal. OK when the annotation also expects unitless
        // (Number / Int / Float); otherwise it's UNT002.
        if (expected_unit == .none) return;
        try self.emitUnt002(simple, number, expected_unit);
    }

    fn emitUnt001(
        self: *Checker,
        simple: ast.SimpleType,
        number: ast.NumberLit,
        lit_unit: ast.Unit,
        actual_unit: UnitCategory,
        expected_unit: UnitCategory,
    ) !void {
        const loc = number.span.location(self.source);
        try self.diagnostics.append(self.allocator, .{
            .code = "UNT001",
            .message = try std.fmt.allocPrint(
                self.allocator,
                "unit mismatch: '{s}' expects {s}, got '{s}{s}' ({s})",
                .{
                    simple.name.name,
                    unitCategoryName(expected_unit),
                    number.text,
                    unitName(lit_unit),
                    unitCategoryName(actual_unit),
                },
            ),
            .span = .{
                .path = self.path,
                .line = loc.line,
                .column = loc.column,
                .length = number.span.end - number.span.start,
            },
            .expected = try std.fmt.allocPrint(self.allocator, "a {s} literal (annotated as {s})", .{
                unitCategoryName(expected_unit),
                simple.name.name,
            }),
            .actual = try std.fmt.allocPrint(self.allocator, "a {s} literal ('{s}')", .{
                unitCategoryName(actual_unit),
                unitName(lit_unit),
            }),
            .help = "change the unit suffix to match the annotated category, or change the annotation",
            .fix_safety = .@"local-edit",
            .repair = .{
                .id = "align-unit-with-type",
                .summary = "Use a literal whose unit lives in the annotated category.",
            },
        });
    }

    fn emitUnt002(
        self: *Checker,
        simple: ast.SimpleType,
        number: ast.NumberLit,
        expected_unit: UnitCategory,
    ) !void {
        const loc = number.span.location(self.source);
        const canonical = defaultUnitFor(expected_unit) orelse "<unit>";
        try self.diagnostics.append(self.allocator, .{
            .code = "UNT002",
            .message = try std.fmt.allocPrint(
                self.allocator,
                "missing unit: '{s}' requires a {s} unit (e.g. '{s}{s}')",
                .{ simple.name.name, unitCategoryName(expected_unit), number.text, canonical },
            ),
            .span = .{
                .path = self.path,
                .line = loc.line,
                .column = loc.column,
                .length = number.span.end - number.span.start,
            },
            .expected = try std.fmt.allocPrint(
                self.allocator,
                "a {s} literal (annotated as {s})",
                .{ unitCategoryName(expected_unit), simple.name.name },
            ),
            .actual = "a unitless literal",
            .help = try std.fmt.allocPrint(
                self.allocator,
                "add a unit suffix from the {s} category (suggested: '{s}')",
                .{ unitCategoryName(expected_unit), canonical },
            ),
            .fix_safety = .@"local-edit",
            .repair = .{
                .id = "add-required-unit",
                .summary = try std.fmt.allocPrint(
                    self.allocator,
                    "Append a unit suffix from the {s} category (suggested: '{s}{s}').",
                    .{ unitCategoryName(expected_unit), number.text, canonical },
                ),
            },
        });
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
            try self.checkParamAnnotation(p);
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

        // Pre-scan: every let-name in this block goes into future_names
        // so out-of-order references can be reported as NAM004 instead
        // of NAM003. We remove each name from this map BEFORE walking
        // its own value, so `let x = x + 1` still fires NAM003 (the
        // name truly doesn't exist at that point — not in scope, not
        // declared yet either).
        var future_names: std.StringHashMapUnmanaged(ast.Span) = .{};
        defer future_names.deinit(self.allocator);
        for (block.lets) |l| {
            const gop = try future_names.getOrPut(self.allocator, l.name.name);
            if (!gop.found_existing) gop.value_ptr.* = l.name.span;
        }
        block_scope.future_names = &future_names;

        for (block.lets) |l| {
            _ = future_names.remove(l.name.name);
            try self.checkExpr(l.value.*, &block_scope);
            try self.checkLetAnnotation(l);
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
                try self.checkStdlibCall(c);
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

    /// Resolve the "name" a call is invoking, when it's nameable:
    /// `path(...)` → "path", `text.glyph(...)` → "text.glyph" (a
    /// one-level field access on an ident receiver). Anything more
    /// complex (a call result, an index) returns null — we only reason
    /// about the syntactically obvious cases.
    fn calleeName(allocator: std.mem.Allocator, callee: ast.Expr) !?[]const u8 {
        return switch (callee) {
            .ident => |i| i.name,
            .field_access => |f| switch (f.receiver.*) {
                .ident => |r| try std.fmt.allocPrint(allocator, "{s}.{s}", .{ r.name, f.name.name }),
                else => null,
            },
            else => null,
        };
    }

    /// Stage-3 stdlib calls that the renderers can only partially
    /// honour today get a legible diagnostic here instead of a silent
    /// no-render downstream. Narrow and syntactic: we only flag the
    /// obvious shapes (a direct call argument, a literal option), never
    /// values that arrive through a binding — those are the full
    /// typechecker's job.
    fn checkStdlibCall(self: *Checker, c: ast.Call) !void {
        const name = (try calleeName(self.allocator, c.callee.*)) orelse return;
        if (std.mem.eql(u8, name, "extrude")) {
            try self.checkExtrude(c);
        } else if (std.mem.eql(u8, name, "path")) {
            try self.checkPath(c);
        }
    }

    fn firstPositional(c: ast.Call) ?ast.Arg {
        for (c.args) |a| if (a.name == null) return a;
        return null;
    }

    /// `extrude(<shape>, depth: ...)` — only `text.glyph(...)` and
    /// `path(...)` have a 3D translator today. A direct call to any
    /// other shape constructor (`extrude(circle(...))`) renders to
    /// nothing; surface that as NAM007 so the failure is legible.
    fn checkExtrude(self: *Checker, c: ast.Call) !void {
        const arg = firstPositional(c) orelse return;
        const inner = arg.value.*;
        if (inner != .call) return; // a bound shape — can't reason syntactically
        const shape = (try calleeName(self.allocator, inner.call.callee.*)) orelse return;
        if (std.mem.eql(u8, shape, "text.glyph") or std.mem.eql(u8, shape, "path")) return;

        const span = inner.span();
        const loc = span.location(self.source);
        try self.diagnostics.append(self.allocator, .{
            .code = "NAM007",
            .message = try std.fmt.allocPrint(self.allocator, "no 3D shape translator for '{s}' inside extrude(...)", .{shape}),
            .span = .{ .path = self.path, .line = loc.line, .column = loc.column, .length = span.end - span.start },
            .expected = "text.glyph(...) or path(...)",
            .actual = try std.fmt.allocPrint(self.allocator, "extrude received '{s}'", .{shape}),
            .help = "extrude a font outline with text.glyph(...) or an explicit polygon with path(points: [...])",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "use-extrudable-shape",
                .summary = "Pass a text.glyph(...) or path(...) to extrude — other shapes have no 3D form yet.",
            },
        });
    }

    /// `path(points: [vec2(...), ...], closed?)` — the renderer extrudes
    /// a single *closed* polygon of ≥ 3 points. Flag the two cases that
    /// silently produce no solid: an explicit `closed: false`, and a
    /// point list with fewer than three literal points.
    fn checkPath(self: *Checker, c: ast.Call) !void {
        for (c.args) |a| {
            if (a.name) |n| if (std.mem.eql(u8, n.name, "closed")) {
                if (a.value.* == .literal and a.value.*.literal == .@"bool" and a.value.*.literal.@"bool".value == false) {
                    try self.emitPathLwr(c.span, "an open path (closed: false) has no cap face to extrude");
                    return;
                }
            };
        }
        // Locate the point list: `points: [...]` or a leading positional array.
        const points: ?ast.ArrayExpr = blk: {
            for (c.args) |a| {
                if (a.name) |n| {
                    if (std.mem.eql(u8, n.name, "points") and a.value.* == .array) break :blk a.value.*.array;
                } else if (a.value.* == .array) break :blk a.value.*.array;
            }
            break :blk null;
        };
        if (points) |arr| {
            if (arr.elems.len < 3) {
                try self.emitPathLwr(c.span, "a path needs at least 3 points to extrude into a solid");
            }
        }
    }

    fn emitPathLwr(self: *Checker, span: ast.Span, message: []const u8) !void {
        const loc = span.location(self.source);
        try self.diagnostics.append(self.allocator, .{
            .code = "LWR001",
            .message = try self.allocator.dupe(u8, message),
            .span = .{ .path = self.path, .line = loc.line, .column = loc.column, .length = span.end - span.start },
            .expected = "path(points: [vec2(x, y), …]) with 3+ points, closed",
            .help = "give the path 3 or more points and leave it closed (the default) so extrude has a face",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "close-path-min-points",
                .summary = "Provide at least 3 points and keep the path closed.",
            },
        });
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

        // Forward-reference within a block? Pre-scan populated
        // `future_names` on block scopes; a hit upgrades NAM003 to NAM004
        // and points at the actual declaration so the user can either
        // reorder or use a different scope.
        if (scope.lookupFuture(id.name)) |future_span| {
            const loc = id.span.location(self.source);
            const decl_loc = future_span.location(self.source);
            try self.diagnostics.append(self.allocator, .{
                .code = "NAM004",
                .message = try std.fmt.allocPrint(
                    self.allocator,
                    "forward reference to '{s}'",
                    .{id.name},
                ),
                .span = .{
                    .path = self.path,
                    .line = loc.line,
                    .column = loc.column,
                    .length = id.span.end - id.span.start,
                },
                .expected = "names declared earlier in the enclosing block",
                .actual = try std.fmt.allocPrint(
                    self.allocator,
                    "'{s}' is declared later in this block at line {d} column {d}",
                    .{ id.name, decl_loc.line, decl_loc.column },
                ),
                .help = "move the declaration above this use, or hoist it to an enclosing scope",
                .fix_safety = .@"local-edit",
                .repair = .{
                    .id = "reorder-block-let",
                    .summary = "Place the `let` declaration above the use, or move it to an outer scope.",
                },
            });
            return;
        }

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
            try self.checkParamAnnotation(p);
        }

        try self.checkBlock(l.body, &body_scope);
    }
};

// Tests — end-to-end through parse + lower + check.

const ts = @import("tree_sitter.zig");
const lower = @import("lower.zig");

fn checkSource(source: []const u8) !struct {
    arena: std.heap.ArenaAllocator,
    diagnostics: []const diag.Diagnostic,
} {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    errdefer arena.deinit();

    var parsed = try ts.parse(source);
    defer parsed.deinit();

    var lowerer = lower.Lowerer.init(arena.allocator(), source);
    const program = try lowerer.lowerProgram(parsed.root());

    var checker = Checker.init(arena.allocator(), source, "<test>");
    const diagnostics = try checker.check(program);
    return .{ .arena = arena, .diagnostics = diagnostics };
}

fn hasCode(diagnostics: []const diag.Diagnostic, code: []const u8) bool {
    for (diagnostics) |d| if (std.mem.eql(u8, d.code, code)) return true;
    return false;
}

test "check: extrude(path(...)) of a 3-point polygon is clean" {
    var r = try checkSource(
        \\use std.shapes.*;
        \\use std.mesh3d.*;
        \\let tri = extrude(path(points: [vec2(0, 0), vec2(40, 0), vec2(20, 40)]), depth: 20px);
    );
    defer r.arena.deinit();
    try std.testing.expect(!hasCode(r.diagnostics, "NAM007"));
    try std.testing.expect(!hasCode(r.diagnostics, "LWR001"));
}

test "check: extrude of a non-extrudable shape flags NAM007" {
    var r = try checkSource(
        \\use std.shapes.*;
        \\use std.mesh3d.*;
        \\let bad = extrude(circle(radius: 40px), depth: 20px);
    );
    defer r.arena.deinit();
    try std.testing.expect(hasCode(r.diagnostics, "NAM007"));
}

test "check: path with fewer than 3 points flags LWR001" {
    var r = try checkSource(
        \\use std.shapes.*;
        \\use std.mesh3d.*;
        \\let line = extrude(path(points: [vec2(0, 0), vec2(40, 0)]), depth: 20px);
    );
    defer r.arena.deinit();
    try std.testing.expect(hasCode(r.diagnostics, "LWR001"));
}

test "check: an explicitly open path flags LWR001" {
    var r = try checkSource(
        \\use std.shapes.*;
        \\use std.mesh3d.*;
        \\let open = path(points: [vec2(0, 0), vec2(40, 0), vec2(20, 40)], closed: false);
    );
    defer r.arena.deinit();
    try std.testing.expect(hasCode(r.diagnostics, "LWR001"));
}

test "conformance: the shipped path-extrude example checks clean" {
    // The example wired into the gallery + cmo parse/check. Any new
    // diagnostic that would fire on a valid extruded path shows up
    // here before it reaches a user.
    const fixture = @embedFile("path_extrude_fixture");
    var r = try checkSource(fixture);
    defer r.arena.deinit();
    for (r.diagnostics) |d| {
        if (d.severity == .@"error") {
            std.debug.print("unexpected error diagnostic: {s} — {s}\n", .{ d.code, d.message });
            return error.TestUnexpectedResult;
        }
    }
}
