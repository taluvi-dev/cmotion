---
title: Roadmap
description: How cmotion is being built, in stages.
---

The language and toolchain are being built in stages, from the parser up to realtime GPU rendering. Each stage should be usable on its own before the next one starts.

**cmotion runs today.** The reference interpreter parses, type-checks, evaluates, and renders 3D scenes — on the CLI (`cmo render`), in the in-browser [editor](/playground/) and homepage preview, and through the hosted render [API](/api/) (`api.cmotion.org`). What's ahead is the full type system and the two *canonical* render backends; rendering itself already works through interim backends (a native rasteriser and a Three.js/WebGL viewer).

## Stages

1. **Tree-sitter grammar** — parser, syntax highlighting, AST. *Done — v0.2 locked.*
2. **Type system spec** — units, asset types, function types, and the determinism partition of stdlib. *In progress — narrow checks live (units, name resolution, literal-vs-annotation); the full system is the gap.*
3. **Minimal stdlib** — shapes (`rect`, `circle`, `sphere`, `path`), `text.glyph`, `mesh3d` (`extrude` + transforms + `material`), `lighting`, `scene3d` (`render3d`), `compose`, `animate`, `oklch`/`vec2`/`vec3`. *In progress — all of these render today; `transport`, audio analyzers, and `filter` are still ahead.*
4. **Reference interpreter** — walks the AST directly, no codegen. *Done — `eval` → sampler → renderer, built natively and to `cmotion-render.wasm`; it's the conformance oracle for every later backend.*
5. **WASM component codegen** — per-scene codegen, distinct from today's interpreter-compiled-to-WASM. *Not started.*
6. **CanvasKit backend** — the canonical deterministic offline render. *Not started — offline render works today via the headless-Chromium runner + viewer; CanvasKit is the planned replacement.*
7. **WGSL backend** — the canonical realtime GPU preview. *Not started — realtime preview works today via the Three.js/WebGL viewer; WGSL is the planned replacement.*

## Why this order

Lock the language semantics first (1–3), make them executable (4), then make them portable (5), then make them render on the canonical backends (6–7). The reference interpreter exists so that those backends are conformance work, not creative work — and it already renders, which is why the language is usable ahead of 5–7.

## Status

| # | Stage | Status |
|---|---|---|
| 1 | Tree-sitter grammar | ✅ Done (v0.2 locked) |
| 2 | Type system spec | 🚧 In progress (narrow checks live) |
| 3 | Minimal stdlib | 🚧 In progress (shapes/text/mesh3d/lighting/scene3d/compose/animate/color render) |
| 4 | Reference interpreter | ✅ Done (native + WASM; renders 3D) |
| 5 | WASM component codegen | ◻ Not started |
| 6 | CanvasKit backend | ◻ Not started (offline render works via the interim runner) |
| 7 | WGSL backend | ◻ Not started (realtime preview works via the interim viewer) |

The [Grammar v0.2](/language/grammar/) is locked. Try the language now in the [playground](/playground/) or against the hosted [API](/api/).
