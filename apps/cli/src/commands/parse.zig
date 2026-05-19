const std = @import("std");
const diag = @import("../diagnostics.zig");
const ts = @import("../tree_sitter.zig");
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

    if (ts.hasError(root)) {
        const start = ts.startPoint(root);
        try ctx.emitError(.{
            .code = "PAR100",
            .message = "syntax error in source",
            .span = .{
                .path = path,
                .line = start.row + 1,
                .column = start.column + 1,
            },
            .help = "the parser produced a tree containing ERROR or MISSING nodes; run `cmo parse --json` for the full CST",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "fix-syntax",
                .summary = "Resolve the syntax error reported by the parser.",
            },
        });
        // Continue to emit the CST so agents can still inspect what was parsed.
    }

    if (ctx.options.json) {
        try emitCstJson(ctx, path, root, source);
    } else {
        try emitCstSExpr(ctx, root);
    }

    return if (ts.hasError(root)) 1 else 0;
}

fn emitCstSExpr(ctx: Context, root: ts.Node) !void {
    const sexp = ts.sexprAlloc(root) orelse return;
    defer ts.freeSExpr(sexp);
    const w = ctx.stdout.writer();
    try w.writeAll(std.mem.span(sexp));
    try w.writeAll("\n");
}

fn emitCstJson(ctx: Context, path: []const u8, root: ts.Node, source: []const u8) !void {
    _ = source;
    const w = ctx.stdout.writer();
    try w.print("{{\"schemaVersion\":1,\"path\":", .{});
    try writeJsonString(w, path);
    try w.writeAll(",\"cst\":");
    // For now, embed the same S-expression tree-sitter produces. A future
    // change can map this to a structured JSON node tree.
    const sexp = ts.sexprAlloc(root) orelse {
        try w.writeAll("null}\n");
        return;
    };
    defer ts.freeSExpr(sexp);
    try writeJsonString(w, std.mem.span(sexp));
    try w.writeAll("}\n");
}

fn writeJsonString(writer: anytype, s: []const u8) !void {
    try writer.writeByte('"');
    for (s) |b| switch (b) {
        '"' => try writer.writeAll("\\\""),
        '\\' => try writer.writeAll("\\\\"),
        '\n' => try writer.writeAll("\\n"),
        '\r' => try writer.writeAll("\\r"),
        '\t' => try writer.writeAll("\\t"),
        0...0x1f => try std.fmt.format(writer, "\\u{x:0>4}", .{b}),
        else => try writer.writeByte(b),
    };
    try writer.writeByte('"');
}
