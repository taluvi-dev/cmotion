// cmotion-three.js
//
// Walks the JSON value tree produced by `sample_at` and materialises
// it into a Three.js scene. The host calls `boot()` once on page load;
// the returned controller exposes `seek(seconds)` for the requestAnimationFrame
// loop and `captureFrame()` for PNG snapshot.
//
// This file is the *renderer half* of cmotion's browser pipeline.
// The other half is `cmotion-render.wasm` (parse + lower + eval +
// sampler). Anything we render here must be derivable from the JSON
// tree the WASM produces — no DSL knowledge lives outside the wasm.

import * as THREE from "/three.module.min.js";

// --- WASM bridge --------------------------------------------------

let exports, mem, handle;

async function loadWasm() {
  // wasi-libc imports must be stubbed — we never call _start, but
  // instantiation requires the symbols. The host never runs as a
  // wasi command, so most of these are no-ops; the few we do hit
  // (clock_time_get, proc_exit) get safe defaults.
  const stub = () => 0;
  const wasi = new Proxy({}, { get: () => stub });
  const resp = await fetch("/cmotion-render.wasm");
  const { instance } = await WebAssembly.instantiateStreaming(resp, {
    wasi_snapshot_preview1: wasi,
  });
  exports = instance.exports;
  mem = () => new Uint8Array(exports.memory.buffer);
}

function getVersion() {
  const cap = 64;
  const p = exports.cm_alloc(cap);
  const n = exports.get_version(p, cap);
  const v = new TextDecoder().decode(mem().subarray(p, p + n));
  exports.cm_free(p, cap);
  return v;
}

function parseEval(source) {
  const enc = new TextEncoder().encode(source);
  const p = exports.cm_alloc(enc.length);
  mem().set(enc, p);
  const h = exports.parse_eval(p, enc.length);
  exports.cm_free(p, enc.length);
  if (h === 0) throw new Error("parse_eval failed — check .cm source for syntax/eval errors");
  return h;
}

function sample(h, tSeconds) {
  // Grow the output buffer until sample_at fits. 64 KiB is plenty for
  // the parity fixture but a future scene with many layers could
  // overflow; double on miss.
  let cap = 64 * 1024;
  while (cap <= 4 * 1024 * 1024) {
    const p = exports.cm_alloc(cap);
    const tNs = BigInt(Math.floor(tSeconds * 1e9));
    const n = exports.sample_at(h, tNs, p, cap);
    if (n === 0 && cap > 64 * 1024) {
      // 0 may also mean genuine error, but we treat it as overflow
      // after the first attempt.
      exports.cm_free(p, cap);
      cap *= 2;
      continue;
    }
    if (n === 0) throw new Error(`sample_at returned 0 at t=${tSeconds}s`);
    const json = new TextDecoder().decode(mem().subarray(p, p + n));
    exports.cm_free(p, cap);
    return JSON.parse(json);
  }
  throw new Error("sample_at output exceeded 4 MiB");
}

// --- JSON tree → THREE.Object3D walkers ---------------------------
//
// Each "value kind" in the cmotion language maps to either a scene-
// graph node (compose, rect, ...) or an attribute (color, number,
// array). The walker is intentionally explicit: every constructor we
// support is named here. Unknown constructors render nothing and log
// a console warning so missing translator coverage shows up early.

function fields(node) {
  const out = {};
  for (const f of node.fields ?? []) out[f.name] = f.value;
  return out;
}

function numberOf(v, fallback = 0) {
  if (!v || v.kind !== "number") return fallback;
  return v.value;
}

function arrayElems(v) {
  return v && v.kind === "array" ? v.elems : [];
}

function colorToCss(v) {
  if (!v || v.kind !== "color") return "#ffffff";
  switch (v.form) {
    case "hex":
      return `#${v.digits}`;
    case "rgb":
      return `rgb(${numberOf(v.r) * 255}, ${numberOf(v.g) * 255}, ${numberOf(v.b) * 255})`;
    case "oklch":
      // CSS Color Level 4 — Three.js's Color.setStyle handles oklch
      // natively in supported browsers (Chrome 111+, Safari 16.4+,
      // Firefox 113+). The chroma value in cmotion is already in
      // the CSS-compatible range (0–0.4).
      return `oklch(${numberOf(v.l)} ${numberOf(v.c)} ${numberOf(v.h)})`;
    case "lab":
      return `lab(${numberOf(v.l) * 100}% ${numberOf(v.a)} ${numberOf(v.b)})`;
    default:
      return "#ffffff";
  }
}

function toThreeColor(v) {
  const c = new THREE.Color();
  try {
    c.setStyle(colorToCss(v));
  } catch {
    c.setHex(0xffffff);
  }
  return c;
}

// Pixel → world unit. Compose's first child sets the design canvas;
// we map its width to 2.0 world units so the orthographic camera at
// (0,0,1) frames it. Updated as we discover the design canvas size.
let pxToWorld = 1 / 540;

function buildRect(node) {
  const f = fields(node);
  const w = numberOf(f.width) * pxToWorld;
  const h = numberOf(f.height) * pxToWorld;
  const geom = new THREE.PlaneGeometry(w, h);
  const mat = new THREE.MeshBasicMaterial({ color: toThreeColor(f.fill) });
  return new THREE.Mesh(geom, mat);
}

function buildCompose(node) {
  const group = new THREE.Group();
  const layers = arrayElems(fields(node).layers);
  // First layer = "design canvas" — its width sets the px→world scale
  // so subsequent layers (typically content) get the right size.
  if (layers[0]?.kind === "constructed" && layers[0].name === "rect") {
    const bgW = numberOf(fields(layers[0]).width, 1920);
    pxToWorld = 2.0 / bgW; // design canvas spans 2 world units wide
  }
  layers.forEach((layer, i) => {
    const obj = buildValue(layer);
    if (!obj) return;
    // Stack layers along +z so later layers paint over earlier ones.
    obj.position.z = i * 0.001;
    group.add(obj);
  });
  return group;
}

function buildValue(node) {
  if (!node) return null;
  if (node.kind !== "constructed") return null;
  switch (node.name) {
    case "compose":
      return buildCompose(node);
    case "rect":
      return buildRect(node);
    // 3D path (extrude / material / rotate / scale / render3d /
    // ambient / directional / text.glyph) is the next slice. For now
    // the viewer covers the parity fixture (compose + rect).
    default:
      console.warn(`[cmotion-three] no translator for constructed "${node.name}" — skipped`);
      return null;
  }
}

// --- Public boot --------------------------------------------------

export async function boot({ canvas, statusEl }) {
  const setStatus = (s) => statusEl && (statusEl.textContent = s);

  setStatus("loading WASM…");
  await loadWasm();
  const interpVersion = getVersion();
  setStatus(`interp v${interpVersion} · three.js r${THREE.REVISION} — loading scene…`);

  const sourceResp = await fetch("/scene.cm");
  if (!sourceResp.ok) throw new Error("could not fetch /scene.cm");
  const source = await sourceResp.text();
  handle = parseEval(source);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const aspect = canvas.clientWidth / canvas.clientHeight;
  const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.001, 100);
  camera.position.z = 5;

  const scene = new THREE.Scene();
  let currentRoot = null;

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
  window.addEventListener("resize", resize);
  resize();

  function applyFrame(t) {
    const tree = sample(handle, t);
    const root = buildValue(tree);
    if (currentRoot) {
      scene.remove(currentRoot);
      currentRoot.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
    }
    if (root) {
      scene.add(root);
      currentRoot = root;
    }
    renderer.render(scene, camera);
  }

  return {
    seek(t) {
      applyFrame(t);
    },
    captureFrame() {
      // Synchronous canvas → PNG blob. Requires `preserveDrawingBuffer: true`
      // on the WebGL context (set above) so the framebuffer survives the
      // implicit clear after render().
      return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    },
    captureClip(durationSeconds, fps = 30) {
      // Browser-side video capture via MediaRecorder. Produces WebM
      // (VP9/VP8 depending on UA); MP4 would need WebCodecs muxing or
      // ffmpeg.wasm, deferred. The recorded stream replays exactly the
      // frames we paint, so a re-record on a different host with the
      // same (wasm, three.js) versions yields a frame-equivalent clip.
      const stream = canvas.captureStream(fps);
      const rec = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
      const chunks = [];
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      return new Promise((resolve) => {
        rec.onstop = () => resolve(new Blob(chunks, { type: "video/webm" }));
        rec.start();
        const t0 = performance.now();
        const tick = () => {
          const elapsed = (performance.now() - t0) / 1000;
          if (elapsed >= durationSeconds) {
            rec.stop();
            return;
          }
          applyFrame(elapsed);
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    versions: { cmotion: interpVersion, three: THREE.REVISION },
  };
}
