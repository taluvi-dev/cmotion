const std = @import("std");
const diag = @import("../diagnostics.zig");
const ts = @import("../tree_sitter.zig");
const ast = @import("../ast.zig");
const lower = @import("../lower.zig");
const Context = @import("../cli.zig").Context;

const max_source_bytes: usize = 16 * 1024 * 1024;

pub fn run(ctx: Context, args: []const []const u8) !u8 {
    if (args.len == 0) {
        try ctx.emitError(.{
            .code = "CLI002",
            .message = "`parse` requires a source file argument",
            .help = "pass a .cm source file: `cmo parse src/main.cm`",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "supply-source-file",
                .summary = "Add a single .cm source file as the first positional argument.",
            },
        });
        return 2;
    }

    const path = args[0];

    const source = std.fs.cwd().readFileAlloc(ctx.allocator, path, max_source_bytes) catch |err| {
        const msg = switch (err) {
            error.FileNotFound => try std.fmt.allocPrint(ctx.allocator, "file not found: {s}", .{path}),
            error.AccessDenied => try std.fmt.allocPrint(ctx.allocator, "permission denied: {s}", .{path}),
            else => try std.fmt.allocPrint(ctx.allocator, "could not read {s}: {s}", .{ path, @errorName(err) }),
        };
        try ctx.emitError(.{
            .code = "CLI005",
            .message = msg,
            .span = .{ .path = path },
            .help = "check the path, file permissions, and current working directory",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "supply-valid-path",
                .summary = "Pass a path to an existing readable .cm file.",
            },
        });
        return 66;
    };

    var parsed = ts.parse(source) catch |err| {
        try ctx.emitError(.{
            .code = "PAR000",
            .message = try std.fmt.allocPrint(ctx.allocator, "parser failed to initialise: {s}", .{@errorName(err)}),
            .span = .{ .path = path },
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "report-bug",
                .summary = "Open an issue against cmotion with the source that triggered this.",
            },
        });
        return 70;
    };
    defer parsed.deinit();

    const root = parsed.root();
    const has_error = ts.hasError(root);

    var diags: std.ArrayListUnmanaged(diag.Diagnostic) = .{};
    defer diags.deinit(ctx.allocator);

    if (has_error) {
        const start = ts.startPoint(root);
        try diags.append(ctx.allocator, .{
            .code = "PAR100",
            .message = "syntax error in source",
            .span = .{
                .path = path,
                .line = start.row + 1,
                .column = start.column + 1,
            },
            .help = "the parser produced a tree containing ERROR or MISSING nodes; the `cst` field on the envelope shows where",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "fix-syntax",
                .summary = "Resolve the syntax error reported by the parser.",
            },
        });
    }

    // Lowering: only attempt when the parse is clean. On a tree with
    // ERROR/MISSING nodes, lowering would either bail with a confusing
    // diagnostic or produce a partial AST; better to leave the CST as
    // the consumer's view and let them fix the syntax first.
    var arena = std.heap.ArenaAllocator.init(ctx.allocator);
    defer arena.deinit();
    var program: ?ast.Program = null;
    if (!has_error) {
        var lowerer = lower.Lowerer.init(arena.allocator(), source);
        program = lowerer.lowerProgram(root) catch |err| blk: {
            // A lowering failure on a clean CST means our CST<->AST mapping
            // has a gap. Surface it as LWR000 so it's findable.
            try diags.append(ctx.allocator, .{
                .severity = .warning,
                .code = "LWR000",
                .message = try std.fmt.allocPrint(
                    ctx.allocator,
                    "lowering failed on a clean CST: {s}",
                    .{@errorName(err)},
                ),
                .span = .{ .path = path },
                .help = "the cst field is still emitted; this means src/lower.zig has a gap for some node kind",
                .fix_safety = .@"requires-human-review",
                .repair = .{
                    .id = "extend-lowering",
                    .summary = "Add a branch to lower.zig for the missing CST node kind.",
                },
            });
            break :blk null;
        };
    }

    if (ctx.options.json) {
        try emitJsonEnvelope(ctx, path, root, source, diags.items, !has_error, program);
    } else {
        try diag.writeText(ctx.stdout, .{ .ok = !has_error, .diagnostics = diags.items });
        try emitSExpr(ctx, root);
    }

    return if (has_error) 1 else 0;
}

fn emitSExpr(ctx: Context, root: ts.Node) !void {
    const sexp = ts.sexprAlloc(root) orelse return;
    defer ts.freeSExpr(sexp);
    try ctx.stdout.writeAll(std.mem.span(sexp));
    try ctx.stdout.writeAll("\n");
}

fn emitJsonEnvelope(
    ctx: Context,
    path: []const u8,
    root: ts.Node,
    source: []const u8,
    diagnostics: []const diag.Diagnostic,
    ok: bool,
    program: ?ast.Program,
) !void {
    _ = source;
    const w = ctx.stdout;
    try diag.writeJsonHeader(w, ok, diagnostics);

    try w.writeAll(",\"path\":");
    try diag.writeJsonString(w, path);

    try w.writeAll(",\"cst\":");
    if (ts.sexprAlloc(root)) |sexp| {
        defer ts.freeSExpr(sexp);
        try diag.writeJsonString(w, std.mem.span(sexp));
    } else {
        try w.writeAll("null");
    }

    try w.writeAll(",\"ast\":");
    if (program) |p| {
        try std.json.Stringify.value(p, .{}, w);
    } else {
        try w.writeAll("null");
    }

    try diag.writeJsonFooter(w);
}
