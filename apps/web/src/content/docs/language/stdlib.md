---
title: Stdlib
description: The minimal standard library — shapes, 3D, text, lighting, composition, animation, color, transport, audio.
---

The stdlib is intentionally small. Hosts extend it; the core stays narrow.

The modules below marked **(rendered)** have a working translator in
both render paths — the native renderer (`cmo render`) and the web
viewer that the `/editor`, `/playground`, and the hosted API drive.
The rest are still planned.

### 2D

- `std.shapes` **(rendered)** — `rect`, `circle`, `sphere`, `path`, plus
  `image`. `path(points: [vec2(x, y), …])` is the generic closed-outline
  primitive; feed it to `extrude(...)` to make a solid. `ellipse` is
  still planned.
- `std.text` **(rendered)** — `text.glyph(string, font, size?)` returns a
  2D glyph outline (the non-`path` way to get an extrudable shape).
- `std.compose` **(rendered)** — `compose [...]` layer stacking. Blend
  modes and masks are planned.
- `std.filter` — `blur(radius)`, `color_grade`, masks. Planned.

### 3D

- `std.mesh3d` **(rendered)** — `extrude(shape, depth, bevel?)` where
  `shape` is a `path(...)` or `text.glyph(...)`, plus the transform
  postfix methods `.rotate(x/y/z: Angle)`, `.translate(...)`,
  `.scale(...)`, and `.material(fill, metalness?, roughness?, emissive?, emissive_intensity?)`.
- `std.lighting` **(rendered)** — `ambient(intensity)`,
  `directional(from: Vec3, intensity)`, `point(at: Vec3, intensity)`,
  `spotlight(...)`. An optional `color:`/`tint:` tints any light.
- `std.scene3d` **(rendered)** — `render3d(mesh, lights, camera?)`
  projects a 3D scene to a 2D `Layer` so it can be `compose`d with 2D
  layers. Camera defaults to a sensible perspective; pass
  `camera(fov: 28deg, distance: …)` to override.

### Math

- `std.math` — vector constructors `vec2(x, y)` and `vec3(x, y, z)`, plus the dot/cross/length/normalize/lerp helpers that operate on them. Vectors are values, not tuples; the grammar deliberately keeps tuples as a type-only construct, so 2- and 3-component positions and directions go through these constructors.

### Motion, color, time, audio

- `std.anim` — `animate { ... }` keyframes; modifiers `with { easing, repeat, … }` where `repeat: <Int> | forever`; helpers `wave(amplitude, period)`, `noise(seed, period)`, easings, splines
- `std.color` — perceptual mixing, gamut mapping, helpers around the `oklch` / `oklab` / `srgb` literals built into the grammar
- `std.transport` — playhead, time, frame, tempo
- `std.audio` — FFT, envelope follow, beat/onset detection, sample reading

## Determinism

Every function is tagged `pure` or `effectful`. Pure functions are safe to call from any context. Effectful functions (asset loading, audio analysis on a file, clock reads) require an explicit capability passed in. The [type system](/language/types/) enforces the split.

A scene's render output is deterministic if every function it calls is pure — which is the whole point of the [CanvasKit backend](/impl/backends/).

Status: in progress. The **(rendered)** modules above run today in both
the native renderer and the web viewer; the `pure`/`effectful` tagging
and the remaining modules (`std.filter`, `std.transport`, `std.audio`)
are still ahead. See [Roadmap](/roadmap/) stage 3.
