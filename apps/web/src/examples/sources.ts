// Canonical cmotion sources for the examples gallery and the homepage
// preview. Kept in TypeScript (and not as .cm files in /public) so the
// build inlines them — the WASM viewer needs the source as a string,
// and the docs pages re-render the same string in their code block.

// The homepage preview: a single extruded glyph that spins a full
// 360°. One letter, three independent animations — the minimal taste
// sample. The multi-letter title example below shares the same
// extrude → material → render3d pipeline.
export const HOMEPAGE_SOURCE = `runner "0.0.3";

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
export const TITLE_SOURCE = `runner "0.0.3";

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

export const BOUNCING_BALL_SOURCE = `runner "0.0.3";

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

// Lava lamp: a raymarched smooth-union metaball field (the Three.js viewer
// renders `metaballs` as an SDF fragment shader). Each blob keeps a constant
// radius — so it deforms by merging/separating from its neighbours while its
// own volume is preserved — and bobs on its own y `animate` so the cluster
// fuses and splits over the 12s loop. The dark background reads through the
// gaps; the glossy red body + orange fresnel rim come from the shader's lights.
export const LAVA_LAMP_SOURCE = `runner "0.0.3";

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

// Extruded path: the generic 2D `path(points: [...])` primitive in
// std.shapes (here a glyph-like five-point star) fed through
// `extrude(path, depth)` in std.mesh3d, then `render3d`'d to a Layer
// that composes over a 2D background. Flat-shaded, one directional
// light — the minimal stage-3 path→solid slice. Pinned to runner
// 0.0.3, the first runner that renders extruded paths.
export const EXTRUDE_PATH_SOURCE = `runner "0.0.3";

use std.shapes.*;
use std.mesh3d.*;
use std.scene3d.*;
use std.lighting.*;
use std.anim.*;

scene star(duration: Duration = 6s) -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: oklch(0.10, 0.04, 280));

  let spin = animate { 0s => 0deg, 6s => 360deg } with { repeat: forever };

  // A five-point star outline in frame px, centred on the origin.
  let outline = path(points: [
    vec2(0, 150),    vec2(35, 46),
    vec2(143, 46),   vec2(57, -18),
    vec2(88, -121),  vec2(0, -57),
    vec2(-88, -121), vec2(-57, -18),
    vec2(-143, 46),  vec2(-35, 46),
  ]);

  let solid = extrude(outline, depth: 60px)
                .material(fill: oklch(0.82, 0.19, 95),
                          metalness: 0.2,
                          roughness: 0.4)
                .rotate(y: spin);

  let lights = [
    ambient(0.35),
    directional(from: vec3(3, 4, 5), intensity: 1.5),
  ];

  compose [
    bg,
    render3d(solid, lights: lights),
  ]
}
`;

// Plinken SVG: the lucide "users" icon pasted verbatim via a triple-quoted
// string and turned into a turning 3D mesh by svg(...), in front of a
// camera-facing prism fan. Exercises 0.0.5: svg(), opacity, emissive
// gradient, and bloom.
export const PLINKEN_SVG_SOURCE = `// Plinken SVG — an SVG icon turned into a turning 3D mark over a prism.
//
// Showcases runner 0.0.5 features: a verbatim SVG pasted in a triple-
// quoted string and extruded by svg(src, depth:, size:); translucent
// material via opacity:; a vertical emissive gradient(top:, bottom:);
// and opt-in bloom(...). The lucide "user" outline becomes a glassy 3D
// mark; a spectral fan tilts toward the camera and sweeps a bright crest
// once per loop. Loops seamlessly over 6s.

runner "0.0.5";

use std.shapes.*;
use std.mesh3d.*;
use std.text;
use std.lighting.*;
use std.scene3d.*;
use std.anim.*;

scene plinken_svg(duration: Duration = 6s) -> Frame {
  let bg = rect(width: 1080px, height: 1080px, fill: oklch(0.08, 0.03, 280));

  // The hero: one full turn every 6s, forever, with a slow wobble and a
  // gentle breathing scale to keep the highlights alive.
  let spin   = animate { 0s => 0deg, 6s => 360deg } with { repeat: forever };
  let wobble = wave(amplitude: 6deg, period: 6s);
  let pulse  = animate {
                 0s    => 1.00,
                 1.5s  => 1.035,
                 3s    => 1.00,
                 6s    => 1.00,
               } with { easing: easing.out_cubic, repeat: forever };

  // Emissive hue the mark picks up from the prism — a slow spectral drift
  // so its self-glow shifts through the colours over the loop.
  let pickup = animate { 0s => 250deg, 6s => 610deg } with { repeat: forever };

  // Hero: the provided lucide "user" SVG, pasted verbatim via a triple-
  // quoted string and turned into a 3D mesh by the new svg(...) primitive
  // (runner 0.0.5). Stroked outlines (head ring + arc) become extruded
  // ribbons with \`depth\`; \`size\` sets its height in frame px. Big, in
  // front, translucent blue, turning on Y. One material + spin wraps it.
  let person = svg("""<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cfe0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21a8 8 0 0 1 8 -8"/><circle cx="10" cy="8" r="5"/></svg>""", depth: 80px, size: 820px)
            .material(fill: oklch(0.56, 0.15, 258),
                      metalness: 0.35,
                      roughness: 0.16,
                      opacity: 0.88,
                      emissive: oklch(0.50, 0.13, pickup),
                      emissive_intensity: 0.30)
            .rotate(x: wobble, y: spin)
            .scale(pulse)
            .translate(y: 40px);

  // ---- Prism fan -----------------------------------------------------
  // Seven spectral wedges share one apex at (0, -80) — the point just under
  // the mark — and fan down to the base at y = -600, tiling a wide span
  // (x: -760..760) so that, after the forward tilt below, the beams reach
  // the bottom frame edge and corners. Each wedge is an extruded triangle,
  // self-lit, its emissive crest staggered so a bright "switch-on" sweeps
  // the fan once per loop (wedge k peaks at k*(6/7)s).

  let i0 = animate { 0s => 2.2, 0.6s => 0.7, 5.4s => 0.7, 6s => 2.2 } with { repeat: forever };
  let i1 = animate { 0s => 0.7, 0.26s => 0.7, 0.86s => 2.2, 1.46s => 0.7, 6s => 0.7 } with { repeat: forever };
  let i2 = animate { 0s => 0.7, 1.11s => 0.7, 1.71s => 2.2, 2.31s => 0.7, 6s => 0.7 } with { repeat: forever };
  let i3 = animate { 0s => 0.7, 1.97s => 0.7, 2.57s => 2.2, 3.17s => 0.7, 6s => 0.7 } with { repeat: forever };
  let i4 = animate { 0s => 0.7, 2.83s => 0.7, 3.43s => 2.2, 4.03s => 0.7, 6s => 0.7 } with { repeat: forever };
  let i5 = animate { 0s => 0.7, 3.69s => 0.7, 4.29s => 2.2, 4.89s => 0.7, 6s => 0.7 } with { repeat: forever };
  let i6 = animate { 0s => 0.7, 4.54s => 0.7, 5.14s => 2.2, 5.74s => 0.7, 6s => 0.7 } with { repeat: forever };

  // The deployed viewer recentres every extruded path on its own bounding
  // box (geom.center()), so each wedge is translated back by its bbox
  // centre to restore the shared apex at (0,-80) and the tiled base at
  // y=-600. bbox-centre y is (-80 + -600)/2 = -340 for all; x varies.
  let w0 = extrude(path(points: [vec2(0, -80), vec2(-760, -600), vec2(-543, -600)]), depth: 8px).material(fill: oklch(0.66, 0.24, 25), emissive: oklch(0.66, 0.24, 25), emissive_intensity: gradient(top: 0.3, bottom: i0)).translate(x: -380.0px, y: -340.0px);
  let w1 = extrude(path(points: [vec2(0, -80), vec2(-543, -600), vec2(-326, -600)]), depth: 8px).material(fill: oklch(0.74, 0.2, 60), emissive: oklch(0.74, 0.2, 60), emissive_intensity: gradient(top: 0.3, bottom: i1)).translate(x: -271.4px, y: -340.0px);
  let w2 = extrude(path(points: [vec2(0, -80), vec2(-326, -600), vec2(-109, -600)]), depth: 8px).material(fill: oklch(0.88, 0.18, 98), emissive: oklch(0.88, 0.18, 98), emissive_intensity: gradient(top: 0.3, bottom: i2)).translate(x: -162.9px, y: -340.0px);
  let w3 = extrude(path(points: [vec2(0, -80), vec2(-109, -600), vec2(109, -600)]), depth: 8px).material(fill: oklch(0.74, 0.21, 150), emissive: oklch(0.74, 0.21, 150), emissive_intensity: gradient(top: 0.3, bottom: i3)).translate(x: 0.0px, y: -340.0px);
  let w4 = extrude(path(points: [vec2(0, -80), vec2(109, -600), vec2(326, -600)]), depth: 8px).material(fill: oklch(0.72, 0.16, 210), emissive: oklch(0.72, 0.16, 210), emissive_intensity: gradient(top: 0.3, bottom: i4)).translate(x: 162.9px, y: -340.0px);
  let w5 = extrude(path(points: [vec2(0, -80), vec2(326, -600), vec2(543, -600)]), depth: 8px).material(fill: oklch(0.62, 0.2, 265), emissive: oklch(0.62, 0.2, 265), emissive_intensity: gradient(top: 0.3, bottom: i5)).translate(x: 271.4px, y: -340.0px);
  let w6 = extrude(path(points: [vec2(0, -80), vec2(543, -600), vec2(760, -600)]), depth: 8px).material(fill: oklch(0.58, 0.23, 320), emissive: oklch(0.58, 0.23, 320), emissive_intensity: gradient(top: 0.3, bottom: i6)).translate(x: 380.0px, y: -340.0px);

  // ---- Lighting ------------------------------------------------------
  // A soft neutral key/fill for the mark's form, plus three coloured point
  // lights between the fan and the mark (toward the camera, z ≈ +300..340)
  // whose hues drift around the wheel out of phase — the prism colours
  // washing up onto the mark.
  let hueA = animate { 0s =>   0deg, 6s => 360deg } with { repeat: forever };
  let hueB = animate { 0s => 120deg, 6s => 480deg } with { repeat: forever };
  let hueC = animate { 0s => 240deg, 6s => 600deg } with { repeat: forever };

  let lights = [
    ambient(0.30),
    directional(from: vec3(2, 4, 6), intensity: 1.1),
    point(at: vec3(-260px, -150px, 300px), intensity: 0.9, range: 1100px, color: oklch(0.72, 0.18, hueA)),
    point(at: vec3(   0px, -120px, 340px), intensity: 0.8, range: 1100px, color: oklch(0.72, 0.18, hueB)),
    point(at: vec3( 260px, -150px, 300px), intensity: 0.9, range: 1100px, color: oklch(0.72, 0.18, hueC)),
    // Opt-in glow: a high threshold so only the brightest prism crest
    // blooms — keeps the haze off the matte background and the P, which
    // stays the crisp hero on top of a softly glowing beam.
    bloom(strength: 0.55, radius: 0.4, threshold: 0.72),
  ];

  // Tilt the whole fan toward the camera so the beam reads as coming at the
  // viewer. The group pivots about the world origin, which sits just above
  // the fan's apex, so the apex stays put and the base swings forward.
  let fan = compose [w0, w1, w2, w3, w4, w5, w6];

  compose [
    bg,
    render3d(
      compose [fan.rotate(x: -12deg), person],
      lights: lights,
      camera: camera(distance: 2166),
    ),
  ]
}
`;

// Hand-drawn -> 3D: vectorize() traces a raster line drawing to a uniform
// centreline and extrudes it, the bitmap counterpart to svg().
export const HANDDRAWN_SOURCE = `runner "0.0.13";

use std.shapes.*;
use std.scene3d.*;
use std.lighting.*;
use std.anim.*;

scene handdrawn(duration: Duration = 8s) -> Frame {
  let bg = rect(width: 1080px, height: 1080px, fill: oklch(0.10, 0.03, 280));

  // vectorize() traces a raster line drawing to a uniform single-line
  // centreline (binarize -> bridge gaps -> thin -> trace -> simplify) and
  // extrudes it just like svg(): one hand drawing -> a turning 3D mark.
  let spin = animate { 0s => -20deg, 4s => 20deg, 8s => -20deg } with { easing: easing.in_out_cubic };

  let mark = vectorize(image("/img/handdrawn.jpg"),
                       stroke_width: 8px, simplify: 2.0, bridge: 5, stitch: 110,
                       depth: 70px, size: 780px, round: 10px)
               .material(fill: oklch(0.72, 0.15, 250), metalness: 0.3, roughness: 0.3)
               .rotate(x: 12deg, y: spin);

  let lights = [
    ambient(0.5),
    directional(from: vec3(2, 3, 5), intensity: 1.4),
    point(at: vec3(-220px, 220px, 420px), intensity: 1.0),
  ];

  compose [ bg, render3d(mark, lights: lights, camera: camera(distance: 2166)) ]
}
`;
