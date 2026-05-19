# Plan.md — handoff for the next agent

Working hand-off. Read `CLAUDE.md` first for durable project orientation;
this file is *what just shipped* and *what to pick up*. The canonical
syntactic spec lives at https://cmotion.org/language/grammar/#ebnf
(mirrored as `GRAMMAR.md`) — read it before extending the language.

## What just shipped on this branch (`claude/build-interpreter-ZqsfA`)

Nine commits, all green (65/65 tests). The pipeline is closed end-to-end:

```
.cm source → parse → lower → eval → sample(t) → render → png
```

~13 ms cold for the taste sample at 320×180. Commit list:

1. **Explain-coverage test + `lower.zig` audit.** `commands/explain.zig`
   now embeds every CLI source file and asserts every `.code = "..."`
   emit site resolves through `lookup`. The `endsWith`/`startsWith`
   audit of `lower.zig` found only token-level checks already protected
   by tree-sitter leaf-node boundaries; no code change.
2. **Interpreter v0** — `value.zig`, `eval.zig`, `commands/eval.zig`.
   Literals, idents, paren, unary, binary (same-unit propagation),
   blocks-with-let. Diagnostic codes `EVL001/002/003` registered. Row
   added to the namespace table.
3. **Aggregates + control flow** — array, record, index, field-access,
   if/else, match (literal / ident / wildcard patterns). No new codes.
4. **Calls + method chains + `animate`/`compose` + scene invocation.**
   The big slice. `Value.constructed` staging variant for stdlib calls
   we haven't typed yet. Color components widened to `*const Value` to
   carry animated channels. Unresolved name paths become zero-arg
   `Constructed` values (so wildcard-imported names don't EVL003).
   Top-level scenes / components / filters whose params all have
   defaults are invoked automatically. The cmotion.org taste sample
   evaluates to a complete `compose(...)` value tree with no
   diagnostics — Plan.md's stage-4 milestone is hit.
5. **`CLAUDE.md` points at the EBNF.** A previous session missed it.
6. **Lambdas + closures** — every EBNF expression form is now covered
   by eval. Snapshot-style closure capture (each binding copied into
   the arena at lambda creation). Argument binding mixes positional
   and named per the EBNF's `arg = [ ident , ":" ] , expr`. New
   `EVL004` for missing-required-argument. The dead `unsupported` /
   EVL001 emit site from v0 is gone now that every form is covered.
7. **Stream sampler** — `cmo eval --at <t>`. New `src/sampler.zig`
   walks the value tree and resolves every `Constructed("animate", …)`
   to its value at `t` (linear interpolation; `repeat: forever` wraps
   modulo the keyframe span). Reframes the value tree per the cmajor
   parallel: the interpreter produces a video-stream description, the
   sampler turns it into a still-frame description. `CLI011` for
   malformed `--at` duration spec.
8. **Software renderer + `cmo render`.** New `src/render.zig`. Honours
   `compose [layers]`, `rect(width, height, fill)`, and hex / oklch
   colours (oklch → sRGB via Ottosson's reference matrices). RGBA8
   framebuffer, source-over compositing. PPM (P6) output. Everything
   else (3D content, lights, materials, …) is silently dropped — the
   taste preview is currently just the dark background. `REN001/002`,
   `CLI012`. New namespace row.
9. **PNG output.** Hand-rolled encoder in `render.zig` (~130 lines,
   no new deps). RGBA8, stored deflate, standard CRC32/Adler-32 from
   `std.hash`. `cmo render --out frame.png` picks the encoder by the
   output extension. iPad-friendly.

State: `zig build` + `zig build test` (65/65) both work in-session via
the existing session-start hook. The taste sample renders to a valid
PNG in ~13 ms; the visible output is just the background colour today
because the 3D glyph constructors are still no-ops in the renderer.

Decision log (where the renderer / interpreter diverges from "obvious"):

- **`Value.constructed` is the staging variant for un-typed stdlib
  calls.** A previous Plan.md decision was "typed records all the
  way"; Constructed is still typed (tagged by name) but acts as a
  renderer-facing staging area. Specific constructors graduate to
  dedicated variants when the renderer has shape expectations for
  them. Nothing has graduated yet.
- **Color components are `*const Value`, not `Number`.** Cmotion colors
  can have animated channels (`oklch(0.78, 0.20, hue)`); the sampler
  resolves them.
- **Unresolved name paths become zero-arg Constructed values.** Without
  module manifests we can't tell `forever` (a stdlib name) from a typo;
  `cmo check` (NAM003) is the typo path; `cmo eval` keeps running.
- **Snapshot closures, not late-binding.** Each capture is a value at
  creation time. Mutual recursion via two `let`s in the same block
  doesn't see each other yet; defer until something forces it.

## What to pick up — in priority order

### 1. Make the preview *look* like the taste sample

Today the rendered PNG shows the dark `oklch(0.10, 0.04, 280)`
background and nothing else — every other constructor in the taste
sample (`extrude`, `text.glyph`, `wave`, `render3d`, lights, …) is a
no-op in `render.zig`. Each one is a small `paintX` function. Suggested
order, smallest visible payoff first:

- **`translate(x: ..., y: ...)` + a position arg on `rect`.** Today every
  rect paints from the canvas top-left, which is a *position* bug
  staring at the viewer. Pick a convention (centered-by-default? `at:
  vec2(x, y)`?), implement, write tests with two rects at different
  positions.
- **A 3D fallback.** `extrude(text.glyph("C", ...), depth: 80px)`
  could render as a flat outline of the glyph at the canvas center —
  not 3D, but the right *shape* in the right place. Drop the depth,
  drop the material, drop the rotation. The taste preview suddenly
  reads as "letter C on a dark background." That's the goal.
- **Basic text** — pick a font (Inter Bold is in the taste; we can ship
  a single vendored TTF or compile-time-embed a minimal one). Glyph
  rasterization from a TTF is the awkward part; alternatively, render
  text as block letters (low-fi but works).
- **Color extras** — `oklab(...)` and `srgb(...)` literals are wired
  through eval but render as magenta. ~20 lines each.

Each of these is 1 commit, ships visible output. Good morale loop.

### 2. Real deflate for PNG (~150 lines, no new deps)

Current PNGs use stored deflate, so a 320×180 RGBA is ~230 KB.
`std.compress.flate` (or a hand-rolled LZ77 + static Huffman) brings
that to ~5 KB for the kind of mostly-flat-color output the v0 renderer
produces. The boundary stays at `writePng`; nothing else changes.
Needed before golden-image regression tests scale — see (4).

### 3. Phase 2 — WASM-component renderer behind wasmtime

Today's `render.zig` is linked directly into `cmo`. The goal (per the
WIT in chat) is a renderer WASM component that the CLI loads via
wasmtime, and the *same* component runs in a browser. The work splits:

- **Vendor `wasmtime-c-api`.** Prebuilt artefact in `apps/cli/vendor/`
  or built from source via cargo in the session-start hook. ~80 MB
  precompiled.
- **WIT scaffolding.** `interface video-renderer { record frame { ... }
  ; render: func(time-samples: u64, scene: u32) -> frame }`. Decide:
  scene is a u32 index *or* the scene description is passed as bytes.
  Bytes-as-payload is the simpler v0 because it doesn't require
  cmotion → WASM codegen (stage 5).
- **Guest module.** Compile `render.zig` (or a Zig fork of it) to
  `wasm32-wasi`. Imports nothing, exports `render`. Serialise the
  sampled value tree → bytes on the host side (JSON is the obvious
  v0; CBOR/msgpack later).
- **Host switch.** Replace the direct `render.renderTree` call in
  `commands/render.zig` with a wasmtime instance call. The CLI surface
  doesn't change.

Renderer logic doesn't change between phases. Once this lands, the web
side can `import { engine } from './engine.wasm'` and get the same
pixels we produce on the CLI.

### 4. Golden-image regression tests

Once (2) lands and PNG fixtures are ~5 KB each, add `tests/golden/`
with reference PNGs for a few small `.cm` test programs at known `t`
values. A new test (in `render.zig` or a sibling) re-renders each and
byte-compares to the fixture. Catches renderer regressions cheaply.

Until then, the per-pixel `expectEqual` style in `render.zig`'s
existing tests is the bar.

### 5. Animation depth

The sampler is linear-only today and ignores `easing.*` / `direction:` /
multi-track / springs. Each is a focused addition to `sampler.zig`:

- **Easing.** Look up `opts.easing` as a `Constructed("easing.<name>", [])`
  and apply the curve to the interpolation fraction. Cubic-in/out and a
  small library of named curves covers most cases.
- **Colour blending in oklch space** (currently floor-sampling for
  non-number keyframe values). Needs a "lerp two colors in their stated
  space" helper in `value.zig`.
- **`delay: <duration>`** — shift the local `t` before interpolation.
- **Springs** — physics-based, time-domain integration. Heavier; punt
  until something asks for it.

## Decisions left to the user

- **Which next? (1) (2) (3) (4) (5)?** Recommendation: **(1)** for two
  commits to make the preview readable, then **(2)** before golden
  tests pile up at 230 KB each, then **(3)** to close the cross-surface
  loop.
- **Renderer guest language for phase 2** — Zig (no new toolchain,
  reuses `render.zig` mostly verbatim) or Rust (best Component Model
  support today; AssemblyScript was a third option but its WIT support
  lags). Recommendation: Zig.
- **Position convention for shapes** — centered-by-default with a
  top-left override, or top-left-by-default with an `at:` arg? The EBNF
  doesn't say. Whichever is picked should land with the `translate`
  commit.
- **What to do with the now-orphan `EVL001` and `EVL003` explain
  entries?** Both are registered but unemitted in the interpreter.
  `commands/eval.zig`'s catch-all still emits EVL001 on a Zig-error
  bubble; EVL003 is documented as reserved for when modules land and
  we can tell typos from imports. Leave them.

## Don't

- **Don't redesign the value tree to be renderer-aware.** The
  interpreter produces descriptions; the renderer interprets them. If
  the renderer wants a new shape, add a `Value.<x>` variant *and*
  graduate the corresponding `Constructed("x", ...)` callers — don't
  pre-bake renderer concerns into eval.
- **Don't add backends (CanvasKit / WGSL) before phase 2 lands.** They
  consume the same WIT contract; building them parallel to the
  software renderer creates drift.
- **Don't expand `check.zig` into a full typechecker as a side quest.**
  Stage 2 grows out of what the interpreter and renderer found
  ambiguous — pull, don't push.
- **Don't make the sampler renderer-shaped.** It produces a `Value`
  tree of the same shape as eval's output. The renderer is the only
  consumer that knows about pixels.
- **Don't try to pull the Three.js `ScenePreview` into the loop.** It's
  marketing on cmotion.org; the real preview is what `cmo render` (and,
  once phase 2 lands, the WASM component) produces.
