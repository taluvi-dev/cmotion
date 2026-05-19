// Interpreter-in-WASM smoke test.
//
// Loads `cmotion-render.wasm`, calls `parse_eval` on a small `.cm`
// program, then calls `sample_at(0)` and parses the resulting JSON.
// Asserts the produced value tree has the expected top-level shape.
//
// This is the entry point for the "interpreter feeds a JS renderer"
// architecture: any consumer (Three.js, native canvas, Cloudflare
// container) drives the .cm by calling parse_eval once and sample_at
// per frame.
//
// Run via `zig build test-interp` or directly:
//   node tests/wasm-interp-smoke.mjs

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { WASI } from "node:wasi";

const repoCli = dirname(dirname(fileURLToPath(import.meta.url)));
const wasmPath = join(repoCli, "zig-out/bin/cmotion-render.wasm");
const fixture = join(repoCli, "tests/fixtures/wasm-parity.cm");

function fail(msg) {
  console.error(`[wasm-interp] ${msg}`);
  process.exit(1);
}

const wasi = new WASI({ version: "preview1" });
const wasm = await WebAssembly.instantiate(readFileSync(wasmPath), {
  wasi_snapshot_preview1: wasi.wasiImport,
});
const { exports } = wasm.instance;
const mem = () => new Uint8Array(exports.memory.buffer);

// --- version probe ---
{
  const cap = 64;
  const p = exports.cm_alloc(cap);
  const n = exports.get_version(p, cap);
  if (n === 0) fail("get_version returned 0");
  const v = new TextDecoder().decode(mem().subarray(p, p + n));
  console.log(`[wasm-interp] DSL version: ${v}`);
  exports.cm_free(p, cap);
}

// --- parse + eval the fixture ---
const src = readFileSync(fixture);
const srcPtr = exports.cm_alloc(src.length);
if (!srcPtr) fail("cm_alloc(src) returned null");
mem().set(src, srcPtr);
const handle = exports.parse_eval(srcPtr, src.length);
exports.cm_free(srcPtr, src.length);
if (handle === 0) fail("parse_eval returned 0 (parse/lower/eval failed)");

// --- sample at t=0 ---
const outCap = 64 * 1024;
const outPtr = exports.cm_alloc(outCap);
const written = exports.sample_at(handle, 0n, outPtr, outCap);
if (written === 0) fail("sample_at returned 0 bytes");
const json = new TextDecoder().decode(mem().subarray(outPtr, outPtr + written));
exports.cm_free(outPtr, outCap);
exports.release(handle);

// --- shape assertions ---
let tree;
try {
  tree = JSON.parse(json);
} catch (e) {
  fail(`sample_at output is not valid JSON: ${e.message}\n---\n${json.slice(0, 400)}`);
}

// The fixture's `compose [bg, fg]` lowers to a Value.constructed
// named "compose" with a `layers` field carrying an array.
if (tree?.kind !== "constructed" || tree.name !== "compose") {
  fail(`expected top-level constructed("compose"), got ${JSON.stringify(tree).slice(0, 200)}`);
}
const layers = tree.fields?.find((f) => f.name === "layers");
if (!layers || layers.value?.kind !== "array") {
  fail(`expected "layers" array field, got ${JSON.stringify(tree.fields).slice(0, 200)}`);
}
if (layers.value.elems.length !== 2) {
  fail(`expected 2 layers, got ${layers.value.elems.length}`);
}

console.log(
  `[wasm-interp] parse_eval + sample_at OK — ` +
    `${written} bytes JSON, ${layers.value.elems.length} layers in compose`,
);
