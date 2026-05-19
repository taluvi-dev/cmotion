//! Zig FFI shim for the tree-sitter C runtime + the generated cmotion parser.
//!
//! The runtime headers live in `vendor/tree-sitter/lib/include` and are
//! added to the include path by build.zig. The generated parser exposes one
//! external symbol — `tree_sitter_cmotion()` — that returns a TSLanguage*.

const std = @import("std");

pub const c = @cImport({
    @cInclude("tree_sitter/api.h");
});

extern fn tree_sitter_cmotion() ?*const c.TSLanguage;

pub const Language = c.TSLanguage;
pub const Parser = c.TSParser;
pub const Tree = c.TSTree;
pub const Node = c.TSNode;

pub fn cmotionLanguage() *const Language {
    return tree_sitter_cmotion() orelse @panic("tree_sitter_cmotion() returned null");
}

pub const ParseError = error{
    ParserAllocFailed,
    LanguageRejected,
    ParseFailed,
};

pub const Parsed = struct {
    parser: *Parser,
    tree: *Tree,

    pub fn root(self: Parsed) Node {
        return c.ts_tree_root_node(self.tree);
    }

    pub fn deinit(self: Parsed) void {
        c.ts_tree_delete(self.tree);
        c.ts_parser_delete(self.parser);
    }
};

pub fn parse(source: []const u8) ParseError!Parsed {
    const parser = c.ts_parser_new() orelse return error.ParserAllocFailed;
    errdefer c.ts_parser_delete(parser);

    if (!c.ts_parser_set_language(parser, cmotionLanguage())) {
        return error.LanguageRejected;
    }

    const tree = c.ts_parser_parse_string(
        parser,
        null,
        source.ptr,
        @intCast(source.len),
    ) orelse return error.ParseFailed;

    return .{ .parser = parser, .tree = tree };
}

/// Returns the S-expression CST as a heap-allocated, null-terminated C string.
/// Caller is responsible for `freeSExpr` (it was malloc'd by tree-sitter).
pub fn sexprAlloc(node: Node) ?[*:0]u8 {
    return c.ts_node_string(node);
}

pub fn freeSExpr(s: [*:0]u8) void {
    // tree-sitter uses the system allocator (configurable via ts_set_allocator),
    // so the buffer it returns must be freed with the matching `free`.
    std.c.free(@ptrCast(s));
}

pub fn hasError(node: Node) bool {
    return c.ts_node_has_error(node);
}

pub const Point = struct { row: u32, column: u32 };

pub fn startPoint(node: Node) Point {
    const p = c.ts_node_start_point(node);
    return .{ .row = p.row, .column = p.column };
}

pub fn endPoint(node: Node) Point {
    const p = c.ts_node_end_point(node);
    return .{ .row = p.row, .column = p.column };
}

pub fn startByte(node: Node) u32 {
    return c.ts_node_start_byte(node);
}

pub fn endByte(node: Node) u32 {
    return c.ts_node_end_byte(node);
}
