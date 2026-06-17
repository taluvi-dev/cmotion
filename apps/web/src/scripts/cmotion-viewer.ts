// cmotion-viewer.ts
//
// Astro/web copy of the viewer half of cmotion's browser pipeline.
// Mirrors apps/cli/assets/viewer/cmotion-three.js but uses the npm
// three.js installed in apps/web (so it benefits from Vite's bundling
// + tree-shaking) instead of the vendored copy that the native
// `cmo open` ships.
//
// Anything we render here is derived from the JSON value tree the
// WASM produces — no DSL knowledge lives outside the wasm artifact —
// plus a JS-side font load (opentype.js + DM Sans Bold) so the viewer
// can resolve `text.glyph(...)` into a real outline.

import * as THREE from "three";
import * as opentype from "opentype.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

// ---- WASM bridge -------------------------------------------------

interface CmExports {
  memory: WebAssembly.Memory;
  cm_alloc(n: number): number;
  cm_free(ptr: number, n: number): void;
  get_version(out: number, cap: number): number;
  parse_eval(src: number, len: number): number;
  sample_at(handle: number, tNs: bigint, out: number, cap: number): number;
  release(handle: number): void;
}

async function loadWasm(): Promise<CmExports> {
  const stub = () => 0;
  const wasi = new Proxy({}, { get: () => stub });
  const resp = await fetch("/cmotion-render.wasm");
  if (!resp.ok) throw new Error(`could not fetch /cmotion-render.wasm: ${resp.status}`);
  const { instance } = await WebAssembly.instantiateStreaming(resp, {
    wasi_snapshot_preview1: wasi,
  });
  return instance.exports as unknown as CmExports;
}

function readString(exp: CmExports, ptr: number, len: number): string {
  return new TextDecoder().decode(new Uint8Array(exp.memory.buffer, ptr, len));
}

function getVersion(exp: CmExports): string {
  const cap = 64;
  const p = exp.cm_alloc(cap);
  const n = exp.get_version(p, cap);
  const v = readString(exp, p, n);
  exp.cm_free(p, cap);
  return v;
}

function parseEval(exp: CmExports, source: string): number {
  const enc = new TextEncoder().encode(source);
  const p = exp.cm_alloc(enc.length);
  new Uint8Array(exp.memory.buffer).set(enc, p);
  const h = exp.parse_eval(p, enc.length);
  exp.cm_free(p, enc.length);
  if (h === 0) throw new Error("parse_eval failed — fix syntax / eval errors in the source");
  return h;
}

function sample(exp: CmExports, handle: number, tSeconds: number): unknown {
  let cap = 64 * 1024;
  while (cap <= 4 * 1024 * 1024) {
    const p = exp.cm_alloc(cap);
    const tNs = BigInt(Math.floor(tSeconds * 1e9));
    const n = exp.sample_at(handle, tNs, p, cap);
    if (n === 0 && cap > 64 * 1024) {
      exp.cm_free(p, cap);
      cap *= 2;
      continue;
    }
    if (n === 0) throw new Error(`sample_at returned 0 at t=${tSeconds}s`);
    const json = readString(exp, p, n);
    exp.cm_free(p, cap);
    return JSON.parse(json);
  }
  throw new Error("sample_at output exceeded 4 MiB");
}

// ---- JSON value-tree helpers -------------------------------------

type JsonNode = any;

// Named fields keyed by name. Positional args (name === "") collide on the
// empty key, so use positionalArgs() for those.
function namedFields(node: JsonNode): Record<string, JsonNode> {
  const out: Record<string, JsonNode> = {};
  for (const f of node.fields ?? []) if (f.name) out[f.name] = f.value;
  return out;
}

function positionalArgs(node: JsonNode): JsonNode[] {
  return (node.fields ?? []).filter((f: any) => !f.name).map((f: any) => f.value);
}

function numberOf(v: JsonNode, fallback = 0): number {
  if (!v || v.kind !== "number") return fallback;
  return v.value;
}

// Returns degrees in radians for a number with unit "deg", or the raw
// value otherwise.
function angleRad(v: JsonNode, fallback = 0): number {
  if (!v || v.kind !== "number") return fallback;
  if (v.unit === "deg") return (v.value * Math.PI) / 180;
  return v.value;
}

function arrayElems(v: JsonNode): JsonNode[] {
  return v && v.kind === "array" ? v.elems : [];
}

// ---- OKLCH → linear sRGB ----------------------------------------
// Björn Ottosson's published conversion (same math as ScenePreview).

function oklchToLinearRgb(L: number, C: number, hDeg: number): [number, number, number] {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const lc = l_ ** 3, mc = m_ ** 3, sc = s_ ** 3;
  const r = +4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
  const g = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
  const bl = -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc;
  return [
    Math.max(0, Math.min(1, r)),
    Math.max(0, Math.min(1, g)),
    Math.max(0, Math.min(1, bl)),
  ];
}

function toThreeColor(v: JsonNode): THREE.Color {
  const c = new THREE.Color();
  if (!v || v.kind !== "color") return c;
  switch (v.form) {
    case "hex": {
      const d = String(v.digits || "ffffff");
      c.setStyle(`#${d}`);
      return c;
    }
    case "rgb":
      c.setRGB(numberOf(v.r), numberOf(v.g), numberOf(v.b));
      return c;
    case "oklch": {
      const [r, g, b] = oklchToLinearRgb(numberOf(v.l), numberOf(v.c), numberOf(v.h));
      c.setRGB(r, g, b, THREE.LinearSRGBColorSpace);
      return c;
    }
    default:
      return c;
  }
}

// ---- Texture loading --------------------------------------------
//
// Each `image("/path.jpg")` resolves to a Three.js texture loaded
// from /public via the WebGL texture loader, cached per-path. The
// loader is async — the texture object is returned immediately, with
// pixels arriving on the next render after the fetch completes.

const textureCache = new Map<string, THREE.Texture>();
const textureLoader = new THREE.TextureLoader();

function loadTexture(path: string): THREE.Texture {
  const cached = textureCache.get(path);
  if (cached) return cached;
  const tex = textureLoader.load(path);
  tex.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(path, tex);
  return tex;
}

// Walk an `as_texture(image(...))` (or a bare `image(...)`) and return
// the texture path, or null if the value isn't an image at all.
function imagePath(node: JsonNode): string | null {
  if (!node || node.kind !== "constructed") return null;
  if (node.name === "as_texture" || node.name === "fit") {
    return imagePath(positionalArgs(node)[0]);
  }
  if (node.name === "image") {
    const raw = positionalArgs(node)[0];
    if (!raw || raw.kind !== "string") return null;
    return String(raw.raw).replace(/^"|"$/g, "");
  }
  return null;
}

// ---- Font loading (for text.glyph) ------------------------------

let fontPromise: Promise<opentype.Font> | null = null;

// opentype.js v2 removed `load()`; the supported path is fetch → parse(buffer).
function loadFont(): Promise<opentype.Font> {
  if (!fontPromise) {
    fontPromise = fetch("/DMSans-Bold.ttf")
      .then((r) => {
        if (!r.ok) throw new Error(`font fetch failed: ${r.status}`);
        return r.arrayBuffer();
      })
      .then((buf) => opentype.parse(buf) as opentype.Font);
  }
  return fontPromise;
}

// Build extrude-ready THREE.Shapes for the whole string, laid out
// left-to-right by each glyph's advance. Routed through THREE.ShapePath
// so disjoint contours (the dot of an "i") and counters (the hole of an
// "o") are classified by containment — not the naive "first contour
// fills, the rest are holes", which drops the i's dot. Coordinates are
// em units (cap height ≈ 0.7), y-up; the caller scales as needed.
function stringShapes(font: opentype.Font, text: string): THREE.Shape[] {
  const sp = new THREE.ShapePath();
  let penX = 0;
  for (const ch of text) {
    const glyph = font.charToGlyph(ch);
    // fontSize = 1 → em coordinates, baseline at y=0, y-down; flip to y-up.
    for (const cmd of glyph.getPath(penX, 0, 1).commands) {
      switch (cmd.type) {
        case "M":
          sp.moveTo(cmd.x, -cmd.y);
          break;
        case "L":
          sp.lineTo(cmd.x, -cmd.y);
          break;
        case "Q":
          sp.quadraticCurveTo(cmd.x1, -cmd.y1, cmd.x, -cmd.y);
          break;
        case "C":
          sp.bezierCurveTo(cmd.x1, -cmd.y1, cmd.x2, -cmd.y2, cmd.x, -cmd.y);
          break;
      }
    }
    penX += (glyph.advanceWidth ?? font.unitsPerEm) / font.unitsPerEm;
  }
  // After the y-flip, solid contours wind clockwise → holes are CCW, so
  // `isCCW = false` marks the clockwise outlines as the filled shapes.
  return sp.toShapes(false);
}

// ---- 2D/3D translators -------------------------------------------

// Camera config is pinned here (mirrored at the `boot()` call site).
// pxToWorld is derived from the camera's vertical view extent so a
// background of <bgH> cmotion-px exactly fills the viewport height —
// i.e. `floor: -bgH/2` lands on the bottom edge of the image, not at
// 19 % of the way down.
const CAMERA_Z = 6;
const CAMERA_FOV_DEG = 28;
const VIEW_HEIGHT_WORLD = 2 * CAMERA_Z * Math.tan((CAMERA_FOV_DEG * Math.PI) / 360);

// Default assumes a 1080-px tall canvas (16:9). Overwritten by
// buildCompose once the bg's actual height is known.
let pxToWorld = VIEW_HEIGHT_WORLD / 1080;

interface BuildCtx {
  font: opentype.Font;
  lights: THREE.Light[];
  background: THREE.Color | THREE.Texture | null;
  glyphScale: number;
  // Set from the first rect layer's width/height — defines the
  // letterbox aspect of the rendered viewport.
  sceneAspect: number;
  // Opt-in bloom (set when a source puts `bloom(...)` in render3d's
  // lights). Null → the frame renders straight through the renderer,
  // byte-identical to pre-bloom runners; non-null routes through an
  // EffectComposer with an UnrealBloomPass. See applyFrame.
  bloom: { strength: number; radius: number; threshold: number } | null;
}

function makeCtx(font: opentype.Font): BuildCtx {
  return { font, lights: [], background: null, glyphScale: 2.5, sceneAspect: 16 / 9, bloom: null };
}

function buildRect(node: JsonNode): THREE.Object3D {
  const f = namedFields(node);
  const w = numberOf(f.width) * pxToWorld;
  const h = numberOf(f.height) * pxToWorld;
  const geom = new THREE.PlaneGeometry(w, h);
  const mat = new THREE.MeshBasicMaterial({ color: toThreeColor(f.fill) });
  return new THREE.Mesh(geom, mat);
}

function buildCircle(node: JsonNode): THREE.Object3D {
  const f = namedFields(node);
  const r = numberOf(f.radius) * pxToWorld;
  const geom = new THREE.CircleGeometry(r, 64);
  const mat = new THREE.MeshBasicMaterial({ color: toThreeColor(f.fill) });
  return new THREE.Mesh(geom, mat);
}

// sphere(r: <px>) → SphereGeometry with a placeholder white standard
// material. Wrap in `.material(...)` to fill or texture it. The
// geometry carries its source radius on `userData.radius_world` so
// `pivot` can find it without re-computing the bounding sphere.
function buildSphere(node: JsonNode): THREE.Object3D {
  const f = namedFields(node);
  const args = positionalArgs(node);
  const rPx = numberOf(f.r ?? f.radius ?? args[0], 50);
  const r = rPx * pxToWorld;
  const geom = new THREE.SphereGeometry(r, 64, 32);
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.userData.radiusWorld = r;
  return mesh;
}

// .pivot(anchor) — shift the inner object so the named anchor lands at
// the group's origin. Today only `bottom` is wired up: translate the
// inner up by its bounding radius, so subsequent transforms (squash,
// translate) pivot around the bottom of the geometry.
function buildPivot(node: JsonNode, ctx: BuildCtx): THREE.Object3D | null {
  const args = positionalArgs(node);
  const inner = buildLayer(args[0], ctx);
  if (!inner) return null;
  const anchor = args[1];
  const name = anchor?.kind === "constructed" ? anchor.name : null;
  const r = findRadius(inner);
  const group = new THREE.Group();
  if (name === "bottom") inner.position.y += r;
  else if (name === "top") inner.position.y -= r;
  else if (name === "left") inner.position.x += r;
  else if (name === "right") inner.position.x -= r;
  group.add(inner);
  group.userData.radiusWorld = r;
  return group;
}

function findRadius(obj: THREE.Object3D): number {
  if (typeof obj.userData?.radiusWorld === "number") return obj.userData.radiusWorld;
  let r = 0;
  obj.traverse((o: any) => {
    if (o.isMesh && o.geometry) {
      o.geometry.computeBoundingSphere?.();
      const s = o.geometry.boundingSphere?.radius ?? 0;
      if (s > r) r = s;
    }
  });
  return r;
}

// .squash(factor: f) — anisotropic scale that compresses y by `f` and
// expands x/z to roughly preserve volume. `f = 0` is a no-op; `f = 0.5`
// halves height and widens by ~1.41×. Negative factors stretch instead.
function buildSquash(node: JsonNode, ctx: BuildCtx): THREE.Object3D | null {
  const args = positionalArgs(node);
  const f = namedFields(node);
  const inner = buildLayer(args[0], ctx);
  if (!inner) return null;
  const factor = numberOf(f.factor ?? args[1], 0);
  const sy = Math.max(0.02, 1 - factor);
  const widen = factor >= 0 ? Math.sqrt(1 / sy) : 1 / Math.sqrt(Math.max(0.02, 1 + factor));
  inner.scale.x *= widen;
  inner.scale.y *= sy;
  inner.scale.z *= widen;
  return inner;
}

// .translate(x?, y?, z?) on a layer. px units → world units via pxToWorld
// (matches how rect/circle widths get scaled); unitless values pass
// through, which is what 3D scenes expect.
function buildTranslate(node: JsonNode, ctx: BuildCtx): THREE.Object3D | null {
  const args = positionalArgs(node);
  const f = namedFields(node);
  const inner = buildLayer(args[0], ctx);
  if (!inner) return null;
  const scale = (v: JsonNode): number => {
    if (!v || v.kind !== "number") return 0;
    return v.unit === "px" ? v.value * pxToWorld : v.value;
  };
  inner.position.x += scale(f.x);
  inner.position.y += scale(f.y);
  inner.position.z += scale(f.z);
  return inner;
}

// Read a single vec2(x, y) node into {x, y} (px, frame space). Accepts
// positional (vec2(100, 50)) and named (vec2(x: 100, y: 50)) forms.
function vec2Of(node: JsonNode): { x: number; y: number } | null {
  if (!node || node.kind !== "constructed" || node.name !== "vec2") return null;
  const f = namedFields(node);
  const pos = positionalArgs(node);
  const x = f.x ? numberOf(f.x) : numberOf(pos[0]);
  const y = f.y ? numberOf(f.y) : numberOf(pos[1]);
  return { x, y };
}

// path(points: [vec2(x, y), ...]) → an extruded solid. The polygon is a
// single closed contour in frame px; scale to world by pxToWorld so the
// path shares the pixel-honest frame the multi-letter title uses. Depth
// is in px → world. closed:false / <3 points produce nothing (cmo check
// flags them as LWR001 before render).
function buildExtrudePath(inner: JsonNode, depthPx: number): THREE.Mesh | null {
  const pf = namedFields(inner);
  const ppos = positionalArgs(inner);
  const ptsNode = pf.points ?? ppos.find((a) => a.kind === "array");
  const pts = arrayElems(ptsNode).map(vec2Of).filter((p): p is { x: number; y: number } => p !== null);
  if (pts.length < 3) {
    console.warn(`[cmotion-viewer] extrude(path): need ≥3 points, got ${pts.length}`);
    return null;
  }
  const shape = new THREE.Shape();
  shape.moveTo(pts[0].x * pxToWorld, pts[0].y * pxToWorld);
  for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i].x * pxToWorld, pts[i].y * pxToWorld);
  shape.closePath();

  const depth = depthPx * pxToWorld;
  const bevel = Math.max(depth * 0.1, 0.5 * pxToWorld);
  const geom = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 1,
  });
  geom.center();
  return new THREE.Mesh(geom, new THREE.MeshStandardMaterial({ color: 0xffffff }));
}

// extrude(shape, depth: ...). Shape is a positional first arg; supported
// shapes are `text.glyph(...)` (font outline) and `path(...)` (polygon).
function buildExtrude(node: JsonNode, ctx: BuildCtx): THREE.Mesh | null {
  const args = positionalArgs(node);
  const f = namedFields(node);
  const inner = args[0];
  if (inner && inner.kind === "constructed" && inner.name === "path") {
    return buildExtrudePath(inner, numberOf(f.depth, 16));
  }
  if (!inner || inner.kind !== "constructed" || inner.name !== "text.glyph") {
    console.warn(`[cmotion-viewer] extrude: unsupported inner ${inner?.name}`);
    return null;
  }
  const glyphArgs = positionalArgs(inner);
  const text = String(glyphArgs[0]?.raw ?? '""').replace(/^"|"$/g, "") || "?";
  const shapes = stringShapes(ctx.font, text);
  if (shapes.length === 0) return null;

  const depthPx = numberOf(f.depth, 16);

  // Explicit `size:` → pixel-honest sizing: a glyph's px height is a real
  // fraction of the 1080-px background, the same mapping the native
  // renderer gets from `camera(distance: 2166)`. This is what the
  // multi-letter title uses so its hand-placed `translate(x:)` advances
  // line up identically in both renderers. Without `size:` we fall back
  // to the standalone-glyph auto-fit (the homepage "C", unchanged).
  const sizeField = namedFields(inner).size;
  if (sizeField && sizeField.kind === "number") {
    // 1 em of shape → world: px × (unitsPerEm / (ascender−descender)) × pxToWorld.
    // The hhea metric matches stb_truetype's ScaleForPixelHeight basis.
    const hhea = (ctx.font as any).tables.hhea;
    const emFactor = ctx.font.unitsPerEm / (hhea.ascender - hhea.descender);
    const scale = sizeField.value * emFactor * pxToWorld;
    const depth = depthPx * pxToWorld;
    const bevel = depth * 0.3;
    const geom = new THREE.ExtrudeGeometry(shapes, {
      depth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel / scale, // xy bevel is in em (pre-scale); /scale → ≈ bevel world
      bevelSegments: 4,
      curveSegments: 32,
    });
    geom.scale(scale, scale, 1);
    geom.center();
    return new THREE.Mesh(geom, new THREE.MeshStandardMaterial({ color: 0xffffff }));
  }

  // Auto-fit fallback (no explicit size): the standalone homepage glyph.
  // depth in px → world units. Tuned so 16px ≈ 0.4 (matches ScenePreview).
  const depth = depthPx * 0.025;
  const geom = new THREE.ExtrudeGeometry(shapes, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 4,
    curveSegments: 32,
  });

  // Keep the per-glyph reference scale (cap height ≈ 0.7em → ≈ 1.75
  // world) unless the word is too wide for the frame, then shrink it to
  // span ~82 % of the viewport width. A single glyph (the homepage "C")
  // is below the threshold, so its size is unchanged.
  geom.computeBoundingBox();
  const bb = geom.boundingBox!;
  const wRaw = bb.max.x - bb.min.x; // em-space width, before scaling
  const maxW = VIEW_HEIGHT_WORLD * ctx.sceneAspect * 0.82;
  const scale = wRaw * ctx.glyphScale > maxW ? maxW / wRaw : ctx.glyphScale;
  geom.scale(scale, scale, 1);
  geom.center();

  // Placeholder material — replaced when wrapped in material(...).
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  return new THREE.Mesh(geom, mat);
}

// metaballs([blob(at: vec3, radius:), ...], smoothing: <px>) — a raymarched
// smooth-union SDF (lava-lamp blobs that merge/split). Rendered as a single
// fragment shader on a camera-facing quad that fills the viewport; misses are
// discarded so the scene background shows through. Blob centres/radii are px
// (1080-frame) → world via pxToWorld, so it shares the title's pixel-honest
// frame. `.material(fill, roughness, emissive)` feeds the shader uniforms
// (see buildMaterial); the warm key/fill/rim rig is baked.
const MAX_BLOBS = 24;

const METABALL_VERT = /* glsl */ `
  varying vec3 vWorldPos;
  void main() {
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const METABALL_FRAG = /* glsl */ `
  precision highp float;
  varying vec3 vWorldPos;
  uniform vec4 uBlobs[${MAX_BLOBS}];   // xyz = centre (world), w = radius (world)
  uniform int  uCount;
  uniform float uK;
  uniform vec3 uAlbedo;                 // linear
  uniform vec3 uRim;                    // linear
  uniform float uSpecExp;
  uniform vec3 uKeyDir;  uniform vec3 uKeyCol;
  uniform vec3 uFillDir; uniform vec3 uFillCol;

  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }
  float map(vec3 p) {
    float d = 1e9;
    for (int i = 0; i < ${MAX_BLOBS}; i++) {
      if (i >= uCount) break;
      d = smin(d, length(p - uBlobs[i].xyz) - uBlobs[i].w, uK);
    }
    return d;
  }
  vec3 calcNormal(vec3 p) {
    vec2 e = vec2(1.0, -1.0) * 0.0012;
    return normalize(
      e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) +
      e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx));
  }
  void main() {
    vec3 ro = cameraPosition;
    vec3 rd = normalize(vWorldPos - cameraPosition);
    float t = 0.0;
    bool hit = false;
    vec3 p;
    for (int i = 0; i < 180; i++) {
      p = ro + rd * t;
      float d = map(p);
      if (d < 0.0006) { hit = true; break; }
      t += d;
      if (t > 16.0) break;
    }
    if (!hit) discard;
    vec3 N = calcNormal(p);
    vec3 V = -rd;
    float dK = max(dot(N, uKeyDir), 0.0);
    float dF = max(dot(N, uFillDir), 0.0);
    vec3 H = normalize(uKeyDir + V);
    float spec = pow(max(dot(N, H), 0.0), uSpecExp);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.5);
    float amb = 0.10;
    vec3 col = uAlbedo * (amb + dK * uKeyCol + dF * uFillCol)
             + spec * 1.05
             + fres * uRim * 1.4;
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

function buildMetaballs(node: JsonNode, ctx: BuildCtx): THREE.Object3D | null {
  const f = namedFields(node);
  const args = positionalArgs(node);
  const blobNodes = arrayElems(f.blobs ?? args[0]);
  const blobs: THREE.Vector4[] = [];
  for (const bn of blobNodes) {
    if (bn?.kind !== "constructed" || bn.name !== "blob") continue;
    const bf = namedFields(bn);
    const at = bf.at?.kind === "constructed" && bf.at.name === "vec3"
      ? buildVec3(bf.at)
      : new THREE.Vector3();
    const r = numberOf(bf.radius, 100) * pxToWorld;
    blobs.push(new THREE.Vector4(at.x * pxToWorld, at.y * pxToWorld, at.z * pxToWorld, r));
    if (blobs.length >= MAX_BLOBS) break;
  }
  if (blobs.length === 0) return null;
  const padded = blobs.slice();
  while (padded.length < MAX_BLOBS) padded.push(new THREE.Vector4(0, 0, 0, 0));

  const mat = new THREE.ShaderMaterial({
    vertexShader: METABALL_VERT,
    fragmentShader: METABALL_FRAG,
    uniforms: {
      uBlobs: { value: padded },
      uCount: { value: blobs.length },
      uK: { value: numberOf(f.smoothing, 80) * pxToWorld },
      uAlbedo: { value: new THREE.Color(0.40, 0.035, 0.012) },
      uRim: { value: new THREE.Color(1.0, 0.45, 0.10) },
      uSpecExp: { value: 80 },
      uKeyDir: { value: new THREE.Vector3(-0.45, 0.8, 0.5).normalize() },
      uKeyCol: { value: new THREE.Color(1.0, 0.5, 0.22) },
      uFillDir: { value: new THREE.Vector3(0.6, -0.3, 0.5).normalize() },
      uFillCol: { value: new THREE.Color(0.9, 0.25, 0.08) },
    },
  });

  // A camera-facing quad 1 unit in front of the camera, sized to fill the
  // viewport, so every screen pixel casts a ray. Geometry depth is irrelevant
  // (the surface is found by marching); misses discard to the background.
  const dist = 1.0;
  const qh = 2 * dist * Math.tan((CAMERA_FOV_DEG * Math.PI) / 360);
  const qw = qh * ctx.sceneAspect;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(qw, qh), mat);
  mesh.position.set(0, 0, CAMERA_Z - dist);
  mesh.frustumCulled = false;
  mesh.renderOrder = 1;
  mesh.userData.raymarch = true;
  return mesh;
}

function buildMaterial(node: JsonNode, ctx: BuildCtx): THREE.Object3D | null {
  const args = positionalArgs(node);
  const f = namedFields(node);
  const inner = buildLayer(args[0], ctx);
  if (!inner) return null;

  // Raymarched metaballs carry a ShaderMaterial — feed its uniforms instead of
  // replacing it with a MeshStandardMaterial. fill → albedo, emissive → rim
  // glow, roughness → specular sharpness.
  if ((inner as any).userData?.raymarch && (inner as THREE.Mesh).material) {
    const u = ((inner as THREE.Mesh).material as THREE.ShaderMaterial).uniforms;
    if (f.fill) u.uAlbedo.value = toThreeColor(f.fill).convertSRGBToLinear();
    if (f.emissive) u.uRim.value = toThreeColor(f.emissive).convertSRGBToLinear();
    if (f.roughness) u.uSpecExp.value = THREE.MathUtils.lerp(100, 16, numberOf(f.roughness, 0.2));
    return inner;
  }
  // `fill: image(...).as_texture(...)` resolves to a texture map; everything
  // else falls back to a flat colour. SphereGeometry's default UVs are
  // already equirectangular, so `projection: equirectangular` is a no-op for
  // the only mesh we accept here.
  // `emissive_intensity:` is normally a number, but it can be a
  // `gradient(top:, bottom:)` for a vertical emissive ramp (e.g. a
  // prism beam that's dim at its apex and bright at its base). When it
  // is, the base intensity is 1 and the ramp is applied in-shader below.
  const eiNode = f.emissive_intensity;
  const eiGradient =
    eiNode && eiNode.kind === "constructed" && eiNode.name === "gradient" ? eiNode : null;

  const fillTexture = imagePath(f.fill);
  const opts: THREE.MeshStandardMaterialParameters = {
    metalness: numberOf(f.metalness, 0),
    roughness: numberOf(f.roughness, 1),
    emissive: toThreeColor(f.emissive),
    emissiveIntensity: eiGradient ? 1 : numberOf(f.emissive_intensity, 0),
  };
  if (fillTexture) {
    opts.color = 0xffffff;
    opts.map = loadTexture(fillTexture);
  } else {
    opts.color = toThreeColor(f.fill);
  }
  // `opacity:` (0..1) makes a material translucent (e.g. a glassy P that
  // lets the prism behind it show through). Absent / 1 → fully opaque,
  // so existing sources are unaffected.
  const opacity = numberOf(f.opacity, 1);
  if (opacity < 1) {
    opts.transparent = true;
    opts.opacity = opacity;
  }
  const mat = new THREE.MeshStandardMaterial(opts);
  if (eiGradient) applyEmissiveRamp(inner, mat, eiGradient);
  inner.traverse((o: any) => {
    if (o.isMesh) {
      o.material?.dispose?.();
      o.material = mat;
    }
  });
  return inner;
}

// Ramp a material's emissive along the mesh's local Y, from `bottom`
// intensity at the geometry's lowest point to `top` at its highest.
// Implemented as a small injection into MeshStandardMaterial's shader so
// it composes with the standard lighting/emissive path (and with bloom).
// The geometry is already centred (buildExtrude* call geom.center()), so
// local Y is symmetric about 0; we read the real bounds off the mesh.
function applyEmissiveRamp(inner: THREE.Object3D, mat: THREE.MeshStandardMaterial, node: JsonNode): void {
  const gf = namedFields(node);
  const topI = numberOf(gf.top, 1);
  const bottomI = numberOf(gf.bottom, 1);
  let minY = Infinity;
  let maxY = -Infinity;
  inner.traverse((o: any) => {
    if (o.isMesh && o.geometry) {
      o.geometry.computeBoundingBox?.();
      const bb = o.geometry.boundingBox;
      if (bb) {
        minY = Math.min(minY, bb.min.y);
        maxY = Math.max(maxY, bb.max.y);
      }
    }
  });
  if (!isFinite(minY) || !isFinite(maxY) || maxY - minY < 1e-6) return;
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uRampTop = { value: topI };
    shader.uniforms.uRampBottom = { value: bottomI };
    shader.uniforms.uRampMinY = { value: minY };
    shader.uniforms.uRampMaxY = { value: maxY };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying float vRampY;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\n  vRampY = position.y;");
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        "#include <common>\nvarying float vRampY;\nuniform float uRampTop;\nuniform float uRampBottom;\nuniform float uRampMinY;\nuniform float uRampMaxY;",
      )
      .replace(
        "#include <emissivemap_fragment>",
        "#include <emissivemap_fragment>\n  float _ramp = clamp((vRampY - uRampMinY) / max(1e-4, (uRampMaxY - uRampMinY)), 0.0, 1.0);\n  totalEmissiveRadiance *= mix(uRampBottom, uRampTop, _ramp);",
      );
  };
  mat.needsUpdate = true;
}

function buildRotate(node: JsonNode, ctx: BuildCtx): THREE.Object3D | null {
  const args = positionalArgs(node);
  const f = namedFields(node);
  const inner = buildLayer(args[0], ctx);
  if (!inner) return null;
  inner.rotation.x = angleRad(f.x);
  inner.rotation.y = angleRad(f.y);
  inner.rotation.z = angleRad(f.z);
  return inner;
}

function buildScale(node: JsonNode, ctx: BuildCtx): THREE.Object3D | null {
  const args = positionalArgs(node);
  const inner = buildLayer(args[0], ctx);
  if (!inner) return null;
  const s = numberOf(args[1], 1);
  inner.scale.set(s, s, s);
  return inner;
}

function buildVec3(node: JsonNode): THREE.Vector3 {
  const args = positionalArgs(node);
  return new THREE.Vector3(numberOf(args[0]), numberOf(args[1]), numberOf(args[2]));
}

// Optional `color:`/`tint:` on a light (white when absent). Animated
// colours arrive already sampled to a concrete value at the current t.
function lightColor(node: JsonNode): THREE.Color {
  const f = namedFields(node);
  const c = f.color ?? f.tint;
  return c ? toThreeColor(c) : new THREE.Color(0xffffff);
}

function buildAmbient(node: JsonNode): THREE.Light {
  const f = namedFields(node);
  const intensity = numberOf(positionalArgs(node)[0] ?? f.intensity, 0.3);
  return new THREE.AmbientLight(lightColor(node), intensity);
}

function buildDirectional(node: JsonNode): THREE.Light {
  const f = namedFields(node);
  const from = f.from?.kind === "constructed" && f.from.name === "vec3"
    ? buildVec3(f.from)
    : new THREE.Vector3(0, 1, 0);
  const intensity = numberOf(f.intensity, 1);
  const light = new THREE.DirectionalLight(lightColor(node), intensity);
  light.position.copy(from);
  return light;
}

// spotlight(at: vec3, intensity:, range:, color:?) — a positional pool with
// distance falloff (the title's drifting highlight). px → world via pxToWorld;
// physical decay localises it so it brightens letters near `at` and fades out.
function buildPointLight(node: JsonNode): THREE.Light {
  const f = namedFields(node);
  const at = (f.at ?? f.position)?.kind === "constructed" && (f.at ?? f.position)!.name === "vec3"
    ? buildVec3(f.at ?? f.position)
    : new THREE.Vector3();
  const range = numberOf(f.range, 600) * pxToWorld;
  const light = new THREE.PointLight(lightColor(node), numberOf(f.intensity, 1), range, 2);
  light.position.set(at.x * pxToWorld, at.y * pxToWorld, at.z * pxToWorld);
  return light;
}

function buildRender3d(node: JsonNode, ctx: BuildCtx): THREE.Object3D | null {
  const args = positionalArgs(node);
  const f = namedFields(node);
  const lightNodes = arrayElems(f.lights);
  for (const ln of lightNodes) {
    if (ln?.kind !== "constructed") continue;
    if (ln.name === "ambient") ctx.lights.push(buildAmbient(ln));
    else if (ln.name === "directional") ctx.lights.push(buildDirectional(ln));
    else if (ln.name === "spotlight" || ln.name === "point") ctx.lights.push(buildPointLight(ln));
    // `bloom(strength:, radius:, threshold:)` rides in the lights list as
    // an opt-in post-process: it doesn't add a scene light, it flags the
    // frame to render through the bloom composer. Threshold picks which
    // luminance blooms (emissive prism, not the matte background).
    else if (ln.name === "bloom") {
      const bf = namedFields(ln);
      ctx.bloom = {
        strength: numberOf(bf.strength, 0.8),
        radius: numberOf(bf.radius, 0.4),
        threshold: numberOf(bf.threshold, 0.6),
      };
    }
  }
  return buildLayer(args[0], ctx);
}

// Read a string node, stripping either """triple""" or "normal" quotes.
// The value tree carries the raw source slice (JSON-escaped), so a
// triple-quoted SVG/JSON blob arrives here verbatim.
function svgStringOf(node: JsonNode | undefined): string | null {
  if (!node || node.kind !== "string" || typeof (node as any).raw !== "string") return null;
  const r = (node as any).raw as string;
  if (r.length >= 6 && r.startsWith('"""') && r.endsWith('"""')) return r.slice(3, -3);
  if (r.length >= 2 && r.startsWith('"') && r.endsWith('"')) return r.slice(1, -1);
  return r;
}

function ringArea(r: THREE.Vector2[]): number {
  let a = 0;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) a += (r[j].x + r[i].x) * (r[j].y - r[i].y);
  return a / 2;
}

// Append a round-cap / round-join arc (radius hw, around `center`) from point
// `from` to point `to`, sweeping through the `outward` side.
function arcTo(out: THREE.Vector2[], center: THREE.Vector2, from: THREE.Vector2, to: THREE.Vector2, outward: THREE.Vector2, segs = 8): void {
  const start = Math.atan2(from.y - center.y, from.x - center.x);
  const end = Math.atan2(to.y - center.y, to.x - center.x);
  const ao = Math.atan2(outward.y, outward.x);
  const hw = from.distanceTo(center);
  let delta = end - start;
  while (delta <= -Math.PI) delta += 2 * Math.PI;
  while (delta > Math.PI) delta -= 2 * Math.PI;
  const norm = (x: number) => { let d = x - ao; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return Math.abs(d); };
  if (norm(start + delta / 2) > Math.PI / 2) delta += delta > 0 ? -2 * Math.PI : 2 * Math.PI;
  for (let k = 1; k < segs; k++) {
    const a = start + (delta * k) / segs;
    out.push(new THREE.Vector2(center.x + hw * Math.cos(a), center.y + hw * Math.sin(a)));
  }
}

// Convert a stroked polyline (centreline `pts`, half-width `hw`) into its
// outline polygon(s) — the same thing the SVG renderer fills along a stroke.
// Offsets each vertex by its (mitred, clamped) normal to get left/right
// edges; open paths get round caps, closed paths become an outer ring + an
// inner hole. The result is a clean simple loop, so feeding it to
// ExtrudeGeometry yields a watertight OUTLINE solid (not a filled blob).
function strokeOutline(pts: THREE.Vector2[], hw: number, closed: boolean): { contour: THREE.Vector2[]; holes: THREE.Vector2[][] } | null {
  const P: THREE.Vector2[] = [];
  for (const p of pts) if (!P.length || P[P.length - 1].distanceTo(p) > 1e-6) P.push(p.clone());
  if (closed && P.length > 1 && P[0].distanceTo(P[P.length - 1]) < 1e-6) P.pop();
  const n = P.length;
  if (n < 2) return null;

  const m = closed ? n : n - 1;
  const segN: THREE.Vector2[] = [];
  for (let i = 0; i < m; i++) {
    const a = P[i], b = P[(i + 1) % n];
    const d = b.clone().sub(a).normalize();
    segN.push(new THREE.Vector2(-d.y, d.x)); // left-hand normal
  }
  const vnorm = (i: number): THREE.Vector2 => {
    let nA: THREE.Vector2, nB: THREE.Vector2;
    if (closed) { nA = segN[(i - 1 + m) % m]; nB = segN[i % m]; }
    else if (i === 0) { nA = nB = segN[0]; }
    else if (i === n - 1) { nA = nB = segN[m - 1]; }
    else { nA = segN[i - 1]; nB = segN[i]; }
    const mit = nA.clone().add(nB);
    if (mit.lengthSq() < 1e-9) return nB.clone();
    mit.normalize();
    return mit.multiplyScalar(1 / Math.max(0.25, mit.dot(nB)));
  };

  const left: THREE.Vector2[] = [], right: THREE.Vector2[] = [];
  for (let i = 0; i < n; i++) {
    const o = vnorm(i).multiplyScalar(hw);
    left.push(P[i].clone().add(o));
    right.push(P[i].clone().sub(o));
  }

  if (closed) {
    const outer = Math.abs(ringArea(left)) >= Math.abs(ringArea(right)) ? left : right;
    const inner = outer === left ? right : left;
    return { contour: outer, holes: [inner.slice().reverse()] };
  }

  const dirStart = P[1].clone().sub(P[0]).normalize();
  const dirEnd = P[n - 1].clone().sub(P[n - 2]).normalize();
  const loop: THREE.Vector2[] = [...left];
  arcTo(loop, P[n - 1], left[n - 1], right[n - 1], dirEnd);              // end cap
  for (let i = n - 1; i >= 0; i--) loop.push(right[i]);
  arcTo(loop, P[0], right[0], left[0], dirStart.clone().multiplyScalar(-1)); // start cap
  return { contour: loop, holes: [] };
}

// Core SVG → solid geometry, in absolute units: centred at the origin,
// `sizeUnits` tall, `depthUnits` thick (Y-flipped from SVG's y-down). Shared
// by the in-scene svg() primitive (world units via pxToWorld) and svgToGlb()
// (caller's units).
//
// Glyph principle: collect THREE.Shapes and hand them to ExtrudeGeometry (the
// same call that extrudes glyphs) for a watertight solid. Filled paths become
// shapes via SVGLoader.createShapes; stroked paths (lucide icons) are turned
// into their OUTLINE shapes via strokeOutline so they extrude as outlines, not
// filled blobs. y is negated at the shape so the extrude keeps a right-handed
// basis (correct normals), like the glyph builder's font y-flip.
function svgMeshGeometry(src: string, depthUnits: number, sizeUnits: number, roundUnits = 0): THREE.BufferGeometry | null {
  let data: ReturnType<SVGLoader["parse"]>;
  try { data = new SVGLoader().parse(src); }
  catch (e) { console.warn("[cmotion-viewer] svg(): parse failed", e); return null; }

  const polys: { contour: THREE.Vector2[]; holes: THREE.Vector2[][] }[] = [];
  for (const path of data.paths) {
    const style: any = (path as any).userData?.style ?? {};
    const hasFill = style.fill && style.fill !== "none";
    const hasStroke = style.stroke && style.stroke !== "none";
    if (hasFill || (!hasFill && !hasStroke)) {
      for (const shape of SVGLoader.createShapes(path)) {
        const ep = shape.extractPoints(24);
        if (ep.shape.length >= 3) polys.push({ contour: ep.shape, holes: ep.holes });
      }
    }
    if (hasStroke) {
      const hw = (typeof style.strokeWidth === "number" ? style.strokeWidth : 1) / 2;
      for (const sub of path.subPaths) {
        const pts = sub.getPoints(24);
        if (pts.length < 2) continue;
        const closed = pts[0].distanceTo(pts[pts.length - 1]) < 1e-3;
        const o = strokeOutline(pts, hw, closed);
        if (o) polys.push(o);
      }
    }
  }
  if (polys.length === 0) { console.warn("[cmotion-viewer] svg(): nothing to render"); return null; }

  const shapes: THREE.Shape[] = [];
  for (const p of polys) {
    if (p.contour.length < 3) continue;
    const sh = new THREE.Shape(p.contour.map((v) => new THREE.Vector2(v.x, -v.y)));
    for (const hole of p.holes) if (hole.length >= 3) sh.holes.push(new THREE.Path(hole.map((v) => new THREE.Vector2(v.x, -v.y))));
    shapes.push(sh);
  }
  if (shapes.length === 0) return null;

  // `round` bevels the extruded edges: 0 = square ("qube") edges; as it grows
  // toward depth/2 the cross-section rounds off toward a tube. The bevel adds
  // 2×thickness in z, so shrink the straight depth to keep total = depthUnits.
  const r = Math.max(0, Math.min(roundUnits, depthUnits / 2 - 1e-4));
  const extrudeOpts: THREE.ExtrudeGeometryOptions = r > 1e-6
    ? { depth: depthUnits - 2 * r, bevelEnabled: true, bevelThickness: r, bevelSize: r, bevelOffset: 0, bevelSegments: 6, steps: 1 }
    : { depth: depthUnits, bevelEnabled: false, steps: 1 };
  const geom = new THREE.ExtrudeGeometry(shapes, extrudeOpts);
  geom.computeBoundingBox();
  const bb = geom.boundingBox!;
  const h = Math.max(1e-4, bb.max.y - bb.min.y);
  const cx = (bb.max.x + bb.min.x) / 2;
  const cy = (bb.max.y + bb.min.y) / 2;
  geom.translate(-cx, -cy, -depthUnits / 2);
  const s = sizeUnits / h;
  geom.scale(s, s, 1);
  return geom;
}

function buildSvg(node: JsonNode): THREE.Object3D | null {
  const f = namedFields(node);
  const args = positionalArgs(node);
  const src = svgStringOf(f.source ?? args[0]);
  if (!src) { console.warn("[cmotion-viewer] svg(): missing source string"); return null; }
  const geom = svgMeshGeometry(src, numberOf(f.depth, 16) * pxToWorld, numberOf(f.size, 400) * pxToWorld, numberOf(f.round, 0) * pxToWorld);
  if (!geom) return null;
  return new THREE.Mesh(geom, new THREE.MeshStandardMaterial({ color: 0xffffff }));
}

// Standalone SVG → glTF-binary (.glb) export. Builds the same solid the
// svg() primitive renders and serialises it to a .glb byte array via
// three's GLTFExporter — no canvas/WebGL/wasm needed, so the render
// container can call it headlessly for POST /v1/mesh. `depth`/`size` are
// in mesh units (the icon ends up `size` tall, `depth` thick). `round` bevels
// the edges (0 = square, → depth/2 rounds toward a tube).
export async function svgToGlb(src: string, depth = 0.4, size = 2, round = 0): Promise<Uint8Array> {
  const geom = svgMeshGeometry(src, depth, size, round);
  if (!geom) throw new Error("svg(): nothing to export");
  const mesh = new THREE.Mesh(geom, new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.2, roughness: 0.5, side: THREE.DoubleSide }));
  const scene = new THREE.Scene();
  scene.add(mesh);
  const exporter = new GLTFExporter();
  const result = await exporter.parseAsync(scene, { binary: true });
  return new Uint8Array(result as ArrayBuffer);
}

// Dispatches on a single value-tree node. `compose` is handled separately
// because it owns the bg→background promotion.
function buildLayer(node: JsonNode, ctx: BuildCtx): THREE.Object3D | null {
  if (!node || node.kind !== "constructed") return null;
  switch (node.name) {
    case "compose": {
      // A `compose [...]` nested inside render3d groups several 3D objects
      // (e.g. one extrude per letter) under one camera + light rig. The
      // top-level compose is handled by buildCompose (bg promotion); this
      // branch is the plain-group case.
      const group = new THREE.Group();
      for (const layer of arrayElems(namedFields(node).layers)) {
        const obj = buildLayer(layer, ctx);
        if (obj) group.add(obj);
      }
      return group;
    }
    case "rect":
      return buildRect(node);
    case "circle":
      return buildCircle(node);
    case "sphere":
      return buildSphere(node);
    case "metaballs":
      return buildMetaballs(node, ctx);
    case "render3d":
      return buildRender3d(node, ctx);
    case "extrude":
      return buildExtrude(node, ctx);
    case "svg":
      return buildSvg(node);
    case "material":
      return buildMaterial(node, ctx);
    case "rotate":
      return buildRotate(node, ctx);
    case "scale":
      return buildScale(node, ctx);
    case "translate":
      return buildTranslate(node, ctx);
    case "pivot":
      return buildPivot(node, ctx);
    case "squash":
      return buildSquash(node, ctx);
    // `image`, `fit`, `as_texture` only render as part of a material's
    // `fill` slot or as the first layer of `compose` (background) — see
    // buildMaterial and buildCompose. Reaching them via buildLayer means
    // they were placed somewhere the viewer can't render them yet.
    case "image":
    case "fit":
    case "as_texture":
      console.warn(`[cmotion-viewer] "${node.name}" only renders as a material fill or compose background`);
      return null;
    default:
      console.warn(`[cmotion-viewer] no translator for "${node.name}"`);
      return null;
  }
}

function buildCompose(node: JsonNode, ctx: BuildCtx): THREE.Object3D {
  const group = new THREE.Group();
  const layers = arrayElems(namedFields(node).layers);
  const head = layers[0];
  if (head?.kind === "constructed" && head.name === "rect") {
    const bgFields = namedFields(head);
    const bgW = numberOf(bgFields.width, 1920);
    const bgH = numberOf(bgFields.height, 1080);
    // pxToWorld pinned so bgH cmotion-px = camera view height: a layer
    // at y = ±bgH/2 lands on the top/bottom edge of the image.
    pxToWorld = VIEW_HEIGHT_WORLD / (bgH > 0 ? bgH : 1080);
    ctx.sceneAspect = bgH > 0 ? bgW / bgH : 16 / 9;
    // Promote the first full-bleed rect to the scene background.
    ctx.background = toThreeColor(bgFields.fill);
  } else if (head?.kind === "constructed" && (head.name === "fit" || head.name === "image")) {
    // Image used as a layer — load as a scene background texture.
    // No size info on `image(path)` alone, so fall back to the default
    // 1080-px tall, 16:9 canvas.
    const path = imagePath(head);
    if (path) {
      pxToWorld = VIEW_HEIGHT_WORLD / 1080;
      ctx.sceneAspect = 16 / 9;
      ctx.background = loadTexture(path);
    }
  }
  layers.forEach((layer, i) => {
    // Skip the layer we just promoted to background.
    if (i === 0 && ctx.background) return;
    const obj = buildLayer(layer, ctx);
    if (!obj) return;
    group.add(obj);
  });
  return group;
}

// ---- Duration extraction -----------------------------------------

export function detectDurationSeconds(source: string, fallback = 6): number {
  const re = /\bduration\b\s*(?::\s*Duration)?\s*=\s*(\d+(?:\.\d+)?)\s*(s|ms|m)\b/i;
  const m = source.match(re);
  if (!m) return fallback;
  const v = parseFloat(m[1]);
  switch (m[2].toLowerCase()) {
    case "ms": return v / 1000;
    case "m": return v * 60;
    default: return v;
  }
}

// ---- Public viewer -----------------------------------------------

export interface ViewerHandle {
  load(source: string): void;
  seek(t: number): void;
  resize(): void;
  durationSeconds: number;
  versions: { cmotion: string; three: string };
  captureFrame(): Promise<Blob | null>;
  captureClip(opts?: {
    duration?: number;
    fps?: number;
    onProgress?: (t: number) => void;
  }): Promise<{ blob: Blob; ext: string; mime: string }>;
  destroy(): void;
}

export async function boot(canvas: HTMLCanvasElement): Promise<ViewerHandle> {
  const [exp, font] = await Promise.all([loadWasm(), loadFont()]);
  const interpVersion = getVersion(exp);
  let handle = 0;
  let currentRoot: THREE.Object3D | null = null;
  let currentLights: THREE.Light[] = [];
  let durationSeconds = 6;
  let lastT = 0;
  // Scene's intended viewport aspect (set from the first rect's width/height
  // in buildCompose). 16:9 by default to match the cmotion taste sample.
  let sceneAspect = 16 / 9;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const camera = new THREE.PerspectiveCamera(CAMERA_FOV_DEG, sceneAspect, 0.1, 100);
  camera.position.set(0, 0, CAMERA_Z);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Bloom is opt-in (a `bloom(...)` entry in render3d's lights). When off,
  // we render straight through the renderer so non-bloom sources stay
  // byte-identical to earlier runners. When on, we route through an
  // EffectComposer (RenderPass → UnrealBloomPass → OutputPass). The
  // composer is built lazily on first use and reused.
  let composer: EffectComposer | null = null;
  let bloomPass: UnrealBloomPass | null = null;
  let currentBloom: BuildCtx["bloom"] = null;

  function ensureComposer(): EffectComposer {
    if (!composer) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.8, 0.4, 0.6);
      composer.addPass(bloomPass);
      composer.addPass(new OutputPass());
      const sz = renderer.getSize(new THREE.Vector2());
      composer.setSize(sz.x, sz.y);
    }
    return composer;
  }

  function renderScene() {
    if (currentBloom) {
      const c = ensureComposer();
      if (bloomPass) {
        bloomPass.strength = currentBloom.strength;
        bloomPass.radius = currentBloom.radius;
        bloomPass.threshold = currentBloom.threshold;
      }
      c.render();
    } else {
      renderer.render(scene, camera);
    }
  }

  // Letterbox the canvas inside its parent: largest box matching sceneAspect
  // that fits the available area (minus the stage's CSS padding).
  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const cs = getComputedStyle(parent);
    const padX = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
    const padY = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
    const availW = parent.clientWidth - padX;
    const availH = parent.clientHeight - padY;
    if (availW <= 0 || availH <= 0) return;
    let w = availW;
    let h = w / sceneAspect;
    if (h > availH) {
      h = availH;
      w = h * sceneAspect;
    }
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    renderer.setSize(w, h, false);
    composer?.setSize(w, h);
    camera.aspect = sceneAspect;
    camera.updateProjectionMatrix();
    // Re-render at the last applied time so the new size shows correct
    // pixels immediately (otherwise we wait for the next applyFrame).
    if (handle) renderScene();
  }
  // Observe the parent — the canvas is sized by us, so observing it would
  // race with our own updates.
  const ro = new ResizeObserver(resize);
  if (canvas.parentElement) ro.observe(canvas.parentElement);
  resize();

  function clearRoot() {
    if (currentRoot) {
      scene.remove(currentRoot);
      currentRoot.traverse((o: any) => {
        o.geometry?.dispose?.();
        const m = o.material;
        if (Array.isArray(m)) m.forEach((mm) => mm?.dispose?.());
        else m?.dispose?.();
      });
      currentRoot = null;
    }
    for (const l of currentLights) scene.remove(l);
    currentLights = [];
  }

  function applyFrame(t: number) {
    if (!handle) return;
    lastT = t;
    const tree = sample(exp, handle, t) as JsonNode;
    const ctx = makeCtx(font);
    let root: THREE.Object3D | null = null;
    if (tree?.kind === "constructed" && tree.name === "compose") {
      root = buildCompose(tree, ctx);
    } else {
      root = buildLayer(tree, ctx);
    }
    clearRoot();
    if (ctx.background) scene.background = ctx.background;
    for (const l of ctx.lights) {
      scene.add(l);
      currentLights.push(l);
    }
    if (root) {
      scene.add(root);
      currentRoot = root;
    }
    currentBloom = ctx.bloom;
    if (Math.abs(ctx.sceneAspect - sceneAspect) > 1e-6) {
      sceneAspect = ctx.sceneAspect;
      resize();
    }
    renderScene();
  }

  function load(source: string) {
    if (handle) {
      exp.release(handle);
      handle = 0;
    }
    handle = parseEval(exp, source);
    durationSeconds = detectDurationSeconds(source);
    applyFrame(0);
  }

  return {
    load,
    seek: applyFrame,
    resize,
    get durationSeconds() {
      return durationSeconds;
    },
    versions: { cmotion: interpVersion, three: THREE.REVISION },
    captureFrame() {
      // Re-render in the same tick as toBlob — even with preserveDrawingBuffer
      // the WebGL back buffer can be undefined between paints, so we redraw
      // immediately before reading it out.
      applyFrame(lastT);
      return new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png"),
      );
    },
    captureClip(opts: { duration?: number; fps?: number; onProgress?: (t: number) => void } = {}) {
      const duration = opts.duration ?? durationSeconds;
      const fps = opts.fps ?? 30;
      const onProgress = opts.onProgress;
      // iOS (all iPad/iPhone browsers use WebKit) can't play WebM and its
      // MediaRecorder only outputs MP4, so we hard-skip WebM there. Elsewhere
      // (Chromium/Firefox desktop) WebM/VP9 is the most reliable canvas
      // encoder — Chrome desktop reports MP4 support but often emits 0-byte
      // clips, so MP4 is the last-resort fallback.
      const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1);
      const candidates = isiOS
        ? ["video/mp4;codecs=avc1.42E01E", "video/mp4;codecs=avc1", "video/mp4"]
        : [
            "video/webm;codecs=vp9",
            "video/webm;codecs=vp8",
            "video/webm",
            "video/mp4;codecs=avc1.42E01E",
            "video/mp4;codecs=avc1",
            "video/mp4",
          ];
      const mime = candidates.find((m) => MediaRecorder.isTypeSupported(m));
      if (!mime) {
        return Promise.reject(new Error("no supported video codec in this browser"));
      }
      const ext = mime.startsWith("video/mp4") ? "mp4" : "webm";
      // The "clean" MIME (no ;codecs= params) is what we put on the resulting
      // Blob — browsers handle plain video/webm in the download UI correctly,
      // but codec-tagged MIMEs sometimes bypass the save dialog.
      const cleanMime = mime.split(";")[0];
      const stream = canvas.captureStream(fps);
      const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 8_000_000 });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      return new Promise<{ blob: Blob; ext: string; mime: string }>((resolve, reject) => {
        rec.onerror = (e) => reject(new Error(`MediaRecorder error: ${(e as any).error?.name ?? "unknown"}`));
        rec.onstop = () => resolve({ blob: new Blob(chunks, { type: cleanMime }), ext, mime: cleanMime });
        rec.start(250);
        const t0 = performance.now();
        const tick = () => {
          const elapsed = (performance.now() - t0) / 1000;
          if (elapsed >= duration) {
            try { applyFrame(duration); onProgress?.(duration); } catch {}
            setTimeout(() => rec.stop(), 100);
            return;
          }
          try {
            applyFrame(elapsed);
            onProgress?.(elapsed);
          } catch (err: any) {
            rec.stop();
            reject(err);
            return;
          }
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    destroy() {
      ro.disconnect();
      if (handle) {
        exp.release(handle);
        handle = 0;
      }
      clearRoot();
      composer?.dispose();
      renderer.dispose();
    },
  };
}
