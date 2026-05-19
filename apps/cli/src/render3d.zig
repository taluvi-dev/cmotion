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

/// Anti-aliased mesh draw via N×N supersampling.
///
/// Allocates a hi-res framebuffer scaled by `factor`, blits the
/// current `fb` into it (nearest-neighbor upsample), rasterises the
/// mesh at the higher resolution, then box-filters the result back
/// down. `factor = 1` short-circuits to `drawMesh` directly.
///
/// Why box filter and not Lanczos / gaussian: at 2× / 4×, box
/// matches lit-pixel coverage closely (each output pixel averages
/// 4 or 16 inputs) and avoids ringing on the hard silhouette
/// edges typical of letter glyphs. The cost is 4× / 16× the
/// rasteriser time, which on a 320×180 frame is still under a
/// second.
pub fn drawMeshSupersampled(
    arena: std.mem.Allocator,
    fb: *Framebuffer,
    mesh: Mesh,
    model: Mat4,
    camera: Camera,
    material: Material,
    lights: []const Light,
    factor: u32,
) !void {
    if (factor <= 1) {
        return drawMesh(arena, fb, mesh, model, camera, material, lights);
    }
    const hi_w = fb.width * factor;
    const hi_h = fb.height * factor;
    const hi_pixels = try arena.alloc(u8, @as(usize, hi_w) * hi_h * 4);
    var hi_fb = Framebuffer{ .pixels = hi_pixels, .width = hi_w, .height = hi_h };

    // Nearest-neighbour upsample: each low-res pixel becomes a
    // factor×factor block in hi-res. The hi-res rasteriser draws
    // on top of this, so the box-filter downsample later sees the
    // right background through any partially-covered pixels.
    upsampleNN(fb.*, &hi_fb, factor);

    try drawMesh(arena, &hi_fb, mesh, model, camera, material, lights);

    boxFilterDownsample(&hi_fb, fb, factor);
}

fn upsampleNN(src: Framebuffer, dst: *Framebuffer, factor: u32) void {
    var y: u32 = 0;
    while (y < dst.height) : (y += 1) {
        const sy = y / factor;
        var x: u32 = 0;
        while (x < dst.width) : (x += 1) {
            const sx = x / factor;
            const si = (@as(usize, sy) * src.width + sx) * 4;
            const di = (@as(usize, y) * dst.width + x) * 4;
            inline for (0..4) |k| dst.pixels[di + k] = src.pixels[si + k];
        }
    }
}

fn boxFilterDownsample(src: *Framebuffer, dst: *Framebuffer, factor: u32) void {
    const n2 = factor * factor;
    var y: u32 = 0;
    while (y < dst.height) : (y += 1) {
        var x: u32 = 0;
        while (x < dst.width) : (x += 1) {
            var sum_r: u32 = 0;
            var sum_g: u32 = 0;
            var sum_b: u32 = 0;
            var sum_a: u32 = 0;
            var dy: u32 = 0;
            while (dy < factor) : (dy += 1) {
                var dx: u32 = 0;
                while (dx < factor) : (dx += 1) {
                    const si = ((@as(usize, y) * factor + dy) * src.width + (@as(usize, x) * factor + dx)) * 4;
                    sum_r += src.pixels[si + 0];
                    sum_g += src.pixels[si + 1];
                    sum_b += src.pixels[si + 2];
                    sum_a += src.pixels[si + 3];
                }
            }
            const di = (@as(usize, y) * dst.width + x) * 4;
            dst.pixels[di + 0] = @intCast(sum_r / n2);
            dst.pixels[di + 1] = @intCast(sum_g / n2);
            dst.pixels[di + 2] = @intCast(sum_b / n2);
            dst.pixels[di + 3] = @intCast(sum_a / n2);
        }
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

/// Shade a fragment via a physically-based BRDF: GGX/Trowbridge-Reitz
/// normal-distribution function + Smith geometric attenuation +
/// Schlick Fresnel for the specular term, Lambert for diffuse,
/// hemispheric sky/ground gradient for ambient. ACES filmic tone
/// mapping + sRGB gamma encoding produces the final 8-bit output.
///
/// The simplifications still in place: view direction treated as
/// constant +z (narrow-FOV approximation that avoids per-fragment
/// view recomputation); no environment-map reflection; no shadow
/// casting. These are the polish that turns a "PBR-shaped" renderer
/// into a "Three.js-grade" one and can land incrementally on top.
fn shade(normal: Vec3, material: Material, lights: []const Light) [4]u8 {
    const albedo: [3]f32 = .{
        srgbDecode(material.albedo[0]),
        srgbDecode(material.albedo[1]),
        srgbDecode(material.albedo[2]),
    };
    const metalness = std.math.clamp(material.metalness, 0.0, 1.0);
    const roughness_input = std.math.clamp(material.roughness, 0.0, 1.0);
    // GGX gets numerically nasty near roughness=0 (perfectly smooth
    // surface = delta-function NDF); the standard fix is to clamp
    // up from a small epsilon. 0.04 is the threshold most game
    // engines use.
    const roughness = @max(roughness_input, 0.04);

    // F0 = the surface's reflectance at normal incidence.
    // Dielectric: 4 % white. Metal: tinted by the albedo.
    const f0: [3]f32 = .{
        std.math.lerp(@as(f32, 0.04), albedo[0], metalness),
        std.math.lerp(@as(f32, 0.04), albedo[1], metalness),
        std.math.lerp(@as(f32, 0.04), albedo[2], metalness),
    };

    var lit: [3]f32 = .{ 0, 0, 0 };

    // View direction — see function docstring for the constant-+z
    // approximation. n_dot_v is bounded below to avoid singularities
    // at grazing angles.
    const view = Vec3{ .x = 0, .y = 0, .z = 1 };
    const n_dot_v = @max(0.001, normal.dot(view));

    for (lights) |l| {
        switch (l) {
            .ambient => |amb| {
                // Hemispheric ambient — a cool sky tint from above,
                // a warm ground tint from below, the equator a
                // neutral grey. n.y selects the gradient (y-up in
                // world space). The whole thing scales by the
                // scene's ambient `intensity:` so users can dim
                // it via the same knob they had before.
                const sky_color: [3]f32 = .{ 0.55, 0.62, 0.78 };
                const ground_color: [3]f32 = .{ 0.35, 0.30, 0.22 };
                const t = normal.y * 0.5 + 0.5;
                inline for (0..3) |k| {
                    const hemi = std.math.lerp(ground_color[k], sky_color[k], t);
                    // Energy-conserving: ambient only enters via the
                    // diffuse channel (no F at ambient since we don't
                    // know an incidence angle). Metalness suppresses
                    // diffuse, so highly metallic surfaces darken
                    // under pure ambient — that's physically correct
                    // and matches what MeshStandardMaterial does in
                    // Three.js without an environment map.
                    lit[k] += albedo[k] * hemi * amb.intensity * (1.0 - metalness);
                }
            },
            .directional => |dir| {
                const L = dir.direction.scale(-1).normalise();
                const n_dot_l = normal.dot(L);
                if (n_dot_l <= 0) continue;

                const H = L.add(view).normalise();
                const n_dot_h = @max(0, normal.dot(H));
                const v_dot_h = @max(0, view.dot(H));

                // GGX/Trowbridge-Reitz normal distribution.
                const alpha = roughness * roughness;
                const alpha2 = alpha * alpha;
                const ndf_denom = n_dot_h * n_dot_h * (alpha2 - 1.0) + 1.0;
                const D = alpha2 / (std.math.pi * ndf_denom * ndf_denom);

                // Smith geometric attenuation with Schlick-GGX
                // approximation. `k` is the direct-light remapping
                // — `(roughness + 1)² / 8`.
                const k = (roughness + 1.0) * (roughness + 1.0) / 8.0;
                const g_v = n_dot_v / (n_dot_v * (1.0 - k) + k);
                const g_l = n_dot_l / (n_dot_l * (1.0 - k) + k);
                const G = g_v * g_l;

                // Schlick's Fresnel approximation.
                const fres_x = 1.0 - v_dot_h;
                const fres_x5 = fres_x * fres_x * fres_x * fres_x * fres_x;

                // BRDF specular: (D · F · G) / (4 · n·v · n·l).
                // F is per-channel, so the whole specular is per-channel.
                const denom = 4.0 * n_dot_v * n_dot_l + 0.0001;
                inline for (0..3) |k_idx| {
                    const F = f0[k_idx] + (1.0 - f0[k_idx]) * fres_x5;
                    const specular = (D * F * G) / denom;
                    // Energy conservation: light reflected by F can't
                    // also be absorbed/diffused. Metalness suppresses
                    // the diffuse path entirely.
                    const k_d = (1.0 - F) * (1.0 - metalness);
                    const diffuse = k_d * albedo[k_idx] / std.math.pi;
                    lit[k_idx] += (diffuse + specular) * dir.intensity * n_dot_l;
                }
            },
        }
    }

    // ACES filmic tone mapping (Krzysztof Narkowicz's fit). Compresses
    // the [0, ∞) HDR range into [0, 1] with a filmic shoulder /
    // toe, then we gamma-encode for sRGB display.
    return .{
        finaliseChannel(lit[0]),
        finaliseChannel(lit[1]),
        finaliseChannel(lit[2]),
        material.albedo[3],
    };
}

/// 0..255 sRGB → linear 0..1. Approximation: simple 2.2 gamma curve.
/// Good enough for albedo; the full piecewise sRGB curve is more
/// expensive and the difference is invisible on most renders.
fn srgbDecode(c: u8) f32 {
    return std.math.pow(f32, @as(f32, @floatFromInt(c)) / 255.0, 2.2);
}

/// Final per-channel output: ACES filmic tone map (linear in →
/// LDR-friendly linear out), then sRGB gamma encode, then quantise.
fn finaliseChannel(linear: f32) u8 {
    const mapped = acesFilmic(@max(0.0, linear));
    const gamma = std.math.pow(f32, mapped, 1.0 / 2.2);
    const q = gamma * 255.0;
    if (q >= 255) return 255;
    if (q <= 0) return 0;
    return @intFromFloat(@round(q));
}

fn acesFilmic(x: f32) f32 {
    const a: f32 = 2.51;
    const b: f32 = 0.03;
    const c: f32 = 2.43;
    const d: f32 = 0.59;
    const e: f32 = 0.14;
    return std.math.clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
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

    // Centre pixel: ambient lighting under the new hemispheric
    // model produces a *muted* red, not pure red — the cool sky
    // tint and warm ground tint modulate the albedo through the
    // y-up gradient. Front face's normal is +y in the y-up world,
    // so sky_color dominates. Still red-dominated though.
    const c = (32 * 64 + 32) * 4;
    try std.testing.expect(fb.pixels[c + 0] > fb.pixels[c + 1]);
    try std.testing.expect(fb.pixels[c + 0] > fb.pixels[c + 2]);
    try std.testing.expect(fb.pixels[c + 0] > 30);
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

test "shade: a face pointed into a directional light receives bright red" {
    const lights = [_]Light{.{ .directional = .{
        .direction = .{ .x = 0, .y = 0, .z = -1 },
        .intensity = 1.0,
    } }};
    // Surface normal points +z → straight into the incoming light.
    // With ACES + gamma encoding the channel doesn't peg at 255
    // (the tone-mapper compresses near-1 input to ~0.7 linear and
    // gamma encodes to ~0.85), but the result is unmistakably red
    // and dominates over the other channels. The tiny green/blue
    // spill (~10) is the dielectric Schlick Fresnel — F0=0.04
    // white means ~4 % of the specular tints toward white.
    const rgba = shade(.{ .x = 0, .y = 0, .z = 1 }, .{ .albedo = .{ 255, 0, 0, 255 } }, &lights);
    try std.testing.expect(rgba[0] > 150);
    try std.testing.expect(rgba[0] > rgba[1] * 5);
    try std.testing.expect(rgba[0] > rgba[2] * 5);
    try std.testing.expect(rgba[1] < 40);
    try std.testing.expect(rgba[2] < 40);
}

test "shade: a metallic surface tints its specular highlight with the albedo" {
    // Red metal lit dead-on from +z. Metal's F0 ≈ albedo, so the
    // specular is red and the diffuse is suppressed by `1 - F`
    // and `1 - metalness`. Result: vivid red dominant, off-channels
    // near zero. A dielectric in the same geometry lets the diffuse
    // dominate and the white-tinted Schlick highlight leak into
    // green/blue.
    const lights = [_]Light{.{ .directional = .{
        .direction = .{ .x = 0, .y = 0, .z = -1 },
        .intensity = 2.0,
    } }};
    const metal = shade(
        .{ .x = 0, .y = 0, .z = 1 },
        .{ .albedo = .{ 255, 0, 0, 255 }, .metalness = 1.0, .roughness = 0.2 },
        &lights,
    );
    const plastic = shade(
        .{ .x = 0, .y = 0, .z = 1 },
        .{ .albedo = .{ 255, 0, 0, 255 }, .metalness = 0.0, .roughness = 0.2 },
        &lights,
    );
    // Metal: bright red, off-channels are zero.
    try std.testing.expect(metal[0] > 150);
    try std.testing.expectEqual(@as(u8, 0), metal[1]);
    try std.testing.expectEqual(@as(u8, 0), metal[2]);
    // Plastic: red dominates but the Schlick Fresnel tints the
    // specular toward white at normal incidence (F0=0.04 white
    // for dielectrics) so off-channels register too.
    try std.testing.expect(plastic[1] > 0);
    try std.testing.expect(plastic[2] > 0);
}

test "shade: roughness widens the specular highlight" {
    // 15° off-axis normal, smooth metal vs moderately rough metal.
    // A mirror's GGX D narrows to a tiny solid angle so the
    // off-axis sample falls outside the highlight; the rougher
    // surface spreads the spec lobe enough to still register.
    const lights = [_]Light{.{ .directional = .{
        .direction = .{ .x = 0, .y = 0, .z = -1 },
        .intensity = 1.0,
    } }};
    const normal = Vec3{ .x = 0.259, .y = 0, .z = 0.966 };
    const mirror = shade(
        normal,
        .{ .albedo = .{ 200, 200, 200, 255 }, .metalness = 1.0, .roughness = 0.04 },
        &lights,
    );
    const rough = shade(
        normal,
        .{ .albedo = .{ 200, 200, 200, 255 }, .metalness = 1.0, .roughness = 0.5 },
        &lights,
    );
    try std.testing.expect(rough[0] > mirror[0]);
}
