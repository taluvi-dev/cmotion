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

Six commits, all green (76/76 native tests + WASM-vs-native pixel
parity). The renderer reads as the taste sample *structurally* but
not yet *visually* — see "Why this isn't done yet" below.

```
.cm source → parse → lower → eval → sample(t) → render → png / wasm
                                                              │
                                                              ├── native CLI (link in cmotion binary)
                                                              └── cmotion-render.wasm (18.7 KB, freestanding)
```

Commits, in order:

1. **Place shapes by canvas centre with `at:` and `translate(...)`.**
   Centered-by-default convention; `rect(at: vec2(...))` shifts the
   centre; `translate(shape, x:, y:)` (also the `.translate(...)`
   method-chain form) wraps a child. (0,0) = canvas centre, +x right,
   +y down. `fillRect` moved to f64 coords + internal clamping so
   negative / off-canvas positions work.
2. **Drop the 3D wrappers through to a flat fallback.** `render3d`,
   `extrude`, `material`, `rotate`, `scale` are no-op wrappers in v0
   that paint their first positional child flat. `Style` accumulator
   propagates `material.fill:` to fill-less inner shapes; an inner
   `fill:` still wins. **None of the 3D semantics are honoured today
   — this is the gap we're filling next.**
3. **Paint `text.glyph` as block-letter bitmap text.** 5×7 bitmap
   font (A-Z, 0-9, basics) scaled to `size:` (default 96px). Picks up
   the inherited material colour. Placeholder until real TTF lands.
4. **Wire `oklab(...)` and `srgb(...)` colour literals.** Both routed
   through the same Ottosson matrices oklch already uses; srgb reads
   channels in 0..1.
5. **Real deflate for PNG — Up filter + fixed-Huffman + LZ77.**
   Taste-sample PNG dropped from 230 KB to 2.6 KB. Hand-rolled
   because Zig 0.15.1's `std.compress.flate.Compress` is broken
   (`bit_writer` field referenced but missing, `Container.writeFooter`
   missing). Round-trip test through stdlib `Decompress` validates
   the bit stream.
6. **Build the renderer as WASM, prove byte-parity with native.**
   Second compilation target via `zig build wasm` →
   `cmotion-render.wasm` (~18.7 KB at ReleaseSmall, wasm32-freestanding,
   no libc). `zig build test-parity` renders the same fixture both
   ways under Node and asserts byte-equality across all 320×180×3
   pixel channels. Session-start hook pre-builds the WASM artifact.

The WASM build only exports `render_taste(w, h, out)` against a
hand-built scene today — the full `render_cm(source, t, w, h, out)`
that takes `.cm` source is blocked on cross-compiling tree-sitter +
the parser to WASM, and on a couple of POSIX shims. **That work is
deferred** — see "Don't" below.

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
