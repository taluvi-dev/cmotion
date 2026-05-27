// Canonical cmotion sources for the examples gallery and the homepage
// preview. Kept in TypeScript (and not as .cm files in /public) so the
// build inlines them — the WASM viewer needs the source as a string,
// and the docs pages re-render the same string in their code block.

// The homepage preview: a single extruded glyph that spins a full
// 360°. One letter, three independent animations — the minimal taste
// sample. The multi-letter title example below shares the same
// extrude → material → render3d pipeline.
export const HOMEPAGE_SOURCE = `runner "0.0.1";

use std.shapes.*;
use std.mesh3d.*;
use std.text;
use std.lighting.*;
use std.scene3d.*;
use std.anim.*;

scene title(duration: Duration = 6s) -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: oklch(0.10, 0.04, 280));

  let rot   = animate { 0s => 0deg,   6s => 360deg } with { repeat: forever };
  let hue   = animate { 0s => 280deg, 4s => 640deg } with { repeat: forever };
  let pulse = animate {
                0s    => 1.00,
                500ms => 1.06,
                1s    => 1.00,
              } with { easing: easing.out_cubic, repeat: forever };

  let wobble = wave(amplitude: 8.6deg, period: 12s);

  let glyph = extrude(text.glyph("C", font: "Inter Bold"), depth: 16px)
                .material(fill: oklch(0.78, 0.20, hue),
                          metalness: 0.25,
                          roughness: 0.35,
                          emissive: oklch(0.65, 0.18, hue),
                          emissive_intensity: 0.6)
                .rotate(x: wobble, y: rot)
                .scale(pulse);

  let lights = [
    ambient(0.35),
    directional(from: vec3(3, 4, 5),    intensity: 1.6),
    directional(from: vec3(-4, -2, -3), intensity: 0.9),
  ];

  compose [
    bg,
    render3d(glyph, lights: lights),
  ]
}
`;

// The title example: "cmotion" built from one extruded glyph per
// letter, so each can turn on its own Y axis. The letters spin in,
// staggered, settle by ~4s, then sit quiet while two coloured lights
// sweep the hue wheel and wobble their direction.
//
// `camera(distance: 2166)` makes the native 3D view exactly 1080 world-
// px tall, so `size:` and `translate(x:)` are real fractions of the
// background — the same pixel-honest mapping the web viewer uses. That's
// what lets the hand-placed per-letter advances line up identically in
// both renderers. (The homepage keeps the default camera and is
// untouched.) Everything is tuned to loop seamlessly over 12s: each
// 360° spin lands back at 0°, and the hue cycle + wobble waves (periods
// 6s, 4s) all divide 12 evenly.
export const TITLE_SOURCE = `runner "0.0.1";

use std.shapes.*;
use std.mesh3d.*;
use std.text;
use std.lighting.*;
use std.scene3d.*;
use std.anim.*;

scene title(duration: Duration = 12s) -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: oklch(0.97, 0.012, 95));

  // Per-letter Y spin, staggered by 0.3s, each 360° over 2s then held.
  let r0 = animate { 0s => 0deg, 2.0s => 360deg, 12s => 360deg } with { easing: easing.in_out_cubic };
  let r1 = animate { 0s => 0deg, 0.3s => 0deg, 2.3s => 360deg, 12s => 360deg } with { easing: easing.in_out_cubic };
  let r2 = animate { 0s => 0deg, 0.6s => 0deg, 2.6s => 360deg, 12s => 360deg } with { easing: easing.in_out_cubic };
  let r3 = animate { 0s => 0deg, 0.9s => 0deg, 2.9s => 360deg, 12s => 360deg } with { easing: easing.in_out_cubic };
  let r5 = animate { 0s => 0deg, 1.5s => 0deg, 3.5s => 360deg, 12s => 360deg } with { easing: easing.in_out_cubic };
  let r6 = animate { 0s => 0deg, 1.8s => 0deg, 3.8s => 360deg, 12s => 360deg } with { easing: easing.in_out_cubic };

  // The "i" hops up and down instead of spinning, and rests slightly raised.
  let ijump = animate {
                0s   =>  30px,
                1.3s => 250px,
                2.1s =>  30px,
                2.8s => 165px,
                3.5s =>  30px,
                12s  =>  30px,
              } with { easing: easing.in_out_cubic };

  // Bright neutral lighting so each letter shows its own colour; a slow
  // wobble on the key keeps the highlights alive.
  let key  = directional(from: vec3(wave(amplitude: 3, period: 8s), 4, 6), intensity: 1.7);
  let fill = directional(from: vec3(-4, -2, 4), intensity: 0.8);
  // A subtle spotlight pool drifts across the word (most visible at rest).
  let sweepx = animate { 0s => -1100px, 6s => 1100px, 12s => -1100px } with { easing: easing.in_out_cubic };
  let spot   = spotlight(at: vec3(sweepx, 120px, 360px), intensity: 4.0, range: 820px, color: oklch(0.98, 0.01, 95));
  let lights = [ ambient(0.40), key, fill, spot ];

  // Each letter a different bright colour, scattered (not a smooth ramp).
  let c0 = extrude(text.glyph("c", size: 430px), depth: 43px).material(fill: oklch(0.70, 0.20,  25), metalness: 0.0, roughness: 0.45).rotate(y: r0).translate(x: -567px);
  let c1 = extrude(text.glyph("m", size: 430px), depth: 43px).material(fill: oklch(0.83, 0.16,  92), metalness: 0.0, roughness: 0.45).rotate(y: r1).translate(x: -313px);
  let c2 = extrude(text.glyph("o", size: 430px), depth: 43px).material(fill: oklch(0.70, 0.19, 150), metalness: 0.0, roughness: 0.45).rotate(y: r2).translate(x: -59px);
  let c3 = extrude(text.glyph("t", size: 430px), depth: 43px).material(fill: oklch(0.66, 0.16, 245), metalness: 0.0, roughness: 0.45).rotate(y: r3).translate(x: 108px);
  let c4 = extrude(text.glyph("i", size: 430px), depth: 43px).material(fill: oklch(0.70, 0.23, 350), metalness: 0.0, roughness: 0.45).translate(x: 225px, y: ijump);
  let c5 = extrude(text.glyph("o", size: 430px), depth: 43px).material(fill: oklch(0.74, 0.20,  55), metalness: 0.0, roughness: 0.45).rotate(y: r5).translate(x: 368px);
  let c6 = extrude(text.glyph("n", size: 430px), depth: 43px).material(fill: oklch(0.72, 0.17, 195), metalness: 0.0, roughness: 0.45).rotate(y: r6).translate(x: 570px);

  compose [
    bg,
    render3d(compose [c0, c1, c2, c3, c4, c5, c6], lights: lights, camera: camera(distance: 2166)),
  ]
}
`;

export const BOUNCING_BALL_SOURCE = `runner "0.0.1";

use std.shapes.*;
use std.anim.*;
use std.scene3d.*;
use std.lighting.*;

scene bouncing_ball(
  size:     Size     = size(1920px, 1080px),
  duration: Duration = 6s,
) -> Frame {
  let assets = {
    earth: "/img/earth_4k.jpg",
    night: "/img/starry_night.jpg",
  };

  // Full-bleed starry background. \`image(...).fit(cover)\` becomes the
  // scene's background texture (handled in the compose translator); no
  // size info on the image itself, so the viewport falls back to 16:9.
  let bg = image(assets.night).fit(cover);

  // Continuous y-axis spin — full turn every 6 s, looping.
  let spin = animate {
    0s => 0deg,
    6s => 360deg,
  } with { repeat: forever };

  // Parabolic bounce: y swings from \`floor\` (impact) up to
  // \`floor + height\` (apex). Returns a record { position, impacts },
  // where impacts is the list of contact times the squash listens to.
  // floor = -540px = bottom edge of the 1080-tall canvas — the ball
  // bottom (pivoted) lands right on the image floor at impact.
  let bounce_y = bounce(height: 760px, period: 1.2s, floor: -540px);

  // Exponential decay envelope keyed off the bounce impacts: zero
  // between contacts, snaps to \`peak\` on impact, then relaxes over
  // \`decay\`. Squash factor below is "how much to compress" —
  // 0 = no squash, 0.35 = compressed to ~65% height.
  let stretch = on_event(bounce_y.impacts, decay: 0.18s, peak: 0.35);

  let ball = sphere(r: 120px)
    .material(fill: image(assets.earth).as_texture(projection: equirectangular))
    .rotate(y: spin)
    .pivot(bottom)
    .squash(factor: stretch);

  let scene = render3d(
    ball.translate(y: bounce_y.position),
    lights: [
      ambient(0.35),
      directional(from: vec3(2, 3, 4), intensity: 1.0),
    ],
  );

  compose [bg, scene]
}
`;

// Viking sprite: a 4×4, 16-frame character sheet (rows: idle / walk /
// attack / death) loaded from /public and drawn with `sprite(...)`.
// `frame:` ramps across the walk row (cells 4–7); the viewer floors it to
// a cell index (frame 0 = top-left, row-major), so the figure steps
// crisply through the sheet. Point `frame:` at another range to play a
// different action (idle 0–3, attack 8–11, death 12–15). `image(src)` also
// takes an inline base64 `data:` URI for small sheets — see
// scripts/embed_sprite_base64.py.
export const VIKING_SPRITE_SOURCE = `runner "0.0.1";

use std.shapes.*;
use std.anim.*;

scene viking_sprite(duration: Duration = 0.6s) -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: oklch(0.16, 0.03, 250));

  // Loop the walk row (cells 4–7): each cell shows for duration/4, and the
  // ramp's end value (8) wraps back to the row start for a seamless cycle.
  let walk = animate { 0s => 4, 0.6s => 8 } with { repeat: forever };

  let viking = sprite(
    image("/img/viking.png"),
    width: 384px, height: 384px,
    cols: 4, rows: 4, frame: walk,
  );

  compose [bg, viking]
}
`;

// Lava lamp: a raymarched smooth-union metaball field (the Three.js viewer
// renders `metaballs` as an SDF fragment shader). Each blob keeps a constant
// radius — so it deforms by merging/separating from its neighbours while its
// own volume is preserved — and bobs on its own y `animate` so the cluster
// fuses and splits over the 12s loop. The dark background reads through the
// gaps; the glossy red body + orange fresnel rim come from the shader's lights.
export const LAVA_LAMP_SOURCE = `runner "0.0.1";

use std.shapes.*;
use std.scene3d.*;
use std.anim.*;

scene lava(duration: Duration = 12s) -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: oklch(0.08, 0.03, 285));

  let blobs = [
    blob(at: vec3(  10px, animate { 0s =>   30px, 6s =>  -70px, 12s =>   30px } with { easing: easing.in_out_cubic }, 0px), radius: 250px),
    blob(at: vec3(-280px, animate { 0s =>  150px, 6s =>  270px, 12s =>  150px } with { easing: easing.in_out_cubic }, 0px), radius: 160px),
    blob(at: vec3( 300px, animate { 0s =>  -10px, 6s =>  110px, 12s =>  -10px } with { easing: easing.in_out_cubic }, 0px), radius: 170px),
    blob(at: vec3(-160px, animate { 0s => -240px, 6s => -110px, 12s => -240px } with { easing: easing.in_out_cubic }, 0px), radius: 150px),
    blob(at: vec3( 230px, animate { 0s => -280px, 6s => -150px, 12s => -280px } with { easing: easing.in_out_cubic }, 0px), radius: 145px),
    blob(at: vec3(-470px, animate { 0s =>   40px, 4s =>  -90px, 8s =>  140px, 12s =>   40px } with { easing: easing.in_out_cubic }, 0px), radius: 120px),
    blob(at: vec3( 500px, animate { 0s =>  -90px, 4s =>   70px, 8s => -200px, 12s =>  -90px } with { easing: easing.in_out_cubic }, 0px), radius: 115px),
  ];

  compose [
    bg,
    metaballs(blobs, smoothing: 90px).material(roughness: 0.18),
  ]
}
`;
