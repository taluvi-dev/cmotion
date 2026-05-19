// cmotion-viewer.ts
//
// Astro/web copy of the viewer half of cmotion's browser pipeline.
// Mirrors apps/cli/assets/viewer/cmotion-three.js but uses the npm
// three.js installed in apps/web (so it benefits from Vite's bundling
// + tree-shaking) instead of the vendored copy that the native
// `cmo open` ships.
//
// Anything we render here is derived from the JSON value tree the
// WASM produces — no DSL knowledge lives outside the wasm artifact.

import * as THREE from "three";

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

// ---- JSON tree → THREE.Object3D walkers --------------------------

type JsonNode = any;

function fields(node: JsonNode): Record<string, JsonNode> {
  const out: Record<string, JsonNode> = {};
  for (const f of node.fields ?? []) out[f.name] = f.value;
  return out;
}

function numberOf(v: JsonNode, fallback = 0): number {
  if (!v || v.kind !== "number") return fallback;
  return v.value;
}

function arrayElems(v: JsonNode): JsonNode[] {
  return v && v.kind === "array" ? v.elems : [];
}

function colorToCss(v: JsonNode): string {
  if (!v || v.kind !== "color") return "#ffffff";
  switch (v.form) {
    case "hex":
      return `#${v.digits}`;
    case "rgb":
      return `rgb(${numberOf(v.r) * 255}, ${numberOf(v.g) * 255}, ${numberOf(v.b) * 255})`;
    case "oklch":
      return `oklch(${numberOf(v.l)} ${numberOf(v.c)} ${numberOf(v.h)})`;
    case "lab":
      return `lab(${numberOf(v.l) * 100}% ${numberOf(v.a)} ${numberOf(v.b)})`;
    default:
      return "#ffffff";
  }
}

function toThreeColor(v: JsonNode): THREE.Color {
  const c = new THREE.Color();
  try {
    c.setStyle(colorToCss(v));
  } catch {
    c.setHex(0xffffff);
  }
  return c;
}

// First-layer's pixel width defines the design canvas → 2 world units.
let pxToWorld = 1 / 540;

function buildRect(node: JsonNode): THREE.Object3D {
  const f = fields(node);
  const w = numberOf(f.width) * pxToWorld;
  const h = numberOf(f.height) * pxToWorld;
  const geom = new THREE.PlaneGeometry(w, h);
  const mat = new THREE.MeshBasicMaterial({ color: toThreeColor(f.fill) });
  return new THREE.Mesh(geom, mat);
}

function buildCompose(node: JsonNode): THREE.Object3D {
  const group = new THREE.Group();
  const layers = arrayElems(fields(node).layers);
  if (layers[0]?.kind === "constructed" && layers[0].name === "rect") {
    const bgW = numberOf(fields(layers[0]).width, 1920);
    pxToWorld = 2.0 / bgW;
  }
  layers.forEach((layer, i) => {
    const obj = buildValue(layer);
    if (!obj) return;
    obj.position.z = i * 0.001;
    group.add(obj);
  });
  return group;
}

function buildValue(node: JsonNode): THREE.Object3D | null {
  if (!node || node.kind !== "constructed") return null;
  switch (node.name) {
    case "compose":
      return buildCompose(node);
    case "rect":
      return buildRect(node);
    default:
      console.warn(`[cmotion-viewer] no translator for "${node.name}" — skipped`);
      return null;
  }
}

// ---- Duration extraction -----------------------------------------
//
// The video length is declared in the .cm source (e.g.
//   scene title(duration: Duration = 6s)
// ). The WASM doesn't yet expose this directly via an export, so we
// scrape it from the source as a stopgap. Robust enough for the
// taste-sample shape; replace with a `get_duration(handle)` export
// once we plumb the scene parameter through eval.

export function detectDurationSeconds(source: string, fallback = 6): number {
  // Common forms:
  //   duration: Duration = 6s
  //   duration: Duration = 1500ms
  //   duration = 6s
  const re = /\bduration\b\s*(?::\s*Duration)?\s*=\s*(\d+(?:\.\d+)?)\s*(s|ms|m)\b/i;
  const m = source.match(re);
  if (!m) return fallback;
  const v = parseFloat(m[1]);
  switch (m[2].toLowerCase()) {
    case "ms":
      return v / 1000;
    case "m":
      return v * 60;
    case "s":
    default:
      return v;
  }
}

// ---- Public viewer -----------------------------------------------

export interface ViewerHandle {
  load(source: string): void;
  seek(t: number): void;
  durationSeconds: number;
  versions: { cmotion: string; three: string };
  captureFrame(): Promise<Blob | null>;
  captureClip(durationSeconds?: number, fps?: number): Promise<Blob>;
  destroy(): void;
}

export async function boot(canvas: HTMLCanvasElement): Promise<ViewerHandle> {
  const exp = await loadWasm();
  const interpVersion = getVersion(exp);
  let handle = 0;
  let currentRoot: THREE.Object3D | null = null;
  let durationSeconds = 6;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const aspect = (canvas.clientWidth || 1) / (canvas.clientHeight || 1);
  const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.001, 100);
  camera.position.z = 5;

  const scene = new THREE.Scene();

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    const a = w / h;
    camera.left = -a;
    camera.right = a;
    camera.top = 1;
    camera.bottom = -1;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  function clearRoot() {
    if (!currentRoot) return;
    scene.remove(currentRoot);
    currentRoot.traverse((o: any) => {
      o.geometry?.dispose?.();
      const m = o.material;
      if (Array.isArray(m)) m.forEach((mm) => mm?.dispose?.());
      else m?.dispose?.();
    });
    currentRoot = null;
  }

  function applyFrame(t: number) {
    if (!handle) return;
    const tree = sample(exp, handle, t);
    const root = buildValue(tree);
    clearRoot();
    if (root) {
      scene.add(root);
      currentRoot = root;
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
    get durationSeconds() {
      return durationSeconds;
    },
    versions: { cmotion: interpVersion, three: THREE.REVISION },
    captureFrame() {
      return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    },
    captureClip(duration = durationSeconds, fps = 30) {
      const stream = canvas.captureStream(fps);
      const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : "video/webm";
      const rec = new MediaRecorder(stream, { mimeType: mime });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      return new Promise<Blob>((resolve) => {
        rec.onstop = () => resolve(new Blob(chunks, { type: "video/webm" }));
        rec.start();
        const t0 = performance.now();
        const tick = () => {
          const elapsed = (performance.now() - t0) / 1000;
          if (elapsed >= duration) {
            rec.stop();
            return;
          }
          applyFrame(elapsed);
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
