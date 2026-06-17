---
title: Reference interpreter
description: A tree-walking interpreter that serves as the executable spec.
---

The reference interpreter walks the AST directly. No codegen, no IR, no optimizations — its job is to be **obviously correct** and serve as the oracle that every backend is tested against.

## Why a tree-walker

Once the [grammar](/language/grammar/) and [type system](/language/types/) are locked, every other backend (WASM codegen, CanvasKit, WGSL) is conformance work. The reference interpreter is the conformance target. If `interpret(program) == backend(program)` for a corpus of test programs, the backend is correct.

## Implementation language

**Zig** (0.15.1). It won out for its C interop (tree-sitter, stb_truetype, asset codecs are all C), its WASM toolchain, and comptime that fits AST work. The same Zig core builds two ways: a native binary (`cmo`) and `cmotion-render.wasm` for the browser editor and the hosted render API. A future WGSL backend may live on `wgpu` (Rust) behind a C ABI.

## What runs today

`cmo eval` / `cmo render` walk the AST through `eval` → a time-sampler → a renderer. The renderer side has two interim backends — a native software rasteriser and a Three.js/WebGL viewer fed the interpreter's JSON value tree — so the same source renders in the CLI, the in-browser editor, and the hosted API. These stand in for the canonical CanvasKit/WGSL backends (roadmap 6–7) while the interpreter itself is the conformance oracle.

## Testing

A vitest/Zig conformance suite runs the WASM interpreter and compares against the native build; rendering is checked with golden-image diffs. As the WASM-codegen backend lands, its output will be compared against this interpreter headlessly in CI.

Status: **done** — the interpreter is built and renders 3D today (native + WASM). See [Roadmap](/roadmap/) stage 4.
