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

// Build a centred THREE.Shape for `char` at unit-em size (cap height is
// roughly 0.7 of em). The caller scales as needed.
function glyphShape(font: opentype.Font, char: string): THREE.Shape {
  const glyph = font.charToGlyph(char);
  // fontSize = 1 → glyph laid out in [0..1] em coordinates, y-down.
  const path = glyph.getPath(0, 0, 1);
  const shape = new THREE.Shape();
  const holes: THREE.Path[] = [];
  let current: THREE.Shape | THREE.Path = shape;
  let started = false;
  for (const cmd of path.commands) {
    switch (cmd.type) {
      case "M":
        if (started) {
          const h = new THREE.Path();
          h.moveTo(cmd.x, -cmd.y);
          holes.push(h);
          current = h;
        } else {
          current.moveTo(cmd.x, -cmd.y);
          started = true;
        }
        break;
      case "L":
        current.lineTo(cmd.x, -cmd.y);
        break;
      case "C":
        current.bezierCurveTo(cmd.x1, -cmd.y1, cmd.x2, -cmd.y2, cmd.x, -cmd.y);
        break;
      case "Q":
        current.quadraticCurveTo(cmd.x1, -cmd.y1, cmd.x, -cmd.y);
        break;
      case "Z":
        break;
    }
  }
  shape.holes = holes;
  return shape;
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
}

function makeCtx(font: opentype.Font): BuildCtx {
  return { font, lights: [], background: null, glyphScale: 2.5, sceneAspect: 16 / 9 };
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

// extrude(shape, depth: ...). Shape is a positional first arg; today the
// only translator-supported shape is `text.glyph(...)`.
function buildExtrude(node: JsonNode, ctx: BuildCtx): THREE.Mesh | null {
  const args = positionalArgs(node);
  const f = namedFields(node);
  const inner = args[0];
  if (!inner || inner.kind !== "constructed" || inner.name !== "text.glyph") {
    console.warn(`[cmotion-viewer] extrude: unsupported inner ${inner?.name}`);
    return null;
  }
  const glyphArgs = positionalArgs(inner);
  const ch = String(glyphArgs[0]?.raw ?? '""').replace(/^"|"$/g, "")[0] ?? "?";
  const rawShape = glyphShape(ctx.font, ch);
  // Centre + scale: cap height ≈ 0.7em → after glyphScale ≈ 1.75 world.
  const tmpGeo = new THREE.ShapeGeometry(rawShape);
  tmpGeo.computeBoundingBox();
  const bb = tmpGeo.boundingBox!;
  const cx = (bb.min.x + bb.max.x) / 2;
  const cy = (bb.min.y + bb.max.y) / 2;
  tmpGeo.dispose();
  const centeredPoints = rawShape.getPoints().map((p) => p.clone().sub(new THREE.Vector2(cx, cy)));
  const centered = new THREE.Shape(centeredPoints);
  centered.holes = rawShape.holes.map((h) => {
    const pts = h.getPoints().map((p) => p.clone().sub(new THREE.Vector2(cx, cy)));
    const np = new THREE.Path();
    pts.forEach((p, i) => (i === 0 ? np.moveTo(p.x, p.y) : np.lineTo(p.x, p.y)));
    return np;
  });

  // depth in px → world units. Tuned so 16px ≈ 0.4 (matches ScenePreview).
  const depthPx = numberOf(f.depth, 16);
  const depth = depthPx * 0.025;

  const geom = new THREE.ExtrudeGeometry(centered, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 4,
    curveSegments: 32,
  });
  geom.scale(ctx.glyphScale, ctx.glyphScale, 1);
  geom.center();

  // Placeholder material — replaced when wrapped in material(...).
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  return new THREE.Mesh(geom, mat);
}

function buildMaterial(node: JsonNode, ctx: BuildCtx): THREE.Object3D | null {
  const args = positionalArgs(node);
  const f = namedFields(node);
  const inner = buildLayer(args[0], ctx);
  if (!inner) return null;
  // `fill: image(...).as_texture(...)` resolves to a texture map; everything
  // else falls back to a flat colour. SphereGeometry's default UVs are
  // already equirectangular, so `projection: equirectangular` is a no-op for
  // the only mesh we accept here.
  const fillTexture = imagePath(f.fill);
  const opts: THREE.MeshStandardMaterialParameters = {
    metalness: numberOf(f.metalness, 0),
    roughness: numberOf(f.roughness, 1),
    emissive: toThreeColor(f.emissive),
    emissiveIntensity: numberOf(f.emissive_intensity, 0),
  };
  if (fillTexture) {
    opts.color = 0xffffff;
    opts.map = loadTexture(fillTexture);
  } else {
    opts.color = toThreeColor(f.fill);
  }
  const mat = new THREE.MeshStandardMaterial(opts);
  inner.traverse((o: any) => {
    if (o.isMesh) {
      o.material?.dispose?.();
      o.material = mat;
    }
  });
  return inner;
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

function buildAmbient(node: JsonNode): THREE.Light {
  const intensity = numberOf(positionalArgs(node)[0], 0.3);
  return new THREE.AmbientLight(0xffffff, intensity);
}

function buildDirectional(node: JsonNode): THREE.Light {
  const f = namedFields(node);
  const from = f.from?.kind === "constructed" && f.from.name === "vec3"
    ? buildVec3(f.from)
    : new THREE.Vector3(0, 1, 0);
  const intensity = numberOf(f.intensity, 1);
  const light = new THREE.DirectionalLight(0xffffff, intensity);
  light.position.copy(from);
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
  }
  return buildLayer(args[0], ctx);
}

// Dispatches on a single value-tree node. `compose` is handled separately
// because it owns the bg→background promotion.
function buildLayer(node: JsonNode, ctx: BuildCtx): THREE.Object3D | null {
  if (!node || node.kind !== "constructed") return null;
  switch (node.name) {
    case "rect":
      return buildRect(node);
    case "circle":
      return buildCircle(node);
    case "sphere":
      return buildSphere(node);
    case "render3d":
      return buildRender3d(node, ctx);
    case "extrude":
      return buildExtrude(node, ctx);
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
    camera.aspect = sceneAspect;
    camera.updateProjectionMatrix();
    // Re-render at the last applied time so the new size shows correct
    // pixels immediately (otherwise we wait for the next applyFrame).
    if (handle) renderer.render(scene, camera);
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
    if (Math.abs(ctx.sceneAspect - sceneAspect) > 1e-6) {
      sceneAspect = ctx.sceneAspect;
      resize();
    }
    renderer.render(scene, camera);
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
      renderer.dispose();
    },
  };
}
