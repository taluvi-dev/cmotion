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
// `frame:` ramps across all 16 cells; the viewer floors it to a cell index
// (frame 0 = top-left, row-major), so the figure steps crisply through the
// whole sheet. `key:` drops the sheet's solid white cell background and
// `anchor:` re-centres each frame's content (the source frames aren't
// grid-aligned). `image(src)` also takes an inline base64 `data:` URI for
// small sheets — see scripts/embed_sprite_base64.py.
export const VIKING_SPRITE_SOURCE = `runner "0.0.1";

use std.shapes.*;
use std.anim.*;

scene viking_sprite(duration: Duration = 4.5s) -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: #ffffff);

  // Hold the first cell to introduce the viking, step through all 16 cells
  // (4×4: idle, walk, attack, death), then hold the last cell before the fade.
  let cycle = animate {
    0s   => 0,
    0.7s => 0,
    2.3s => 15,
    2.9s => 15,
  };

  // Fade in to introduce, hold, fade out by 3.5s, then stay blank white for
  // ~1s before the loop restarts.
  let fade = animate {
    0s   => 0,
    0.3s => 1,
    2.9s => 1,
    3.5s => 0,
    4.5s => 0,
  };

  // key: drops the sheet's white cell background; anchor: re-centres each
  // frame's content; opacity: drives the fade.
  let viking = sprite(
    image("/img/viking.png"),
    width: 900px, height: 900px,
    cols: 4, rows: 4, frame: cycle, key: #ffffff, anchor: center, opacity: fade,
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

// Icons: a Lucide globe in the centre with six icons orbiting it like
// satellites. Each satellite sits at a different angle via the wave `phase:`
// — x is a quarter-turn (90°) ahead of y, which traces a circle; adding the
// satellite's base angle (0°, 60°, …) spaces them evenly. The icons only
// translate (no rotate), so they stay upright as they orbit. One revolution
// per 16s period == the scene duration, so the loop is seamless.
export const ICONS_SOURCE = `runner "0.0.1";

use std.shapes.*;
use std.anim.*;

scene icons(duration: Duration = 16s) -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: #0b1020);

  // World in the centre.
  let world = icon("globe", size: 320px, color: #38bdf8);

  // Shared orbit: radius r, one revolution per period p.
  let r = 380px;
  let p = 16s;

  let s0 = icon("smartphone",     size: 150px, color: #e2e8f0).translate(x: wave(amplitude: r, period: p, phase:  90deg), y: wave(amplitude: r, period: p, phase:   0deg));
  let s1 = icon("satellite",      size: 150px, color: #a3e635).translate(x: wave(amplitude: r, period: p, phase: 150deg), y: wave(amplitude: r, period: p, phase:  60deg));
  let s2 = icon("dollar-sign",    size: 150px, color: #fbbf24).translate(x: wave(amplitude: r, period: p, phase: 210deg), y: wave(amplitude: r, period: p, phase: 120deg));
  let s3 = icon("sword",          size: 150px, color: #f87171).translate(x: wave(amplitude: r, period: p, phase: 270deg), y: wave(amplitude: r, period: p, phase: 180deg));
  let s4 = icon("ice-cream-cone", size: 150px, color: #f9a8d4).translate(x: wave(amplitude: r, period: p, phase: 330deg), y: wave(amplitude: r, period: p, phase: 240deg));
  let s5 = icon("users",          size: 150px, color: #60a5fa).translate(x: wave(amplitude: r, period: p, phase: 390deg), y: wave(amplitude: r, period: p, phase: 300deg));

  compose [bg, world, s0, s1, s2, s3, s4, s5]
}
`;

// Particles: a generative point-sprite field (a viewer primitive, like
// metaballs). One emitter cycling through all eight kinds across the loop —
// stars → dust → snow → embers → magic sparks → fireflies → smoke → pollen.
// `particles(kind: cycle, period:)` rotates the preset by frame time; each
// named kind (e.g. `particles(kind: snow)`) is available on its own.
export const PARTICLES_SOURCE = `runner "0.0.1";

use std.shapes.*;

scene particle_field(duration: Duration = 8s) -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: #05070f);
  compose [bg, particles(kind: cycle, count: 400, period: 8s)]
}
`;

// Composition: a composition is just a value, so it can be reused inside
// another composition. Here four sub-compositions are arranged in a 2×2 grid
// (each scaled + translated into a quadrant), one of them — the flower — is
// itself built by reusing a petal sub-composition five times (composition
// within a composition), and a full-scene particle layer sparkles over the
// whole grid to show layers compositing on top.
export const COMPOSITION_SOURCE = `runner "0.0.1";

use std.shapes.*;
use std.anim.*;
use std.mesh3d.*;
use std.text;
use std.lighting.*;
use std.scene3d.*;

scene composition(duration: Duration = 8s) -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: #0b0f1a);

  // Cell A — the Icons example: a globe with six icons orbiting it,
  // spaced 60° apart via wave phase (x a quarter-turn ahead of y).
  let spin = 8s;
  let cellA = compose [
    icon("globe", size: 220px, color: #38bdf8),
    icon("smartphone",     size: 110px, color: #e2e8f0).translate(x: wave(amplitude: 300px, period: spin, phase:  90deg), y: wave(amplitude: 300px, period: spin, phase:   0deg)),
    icon("satellite",      size: 110px, color: #a3e635).translate(x: wave(amplitude: 300px, period: spin, phase: 150deg), y: wave(amplitude: 300px, period: spin, phase:  60deg)),
    icon("dollar-sign",    size: 110px, color: #fbbf24).translate(x: wave(amplitude: 300px, period: spin, phase: 210deg), y: wave(amplitude: 300px, period: spin, phase: 120deg)),
    icon("sword",          size: 110px, color: #f87171).translate(x: wave(amplitude: 300px, period: spin, phase: 270deg), y: wave(amplitude: 300px, period: spin, phase: 180deg)),
    icon("ice-cream-cone", size: 110px, color: #f9a8d4).translate(x: wave(amplitude: 300px, period: spin, phase: 330deg), y: wave(amplitude: 300px, period: spin, phase: 240deg)),
    icon("users",          size: 110px, color: #60a5fa).translate(x: wave(amplitude: 300px, period: spin, phase: 390deg), y: wave(amplitude: 300px, period: spin, phase: 300deg)),
  ];

  // Cell B — the viking sprite, reused. Like the standalone example, step
  // through all 16 cells (idle / walk / attack / death), hold the death
  // frame, then fade out and loop — so the full sheet plays, not just walk.
  let cycle = animate { 0s => 0, 0.7s => 0, 3.5s => 15, 5s => 15 };
  let fade  = animate { 0s => 0, 0.4s => 1, 5s => 1, 6s => 0, 8s => 0 };
  let cellB = compose [
    sprite(image("/img/viking.png"), width: 700px, height: 700px, cols: 4, rows: 4, frame: cycle, key: #ffffff, anchor: center, opacity: fade),
  ];

  // Cell C — the bouncing-ball example reused (earth sphere, bounce + squash).
  let spinB   = animate { 0s => 0deg, 6s => 360deg } with { repeat: forever };
  let bounceY = bounce(height: 520px, period: 1.2s, floor: -300px);
  let squashB = on_event(bounceY.impacts, decay: 0.18s, peak: 0.35);
  let ball = sphere(r: 190px)
    .material(fill: image("/img/earth_4k.jpg").as_texture(projection: equirectangular))
    .rotate(y: spinB).pivot(bottom).squash(factor: squashB);
  let cellC = compose [
    render3d(ball.translate(y: bounceY.position),
      lights: [ ambient(0.35), directional(from: vec3(2, 3, 4), intensity: 1.0) ]),
  ];

  // Cell D — the homepage glyph reused (extruded "C", spin + hue cycle).
  // Every period divides the 8s scene loop so the cell wraps seamlessly:
  // one full y-turn over 8s, the x-wave over 8s, hue over 4s, pulse over 1s.
  let rotG   = animate { 0s => 0deg,   8s => 360deg } with { repeat: forever };
  let hueG   = animate { 0s => 280deg, 4s => 640deg } with { repeat: forever };
  let pulseG = animate { 0s => 1.00, 500ms => 1.06, 1s => 1.00 } with { easing: easing.out_cubic, repeat: forever };
  let glyph = extrude(text.glyph("C", font: "Inter Bold"), depth: 16px)
    .material(fill: oklch(0.78, 0.20, hueG), metalness: 0.25, roughness: 0.35,
              emissive: oklch(0.65, 0.18, hueG), emissive_intensity: 0.6)
    .rotate(x: wave(amplitude: 8.6deg, period: 8s), y: rotG).scale(pulseG);
  let cellD = compose [
    render3d(glyph, lights: [ ambient(0.35), directional(from: vec3(3, 4, 5), intensity: 1.6), directional(from: vec3(-4, -2, -3), intensity: 0.9) ]),
  ];

  // Centre piece — the Title example reused: the word "cmotion", each letter
  // its own colour, spinning in on a 0.3s stagger; the "i" hops. No tile bg.
  let r0 = animate { 0s => 0deg, 2.0s => 360deg, 8s => 360deg } with { easing: easing.in_out_cubic };
  let r1 = animate { 0s => 0deg, 0.3s => 0deg, 2.3s => 360deg, 8s => 360deg } with { easing: easing.in_out_cubic };
  let r2 = animate { 0s => 0deg, 0.6s => 0deg, 2.6s => 360deg, 8s => 360deg } with { easing: easing.in_out_cubic };
  let r3 = animate { 0s => 0deg, 0.9s => 0deg, 2.9s => 360deg, 8s => 360deg } with { easing: easing.in_out_cubic };
  let r5 = animate { 0s => 0deg, 1.5s => 0deg, 3.5s => 360deg, 8s => 360deg } with { easing: easing.in_out_cubic };
  let r6 = animate { 0s => 0deg, 1.8s => 0deg, 3.8s => 360deg, 8s => 360deg } with { easing: easing.in_out_cubic };
  let ijump = animate { 0s => 30px, 1.3s => 250px, 2.1s => 30px, 2.8s => 165px, 3.5s => 30px, 8s => 30px } with { easing: easing.in_out_cubic };
  let t0 = extrude(text.glyph("c", size: 430px), depth: 43px).material(fill: oklch(0.70, 0.20,  25)).rotate(y: r0).translate(x: -567px);
  let t1 = extrude(text.glyph("m", size: 430px), depth: 43px).material(fill: oklch(0.83, 0.16,  92)).rotate(y: r1).translate(x: -313px);
  let t2 = extrude(text.glyph("o", size: 430px), depth: 43px).material(fill: oklch(0.70, 0.19, 150)).rotate(y: r2).translate(x: -59px);
  let t3 = extrude(text.glyph("t", size: 430px), depth: 43px).material(fill: oklch(0.66, 0.16, 245)).rotate(y: r3).translate(x: 108px);
  let t4 = extrude(text.glyph("i", size: 430px), depth: 43px).material(fill: oklch(0.70, 0.23, 350)).translate(x: 225px, y: ijump);
  let t5 = extrude(text.glyph("o", size: 430px), depth: 43px).material(fill: oklch(0.74, 0.20,  55)).rotate(y: r5).translate(x: 368px);
  let t6 = extrude(text.glyph("n", size: 430px), depth: 43px).material(fill: oklch(0.72, 0.17, 195)).rotate(y: r6).translate(x: 570px);
  let title = render3d(compose [t0, t1, t2, t3, t4, t5, t6],
    lights: [ ambient(0.45), directional(from: vec3(2, 4, 6), intensity: 1.6), directional(from: vec3(-4, -2, 4), intensity: 0.8) ]);

  // Lava lamp, centre-bottom — the metaballs example reused. A raymarched SDF
  // field is a full-frame effect (its blobs live in world space, the quad fills
  // the frame and misses discard), so it's placed by its blob coordinates
  // rather than a cell transform: a compact cluster bobbing in the lower centre,
  // below the title and between the two bottom cells. 4s bob loops within 8s.
  let lava = metaballs([
    blob(at: vec3(   4px, animate { 0s => -317px, 4s => -359px, 8s => -317px } with { easing: easing.in_out_cubic }, 0px), radius: 105px),
    blob(at: vec3(-118px, animate { 0s => -267px, 4s => -217px, 8s => -267px } with { easing: easing.in_out_cubic }, 0px), radius:  67px),
    blob(at: vec3( 126px, animate { 0s => -334px, 4s => -284px, 8s => -334px } with { easing: easing.in_out_cubic }, 0px), radius:  71px),
    blob(at: vec3( -67px, animate { 0s => -431px, 4s => -376px, 8s => -431px } with { easing: easing.in_out_cubic }, 0px), radius:  63px),
    blob(at: vec3(  97px, animate { 0s => -448px, 4s => -393px, 8s => -448px } with { easing: easing.in_out_cubic }, 0px), radius:  61px),
    blob(at: vec3(-197px, animate { 0s => -313px, 4s => -368px, 8s => -313px } with { easing: easing.in_out_cubic }, 0px), radius:  50px),
    blob(at: vec3( 210px, animate { 0s => -368px, 4s => -301px, 8s => -368px } with { easing: easing.in_out_cubic }, 0px), radius:  48px),
  ], smoothing: 38px).material(roughness: 0.18);

  // Reuse the four cells in a 2×2 grid, drop the lava lamp in the lower centre,
  // sparkle over the whole scene, then the title on top of every other layer.
  compose [
    bg,
    cellA.scale(0.46).translate(x: -480px, y:  264px),
    cellB.scale(0.46).translate(x:  480px, y:  264px),
    cellC.scale(0.46).translate(x: -480px, y: -264px),
    cellD.scale(0.46).translate(x:  480px, y: -264px),
    lava,
    particles(kind: magic_sparks, count: 220),
    title.scale(0.50),
  ]
}
`;
