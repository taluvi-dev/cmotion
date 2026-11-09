---
title: Reference interpreter
description: A tree-walking interpreter that serves as the executable spec.
---

The reference interpreter walks the AST directly. No codegen, no IR, no optimizations — its job is to be **obviously correct** and serve as the oracle that every backend is tested against.

## Why a tree-walker

Once the [grammar](/language/grammar/) and [type system](/language/types/) are locked, every other backend (WASM codegen, CanvasKit, WGSL) is conformance work. The reference interpreter is the conformance target. If `interpret(program) == backend(program)` for a corpus of test programs, the backend is correct.

## Implementation language

**Zig** (0.15.1). It won out for its C interop (tree-sitter, stb_truetype, asset codecs are all C), its WASM toolchain, and comptime that fits AST work. The same Zig core builds two ways: a native binary (`cmo`) and `cmotion-render.wasm` for the browser editor and the hosted render API. A future WGSL backend may live on `wgpu` (Rust) behind a C ABI.

## What it does

`cmo eval` / `cmo render` walk the AST through `eval` → a time-sampler → a renderer. The renderer side has two interim backends — a native software rasteriser and a Three.js/WebGL viewer fed the interpreter's JSON value tree — so the same source renders in the CLI, the in-browser editor, and the hosted API. These stand in for the canonical CanvasKit/WGSL backends (roadmap 6–7) while the interpreter itself is the conformance oracle.

## Embedding: the WASM host API

`cmotion-render.wasm` is how a host (the editor, the hosted API, an app such as Plinken) runs the interpreter. Strings go in through `cm_alloc` / `cm_free`. Every export that writes JSON returns the number of bytes written, or `0` when the output buffer is too small, so the host grows the buffer and retries.

| Export | Does |
|---|---|
| `get_version(out, cap)` | The WASM ABI version (`0.2.0`). |
| `parse_eval(src, len)` → handle | Parse, lower and evaluate; sample the first top-level binding. `0` on failure. |
| `parse_eval_with(src, len, args, args_len)` → handle | Like `parse_eval`, with the **entry scene's** arguments as a JSON object by parameter name. The entry scene is the first `scene` declaration, and it is what gets sampled. The source is also checked as `cmo check` does. |
| `sample_at(handle, t_ns, out, cap)` | The value tree at `t` nanoseconds, as JSON. |
| `release(handle)` | Free a handle. |
| `scene_params(src, len, out, cap)` | The entry scene's parameters, without running its body: the diagnostic envelope plus `scene` and `params`. |
| `diagnostics(out, cap)` | The diagnostic envelope (`{ schemaVersion, ok, diagnostics }`) of the last `parse_eval` / `parse_eval_with`, so a host can say why a handle is `0`. |

A scene's parameters are its props. `scene_params` describes each one:

```json
{ "name": "duration", "type": "Duration", "prop": "number", "unit": "s",
  "required": false,
  "default": { "source": "6s", "value": { "kind": "number", "value": 6, "unit": "s" } },
  "doc": "How long the title runs." }
```

- `prop` is the kind of JSON value that sets it (`number`, `int`, `bool`, `string`, `color`), or `null` when arguments cannot set the type yet.
- `unit` is the unit that number is in. Hosts pass times in seconds, angles in degrees, lengths in pixels and colours as `"#rrggbb"`.
- `doc` is the `//` comment block directly above the parameter.

`parse_eval_with(src, "{}")` renders exactly what `parse_eval(src)` renders. An argument that names no parameter, or has the wrong kind of value, fails with [`EVL005`](/language/diagnostics/#evl005--scene-argument-does-not-match-the-entry-scene), which names the parameter. A required parameter left out fails with `EVL004`.

### The frame: `$output`

A host says what it renders into with the reserved key `$output` among
the arguments (a parameter name can't start with `$`):

```json
{ "title": "Launch day",
  "$output": { "width": 1080, "height": 1920, "fps": 30, "duration": 15,
               "safe": { "top": 220, "right": 40, "bottom": 320, "left": 40 } } }
```

Pixels, frames per second and seconds; any field left out keeps its
default (1920 × 1080, 30 fps, 5 s, no margins). From runner `0.0.14` the
source reads it as `output` — `output.width`, `.height`, `.aspect`,
`.fps`, `.duration`, `.safe.top` / `.right` / `.bottom` / `.left` — so one
scene lays itself out for 16:9, 1:1 and 9:16. A value of the wrong kind,
or an unknown `$` key, fails with `EVL005`.

## Testing

A vitest/Zig conformance suite runs the WASM interpreter and compares against the native build; rendering is checked with golden-image diffs. As the WASM-codegen backend lands, its output will be compared against this interpreter headlessly in CI.

Status: **done** — the interpreter is built and renders 3D (native + WASM). See [Roadmap](/roadmap/) stage 4.
