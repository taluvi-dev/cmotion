---
title: Stdlib
description: The minimal standard library — shapes, 3D, text, lighting, composition, animation, color, transport, audio.
---

The stdlib is intentionally small. Hosts extend it; the core stays narrow.

## Planned modules

### 2D

- `std.shapes` — `rect`, `circle`, `ellipse`, `path`, `image`
- `std.text` — `text.glyph(string, font, size?)` returning a 2D path
- `std.compose` — layer stacking, blend modes, masks
- `std.filter` — `blur(radius)`, `color_grade`, masks

### 3D

- `std.mesh3d` — `extrude(path, depth)` plus the transform postfix methods `.rotate(x/y/z: Angle)`, `.translate(...)`, `.scale(...)`, and `.material(fill, metalness?, roughness?, emissive?)`
- `std.lighting` — `ambient(intensity)`, `directional(from, intensity)`, `point(at, intensity)`
- `std.scene3d` — `render3d(mesh, lights, camera?)` projects a 3D scene to a 2D `Layer` so it can be `compose`d with 2D layers. Camera defaults to a sensible perspective; pass `camera: perspective(fov: 28deg)` or `orthographic(...)` to override.

### Motion, color, time, audio

- `std.anim` — `animate { ... }` keyframes; modifiers `with { easing, repeat, … }` where `repeat: <Int> | forever`; helpers `wave(amplitude, period)`, `noise(seed, period)`, easings, splines
- `std.color` — perceptual mixing, gamut mapping, helpers around the `oklch` / `oklab` / `srgb` literals built into the grammar
- `std.transport` — playhead, time, frame, tempo
- `std.audio` — FFT, envelope follow, beat/onset detection, sample reading

## Determinism

Every function is tagged `pure` or `effectful`. Pure functions are safe to call from any context. Effectful functions (asset loading, audio analysis on a file, clock reads) require an explicit capability passed in. The [type system](/language/types/) enforces the split.

A scene's render output is deterministic if every function it calls is pure — which is the whole point of the [CanvasKit backend](/impl/backends/).

Status: not started. See [Roadmap](/roadmap/) stage 3.
