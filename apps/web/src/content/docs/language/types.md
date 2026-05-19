---
title: Type system
description: Units, asset types, function types, and the determinism partition of the stdlib.
---

The type system specification is **not yet written**. It will live as a separate document from the [grammar](/language/grammar/) — the grammar describes how programs *parse*, the type system describes what they *mean*.

## Scope

The spec will cover:

- **Unit types** — `Time`, `Length`, `Frequency`, `Angle`, `Tempo`, and how the lexer's units (`ms`, `px`, `hz`, `deg`, `bpm`, `bars`, `beats`, …) inhabit them.
- **Asset types** — `Image`, `Audio`, `Font`, opaque to the program but loadable through the stdlib.
- **2D types** — `Path`, `Layer`, `Frame`, and the rules for `compose [...]`.
- **3D types** — `Mesh3d`, `Material`, `Light`, `Camera`, and the bridge from 3D back to a 2D `Layer` via `render3d(...)`.
- **Color** — a single `Color` type inhabited by every `color_lit` form (`#hex`, `oklch(...)`, `oklab(...)`, `srgb(...)`). Color space is part of the value, not the type, so mixing colors across spaces is allowed and well-defined.
- **Animation types** — `Animation<T>` parameterised by what's being animated (`Animation<Scale>`, `Animation<Color>`, `Animation<Angle>`). `animate { ... } with { ... }` produces one of these.
- **Function types** — including how `animate { ... } with { ... }` and postfix method chains are typed.
- **Determinism partition** — every stdlib function is tagged `pure` or `effectful`. Effectful functions take an explicit capability (file/network/clock) and cannot be called from a `pure` context. This is what makes the [CanvasKit backend](/impl/backends/) deterministic.

Status: not started. See [Roadmap](/roadmap/) stage 2.
