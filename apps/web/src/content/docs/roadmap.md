---
title: Roadmap
description: How cmotion is being built, in stages.
---

The language and toolchain are being built in stages, from the parser up to realtime GPU rendering. Each stage should be usable on its own before the next one starts.

## Stages

1. **Tree-sitter grammar** — parser, syntax highlighting, AST. *In progress.*
2. **Type system spec** — units, asset types, function types, and the determinism partition of stdlib. Lives as a separate document, not in BNF.
3. **Minimal stdlib** — `rect`, `image`, `mesh3d`, `compose`, `animate`, `oklch`, `transport`, audio analyzers.
4. **Reference interpreter** — walks the AST directly, no codegen. Exercises the type system and stdlib without committing to WASM yet.
5. **WASM component codegen** — once the language and stdlib are stable, this is mostly mechanical.
6. **CanvasKit backend** — deterministic offline render.
7. **WGSL backend** — realtime preview on the GPU.

## Why this order

Lock the language semantics first (1–3), make them executable (4), then make them portable (5), then make them render (6–7). The reference interpreter exists so that backends are conformance work, not creative work.

## Status

| # | Stage | Status |
|---|---|---|
| 1 | Tree-sitter grammar | In progress |
| 2 | Type system spec | Not started |
| 3 | Minimal stdlib | Not started |
| 4 | Reference interpreter | Not started |
| 5 | WASM component codegen | Not started |
| 6 | CanvasKit backend | Not started |
| 7 | WGSL backend | Not started |

The [Grammar v0.2](/language/grammar/) is locked.
