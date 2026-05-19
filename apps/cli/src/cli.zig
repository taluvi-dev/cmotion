const std = @import("std");
const diag = @import("diagnostics.zig");
const timing = @import("timing.zig");

const parse_cmd = @import("commands/parse.zig");
const check_cmd = @import("commands/check.zig");
const fmt_cmd = @import("commands/fmt.zig");
const eval_cmd = @import("commands/eval.zig");
const render_cmd = @import("commands/render.zig");
const bounce_cmd = @import("commands/bounce.zig");
const explain_cmd = @import("commands/explain.zig");
const version_cmd = @import("commands/version.zig");

pub const Writer = std.Io.Writer;

pub const Options = struct {
    json: bool = false,
    no_color: bool = false,
};

pub const Command = enum {
    help,
    version,
    parse,
    check,
    fmt,
    eval,
    render,
    bounce,
    explain,
};

pub const Context = struct {
    allocator: std.mem.Allocator,
    options: Options,
    stdout: *Writer,
    stderr: *Writer,
    timing: *timing.Timing,

    /// Emit a packet (just diagnostics, no extra envelope fields). Always
    /// appends the timing footer.
    pub fn emit(self: Context, packet: diag.Packet) !void {
        if (self.options.json) {
            try self.openJsonEnvelope(packet.ok, packet.diagnostics);
            try self.closeJsonEnvelope();
        } else {
            try diag.writeText(self.stdout, packet);
            try self.timing.writeText(self.stdout);
        }
    }

    pub fn emitError(self: Context, d: diag.Diagnostic) !void {
        try self.emit(.{ .ok = false, .diagnostics = &.{d} });
    }

    /// Begin a JSON envelope with shared {schemaVersion, ok, diagnostics}.
    /// Caller writes their own comma-prefixed fields, then calls
    /// closeJsonEnvelope to append `,"timing":{...}` and the closing brace.
    pub fn openJsonEnvelope(
        self: Context,
        ok: bool,
        diagnostics: []const diag.Diagnostic,
    ) !void {
        try diag.writeJsonHeader(self.stdout, ok, diagnostics);
    }

    pub fn closeJsonEnvelope(self: Context) !void {
        try self.stdout.writeAll(",\"timing\":");
        try self.timing.writeJson(self.stdout);
        try diag.writeJsonFooter(self.stdout);
    }
};

pub fn run(
    allocator: std.mem.Allocator,
    args: [][:0]u8,
    stdout: *Writer,
    stderr: *Writer,
    t: *timing.Timing,
) !u8 {
    var options: Options = .{};
    var positional: std.ArrayListUnmanaged([]const u8) = .{};
    defer positional.deinit(allocator);

    var i: usize = 1;
    while (i < args.len) : (i += 1) {
        const a = args[i];
        if (std.mem.eql(u8, a, "--json")) {
            options.json = true;
        } else if (std.mem.eql(u8, a, "--no-color")) {
            options.no_color = true;
        } else if (std.mem.eql(u8, a, "--")) {
            i += 1;
            while (i < args.len) : (i += 1) try positional.append(allocator, args[i]);
            break;
        } else {
            try positional.append(allocator, a);
        }
    }

    var ctx = Context{
        .allocator = allocator,
        .options = options,
        .stdout = stdout,
        .stderr = stderr,
        .timing = t,
    };

    if (positional.items.len == 0) {
        try printUsage(ctx.stdout);
        try t.writeText(ctx.stdout);
        return 0;
    }

    const cmd_name = positional.items[0];
    const rest = positional.items[1..];

    const cmd = parseCommand(cmd_name) orelse {
        try ctx.emitError(.{
            .code = "CLI001",
            .message = try std.fmt.allocPrint(allocator, "unknown subcommand '{s}'", .{cmd_name}),
            .help = "run `cmo help` for the list of subcommands",
            .fix_safety = .@"requires-human-review",
            .repair = .{
                .id = "use-known-subcommand",
                .summary = "Replace the subcommand with one of: help, version, parse, check, fmt, eval, render, explain.",
            },
        });
        return 2;
    };

    return switch (cmd) {
        .help => blk: {
            try printUsage(ctx.stdout);
            try t.writeText(ctx.stdout);
            break :blk @as(u8, 0);
        },
        .version => version_cmd.run(ctx, rest),
        .parse => parse_cmd.run(ctx, rest),
        .check => check_cmd.run(ctx, rest),
        .fmt => fmt_cmd.run(ctx, rest),
        .eval => eval_cmd.run(ctx, rest),
        .render => render_cmd.run(ctx, rest),
        .bounce => bounce_cmd.run(ctx, rest),
        .explain => explain_cmd.run(ctx, rest),
    };
}

fn parseCommand(s: []const u8) ?Command {
    const Entry = struct { name: []const u8, cmd: Command };
    const entries = [_]Entry{
        .{ .name = "help", .cmd = .help },
        .{ .name = "--help", .cmd = .help },
        .{ .name = "-h", .cmd = .help },
        .{ .name = "version", .cmd = .version },
        .{ .name = "--version", .cmd = .version },
        .{ .name = "-V", .cmd = .version },
        .{ .name = "parse", .cmd = .parse },
        .{ .name = "check", .cmd = .check },
        .{ .name = "fmt", .cmd = .fmt },
        .{ .name = "format", .cmd = .fmt },
        .{ .name = "eval", .cmd = .eval },
        .{ .name = "render", .cmd = .render },
        .{ .name = "bounce", .cmd = .bounce },
        .{ .name = "explain", .cmd = .explain },
    };
    for (entries) |e| if (std.mem.eql(u8, s, e.name)) return e.cmd;
    return null;
}

fn printUsage(w: *Writer) !void {
    try w.writeAll(
        \\cmotion — the cmotion DSL toolchain
        \\
        \\The binary name is `cmotion`. The installer registers `cmo` as a
        \\short alias when that name is free on your PATH, so examples below
        \\use `cmo`. Substitute `cmotion` if the alias is unavailable.
        \\
        \\USAGE
        \\    cmo <command> [options] [args...]
        \\
        \\COMMANDS
        \\    cmo parse <file>        Parse a .cm source file and print its AST
        \\    cmo check <file>        Type-check a .cm source file
        \\    cmo fmt <file>          Format a .cm source file (use --write / --check)
        \\    cmo eval [--at <t>] <file>  Evaluate top-level lets; `--at` samples the stream
        \\    cmo render [opts] <file>    Render to a PPM image (--at, --out, --width, --height)
        \\    cmo bounce [opts] <file>    Render to an animated PNG (--fps, --duration, --out, --width, --height)
        \\    cmo explain <code>      Show the long-form explanation for a diagnostic code
        \\    cmo version             Print the cmotion version
        \\    cmo help                Show this message
        \\
        \\GLOBAL OPTIONS
        \\    --json                  Emit a structured diagnostic packet on stdout
        \\    --no-color              Disable ANSI color in human output
        \\
        \\EXAMPLES
        \\    cmo parse src/main.cm
        \\    cmo --json check src/main.cm
        \\    cmo explain CLI001
        \\
    );
}
