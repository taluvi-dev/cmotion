const std = @import("std");
const diag = @import("../diagnostics.zig");
const ts = @import("../tree_sitter.zig");
const ast = @import("../ast.zig");
const lower = @import("../lower.zig");
const eval = @import("../eval.zig");
const sampler = @import("../sampler.zig");
const Context = @import("../cli.zig").Context;

const max_source_bytes: usize = 16 * 1024 * 1024;

pub fn run(ctx: Context, args: []const []const u8) !u8 {
    var path_opt: ?[]const u8 = null;
    var at_seconds: ?f64 = null;

    var i: usize = 0;
    while (i < args.len) : (i += 1) {
        const a = args[i];
        if (std.mem.eql(u8, a, "--at")) {
            i += 1;
            if (i >= args.len) {
                try ctx.emitError(.{
                    .code = "CLI011",
                    .message = "`--at` requires a duration argument (e.g. `--at 1.5s`)",
                    .help = "pass a duration after the flag: `cmo eval --at 1.5s src/main.cm`",
                    .fix_safety = .@"requires-human-review",
                    .repair = .{
                        .id = "supply-at-duration",
                        .summary = "Add a duration spec like `1.5s`, `500ms`, `1us`, or `1ns` after `--at`.",
                    },
                });
                return 2;
            }
            at_seconds = sampler.parseDuration(args[i]) catch {
                try ctx.emitError(.{
                    .code = "CLI011",
                    .message = try std.fmt.allocPrint(
                        ctx.allocator,
                        "could not parse `--at {s}` as a duration",
                        .{args[i]},
                    ),
                    .help = "use a digits-plus-unit spec like `1.5s`, `500ms`, `1us`, `1ns`, or bare seconds (`2`)",
                    .fix_safety = .@"requires-human-review",
                    .repair = .{
                        .id = "fix-at-duration",
                        .summary = "Pass a duration of the form `<digits>[.<digits>][s|ms|us|ns]`.",
                    },
                });
                return 2;
            };
        } else if (path_opt == null) {
            path_opt = a;
        } else {
            try ctx.emitError(.{
                .code = "CLI003",
                .message = try std.fmt.allocPrint(ctx.allocator, "unexpected extra argument: {s}", .{a}),
                .help = "`cmo eval` takes one .cm source file plus optional flags (e.g. `--at 1.5s`)",
                .fix_safety = .@"requires-human-review",
                .repair = .{
                    .id = "drop-extra-arg",
                    .summary = "Remove the extra argument, or use a single .cm path.",
                },
            });
            return 2;
        }
    }

    const path = path_opt orelse {
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
    };

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

    // When `--at <t>` is given, sample the stream description at t —
    // every Constructed("animate", ...) collapses to its value at t,
    // and the rest of the tree is preserved. Same Value shape coming
    // out, so the envelope JSON contract is unchanged.
    if (at_seconds) |t| {
        if (result) |*r| {
            const sampled = try arena.allocator().alloc(eval.Binding, r.bindings.len);
            for (r.bindings, 0..) |b, bi| sampled[bi] = .{
                .name = b.name,
                .span = b.span,
                .value = try sampler.sampleAt(arena.allocator(), b.value, t),
            };
            r.bindings = sampled;
        }
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
