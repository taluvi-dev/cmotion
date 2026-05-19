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
    /// Self-illuminating colour added on top of the lit result. Lets
    /// surfaces facing away from every light still read with material
    /// colour instead of going pitch black (or, in our case, looking
    /// "transparent" against a dark background). Three.js's
    /// MeshStandardMaterial calls this `emissive`.
    emissive: [4]u8 = .{ 0, 0, 0, 255 },
    /// Multiplier on `emissive` — separated so a scene can keep a
    /// constant emissive *colour* (often tied to the hue animation)
    /// while dialling the intensity independently. Three.js's
    /// `emissiveIntensity` defaults to 1; the taste sample renders
    /// at 0.6.
    emissive_intensity: f32 = 1.0,
};

pub const Framebuffer = struct {
    pixels: []u8, // RGBA8, row-major, top-down, w*h*4 bytes
    width: u32,
    height: u32,
};

/// Per-draw camera. Default FOV / distance picked to match the
/// near-orthographic look the cmotion.org Three.js ScenePreview
/// uses for the taste sample — 28° FOV at distance proportional
/// to the canvas size. A wider FOV (e.g. 60°) exaggerates
/// perspective foreshortening, making extruded letters read as
/// "long tubes" when rotated edge-on; the narrow FOV preserves
/// the letter's depth-to-width ratio across rotations.
pub const Camera = struct {
    /// Camera sits at +z, looking toward origin. Default keeps a
    /// ~96-unit-tall glyph framed at roughly 1/3 of canvas height
    /// — matches the ScenePreview's framing.
    distance: f32 = 580.0,
    /// 28° in radians. Near-orthographic — matches the
    /// ScenePreview's `PerspectiveCamera(28, …)`.
    fov_rad: f32 = 28.0 * std.math.pi / 180.0,
    near: f32 = 1.0,
    far: f32 = 10000.0,
};

/// Draw a mesh into `fb`. `model` is the world-space transform
/// already applied to the mesh's local coordinates (rotate / scale /
/// translate from the value tree's wrappers). Lights are evaluated
/// in world space. Allocates an arena-rooted z-buffer for the
/// frame's duration; caller's arena owns it.
///
/// Parallelism: horizontal-band partitioning. The framebuffer is
/// sliced into N equal-row bands (N = host CPU count, capped at
/// 16). Each band runs in its own thread; the thread iterates
/// every triangle but only rasterises the rows that fall inside
/// its band. No shared writes — each band owns its rows of the
/// framebuffer and z-buffer — so the inner loop stays atomic-free.
/// Per-frame thread spawn cost is ~0.1 ms which is negligible
/// against the rasteriser's milliseconds-to-seconds workload.
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

    // Pre-compute each triangle's screen-space y-extent. Each worker
    // uses it to skip triangles entirely outside its band — for
    // glyph meshes (where most triangles cluster vertically near
    // the letter's bounding box) this lets bands above and below
    // the glyph finish almost instantly.
    const tri_count = mesh.indices.len / 3;
    const tri_y_min = try arena.alloc(f32, tri_count);
    const tri_y_max = try arena.alloc(f32, tri_count);
    var ti: usize = 0;
    while (ti < tri_count) : (ti += 1) {
        const i_base = ti * 3;
        const ya = screen[mesh.indices[i_base]].y;
        const yb = screen[mesh.indices[i_base + 1]].y;
        const yc = screen[mesh.indices[i_base + 2]].y;
        tri_y_min[ti] = @min(@min(ya, yb), yc);
        tri_y_max[ti] = @max(@max(ya, yb), yc);
    }

    // Partition the framebuffer into row bands, one per worker.
    const max_threads = 16;
    const cpu_count = std.Thread.getCpuCount() catch 1;
    const num_threads_raw = @min(cpu_count, max_threads);
    // For tiny canvases / tiny meshes, threading overhead exceeds
    // the work. Single-thread under a workload threshold.
    const workload = @as(usize, fb.width) * fb.height * tri_count;
    const num_threads = if (workload < 200_000) 1 else num_threads_raw;

    if (num_threads <= 1) {
        // Single-threaded fast path — skips the spawn overhead.
        rasteriseBand(.{
            .fb = fb,
            .zbuf = zbuf,
            .screen = screen,
            .normals = world_normal,
            .indices = mesh.indices,
            .tri_y_min = tri_y_min,
            .tri_y_max = tri_y_max,
            .material = material,
            .lights = lights,
            .y_start = 0,
            .y_end = fb.height,
        });
        return;
    }

    var threads: [max_threads]std.Thread = undefined;
    const band_h = fb.height / num_threads;
    var t: usize = 0;
    while (t < num_threads) : (t += 1) {
        const y_start: u32 = @intCast(t * band_h);
        const y_end: u32 = if (t == num_threads - 1) fb.height else @intCast((t + 1) * band_h);
        threads[t] = try std.Thread.spawn(.{}, rasteriseBand, .{BandArgs{
            .fb = fb,
            .zbuf = zbuf,
            .screen = screen,
            .normals = world_normal,
            .indices = mesh.indices,
            .tri_y_min = tri_y_min,
            .tri_y_max = tri_y_max,
            .material = material,
            .lights = lights,
            .y_start = y_start,
            .y_end = y_end,
        }});
    }
    t = 0;
    while (t < num_threads) : (t += 1) threads[t].join();
}

const BandArgs = struct {
    fb: *Framebuffer,
    zbuf: []f32,
    screen: []const Vec3,
    normals: []const Vec3,
    indices: []const u32,
    tri_y_min: []const f32,
    tri_y_max: []const f32,
    material: Material,
    lights: []const Light,
    y_start: u32,
    y_end: u32,
};

fn rasteriseBand(args: BandArgs) void {
    const y_start_f: f32 = @floatFromInt(args.y_start);
    const y_end_f: f32 = @floatFromInt(args.y_end);
    var i: usize = 0;
    var ti: usize = 0;
    while (i < args.indices.len) : ({
        i += 3;
        ti += 1;
    }) {
        // Pre-cull: triangle's screen-space y-extent must overlap
        // our band, otherwise the bounding-box clip inside the
        // rasteriser would empty out anyway.
        if (args.tri_y_max[ti] < y_start_f or args.tri_y_min[ti] >= y_end_f) continue;
        const ia = args.indices[i];
        const ib = args.indices[i + 1];
        const ic = args.indices[i + 2];
        rasteriseTriangleClipped(
            args.fb,
            args.zbuf,
            args.screen[ia],
            args.screen[ib],
            args.screen[ic],
            args.normals[ia],
            args.normals[ib],
            args.normals[ic],
            args.material,
            args.lights,
            args.y_start,
            args.y_end,
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

/// Rasterise a single triangle, clipped to a horizontal band
/// `[y_start, y_end)`. `a/b/c` are screen-space coords (x, y in
/// pixels, z in NDC). Normals are world-space; lighting happens
/// per-fragment after barycentric interpolation. The band clip
/// is what makes `drawMesh` thread-safe: each worker is given a
/// disjoint y range and never writes outside it.
fn rasteriseTriangleClipped(
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
    y_start: u32,
    y_end: u32,
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
    var min_y = @max(0, @as(i32, @intFromFloat(@floor(@min(@min(a.y, b.y), c.y)))));
    var max_y = @min(@as(i32, @intCast(fb.height)) - 1, @as(i32, @intFromFloat(@ceil(@max(@max(a.y, b.y), c.y)))));
    // Band clip — entirely outside this worker's slice → skip.
    min_y = @max(min_y, @as(i32, @intCast(y_start)));
    max_y = @min(max_y, @as(i32, @intCast(y_end)) - 1);
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

/// Per-fragment RGB vector. Maps to a SIMD register on x86_64
/// (the compiler typically pads `@Vector(3, f32)` to 4 lanes
/// internally). All per-channel arithmetic inside `shade` runs as
/// element-wise vector ops — the BRDF maths goes from 3 scalar
/// passes to one SIMD pass per stage.
const Vec3F = @Vector(3, f32);

/// Shade a fragment via a physically-based BRDF: GGX/Trowbridge-Reitz
/// normal-distribution function + Smith geometric attenuation +
/// Schlick Fresnel for the specular term, Lambert for diffuse,
/// procedural environment (sky/horizon/ground + HDR sun) sampled
/// along N and R for ambient + reflection. ACES filmic tone
/// mapping + sRGB gamma encoding produces the final 8-bit output.
fn shade(normal: Vec3, material: Material, lights: []const Light) [4]u8 {
    // DEBUG normal-visualisation override: encode the surface
    // normal as RGB so the user can see directly what geometry
    // is present at each rotation. Front cap (+z) reads light
    // blue; back cap (-z) reads yellow; outward walls show as
    // pinks/teals depending on xy direction. If a region of the
    // C silhouette shows the BACKGROUND colour instead of a
    // normal-encoded colour, there's no geometry there. Revert
    // this override once the diagnosis lands.
    _ = material;
    _ = lights;
    const r: f32 = (normal.x + 1.0) * 0.5;
    const g: f32 = (normal.y + 1.0) * 0.5;
    const b: f32 = (normal.z + 1.0) * 0.5;
    return .{
        @intFromFloat(@round(std.math.clamp(r, 0.0, 1.0) * 255.0)),
        @intFromFloat(@round(std.math.clamp(g, 0.0, 1.0) * 255.0)),
        @intFromFloat(@round(std.math.clamp(b, 0.0, 1.0) * 255.0)),
        255,
    };
}

fn shade_disabled_real(normal: Vec3, material: Material, lights: []const Light) [4]u8 {
    const albedo: Vec3F = .{
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

    // F0 = mix(0.04, albedo, metalness). Dielectrics reflect 4% at
    // normal incidence; metals reflect their albedo colour.
    const f0_dielectric: Vec3F = @splat(0.04);
    const metal_v: Vec3F = @splat(metalness);
    const f0: Vec3F = f0_dielectric + (albedo - f0_dielectric) * metal_v;

    const ones: Vec3F = @splat(1.0);
    const one_minus_m: Vec3F = @splat(1.0 - metalness);

    var lit: Vec3F = @splat(0);

    // View direction — constant +z (camera looks down −z with narrow
    // FOV). n_dot_v is bounded below to avoid singularities at
    // grazing angles.
    const view = Vec3{ .x = 0, .y = 0, .z = 1 };
    const n_dot_v = @max(0.001, normal.dot(view));

    for (lights) |l| {
        switch (l) {
            .ambient => |amb| {
                const env_diffuse = sampleEnvironment(normal);
                const reflect = computeReflect(view, normal);
                const env_specular = sampleEnvironment(reflect);

                // Schlick at the n·v incidence. Roughness² blurs the
                // specular into the diffuse on rough surfaces (cheap
                // split-sum stand-in).
                const fres_n = 1.0 - n_dot_v;
                const fres_n5 = fres_n * fres_n * fres_n * fres_n * fres_n;
                const rough_atten = (1.0 - roughness) * (1.0 - roughness);
                const fres_v: Vec3F = @splat(fres_n5);
                const rough_v: Vec3F = @splat(rough_atten);
                const intensity_v: Vec3F = @splat(amb.intensity);

                const diff = albedo * env_diffuse * one_minus_m;
                const F_env = f0 + (ones - f0) * fres_v;
                const spec = env_specular * F_env * rough_v;

                lit += (diff + spec) * intensity_v;
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

                // Smith geometric attenuation with Schlick-GGX `k`.
                const k = (roughness + 1.0) * (roughness + 1.0) / 8.0;
                const g_v = n_dot_v / (n_dot_v * (1.0 - k) + k);
                const g_l = n_dot_l / (n_dot_l * (1.0 - k) + k);
                const G = g_v * g_l;

                // Schlick Fresnel — scalar fres_x5, broadcast into a
                // vector for the per-channel F = f0 + (1-f0)·fres⁵.
                const fres_x = 1.0 - v_dot_h;
                const fres_x5 = fres_x * fres_x * fres_x * fres_x * fres_x;
                const fres_v: Vec3F = @splat(fres_x5);
                const F = f0 + (ones - f0) * fres_v;

                const denom = 4.0 * n_dot_v * n_dot_l + 0.0001;
                const spec_scale: Vec3F = @splat(D * G / denom);
                const inv_pi: Vec3F = @splat(1.0 / std.math.pi);
                const irradiance: Vec3F = @splat(dir.intensity * n_dot_l);

                const specular = F * spec_scale;
                const k_d = (ones - F) * one_minus_m;
                const diffuse = k_d * albedo * inv_pi;

                lit += (diffuse + specular) * irradiance;
            },
        }
    }

    // Emissive — added after the lighting loop so it's
    // unaffected by view / normal / light direction. A face
    // pointing away from every light still reads with the
    // emissive colour; that's the "self-glow" that keeps the C
    // looking solid rather than transparent against the dark
    // background.
    const emissive: Vec3F = .{
        srgbDecode(material.emissive[0]),
        srgbDecode(material.emissive[1]),
        srgbDecode(material.emissive[2]),
    };
    const emit_i: Vec3F = @splat(material.emissive_intensity);
    lit += emissive * emit_i;

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

/// Procedural environment sampled by direction. Three smooth
/// lobes (zenith / horizon / nadir) plus a directional "sun" — a
/// localized bright spot that, when sampled along a reflection
/// vector, produces the sharp specular highlight characteristic
/// of HDR-lit metal. The sun is mildly HDR (peak intensity ~5)
/// so the ACES tone-mapper can preserve a bright but
/// non-clipping highlight.
///
/// Sky / horizon / ground colours pick an "outdoor overcast"
/// register — pleasant on metal without dominating the diffuse.
/// Sun direction picks an upper-right angle that lines up with
/// the taste sample's main directional light (vec3(3, 4, 5)) so
/// the reflected sun catches the same face of the geometry the
/// direct light hits.
fn sampleEnvironment(direction: Vec3) Vec3F {
    const sky: Vec3F = .{ 0.62, 0.71, 0.86 };
    const horizon: Vec3F = .{ 0.82, 0.81, 0.78 };
    const ground: Vec3F = .{ 0.30, 0.25, 0.20 };

    const y = std.math.clamp(direction.y, -1.0, 1.0);
    var out: Vec3F = @splat(0);
    if (y >= 0) {
        const t = std.math.pow(f32, y, 0.6);
        const t_v: Vec3F = @splat(t);
        out = horizon + (sky - horizon) * t_v;
    } else {
        const t = std.math.pow(f32, -y, 0.6);
        const t_v: Vec3F = @splat(t);
        out = horizon + (ground - horizon) * t_v;
    }

    // Add the sun.
    const inv_root50: f32 = 0.1414213562;
    const sun_dir = Vec3{
        .x = 3.0 * inv_root50,
        .y = 4.0 * inv_root50,
        .z = 5.0 * inv_root50,
    };
    const cos_to_sun = std.math.clamp(direction.dot(sun_dir), 0.0, 1.0);
    const sun_peak: f32 = 5.0;
    const sun_falloff = std.math.pow(f32, cos_to_sun, 512.0);
    const sun_color: Vec3F = .{ 1.0, 0.95, 0.85 };
    const sun_contribution = sun_color * @as(Vec3F, @splat(sun_peak * sun_falloff));
    out += sun_contribution;

    return out;
}

/// Reflection vector: `R = 2 · (N · V) · N − V`, where `V` is the
/// direction *from the surface to the viewer*. For a mirror, this
/// is the direction the surface samples the environment from.
fn computeReflect(view: Vec3, normal: Vec3) Vec3 {
    const dot = normal.dot(view);
    return Vec3{
        .x = 2 * dot * normal.x - view.x,
        .y = 2 * dot * normal.y - view.y,
        .z = 2 * dot * normal.z - view.z,
    };
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
