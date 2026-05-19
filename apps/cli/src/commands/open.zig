const std = @import("std");
const diag = @import("../diagnostics.zig");
const Context = @import("../cli.zig").Context;

const max_source_bytes: usize = 16 * 1024 * 1024;

// ---- Embedded viewer assets -------------------------------------
//
// The whole browser viewer ships inside the native binary so `cmo
// open` is self-contained: no network access required, no external
// asset paths. The wasm + three.js are vendored / built and routed
// through anonymous imports in build.zig.

const index_html = @embedFile("viewer_index_html");
const cmotion_three_js = @embedFile("viewer_cmotion_three_js");
const three_module_min_js = @embedFile("three_module_min_js");
const cmotion_render_wasm = @embedFile("cmotion_render_wasm");

/// `cmo open [--port N] [--no-browser] <file.cm>`
///
/// Boots a tiny localhost HTTP server that serves an embedded
/// browser viewer (Three.js renderer + WASM-hosted interpreter) for
/// the given `.cm` source. Opens the default browser at the listen
/// URL unless `--no-browser` is passed.
///
/// The server runs in the foreground; Ctrl+C exits.
pub fn run(ctx: Context, args: []const []const u8) !u8 {
    var path_opt: ?[]const u8 = null;
    var port: u16 = 0; // 0 = let the OS pick
    var open_browser = true;

    var i: usize = 0;
    while (i < args.len) : (i += 1) {
        const a = args[i];
        if (std.mem.eql(u8, a, "--port")) {
            i += 1;
            if (i >= args.len) return try missing(ctx, "--port", "8765");
            port = std.fmt.parseInt(u16, args[i], 10) catch return try invalidPort(ctx, args[i]);
        } else if (std.mem.eql(u8, a, "--no-browser")) {
            open_browser = false;
        } else if (path_opt == null) {
            path_opt = a;
        } else {
            try ctx.emitError(.{
                .code = "CLI003",
                .message = try std.fmt.allocPrint(ctx.allocator, "unexpected extra argument: {s}", .{a}),
                .help = "`cmo open` takes one .cm source plus optional --port / --no-browser",
                .fix_safety = .@"requires-human-review",
                .repair = .{ .id = "drop-extra-arg", .summary = "Remove the extra argument." },
            });
            return 2;
        }
    }

    const path = path_opt orelse {
        try ctx.emitError(.{
            .code = "CLI002",
            .message = "`open` requires a source file argument",
            .help = "pass a .cm source file: `cmo open scene.cm`",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "supply-source-file",
                .summary = "Add a single .cm source file as the first positional argument.",
            },
        });
        return 2;
    };

    // Resolve to an absolute path now; the server reads the file on
    // every `/scene.cm` request so an edit-and-reload cycle picks up
    // changes without restarting.
    const cwd_path = try std.fs.cwd().realpathAlloc(ctx.allocator, ".");
    defer ctx.allocator.free(cwd_path);
    const source_abs = try std.fs.path.resolve(ctx.allocator, &.{ cwd_path, path });
    defer ctx.allocator.free(source_abs);

    // Make sure the file exists upfront so we fail fast with a real
    // CLI005 instead of a 404 inside the browser.
    {
        const probe = std.fs.openFileAbsolute(source_abs, .{}) catch |err| {
            const msg = switch (err) {
                error.FileNotFound => try std.fmt.allocPrint(ctx.allocator, "file not found: {s}", .{path}),
                error.AccessDenied => try std.fmt.allocPrint(ctx.allocator, "permission denied: {s}", .{path}),
                else => try std.fmt.allocPrint(ctx.allocator, "could not open {s}: {s}", .{ path, @errorName(err) }),
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
        probe.close();
    }

    const addr = try std.net.Address.parseIp4("127.0.0.1", port);
    var listener = addr.listen(.{ .reuse_address = true }) catch |err| {
        try ctx.emitError(.{
            .code = "CLI007",
            .message = try std.fmt.allocPrint(ctx.allocator, "could not bind 127.0.0.1:{d}: {s}", .{ port, @errorName(err) }),
            .help = "try a different --port, or omit --port to let the OS choose",
            .fix_safety = .@"requires-human-review",
            .repair = .{ .id = "pick-free-port", .summary = "Use --port with a free TCP port." },
        });
        return 1;
    };
    defer listener.deinit();

    const bound_port = listener.listen_address.in.getPort();
    const url = try std.fmt.allocPrint(ctx.allocator, "http://127.0.0.1:{d}/", .{bound_port});
    defer ctx.allocator.free(url);

    try ctx.stderr.print("cmo open: serving {s} at {s}\n", .{ path, url });
    try ctx.stderr.flush();

    if (open_browser) {
        spawnBrowser(ctx.allocator, url) catch |err| {
            try ctx.stderr.print("cmo open: could not launch browser ({s}); open {s} manually\n", .{ @errorName(err), url });
            try ctx.stderr.flush();
        };
    }

    while (true) {
        const conn = listener.accept() catch |err| {
            try ctx.stderr.print("cmo open: accept failed: {s}\n", .{@errorName(err)});
            try ctx.stderr.flush();
            continue;
        };
        handleConnection(ctx.allocator, conn, source_abs) catch |err| {
            // Per-connection failures should never take down the server.
            std.log.warn("cmo open: connection failed: {s}", .{@errorName(err)});
        };
    }
}

fn handleConnection(allocator: std.mem.Allocator, conn: std.net.Server.Connection, source_path: []const u8) !void {
    defer conn.stream.close();

    var read_buf: [16 * 1024]u8 = undefined;
    var write_buf: [16 * 1024]u8 = undefined;
    var stream_reader = conn.stream.reader(&read_buf);
    var stream_writer = conn.stream.writer(&write_buf);
    var server = std.http.Server.init(stream_reader.interface(), &stream_writer.interface);

    // Single request per connection in v0 — `keep_alive: false` and a
    // single iteration. Static-file responses are tiny by HTTP
    // standards, the browser opens a few parallel connections, and
    // the simpler control flow is worth the (marginal) extra TCP
    // setup cost.
    var request = server.receiveHead() catch return;
    try route(allocator, &request, source_path);
}

fn route(allocator: std.mem.Allocator, request: *std.http.Server.Request, source_path: []const u8) !void {
    const target = request.head.target;
    // Strip query string — viewer doesn't use any in v0, but a bare
    // `/?cache=…` from the browser shouldn't 404.
    const qmark = std.mem.indexOfScalar(u8, target, '?');
    const path = if (qmark) |q| target[0..q] else target;

    if (std.mem.eql(u8, path, "/") or std.mem.eql(u8, path, "/index.html")) {
        return respondBytes(request, "text/html; charset=utf-8", index_html);
    }
    if (std.mem.eql(u8, path, "/cmotion-three.js")) {
        return respondBytes(request, "text/javascript; charset=utf-8", cmotion_three_js);
    }
    if (std.mem.eql(u8, path, "/three.module.min.js")) {
        return respondBytes(request, "text/javascript; charset=utf-8", three_module_min_js);
    }
    if (std.mem.eql(u8, path, "/cmotion-render.wasm")) {
        return respondBytes(request, "application/wasm", cmotion_render_wasm);
    }
    if (std.mem.eql(u8, path, "/scene.cm")) {
        const bytes = std.fs.openFileAbsolute(source_path, .{}) catch
            return respondStatus(request, .not_found, "scene not found");
        defer bytes.close();
        const data = bytes.readToEndAlloc(allocator, max_source_bytes) catch
            return respondStatus(request, .internal_server_error, "read failed");
        defer allocator.free(data);
        return respondBytes(request, "text/plain; charset=utf-8", data);
    }
    return respondStatus(request, .not_found, "not found");
}

fn respondBytes(request: *std.http.Server.Request, content_type: []const u8, body: []const u8) !void {
    try request.respond(body, .{
        .status = .ok,
        .keep_alive = false,
        .extra_headers = &.{
            .{ .name = "content-type", .value = content_type },
            // The viewer relies on cross-origin isolated features
            // (e.g. SharedArrayBuffer if/when WebCodecs needs it).
            // Harmless on a localhost dev server today; future-proof.
            .{ .name = "cache-control", .value = "no-store" },
        },
    });
}

fn respondStatus(request: *std.http.Server.Request, status: std.http.Status, message: []const u8) !void {
    try request.respond(message, .{
        .status = status,
        .keep_alive = false,
        .extra_headers = &.{
            .{ .name = "content-type", .value = "text/plain; charset=utf-8" },
        },
    });
}

fn spawnBrowser(allocator: std.mem.Allocator, url: []const u8) !void {
    const argv: []const []const u8 = switch (@import("builtin").os.tag) {
        .macos => &.{ "open", url },
        .windows => &.{ "cmd", "/c", "start", "", url },
        else => &.{ "xdg-open", url },
    };
    var child = std.process.Child.init(argv, allocator);
    child.stdin_behavior = .Ignore;
    child.stdout_behavior = .Ignore;
    child.stderr_behavior = .Ignore;
    try child.spawn();
    // Detach — we don't care about the browser exit code, and waiting
    // would block the server loop until the browser closes.
    _ = child.wait() catch {};
}

fn missing(ctx: Context, flag: []const u8, example: []const u8) !u8 {
    try ctx.emitError(.{
        .code = "CLI004",
        .message = try std.fmt.allocPrint(ctx.allocator, "missing value for {s}", .{flag}),
        .help = try std.fmt.allocPrint(ctx.allocator, "example: {s} {s}", .{ flag, example }),
        .fix_safety = .@"requires-human-review",
        .repair = .{ .id = "supply-flag-value", .summary = "Provide a value after the flag." },
    });
    return 2;
}

fn invalidPort(ctx: Context, value: []const u8) !u8 {
    try ctx.emitError(.{
        .code = "CLI008",
        .message = try std.fmt.allocPrint(ctx.allocator, "invalid --port value: {s}", .{value}),
        .help = "pass an integer in 1..65535 (or omit --port to auto-pick)",
        .fix_safety = .@"requires-human-review",
        .repair = .{ .id = "supply-port-int", .summary = "Use a TCP port number." },
    });
    return 2;
}
