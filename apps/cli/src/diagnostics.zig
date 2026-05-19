//! Diagnostic packet shape, modeled on Vercel Zero's `--json` contract.
//!
//! Every subcommand emits this same envelope. Stages downstream of the CLI
//! (parser, typechecker, interpreter, backends) reuse the same shape with
//! their own code namespaces.

const std = @import("std");

pub const schema_version: u32 = 1;

pub const Severity = enum { @"error", warning, note };

/// Fix-safety ladder. Tools decide what to auto-apply based on this label.
pub const FixSafety = enum {
    @"format-only",
    @"behavior-preserving",
    @"local-edit",
    @"api-changing",
    @"requires-human-review",
};

pub const Span = struct {
    path: []const u8,
    line: u32 = 0,
    column: u32 = 0,
    length: u32 = 0,
};

pub const Repair = struct {
    id: []const u8 = "manual-review",
    summary: []const u8 = "Inspect the diagnostic fields and choose a repair manually.",
};

pub const Diagnostic = struct {
    severity: Severity = .@"error",
    code: []const u8,
    message: []const u8,
    span: ?Span = null,
    expected: ?[]const u8 = null,
    actual: ?[]const u8 = null,
    help: ?[]const u8 = null,
    fix_safety: FixSafety = .@"requires-human-review",
    repair: Repair = .{},
    related: []const Diagnostic = &.{},
};

pub const Packet = struct {
    schema_version: u32 = schema_version,
    ok: bool,
    diagnostics: []const Diagnostic,
};

/// Write the JSON envelope. We hand-roll the shape so field names stay stable
/// regardless of internal Zig identifier renames (e.g. `fix_safety` ->
/// `fixSafety`).
pub fn writeJson(writer: anytype, packet: Packet) !void {
    try writer.writeAll("{\"schemaVersion\":");
    try std.fmt.format(writer, "{d}", .{packet.schema_version});
    try writer.writeAll(",\"ok\":");
    try writer.writeAll(if (packet.ok) "true" else "false");
    try writer.writeAll(",\"diagnostics\":[");
    for (packet.diagnostics, 0..) |d, i| {
        if (i != 0) try writer.writeAll(",");
        try writeDiagnostic(writer, d);
    }
    try writer.writeAll("]}\n");
}

fn writeDiagnostic(writer: anytype, d: Diagnostic) !void {
    try writer.writeAll("{\"severity\":\"");
    try writer.writeAll(@tagName(d.severity));
    try writer.writeAll("\",\"code\":");
    try writeString(writer, d.code);
    try writer.writeAll(",\"message\":");
    try writeString(writer, d.message);
    if (d.span) |s| {
        try writer.writeAll(",\"path\":");
        try writeString(writer, s.path);
        try std.fmt.format(writer, ",\"line\":{d},\"column\":{d},\"length\":{d}", .{
            s.line, s.column, s.length,
        });
    }
    if (d.expected) |v| {
        try writer.writeAll(",\"expected\":");
        try writeString(writer, v);
    }
    if (d.actual) |v| {
        try writer.writeAll(",\"actual\":");
        try writeString(writer, v);
    }
    if (d.help) |v| {
        try writer.writeAll(",\"help\":");
        try writeString(writer, v);
    }
    try writer.writeAll(",\"fixSafety\":\"");
    try writer.writeAll(@tagName(d.fix_safety));
    try writer.writeAll("\",\"repair\":{\"id\":");
    try writeString(writer, d.repair.id);
    try writer.writeAll(",\"summary\":");
    try writeString(writer, d.repair.summary);
    try writer.writeAll("},\"related\":[");
    for (d.related, 0..) |r, i| {
        if (i != 0) try writer.writeAll(",");
        try writeDiagnostic(writer, r);
    }
    try writer.writeAll("]}");
}

fn writeString(writer: anytype, s: []const u8) !void {
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

/// Plain-text rendering for terminal logs. No ANSI, no hyperlinks: keeps
/// agent context windows compact and logs diffable.
pub fn writeText(writer: anytype, packet: Packet) !void {
    for (packet.diagnostics) |d| {
        try std.fmt.format(writer, "{s}[{s}]: {s}\n", .{
            @tagName(d.severity), d.code, d.message,
        });
        if (d.span) |s| {
            try std.fmt.format(writer, "  {s}:{d}:{d}\n", .{ s.path, s.line, s.column });
        }
        if (d.expected) |v| try std.fmt.format(writer, "  expected: {s}\n", .{v});
        if (d.actual) |v| try std.fmt.format(writer, "  actual:   {s}\n", .{v});
        if (d.help) |v| try std.fmt.format(writer, "  help:     {s}\n", .{v});
        try std.fmt.format(writer, "  fix:      {s} ({s})\n", .{
            d.repair.summary, @tagName(d.fix_safety),
        });
        try std.fmt.format(writer, "  explain:  cmotion explain {s}\n", .{d.code});
    }
}

test "json envelope shape" {
    var buf: [1024]u8 = undefined;
    var fbs = std.io.fixedBufferStream(&buf);

    const diag = Diagnostic{
        .code = "CLI001",
        .message = "unknown subcommand 'foo'",
        .help = "run `cmotion help` for available commands",
        .fix_safety = .@"requires-human-review",
    };
    try writeJson(fbs.writer(), .{ .ok = false, .diagnostics = &.{diag} });
    const out = fbs.getWritten();

    try std.testing.expect(std.mem.indexOf(u8, out, "\"schemaVersion\":1") != null);
    try std.testing.expect(std.mem.indexOf(u8, out, "\"code\":\"CLI001\"") != null);
    try std.testing.expect(std.mem.indexOf(u8, out, "\"ok\":false") != null);
}
