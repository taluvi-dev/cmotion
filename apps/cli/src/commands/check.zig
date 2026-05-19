const std = @import("std");
const diag = @import("../diagnostics.zig");
const ts = @import("../tree_sitter.zig");
const ast = @import("../ast.zig");
const lower = @import("../lower.zig");
const check_pass = @import("../check.zig");
const Context = @import("../cli.zig").Context;

const max_source_bytes: usize = 16 * 1024 * 1024;

pub fn run(ctx: Context, args: []const []const u8) !u8 {
    if (args.len == 0) {
        try ctx.emitError(.{
            .code = "CLI002",
            .message = "`check` requires a source file argument",
            .help = "pass a .cm source file: `cmo check src/main.cm`",
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

    var diags: std.ArrayListUnmanaged(diag.Diagnostic) = .{};
    defer diags.deinit(ctx.allocator);

    if (ts.hasError(root)) {
        const start = ts.startPoint(root);
        try diags.append(ctx.allocator, .{
            .code = "PAR100",
            .message = "syntax error in source",
            .span = .{
                .path = path,
                .line = start.row + 1,
                .column = start.column + 1,
            },
            .help = "fix the syntax error first; `cmo check` only runs semantic passes on a clean parse",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "fix-syntax",
                .summary = "Resolve the syntax error reported by the parser.",
            },
        });
    } else {
        var arena = std.heap.ArenaAllocator.init(ctx.allocator);
        defer arena.deinit();

        var lowerer = lower.Lowerer.init(arena.allocator(), source);
        const program = lowerer.lowerProgram(root) catch |err| {
            try diags.append(ctx.allocator, .{
                .severity = .warning,
                .code = "LWR000",
                .message = try std.fmt.allocPrint(
                    ctx.allocator,
                    "lowering failed on a clean CST: {s}",
                    .{@errorName(err)},
                ),
                .span = .{ .path = path },
                .help = "no semantic checks ran — fix the lowering gap first",
                .fix_safety = .@"requires-human-review",
                .repair = .{
                    .id = "extend-lowering",
                    .summary = "Add a branch to lower.zig for the missing CST node kind.",
                },
            });
            try emit(ctx, diags.items, path);
            return 70;
        };

        var checker = check_pass.Checker.init(ctx.allocator, source, path);
        const semantic = try checker.check(program);
        defer ctx.allocator.free(semantic);
        try diags.appendSlice(ctx.allocator, semantic);
    }

    try emit(ctx, diags.items, path);

    return if (anyError(diags.items)) 1 else 0;
}

fn anyError(items: []const diag.Diagnostic) bool {
    for (items) |d| if (d.severity == .@"error") return true;
    return false;
}

fn emit(ctx: Context, diagnostics: []const diag.Diagnostic, path: []const u8) !void {
    const ok = !anyError(diagnostics);
    if (ctx.options.json) {
        try ctx.openJsonEnvelope(ok, diagnostics);
        try ctx.stdout.writeAll(",\"path\":");
        try diag.writeJsonString(ctx.stdout, path);
        try ctx.closeJsonEnvelope();
    } else {
        try diag.writeText(ctx.stdout, .{ .ok = ok, .diagnostics = diagnostics });
        if (ok) try ctx.stdout.print("ok: {s}\n", .{path});
        try ctx.timing.writeText(ctx.stdout);
    }
}
