//! Diagnostic packet shape, modeled on Vercel Zero's `--json` contract.
//!
//! Every subcommand emits this same envelope. Stages downstream of the CLI
//! (parser, typechecker, interpreter, backends) reuse the same shape with
//! their own code namespaces.

const std = @import("std");

pub const Writer = std.Io.Writer;
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
pub fn writeJson(w: *Writer, packet: Packet) !void {
    try writeJsonHeader(w, packet.ok, packet.diagnostics);
    try writeJsonFooter(w);
}

/// Write the common envelope prefix: `{"schemaVersion":1,"ok":...,"diagnostics":[...]`
/// (no trailing comma, no closing brace). Subcommands that produce output
/// alongside diagnostics call this, write their own comma-prefixed fields,
/// then call `writeJsonFooter` — so every --json invocation emits exactly
/// one JSON document.
pub fn writeJsonHeader(w: *Writer, ok: bool, diagnostics: []const Diagnostic) !void {
    try w.print("{{\"schemaVersion\":{d},\"ok\":", .{schema_version});
    try w.writeAll(if (ok) "true" else "false");
    try w.writeAll(",\"diagnostics\":[");
    for (diagnostics, 0..) |d, i| {
        if (i != 0) try w.writeAll(",");
        try writeDiagnostic(w, d);
    }
    try w.writeAll("]");
}

/// Close the envelope started by `writeJsonHeader`.
pub fn writeJsonFooter(w: *Writer) !void {
    try w.writeAll("}\n");
}

/// JSON-string helper exported so subcommands can encode their own
/// envelope extras (paths, CST blobs, version strings) consistently.
pub fn writeJsonString(w: *Writer, s: []const u8) !void {
    try w.writeByte('"');
    for (s) |b| switch (b) {
        '"' => try w.writeAll("\\\""),
        '\\' => try w.writeAll("\\\\"),
        '\n' => try w.writeAll("\\n"),
        '\r' => try w.writeAll("\\r"),
        '\t' => try w.writeAll("\\t"),
        0x00...0x08, 0x0b, 0x0c, 0x0e...0x1f => try w.print("\\u{x:0>4}", .{b}),
        else => try w.writeByte(b),
    };
    try w.writeByte('"');
}

fn writeDiagnostic(w: *Writer, d: Diagnostic) !void {
    try w.writeAll("{\"severity\":\"");
    try w.writeAll(@tagName(d.severity));
    try w.writeAll("\",\"code\":");
    try writeJsonString(w, d.code);
    try w.writeAll(",\"message\":");
    try writeJsonString(w, d.message);
    if (d.span) |s| {
        try w.writeAll(",\"path\":");
        try writeJsonString(w, s.path);
        try w.print(",\"line\":{d},\"column\":{d},\"length\":{d}", .{
            s.line, s.column, s.length,
        });
    }
    if (d.expected) |v| {
        try w.writeAll(",\"expected\":");
        try writeJsonString(w, v);
    }
    if (d.actual) |v| {
        try w.writeAll(",\"actual\":");
        try writeJsonString(w, v);
    }
    if (d.help) |v| {
        try w.writeAll(",\"help\":");
        try writeJsonString(w, v);
    }
    try w.writeAll(",\"fixSafety\":\"");
    try w.writeAll(@tagName(d.fix_safety));
    try w.writeAll("\",\"repair\":{\"id\":");
    try writeJsonString(w, d.repair.id);
    try w.writeAll(",\"summary\":");
    try writeJsonString(w, d.repair.summary);
    try w.writeAll("},\"related\":[");
    for (d.related, 0..) |r, i| {
        if (i != 0) try w.writeAll(",");
        try writeDiagnostic(w, r);
    }
    try w.writeAll("]}");
}

/// Plain-text rendering for terminal logs. No ANSI, no hyperlinks: keeps
/// agent context windows compact and logs diffable.
pub fn writeText(w: *Writer, packet: Packet) !void {
    for (packet.diagnostics) |d| {
        try w.print("{s}[{s}]: {s}\n", .{
            @tagName(d.severity), d.code, d.message,
        });
        if (d.span) |s| {
            try w.print("  {s}:{d}:{d}\n", .{ s.path, s.line, s.column });
        }
        if (d.expected) |v| try w.print("  expected: {s}\n", .{v});
        if (d.actual) |v| try w.print("  actual:   {s}\n", .{v});
        if (d.help) |v| try w.print("  help:     {s}\n", .{v});
        try w.print("  fix:      {s} ({s})\n", .{
            d.repair.summary, @tagName(d.fix_safety),
        });
        try w.print("  explain:  cmo explain {s}\n", .{d.code});
    }
}

test "json envelope shape" {
    var buf: [1024]u8 = undefined;
    var w = Writer.fixed(&buf);

    const diag = Diagnostic{
        .code = "CLI001",
        .message = "unknown subcommand 'foo'",
        .help = "run `cmo help` for available commands",
        .fix_safety = .@"requires-human-review",
    };
    try writeJson(&w, .{ .ok = false, .diagnostics = &.{diag} });
    const out = w.buffered();

    try std.testing.expect(std.mem.indexOf(u8, out, "\"schemaVersion\":1") != null);
    try std.testing.expect(std.mem.indexOf(u8, out, "\"code\":\"CLI001\"") != null);
    try std.testing.expect(std.mem.indexOf(u8, out, "\"ok\":false") != null);
}
