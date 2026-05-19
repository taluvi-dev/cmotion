# Plan.md — handoff for the next agent

Working hand-off. Read `CLAUDE.md` first for durable project
orientation; this file is *what just shipped* and *what to pick up*.
The canonical syntactic spec lives at
https://cmotion.org/language/grammar/#ebnf (mirrored as `GRAMMAR.md`)
— read it before extending the language.

## End-state render architecture (where this is heading)

The eventual stack, set in chat:

```
Zig
  ↓
SDL3                         (window / surface / input, native only)
  ↓
Dawn / WebGPU                (cross-platform GPU; browser uses its own WebGPU)
  ↓
custom 2D renderer           ← what render.zig is becoming; CPU reference,
                               GPU implementation later via WGSL shaders
  ↓
text shaping: HarfBuzz       (kerning, ligatures, complex scripts — v1)
  ↓
font raster: FreeType or stb_truetype  (outline rasterisation — stb v0)
```

**Two complementary rendering paths**, both consuming the same value
tree from the sampler:

- **CPU / WASM (canonical, this branch's focus):** `render.zig`
  compiled native for the CLI and to wasm32 for the browser editor
  and Cloudflare containers. Deterministic, runs everywhere bits
  run, produces the final bounce. *No GPU dependency anywhere on
  this path.*
- **GPU realtime (editor preview, deferred):** SDL3 window hosting
  Dawn/WebGPU on native, browser's own WebGPU on the web. Shaders
  mirror the CPU reference within a tolerance. Optimised for
  latency during authoring, not for canonical pixels.

The current arc (visual fidelity in the CPU renderer) is **building
the reference**. Once the CPU renderer matches the example, the GPU
path is "port these algorithms to WGSL and verify output stays
within tolerance." HarfBuzz layers on top of FreeType/stb_truetype
when complex text becomes a need; stb_truetype alone is v0.

The rest of this file is the **active priority arc** — what's
actually next, not the multi-year shape above.

## What just shipped on this branch (`claude/continue-plan-md-4Ms7e`)

Fourteen commits, all green (91/91 native tests + WASM-vs-native
pixel parity). **The visual-fidelity arc is done**: the taste
sample on cmotion.org renders end-to-end through `cmo render` as
a 3D-extruded, lit, rotating, wobbling, pulsing letter in the
warm material colour, at the level of the example. The full
alphabet extrudes correctly — letters with interior holes (B / D
/ O / P / Q / R) bridge through the hole-bridging path in
`mesh.zig`.

```
.cm source → parse → lower → eval → sample(t) → render → png / wasm
                                                              │
                                                              ├── native CLI (cmotion binary, ~16 MB)
                                                              └── cmotion-render.wasm (18.7 KB, freestanding)
```

Commits, in order:

1. **`at:` + `translate(...)` for shape positioning.** Centred-by-
   default; (0,0) = canvas centre, +x right, +y down. `fillRect`
   moved to f64 coords + internal clamping so off-canvas /
   negative / fractional positions work cleanly.
2. **3D wrappers → flat fallback.** Earlier no-op behaviour for
   `render3d` / `extrude` / `material` / `rotate` / `scale` — kept
   as the fallback when there's no `render3d` above; replaced as
   the primary 3D path in commit 11.
3. **Block-letter `text.glyph`.** 5×7 bitmap font as placeholder,
   replaced by TTF outlines in commit 9.
4. **`oklab(...)` / `srgb(...)` colour literals** wired through
   the Ottosson matrices.
5. **Real deflate for PNG** — Up filter + fixed-Huffman + LZ77.
   230 KB → 2.6 KB for the taste sample. Hand-rolled because
   Zig 0.15.1's `std.compress.flate.Compress` is broken
   (`bit_writer`, `Container.writeFooter` reference removed
   fields). Round-trip validated via stdlib `Decompress`.
6. **WASM build target + byte-parity test.** `zig build wasm`
   emits `cmotion-render.wasm` (~18.7 KB at ReleaseSmall,
   wasm32-freestanding, no libc). `zig build test-parity` renders
   the same fixture both ways under Node and asserts byte
   equality across all 320×180×3 pixel channels. Session-start
   hook pre-builds the WASM artifact.
7. **Plan.md refocused** on visual fidelity, end-state stack
   documented (Zig → SDL3 → Dawn/WebGPU → custom 2D renderer →
   HarfBuzz → FreeType/stb_truetype).
8. **Sampler completeness** — `easing.<curve>` actually applied
   to the interpolation fraction (cubic / quad in/out/in_out),
   `wave(amplitude, period)` resolved to `amplitude · sin(2π · t
   / period)`. Animations now sample to the right numbers; the
   renderer is free to consume them.
9. **TTF font** via `stb_truetype` + DM Sans Bold (OFL 1.1,
   vendored from googlefonts/dm-fonts). `font.zig` wraps stb's
   FFI. The bundled font is `@embedFile`'d at compile time via
   `addAnonymousImport` indirection.
10. **3D primitives** — `Vec3`, `Mat4` (translation, scaling,
    rotationX/Y/Z, right-handed perspective, mul, mulPoint,
    mulDirection), `Mesh { positions, normals, indices }`,
    ear-clipping triangulation, `extrudeOutline(outline, depth)`.
11. **3D rasteriser** — `render3d.zig`. Pineda-style triangle
    rasterisation, z-buffer, per-fragment Lambertian shading
    against ambient + multiple directionals. `render.zig`
    learns to dispatch `render3d(scene, lights:)` into the 3D
    path; `paint3DTree` walks scene wrappers accumulating model
    transform + style; `extrude` builds a centred mesh and
    rasterises. Lights parsed from the value tree; angles read
    with cmotion's `deg` / `rad` unit convention.
12. **Material refinement** — `metalness` + `roughness` honoured
    via a Blinn-Phong specular with a PBR-style F0 mix (dielectric
    4% white vs metal-tinted albedo) and roughness-to-shininess
    mapping `2^(11·(1−r)) + 2`. The taste sample's
    `metalness: 0.25, roughness: 0.35` produce visible tinted
    highlights on lit faces.
13. **2× supersampling** for the 3D rasteriser. Allocates a 2×
    hi-res framebuffer, nearest-up the current `fb` into it, runs
    the rasteriser there, box-filter-downsamples back. Smooths
    the jaggy silhouette edges; ~4× the rasteriser cost (still
    well under 100 ms for the taste sample).
14. **Hole bridging** — letters with interior holes (B / D / O /
    P / Q / R) extrude through `earClipWithHoles` /
    `extrudeContours`. Each hole's rightmost vertex bridges via
    +x ray-cast to the closest outer edge; hole side walls invert
    naturally from the CW-normalised winding.

## Where we are visually

The taste sample renders structurally at the level of the
cmotion.org example: 3D-extruded letter, lit-correctly-in-theory,
rotating, wobbling, pulsing, with material colour shifted by the
hue animation. The full alphabet extrudes cleanly including
letters with interior holes.

**But the result doesn't yet read as Three.js-level quality.** The
visible gap, in order of impact:

- **Sharp 90° edges between front face and side walls.** No
  bevel. The letter reads as a flat plate cut from cardboard, not
  a solid 3D object. Three.js TextGeometry defaults to a small
  bevel for exactly this reason.
- **Flat-shaded faces.** One normal per face means each face
  appears as a single uniform colour — the two directional lights
  shift overall brightness but produce no visible gradient
  *across* a face. Smooth normals on curved side walls would
  remove the faceted-curve artifact and let lighting actually
  read.
- **No real PBR.** Blinn-Phong with metalness/roughness produces
  metals-vs-plastics distinction but lacks the "depth" of GGX +
  Schlick Fresnel + environment-lit ambient. Three.js's
  MeshStandardMaterial does all three.
- **No tone mapping.** Direct linear → sRGB flattens highlights.
  Three.js defaults to ACES Filmic since r147.
- **No shadow casting / environment reflection.** Lower impact
  for hero-letter scenes but visible difference on close
  inspection.

`cmo render --at 0s` shows the front face of the warm C;
`--at 1.5s` is 90° y-rotation (edge-on, proves depth + rotation);
`--at 3s` is 180° viewed-from-behind. Hue animation shifts the
material colour across frames; `pulse` (with `easing.out_cubic`)
and `wobble` (a sine `wave`) both register. Output ~5 KB PNG at
320×180, ~90 KB at 1920×1080. ~80 ms per frame at default size
with 2× supersampling, ~2.5 s at HD.

What's *not* shipped yet, in order of likely-future-impact:

- **Bevels on extrude edges.** Single biggest visual jump. Adds
  a bevel-segment ring between front cap and side wall (with
  smooth normals); same at the back. ~200 LOC.
- **Smooth normals on curved side walls.** Each outline-segment
  edge gets a normal averaged with its neighbours. ~30 LOC; gets
  rid of the faceted-curve appearance.
- **Real GGX + Fresnel + cheap IBL ambient.** Replaces the
  Blinn-Phong specular with proper microfacet model; ambient
  becomes a hemispheric gradient (sky-cool above, ground-warm
  below) instead of a flat pedestal. ~150 LOC.
- **Animation playback as a video.** `cmo render --at <t>`
  produces one frame; there's no `cmo bounce --fps 60 --out
  scene.mp4` yet. Frame loop is trivial; muxing PNG → MP4 needs
  ffmpeg as an external process today, WebCodecs in the browser
  later. Audio is a separate workstream.
- **Browser editor / `/play` page.** The WASM artifact exists and
  passes parity, but only exports `render_taste()` against a
  hand-built scene. Full `render_cm(source, t, w, h, out)` is
  blocked on tree-sitter cross-compiling to WASM (`lib.c` uses
  `fdopen`, needs a stub or wasm32-wasi target).
- **Real fonts beyond DM Sans Bold.** The bundled TTF is one
  font hardcoded; no font selection from the `font:` arg.

## What to pick up — next active arc

Three quality-focused commits in order of visual impact, then the
video / browser tracks:

### 1. Bevels — geometric edge softening

For each outline vertex, compute the inset position (moved inward
by `bevel_radius` along the angle bisector). Between the inset
and the original outline, generate `bevel_segments` rings whose z
slopes from `+half` (front cap) to `+half − bevel_radius` (where
the side wall begins). Normals interpolate from +z to the wall
outward direction. Same at the back. Front / back caps now
triangulate the *inset* polygon, not the original.

Default bevel: 6 % of depth, 4 segments. Configurable via
`extrude(..., bevel: <px>, bevel_segments: N)` once we extend the
stdlib spec. Toggle off via `bevel: 0px` for the old sharp look.

### 2. Smooth normals on curved side walls

Per side-wall vertex, store the average of the current outline
edge's normal and its neighbour's normal. Tiny algorithmic
change in `extrudeContours`; no new data structures. Curved
letters' side walls go from faceted to smooth.

### 3. Real GGX + hemispheric ambient

Replace the Blinn-Phong specular term with the GGX/Trowbridge-
Reitz normal distribution + Smith geometric attenuation +
Schlick Fresnel. Replace the flat ambient pedestal with a
two-colour hemispheric gradient (sky-colour from +y, ground-
colour from −y) — cheap IBL approximation that doesn't need an
HDR environment map.

### 4. Video bounce (deferred)

After the quality work lands. `cmo bounce --fps 60 --out
scene.mp4 src/scene.cm`: wraps the existing
sample-and-render loop, writes PNG sequence to a tmp dir, shells
to ffmpeg for muxing. `--frames-dir` for the PNG-only path.
Audio mux via `--audio scene.wav` deferred until `std.audio`
lands.

### 5. Browser editor (further deferred)

Cross-compile tree-sitter to WASM, expose `render_cm(source, t,
w, h, out)`, wire `/play` page in `apps/web`. ~600 LOC + build
gymnastics. The motion-graphics editor surface the user has
named as the primary product target.

## What's deferred

Same list as before, lightly trimmed:

- **AI-assisted editing UX** — explicitly out of scope.
- **WebGPU realtime preview / SDL3 / Dawn** — optional separate
  track. No urgency since the browser editor will use its own
  WebGPU when that lands.
- **Audio runtime (`std.audio`)** — separate workstream; bounce
  can accept an externally-provided audio file as v0.
- **Letters with hole-bridge edge cases** — current bridging is
  rightmost-x ray-cast, no full visibility test. Most glyphs
  work; if a marketing scene with stacked holes (like several
  zeroes) shows artefacts, add proper visibility.
- **MSAA** (per-fragment coverage masks) — same quality as 2×
  supersampling at half the cost. Optional polish.

## Why this isn't done yet — the visual gap

The taste sample on cmotion.org renders as a 3D extruded letter "C"
in a warm metallic-ish material, rotating around Y, wobbling around
X, pulsing in scale, lit by ambient + two directional lights. The
CLI today renders a flat block-letter C in solid colour. *Every*
3D wrapper unwraps to its child; the rotation/scale/wobble
animations sample correctly but the resolved values are dropped on
the floor; lights aren't a concept the renderer knows about.

Visible gaps, in order of impact:

1. **Letter is blocky, not Inter Bold** — block-letter bitmap vs a
   real TTF rasteriser.
2. **Letter is flat, not extruded** — no 3D mesh from the outline.
3. **No 3D rasteriser** — `render3d` is a no-op; there's no
   transform → project → z-buffer → shade pipeline.
4. **No lighting** — ambient + directional lights have nowhere to
   apply. The "C" has no normals to light against.
5. **Animations sample but don't visibly move** — rotate / scale
   transforms are dropped by the flat-fallback unwrap, so even
   though `sampler.sampleAt(t=2s)` produces the right numbers, the
   renderer ignores them.
6. **Two sampler holes** — `easing.out_cubic` is recognised but
   ignored (pulse animates linearly), and `wave(amplitude, period)`
   isn't resolved at all (wobble passes through as an opaque
   `Constructed`).
7. **Material params lost** — `metalness`, `roughness` are dropped
   along with the rest of `.material(...)`.

## What to pick up — in priority order

This is the arc to **make the CLI render look like the cmotion.org
example**. Six focused commits, smallest visible payoff first.
Browser delivery is on pause until this lands — it's pointless to
ship a flat block-letter C to the iPad.

### 1. Sampler completeness — easing + `wave(...)`

Two small additions to `sampler.zig`, no renderer changes:

- **`wave(amplitude, period)` resolver.** Treat the `Constructed`
  as a continuous function: `value = amplitude · sin(2π · t /
  period)`. Honours `amplitude` units (deg, rad, …) by carrying the
  unit through to the output number. ~20 LOC.
- **Easing curves applied to `animate{}`.** Look up
  `opts.easing` as `Constructed("easing.<name>", [])` and feed the
  named curve to the interpolation fraction. Start with
  `out_cubic`, `in_cubic`, `in_out_cubic`, `linear` (the
  default). ~30 LOC.

After this commit: `cmo eval --at 0.5s` of `pulse` returns `1.06`,
not the linear `1.03`. `wobble` at `t=3s` returns
`8.6·sin(π/2) = 8.6deg`, not an opaque `wave(...)` constructor.
The renderer can't show the difference yet — that's later commits
— but every number coming out of the sampler is now the *right*
number.

Tests: extend `sampler.zig`'s existing test suite with a
known-value table for each easing curve at known fractions, and
sample `wave(...)` at quarter-period multiples.

### 2. Real TTF font — `stb_truetype` + Inter Bold

Vendor `stb_truetype.h` (single-header, ~2 KLOC C, MIT, no
transitive deps) under `apps/cli/vendor/`. Vendor Inter Bold (OFL,
~300 KB .ttf) under the same place; pin a specific version in
`scripts/fetch-deps.sh` so it survives a clean clone.

Replace `apps/cli/src/render.zig`'s block-letter path:

- New `apps/cli/src/font.zig` wraps the stb FFI:
  `loadFont(bytes) → Font`, `glyphOutline(font, codepoint, size_px) →
  []Contour`, where each `Contour` is a list of cubic Bézier
  segments (or pre-flattened line segments for v0 — simpler).
- `paintTextGlyph` uses the outline at the requested size, rasterises
  with a coverage-based scanline fill (or stb's
  `stbtt_GetGlyphBitmap` for v0 — black box but works), composites
  with the inherited material colour.

After this commit: the C is a real, kerned Inter Bold C, still flat
2D. Visually the biggest single jump.

### 3. Mesh from outline — `extrude(outline, depth)`

No renderer changes. Pure data:

- New `apps/cli/src/mesh.zig`. `Mesh` struct: positions `[]Vec3`,
  normals `[]Vec3`, indices `[]u32`, plus a flat `material:
  MaterialId` if we want to thread fill through. The geometry
  pipeline produces these from a 2D outline + a depth scalar.
- `extrude(outline, depth: px)` returns a mesh with two faces (front
  + back) tessellated from the outline (ear-clipping triangulation
  for v0; mostly-convex letter glyphs handle it well) plus side
  walls (quad strip per outline segment, two triangles each).
- Method-chain wrappers (`.material(...)`, `.rotate(...)`,
  `.scale(...)`) start producing structured data instead of opaque
  `Constructed`. The flat-fallback unwrap in render.zig stays as
  the fallback path for things that don't yet have a mesh.

After this commit: still nothing visible, but `extrude(...)`
returns a mesh you can inspect via `cmo eval --json`. Builds
confidence in the data shape before the rasteriser consumes it.

### 4. 3D rasteriser with lights — the big one

The cornerstone commit. Roughly:

- **Transform stage.** Model → world (apply `rotate`, `scale`,
  `translate` as 4×4 matrices; sampler-resolved animation scalars
  feed the matrices). World → view (camera at origin, looking down
  -Z; perspective projection with a fixed FOV for v0). View → clip
  → screen.
- **Rasterise.** Scanline-fill triangles with perspective-correct
  barycentric interpolation of normals. Z-buffer is a `[w*h]f32`
  arena slice. No SIMD yet; just clean Zig.
- **Shade.** Per-fragment Lambertian against ambient + directional
  lights. `lights:` is an array of constructed values; the renderer
  reads `ambient(intensity)` and `directional(from: vec3, intensity)`
  forms. `material.fill` is the albedo; metalness / roughness are
  read but ignored (cosmetic for the next commit).
- **Compose** into the existing 2D framebuffer. The 3D layer rasterises
  over whatever the 2D background put down. Compose stays the v0
  back-to-front rule.

After this commit: **the taste sample renders as a 3D, lit,
rotating, pulsing, wobbling letter C against the dark background.
The level of the example.**

Test: render at `t=0`, `t=1.5s`, `t=3s` and assert the bounding box
of the lit pixels moves the way the rotation says it should.
Numerical, not perceptual.

### 5. Material refinement — metalness + roughness + multi-light

Once (4) lands, the C looks 3D but flat-shaded (only diffuse). Add:

- **Specular term** — simplified GGX-ish (or Blinn-Phong if we want
  fewer lines). Roughness controls the highlight tightness;
  metalness controls how much of the diffuse goes away and how much
  of the specular tints with the albedo.
- **Multi-light specular summation** — the taste sample's two
  directionals from very different angles should produce two
  highlights on a roughness-0.35 metal-ish surface. That's the
  *visual character* of the example.

After this commit: the C reads as the warm metallic letter from
cmotion.org, with the right two highlights.

### 6. (Optional) MSAA / supersampling

3D rasteriser edges are jaggy at 320×180. Either:

- 4× supersampling: render at 640×360, box-filter to 320×180. ~30
  LOC, slow (4× cost), great quality.
- MSAA: per-fragment coverage masks, sample shading once but rasterise
  edges at 4× resolution. ~150 LOC, fast, near-equivalent quality.

Defer until (1)-(5) ship. The PNG output is already at 2.6 KB so
the cost of "slightly fatter PNGs from supersampling smoke" is
negligible.

## What's deferred

- **Browser editor / `/play` page.** No point until the renderer
  looks right. `cmotion-render.wasm` continues building green via
  the existing parity test; we don't expand its surface.
- **Full `render_cm(source, t, w, h, out)` in WASM.** Needs
  tree-sitter cross-compiled to WASM + POSIX shims. Tackle when
  the visual fidelity work lands and the browser editor becomes
  the focus.
- **AI-assisted editing UX.** Out of scope until the renderer can
  show what the user is asking the AI to change.
- **WebGPU realtime preview / SDL3 / Dawn.** Optional separate
  track for an eventual native editor; not blocking anything.
- **Audio pipeline (`std.audio`).** Separate workstream when assets
  matter.
- **Image / video / 3D-model asset callbacks.** Shape designed in
  earlier planning; wait until the renderer can show them.
- **Golden-image regression tests** (old Plan.md priority 4). Will
  matter once the 3D pipeline lands; today there's not enough
  visual stability yet for a fixture-based suite.

## Don't

- **Don't redesign the value tree to be renderer-aware.** The
  interpreter produces descriptions; the renderer interprets them.
  When the 3D pipeline wants a new shape (`Mesh`, `Light`, …), add
  a `Value.<x>` variant *and* graduate the corresponding
  `Constructed("x", ...)` callers — don't pre-bake renderer
  concerns into eval.
- **Don't expand the WASM build's surface during the 3D work.**
  The parity test catches non-deterministic regressions on the
  `render_taste` path; that's enough. Don't try to land
  `render_cm` (parser-in-WASM) and the 3D pipeline at the same
  time.
- **Don't make the sampler renderer-shaped.** It produces a Value
  tree of the same shape as eval's output. The renderer is the
  only consumer that knows about pixels — and now, normals,
  transforms, lights.
- **Don't expand `check.zig` into a full typechecker as a side
  quest.** Stage 2 grows out of what the renderer found ambiguous —
  pull, don't push.
- **Don't add backends (CanvasKit / WGSL / native GPU) before the
  software renderer matches the example.** The CPU/WASM render is
  the canonical production path (Cloudflare containers, iPad
  Safari, edge functions — none of them have GPUs); the eventual
  GPU pipeline is realtime-preview-only.
- **Don't reach for SIMD / threading optimizations in the 3D
  pipeline before it works correctly.** Clean readable Zig first;
  a 320×180 frame at ReleaseFast should be well under 100 ms even
  naive. Optimize when something profiles slow.
- **Don't try to pull the Three.js `ScenePreview` into the loop.**
  It's marketing on cmotion.org; the real preview is what
  `cmo render` produces.
