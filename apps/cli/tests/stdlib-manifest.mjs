// The checker's stdlib manifest (src/stdlib.zig) against the web viewer:
// every name the viewer gives meaning to must be a name `cmo check`
// knows, or a source using it fails with a false NAM003 — and since a
// check error fails `parse_eval_with`, it would not render either.
//
//   node tests/stdlib-manifest.mjs   (run by `zig build test-interp`)
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { WASI } from "node:wasi";

const cli = dirname(dirname(fileURLToPath(import.meta.url)));
const viewer = readFileSync(join(cli, "../web/src/scripts/cmotion-viewer.ts"), "utf8");

function fail(msg) {
  console.error(`[stdlib-manifest] FAIL: ${msg}`);
  process.exit(1);
}

// Names buildLayer dispatches on, and names compared against a node's
// `.name` anywhere (lights, materials, compose heads, …).
const names = new Set();
const layer = viewer.slice(viewer.indexOf("function buildLayer("));
const body = layer.slice(0, layer.indexOf("\n}\n"));
for (const m of body.matchAll(/case "([a-z_0-9.]+)":/g)) names.add(m[1]);
for (const m of viewer.matchAll(/\.name === "([a-z_0-9.]+)"/g)) names.add(m[1]);
for (const m of viewer.matchAll(/\bname === "([a-z_0-9.]+)"/g)) names.add(m[1]);
if (names.size < 20) fail(`found only ${names.size} viewer names; did the viewer's structure change?`);

const wasi = new WASI({ version: "preview1" });
const { instance } = await WebAssembly.instantiate(readFileSync(join(cli, "zig-out/bin/cmotion-render.wasm")), {
  wasi_snapshot_preview1: wasi.wasiImport,
});
const ex = instance.exports;
const enc = new TextEncoder();
const dec = new TextDecoder();

function diagnosticsOf(source) {
  const bytes = enc.encode(source);
  const p = ex.cm_alloc(bytes.length);
  new Uint8Array(ex.memory.buffer).set(bytes, p);
  const cap = 64 * 1024;
  const o = ex.cm_alloc(cap);
  const n = ex.scene_params(p, bytes.length, o, cap);
  const json = dec.decode(new Uint8Array(ex.memory.buffer, o, n));
  ex.cm_free(p, bytes.length);
  ex.cm_free(o, cap);
  return JSON.parse(json).diagnostics ?? [];
}

const unknown = [];
for (const name of [...names].sort()) {
  const src = `runner "0.0.14";\nuse std.shapes.*;\nlet probe = ${name}();\n`;
  const nam = diagnosticsOf(src).filter((d) => d.code === "NAM003");
  if (nam.length) unknown.push(name);
}
if (unknown.length) fail(`the viewer draws names the checker doesn't know (add them to src/stdlib.zig): ${unknown.join(", ")}`);
console.log(`[stdlib-manifest] all ${names.size} viewer names are in the checker's manifest`);
