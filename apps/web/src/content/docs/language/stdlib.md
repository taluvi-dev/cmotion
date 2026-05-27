---
title: Stdlib
description: The minimal standard library — shapes, 3D, text, lighting, composition, animation, color, transport, audio.
---

The stdlib is intentionally small. Hosts extend it; the core stays narrow.

## Planned modules

### 2D

- `std.shapes` — `rect`, `circle`, `ellipse`, `path`, `image`, `sprite`, `svg`, `icon`. `svg(source, size?, color?, weight?)` rasterises an SVG string to a quad (`color:` recolours `currentColor`, `weight:` sets stroke-width); `icon(name, size?, color?, weight?)` is the same for a bundled [Lucide](https://lucide.dev) icon by name (ISC-licensed catalog). `image(src)` is the source value (`src` is a `data:` base64 URI — inline and deterministic — or a URL); `sprite(image(src), width?, height?, cols?, rows?, frame?)` is the displayable textured quad, with `cols`/`rows`/`frame` selecting a cell from a grid-atlas sprite sheet (`frame` 0 = top-left, row-major, and may be animated)
- `std.fx` — `particles(kind, count?, area?, speed?, size?, color?, seed?, period?)`, a generative point-sprite field with eight presets (`stars`, `dust`, `snow`, `embers`, `magic_sparks`, `fireflies`, `smoke`, `pollen`); `kind: cycle` rotates through them over `period`
- `std.text` — `text.glyph(string, font, size?)` returning a 2D path
- `std.compose` — layer stacking, blend modes, masks
- `std.filter` — `blur(radius)`, `color_grade`, masks

### 3D

- `std.mesh3d` — `extrude(path, depth)` plus the transform postfix methods `.rotate(x/y/z: Angle)`, `.translate(...)`, `.scale(...)`, and `.material(fill, metalness?, roughness?, emissive?)`
- `std.lighting` — `ambient(intensity)`, `directional(from: Vec3, intensity)`, `point(at: Vec3, intensity)`
- `std.scene3d` — `render3d(mesh, lights, camera?)` projects a 3D scene to a 2D `Layer` so it can be `compose`d with 2D layers. Camera defaults to a sensible perspective; pass `camera: perspective(fov: 28deg)` or `orthographic(...)` to override.

### Math

- `std.math` — vector constructors `vec2(x, y)` and `vec3(x, y, z)`, plus the dot/cross/length/normalize/lerp helpers that operate on them. Vectors are values, not tuples; the grammar deliberately keeps tuples as a type-only construct, so 2- and 3-component positions and directions go through these constructors.

### Motion, color, time, audio

- `std.anim` — `animate { ... }` keyframes; modifiers `with { easing, repeat, … }` where `repeat: <Int> | forever`; helpers `wave(amplitude, period, phase?)` (a quarter-turn `phase:` apart gives the cos/sin pair for circular/orbital motion), `noise(seed, period)`, easings, splines
- `std.color` — perceptual mixing, gamut mapping, helpers around the `oklch` / `oklab` / `srgb` literals built into the grammar
- `std.transport` — playhead, time, frame, tempo
- `std.audio` — FFT, envelope follow, beat/onset detection, sample reading

## Determinism

Every function is tagged `pure` or `effectful`. Pure functions are safe to call from any context. Effectful functions (asset loading, audio analysis on a file, clock reads) require an explicit capability passed in. The [type system](/language/types/) enforces the split.

A scene's render output is deterministic if every function it calls is pure — which is the whole point of the [CanvasKit backend](/impl/backends/).

Status: not started. See [Roadmap](/roadmap/) stage 3.
