---
title: Roadmap
description: What cmotion does, and the stages still ahead.
---

cmotion is built in stages, from the parser up to realtime GPU rendering. Each stage is usable on its own before the next one starts.

## What works

- **Render a scene to a PNG frame or an MP4 video** — on the CLI (`cmo render`) or the hosted [API](/api/). The render container runs the wasm interpreter through a headless-Chromium viewer and muxes the frames with ffmpeg.
- **Realtime preview in the browser** — the [editor](/playground/) and the homepage preview run the same interpreter live.
- **One core everywhere** — `cmotion-render.wasm` is the reference interpreter compiled to wasm; the CLI, the editor, and the API all run that same core, so output matches.

## Stages

1. **Tree-sitter grammar** — parser, syntax highlighting, AST. **Done** — spec locked at v0.2.
2. **Type system spec** — units, asset types, function types, the determinism partition of stdlib. **In progress** — narrow checks run in `cmo check` (units, name resolution, literal-vs-annotation); the full system is the gap.
3. **Minimal stdlib** — shapes (`rect`, `circle`, `sphere`, `path`), `text.glyph`, `mesh3d` (`extrude` + transforms + `material`), `lighting`, `scene3d` (`render3d`), `compose`, `animate`, `oklch`/`vec2`/`vec3`. **In progress** — all of these render; `transport`, audio analyzers, and `filter` are ahead.
4. **Reference interpreter** — walks the AST directly, no codegen. **Done** — `eval` → sampler → renderer, built natively and to `cmotion-render.wasm`; the conformance oracle for every backend.
5. **WASM component codegen** — compile each *program* to its own Component-Model component. **Planned** — distinct from the interpreter-as-wasm module that already ships.
6. **CanvasKit backend** — a bit-identical offline renderer (Skia/WASM). **Planned** — offline PNG/MP4 already ships through the interim headless-Chromium runner; CanvasKit is the canonical, machine-independent replacement.
7. **WGSL backend** — native GPU preview through `wgpu`. **Planned** — realtime preview already ships through the interim Three.js/WebGL viewer; WGSL is the canonical replacement.

## Why this order

Lock the language semantics first (1–3), make them executable (4), then portable (5), then render on the canonical backends (6–7). The reference interpreter exists so those backends are conformance work, not creative work — and because it renders, the language is usable ahead of 5–7.

## Status

| # | Stage | Status |
|---|---|---|
| 1 | Tree-sitter grammar | ✅ Done — spec v0.2 |
| 2 | Type system spec | 🚧 In progress — narrow checks |
| 3 | Minimal stdlib | 🚧 In progress — shapes/text/mesh3d/lighting/scene3d/compose/animate/color render |
| 4 | Reference interpreter | ✅ Done — native + WASM, renders 3D |
| 5 | WASM component codegen | ◻ Planned — the interpreter already ships as a wasm module |
| 6 | CanvasKit backend | ◻ Planned — offline PNG/MP4 ships via the interim runner |
| 7 | WGSL backend | ◻ Planned — realtime preview ships via the interim viewer |

Three version axes, kept separate: the **grammar spec** is locked at **v0.2**, the **render runner** is at **0.0.3** (sources pin it with `runner "0.0.3";`, and the published examples target it), and the `tree-sitter-cmotion` package is at `0.0.1`. Try the language in the [playground](/playground/) or against the hosted [API](/api/).
