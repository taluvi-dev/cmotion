// WASM ↔ native parity test.
//
// Renders `tests/fixtures/wasm-parity.cm` two ways:
//   1. Native CLI: parse + lower + eval + sampler + render → PPM on disk
//   2. WASM build: render_taste(w, h, ptr) → RGBA in linear memory
//
// Asserts every pixel's RGB triple matches. The native render uses
// PPM (P6) which is already alpha-premultiplied-against-black; the
// WASM framebuffer is RGBA with alpha=255 wherever paint happened,
// so the RGB bytes line up by construction.
//
// Run via `zig build test-parity` or directly with:
//   node tests/wasm-parity.mjs

import { execFileSync } from "node:child_process";
import { readFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// .../apps/cli/tests/wasm-parity.mjs → .../apps/cli
const repoCli = dirname(dirname(fileURLToPath(import.meta.url)));
const cmotion = join(repoCli, "zig-out/bin/cmotion");
const wasmPath = join(repoCli, "zig-out/bin/cmotion-render.wasm");
const fixture = join(repoCli, "tests/fixtures/wasm-parity.cm");

const W = 320;
const H = 180;

function fail(msg) {
  console.error(`[wasm-parity] ${msg}`);
  process.exit(1);
}

// --- Native render → PPM bytes (header stripped to RGB payload) ---
const tmp = mkdtempSync(join(tmpdir(), "cmo-parity-"));
const nativePpm = join(tmp, "native.ppm");
try {
  execFileSync(cmotion, ["render", "--out", nativePpm, fixture], { stdio: "pipe" });
} catch (e) {
  fail(`native render failed: ${e.stderr?.toString?.() ?? e.message}`);
}
const ppm = readFileSync(nativePpm);

// PPM header is `P6\n{w} {h}\n{maxval}\n` — strip three newline-
// terminated lines, leaving exactly w*h*3 bytes of RGB.
let headerEnd = 0;
let lines = 0;
while (lines < 3 && headerEnd < ppm.length) {
  if (ppm[headerEnd] === 0x0a) lines++;
  headerEnd++;
}
const nativeRgb = ppm.subarray(headerEnd);
const expected = W * H * 3;
if (nativeRgb.length !== expected) {
  fail(`native PPM payload was ${nativeRgb.length} bytes, expected ${expected}`);
}

// --- WASM render → RGBA from linear memory ---
const wasm = await WebAssembly.instantiate(readFileSync(wasmPath), {});
const { exports } = wasm.instance;
const bytes = W * H * 4;
const ptr = exports.alloc(bytes);
if (!ptr) fail("WASM alloc returned null");
const status = exports.render_taste(W, H, ptr);
if (status !== 0) fail(`render_taste returned ${status}`);
const wasmRgba = new Uint8Array(exports.memory.buffer, ptr, bytes);

// --- Compare ---
let mismatches = 0;
let firstMismatch = -1;
for (let p = 0; p < W * H; p++) {
  for (let c = 0; c < 3; c++) {
    if (nativeRgb[p * 3 + c] !== wasmRgba[p * 4 + c]) {
      if (firstMismatch < 0) firstMismatch = p;
      mismatches++;
    }
  }
}

if (mismatches > 0) {
  const p = firstMismatch;
  const y = Math.floor(p / W);
  const x = p % W;
  const n = [nativeRgb[p * 3], nativeRgb[p * 3 + 1], nativeRgb[p * 3 + 2]];
  const w = [wasmRgba[p * 4], wasmRgba[p * 4 + 1], wasmRgba[p * 4 + 2]];
  fail(
    `${mismatches} pixel channels differ. First at (${x},${y}): ` +
      `native=(${n.join(",")}) wasm=(${w.join(",")})`,
  );
}

console.log(`[wasm-parity] ${W}×${H} RGB pixels identical between native and WASM`);
