const std = @import("std");
const diag = @import("../diagnostics.zig");
const ts = @import("../tree_sitter.zig");
const lower = @import("../lower.zig");
const fmt_pass = @import("../fmt.zig");
const Context = @import("../cli.zig").Context;

const max_source_bytes: usize = 16 * 1024 * 1024;

const Mode = enum { print, write, check };

pub fn run(ctx: Context, args: []const []const u8) !u8 {
    var mode: Mode = .print;
    var write_seen = false;
    var check_seen = false;
    var path_opt: ?[]const u8 = null;

    for (args) |a| {
        if (std.mem.eql(u8, a, "--write") or std.mem.eql(u8, a, "-w")) {
            mode = .write;
            write_seen = true;
        } else if (std.mem.eql(u8, a, "--check")) {
            mode = .check;
            check_seen = true;
        } else if (a.len > 0 and a[0] == '-' and !std.mem.eql(u8, a, "-")) {
            try ctx.emitError(.{
                .code = "CLI007",
                .message = try std.fmt.allocPrint(ctx.allocator, "unknown fmt flag '{s}'", .{a}),
                .help = "supported flags: --write, --check",
                .fix_safety = .@"requires-human-review",
                .repair = .{
                    .id = "drop-unknown-flag",
                    .summary = "Remove the unknown flag or replace it with --write / --check.",
                },
            });
            return 2;
        } else if (path_opt == null) {
            path_opt = a;
        } else {
            try ctx.emitError(.{
                .code = "CLI008",
                .message = "`fmt` accepts at most one source file",
                .help = "format files one at a time for now; multi-file batch support will land later",
                .fix_safety = .@"requires-human-review",
                .repair = .{
                    .id = "single-file",
                    .summary = "Pass a single .cm path; loop in your shell for multiple files.",
                },
            });
            return 2;
        }
    }

    if (write_seen and check_seen) {
        try ctx.emitError(.{
            .code = "CLI009",
            .message = "`--write` and `--check` are mutually exclusive",
            .help = "use --check in CI to verify, --write locally to rewrite",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "pick-one-mode",
                .summary = "Pass either --write or --check, not both.",
            },
        });
        return 2;
    }

    const path = path_opt orelse {
        try ctx.emitError(.{
            .code = "CLI002",
            .message = "`fmt` requires a source file argument",
            .help = "pass a .cm source file: `cmo fmt src/main.cm`",
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
            .help = "fix the syntax error first; `cmo fmt` only rewrites a clean parse",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "fix-syntax",
                .summary = "Resolve the syntax error reported by the parser.",
            },
        });
        return 1;
    }

    var arena = std.heap.ArenaAllocator.init(ctx.allocator);
    defer arena.deinit();

    var lowerer = lower.Lowerer.init(arena.allocator(), source);
    const program = lowerer.lowerProgram(root) catch |err| {
        try ctx.emitError(.{
            .code = "LWR000",
            .message = try std.fmt.allocPrint(
                ctx.allocator,
                "lowering failed on a clean CST: {s}",
                .{@errorName(err)},
            ),
            .span = .{ .path = path },
            .help = "the formatter walks the AST; a lowering gap blocks it",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "extend-lowering",
                .summary = "Add a branch to lower.zig for the missing CST node kind.",
            },
        });
        return 70;
    };

    const formatted = try fmt_pass.format(ctx.allocator, source, program);
    defer ctx.allocator.free(formatted);

    const changed = !std.mem.eql(u8, source, formatted);

    return switch (mode) {
        .print => try doPrint(ctx, path, formatted, changed),
        .write => try doWrite(ctx, path, formatted, changed),
        .check => try doCheck(ctx, path, formatted, changed),
    };
}

fn doPrint(ctx: Context, path: []const u8, formatted: []const u8, changed: bool) !u8 {
    if (ctx.options.json) {
        try writeJsonEnvelope(ctx, path, formatted, changed, &.{}, true);
    } else {
        // gofmt-style: the formatted source IS stdout; no timing footer or
        // status line, so the output can be piped straight to a file.
        try ctx.stdout.writeAll(formatted);
    }
    return 0;
}

fn doWrite(ctx: Context, path: []const u8, formatted: []const u8, changed: bool) !u8 {
    if (changed) {
        std.fs.cwd().writeFile(.{ .sub_path = path, .data = formatted }) catch |err| {
            try ctx.emitError(.{
                .code = "CLI010",
                .message = try std.fmt.allocPrint(
                    ctx.allocator,
                    "could not write {s}: {s}",
                    .{ path, @errorName(err) },
                ),
                .span = .{ .path = path },
                .help = "check that the file is writable and the working directory is correct",
                .fix_safety = .@"requires-human-review",
                .repair = .{
                    .id = "make-writable",
                    .summary = "Ensure the file is writable, then rerun `cmo fmt --write`.",
                },
            });
            return 73;
        };
    }

    if (ctx.options.json) {
        try writeJsonEnvelope(ctx, path, formatted, changed, &.{}, true);
    } else {
        try ctx.stdout.print(
            "{s}: {s}\n",
            .{ if (changed) "wrote" else "unchanged", path },
        );
        try ctx.timing.writeText(ctx.stdout);
    }
    return 0;
}

fn doCheck(ctx: Context, path: []const u8, formatted: []const u8, changed: bool) !u8 {
    var diags: std.ArrayListUnmanaged(diag.Diagnostic) = .{};
    defer diags.deinit(ctx.allocator);

    if (changed) {
        try diags.append(ctx.allocator, .{
            .code = "FMT001",
            .message = "file is not formatted",
            .span = .{ .path = path },
            .help = "run `cmo fmt --write <path>` to rewrite it in place",
            .fix_safety = .@"format-only",
            .repair = .{
                .id = "run-fmt-write",
                .summary = "Rerun with --write to apply the formatter.",
            },
        });
    }

    if (ctx.options.json) {
        try writeJsonEnvelope(ctx, path, formatted, changed, diags.items, !changed);
    } else {
        try diag.writeText(ctx.stdout, .{ .ok = !changed, .diagnostics = diags.items });
        if (!changed) try ctx.stdout.print("ok: {s}\n", .{path});
        try ctx.timing.writeText(ctx.stdout);
    }
    return if (changed) @as(u8, 1) else @as(u8, 0);
}

fn writeJsonEnvelope(
    ctx: Context,
    path: []const u8,
    formatted: []const u8,
    changed: bool,
    diagnostics: []const diag.Diagnostic,
    ok: bool,
) !void {
    const w = ctx.stdout;
    try ctx.openJsonEnvelope(ok, diagnostics);
    try w.writeAll(",\"path\":");
    try diag.writeJsonString(w, path);
    try w.writeAll(",\"changed\":");
    try w.writeAll(if (changed) "true" else "false");
    try w.writeAll(",\"formatted\":");
    try diag.writeJsonString(w, formatted);
    try ctx.closeJsonEnvelope();
}
