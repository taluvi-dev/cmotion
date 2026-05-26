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

// The title example: a whole word extruded into 3D. `text.glyph`
// lays the string out glyph-by-glyph, so a full 360° spin would leave
// it mirrored for half the loop — a gentle y-sway keeps it readable
// while the hue cycles, the scale pulses, and a slow x-wave nods it.
//
// Every motion is tuned to loop seamlessly over the 12s duration: a
// `wave` is `sin(2π·t/period)`, so it only returns to its start (value
// *and* slope) when `period` divides the loop evenly. sway = 12s/2,
// wobble = 12s/1, and the 4s hue cycle fits 3×. A mismatched period
// snaps back mid-swing at the loop point.
export const TITLE_SOURCE = `runner "0.0.1";

use std.shapes.*;
use std.mesh3d.*;
use std.text;
use std.lighting.*;
use std.scene3d.*;
use std.anim.*;

scene title(duration: Duration = 12s) -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: oklch(0.10, 0.04, 280));

  let sway   = wave(amplitude: 14deg, period: 6s);
  let hue    = animate { 0s => 280deg, 4s => 640deg } with { repeat: forever };
  let pulse  = animate {
                 0s    => 1.00,
                 500ms => 1.03,
                 1s    => 1.00,
               } with { easing: easing.out_cubic, repeat: forever };
  let wobble = wave(amplitude: 5deg, period: 12s);

  let title = extrude(text.glyph("cmotion"), depth: 16px)
                .material(fill: oklch(0.78, 0.20, hue),
                          metalness: 0.25,
                          roughness: 0.35,
                          emissive: oklch(0.65, 0.18, hue),
                          emissive_intensity: 0.6)
                .rotate(x: wobble, y: sway)
                .scale(pulse);

  let lights = [
    ambient(0.35),
    directional(from: vec3(3, 4, 5),    intensity: 1.6),
    directional(from: vec3(-4, -2, -3), intensity: 0.9),
  ];

  compose [
    bg,
    render3d(title, lights: lights),
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
