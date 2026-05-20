// Canonical cmotion sources for the examples gallery and the homepage
// preview. Kept in TypeScript (and not as .cm files in /public) so the
// build inlines them — the WASM viewer needs the source as a string,
// and the docs pages re-render the same string in their code block.

export const TITLE_SOURCE = `use std.shapes.*;
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

export const BOUNCING_BALL_SOURCE = `use std.shapes.*;
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

  // Ping-pong bounce, eased: the ball dwells near the apex and snaps
  // through the floor contact at 600 ms.
  let bounce_y = animate {
    0s     => -280px,
    600ms  =>  280px,
    1200ms => -280px,
  } with { easing: easing.in_out_quad, repeat: forever };

  // Squash peak co-located with the bounce floor at 600 ms — sharp ramp
  // in, smoother release. Approximates \`on_event(impacts, decay: …)\`
  // until that primitive lands in the sampler.
  let stretch = animate {
    0s     => 0,
    540ms  => 0,
    600ms  => 0.35,
    760ms  => 0,
    1200ms => 0,
  } with { easing: easing.out_cubic, repeat: forever };

  let ball = sphere(r: 220px)
    .material(fill: image(assets.earth).as_texture(projection: equirectangular))
    .rotate(y: spin)
    .pivot(bottom)
    .squash(factor: stretch);

  let scene = render3d(
    ball.translate(y: bounce_y),
    lights: [
      ambient(0.35),
      directional(from: vec3(2, 3, 4), intensity: 1.0),
    ],
  );

  compose [bg, scene]
}
`;
