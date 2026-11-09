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

Status: in progress. The **(rendered)** modules above run in both
the native renderer and the web viewer; the `pure`/`effectful` tagging
and the remaining modules (`std.filter`, `std.transport`, `std.audio`)
are still ahead. See [Roadmap](/roadmap/) stage 3.

## Runner 0.0.5 additions

These land in runner `0.0.5` (the hosted API + editor viewer); opt in with
`runner "0.0.5";`.

- **`svg(source, depth?, size?, round?)`** **(rendered)** — turn an SVG string into
  an extruded 3D mesh. Handles filled shapes and stroked outlines
  (lucide-style icons), normalizes (centre, Y-flip, scale to `size` px),
  and gives it `depth` px of thickness. Compose it like any mesh:
  `svg("""<svg…>""", depth: 40px, size: 600px).material(...).rotate(...)`.
- **Triple-quoted strings** `"""…"""` — a raw string whose body may contain
  unescaped `"` and newlines (ends at the first `"""`). Lets a source paste
  a verbatim SVG/JSON blob without escaping — the intended companion to
  `svg(...)`.
- **`material(opacity:)`** — `0..1` source-over translucency (e.g. a glassy
  mark the prism reads through). Absent / `1` = opaque, so older sources are
  unaffected.
- **`material(emissive_intensity: gradient(top:, bottom:))`** — a vertical
  emissive ramp from `bottom` intensity at the mesh's lowest point to `top`
  at its highest. Either endpoint may be animated.
- **`bloom(strength?, radius?, threshold?)`** — opt-in glow, placed in
  `render3d(..., lights: [...])`. It adds no scene light; it routes the
  frame through a bloom post-process (only luminance above `threshold`
  blooms). Absent → the frame renders straight through, byte-identical to
  earlier runners.

The hosted API also gains **`POST /v1/gif`** — an animated-GIF render of
the scene loop (ffmpeg two-pass palette) — and **`POST /v1/mesh`** —
an SVG → 3D mesh export (`.glb`), alongside `/v1/render` (mp4) and
`/v1/frame` (png).

## Runner 0.0.14 additions

Opt in with `runner "0.0.14";`. Nothing here changes how an existing
source renders: `text.glyph` keeps its layout, and every addition is a
new constructor, type or argument. (0.0.14 also freezes the
`vectorize()` endpoint-snapping fix that landed after 0.0.13, so
`vectorize` scenes pinned to 0.0.14 trace slightly differently from
0.0.13.)

- **`text.block(string, size?, line_height?, align?, width?, kerning?, fill?, font?)`**
  **(rendered)** — a laid-out text block. Draws flat as a 2D layer in
  `compose` (filled with `fill:`, white by default), or extrudes:
  `extrude(text.block("TITLE", size: 120px), depth: 30px)`.
  - `size` — px, the font's ascender-to-descender height (default 96);
  - `"line one\nline two"` — `\n` breaks a line; `line_height` is the
    baseline distance as a multiple of `size` (default 1.2);
  - `width: 600px` — wrap greedily at spaces; a word wider than the
    width stays whole;
  - `align: left | center | right` — each line in the box (default
    `left`); the box itself is centred like any layer and moved with
    `translate`;
  - `kerning: false` — turn off the font's pair kerning (on by default);
  - `fit: 900px` — the size at which the widest line is exactly that
    wide (Remotion's `fitText`);
  - `reveal: 0..1` with `by: char | word | line` — the text appears unit
    by unit, each fading in, and with `rise: 40px` each rises into place
    as it appears: `reveal: animate { 0s => 0, 1.5s => 1 }`.
- **`font("/fonts/Inter-Bold.ttf")`** — a font file for `text.block` and
  `text.glyph`'s `font:` argument. The web viewer loads it (TTF, OTF or
  WOFF) and waits for it before a render or bake; the native renderer
  ships one font (DM Sans Bold) and uses it for every font. A font
  *name* (`font: "Inter Bold"`) still selects the default font.
- **Asset parameter types** — `Image`, `Video`, `Audio`, `Font`. A scene
  parameter of one of these types is a file the host resolves:
  `scene card(logo: Image = image("/img/logo.png"), face: Font = font("/fonts/Inter.ttf"))`.
  Its value is the matching constructor, so `fill: logo` works wherever
  `fill: image("…")` does. A host passes the URL (see the
  [host API](/impl/interpreter/#embedding-the-wasm-host-api)); cmotion
  never fetches by asset id. `Video` and `Audio` parameters declare the
  slot; the viewer does not draw video or play audio from them yet.
- **Easing** — every segment of an `animate` can take a curve: the
  `easing:` option sets the default, and `t => v with <easing>` sets the
  curve of the segment arriving at that keyframe:

  ```cm
  let x = animate {
    0s   => -400px,
    0.6s => 0px    with easing.out_back,
    2.4s => 0px,
    3s   => 400px  with easing.in_cubic,
  } with { easing: easing.in_out_sine };
  ```

  Curves: `easing.linear`, and `easing.` + `in_` / `out_` / `in_out_` +
  `quad`, `cubic`, `quart`, `quint`, `sine`, `expo`, `circ`, `back`,
  `elastic`, `bounce` (the standard Penner set, as in CSS and
  Remotion's `Easing`). With arguments: `easing.bezier(x1, y1, x2, y2)`
  (CSS `cubic-bezier`), `easing.steps(n)`, `easing.spring(stiffness:,
  damping:, mass:)`. `cmo check` warns on an unknown name (`NAM009`),
  which would otherwise run linear.
- **Beyond the keyframes** — `with { before: hold | extend, after: hold
  | extend | loop | ping_pong }`. `hold` is the default; `extend`
  carries the end segment's slope on; `repeat: forever` is still
  `after: loop`.
- **Colour keyframes blend** in OKLab, the default from runner 0.0.14;
  `with { blend: step }` keeps the old jump. (`oklab` is a keyword, so
  the default can't be spelled out as `blend: oklab`.) Sources
  pinned to an earlier runner keep stepping.
- **`spring(from:, to:, at:, stiffness:, damping:, mass:)`** — a value
  that springs from `from` to `to` starting at `at`, overshooting when
  under-damped. Defaults 100 / 10 / 1, as Remotion's `spring()`.
  Evaluated in closed form, so it looks the same at any frame rate.
- **`noise(seed, period, amplitude?)`** — smooth random wobble over
  time, one hill or valley per `period`, ±`amplitude` with its unit:
  `rotate(z: noise("wind", 1.5s, 4deg))`.
- **`random(seed)`** — a number in [0, 1) that is the same for the same
  seed on every renderer: `random("star-7") * 360deg`.
- **`for` loops** — `for i in 0..n { … }` gives one value per whole
  number from 0 up to, not including, `n`, as an array; loops nest. In
  `compose`, arrays (and arrays of arrays) are spliced into the layer
  list, so a row or a grid is a loop:

  ```cm
  compose [
    rect(width: 1280px, height: 720px, fill: #111827),
    for i in 0..12 {
      star(points: 5, radius: 30px).translate(x: (i - 5.5) * 95px)
        .during(i * 0.1s, 5s, fade_in: 0.3s)     // a staggered entrance
    },
    for row in 0..3 { for col in 0..4 { … } },   // a grid
  ]
  ```

  Bounds are whole numbers without units, known before the clip plays,
  and a loop runs at most 10000 times (`EVL006` otherwise).
- **Time structure on any layer** — Remotion's `<Sequence>`, `<Series>`,
  `<Loop>` and `<Freeze>`. Each runs the layer on its own clock, called
  as a function or chained:
  - `during(from, to, layer, fade_in?, fade_out?)` — shown from `from`
    to `to`, its time starting at 0 at `from`;
    `title.during(0.5s, 4s, fade_out: 0.4s)`;
  - `shift(by, layer)` — starts `by` later;
  - `loop(period, layer)` — repeats its first `period`;
  - `freeze(at, layer)` — holds the frame at `at`;
  - `series([a, b, c], [2s, 1s, 3s])` — each layer in turn, nothing
    after the last.
- **`transition(a, b, at:, duration:, kind:, easing:, distance:)`** —
  Remotion's `TransitionSeries` inside one clip: `a` until `at`, then over
  `duration` into `b`. `kind: fade` (default), `slide_left`,
  `slide_right`, `slide_up`, `slide_down` (pushing by `distance`, default
  1920px). `a` keeps the clip's time; `b` starts its own clock at `at`.
  Between clips on a timeline, use the host's transitions.
- **`opacity(k, layer)`** — fades any layer, as a group (overlapping
  parts don't show through each other); `k` can be animated. A layer
  outside its `during` window, or fading, renders through it.
- **2D shapes** — `ellipse(width:, height:)`, `polygon(sides:, radius:)`,
  `star(points:, radius:, inner_radius:)`, `pie(radius:, angle:, start:)`
  (degrees clockwise from 12 o'clock), `rect(…, radius:)` with rounded
  corners, and `path(points: [vec2(x, y), …], closed:)` drawn flat. All
  take `fill:`, and all extrude: `extrude(star(points: 5, radius:
  120px), depth: 30px)`.
- **`stroke(shape, width:, color:, draw:)`** — an outline with round joins
  and caps; on an open `path` it is a line. `draw: 0..1` draws it on
  (Remotion's `evolvePath`): `stroke(circle(radius: 120px), width: 8px,
  draw: animate { 0s => 0, 2s => 1 })`. A stroked shape is filled only
  if it has its own `fill:`.
- **Pictures as layers** — `image(src, width:, height:, fit:, radius:)`
  draws a picture at a size, placed, timed and faded like any layer:
  `image(logo, width: 320px).translate(x: 600px, y: -380px)`. With only a
  width or a height the other follows the picture's aspect; with both,
  `fit: cover` (default) crops to the box, `contain` letterboxes, `fill`
  stretches. `radius:` rounds the corners. Layers listed after a picture
  draw over it. A width or height is what makes it a layer: an unsized
  `image(…)` as the first `compose` layer is still the background. Web
  viewer only (the native renderer draws no pictures); the viewer waits
  for every picture before a render or bake.
- **`output`** — the frame the host renders: `output.width` / `.height`
  (px), `.aspect`, `.fps`, `.duration` (s) and `.safe.top` / `.right` /
  `.bottom` / `.left` (px, the margins a platform's UI covers). Lay out
  against it and one scene fits 16:9, 1:1 and 9:16:

  ```cm
  compose [
    rect(width: output.width, height: output.height, fill: #101418),
    image(product, width: output.width * 0.6)
      .translate(y: output.height * 0.1),
    text.block(headline, fit: output.width - 120px)
      .translate(y: -(output.height / 2) + output.safe.bottom + 160px),
  ]
  ```

  Defaults without a host: 1920 × 1080, 30 fps, 5 s, no margins. A host
  passes its frame as `$output` ([host API](/impl/interpreter/#the-frame-output)).
- **y is up** in every renderer: `translate(y: 100px)` and `vec2(0, 100)`
  point up. (The native renderer drew 2D layers y-down before 0.0.14.)
- **`@ui(min:, max:, step:, label:)`** on a scene parameter — hints for a
  host's props panel. No effect on evaluation. `cmo check` warns on an
  unknown annotation or key (`NAM008`) and on a value of the wrong kind
  (`TYP003`).
