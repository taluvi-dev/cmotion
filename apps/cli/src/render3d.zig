//! Software 3D rasteriser — the bridge from `Mesh` to RGBA pixels.
//!
//! Pipeline per draw call:
//!   1. Transform each vertex by (model · view · projection) into
//!      clip space, then perspective-divide into normalised device
//!      coordinates (NDC).
//!   2. Map NDC to screen pixels. Y is flipped here (math y-up →
//!      screen y-down).
//!   3. For each triangle, rasterise with Pineda's edge-function
//!      algorithm: walk the bounding box, sample with three edge
//!      functions, accept fragments where all three are positive
//!      (or all three negative — handles back-face by absolute-value
//!      after we compute the signed triangle area).
//!   4. Per fragment, interpolate the world-space normal and the
//!      depth via barycentric coordinates, z-buffer-test, and shade
//!      with ambient + multiple directional lights (Lambertian).
//!   5. Composite source-over into the framebuffer.
//!
//! No SIMD. No threading. No frustum culling beyond near/far clip
//! per-vertex (triangles straddling the near plane render with
//! visual artefacts; cmotion's typical camera distance keeps the
//! letter well away from near). Each of those is a future tuning
//! pass; the goal here is *correct then refined*.
//!
//! The scene-level inputs (transforms, lights, material) live as
//! plain structs the renderer passes in. Extraction from the
//! cmotion Value tree happens in `render.zig`'s 3D dispatch path,
//! not here — keeps this file focused on the math.

const std = @import("std");
const mesh_mod = @import("mesh.zig");
const Vec3 = mesh_mod.Vec3;
const Mat4 = mesh_mod.Mat4;
const Mesh = mesh_mod.Mesh;

pub const Light = union(enum) {
    ambient: struct { intensity: f32 },
    directional: struct { direction: Vec3, intensity: f32 },
};

pub const Material = struct {
    /// Diffuse albedo, RGBA8. Alpha is the source-over compositing
    /// alpha, not a physically-based transmission term.
    albedo: [4]u8 = .{ 220, 220, 220, 255 },
    /// `0` = pure dielectric (plastic, paper, paint — reflects 4% at
    /// normal incidence regardless of colour). `1` = pure metal (the
    /// specular reflection tints with the albedo, the diffuse drops
    /// to zero). Values in between blend the two ends.
    metalness: f32 = 0.0,
    /// `0` = mirror-smooth (tight pinpoint highlight). `1` = fully
    /// rough (broad, almost-imperceptible specular). The taste sample
    /// uses 0.35 — slightly rough metal-ish surface.
    roughness: f32 = 1.0,
};

pub const Framebuffer = struct {
    pixels: []u8, // RGBA8, row-major, top-down, w*h*4 bytes
    width: u32,
    height: u32,
};

/// Per-draw camera. Picked to frame a glyph at the canvas centre:
/// look down -z from a distance, FOV chosen so a 100-unit-wide
/// shape comfortably fills the canvas. Customisable later when
/// scenes ask for it.
pub const Camera = struct {
    distance: f32 = 300.0,
    fov_rad: f32 = std.math.pi / 3.0, // 60°
    near: f32 = 1.0,
    far: f32 = 10000.0,
};

/// Draw a mesh into `fb`. `model` is the world-space transform
/// already applied to the mesh's local coordinates (rotate / scale /
/// translate from the value tree's wrappers). Lights are evaluated
/// in world space. Allocates an arena-rooted z-buffer for the
/// frame's duration; caller's arena owns it.
pub fn drawMesh(
    arena: std.mem.Allocator,
    fb: *Framebuffer,
    mesh: Mesh,
    model: Mat4,
    camera: Camera,
    material: Material,
    lights: []const Light,
) !void {
    if (mesh.indices.len == 0) return;

    const aspect = @as(f32, @floatFromInt(fb.width)) / @as(f32, @floatFromInt(fb.height));
    const view = Mat4.translation(0, 0, -camera.distance);
    const projection = Mat4.perspective(camera.fov_rad, aspect, camera.near, camera.far);
    const mvp = projection.mul(view).mul(model);

    // Z-buffer initialised to "infinity" (after-far). f32 means we
    // get sub-pixel precision and a wide dynamic range. We compare
    // post-perspective-divide depth values in [-1, 1]; clear to >1
    // so the first triangle always wins.
    const zbuf = try arena.alloc(f32, @as(usize, fb.width) * fb.height);
    @memset(zbuf, std.math.inf(f32));

    // Transform all vertices once. World-space positions stay
    // around for lighting (we want normals in world space; with the
    // current "rigid transform only" caveat that's just `model`
    // applied to the local-space normals).
    const n = mesh.positions.len;
    const screen = try arena.alloc(Vec3, n); // (x_screen, y_screen, depth)
    const world_normal = try arena.alloc(Vec3, n);
    var v: usize = 0;
    while (v < n) : (v += 1) {
        const p = mesh.positions[v];
        // mvp gives us clip-space → NDC after the implicit perspective
        // divide in `mulPoint`. Map x, y from [-1, 1] to pixels.
        const ndc = mvp.mulPoint(p);
        const sx = (ndc.x * 0.5 + 0.5) * @as(f32, @floatFromInt(fb.width));
        const sy = (1.0 - (ndc.y * 0.5 + 0.5)) * @as(f32, @floatFromInt(fb.height));
        screen[v] = .{ .x = sx, .y = sy, .z = ndc.z };
        world_normal[v] = model.mulDirection(mesh.normals[v]).normalise();
    }

    var i: usize = 0;
    while (i < mesh.indices.len) : (i += 3) {
        const ia = mesh.indices[i];
        const ib = mesh.indices[i + 1];
        const ic = mesh.indices[i + 2];
        rasteriseTriangle(
            fb,
            zbuf,
            screen[ia],
            screen[ib],
            screen[ic],
            world_normal[ia],
            world_normal[ib],
            world_normal[ic],
            material,
            lights,
        );
    }
}

/// Rasterise a single triangle. `a/b/c` are screen-space coords
/// (x, y in pixels, z in NDC). Normals are world-space; lighting
/// happens per-fragment after barycentric interpolation.
fn rasteriseTriangle(
    fb: *Framebuffer,
    zbuf: []f32,
    a: Vec3,
    b: Vec3,
    c: Vec3,
    na: Vec3,
    nb: Vec3,
    nc: Vec3,
    material: Material,
    lights: []const Light,
) void {
    // Signed twice-area; the absolute value normalises barycentrics
    // and the sign tells us back-face winding. We don't cull back
    // faces — cmotion glyphs are watertight extrusions and the
    // back-face triangles contribute legitimately when the glyph
    // rotates so the back of the C points at the camera. The fragment
    // shader's `dot(n, light_dir)` keeps unlit faces dark naturally.
    const area = edgeFn(a.x, a.y, b.x, b.y, c.x, c.y);
    if (@abs(area) < 1e-6) return;
    const inv_area = 1.0 / area;

    const min_x = @max(0, @as(i32, @intFromFloat(@floor(@min(@min(a.x, b.x), c.x)))));
    const max_x = @min(@as(i32, @intCast(fb.width)) - 1, @as(i32, @intFromFloat(@ceil(@max(@max(a.x, b.x), c.x)))));
    const min_y = @max(0, @as(i32, @intFromFloat(@floor(@min(@min(a.y, b.y), c.y)))));
    const max_y = @min(@as(i32, @intCast(fb.height)) - 1, @as(i32, @intFromFloat(@ceil(@max(@max(a.y, b.y), c.y)))));
    if (min_x > max_x or min_y > max_y) return;

    var py: i32 = min_y;
    while (py <= max_y) : (py += 1) {
        const fy = @as(f32, @floatFromInt(py)) + 0.5;
        var px: i32 = min_x;
        while (px <= max_x) : (px += 1) {
            const fx = @as(f32, @floatFromInt(px)) + 0.5;
            // Three edge functions; barycentric weights = each
            // edge's value scaled by inv_area. Same-sign requirement
            // accepts both front- and back-wound triangles.
            const w_a = edgeFn(b.x, b.y, c.x, c.y, fx, fy) * inv_area;
            const w_b = edgeFn(c.x, c.y, a.x, a.y, fx, fy) * inv_area;
            const w_c = edgeFn(a.x, a.y, b.x, b.y, fx, fy) * inv_area;
            // For back-wound triangles all three are negative —
            // negate so we can use one positive check.
            const wa = if (area < 0) -w_a else w_a;
            const wb = if (area < 0) -w_b else w_b;
            const wc = if (area < 0) -w_c else w_c;
            if (wa < 0 or wb < 0 or wc < 0) continue;

            const depth = wa * a.z + wb * b.z + wc * c.z;
            const idx: usize = @as(usize, @intCast(py)) * fb.width + @as(usize, @intCast(px));
            if (depth >= zbuf[idx]) continue;
            zbuf[idx] = depth;

            // Interpolate the normal. Should renormalise here since
            // linear interpolation shrinks the magnitude — for v0
            // we skip (Lambertian only uses the direction, and the
            // glyph's flat-normal mesh means each fragment's three
            // vertex normals are identical anyway).
            const n = Vec3{
                .x = wa * na.x + wb * nb.x + wc * nc.x,
                .y = wa * na.y + wb * nb.y + wc * nc.y,
                .z = wa * na.z + wb * nb.z + wc * nc.z,
            };
            const shaded = shade(n.normalise(), material, lights);
            writePixel(fb, @intCast(px), @intCast(py), shaded);
        }
    }
}

fn edgeFn(ax: f32, ay: f32, bx: f32, by: f32, px: f32, py: f32) f32 {
    return (bx - ax) * (py - ay) - (by - ay) * (px - ax);
}

/// Shade a fragment via Blinn-Phong with a PBR-style metalness +
/// roughness mapping. Cheap approximation of GGX rather than the
/// full Cook-Torrance BRDF — close enough for motion-graphics
/// titles, and ~10× cheaper per fragment.
///
/// The decomposition:
///   - `diffuse_color`  = albedo · (1 − metalness)     (metals don't diffuse)
///   - `specular_color` = mix(0.04, albedo, metalness) (dielectrics ≈ 4%
///                                                      reflectance at
///                                                      normal incidence;
///                                                      metals reflect
///                                                      their albedo)
///   - `spec_power`     = 2^(11·(1−roughness)) + 2     (tight highlight
///                                                      → broad as
///                                                      roughness ramps)
///
/// Per directional light, accumulate
///   diffuse_color  · I · max(0, N·L) +
///   specular_color · I · max(0, N·H)^spec_power
/// where H = normalize(L + V) and V is the view direction (camera
/// looks down −z, so V ≈ +z in world space — accurate enough for
/// our narrow FOV that we treat it as constant).
fn shade(normal: Vec3, material: Material, lights: []const Light) [4]u8 {
    // Albedo in linear 0..1.
    const albedo: [3]f32 = .{
        @as(f32, @floatFromInt(material.albedo[0])) / 255.0,
        @as(f32, @floatFromInt(material.albedo[1])) / 255.0,
        @as(f32, @floatFromInt(material.albedo[2])) / 255.0,
    };
    const metalness = std.math.clamp(material.metalness, 0.0, 1.0);
    const roughness = std.math.clamp(material.roughness, 0.0, 1.0);

    const one_minus_m = 1.0 - metalness;
    const diffuse_color: [3]f32 = .{
        albedo[0] * one_minus_m,
        albedo[1] * one_minus_m,
        albedo[2] * one_minus_m,
    };
    // F0 = mix(0.04, albedo, metalness). Dielectrics reflect 4% at
    // normal incidence; metals reflect their colour.
    const dielectric_f0: f32 = 0.04;
    const specular_color: [3]f32 = .{
        dielectric_f0 * one_minus_m + albedo[0] * metalness,
        dielectric_f0 * one_minus_m + albedo[1] * metalness,
        dielectric_f0 * one_minus_m + albedo[2] * metalness,
    };
    // Exponential mapping from roughness → Blinn-Phong shininess.
    // roughness=0 → exponent ~2050 (mirror-tight), roughness=1 → 3
    // (extremely broad, near-diffuse). Tuned so 0.35 (taste sample)
    // gives a recognisable but soft highlight.
    const spec_power = std.math.pow(f32, 2.0, 11.0 * (1.0 - roughness)) + 2.0;

    var diffuse: [3]f32 = .{ 0, 0, 0 };
    var specular: [3]f32 = .{ 0, 0, 0 };

    // View direction in world space — see function docstring.
    const view = Vec3{ .x = 0, .y = 0, .z = 1 };

    for (lights) |l| {
        switch (l) {
            .ambient => |amb| {
                // Ambient is direction-less: contributes a flat
                // diffuse-shaped pedestal so unlit faces aren't
                // pitch-black. No specular contribution.
                inline for (0..3) |k| diffuse[k] += diffuse_color[k] * amb.intensity;
            },
            .directional => |dir| {
                // `dir.direction` is the direction the light *travels*
                // (away from the source, toward the surface). For
                // Lambertian we want the direction from the surface
                // *back to* the source — that's −direction.
                const L = dir.direction.scale(-1).normalise();
                const n_dot_l = normal.dot(L);
                if (n_dot_l <= 0) continue; // back-facing — skip.
                // Diffuse Lambertian.
                inline for (0..3) |k| {
                    diffuse[k] += diffuse_color[k] * dir.intensity * n_dot_l;
                }
                // Blinn-Phong specular via the halfway vector.
                const H = L.add(view).normalise();
                const n_dot_h = normal.dot(H);
                if (n_dot_h <= 0) continue;
                const spec = std.math.pow(f32, n_dot_h, spec_power);
                inline for (0..3) |k| {
                    specular[k] += specular_color[k] * dir.intensity * spec;
                }
            },
        }
    }

    // Combine, soft-clamp, convert to RGB8.
    return .{
        toChannel(diffuse[0] + specular[0]),
        toChannel(diffuse[1] + specular[1]),
        toChannel(diffuse[2] + specular[2]),
        material.albedo[3],
    };
}

fn toChannel(linear: f32) u8 {
    const v = linear * 255.0;
    if (v >= 255) return 255;
    if (v <= 0) return 0;
    return @intFromFloat(@round(v));
}

fn writePixel(fb: *Framebuffer, x: u32, y: u32, rgba: [4]u8) void {
    const i = (@as(usize, y) * fb.width + x) * 4;
    // Source-over against whatever's already in the framebuffer.
    const sa = @as(f32, @floatFromInt(rgba[3])) / 255.0;
    const ia = 1.0 - sa;
    inline for (0..3) |k| {
        const dst = @as(f32, @floatFromInt(fb.pixels[i + k])) / 255.0;
        const src = @as(f32, @floatFromInt(rgba[k])) / 255.0;
        fb.pixels[i + k] = @intFromFloat(@round((src * sa + dst * ia) * 255.0));
    }
    fb.pixels[i + 3] = 255;
}

//
// Tests
//

test "drawMesh: an extruded square shaded by ambient light paints the canvas centre" {
    var arena = std.heap.ArenaAllocator.init(std.testing.allocator);
    defer arena.deinit();
    const a = arena.allocator();

    const sq = [_]mesh_mod.Vec2{
        .{ .x = -50, .y = -50 },
        .{ .x = 50, .y = -50 },
        .{ .x = 50, .y = 50 },
        .{ .x = -50, .y = 50 },
    };
    const m = try mesh_mod.extrudeOutline(a, &sq, 20);
    const fb_pixels = try a.alloc(u8, 64 * 64 * 4);
    @memset(fb_pixels, 0);
    var fb = Framebuffer{ .pixels = fb_pixels, .width = 64, .height = 64 };

    const lights = [_]Light{.{ .ambient = .{ .intensity = 1.0 } }};
    try drawMesh(
        a,
        &fb,
        m,
        Mat4.identity(),
        .{},
        .{ .albedo = .{ 255, 0, 0, 255 } },
        &lights,
    );

    // Canvas centre pixel should be red (ambient-lit, no occlusion).
    const c = (32 * 64 + 32) * 4;
    try std.testing.expect(fb.pixels[c + 0] > 200);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[c + 1]);
    try std.testing.expectEqual(@as(u8, 0), fb.pixels[c + 2]);
}

test "shade: a face pointed away from a directional light stays black under no ambient" {
    const lights = [_]Light{.{ .directional = .{
        .direction = .{ .x = 0, .y = 0, .z = -1 }, // light comes from +z
        .intensity = 1.0,
    } }};
    // Surface normal points -z → away from the incoming light.
    const rgba = shade(.{ .x = 0, .y = 0, .z = -1 }, .{ .albedo = .{ 255, 0, 0, 255 } }, &lights);
    try std.testing.expectEqual(@as(u8, 0), rgba[0]);
}

test "shade: a face pointed into a directional light receives its full intensity" {
    const lights = [_]Light{.{ .directional = .{
        .direction = .{ .x = 0, .y = 0, .z = -1 },
        .intensity = 1.0,
    } }};
    // Surface normal points +z → straight into the incoming light.
    const rgba = shade(.{ .x = 0, .y = 0, .z = 1 }, .{ .albedo = .{ 255, 0, 0, 255 } }, &lights);
    try std.testing.expectEqual(@as(u8, 255), rgba[0]);
}

test "shade: a metallic surface tints its specular highlight with the albedo" {
    // Smooth red metal lit dead-on from +z. The specular for a
    // metal tints toward the albedo (red) — red maxes out, green
    // and blue stay at zero. A dielectric in the same geometry
    // sees a ~4% white-tinted specular spill into all channels.
    const lights = [_]Light{.{ .directional = .{
        .direction = .{ .x = 0, .y = 0, .z = -1 },
        .intensity = 1.0,
    } }};
    const metal = shade(
        .{ .x = 0, .y = 0, .z = 1 },
        .{ .albedo = .{ 255, 0, 0, 255 }, .metalness = 1.0, .roughness = 0.1 },
        &lights,
    );
    const plastic = shade(
        .{ .x = 0, .y = 0, .z = 1 },
        .{ .albedo = .{ 255, 0, 0, 255 }, .metalness = 0.0, .roughness = 0.1 },
        &lights,
    );
    // Metal: red specular pegs red, leaves the other channels clean.
    try std.testing.expectEqual(@as(u8, 255), metal[0]);
    try std.testing.expectEqual(@as(u8, 0), metal[1]);
    try std.testing.expectEqual(@as(u8, 0), metal[2]);
    // Plastic: a small white-ish specular sneaks into green/blue.
    try std.testing.expect(plastic[1] > 0);
    try std.testing.expect(plastic[2] > 0);
}

test "shade: roughness widens the specular highlight" {
    // 15°-tilted normal, smooth metal vs moderately rough metal.
    // A mirror's highlight is so narrow that 15° off-axis is
    // effectively unlit; a moderately rough surface scatters
    // enough specular to register.
    const lights = [_]Light{.{ .directional = .{
        .direction = .{ .x = 0, .y = 0, .z = -1 },
        .intensity = 1.0,
    } }};
    const normal = Vec3{ .x = 0.259, .y = 0, .z = 0.966 }; // 15° off +z
    const mirror = shade(
        normal,
        .{ .albedo = .{ 200, 200, 200, 255 }, .metalness = 1.0, .roughness = 0.0 },
        &lights,
    );
    const rough = shade(
        normal,
        .{ .albedo = .{ 200, 200, 200, 255 }, .metalness = 1.0, .roughness = 0.5 },
        &lights,
    );
    try std.testing.expect(rough[0] > mirror[0]);
}
