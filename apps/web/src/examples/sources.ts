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

scene bouncing_ball(duration: Duration = 1s) -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: oklch(0.96, 0.02, 240));

  // Two-keyframe ping-pong: apex → ground → apex, looping forever.
  // Linear segments read as constant velocity — bouncy enough at this
  // tempo without needing a piecewise easing.
  let y = animate {
    0s    =>  280px,
    500ms => -280px,
    1s    =>  280px,
  } with { repeat: forever };

  let ball = circle(radius: 90px, fill: oklch(0.62, 0.20, 25))
               .translate(y: y);

  compose [bg, ball]
}
`;
