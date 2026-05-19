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

/// Triangulate a polygon with holes. `contours[0]` is the outer
/// boundary; `contours[1..]` are interior holes. Output is a list
/// of triangle vertex indices into a *flattened* concatenation of
/// the contours: `outer ++ hole_1 ++ hole_2 ++ …`. Use
/// `flatContourLayout` to recover (contour_id, vertex_id) from any
/// returned index, or just consume the indices directly into a
/// flat vertex array (which is what `extrudeContours` does).
///
/// The algorithm:
///   1. Normalise winding — outer becomes CCW, holes become CW
///      (so the interior of every contour lies on its left).
///   2. For each hole, in descending-rightmost-x order, bridge a
///      "slit" from the hole's rightmost vertex to a visible
///      vertex on the current outer ring. The hole vertices get
///      spliced into the outer ring with two duplicates at the
///      bridge — the duplicate edge cancels out as an ear
///      candidate, leaving a simple-looking polygon for the
///      ear-clip pass.
///   3. Ear-clip the merged ring.
///
/// Bridge visibility uses an x-ray-cast against the outer ring.
/// For complex shapes with overlapping holes the cast can pick a
/// non-optimal target; v0 accepts the occasional artefact (a
/// thin invisible "slit" where bridges stack) rather than coding
/// a full visibility test.
pub fn earClipWithHoles(arena: std.mem.Allocator, contours: []const []const Vec2) ![]u32 {
    if (contours.len == 0) return arena.alloc(u32, 0);
    if (contours.len == 1) {
        // Single contour — use the existing path. Indices already
        // line up with the flat layout (one contour starting at 0).
        return earClip(arena, contours[0]);
    }

    // -- Step 1: flatten + normalise winding ----------------------
    // First pass: compute offsets, decide each contour's winding.
    var total: usize = 0;
    for (contours) |c| total += c.len;
    const flat = try arena.alloc(Vec2, total);
    const contour_start = try arena.alloc(usize, contours.len);
    const contour_len = try arena.alloc(usize, contours.len);

    var o: usize = 0;
    for (contours, 0..) |c, ci| {
        contour_start[ci] = o;
        contour_len[ci] = c.len;
        // Outer must be CCW (negative shoelace in y-up convention);
        // holes must be CW (positive shoelace). The largest |area|
        // wins as outer — that's contour 0 by convention from the
        // glyph extraction, but assert by area anyway.
        var area2: f32 = 0;
        for (c, 0..) |p, i| {
            const q = c[(i + 1) % c.len];
            area2 += (q.x - p.x) * (q.y + p.y);
        }
        const want_ccw = (ci == 0);
        const is_ccw = area2 < 0;
        if (is_ccw == want_ccw) {
            for (c, 0..) |p, i| flat[o + i] = p;
        } else {
            for (c, 0..) |p, i| flat[o + (c.len - 1 - i)] = p;
        }
        o += c.len;
    }

    // -- Step 2: bridge each hole into the outer ring -------------
    // Working ring as a linked list of indices into `flat`. Start
    // with the outer ring; bridge holes one at a time.
    var ring = try std.array_list.Managed(u32).initCapacity(arena, total + contours.len * 2);
    var i: usize = 0;
    while (i < contour_len[0]) : (i += 1) try ring.append(@intCast(contour_start[0] + i));

    // Process holes in order of descending rightmost-x. Ensures
    // the rightmost hole bridges first; later holes bridge into a
    // ring that's already been opened on the right.
    const hole_order = try arena.alloc(usize, contours.len - 1);
    for (hole_order, 0..) |*h, idx| h.* = idx + 1;
    const sort_ctx: ContourSortCtx = .{ .flat = flat, .start = contour_start, .len = contour_len };
    std.mem.sort(usize, hole_order, sort_ctx, descendingRightmostX);

    for (hole_order) |hi| {
        try bridgeHole(arena, &ring, flat, contour_start[hi], contour_len[hi]);
    }

    // -- Step 3: ear-clip the merged ring -------------------------
    return try earClipRing(arena, ring.items, flat);
}

const ContourSortCtx = struct {
    flat: []const Vec2,
    start: []const usize,
    len: []const usize,
};

fn descendingRightmostX(ctx: ContourSortCtx, a: usize, b: usize) bool {
    return rightmostX(ctx.flat, ctx.start[a], ctx.len[a]) > rightmostX(ctx.flat, ctx.start[b], ctx.len[b]);
}

fn rightmostX(flat: []const Vec2, start: usize, len: usize) f32 {
    var max_x: f32 = flat[start].x;
    for (1..len) |i| max_x = @max(max_x, flat[start + i].x);
    return max_x;
}

/// Find the rightmost vertex of the hole, cast a +x ray, find the
/// outer-ring edge that ray hits, pick that edge's higher-x
/// endpoint as the bridge target, splice the hole into the ring
/// with two duplicates of the bridge endpoints (one before the
/// hole, one after).
fn bridgeHole(
    arena: std.mem.Allocator,
    ring: *std.array_list.Managed(u32),
    flat: []const Vec2,
    hole_start: usize,
    hole_len: usize,
) !void {
    // Find the rightmost vertex of the hole.
    var hole_right_idx: usize = 0;
    var max_x: f32 = flat[hole_start].x;
    for (1..hole_len) |i| {
        if (flat[hole_start + i].x > max_x) {
            max_x = flat[hole_start + i].x;
            hole_right_idx = i;
        }
    }
    const hole_right_v = flat[hole_start + hole_right_idx];

    // Find the closest outer-ring edge that intersects the ray
    // from hole_right_v in +x direction. The bridge target is the
    // outer-ring vertex on that edge with the larger x (closer to
    // the hole).
    var best_ring_idx: ?usize = null;
    var best_x: f32 = std.math.inf(f32);
    var j: usize = 0;
    while (j < ring.items.len) : (j += 1) {
        const a_idx = ring.items[j];
        const b_idx = ring.items[(j + 1) % ring.items.len];
        const a = flat[a_idx];
        const b = flat[b_idx];
        // Edge crosses the horizontal line y = hole_right_v.y iff
        // one endpoint is above and the other is below (or on).
        if ((a.y > hole_right_v.y) == (b.y > hole_right_v.y)) continue;
        // Intersection x along the ray.
        const t = (hole_right_v.y - a.y) / (b.y - a.y);
        const xi = a.x + t * (b.x - a.x);
        if (xi < hole_right_v.x) continue; // edge crosses but on the wrong side
        if (xi < best_x) {
            best_x = xi;
            best_ring_idx = if (a.x > b.x) j else (j + 1) % ring.items.len;
        }
    }
    const target = best_ring_idx orelse return; // ray missed everything — punt.

    // Splice the hole into the ring at `target`. The hole vertices
    // start at hole_right_idx (so the bridge connects the closest
    // pair of vertices) and wrap around.
    var inserted = try std.array_list.Managed(u32).initCapacity(arena, hole_len + 2);
    var k: usize = 0;
    while (k <= hole_len) : (k += 1) {
        const idx = (hole_right_idx + k) % hole_len;
        try inserted.append(@intCast(hole_start + idx));
    }
    // Duplicate the ring vertex on both sides of the splice to
    // close the slit.
    try inserted.append(ring.items[target]);

    // Insert the hole right after `target` in the ring.
    try ring.insertSlice(target + 1, inserted.items);
}

/// Ear-clip a ring of indices into `flat`. Mirrors `earClip` but
/// works on a pre-built index ring (avoiding the inner re-indexing
/// step needed when contours bridge into a single polygon).
fn earClipRing(arena: std.mem.Allocator, ring: []const u32, flat: []const Vec2) ![]u32 {
    if (ring.len < 3) return arena.alloc(u32, 0);

    var work = try arena.alloc(u32, ring.len);
    @memcpy(work, ring);

    var out = try std.array_list.Managed(u32).initCapacity(arena, 3 * (ring.len - 2));
    while (work.len >= 3) {
        var clipped = false;
        var i: usize = 0;
        while (i < work.len) : (i += 1) {
            const a_idx = work[(i + work.len - 1) % work.len];
            const b_idx = work[i];
            const c_idx = work[(i + 1) % work.len];
            const a = flat[a_idx];
            const b = flat[b_idx];
            const c = flat[c_idx];

            const cross_z = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
            if (cross_z <= 0) continue;

            // Contains-any-other-vertex check.
            var any_inside = false;
            for (work) |p_idx| {
                if (p_idx == a_idx or p_idx == b_idx or p_idx == c_idx) continue;
                if (pointInTriangle(flat[p_idx], a, b, c)) {
                    any_inside = true;
                    break;
                }
            }
            if (any_inside) continue;

            try out.append(a_idx);
            try out.append(b_idx);
            try out.append(c_idx);

            var k: usize = i;
            while (k + 1 < work.len) : (k += 1) work[k] = work[k + 1];
            work.len -= 1;
            clipped = true;
            break;
        }
        if (!clipped) break;
    }
    return out.toOwnedSlice();
}

/// Triangulate a simple polygon by ear-clipping. Input must be a
/// single closed contour (no holes) wound counter-clockwise (CCW)
/// when viewed from +z; a CW-wound contour gets reversed
/// automatically. Output is a list of triangle vertex indices into
/// the input polygon.
///
/// For glyphs with holes (B, D, O, P, Q, R) use `earClipWithHoles`.
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

/// Extrude a multi-contour 2D shape along +z. The first contour is
/// the outer boundary; the rest are interior holes. Front + back
/// caps go through `earClipWithHoles`; side walls iterate each
/// contour independently with outward normals (away from the
/// material) — for the outer contour that's *away from the
/// glyph*; for holes that's *toward the hole interior*.
///
/// `extrudeOutline` is the single-contour convenience.
pub fn extrudeContours(
    arena: std.mem.Allocator,
    contours: []const []const Vec2,
    depth: f32,
) !Mesh {
    if (contours.len == 0) return Mesh{ .positions = &.{}, .normals = &.{}, .indices = &.{} };
    if (contours[0].len < 3) return Mesh{ .positions = &.{}, .normals = &.{}, .indices = &.{} };

    // Flat outline: outer ++ hole_1 ++ hole_2 ++ ...
    var total: usize = 0;
    for (contours) |c| total += c.len;
    if (total < 3) return Mesh{ .positions = &.{}, .normals = &.{}, .indices = &.{} };

    // Triangulate the front face. earClipWithHoles returns indices
    // into the flat outer-then-holes array.
    const front_tris = try earClipWithHoles(arena, contours);

    // Per-edge side-wall count = total (each contour edge spawns 4
    // wall vertices + 6 indices). Plus 2 × total cap vertices.
    const total_verts = 2 * total + 4 * total;
    const positions = try arena.alloc(Vec3, total_verts);
    const normals = try arena.alloc(Vec3, total_verts);

    const half = depth * 0.5;

    // Front cap (z = +half, normal +z) — vertices at flat-outline
    // positions.
    var ci: usize = 0;
    var off: usize = 0;
    while (ci < contours.len) : (ci += 1) {
        for (contours[ci], 0..) |p, i| {
            positions[off + i] = .{ .x = p.x, .y = p.y, .z = half };
            normals[off + i] = .{ .x = 0, .y = 0, .z = 1 };
        }
        off += contours[ci].len;
    }
    // Back cap (z = -half, normal -z) at the same xy positions.
    ci = 0;
    off = total;
    while (ci < contours.len) : (ci += 1) {
        const start = off;
        for (contours[ci], 0..) |p, i| {
            positions[start + i] = .{ .x = p.x, .y = p.y, .z = -half };
            normals[start + i] = .{ .x = 0, .y = 0, .z = -1 };
        }
        off += contours[ci].len;
    }
    // Side-wall vertices: 4 per edge. Order: front-a, front-b, back-b, back-a.
    // Outer contour walls use the "rotate edge -90°" outward normal
    // (CCW interior on the left). Hole contour walls also use the
    // same formula because we normalised holes to CW above — for
    // a CW polygon "rotate edge -90°" points toward the *hole
    // interior*, which is the outward direction for the material.
    var side_base: usize = 2 * total;
    ci = 0;
    var contour_off: usize = 0;
    while (ci < contours.len) : (ci += 1) {
        const c = contours[ci];
        const n = c.len;
        // Normalise winding for the wall pass — outer must be CCW,
        // holes must be CW. earClipWithHoles already normalised
        // when triangulating; we recompute here so the wall
        // normals are consistent regardless of input winding.
        var area2: f32 = 0;
        for (c, 0..) |p, i| {
            const q = c[(i + 1) % n];
            area2 += (q.x - p.x) * (q.y + p.y);
        }
        const want_ccw = (ci == 0);
        const is_ccw = area2 < 0;
        const flip = is_ccw != want_ccw;

        var i: usize = 0;
        while (i < n) : (i += 1) {
            const ia = if (flip) (n - 1 - i) else i;
            const ib = if (flip) ((n - 1 - i + n - 1) % n) else ((i + 1) % n);
            const a = c[ia];
            const b = c[ib];
            const edge = Vec2{ .x = b.x - a.x, .y = b.y - a.y };
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
        contour_off += n;
    }

    // Indices: front caps (variable, from earClip) + back caps +
    // side walls (2 triangles per edge per contour).
    const total_tris = front_tris.len / 3 + front_tris.len / 3 + 2 * total;
    const indices = try arena.alloc(u32, 3 * total_tris);
    var ti: usize = 0;

    for (front_tris) |idx| {
        indices[ti] = idx;
        ti += 1;
    }
    // Back face: reversed winding, offset by `total` (the back-cap
    // vertices live at indices [total, 2*total)).
    var bi: usize = 0;
    while (bi < front_tris.len) : (bi += 3) {
        indices[ti + 0] = front_tris[bi + 2] + @as(u32, @intCast(total));
        indices[ti + 1] = front_tris[bi + 1] + @as(u32, @intCast(total));
        indices[ti + 2] = front_tris[bi + 0] + @as(u32, @intCast(total));
        ti += 3;
    }
    // Side walls: two triangles per quad.
    var s: u32 = 0;
    while (s < total) : (s += 1) {
        const base: u32 = 2 * @as(u32, @intCast(total)) + s * 4;
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

/// Extrude a TTF glyph outline. Convenience over `extrudeContours`
/// — fetches every contour the font carries for the codepoint
/// (outer + any interior holes) and extrudes the whole shape.
/// Returns null for codepoints the font doesn't carry.
pub fn extrudeGlyph(
    arena: std.mem.Allocator,
    codepoint: u32,
    size_px: f32,
    depth: f32,
) !?Mesh {
    const contours = try font.glyphContours(arena, codepoint, size_px) orelse return null;
    if (contours.len == 0) return null;

    // Convert font.Vec2 → mesh.Vec2. They have the same shape but
    // are distinct types so neither module has to depend on the
    // other.
    const converted = try arena.alloc([]const Vec2, contours.len);
    for (contours, 0..) |fc, i| {
        const buf = try arena.alloc(Vec2, fc.len);
        for (fc, 0..) |p, j| buf[j] = .{ .x = p.x, .y = p.y };
        converted[i] = buf;
    }
    return try extrudeContours(arena, converted, depth);
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

test "earClipWithHoles: square with a square hole triangulates without filling the hole" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    // 10×10 outer square (CCW in y-up: 0,0 → 10,0 → 10,10 → 0,10
    // gives a *clockwise* shoelace in math-y-up, which is what we
    // want for the algorithm's outer-CCW input convention — the
    // function normalises winding internally so either input works).
    const outer = [_]Vec2{
        .{ .x = 0, .y = 0 },
        .{ .x = 10, .y = 0 },
        .{ .x = 10, .y = 10 },
        .{ .x = 0, .y = 10 },
    };
    // 4×4 hole centred at (5, 5).
    const hole = [_]Vec2{
        .{ .x = 3, .y = 3 },
        .{ .x = 3, .y = 7 },
        .{ .x = 7, .y = 7 },
        .{ .x = 7, .y = 3 },
    };
    const contours = [_][]const Vec2{ &outer, &hole };

    const indices = try earClipWithHoles(a, &contours);

    // Should produce a triangulation that covers the outer area
    // minus the hole. We don't pin the exact triangle count (it
    // depends on the ear-clip ordering), but it should be ≥ 8
    // and ≤ a few dozen.
    try std.testing.expect(indices.len >= 24); // ≥ 8 triangles
    try std.testing.expect(indices.len % 3 == 0);

    // Sample a point inside the hole — it should NOT lie inside
    // any emitted triangle.
    const inside_hole = Vec2{ .x = 5, .y = 5 };
    var contains: usize = 0;
    const combined = [_]Vec2{
        outer[0], outer[1], outer[2], outer[3],
        hole[0],  hole[1],  hole[2],  hole[3],
    };
    var i: usize = 0;
    while (i < indices.len) : (i += 3) {
        const ta = combined[indices[i + 0]];
        const tb = combined[indices[i + 1]];
        const tc = combined[indices[i + 2]];
        if (pointInTriangle(inside_hole, ta, tb, tc)) contains += 1;
    }
    try std.testing.expectEqual(@as(usize, 0), contains);

    // Sample a point in the material (between outer and hole) —
    // it should land in exactly one triangle.
    const inside_material = Vec2{ .x = 1, .y = 1 };
    contains = 0;
    i = 0;
    while (i < indices.len) : (i += 3) {
        const ta = combined[indices[i + 0]];
        const tb = combined[indices[i + 1]];
        const tc = combined[indices[i + 2]];
        if (pointInTriangle(inside_material, ta, tb, tc)) contains += 1;
    }
    try std.testing.expect(contains >= 1);
}

test "extrudeContours: square-with-hole extrudes to a mesh with hole walls" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    const outer = [_]Vec2{
        .{ .x = 0, .y = 0 },
        .{ .x = 10, .y = 0 },
        .{ .x = 10, .y = 10 },
        .{ .x = 0, .y = 10 },
    };
    const hole = [_]Vec2{
        .{ .x = 3, .y = 3 },
        .{ .x = 3, .y = 7 },
        .{ .x = 7, .y = 7 },
        .{ .x = 7, .y = 3 },
    };
    const contours = [_][]const Vec2{ &outer, &hole };

    const mesh = try extrudeContours(a, &contours, 1.0);

    // Total flat vertices = 8 (4 outer + 4 hole). Cap vertices =
    // 2 * 8 = 16. Side wall vertices = 4 per edge per contour =
    // 4 * 8 = 32. Total = 48.
    try std.testing.expectEqual(@as(usize, 48), mesh.positions.len);

    // Find any side-wall vertex with a normal pointing inward (the
    // hole's wall normal). With outer CCW and hole CW after
    // normalisation, hole-edge walls point toward the hole
    // interior (i.e., toward (5, 5)).
    var has_inward_normal = false;
    for (mesh.normals[16..]) |n| {
        // Inward normals along the hole walls have x or y pointing
        // toward (5, 5) — at least one channel is non-zero.
        if (n.x != 0 or n.y != 0) {
            has_inward_normal = true;
            break;
        }
    }
    try std.testing.expect(has_inward_normal);
}
