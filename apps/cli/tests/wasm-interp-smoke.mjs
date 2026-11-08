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

// --- host API: scene_params, parse_eval_with, diagnostics ---
//
// The same exports a host (the Plinken Motion tab, the editor) uses to
// build a props panel and to say why a source failed.

const enc = new TextEncoder();
const dec = new TextDecoder();

function withBytes(bytes, fn) {
  const p = exports.cm_alloc(bytes.length || 1);
  if (!p) fail("cm_alloc returned null");
  mem().set(bytes, p);
  try {
    return fn(p, bytes.length);
  } finally {
    exports.cm_free(p, bytes.length || 1);
  }
}

// Every JSON-writing export returns 0 when the buffer is too small, so
// a host grows the buffer and retries.
function readJson(call) {
  for (let cap = 256; cap <= 4 << 20; cap *= 4) {
    const out = exports.cm_alloc(cap);
    const n = call(out, cap);
    const text = n ? dec.decode(mem().subarray(out, out + n)) : null;
    exports.cm_free(out, cap);
    if (text !== null) return JSON.parse(text);
  }
  fail("JSON output never fit in 4 MiB");
}

const propsSrc = enc.encode(`runner "0.0.13";
use std.shapes.*;
scene card(
  // Card colour.
  fill: Color = #ff3399,
  size: Pixels = 96px,
) -> Frame {
  compose [rect(width: size, height: size, fill: fill)]
}
`);

// scene_params: the props panel's schema.
{
  const info = withBytes(propsSrc, (p, n) => readJson((o, c) => exports.scene_params(p, n, o, c)));
  if (!info.ok || info.scene !== "card") fail(`scene_params: ${JSON.stringify(info).slice(0, 300)}`);
  const [fill, size] = info.params;
  if (fill?.name !== "fill" || fill.prop !== "color" || fill.doc !== "Card colour.")
    fail(`scene_params fill: ${JSON.stringify(fill)}`);
  if (size?.unit !== "px" || size.default?.value?.value !== 96)
    fail(`scene_params size: ${JSON.stringify(size)}`);
}

function evalWith(srcBytes, args) {
  return withBytes(srcBytes, (p, n) =>
    withBytes(enc.encode(args), (ap, an) => exports.parse_eval_with(p, n, ap, an)),
  );
}

function sampleJson(handle, tNs = 0n) {
  const tree = readJson((o, c) => exports.sample_at(handle, tNs, o, c));
  exports.release(handle);
  return tree;
}

// parse_eval_with: arguments override defaults.
{
  const h = evalWith(propsSrc, `{"fill":"#00ff00","size":40}`);
  if (!h) fail(`parse_eval_with failed: ${JSON.stringify(readJson((o, c) => exports.diagnostics(o, c)))}`);
  const tree = JSON.stringify(sampleJson(h));
  if (!tree.includes("00ff00") || tree.includes("ff3399")) fail(`args not applied: ${tree.slice(0, 300)}`);
}

// parse_eval_with("{}") samples exactly what parse_eval samples.
{
  const a = sampleJson(withBytes(src, (p, n) => exports.parse_eval(p, n)));
  const b = sampleJson(evalWith(src, "{}"));
  if (JSON.stringify(a) !== JSON.stringify(b)) fail("parse_eval_with({}) differs from parse_eval");
}

// A wrong argument fails with an EVL005 that names it.
{
  const h = evalWith(propsSrc, `{"size":"big"}`);
  if (h !== 0) fail("parse_eval_with accepted a string for a Pixels parameter");
  const report = readJson((o, c) => exports.diagnostics(o, c));
  const d = report.diagnostics?.[0];
  if (report.ok || d?.code !== "EVL005" || !d.message.includes("'size'"))
    fail(`expected EVL005 naming 'size': ${JSON.stringify(report).slice(0, 300)}`);
}

// A syntax error is reported at its line.
{
  const h = withBytes(enc.encode("let a = 1;\nlet b = ;\n"), (p, n) => exports.parse_eval(p, n));
  if (h !== 0) fail("parse_eval accepted a syntax error");
  const d = readJson((o, c) => exports.diagnostics(o, c)).diagnostics?.[0];
  if (d?.code !== "PAR100" || d.line !== 2) fail(`expected PAR100 on line 2: ${JSON.stringify(d)}`);
}

console.log("[wasm-interp] scene_params + parse_eval_with + diagnostics OK");
