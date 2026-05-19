//! Cmotion source formatter (v0).
//!
//! Scope of this first cut: only top-level `use` and `let` declarations are
//! rewritten with normalised whitespace. Every other top-level decl
//! (component/scene/filter/export) and the inter-decl gap is emitted by
//! slicing the original source bytes, so comments and the inner expression
//! syntax round-trip untouched. The CLI command in `commands/fmt.zig` reads
//! the file, drives the parser + lowerer, and routes the formatted bytes to
//! stdout, the file, or the JSON envelope.

const std = @import("std");
const ast = @import("ast.zig");

/// Format `source` against the lowered `program`. Returned bytes are
/// allocated from `allocator` and owned by the caller.
pub fn format(
    allocator: std.mem.Allocator,
    source: []const u8,
    program: ast.Program,
) std.mem.Allocator.Error![]u8 {
    var buf: std.ArrayListUnmanaged(u8) = .{};
    errdefer buf.deinit(allocator);

    var cursor: u32 = 0;
    for (program.decls, 0..) |decl, i| {
        const span = topDeclSpan(decl);
        try emitGap(allocator, &buf, source[cursor..span.start], i == 0);

        switch (decl) {
            .import => |imp| try writeImport(allocator, &buf, imp),
            .let => |let_| try writeLet(allocator, &buf, source, let_),
            else => try buf.appendSlice(allocator, source[span.start..span.end]),
        }
        cursor = span.end;
    }

    try emitTrailing(allocator, &buf, source[cursor..]);
    return buf.toOwnedSlice(allocator);
}

fn topDeclSpan(d: ast.TopDecl) ast.Span {
    return switch (d) {
        inline else => |v| v.span,
    };
}

fn typeSpan(t: ast.Type) ast.Span {
    return switch (t) {
        inline else => |v| v.span,
    };
}

fn writeImport(
    allocator: std.mem.Allocator,
    buf: *std.ArrayListUnmanaged(u8),
    imp: ast.ImportDecl,
) std.mem.Allocator.Error!void {
    try buf.appendSlice(allocator, "use ");
    for (imp.path.segments, 0..) |seg, i| {
        if (i != 0) try buf.append(allocator, '.');
        try buf.appendSlice(allocator, seg.name);
    }
    if (imp.path.glob) try buf.appendSlice(allocator, ".*");
    if (imp.alias) |alias| {
        try buf.appendSlice(allocator, " as ");
        try buf.appendSlice(allocator, alias.name);
    }
    try buf.append(allocator, ';');
}

fn writeLet(
    allocator: std.mem.Allocator,
    buf: *std.ArrayListUnmanaged(u8),
    source: []const u8,
    let_: ast.LetDecl,
) std.mem.Allocator.Error!void {
    try buf.appendSlice(allocator, "let ");
    try buf.appendSlice(allocator, let_.name.name);
    if (let_.type) |t| {
        try buf.appendSlice(allocator, ": ");
        const s = typeSpan(t);
        try buf.appendSlice(allocator, source[s.start..s.end]);
    }
    try buf.appendSlice(allocator, " = ");
    const vs = let_.value.span();
    try buf.appendSlice(allocator, source[vs.start..vs.end]);
    try buf.append(allocator, ';');
}

fn emitGap(
    allocator: std.mem.Allocator,
    buf: *std.ArrayListUnmanaged(u8),
    gap: []const u8,
    is_first: bool,
) std.mem.Allocator.Error!void {
    // Non-whitespace bytes in the gap are comments (the only `extras` the
    // grammar knows) — emit them verbatim so they survive a round-trip.
    if (gapHasContent(gap)) {
        try buf.appendSlice(allocator, gap);
        return;
    }
    if (is_first) return; // pure whitespace at file head -> drop it
    // Collapse 3+ newlines to one blank line; otherwise butt the decls up.
    if (countNewlines(gap) >= 2) {
        try buf.appendSlice(allocator, "\n\n");
    } else {
        try buf.append(allocator, '\n');
    }
}

fn emitTrailing(
    allocator: std.mem.Allocator,
    buf: *std.ArrayListUnmanaged(u8),
    gap: []const u8,
) std.mem.Allocator.Error!void {
    if (gapHasContent(gap)) {
        var end = gap.len;
        while (end > 0 and isWhitespaceByte(gap[end - 1])) : (end -= 1) {}
        try buf.appendSlice(allocator, gap[0..end]);
    }
    if (buf.items.len == 0) return; // empty input -> empty output
    if (buf.items[buf.items.len - 1] != '\n') try buf.append(allocator, '\n');
}

fn gapHasContent(gap: []const u8) bool {
    for (gap) |c| if (!isWhitespaceByte(c)) return true;
    return false;
}

fn isWhitespaceByte(c: u8) bool {
    return c == ' ' or c == '\t' or c == '\n' or c == '\r';
}

fn countNewlines(s: []const u8) usize {
    var n: usize = 0;
    for (s) |c| {
        if (c == '\n') n += 1;
    }
    return n;
}

//
// Tests — end-to-end through the real parser + lowerer so we exercise the
// same path the CLI does.
//

const ts = @import("tree_sitter.zig");
const lower = @import("lower.zig");

fn formatString(allocator: std.mem.Allocator, source: []const u8) ![]u8 {
    var parsed = try ts.parse(source);
    defer parsed.deinit();
    var arena = std.heap.ArenaAllocator.init(allocator);
    defer arena.deinit();
    var lowerer = lower.Lowerer.init(arena.allocator(), source);
    const program = try lowerer.lowerProgram(parsed.root());
    return format(allocator, source, program);
}

test "imports normalise whitespace and dot segments" {
    const allocator = std.testing.allocator;
    const out = try formatString(allocator, "use   std . math ;\n");
    defer allocator.free(out);
    try std.testing.expectEqualStrings("use std.math;\n", out);
}

test "imports keep aliases and globs" {
    const allocator = std.testing.allocator;
    const out = try formatString(allocator, "use a.b.* ;\nuse a.b   as   c;\n");
    defer allocator.free(out);
    try std.testing.expectEqualStrings("use a.b.*;\nuse a.b as c;\n", out);
}

test "glob is detected even when source has whitespace around `.*`" {
    const allocator = std.testing.allocator;
    const out = try formatString(allocator, "use   std . shapes . * ;\n");
    defer allocator.free(out);
    try std.testing.expectEqualStrings("use std.shapes.*;\n", out);
}

test "let decl with and without type annotation" {
    const allocator = std.testing.allocator;
    const out = try formatString(allocator, "let  x:Int=42;\nlet y =1;\n");
    defer allocator.free(out);
    try std.testing.expectEqualStrings("let x: Int = 42;\nlet y = 1;\n", out);
}

test "blank line between groups is preserved, runs are collapsed" {
    const allocator = std.testing.allocator;
    const out = try formatString(
        allocator,
        "use std.math;\n\n\n\nlet x = 1;\nlet y = 2;\n",
    );
    defer allocator.free(out);
    try std.testing.expectEqualStrings(
        "use std.math;\n\nlet x = 1;\nlet y = 2;\n",
        out,
    );
}

test "unsupported top-level decls round-trip verbatim" {
    const allocator = std.testing.allocator;
    const src =
        \\let x = 1;
        \\component  foo ( ) -> Int { 1 }
        \\
    ;
    const out = try formatString(allocator, src);
    defer allocator.free(out);
    // The let gets rewritten, the component is sliced byte-for-byte.
    try std.testing.expectEqualStrings(
        "let x = 1;\ncomponent  foo ( ) -> Int { 1 }\n",
        out,
    );
}

test "leading and trailing comments survive" {
    const allocator = std.testing.allocator;
    const src =
        \\// header
        \\use std.math;
        \\// trailer
    ;
    const out = try formatString(allocator, src);
    defer allocator.free(out);
    try std.testing.expectEqualStrings(
        "// header\nuse std.math;\n// trailer\n",
        out,
    );
}

test "empty input formats to empty output" {
    const allocator = std.testing.allocator;
    const out = try formatString(allocator, "");
    defer allocator.free(out);
    try std.testing.expectEqualStrings("", out);
}

test "countNewlines and gapHasContent helpers" {
    try std.testing.expectEqual(@as(usize, 0), countNewlines("   "));
    try std.testing.expectEqual(@as(usize, 2), countNewlines("\n\n"));
    try std.testing.expect(!gapHasContent("  \n\t "));
    try std.testing.expect(gapHasContent("  // hi\n"));
}
