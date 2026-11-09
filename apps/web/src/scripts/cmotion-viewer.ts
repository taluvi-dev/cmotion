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
import { GIFEncoder, quantize, applyPalette } from "gifenc";

// ---- WASM bridge -------------------------------------------------

interface CmExports {
  memory: WebAssembly.Memory;
  cm_alloc(n: number): number;
  cm_free(ptr: number, n: number): void;
  get_version(out: number, cap: number): number;
  parse_eval(src: number, len: number): number;
  parse_eval_with(src: number, len: number, args: number, argsLen: number): number;
  sample_at(handle: number, tNs: bigint, out: number, cap: number): number;
  release(handle: number): void;
  scene_params(src: number, len: number, out: number, cap: number): number;
  diagnostics(out: number, cap: number): number;
  shape_rings(spec: number, len: number, out: number, cap: number): number;
}

// The booted WASM, for builders that ask it for geometry (shape_rings).
let wasm: CmExports | null = null;

/** Where `boot()` fetches the interpreter and the default font from; a host serving them elsewhere passes its own. */
export interface BootOptions {
  wasmUrl?: string;
  fontUrl?: string;
}
const DEFAULT_WASM_URL = "/cmotion-render.wasm";
const DEFAULT_FONT_URL = "/DMSans-Bold.ttf";

async function loadWasm(url: string): Promise<CmExports> {
  const stub = () => 0;
  const wasi = new Proxy({}, { get: () => stub });
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`could not fetch ${url}: ${resp.status}`);
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

function withBytes<T>(exp: CmExports, text: string, fn: (ptr: number, len: number) => T): T {
  const enc = new TextEncoder().encode(text);
  const p = exp.cm_alloc(Math.max(enc.length, 1));
  new Uint8Array(exp.memory.buffer).set(enc, p);
  try {
    return fn(p, enc.length);
  } finally {
    exp.cm_free(p, Math.max(enc.length, 1));
  }
}

// Every JSON-writing export returns 0 when the buffer is too small, so
// grow it and retry.
function readJson(exp: CmExports, call: (out: number, cap: number) => number): JsonNode {
  for (let cap = 4096; cap <= 4 * 1024 * 1024; cap *= 4) {
    const p = exp.cm_alloc(cap);
    const n = call(p, cap);
    const text = n ? readString(exp, p, n) : null;
    exp.cm_free(p, cap);
    if (text !== null) return JSON.parse(text);
  }
  return null;
}

/** One located problem from the interpreter's diagnostic envelope. */
export interface CmDiagnostic {
  severity: "error" | "warning" | "note";
  code: string;
  message: string;
  line?: number;
  column?: number;
  length?: number;
  expected?: string;
  actual?: string;
  help?: string;
}

/** Thrown by `load` when the source does not evaluate; carries why. */
export class CmotionError extends Error {
  constructor(public diagnostics: CmDiagnostic[]) {
    const first = diagnostics.find((d) => d.severity === "error") ?? diagnostics[0];
    super(
      first
        ? `${first.code}${first.line ? ` (line ${first.line}:${first.column})` : ""}: ${first.message}`
        : "parse_eval failed — fix syntax / eval errors in the source",
    );
    this.name = "CmotionError";
  }
}

function lastDiagnostics(exp: CmExports): CmDiagnostic[] {
  return readJson(exp, (o, c) => exp.diagnostics(o, c))?.diagnostics ?? [];
}

// `args` binds the entry scene's parameters (parse_eval_with): times in
// seconds, angles in degrees, lengths in pixels, colours "#rrggbb",
// assets as URLs. Without it the source evaluates as it always has.
function parseEval(exp: CmExports, source: string, args?: Record<string, unknown>): number {
  const h = withBytes(exp, source, (p, n) =>
    args === undefined
      ? exp.parse_eval(p, n)
      : withBytes(exp, JSON.stringify(args), (ap, an) => exp.parse_eval_with(p, n, ap, an)),
  );
  if (h === 0) throw new CmotionError(lastDiagnostics(exp));
  return h;
}

/** A parameter of the entry scene, as `scene_params` reports it. */
export interface CmSceneParam {
  name: string;
  type: string;
  prop: "number" | "int" | "bool" | "string" | "color" | "asset" | null;
  asset: "image" | "video" | "audio" | "font" | null;
  unit: string | null;
  required: boolean;
  default: { source: string; value: unknown; url?: string | null } | null;
  ui: { min?: number; max?: number; step?: number; label?: string } | null;
  doc: string | null;
}

export interface CmSceneParams {
  ok: boolean;
  diagnostics: CmDiagnostic[];
  scene: string | null;
  params: CmSceneParam[];
}

function sceneParams(exp: CmExports, source: string): CmSceneParams {
  return withBytes(exp, source, (p, n) => readJson(exp, (o, c) => exp.scene_params(p, n, o, c)));
}

function sample(exp: CmExports, handle: number, tSeconds: number): unknown {
  // `sample_at` writes 0 when the tree does not fit the buffer (and when
  // sampling itself fails): grow from 64 KB to 4 MiB before giving up. A
  // frame of a few dozen layers is past 64 KB, so the first size is only
  // the common case, not the limit.
  const MAX = 4 * 1024 * 1024;
  let cap = 64 * 1024;
  for (;;) {
    const p = exp.cm_alloc(cap);
    const tNs = BigInt(Math.floor(tSeconds * 1e9));
    const n = exp.sample_at(handle, tNs, p, cap);
    if (n === 0) {
      exp.cm_free(p, cap);
      if (cap < MAX) {
        cap *= 2;
        continue;
      }
      throw new Error(`sample_at failed at t=${tSeconds}s (or its output exceeded 4 MiB)`);
    }
    const json = readString(exp, p, n);
    exp.cm_free(p, cap);
    return JSON.parse(json);
  }
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
// via the WebGL texture loader, cached per-path. The loader is async —
// the texture object is returned immediately, with pixels arriving on
// the next render after the fetch completes. A load in flight counts in
// `pending`, so a bake waits for the pixels instead of capturing frames
// without them.

const textureCache = new Map<string, THREE.Texture>();
const textureLoader = new THREE.TextureLoader();
const texturePending = new Set<string>();
const textureFailed = new Set<string>();
// Least recently used first. A host hands out a fresh blob: URL for every
// version of a picture, so without a bound every replaced or re-fetched
// picture would keep its texture (and bitmap) for the life of the page.
// An evicted texture still in a material is re-uploaded from its image
// on the next render; its GPU copy is what goes.
const MAX_TEXTURES = 64;

function loadTexture(path: string): THREE.Texture {
  const cached = textureCache.get(path);
  if (cached) {
    textureCache.delete(path);
    textureCache.set(path, cached);
    return cached;
  }
  texturePending.add(path);
  const done = () => {
    texturePending.delete(path);
    requestFrame?.();
  };
  const tex = textureLoader.load(path, done, undefined, (e) => {
    console.warn(`[cmotion-viewer] image ${path} failed to load`, e);
    textureFailed.add(path);
    done();
  });
  tex.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(path, tex);
  for (const [k, t] of textureCache) {
    if (textureCache.size <= MAX_TEXTURES || k === path) break;
    textureCache.delete(k);
    textureFailed.delete(k);
    t.dispose();
  }
  return tex;
}

/** A loaded picture and its size in pixels, or null while it loads (or failed). */
function loadedImage(path: string): { tex: THREE.Texture; width: number; height: number } | null {
  const tex = loadTexture(path);
  if (texturePending.has(path) || textureFailed.has(path)) return null;
  const img = tex.image as { width?: number; height?: number } | undefined;
  if (!img?.width || !img?.height) return null;
  return { tex, width: img.width, height: img.height };
}

// image(src, width:, height:, fit:, radius:) as a layer: a picture at a
// size, moved, timed and faded like any other layer. A width or a height
// is what makes it a layer (nothing read them before, so older sources
// keep drawing an unsized first-layer image as the background); with one
// of them the other follows the picture's aspect, with both the picture
// fills the box per `fit` (cover crops, contain letterboxes, fill
// stretches; cover by default). `radius:` rounds the corners.
function isImageLayer(node: JsonNode): boolean {
  if (!node || node.kind !== "constructed" || node.name !== "image") return false;
  const f = namedFields(node);
  return f.width !== undefined || f.height !== undefined;
}

function buildImageLayer(node: JsonNode): THREE.Object3D | null {
  const path = imagePath(node);
  if (!path) return null;
  const img = loadedImage(path);
  if (!img) return null;
  return pictureMesh(img.tex, img.width, img.height, namedFields(node));
}

/**
 * A picture-like layer (an image, or a video's current frame) of natural
 * size `natW` × `natH`, sized per `width:` / `height:` / `fit:` /
 * `radius:` in `f`.
 */
function pictureMesh(tex: THREE.Texture, natW: number, natH: number, f: Record<string, JsonNode>): THREE.Object3D | null {
  const wantW = f.width !== undefined ? numberOf(f.width) : null;
  const wantH = f.height !== undefined ? numberOf(f.height) : null;
  const img = { width: natW, height: natH };
  const aspect = img.width / img.height;
  const boxW = wantW ?? (wantH ?? img.height) * aspect;
  const boxH = wantH ?? (wantW ?? img.width) / aspect;
  if (!(boxW > 0 && boxH > 0)) return null;
  const fit = f.fit?.kind === "constructed" ? f.fit.name : f.fit?.kind === "string" ? String(f.fit.raw).replace(/^"|"$/g, "") : "cover";
  // the drawn size, and the part of the picture shown (u0..u1, v0..v1)
  let w = boxW, h = boxH, u0 = 0, u1 = 1, v0 = 0, v1 = 1;
  if (wantW !== null && wantH !== null) {
    const box = boxW / boxH;
    if (fit === "contain") {
      if (aspect > box) h = boxW / aspect;
      else w = boxH * aspect;
    } else if (fit !== "fill") {
      if (aspect > box) {
        const r = box / aspect;
        u0 = (1 - r) / 2; u1 = 1 - u0;
      } else {
        const r = aspect / box;
        v0 = (1 - r) / 2; v1 = 1 - v0;
      }
    }
  }
  const W = w * pxToWorld, H = h * pxToWorld;
  const radius = Math.min(numberOf(f.radius, 0) * pxToWorld, W / 2, H / 2);
  let geom: THREE.BufferGeometry;
  if (radius > 0) {
    const sh = new THREE.Shape();
    const x = -W / 2, y = -H / 2;
    sh.moveTo(x + radius, y);
    sh.lineTo(x + W - radius, y);
    sh.quadraticCurveTo(x + W, y, x + W, y + radius);
    sh.lineTo(x + W, y + H - radius);
    sh.quadraticCurveTo(x + W, y + H, x + W - radius, y + H);
    sh.lineTo(x + radius, y + H);
    sh.quadraticCurveTo(x, y + H, x, y + H - radius);
    sh.lineTo(x, y + radius);
    sh.quadraticCurveTo(x, y, x + radius, y);
    geom = new THREE.ShapeGeometry(sh, 12);
  } else {
    geom = new THREE.PlaneGeometry(W, H);
  }
  // map positions onto the shown part of the picture
  const pos = geom.getAttribute("position");
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = u0 + (pos.getX(i) / W + 0.5) * (u1 - u0);
    uv[i * 2 + 1] = v0 + (pos.getY(i) / H + 0.5) * (v1 - v0);
  }
  geom.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.userData.imageLayer = true;
  return mesh;
}

// ---- Video layers -------------------------------------------------
//
// video(src, width:, height:, fit:, radius:, start:, speed:, loop:) is a
// picture layer whose picture is a movie's frame at
//   start + media_clock · speed
// where `media_clock` (written by the evaluator, resolved by the sampler)
// is the layer's own time — so `during`, `freeze` and `loop` start, hold
// and repeat the movie. Past its end the movie holds its last frame, or
// with `loop: true` starts over.
//
// The viewer decodes nothing itself: a host supplies frames through
// `setVideoFrameProvider` (Plinken streams them frame-exactly from the
// space's assets). The built-in provider seeks an HTML <video> — fine for
// a preview, not frame-exact. A frame being fetched counts in `pending`,
// so a render or bake waits for it; meanwhile a preview shows the last
// frame it had.

/** One frame of a movie: anything a 2D canvas draws, or RGBA pixels. */
export interface VideoFrameImage {
  image: CanvasImageSource | ImageData;
  width: number;
  height: number;
}

/** The frame of `src` shown at `time` seconds (`loop`: wrap at the end, else hold the last frame). */
export type VideoFrameProvider = (src: string, time: number, opts: { loop: boolean }) => Promise<VideoFrameImage>;

/** A fetched frame, drawn once into its own canvas texture. */
interface VideoEntry {
  src: string;
  time: number;
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  tex: THREE.CanvasTexture;
}

/** Frames by `src|time|loop`, least recently used first. Several layers
 *  may show one movie at different times, so frames are kept per time. */
const videoFrames = new Map<string, VideoEntry>();
const VIDEO_FRAMES_KEPT = 8;
const videoPending = new Set<string>();
/** Movies whose frames failed: not asked again (a retry loop would spin). */
const videoFailed = new Set<string>();
let videoProvider: VideoFrameProvider | null = null;

function videoPath(node: JsonNode): string | null {
  if (!node || node.kind !== "constructed" || node.name !== "video") return null;
  const raw = positionalArgs(node)[0];
  // `video(clip, …)` where `clip: Video` is a parameter: its value is `video("url")`
  if (raw?.kind === "constructed" && raw.name === "video") return videoPath(raw);
  if (!raw || raw.kind !== "string") return null;
  return String(raw.raw).replace(/^"|"$/g, "") || null;
}

function isVideoLayer(node: JsonNode): boolean {
  if (!node || node.kind !== "constructed" || node.name !== "video") return false;
  const f = namedFields(node);
  return f.width !== undefined || f.height !== undefined;
}

function secondsOf(v: JsonNode, fallback: number): number {
  if (!v || v.kind !== "number") return fallback;
  const u = v.unit;
  return u === "ms" ? v.value / 1000 : u === "us" ? v.value / 1e6 : u === "ns" ? v.value / 1e9 : v.value;
}

function keepVideoFrame(key: string, src: string, time: number, frame: VideoFrameImage) {
  const canvas = document.createElement("canvas");
  canvas.width = frame.width;
  canvas.height = frame.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { image } = frame;
  if (typeof ImageData !== "undefined" && image instanceof ImageData) ctx.putImageData(image, 0, 0);
  else ctx.drawImage(image as CanvasImageSource, 0, 0, frame.width, frame.height);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  videoFrames.set(key, { src, time, width: frame.width, height: frame.height, canvas, tex });
  for (const [k, e] of videoFrames) {
    if (videoFrames.size <= VIDEO_FRAMES_KEPT) break;
    if (k === key) continue;
    videoFrames.delete(k);
    e.tex.dispose();
  }
}

function requestVideoFrame(src: string, time: number, loop: boolean, key: string) {
  if (videoPending.has(key) || videoFrames.has(key) || videoFailed.has(src)) return;
  videoPending.add(key);
  (videoProvider ?? elementVideoFrames)(src, time, { loop })
    .then((frame) => keepVideoFrame(key, src, time, frame))
    .catch((e) => {
      console.warn(`[cmotion-viewer] video ${src} at ${time.toFixed(3)}s failed; not drawing it`, e);
      videoFailed.add(src);
    })
    .finally(() => {
      videoPending.delete(key);
      requestFrame?.();
    });
}

function buildVideoLayer(node: JsonNode): THREE.Object3D | null {
  const src = videoPath(node);
  if (!src) return null;
  const f = namedFields(node);
  const loop = f.loop?.kind === "bool" && f.loop.value === true;
  const speed = numberOf(f.speed, 1);
  const time = Math.max(0, secondsOf(f.start, 0) + secondsOf(f.media_clock, 0) * speed);
  const key = `${src}|${time.toFixed(6)}|${loop ? 1 : 0}`;
  let entry = videoFrames.get(key);
  if (entry) {
    videoFrames.delete(key); // most recently used
    videoFrames.set(key, entry);
  } else {
    requestVideoFrame(src, time, loop, key);
    // a preview shows the nearest frame it has while this one loads; a
    // render or bake waits for `pending` and so gets the exact frame
    for (const e of videoFrames.values()) {
      if (e.src === src && (!entry || Math.abs(e.time - time) < Math.abs(entry.time - time))) entry = e;
    }
  }
  if (!entry) return null;
  return pictureMesh(entry.tex, entry.width, entry.height, f);
}

/**
 * Frames from an HTML <video>, one element per movie, seeks in order. Not
 * frame-exact, and the server must answer range requests. The built-in
 * provider; exported so a host's provider can fall back to it for plain
 * URLs.
 */
const videoElements = new Map<string, { el: HTMLVideoElement; ready: Promise<void>; queue: Promise<unknown> }>();

export function elementVideoFrames(src: string, time: number, opts: { loop: boolean }): Promise<VideoFrameImage> {
  let v = videoElements.get(src);
  if (!v) {
    const el = document.createElement("video");
    el.muted = true;
    el.playsInline = true;
    el.preload = "auto";
    el.crossOrigin = "anonymous";
    el.src = src;
    const ready = new Promise<void>((resolve, reject) => {
      el.addEventListener("loadeddata", () => resolve(), { once: true });
      el.addEventListener("error", () => reject(new Error(`could not load ${src}`)), { once: true });
    });
    v = { el, ready, queue: Promise.resolve() };
    videoElements.set(src, v);
  }
  const { el, ready } = v;
  const run = v.queue.then(async () => {
    await ready;
    const d = el.duration;
    const t = Number.isFinite(d) && d > 0 ? (opts.loop ? time % d : Math.min(time, Math.max(0, d - 0.001))) : time;
    if (Math.abs(el.currentTime - t) > 1e-4 || el.readyState < 2) {
      await new Promise<void>((resolve) => {
        el.addEventListener("seeked", () => resolve(), { once: true });
        el.currentTime = t;
      });
    }
    // copy now: the element moves on with the next seek
    const c = document.createElement("canvas");
    c.width = el.videoWidth;
    c.height = el.videoHeight;
    c.getContext("2d")?.drawImage(el, 0, 0);
    return { image: c, width: c.width, height: c.height };
  });
  v.queue = run.catch(() => undefined);
  return run;
}

/**
 * A picture can have transparent pixels, so it draws in three.js's
 * transparent pass, after every opaque object — it would cover layers
 * listed after it. From the first picture on, a compose's layers move to
 * that pass in their listed order. Only a compose with a picture layer
 * is affected, so other sources draw exactly as before.
 */
function stackInOrder(obj: THREE.Object3D, order: number) {
  obj.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    // a layer of a nested compose (a camera's world) keeps its order within
    // this slot: order + inner / 1000 (renderOrder is a float)
    const inner = typeof mesh.userData.stackOrder === "number" ? mesh.userData.stackOrder : 0;
    mesh.userData.stackOrder = order + inner / 1000;
    mesh.renderOrder = mesh.userData.stackOrder;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const m of mats) if (m && !(m as THREE.ShaderMaterial).uniforms) m.transparent = true;
  });
}

function hasImageLayer(obj: THREE.Object3D): boolean {
  let found = false;
  obj.traverse((o) => { if (o.userData.imageLayer) found = true; });
  return found;
}

/** Add a compose's layers to `group`, stacking in order once a picture appears. */
function addLayers(group: THREE.Group, layers: JsonNode[], ctx: BuildCtx, skipFirst: boolean) {
  let stacking = false;
  layers.forEach((layer, i) => {
    if (i === 0 && skipFirst) return;
    const obj = buildLayer(layer, ctx);
    if (!obj) return;
    if (!stacking && hasImageLayer(obj)) stacking = true;
    if (stacking) stackInOrder(obj, i + 1);
    group.add(obj);
  });
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
    // `image(logo)` where `logo: Image` is a parameter: the parameter's
    // value is already `image("url")`.
    if (raw?.kind === "constructed" && raw.name === "image") return imagePath(raw);
    if (!raw || raw.kind !== "string") return null;
    return String(raw.raw).replace(/^"|"$/g, "");
  }
  return null;
}

// ---- Font loading (for text.glyph) ------------------------------

let fontPromise: Promise<opentype.Font> | null = null;

// opentype.js v2 removed `load()`; the supported path is fetch → parse(buffer).
function loadFont(url: string): Promise<opentype.Font> {
  if (!fontPromise) {
    fontPromise = fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`font fetch failed: ${r.status}`);
        return r.arrayBuffer();
      })
      .then((buf) => opentype.parse(buf) as opentype.Font);
  }
  return fontPromise;
}

// Fonts named by a `Font` asset (`font("/fonts/Inter.ttf")`), loaded on
// first use and cached by URL. Until a font arrives the text using it
// is skipped and counted in `pending`, so a headless render or a bake
// waits for it; `requestFrame` redraws when it lands. Font *names*
// (`font: "Inter Bold"`) are not files and keep the default font.
const urlFonts = new Map<string, opentype.Font>();
const fontPending = new Set<string>();
const fontFailed = new Set<string>();

function fontUrl(v: JsonNode): string | null {
  if (!v || v.kind !== "constructed" || v.name !== "font") return null;
  const raw = positionalArgs(v)[0];
  if (!raw || raw.kind !== "string") return null;
  return String(raw.raw).replace(/^"|"$/g, "") || null;
}

function fontFor(node: JsonNode, ctx: BuildCtx): opentype.Font | null {
  const url = fontUrl(namedFields(node).font);
  if (!url || fontFailed.has(url)) return ctx.font;
  const loaded = urlFonts.get(url);
  if (loaded) return loaded;
  if (!fontPending.has(url)) {
    fontPending.add(url);
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`font fetch failed: ${r.status}`);
        return r.arrayBuffer();
      })
      .then((buf) => urlFonts.set(url, opentype.parse(buf) as opentype.Font))
      .catch((e) => {
        console.warn(`[cmotion-viewer] font ${url} failed, using the default font`, e);
        fontFailed.add(url);
      })
      .finally(() => {
        fontPending.delete(url);
        requestFrame?.();
      });
  }
  return null;
}

// ---- text.block layout -------------------------------------------
//
// Port of apps/cli/src/text_layout.zig — keep the two in step: same
// escapes, same greedy wrap, same box. Pixels, y down, relative to the
// box's top-left; a glyph's y is its baseline. Sizes follow the native
// renderer's stb_truetype basis (size = ascender − descender), so a
// block measures the same in both.

interface BlockOptions {
  size: number;
  lineHeight: number;
  align: "left" | "center" | "right";
  width: number | null;
  kerning: boolean;
  // reveal 0..1 unit by unit (char / word / line), each unit rising
  // `rise` px into place; `fit` sizes the widest line to that width.
  reveal: number;
  by: "char" | "word" | "line";
  rise: number;
  fit: number | null;
}

interface PlacedGlyph { glyph: opentype.Glyph; x: number; y: number; char: number; word: number; line: number }

// text_layout.zig revealAmount / unitCount.
function revealAmount(reveal: number, i: number, n: number): number {
  return n === 0 ? 1 : Math.max(0, Math.min(1, reveal * n - i));
}

function unescapeText(raw: string): string {
  const inner = raw.length >= 2 && raw.startsWith('"') && raw.endsWith('"') ? raw.slice(1, -1) : raw;
  return inner.replace(/\\(.)/g, (m, c) =>
    c === "n" ? "\n" : c === "t" ? "\t" : c === '"' ? '"' : c === "\\" ? "\\" : m,
  );
}

function blockOptions(node: JsonNode): BlockOptions {
  const f = namedFields(node);
  const alignName =
    f.align?.kind === "string" ? String(f.align.raw).replace(/^"|"$/g, "") :
    f.align?.kind === "constructed" ? f.align.name : "left";
  const byName =
    f.by?.kind === "string" ? String(f.by.raw).replace(/^"|"$/g, "") :
    f.by?.kind === "constructed" ? f.by.name : "char";
  return {
    size: numberOf(f.size, 96),
    lineHeight: numberOf(f.line_height, 1.2),
    align: alignName === "center" || alignName === "right" ? alignName : "left",
    width: f.width?.kind === "number" ? f.width.value : null,
    kerning: f.kerning?.kind === "bool" ? f.kerning.value : true,
    reveal: f.reveal?.kind === "number" ? Math.max(0, Math.min(1, f.reveal.value)) : 1,
    by: byName === "word" || byName === "line" ? byName : "char",
    rise: numberOf(f.rise, 0),
    fit: f.fit?.kind === "number" ? f.fit.value : null,
  };
}

function layoutBlock(font: opentype.Font, text: string, o0: BlockOptions) {
  let o = o0;
  if (o.fit !== null) {
    const probe = layoutBlock(font, text, { ...o, fit: null, width: null });
    if (probe.width > 0) o = { ...o, fit: null, size: (o.size * o0.fit!) / probe.width };
  }
  const hhea = font.tables.hhea;
  const scale = o.size / (hhea.ascender - hhea.descender);
  const ascent = hhea.ascender * scale;
  const descent = hhea.descender * scale;
  const glyphs = (s: string) => Array.from(s).map((ch) => font.charToGlyph(ch));
  const adv = (g: opentype.Glyph) => (g.advanceWidth ?? 0) * scale;
  const kern = (a: opentype.Glyph, b: opentype.Glyph) => (o.kerning ? font.getKerningValue(a, b) * scale : 0);
  const runWidth = (run: opentype.Glyph[]) =>
    run.reduce((w, g, i) => w + adv(g) + (i + 1 < run.length ? kern(g, run[i + 1]) : 0), 0);

  // Lines: split at \n, then greedily wrap at spaces within `width`.
  const lines: opentype.Glyph[][] = [];
  for (const para of text.split("\n")) {
    const chars = Array.from(para);
    const run = glyphs(para);
    if (o.width === null) { lines.push(run); continue; }
    // The line's width runs along with it (one add per glyph, not a
    // re-sum from the line start — quadratic in a caption's length),
    // in `runWidth`'s order so the breaks fall where they always did;
    // `tail` is the width since the last space, what the next line
    // starts with after a break there.
    let start = 0;
    let lastBreak: number | null = null;
    let w = 0;
    let tail = 0;
    for (let j = 0; j < run.length; j++) {
      const g = run[j];
      if (chars[j] === " ") { lastBreak = j; tail = 0; }
      if (j > start) w += kern(run[j - 1], g);
      w += adv(g);
      if (lastBreak !== null && j > lastBreak) {
        if (j > lastBreak + 1) tail += kern(run[j - 1], g);
        tail += adv(g);
      }
      if (w <= o.width) continue;
      if (lastBreak !== null && lastBreak > start) {
        lines.push(run.slice(start, lastBreak));
        start = lastBreak + 1;
        lastBreak = null;
        w = tail;
      }
    }
    lines.push(run.slice(start));
  }

  const widths = lines.map(runWidth);
  const boxW = o.width ?? Math.max(0, ...widths);
  const step = o.lineHeight * o.size;
  const placed: PlacedGlyph[] = [];
  let charI = 0, wordI = 0, anyWord = false;
  lines.forEach((line, i) => {
    let x = o.align === "center" ? (boxW - widths[i]) / 2 : o.align === "right" ? boxW - widths[i] : 0;
    const y = ascent + i * step;
    let inWord = false;
    line.forEach((g, k) => {
      const space = g.unicode === 32 || g.unicode === 9;
      if (!space && !inWord) { if (anyWord) wordI++; anyWord = true; inWord = true; }
      if (space) inWord = false;
      placed.push({ glyph: g, x, y, char: charI, word: wordI, line: i });
      if (!space) charI++;
      x += adv(g) + (k + 1 < line.length ? kern(g, line[k + 1]) : 0);
    });
  });
  const height = ascent + Math.max(0, lines.length - 1) * step - descent;
  return { placed, width: boxW, height, emSize: scale * font.unitsPerEm };
}

// The block's outlines as THREE.Shapes in pixels, y up, box centred on
// the origin. Same containment-based hole classification as
// stringShapes.
function blockShapes(font: opentype.Font, text: string, o: BlockOptions): THREE.Shape[] {
  return placedShapes(layoutBlock(font, text, o));
}

function placedShapes(l: ReturnType<typeof layoutBlock>, only?: (p: PlacedGlyph) => boolean): THREE.Shape[] {
  const sp = new THREE.ShapePath();
  for (const p of l.placed) {
    if (only && !only(p)) continue;
    const path = p.glyph.getPath(p.x - l.width / 2, p.y - l.height / 2, l.emSize);
    for (const cmd of path.commands) {
      switch (cmd.type) {
        case "M": sp.moveTo(cmd.x, -cmd.y); break;
        case "L": sp.lineTo(cmd.x, -cmd.y); break;
        case "Q": sp.quadraticCurveTo(cmd.x1, -cmd.y1, cmd.x, -cmd.y); break;
        case "C": sp.bezierCurveTo(cmd.x1, -cmd.y1, cmd.x2, -cmd.y2, cmd.x, -cmd.y); break;
      }
    }
  }
  return sp.toShapes(false);
}

// ---- 2D shapes (shape2d.zig through the WASM) ---------------------
//
// ellipse / circle / polygon / star / pie / rounded rect / path, and
// stroke(shape, width:, color:, draw:) around one. The WASM returns the
// outline rings (pixels, y down, centred) — the same polygons the native
// renderer fills — and this turns them into THREE shapes.

const SHAPE_KINDS = new Set(["ellipse", "circle", "polygon", "star", "pie", "rect", "path"]);

function shapeSpecOf(node: JsonNode): Record<string, unknown> | null {
  if (!node || node.kind !== "constructed" || !SHAPE_KINDS.has(node.name)) return null;
  const f = namedFields(node);
  const spec: Record<string, unknown> = { kind: node.name };
  for (const k of ["width", "height", "radius", "inner_radius", "angle", "start"]) {
    if (f[k]?.kind === "number") spec[k] = f[k].value;
  }
  const n = f.sides ?? f.points;
  if (n?.kind === "number") spec.sides = Math.max(0, Math.floor(n.value));
  if (node.name === "rect") spec.corner = numberOf(f.radius, 0);
  if (node.name === "path") {
    const pts = f.points?.kind === "array" ? f.points : positionalArgs(node).find((a: JsonNode) => a?.kind === "array");
    // vec2 is y up (as in extruded paths); shape2d is y down.
    spec.points = arrayElems(pts)
      .map(vec2Of)
      .filter((p): p is { x: number; y: number } => p !== null)
      .map((p) => [p.x, -p.y]);
    if (f.closed?.kind === "bool") spec.closed = f.closed.value;
  }
  return spec;
}

function shapeRings(spec: Record<string, unknown>): { fill: number[][][]; stroke: number[][][] } | null {
  if (!wasm) return null;
  const exp = wasm;
  return withBytes(exp, JSON.stringify(spec), (p, n) => readJson(exp, (o, c) => exp.shape_rings(p, n, o, c)));
}

// Rings (px, y down) → THREE shapes (y up), one per ring.
function ringShapes(rings: number[][][]): THREE.Shape[] {
  return rings.map((ring) => new THREE.Shape(ring.map(([x, y]) => new THREE.Vector2(x, -y))));
}

function buildShape2d(node: JsonNode): THREE.Object3D | null {
  let shapeNode = node;
  const spec0 = node.name === "stroke" ? null : shapeSpecOf(node);
  let spec = spec0;
  let strokeColor: JsonNode = null;
  let fillWanted = true;
  if (node.name === "stroke") {
    shapeNode = positionalArgs(node).find((a: JsonNode) => a?.kind === "constructed");
    spec = shapeSpecOf(shapeNode);
    if (!spec) return null;
    const f = namedFields(node);
    spec.stroke_width = numberOf(f.width, 2);
    spec.draw = f.draw?.kind === "number" ? f.draw.value : 1;
    strokeColor = f.color;
    fillWanted = !!namedFields(shapeNode).fill;
  }
  if (!spec) return null;
  const rings = shapeRings(spec);
  if (!rings) return null;
  const group = new THREE.Group();
  const add = (rs: number[][][], color: JsonNode) => {
    if (rs.length === 0) return;
    const geom = new THREE.ShapeGeometry(ringShapes(rs), 1);
    geom.scale(pxToWorld, pxToWorld, 1);
    group.add(new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: color ? toThreeColor(color) : 0xffffff })));
  };
  if (fillWanted) add(rings.fill, namedFields(shapeNode).fill);
  add(rings.stroke, strokeColor);
  return group;
}

// opacity(k, layer): the sampler's output for a layer that is fading or
// outside its `during` window (and the user-facing form). k = 0 builds
// nothing; otherwise every material under the layer is faded by k.
function buildOpacity(node: JsonNode, ctx: BuildCtx): THREE.Object3D | null {
  const args = positionalArgs(node);
  const k = Math.max(0, Math.min(1, numberOf(args.find((a: JsonNode) => a?.kind === "number"), 1)));
  if (k <= 0) return null;
  const inner = buildLayer(args.find((a: JsonNode) => a?.kind === "constructed"), ctx);
  if (!inner || k >= 1) return inner;
  inner.traverse((o: THREE.Object3D) => {
    const mat = (o as THREE.Mesh).material;
    const mats = Array.isArray(mat) ? mat : mat ? [mat] : [];
    for (const m of mats) {
      if ((m as THREE.ShaderMaterial).uniforms) continue; // raymarched shaders carry no opacity
      m.transparent = true;
      m.opacity = (m.opacity ?? 1) * k;
    }
  });
  return inner;
}

// text.block(...) as a flat 2D layer: filled outlines, `fill:` colour
// (white by default), centred like the native renderer paints it.
function buildTextBlock(node: JsonNode, ctx: BuildCtx): THREE.Object3D | null {
  const font = fontFor(node, ctx);
  if (!font) return null;
  const raw = positionalArgs(node)[0];
  if (!raw || raw.kind !== "string") return null;
  const o = blockOptions(node);
  const fill = namedFields(node).fill;
  const color = fill ? toThreeColor(fill) : new THREE.Color(0xffffff);
  const l = layoutBlock(font, unescapeText(String(raw.raw)), o);
  const mesh = (shapes: THREE.Shape[], k: number, dyPx: number) => {
    const geom = new THREE.ShapeGeometry(shapes, 16);
    geom.scale(pxToWorld, pxToWorld, 1);
    const m = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color, transparent: k < 1, opacity: k }));
    m.position.y = -dyPx * pxToWorld;
    return m;
  };
  if (o.reveal >= 1) {
    const shapes = placedShapes(l);
    return shapes.length ? mesh(shapes, 1, 0) : null;
  }
  // Reveal: one mesh per unit, faded and risen by how far it has appeared.
  const unit = (p: PlacedGlyph) => p[o.by];
  const n = l.placed.reduce((m, p) => Math.max(m, unit(p) + 1), 0);
  const group = new THREE.Group();
  for (let i = 0; i < n; i++) {
    const k = revealAmount(o.reveal, i, n);
    if (k <= 0) continue;
    const shapes = placedShapes(l, (p) => unit(p) === i);
    if (shapes.length) group.add(mesh(shapes, k, o.rise * (1 - k)));
  }
  return group;
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

// camera2d(world, x:, y:, zoom:, rotate:) — a 2D camera over `world` (a
// layer, a compose, or a list of layers): the point (x, y) of the world
// is at the centre of the picture, magnified `zoom` times and turned by
// `rotate` (degrees when written bare, like the native renderer's rotate).
// Every argument may be animated, so a camera move is keyframes. Layers
// outside the camera stay where they are — titles, captions, a logo.
function buildCamera2d(node: JsonNode, ctx: BuildCtx): THREE.Object3D | null {
  const args = positionalArgs(node);
  const f = namedFields(node);
  const worldNode = args.find((a: JsonNode) => a?.kind === "constructed" || a?.kind === "array");
  let world: THREE.Object3D | null;
  if (worldNode?.kind === "array") {
    const g = new THREE.Group();
    addLayers(g, arrayElems(worldNode), ctx, false);
    world = g;
  } else {
    world = buildLayer(worldNode, ctx);
  }
  if (!world) return null;
  const zoom = Math.max(1e-3, numberOf(f.zoom, 1));
  const r = f.rotate;
  const turn = !r || r.kind !== "number" ? 0 : r.unit === "rad" ? r.value : r.unit === "turn" ? r.value * 2 * Math.PI : (r.value * Math.PI) / 180;
  // world → centred on (x, y) → turned → magnified
  const centred = new THREE.Group();
  centred.add(world);
  centred.position.set(-numberOf(f.x, 0) * pxToWorld, -numberOf(f.y, 0) * pxToWorld, 0);
  const cam = new THREE.Group();
  cam.add(centred);
  cam.rotation.z = -turn;
  cam.scale.set(zoom, zoom, 1);
  return cam;
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
  const innerSpec = shapeSpecOf(inner);
  if (innerSpec) {
    const rings = shapeRings(innerSpec);
    if (!rings || rings.fill.length === 0) return null;
    const depthPx = numberOf(f.depth, 16);
    const bevelPx = f.bevel?.kind === "number" ? f.bevel.value : Math.max(depthPx * 0.1, 1.5);
    const geom = new THREE.ExtrudeGeometry(ringShapes(rings.fill), {
      depth: depthPx,
      bevelEnabled: bevelPx > 0,
      bevelThickness: bevelPx,
      bevelSize: bevelPx,
      bevelSegments: numberOf(f.bevel_segments, 4),
      curveSegments: 8,
    });
    geom.scale(pxToWorld, pxToWorld, pxToWorld);
    return new THREE.Mesh(geom, new THREE.MeshStandardMaterial({ color: 0xffffff }));
  }
  if (inner && inner.kind === "constructed" && inner.name === "text.block") {
    const font = fontFor(inner, ctx);
    const raw = positionalArgs(inner)[0];
    if (!font || !raw || raw.kind !== "string") return null;
    const shapes = blockShapes(font, unescapeText(String(raw.raw)), blockOptions(inner));
    if (shapes.length === 0) return null;
    // Same bevel default as the native extruder (render.zig): 10 % of
    // the depth, at least 1.5 px, overridable with `bevel:`.
    const depthPx = numberOf(f.depth, 16);
    const bevelPx = f.bevel?.kind === "number" ? f.bevel.value : Math.max(depthPx * 0.1, 1.5);
    const geom = new THREE.ExtrudeGeometry(shapes, {
      depth: depthPx,
      bevelEnabled: bevelPx > 0,
      bevelThickness: bevelPx,
      bevelSize: bevelPx,
      bevelSegments: numberOf(f.bevel_segments, 4),
      curveSegments: 32,
    });
    geom.scale(pxToWorld, pxToWorld, pxToWorld);
    return new THREE.Mesh(geom, new THREE.MeshStandardMaterial({ color: 0xffffff }));
  }
  if (!inner || inner.kind !== "constructed" || inner.name !== "text.glyph") {
    console.warn(`[cmotion-viewer] extrude: unsupported inner ${inner?.name}`);
    return null;
  }
  const glyphFont = fontFor(inner, ctx);
  if (!glyphFont) return null;
  const glyphArgs = positionalArgs(inner);
  const text = String(glyphArgs[0]?.raw ?? '""').replace(/^"|"$/g, "") || "?";
  const shapes = stringShapes(glyphFont, text);
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
    const hhea = glyphFont.tables.hhea;
    const emFactor = glyphFont.unitsPerEm / (hhea.ascender - hhea.descender);
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

// vectorize(image("..."), stroke_width?, simplify?, bridge?, threshold?,
// stitch?, depth?, size?, round?) — trace a raster image to a uniform
// centreline and extrude it, like svg() but from a bitmap. Tracing is async
// (image decode + canvas + skeletonize), but the scene builds synchronously,
// so we cache the geometry by (path + params): the first build kicks off the
// trace and returns nothing; when it lands we cache it and ask for a redraw,
// and subsequent frames use the cached mesh. Same deferred-asset pattern as
// texture loading.
const vectorizeCache = new Map<string, THREE.BufferGeometry>();
const vectorizePending = new Set<string>();
let requestFrame: (() => void) | null = null;

function buildVectorize(node: JsonNode): THREE.Object3D | null {
  const f = namedFields(node);
  const path = imagePath(f.source ?? positionalArgs(node)[0]);
  if (!path) { console.warn("[cmotion-viewer] vectorize(): needs image(\"...\")"); return null; }
  const depthPx = numberOf(f.depth, 16), sizePx = numberOf(f.size, 400), roundPx = numberOf(f.round, 0);
  const sw = numberOf(f.stroke_width ?? f.strokeWidth, 6);
  const trace = { strokeWidth: sw, simplify: numberOf(f.simplify, 1.5), bridge: numberOf(f.bridge, 2), threshold: numberOf(f.threshold, 0.5), stitch: numberOf(f.stitch, 6) };
  const key = JSON.stringify([path, trace, depthPx, sizePx, roundPx, pxToWorld]);

  const cached = vectorizeCache.get(key);
  if (cached) return new THREE.Mesh(cached, new THREE.MeshStandardMaterial({ color: 0xffffff }));
  if (!vectorizePending.has(key)) {
    vectorizePending.add(key);
    (async () => {
      try {
        const svg = await imageToCenterlineSvg(path, trace);
        const geom = svgMeshGeometry(svg, depthPx * pxToWorld, sizePx * pxToWorld, roundPx * pxToWorld);
        if (geom) vectorizeCache.set(key, geom);
      } catch (e) { console.warn("[cmotion-viewer] vectorize() failed", e); }
      finally { vectorizePending.delete(key); requestFrame?.(); }
    })();
  }
  return null; // appears on the next frame once the trace resolves
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

// ---- Raster → centreline SVG (vectorize) -------------------------

// Zhang–Suen thinning: erode a binary grid (1 = ink) to a 1-px skeleton.
// In place. Standard two-subiteration algorithm.
function thinZhangSuen(g: Uint8Array, w: number, h: number): void {
  const at = (x: number, y: number) => (x < 0 || y < 0 || x >= w || y >= h ? 0 : g[y * w + x]);
  let changed = true;
  while (changed) {
    changed = false;
    for (let step = 0; step < 2; step++) {
      const rm: number[] = [];
      for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
        if (!g[y * w + x]) continue;
        const p2 = at(x, y - 1), p3 = at(x + 1, y - 1), p4 = at(x + 1, y), p5 = at(x + 1, y + 1),
          p6 = at(x, y + 1), p7 = at(x - 1, y + 1), p8 = at(x - 1, y), p9 = at(x - 1, y - 1);
        const nb = [p2, p3, p4, p5, p6, p7, p8, p9];
        const B = nb.reduce((a, b) => a + b, 0);
        if (B < 2 || B > 6) continue;
        let A = 0;
        for (let i = 0; i < 8; i++) if (nb[i] === 0 && nb[(i + 1) % 8] === 1) A++;
        if (A !== 1) continue;
        if (step === 0) { if (p2 * p4 * p6 !== 0) continue; if (p4 * p6 * p8 !== 0) continue; }
        else { if (p2 * p4 * p8 !== 0) continue; if (p2 * p6 * p8 !== 0) continue; }
        rm.push(y * w + x);
      }
      if (rm.length) { changed = true; for (const i of rm) g[i] = 0; }
    }
  }
}

// Ramer–Douglas–Peucker polyline simplification ("quantize").
function rdp(pts: [number, number][], eps: number): [number, number][] {
  if (pts.length < 3) return pts;
  let dmax = 0, idx = 0;
  const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1];
  const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs((pts[i][0] - ax) * dy - (pts[i][1] - ay) * dx) / len;
    if (d > dmax) { dmax = d; idx = i; }
  }
  if (dmax > eps) {
    const l = rdp(pts.slice(0, idx + 1), eps), r = rdp(pts.slice(idx), eps);
    return l.slice(0, -1).concat(r);
  }
  return [pts[0], pts[pts.length - 1]];
}

// Trace a 1-px skeleton into long polylines by GREEDY straight-continuation:
// from each start pixel, repeatedly step to the unvisited ink neighbour whose
// direction best continues the current heading. This flows straight through
// 8-connected "staircase" pixels (which a degree test would mis-read as
// junctions and shatter the line into 2-px fragments — the bug that blew the
// mesh up). Real branches just become separate polylines. Pixels are marked
// visited so each is used once. Short stubs (noise/spurs) are dropped.
function traceSkeleton(g: Uint8Array, w: number, h: number): [number, number][][] {
  const id = (x: number, y: number) => y * w + x;
  const inb = (x: number, y: number) => x >= 0 && y >= 0 && x < w && y < h;
  const N8 = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]] as const;
  const deg = (x: number, y: number) => { let c = 0; for (const [dx, dy] of N8) if (inb(x + dx, y + dy) && g[id(x + dx, y + dy)]) c++; return c; };
  const vis = new Uint8Array(w * h);
  const candidates = (x: number, y: number) => {
    const out: [number, number][] = [];
    for (const [dx, dy] of N8) { const ax = x + dx, ay = y + dy; if (inb(ax, ay) && g[id(ax, ay)] && !vis[id(ax, ay)]) out.push([ax, ay]); }
    return out;
  };
  const trace = (sx: number, sy: number): [number, number][] => {
    const pts: [number, number][] = [[sx, sy]];
    vis[id(sx, sy)] = 1;
    let cx = sx, cy = sy, hx = 0, hy = 0;
    while (true) {
      const cand = candidates(cx, cy);
      if (cand.length === 0) break;
      let best = cand[0];
      if (hx || hy) {
        let bestDot = -Infinity;
        for (const [nx, ny] of cand) {
          const dx = nx - cx, dy = ny - cy, l = Math.hypot(dx, dy) || 1;
          const d = (dx / l) * hx + (dy / l) * hy;
          if (d > bestDot) { bestDot = d; best = [nx, ny]; }
        }
      }
      const [nx, ny] = best;
      vis[id(nx, ny)] = 1;
      pts.push([nx, ny]);
      const l = Math.hypot(nx - cx, ny - cy) || 1;
      hx = (nx - cx) / l; hy = (ny - cy) / l;
      cx = nx; cy = ny;
    }
    return pts;
  };
  const paths: [number, number][][] = [];
  // Endpoints (deg 1) first so open strokes trace end-to-end; then any
  // remaining ink (closed loops / leftover branches).
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (g[id(x, y)] && !vis[id(x, y)] && deg(x, y) === 1) paths.push(trace(x, y));
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (g[id(x, y)] && !vis[id(x, y)]) paths.push(trace(x, y));
  return paths.filter((p) => p.length >= 4);
}

// Vectorize a raster line drawing into a centreline SVG: binarize →
// skeletonize (one line per drawn stroke, regardless of its hand-drawn
// width/wobble) → trace + simplify → emit uniform-width stroke paths. The
// result feeds straight into svg()/`/v1/mesh`. `url` is loaded via an
// <img> (same-origin asset in the render container). Options: strokeWidth
// (output line width, SVG units), threshold (0..1 ink cutoff), simplify
// (RDP tolerance in source px), maxDim (processing resolution).
// Greedily join polylines whose endpoints are within `tol`: connect head/tail
// (trying either orientation) so dashes that bridging missed become one line.
function stitchPaths(paths: [number, number][][], tol: number): [number, number][][] {
  const segs = paths.map((p) => p.slice());
  const dist = (a: [number, number], b: [number, number]) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  let merged = true;
  while (merged) {
    merged = false;
    outer: for (let i = 0; i < segs.length; i++) {
      for (let j = i + 1; j < segs.length; j++) {
        const A = segs[i], B = segs[j];
        const a0 = A[0], a1 = A[A.length - 1], b0 = B[0], b1 = B[B.length - 1];
        let joined: [number, number][] | null = null;
        if (dist(a1, b0) <= tol) joined = A.concat(B);
        else if (dist(a1, b1) <= tol) joined = A.concat(B.slice().reverse());
        else if (dist(a0, b0) <= tol) joined = A.slice().reverse().concat(B);
        else if (dist(a0, b1) <= tol) joined = B.concat(A);
        if (joined) { segs[i] = joined; segs.splice(j, 1); merged = true; break outer; }
      }
    }
  }
  return segs;
}

// Close T-junction gaps. stitchPaths only welds endpoint-to-endpoint, but a
// branch that meets the *middle* of a through-stroke leaves its endpoint a
// pixel or two from an interior vertex — endpoint stitching never touches it,
// so the extruded mesh shows a gap the original drawing didn't have. For each
// still-loose endpoint, snap it onto the nearest vertex of any *other* path
// within `tol` by appending that vertex, bridging the branch into the stroke.
function snapEndpoints(paths: [number, number][][], tol: number): [number, number][][] {
  const dist = (a: [number, number], b: [number, number]) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  for (let i = 0; i < paths.length; i++) {
    const P = paths[i];
    for (const head of [true, false]) {
      const e = head ? P[0] : P[P.length - 1];
      let best: [number, number] | null = null, bestD = tol;
      for (let j = 0; j < paths.length; j++) {
        if (j === i) continue;
        const Q = paths[j];
        for (let k = 0; k < Q.length; k++) {
          const d = dist(e, Q[k]);
          // d > 0.5 skips vertices stitchPaths already merged (coincident).
          if (d > 0.5 && d < bestD) { bestD = d; best = Q[k]; }
        }
      }
      if (best) { if (head) P.unshift([best[0], best[1]]); else P.push([best[0], best[1]]); }
    }
  }
  return paths;
}

export async function imageToCenterlineSvg(
  url: string,
  opts: { strokeWidth?: number; threshold?: number; simplify?: number; maxDim?: number; bridge?: number; stitch?: number } = {},
): Promise<string> {
  const strokeWidth = opts.strokeWidth ?? 6;
  const threshold = opts.threshold ?? 0.5;
  const simplify = opts.simplify ?? 1.5;
  const maxDim = opts.maxDim ?? 700;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;
  await img.decode();
  const ow = img.naturalWidth, oh = img.naturalHeight;
  const scale = Math.min(1, maxDim / Math.max(ow, oh));
  const w = Math.max(1, Math.round(ow * scale)), h = Math.max(1, Math.round(oh * scale));

  const cv = document.createElement("canvas");
  cv.width = w; cv.height = h;
  const ctx = cv.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;

  // Ink = dark pixels (white paper assumed). luminance < threshold.
  const g = new Uint8Array(w * h);
  const cut = threshold * 255;
  for (let i = 0; i < w * h; i++) {
    const r = data[i * 4], gg = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3];
    const lum = a < 8 ? 255 : 0.299 * r + 0.587 * gg + 0.114 * b;
    g[i] = lum < cut ? 1 : 0;
  }

  // Bridge small gaps (pen lifts, JPEG noise) before thinning so the
  // skeleton stays connected — otherwise it shatters into many dashes.
  // `bridge` rounds of 8-connected dilation; thinning re-collapses to the
  // centreline afterward.
  const bridge = Math.max(0, Math.round(opts.bridge ?? 2));
  for (let k = 0; k < bridge; k++) {
    const out = g.slice();
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (g[y * w + x]) continue;
      let hit = false;
      for (let dy = -1; dy <= 1 && !hit; dy++) for (let dx = -1; dx <= 1; dx++) {
        const ax = x + dx, ay = y + dy;
        if (ax >= 0 && ay >= 0 && ax < w && ay < h && g[ay * w + ax]) { hit = true; break; }
      }
      if (hit) out[y * w + x] = 1;
    }
    g.set(out);
  }

  thinZhangSuen(g, w, h);
  const inv = 1 / scale;
  let paths = traceSkeleton(g, w, h)
    .map((p) => rdp(p, simplify * scale))
    .filter((p) => p.length >= 2);
  paths = stitchPaths(paths, (opts.stitch ?? 6) * scale);
  paths = snapEndpoints(paths, (opts.stitch ?? 6) * scale);

  const d = paths
    .map((p) => "M" + p.map(([x, y]) => `${(x * inv).toFixed(1)} ${(y * inv).toFixed(1)}`).join(" L"))
    .join(" ");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ow} ${oh}" fill="none" ` +
    `stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="${d}"/></svg>`
  );
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
      addLayers(group, arrayElems(namedFields(node).layers), ctx, false);
      return group;
    }
    case "rect":
      return namedFields(node).radius ? buildShape2d(node) : buildRect(node);
    case "text.block":
      return buildTextBlock(node, ctx);
    case "ellipse":
    case "polygon":
    case "star":
    case "pie":
    case "path":
    case "stroke":
      return buildShape2d(node);
    case "opacity":
      return buildOpacity(node, ctx);
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
    case "vectorize":
      return buildVectorize(node);
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
    case "camera2d":
      return buildCamera2d(node, ctx);
    case "squash":
      return buildSquash(node, ctx);
    // `image`, `fit`, `as_texture` only render as part of a material's
    // `fill` slot or as the first layer of `compose` (background) — see
    // buildMaterial and buildCompose. Reaching them via buildLayer means
    // they were placed somewhere the viewer can't render them yet.
    case "video":
      if (isVideoLayer(node)) return buildVideoLayer(node);
      console.warn(`[cmotion-viewer] "video" draws as a layer with width: or height:`);
      return null;
    case "image":
      if (isImageLayer(node)) return buildImageLayer(node);
      console.warn(`[cmotion-viewer] "image" without width: or height: only renders as a material fill or compose background`);
      return null;
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
  } else if (head?.kind === "constructed" && (head.name === "fit" || head.name === "image") && !isImageLayer(head)) {
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
  // Skip the layer just promoted to background.
  addLayers(group, layers, ctx, ctx.background !== null);
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
  /** Throws a CmotionError with the diagnostics when the source fails. */
  load(source: string, args?: Record<string, unknown>): void;
  seek(t: number): void;
  resize(): void;
  durationSeconds: number;
  /** Deferred assets still loading (vectorize traces, fonts). */
  pending: number;
  setVideoFrameProvider(provider: VideoFrameProvider | null): void;
  sceneParams(source: string): CmSceneParams;
  versions: { cmotion: string; three: string };
  captureFrame(): Promise<Blob | null>;
  captureClip(opts?: {
    duration?: number;
    fps?: number;
    onProgress?: (t: number) => void;
  }): Promise<{ blob: Blob; ext: string; mime: string }>;
  captureGif(opts?: {
    duration?: number;
    fps?: number;
    onProgress?: (t: number) => void;
  }): Promise<{ blob: Blob; ext: string; mime: string }>;
  destroy(): void;
  /**
   * The frame at `t` as pixels, rendered in the same tick as the readback
   * (a bake reads frames exactly; `captureClip`'s recorder is realtime and
   * may drop them). `size` resamples to a host's output resolution.
   */
  snapshot(t: number, size?: { width: number; height: number }): Promise<ImageBitmap>;
}

export async function boot(canvas: HTMLCanvasElement, options: BootOptions = {}): Promise<ViewerHandle> {
  const [exp, font] = await Promise.all([loadWasm(options.wasmUrl ?? DEFAULT_WASM_URL), loadFont(options.fontUrl ?? DEFAULT_FONT_URL)]);
  wasm = exp;
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

  // Redraw the current frame when a deferred asset (e.g. vectorize() trace)
  // resolves, so it appears without waiting for the next animation tick.
  requestFrame = () => { if (handle) applyFrame(lastT); };

  // `args` binds the entry scene's parameters (see parseEval). A source
  // that does not evaluate throws a CmotionError carrying the
  // diagnostics, and the previous scene stays loaded.
  function load(source: string, args?: Record<string, unknown>) {
    const next = parseEval(exp, source, args);
    if (handle) exp.release(handle);
    handle = next;
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
    // Count of deferred assets still resolving (e.g. vectorize() traces).
    // The headless render driver waits for this to hit 0 before screenshotting.
    get pending() { return vectorizePending.size + fontPending.size + texturePending.size + videoPending.size; },
    /**
     * Where video frames come from (`null`: the built-in HTML <video>
     * seek, not frame-exact). Frames already shown are fetched again.
     */
    setVideoFrameProvider(provider: VideoFrameProvider | null) {
      videoProvider = provider;
      videoFailed.clear();
      for (const e of videoFrames.values()) e.tex.dispose();
      videoFrames.clear();
      requestFrame?.();
    },
    snapshot(t: number, size?: { width: number; height: number }) {
      // Even with preserveDrawingBuffer the WebGL back buffer can be
      // undefined between paints: redraw right before reading it out.
      applyFrame(t);
      return size
        ? createImageBitmap(canvas, { resizeWidth: size.width, resizeHeight: size.height, resizeQuality: "high" })
        : createImageBitmap(canvas);
    },
    // The entry scene's parameters (the clip's props) and the
    // diagnostics of the source, without evaluating its body.
    sceneParams(source: string): CmSceneParams { return sceneParams(exp, source); },
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
    captureGif(opts: { duration?: number; fps?: number; onProgress?: (t: number) => void } = {}) {
      // Animated GIF export. Unlike captureClip (which records the live canvas
      // in real time via MediaRecorder), GIF is built deterministically: seek
      // to each frame, redraw, read the pixels off the WebGL canvas, quantize
      // to a 256-colour table and LZW-encode. Synchronous frame stepping means
      // the output never drops frames the way a real-time recorder can.
      const duration = opts.duration ?? durationSeconds;
      const fps = Math.min(50, Math.max(1, Math.round(opts.fps ?? 20)));
      const onProgress = opts.onProgress;
      const frames = Math.max(1, Math.round(duration * fps));
      // GIF delays are in centiseconds (1/100 s); clamp to ≥2 (browsers floor
      // sub-2cs delays to 10cs anyway).
      const delayCs = Math.max(2, Math.round(100 / fps));

      // Read-back surface. The WebGL canvas can't give an ImageData directly,
      // so we blit it onto a 2D canvas at its backing-store resolution.
      const w = canvas.width, h = canvas.height;
      const read = document.createElement("canvas");
      read.width = w; read.height = h;
      const rctx = read.getContext("2d", { willReadFrequently: true })!;

      const gif = GIFEncoder();
      return new Promise<{ blob: Blob; ext: string; mime: string }>((resolve, reject) => {
        let i = 0;
        const step = () => {
          try {
            const t = frames > 1 ? (i / frames) * duration : 0;
            applyFrame(t);
            // Draw immediately after applyFrame in the same tick — see
            // captureFrame for why the back buffer is otherwise undefined.
            rctx.clearRect(0, 0, w, h);
            rctx.drawImage(canvas, 0, 0, w, h);
            const { data } = rctx.getImageData(0, 0, w, h);
            // Per-frame palette: the prism/bloom scenes shift colour over time,
            // so a single global table would band badly. 256-colour median cut.
            const palette = quantize(data, 256);
            const index = applyPalette(data, palette);
            gif.writeFrame(index, w, h, { palette, delay: delayCs });
            onProgress?.(t);
            i++;
            if (i < frames) { requestAnimationFrame(step); return; }
            gif.finish();
            const blob = new Blob([gif.bytesView()], { type: "image/gif" });
            resolve({ blob, ext: "gif", mime: "image/gif" });
          } catch (err) {
            reject(err);
          }
        };
        requestAnimationFrame(step);
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
