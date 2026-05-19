//! 3D mesh data + extrusion algorithm.
//!
//! Cmotion's 3D path is small and motion-graphics shaped: extrude a
//! 2D outline along the +z axis into a flat-faced volume, render
//! that volume through a tiny software rasteriser. No general 3D
//! mesh format, no .obj/.gltf loaders, no skeletons or skinning.
//! Just enough geometry to make the taste sample read as 3D.
//!
//! Conventions
//! ===========
//! - **y-up.** Math-style coordinates, matching the TTF outline
//!   convention. The renderer flips y when projecting to screen.
//! - **Right-handed.** +x right, +y up, +z out of the page (toward
//!   the camera). Front face of an extruded glyph sits at z=+depth/2,
//!   back face at z=-depth/2.
//! - **Per-face flat normals** for now. Smooth shading lands when
//!   curved surfaces do.
//! - **Triangles only.** Quads on the side walls get split into two
//!   triangles up front so the rasteriser stays uniform.

const std = @import("std");
const font = @import("font.zig");

pub const Vec2 = struct {
    x: f32 = 0,
    y: f32 = 0,
};

pub const Vec3 = struct {
    x: f32 = 0,
    y: f32 = 0,
    z: f32 = 0,

    pub fn add(a: Vec3, b: Vec3) Vec3 {
        return .{ .x = a.x + b.x, .y = a.y + b.y, .z = a.z + b.z };
    }
    pub fn sub(a: Vec3, b: Vec3) Vec3 {
        return .{ .x = a.x - b.x, .y = a.y - b.y, .z = a.z - b.z };
    }
    pub fn scale(v: Vec3, s: f32) Vec3 {
        return .{ .x = v.x * s, .y = v.y * s, .z = v.z * s };
    }
    pub fn dot(a: Vec3, b: Vec3) f32 {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    pub fn cross(a: Vec3, b: Vec3) Vec3 {
        return .{
            .x = a.y * b.z - a.z * b.y,
            .y = a.z * b.x - a.x * b.z,
            .z = a.x * b.y - a.y * b.x,
        };
    }
    pub fn length(v: Vec3) f32 {
        return @sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    }
    pub fn normalise(v: Vec3) Vec3 {
        const l = v.length();
        if (l == 0) return v;
        return v.scale(1.0 / l);
    }
};

/// A renderable triangle mesh. Positions and normals are parallel
/// arrays of length `positions.len`. Indices triplet-pack triangle
/// vertices — `indices.len` is always a multiple of 3.
pub const Mesh = struct {
    positions: []const Vec3,
    normals: []const Vec3,
    indices: []const u32,
};

/// 4×4 matrix, row-major. Stored as a flat array of 16 floats so the
/// rasteriser can `@memcpy` it onto a uniform without reshuffling.
/// Access via `at(row, col)`.
pub const Mat4 = struct {
    m: [16]f32,

    pub fn at(self: Mat4, row: usize, col: usize) f32 {
        return self.m[row * 4 + col];
    }

    pub fn identity() Mat4 {
        var r: Mat4 = .{ .m = @splat(0) };
        r.m[0] = 1;
        r.m[5] = 1;
        r.m[10] = 1;
        r.m[15] = 1;
        return r;
    }

    pub fn translation(x: f32, y: f32, z: f32) Mat4 {
        var r = identity();
        r.m[3] = x;
        r.m[7] = y;
        r.m[11] = z;
        return r;
    }

    pub fn scaling(sx: f32, sy: f32, sz: f32) Mat4 {
        var r: Mat4 = .{ .m = @splat(0) };
        r.m[0] = sx;
        r.m[5] = sy;
        r.m[10] = sz;
        r.m[15] = 1;
        return r;
    }

    pub fn rotationX(angle_rad: f32) Mat4 {
        const c_ = @cos(angle_rad);
        const s_ = @sin(angle_rad);
        var r = identity();
        r.m[5] = c_;
        r.m[6] = -s_;
        r.m[9] = s_;
        r.m[10] = c_;
        return r;
    }

    pub fn rotationY(angle_rad: f32) Mat4 {
        const c_ = @cos(angle_rad);
        const s_ = @sin(angle_rad);
        var r = identity();
        r.m[0] = c_;
        r.m[2] = s_;
        r.m[8] = -s_;
        r.m[10] = c_;
        return r;
    }

    pub fn rotationZ(angle_rad: f32) Mat4 {
        const c_ = @cos(angle_rad);
        const s_ = @sin(angle_rad);
        var r = identity();
        r.m[0] = c_;
        r.m[1] = -s_;
        r.m[4] = s_;
        r.m[5] = c_;
        return r;
    }

    /// Right-handed perspective projection. fov is in radians.
    pub fn perspective(fov_rad: f32, aspect: f32, near: f32, far: f32) Mat4 {
        const f = 1.0 / @tan(fov_rad * 0.5);
        var r: Mat4 = .{ .m = @splat(0) };
        r.m[0] = f / aspect;
        r.m[5] = f;
        r.m[10] = (far + near) / (near - far);
        r.m[11] = (2.0 * far * near) / (near - far);
        r.m[14] = -1;
        return r;
    }

    pub fn mul(a: Mat4, b: Mat4) Mat4 {
        var r: Mat4 = .{ .m = @splat(0) };
        inline for (0..4) |i| {
            inline for (0..4) |j| {
                var sum: f32 = 0;
                inline for (0..4) |k| sum += a.m[i * 4 + k] * b.m[k * 4 + j];
                r.m[i * 4 + j] = sum;
            }
        }
        return r;
    }

    /// Transform a 3D point with implicit w=1. Returns the (x/w, y/w,
    /// z/w) after the perspective divide; callers needing the w
    /// component (e.g. for clip-space culling) use `mulVec4`.
    pub fn mulPoint(self: Mat4, p: Vec3) Vec3 {
        const x = self.m[0] * p.x + self.m[1] * p.y + self.m[2] * p.z + self.m[3];
        const y = self.m[4] * p.x + self.m[5] * p.y + self.m[6] * p.z + self.m[7];
        const z = self.m[8] * p.x + self.m[9] * p.y + self.m[10] * p.z + self.m[11];
        const w = self.m[12] * p.x + self.m[13] * p.y + self.m[14] * p.z + self.m[15];
        if (w == 0) return .{ .x = x, .y = y, .z = z };
        return .{ .x = x / w, .y = y / w, .z = z / w };
    }

    /// Transform a 3D direction (no translation, w=0). Used for
    /// normals — assumes the transform is rigid (rotation + uniform
    /// scale at most); non-uniform scale would need the inverse-
    /// transpose path, which we don't take in v0.
    pub fn mulDirection(self: Mat4, v: Vec3) Vec3 {
        return .{
            .x = self.m[0] * v.x + self.m[1] * v.y + self.m[2] * v.z,
            .y = self.m[4] * v.x + self.m[5] * v.y + self.m[6] * v.z,
            .z = self.m[8] * v.x + self.m[9] * v.y + self.m[10] * v.z,
        };
    }
};

/// Triangulate a simple polygon by ear-clipping. Input must be a
/// single closed contour (no holes) wound counter-clockwise (CCW)
/// when viewed from +z; a CW-wound contour gets reversed
/// automatically. Output is a list of triangle vertex indices into
/// the input polygon.
///
/// Holes (B, D, O, P, Q, R, …) aren't handled — the bridging step
/// that would join an inner contour to the outer boundary is a
/// future commit. Letters without holes (most others) work today.
pub fn earClip(arena: std.mem.Allocator, polygon: []const Vec2) ![]u32 {
    if (polygon.len < 3) return arena.alloc(u32, 0);

    // Detect winding via signed area; ensure CCW for the algorithm.
    var area2: f32 = 0;
    for (polygon, 0..) |p, i| {
        const q = polygon[(i + 1) % polygon.len];
        area2 += (q.x - p.x) * (q.y + p.y);
    }
    const ccw = area2 < 0; // negative shoelace ⇒ CCW in y-up.
    var work = try arena.alloc(usize, polygon.len);
    if (ccw) {
        for (work, 0..) |*w, i| w.* = i;
    } else {
        for (work, 0..) |*w, i| w.* = polygon.len - 1 - i;
    }

    var out = try std.array_list.Managed(u32).initCapacity(arena, 3 * (polygon.len - 2));

    // Repeatedly clip an ear (a vertex whose triangle with its two
    // neighbours contains no other vertex). O(n²) worst case — fine
    // for glyphs which are tens to low-hundreds of points.
    while (work.len >= 3) {
        var clipped = false;
        var i: usize = 0;
        while (i < work.len) : (i += 1) {
            const a_idx = work[(i + work.len - 1) % work.len];
            const b_idx = work[i];
            const c_idx = work[(i + 1) % work.len];
            const a = polygon[a_idx];
            const b = polygon[b_idx];
            const c = polygon[c_idx];

            // Convex check: cross product of (b-a) × (c-b) must be > 0
            // in CCW polygon space (so this vertex is a *convex* corner,
            // not a reflex one).
            const cross_z = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
            if (cross_z <= 0) continue;

            // Contains-any-other-vertex check.
            var any_inside = false;
            for (work, 0..) |p_idx, j| {
                if (j == i or p_idx == a_idx or p_idx == b_idx or p_idx == c_idx) continue;
                if (pointInTriangle(polygon[p_idx], a, b, c)) {
                    any_inside = true;
                    break;
                }
            }
            if (any_inside) continue;

            // It's an ear — emit and remove.
            try out.append(@intCast(a_idx));
            try out.append(@intCast(b_idx));
            try out.append(@intCast(c_idx));

            // Compact the work list, dropping index i.
            var k: usize = i;
            while (k + 1 < work.len) : (k += 1) work[k] = work[k + 1];
            work.len -= 1;
            clipped = true;
            break;
        }
        // No ear found — degenerate polygon (e.g. self-intersecting).
        // Bail out and ship what we have rather than infinite-loop.
        if (!clipped) break;
    }
    return out.toOwnedSlice();
}

fn pointInTriangle(p: Vec2, a: Vec2, b: Vec2, c: Vec2) bool {
    const d1 = sign(p, a, b);
    const d2 = sign(p, b, c);
    const d3 = sign(p, c, a);
    const has_neg = (d1 < 0) or (d2 < 0) or (d3 < 0);
    const has_pos = (d1 > 0) or (d2 > 0) or (d3 > 0);
    return !(has_neg and has_pos);
}

fn sign(p: Vec2, a: Vec2, b: Vec2) f32 {
    return (p.x - b.x) * (a.y - b.y) - (a.x - b.x) * (p.y - b.y);
}

/// Extrude a single 2D outline along +z into a flat-faced volume.
/// The outline lies in the z=0 plane; the front face moves to
/// z=+depth/2, the back face to z=-depth/2. Side walls connect each
/// outline segment with two triangles.
///
/// Generates per-face flat normals: +z for the front face, -z for
/// the back, perpendicular-to-edge for each side quad.
pub fn extrudeOutline(
    arena: std.mem.Allocator,
    outline: []const Vec2,
    depth: f32,
) !Mesh {
    // Two copies of every outline point (one for the front, one for
    // the back), plus two distinct *side-wall* copies per edge so the
    // per-face flat normals don't smooth across the front/side seam.
    // Total vertex count: 2 * outline.len (caps) + 4 * outline.len (sides).
    const n = outline.len;
    if (n < 3) return Mesh{ .positions = &.{}, .normals = &.{}, .indices = &.{} };

    const front_tris = try earClip(arena, outline);
    // earClip produces front-face winding; back face uses the same
    // triangles with reversed winding.

    const total_verts = 2 * n + 4 * n;
    const positions = try arena.alloc(Vec3, total_verts);
    const normals = try arena.alloc(Vec3, total_verts);

    const half = depth * 0.5;

    // Front cap vertices (z = +half). Normal = +z.
    for (outline, 0..) |p, i| {
        positions[i] = .{ .x = p.x, .y = p.y, .z = half };
        normals[i] = .{ .x = 0, .y = 0, .z = 1 };
    }
    // Back cap vertices (z = -half). Normal = -z.
    for (outline, 0..) |p, i| {
        positions[n + i] = .{ .x = p.x, .y = p.y, .z = -half };
        normals[n + i] = .{ .x = 0, .y = 0, .z = -1 };
    }
    // Side-wall vertices: for each outline edge (p[i] → p[i+1]),
    // emit four distinct vertices (front-i, front-i+1, back-i+1, back-i)
    // with a normal perpendicular to the edge in the xy-plane.
    var side_base: usize = 2 * n;
    var i: usize = 0;
    while (i < n) : (i += 1) {
        const a = outline[i];
        const b = outline[(i + 1) % n];
        const edge = Vec2{ .x = b.x - a.x, .y = b.y - a.y };
        // Outward normal: rotate the edge -90° (right-hand for CCW).
        // For a CCW polygon viewed from +z, the outward side-wall
        // normal points away from the interior.
        var nx = edge.y;
        var ny = -edge.x;
        const nl = @sqrt(nx * nx + ny * ny);
        if (nl > 0) {
            nx /= nl;
            ny /= nl;
        }
        const wall_normal = Vec3{ .x = nx, .y = ny, .z = 0 };
        positions[side_base + 0] = .{ .x = a.x, .y = a.y, .z = half };
        positions[side_base + 1] = .{ .x = b.x, .y = b.y, .z = half };
        positions[side_base + 2] = .{ .x = b.x, .y = b.y, .z = -half };
        positions[side_base + 3] = .{ .x = a.x, .y = a.y, .z = -half };
        inline for (0..4) |k| normals[side_base + k] = wall_normal;
        side_base += 4;
    }

    // Triangle indices: front caps (n-2 triangles), back caps
    // (n-2 triangles, reversed), side walls (2 * n triangles).
    const total_tris = (n - 2) + (n - 2) + 2 * n;
    const indices = try arena.alloc(u32, 3 * total_tris);
    var ti: usize = 0;

    // Front face — re-use earClip output as-is (CCW from +z, normal +z).
    for (front_tris) |idx| {
        indices[ti] = idx;
        ti += 1;
    }
    // Back face — same triangles, reversed winding, offset into the
    // back-cap vertex range.
    var bi: usize = 0;
    while (bi < front_tris.len) : (bi += 3) {
        indices[ti + 0] = front_tris[bi + 2] + @as(u32, @intCast(n));
        indices[ti + 1] = front_tris[bi + 1] + @as(u32, @intCast(n));
        indices[ti + 2] = front_tris[bi + 0] + @as(u32, @intCast(n));
        ti += 3;
    }
    // Side walls — two triangles per quad, CCW wound when viewed
    // from outside (along the outward normal).
    var s: u32 = 0;
    while (s < n) : (s += 1) {
        const base: u32 = 2 * @as(u32, @intCast(n)) + s * 4;
        // Quad: 0=front-a, 1=front-b, 2=back-b, 3=back-a.
        // Triangle 1: 0, 1, 2  Triangle 2: 0, 2, 3
        indices[ti + 0] = base + 0;
        indices[ti + 1] = base + 1;
        indices[ti + 2] = base + 2;
        indices[ti + 3] = base + 0;
        indices[ti + 4] = base + 2;
        indices[ti + 5] = base + 3;
        ti += 6;
    }

    return .{
        .positions = positions,
        .normals = normals,
        .indices = indices[0..ti],
    };
}

/// Extrude a TTF glyph outline. Convenience over `extrudeOutline`
/// — fetches the glyph's contours via the font module and extrudes
/// the *first* contour (no hole support yet). Returns null for
/// codepoints the font doesn't carry.
pub fn extrudeGlyph(
    arena: std.mem.Allocator,
    codepoint: u32,
    size_px: f32,
    depth: f32,
) !?Mesh {
    const contours = try font.glyphContours(arena, codepoint, size_px) orelse return null;
    if (contours.len == 0) return null;
    // For now, extrude only the outer contour. Letters with holes
    // (B, D, O, P, Q, R) will render filled until hole bridging lands.
    // Convert from font.Vec2 to mesh.Vec2 — they're the same shape
    // but distinct types so neither module has to depend on the other.
    const fc = contours[0];
    const outline = try arena.alloc(Vec2, fc.len);
    for (fc, 0..) |p, i| outline[i] = .{ .x = p.x, .y = p.y };
    return try extrudeOutline(arena, outline, depth);
}

//
// Tests
//

test "extrudeOutline: a unit square produces the expected vertex / index counts" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    const square = [_]Vec2{
        .{ .x = 0, .y = 0 },
        .{ .x = 1, .y = 0 },
        .{ .x = 1, .y = 1 },
        .{ .x = 0, .y = 1 },
    };
    const mesh = try extrudeOutline(a, &square, 0.5);

    // 4 verts × (front + back caps + 4 side-wall copies per edge) =
    // 4 × 2 + 4 × 4 = 24.
    try std.testing.expectEqual(@as(usize, 24), mesh.positions.len);
    try std.testing.expectEqual(@as(usize, 24), mesh.normals.len);

    // Front cap = 2 triangles, back cap = 2, sides = 8 → 12 triangles
    // → 36 indices.
    try std.testing.expectEqual(@as(usize, 36), mesh.indices.len);

    // Front-face normals all point +z.
    for (mesh.normals[0..4]) |n| {
        try std.testing.expectApproxEqAbs(@as(f32, 1), n.z, 1e-6);
    }
    // Back-face normals all point -z.
    for (mesh.normals[4..8]) |n| {
        try std.testing.expectApproxEqAbs(@as(f32, -1), n.z, 1e-6);
    }
}

test "earClip: triangulating a triangle returns itself" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    const tri = [_]Vec2{
        .{ .x = 0, .y = 0 },
        .{ .x = 1, .y = 0 },
        .{ .x = 0, .y = 1 },
    };
    const indices = try earClip(a, &tri);
    try std.testing.expectEqual(@as(usize, 3), indices.len);
}

test "earClip: a non-convex L-shape triangulates without leaving area uncovered" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // L-shape (6 vertices, one reflex corner). 6 - 2 = 4 triangles.
    const l = [_]Vec2{
        .{ .x = 0, .y = 0 },
        .{ .x = 2, .y = 0 },
        .{ .x = 2, .y = 1 },
        .{ .x = 1, .y = 1 },
        .{ .x = 1, .y = 2 },
        .{ .x = 0, .y = 2 },
    };
    const indices = try earClip(a, &l);
    try std.testing.expectEqual(@as(usize, 12), indices.len); // 4 triangles
}
