const std = @import("std");
const diag = @import("../diagnostics.zig");
const ts = @import("../tree_sitter.zig");
const ast = @import("../ast.zig");
const lower = @import("../lower.zig");
const eval = @import("../eval.zig");
const Context = @import("../cli.zig").Context;

const max_source_bytes: usize = 16 * 1024 * 1024;

pub fn run(ctx: Context, args: []const []const u8) !u8 {
    if (args.len == 0) {
        try ctx.emitError(.{
            .code = "CLI002",
            .message = "`eval` requires a source file argument",
            .help = "pass a .cm source file: `cmo eval src/main.cm`",
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

    var diags: std.ArrayListUnmanaged(diag.Diagnostic) = .{};
    defer diags.deinit(ctx.allocator);

    const root = parsed.root();
    const has_error = ts.hasError(root);
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
            .help = "fix the parse error before running the interpreter; `cmo parse <file>` shows the CST",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "fix-syntax",
                .summary = "Resolve the syntax error reported by the parser.",
            },
        });
    }

    var arena = std.heap.ArenaAllocator.init(ctx.allocator);
    defer arena.deinit();

    var program: ?ast.Program = null;
    if (!has_error) {
        var lowerer = lower.Lowerer.init(arena.allocator(), source);
        program = lowerer.lowerProgram(root) catch |err| blk: {
            try diags.append(ctx.allocator, .{
                .severity = .warning,
                .code = "LWR000",
                .message = try std.fmt.allocPrint(
                    ctx.allocator,
                    "lowering failed on a clean CST: {s}",
                    .{@errorName(err)},
                ),
                .span = .{ .path = path },
                .help = "the interpreter cannot run on a tree the lowerer couldn't build",
                .fix_safety = .@"requires-human-review",
                .repair = .{
                    .id = "extend-lowering",
                    .summary = "Add a branch to lower.zig for the missing CST node kind.",
                },
            });
            break :blk null;
        };
    }

    var result: ?eval.Program = null;
    if (program) |p| {
        var evaluator = eval.Evaluator.init(arena.allocator(), ctx.allocator, source, path);
        defer evaluator.deinit();
        result = evaluator.evalProgram(p) catch |err| blk: {
            // EvalError is only OutOfMemory today, but be explicit so
            // future cases (e.g. cycle detection) don't silently bubble.
            try diags.append(ctx.allocator, .{
                .code = "EVL001",
                .message = try std.fmt.allocPrint(
                    ctx.allocator,
                    "evaluator aborted: {s}",
                    .{@errorName(err)},
                ),
                .span = .{ .path = path },
                .fix_safety = .@"requires-human-review",
                .repair = .{
                    .id = "report-bug",
                    .summary = "Open an issue against cmotion with the source that triggered this.",
                },
            });
            break :blk null;
        };
        for (evaluator.diagnostics.items) |d| try diags.append(ctx.allocator, d);
    }

    const has_error_diag = blk: {
        for (diags.items) |d| if (d.severity == .@"error") break :blk true;
        break :blk false;
    };

    if (ctx.options.json) {
        try emitJsonEnvelope(ctx, path, diags.items, !has_error_diag, result);
    } else {
        try diag.writeText(ctx.stdout, .{ .ok = !has_error_diag, .diagnostics = diags.items });
        if (result) |r| {
            try r.writeText(ctx.stdout);
        }
        try ctx.timing.writeText(ctx.stdout);
    }

    return if (has_error_diag) 1 else 0;
}

fn emitJsonEnvelope(
    ctx: Context,
    path: []const u8,
    diagnostics: []const diag.Diagnostic,
    ok: bool,
    result: ?eval.Program,
) !void {
    const w = ctx.stdout;
    try ctx.openJsonEnvelope(ok, diagnostics);

    try w.writeAll(",\"path\":");
    try diag.writeJsonString(w, path);

    try w.writeAll(",\"result\":");
    if (result) |r| {
        try r.writeJson(w);
    } else {
        try w.writeAll("null");
    }

    try ctx.closeJsonEnvelope();
}
