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

/// `cmo bounce [--fps N] [--duration <t>] [--out file.apng] [--width W] [--height H] <file.cm>`
///
/// Renders the scene as a sequence of frames covering
/// `[0, duration]` at the given frame rate, then writes them as an
/// animated PNG (APNG) at `--out`. The full pipeline is the same
/// as `cmo render`, just repeated per-frame with the time
/// argument advanced.
///
/// Defaults: `--fps 30`, `--duration 6s`, output `bounce.apng` in
/// the cwd, canvas matches `--width / --height` (default 320×180).
pub fn run(ctx: Context, args: []const []const u8) !u8 {
    var path_opt: ?[]const u8 = null;
    var out_path: []const u8 = "bounce.apng";
    var duration_s: f64 = 6.0;
    var fps: u32 = 30;
    var width: u32 = render.default_width;
    var height: u32 = render.default_height;

    var i: usize = 0;
    while (i < args.len) : (i += 1) {
        const a = args[i];
        if (std.mem.eql(u8, a, "--fps")) {
            i += 1;
            if (i >= args.len) return try missing(ctx, "--fps", "30");
            fps = std.fmt.parseInt(u32, args[i], 10) catch return try invalidInt(ctx, "--fps", args[i]);
        } else if (std.mem.eql(u8, a, "--duration")) {
            i += 1;
            if (i >= args.len) return try missing(ctx, "--duration", "6s");
            duration_s = sampler.parseDuration(args[i]) catch return try invalidDuration(ctx, args[i]);
        } else if (std.mem.eql(u8, a, "--out")) {
            i += 1;
            if (i >= args.len) return try missing(ctx, "--out", "bounce.apng");
            out_path = args[i];
        } else if (std.mem.eql(u8, a, "--width")) {
            i += 1;
            if (i >= args.len) return try missing(ctx, "--width", "1920");
            width = std.fmt.parseInt(u32, args[i], 10) catch return try invalidInt(ctx, "--width", args[i]);
        } else if (std.mem.eql(u8, a, "--height")) {
            i += 1;
            if (i >= args.len) return try missing(ctx, "--height", "1080");
            height = std.fmt.parseInt(u32, args[i], 10) catch return try invalidInt(ctx, "--height", args[i]);
        } else if (path_opt == null) {
            path_opt = a;
        } else {
            try ctx.emitError(.{
                .code = "CLI003",
                .message = try std.fmt.allocPrint(ctx.allocator, "unexpected extra argument: {s}", .{a}),
                .help = "`cmo bounce` takes one .cm source plus optional flags (--fps, --duration, --out, --width, --height)",
                .fix_safety = .@"requires-human-review",
                .repair = .{ .id = "drop-extra-arg", .summary = "Remove the extra argument." },
            });
            return 2;
        }
    }

    const path = path_opt orelse {
        try ctx.emitError(.{
            .code = "CLI002",
            .message = "`bounce` requires a source file argument",
            .help = "pass a .cm source file: `cmo bounce --out scene.apng src/main.cm`",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "supply-source-file",
                .summary = "Add a single .cm source file as the first positional argument.",
            },
        });
        return 2;
    };

    const source = std.fs.cwd().readFileAlloc(ctx.allocator, path, max_source_bytes) catch |err| {
        try ctx.emitError(.{
            .code = "CLI005",
            .message = try std.fmt.allocPrint(ctx.allocator, "could not read {s}: {s}", .{ path, @errorName(err) }),
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
            .help = "fix the parse error before bouncing; `cmo parse <file>` shows the CST",
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
            .message = "no scene to bounce",
            .span = .{ .path = path },
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "add-scene",
                .summary = "Add a `scene name() -> Frame { compose [...] }` whose params all have defaults.",
            },
        });
        return 1;
    }

    const scene_value = eval_result.bindings[0].value;

    const total_frames = @as(u32, @intFromFloat(@ceil(duration_s * @as(f64, @floatFromInt(fps)))));
    if (total_frames == 0) {
        try ctx.emitError(.{
            .code = "REN001",
            .message = "duration × fps is zero — no frames to render",
            .fix_safety = .@"requires-human-review",
            .repair = .{ .id = "fix-duration", .summary = "Set --duration > 0 and --fps > 0." },
        });
        return 1;
    }

    // Pick output format from the --out extension. `.mp4` → shell
    // out to ffmpeg (PNG sequence in a tmp dir + libx264 mux);
    // anything else → animated PNG, written inline via our PNG
    // encoder. MP4 needs ffmpeg installed; APNG has zero external
    // dependencies and works everywhere our renderer does.
    if (std.mem.endsWith(u8, out_path, ".mp4")) {
        return runMp4(ctx, arena.allocator(), scene_value, out_path, width, height, fps, total_frames, duration_s);
    }
    return runApng(ctx, arena.allocator(), scene_value, out_path, width, height, fps, total_frames, duration_s);
}

fn runApng(
    ctx: Context,
    arena: std.mem.Allocator,
    scene_value: @import("../value.zig").Value,
    out_path: []const u8,
    width: u32,
    height: u32,
    fps: u32,
    total_frames: u32,
    duration_s: f64,
) !u8 {
    var file = std.fs.cwd().createFile(out_path, .{}) catch |err| {
        try ctx.emitError(.{
            .code = "REN002",
            .message = try std.fmt.allocPrint(ctx.allocator, "could not write output file {s}: {s}", .{ out_path, @errorName(err) }),
            .span = .{ .path = out_path },
            .fix_safety = .@"requires-human-review",
            .repair = .{ .id = "fix-output-path", .summary = "Ensure the directory exists and is writable." },
        });
        return 1;
    };
    defer file.close();

    var file_buf: [4096]u8 = undefined;
    var file_writer = file.writer(&file_buf);

    var aw = try render.ApngWriter.init(
        arena,
        &file_writer.interface,
        width,
        height,
        1,
        @intCast(fps),
        total_frames,
    );

    var f: u32 = 0;
    while (f < total_frames) : (f += 1) {
        const t = @as(f64, @floatFromInt(f)) / @as(f64, @floatFromInt(fps));
        var frame_arena = std.heap.ArenaAllocator.init(ctx.allocator);
        defer frame_arena.deinit();
        const fa = frame_arena.allocator();
        const sampled = try sampler.sampleAt(fa, scene_value, t);
        const fb = try render.renderTree(fa, sampled, width, height);
        try aw.writeFrame(fb);
    }
    try aw.finish();
    try file_writer.interface.flush();

    try ctx.stdout.print(
        "bounced {d} frames at {d}fps ({d:.2}s) {d}×{d} -> {s}\n",
        .{ total_frames, fps, duration_s, width, height, out_path },
    );
    try ctx.timing.writeText(ctx.stdout);
    return 0;
}

fn runMp4(
    ctx: Context,
    arena: std.mem.Allocator,
    scene_value: @import("../value.zig").Value,
    out_path: []const u8,
    width: u32,
    height: u32,
    fps: u32,
    total_frames: u32,
    duration_s: f64,
) !u8 {
    // 1. Make a tmp dir for the PNG sequence.
    var tmpl_buf: [256]u8 = undefined;
    const tmpl = try std.fmt.bufPrint(&tmpl_buf, "/tmp/cmo-bounce-{d}-XXXXXX", .{std.os.linux.getpid()});
    const tmp_dir_path = try arena.dupe(u8, tmpl);
    // Replace XXXXXX with the current ns timestamp; cheap and good enough.
    const ns = std.time.nanoTimestamp();
    const ts_str = try std.fmt.allocPrint(arena, "{x}", .{@as(u64, @intCast(@mod(ns, 0xFFFFFFFFFF)))});
    @memcpy(tmp_dir_path[tmp_dir_path.len - 6 ..][0..@min(6, ts_str.len)], ts_str[0..@min(6, ts_str.len)]);

    try std.fs.cwd().makePath(tmp_dir_path);
    defer std.fs.cwd().deleteTree(tmp_dir_path) catch {};

    // 2. Render the frame sequence.
    var f: u32 = 0;
    while (f < total_frames) : (f += 1) {
        const t = @as(f64, @floatFromInt(f)) / @as(f64, @floatFromInt(fps));
        var frame_arena = std.heap.ArenaAllocator.init(ctx.allocator);
        defer frame_arena.deinit();
        const fa = frame_arena.allocator();

        const sampled = try sampler.sampleAt(fa, scene_value, t);
        const fb = try render.renderTree(fa, sampled, width, height);

        const frame_path = try std.fmt.allocPrint(fa, "{s}/f{d:0>5}.png", .{ tmp_dir_path, f });
        var frame_file = try std.fs.cwd().createFile(frame_path, .{});
        defer frame_file.close();
        var frame_buf: [4096]u8 = undefined;
        var frame_writer = frame_file.writer(&frame_buf);
        try render.writePng(fa, fb, &frame_writer.interface);
        try frame_writer.interface.flush();
    }

    // 3. Shell out to ffmpeg.
    const fps_str = try std.fmt.allocPrint(arena, "{d}", .{fps});
    const input_pattern = try std.fmt.allocPrint(arena, "{s}/f%05d.png", .{tmp_dir_path});
    const argv = [_][]const u8{
        "ffmpeg",
        "-y",                   "-loglevel",   "error",
        "-framerate",           fps_str,
        "-i",                   input_pattern,
        "-c:v",                 "libx264",
        "-preset",              "slow",
        "-pix_fmt",             "yuv420p",
        "-crf",                 "18",
        out_path,
    };
    var child = std.process.Child.init(&argv, ctx.allocator);
    child.stderr_behavior = .Pipe;
    child.stdout_behavior = .Pipe;
    child.spawn() catch |err| {
        try ctx.emitError(.{
            .code = "REN003",
            .message = try std.fmt.allocPrint(ctx.allocator, "could not spawn ffmpeg: {s}", .{@errorName(err)}),
            .help = "MP4 output requires ffmpeg on the PATH. Install it (e.g. `apt install ffmpeg`) or use a .apng output for a no-dependency path.",
            .fix_safety = .@"requires-human-review",
            .repair = .{ .id = "install-ffmpeg", .summary = "Install ffmpeg, or change --out to a .apng file." },
        });
        return 1;
    };
    const result = try child.wait();
    if (result != .Exited or result.Exited != 0) {
        try ctx.emitError(.{
            .code = "REN003",
            .message = try std.fmt.allocPrint(ctx.allocator, "ffmpeg exited non-zero ({s})", .{@tagName(result)}),
            .fix_safety = .@"requires-human-review",
            .repair = .{ .id = "check-ffmpeg-output", .summary = "Re-run with the frames preserved to inspect ffmpeg's stderr." },
        });
        return 1;
    }

    try ctx.stdout.print(
        "bounced {d} frames at {d}fps ({d:.2}s) {d}×{d} -> {s}\n",
        .{ total_frames, fps, duration_s, width, height, out_path },
    );
    try ctx.timing.writeText(ctx.stdout);
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

fn invalidInt(ctx: Context, flag: []const u8, given: []const u8) !u8 {
    try ctx.emitError(.{
        .code = "CLI012",
        .message = try std.fmt.allocPrint(ctx.allocator, "`{s} {s}` is not a positive integer", .{ flag, given }),
        .fix_safety = .@"requires-human-review",
        .repair = .{ .id = "fix-integer", .summary = "Use a positive integer value." },
    });
    return 2;
}

fn invalidDuration(ctx: Context, given: []const u8) !u8 {
    try ctx.emitError(.{
        .code = "CLI011",
        .message = try std.fmt.allocPrint(ctx.allocator, "could not parse `--duration {s}` as a duration", .{given}),
        .help = "use digits with an optional s/ms/us/ns suffix (e.g. `6s`)",
        .fix_safety = .@"requires-human-review",
        .repair = .{ .id = "fix-duration", .summary = "Pass a duration like 6s or 500ms." },
    });
    return 2;
}
