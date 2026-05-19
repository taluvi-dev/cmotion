//! Cmotion AST — type definitions only. No constructors and no walkers here;
//! the lowering pass from the tree-sitter CST lives in src/lower.zig (to be
//! added in the next commit), and the typechecker / interpreter consume
//! these shapes downstream.
//!
//! Design rules:
//!   - One tagged union per syntactic category: `Expr`, `Type`, `Pattern`,
//!     `TopDecl`. Narrower than one mega-union, easier to switch on, and
//!     keeps recursion explicit.
//!   - Everything is arena-allocated: a parse owns its arena, the AST lives
//!     in it, and the whole tree gets freed in one `arena.deinit()`.
//!   - Identifiers and literal text are *slices into the original source
//!     buffer*. Caller keeps the source alive for the AST's lifetime. This
//!     is zero-copy and lets a future string-interning layer slip in behind
//!     the same accessor without changing the AST shape.
//!   - Every node carries a `Span` so diagnostics emitted by stages
//!     downstream of the parser (typechecker, lowering, backends) can
//!     point at the right byte range.

const std = @import("std");

//
// Source spans
//

pub const Span = struct {
    /// Byte offset into the source buffer (inclusive).
    start: u32,
    /// Byte offset into the source buffer (exclusive).
    end: u32,
    /// 1-based line of `start`.
    line: u32,
    /// 1-based column (in bytes) of `start`.
    column: u32,
};

//
// Leaf-level data
//

pub const Ident = struct {
    span: Span,
    /// Borrowed slice into source.
    name: []const u8,
};

pub const Path = struct {
    span: Span,
    segments: []const Ident,
    /// True if the path ends in `.*` (wildcard import).
    glob: bool,
};

/// Unit suffixes recognised by `number_lit`. Mirrors the EBNF `unit`
/// production exactly; `percent` is the `%` token.
pub const Unit = enum {
    s,
    ms,
    us,
    ns,
    hz,
    khz,
    deg,
    rad,
    turn,
    px,
    percent,
    bpm,
    bars,
    beats,
};

pub const NumberLit = struct {
    span: Span,
    /// The raw digit text (with optional `.` fraction, underscores intact).
    text: []const u8,
    unit: ?Unit,
};

pub const StringLit = struct {
    span: Span,
    /// The raw source bytes including surrounding quotes. Unescaping is the
    /// consumer's responsibility (cheap to defer, expensive to undo).
    raw: []const u8,
};

pub const BoolLit = struct {
    span: Span,
    value: bool,
};

pub const Color = union(enum) {
    hex: struct {
        span: Span,
        /// Hex digits, no leading `#`.
        digits: []const u8,
    },
    oklch: struct { span: Span, l: *const Expr, c: *const Expr, h: *const Expr },
    oklab: struct { span: Span, l: *const Expr, a: *const Expr, b: *const Expr },
    srgb: struct { span: Span, r: *const Expr, g: *const Expr, b: *const Expr },
};

pub const Literal = union(enum) {
    number: NumberLit,
    string: StringLit,
    @"bool": BoolLit,
    color: Color,
};

//
// Operators
//

pub const BinOp = enum {
    @"or", // ||
    @"and", // &&
    eq, // ==
    neq, // !=
    lt, // <
    lte, // <=
    gt, // >
    gte, // >=
    add, // +
    sub, // -
    mul, // *
    div, // /
    mod, // %
    pow, // **
};

pub const UnaryOp = enum {
    neg, // -
    not, // !
};

//
// Types
//

pub const SimpleType = struct {
    span: Span,
    name: Ident,
    args: []const Type,
};

pub const TupleType = struct {
    span: Span,
    elems: []const Type,
};

pub const RecordTypeField = struct {
    name: Ident,
    type: Type,
};

pub const RecordType = struct {
    span: Span,
    fields: []const RecordTypeField,
};

pub const FunctionType = struct {
    span: Span,
    params: []const Type,
    ret: *const Type,
};

pub const Type = union(enum) {
    simple: SimpleType,
    tuple: TupleType,
    record: RecordType,
    function: FunctionType,
};

//
// Patterns
//

pub const Pattern = union(enum) {
    literal: Literal,
    ident: Ident,
    wildcard: Span,
};

//
// Building blocks shared across expressions and decls
//

pub const Param = struct {
    span: Span,
    name: Ident,
    type: Type,
    default: ?*const Expr,
};

pub const Block = struct {
    span: Span,
    lets: []const LetDecl,
    /// EBNF requires a trailing expression as the block's result; we model
    /// it directly rather than as an optional last `Stmt`.
    result: *const Expr,
};

pub const Arg = struct {
    span: Span,
    /// `null` for positional args, set for `name: value` named args.
    name: ?Ident,
    value: *const Expr,
};

pub const RecordInit = struct {
    name: Ident,
    value: *const Expr,
};

pub const KeyFrame = struct {
    at: *const Expr,
    value: *const Expr,
};

pub const MatchArm = struct {
    pattern: Pattern,
    body: *const Expr,
};

//
// Expressions
//

pub const Binary = struct {
    span: Span,
    op: BinOp,
    left: *const Expr,
    right: *const Expr,
};

pub const Unary = struct {
    span: Span,
    op: UnaryOp,
    operand: *const Expr,
};

pub const Call = struct {
    span: Span,
    callee: *const Expr,
    args: []const Arg,
};

pub const MethodCall = struct {
    span: Span,
    receiver: *const Expr,
    name: Ident,
    args: []const Arg,
};

pub const FieldAccess = struct {
    span: Span,
    receiver: *const Expr,
    name: Ident,
};

pub const Index = struct {
    span: Span,
    receiver: *const Expr,
    index: *const Expr,
};

pub const Paren = struct {
    span: Span,
    inner: *const Expr,
};

pub const If = struct {
    span: Span,
    condition: *const Expr,
    then: Block,
    else_branch: ?ElseBranch,
};

pub const ElseBranch = union(enum) {
    block: Block,
    /// Always points at an `Expr` whose tag is `.if_`. Modeled as a pointer
    /// so we don't have to embed a recursive struct in a value position.
    if_: *const Expr,
};

pub const Match = struct {
    span: Span,
    subject: *const Expr,
    arms: []const MatchArm,
};

pub const Lambda = struct {
    span: Span,
    params: []const Param,
    return_type: ?Type,
    body: Block,
};

pub const Animate = struct {
    span: Span,
    keyframes: []const KeyFrame,
    /// `null` when the `with { ... }` clause is absent.
    opts: ?[]const RecordInit,
};

pub const Compose = struct {
    span: Span,
    layers: []const Expr,
};

pub const RecordExpr = struct {
    span: Span,
    inits: []const RecordInit,
};

pub const ArrayExpr = struct {
    span: Span,
    elems: []const Expr,
};

pub const Expr = union(enum) {
    literal: Literal,
    ident: Ident,
    paren: Paren,
    binary: Binary,
    unary: Unary,
    call: Call,
    method_call: MethodCall,
    field_access: FieldAccess,
    index: Index,
    if_: If,
    match: Match,
    lambda: Lambda,
    animate: Animate,
    compose: Compose,
    record: RecordExpr,
    array: ArrayExpr,
    block: Block,

    pub fn span(self: Expr) Span {
        return switch (self) {
            .literal => |l| switch (l) {
                .number => |n| n.span,
                .string => |s| s.span,
                .@"bool" => |b| b.span,
                .color => |c| switch (c) {
                    inline else => |v| v.span,
                },
            },
            .ident => |i| i.span,
            inline else => |v| v.span,
        };
    }
};

//
// Top-level declarations
//

pub const LetDecl = struct {
    span: Span,
    name: Ident,
    type: ?Type,
    value: *const Expr,
};

pub const ComponentLike = struct {
    span: Span,
    name: Ident,
    params: []const Param,
    return_type: Type,
    body: Block,
};

pub const ExportDecl = struct {
    span: Span,
    name: Ident,
    type: Type,
    value: *const Expr,
};

pub const ImportDecl = struct {
    span: Span,
    path: Path,
    alias: ?Ident,
};

pub const TopDecl = union(enum) {
    import: ImportDecl,
    let: LetDecl,
    component: ComponentLike,
    scene: ComponentLike,
    filter: ComponentLike,
    @"export": ExportDecl,
};

pub const Program = struct {
    span: Span,
    decls: []const TopDecl,
};

//
// Smoke test: the union tags compile and recursion via pointers resolves.
//

test "Expr can recurse through pointers" {
    const allocator = std.testing.allocator;

    const inner_ident = Expr{
        .ident = .{
            .span = .{ .start = 0, .end = 3, .line = 1, .column = 1 },
            .name = "foo",
        },
    };

    const inner_ptr = try allocator.create(Expr);
    defer allocator.destroy(inner_ptr);
    inner_ptr.* = inner_ident;

    const paren = Expr{
        .paren = .{
            .span = .{ .start = 0, .end = 5, .line = 1, .column = 1 },
            .inner = inner_ptr,
        },
    };

    try std.testing.expectEqual(@as(u32, 0), paren.span().start);
    try std.testing.expectEqualStrings("foo", paren.paren.inner.ident.name);
}
