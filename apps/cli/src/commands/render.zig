const std = @import("std");
const diag = @import("../diagnostics.zig");
const ts = @import("../tree_sitter.zig");
const ast = @import("../ast.zig");
const lower = @import("../lower.zig");
const eval = @import("../eval.zig");
const sampler = @import("../sampler.zig");
const render = @import("../render.zig");
const Context = @import("../cli.zig").Context;

const max_source_bytes: usize = 16 * 1024 * 1024;

/// `cmo render [--at <t>] [--out <file>] [--width <px>] [--height <px>] <file.cm>`
///
/// Pipeline: parse → lower → eval → sample at t → render → write PPM.
/// Picks the first binding's value as the "scene" to render (today, that's
/// invariably the top-level scene declaration; a future `--scene <name>`
/// flag will let you select among multiple).
pub fn run(ctx: Context, args: []const []const u8) !u8 {
    var path_opt: ?[]const u8 = null;
    var out_opt: ?[]const u8 = null;
    var at_seconds: f64 = 0;
    var width: u32 = render.default_width;
    var height: u32 = render.default_height;

    var i: usize = 0;
    while (i < args.len) : (i += 1) {
        const a = args[i];
        if (std.mem.eql(u8, a, "--at")) {
            i += 1;
            if (i >= args.len) return try missing(ctx, "--at", "1.5s");
            at_seconds = sampler.parseDuration(args[i]) catch return try invalidAt(ctx, args[i]);
        } else if (std.mem.eql(u8, a, "--out")) {
            i += 1;
            if (i >= args.len) return try missing(ctx, "--out", "frame.ppm");
            out_opt = args[i];
        } else if (std.mem.eql(u8, a, "--width")) {
            i += 1;
            if (i >= args.len) return try missing(ctx, "--width", "320");
            width = std.fmt.parseInt(u32, args[i], 10) catch return try invalidDim(ctx, "--width", args[i]);
        } else if (std.mem.eql(u8, a, "--height")) {
            i += 1;
            if (i >= args.len) return try missing(ctx, "--height", "180");
            height = std.fmt.parseInt(u32, args[i], 10) catch return try invalidDim(ctx, "--height", args[i]);
        } else if (path_opt == null) {
            path_opt = a;
        } else {
            try ctx.emitError(.{
                .code = "CLI003",
                .message = try std.fmt.allocPrint(ctx.allocator, "unexpected extra argument: {s}", .{a}),
                .help = "`cmo render` takes one .cm source plus optional flags (--at, --out, --width, --height)",
                .fix_safety = .@"requires-human-review",
                .repair = .{ .id = "drop-extra-arg", .summary = "Remove the extra argument." },
            });
            return 2;
        }
    }

    const path = path_opt orelse {
        try ctx.emitError(.{
            .code = "CLI002",
            .message = "`render` requires a source file argument",
            .help = "pass a .cm source file: `cmo render --out frame.ppm src/main.cm`",
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
            .fix_safety = .@"requires-human-review",
            .repair = .{ .id = "supply-valid-path", .summary = "Pass a readable .cm file." },
        });
        return 66;
    };

    var parsed = ts.parse(source) catch |err| {
        try ctx.emitError(.{
            .code = "PAR000",
            .message = try std.fmt.allocPrint(ctx.allocator, "parser failed to initialise: {s}", .{@errorName(err)}),
            .span = .{ .path = path },
            .fix_safety = .@"requires-human-review",
            .repair = .{ .id = "report-bug", .summary = "Open an issue." },
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
            .span = .{ .path = path, .line = start.row + 1, .column = start.column + 1 },
            .help = "fix the parse error before rendering; `cmo parse <file>` shows the CST",
            .fix_safety = .@"requires-human-review",
            .repair = .{ .id = "fix-syntax", .summary = "Resolve the syntax error." },
        });
        return 1;
    }

    var arena = std.heap.ArenaAllocator.init(ctx.allocator);
    defer arena.deinit();

    var lowerer = lower.Lowerer.init(arena.allocator(), source);
    const program = lowerer.lowerProgram(root) catch |err| {
        try ctx.emitError(.{
            .code = "LWR000",
            .message = try std.fmt.allocPrint(ctx.allocator, "lowering failed: {s}", .{@errorName(err)}),
            .span = .{ .path = path },
            .fix_safety = .@"requires-human-review",
            .repair = .{ .id = "extend-lowering", .summary = "Add a lower.zig branch." },
        });
        return 1;
    };

    var evaluator = eval.Evaluator.init(arena.allocator(), ctx.allocator, source, path);
    defer evaluator.deinit();
    const eval_result = try evaluator.evalProgram(program);

    var has_error = false;
    for (evaluator.diagnostics.items) |d| {
        if (d.severity == .@"error") has_error = true;
    }
    if (has_error) {
        try diag.writeText(ctx.stdout, .{ .ok = false, .diagnostics = evaluator.diagnostics.items });
        try ctx.timing.writeText(ctx.stdout);
        return 1;
    }

    if (eval_result.bindings.len == 0) {
        try ctx.emitError(.{
            .code = "REN001",
            .message = "no scene to render",
            .span = .{ .path = path },
            .help = "the program has no top-level let or scene/component decl with default params — add one",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "add-scene",
                .summary = "Add a `scene name() -> Frame { compose [...] }` whose params all have defaults.",
            },
        });
        return 1;
    }

    // Sample the first binding at t.
    const scene_value = eval_result.bindings[0].value;
    const sampled = try sampler.sampleAt(arena.allocator(), scene_value, at_seconds);

    const fb = try render.renderTree(arena.allocator(), sampled, width, height);

    // Write either to --out or stdout. The terminal probably doesn't
    // want a raw PPM stream on stdout, but it's useful for piping into
    // `display -` or similar.
    if (out_opt) |out_path| {
        var file = std.fs.cwd().createFile(out_path, .{}) catch |err| {
            try ctx.emitError(.{
                .code = "REN002",
                .message = try std.fmt.allocPrint(
                    ctx.allocator,
                    "could not write output file {s}: {s}",
                    .{ out_path, @errorName(err) },
                ),
                .span = .{ .path = out_path },
                .fix_safety = .@"requires-human-review",
                .repair = .{ .id = "fix-output-path", .summary = "Ensure the directory exists and is writable." },
            });
            return 1;
        };
        defer file.close();
        var file_buf: [4096]u8 = undefined;
        var file_writer = file.writer(&file_buf);
        try render.writePpm(fb, &file_writer.interface);
        try file_writer.interface.flush();

        try ctx.stdout.print(
            "rendered {d}×{d} at t={d}s -> {s}\n",
            .{ fb.width, fb.height, at_seconds, out_path },
        );
        try ctx.timing.writeText(ctx.stdout);
    } else {
        try render.writePpm(fb, ctx.stdout);
    }
    return 0;
}

fn missing(ctx: Context, flag: []const u8, example: []const u8) !u8 {
    try ctx.emitError(.{
        .code = "CLI002",
        .message = try std.fmt.allocPrint(ctx.allocator, "`{s}` requires an argument (e.g. `{s} {s}`)", .{ flag, flag, example }),
        .fix_safety = .@"requires-human-review",
        .repair = .{ .id = "supply-flag-value", .summary = "Provide a value after the flag." },
    });
    return 2;
}

fn invalidAt(ctx: Context, given: []const u8) !u8 {
    try ctx.emitError(.{
        .code = "CLI011",
        .message = try std.fmt.allocPrint(ctx.allocator, "could not parse `--at {s}` as a duration", .{given}),
        .help = "use digits with an optional s/ms/us/ns suffix (e.g. `1.5s`)",
        .fix_safety = .@"requires-human-review",
        .repair = .{ .id = "fix-at-duration", .summary = "Pass a duration like 1.5s or 500ms." },
    });
    return 2;
}

fn invalidDim(ctx: Context, flag: []const u8, given: []const u8) !u8 {
    try ctx.emitError(.{
        .code = "CLI012",
        .message = try std.fmt.allocPrint(ctx.allocator, "`{s} {s}` is not a positive integer", .{ flag, given }),
        .help = "pass a positive integer (e.g. `--width 320`)",
        .fix_safety = .@"requires-human-review",
        .repair = .{ .id = "fix-dimension", .summary = "Use a positive integer pixel count." },
    });
    return 2;
}
