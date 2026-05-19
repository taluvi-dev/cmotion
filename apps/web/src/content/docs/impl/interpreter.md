---
title: Reference interpreter
description: A tree-walking interpreter that serves as the executable spec.
---

The reference interpreter walks the AST directly. No codegen, no IR, no optimizations — its job is to be **obviously correct** and serve as the oracle that every backend is tested against.

## Why a tree-walker

Once the [grammar](/language/grammar/) and [type system](/language/types/) are locked, every other backend (WASM codegen, CanvasKit, WGSL) is conformance work. The reference interpreter is the conformance target. If `interpret(program) == backend(program)` for a corpus of test programs, the backend is correct.

## Implementation language

To be decided. Leading candidates:

- **Zig** — best-in-class C interop (tree-sitter, audio analyzers, asset codecs are all C/C++), excellent WASM toolchain, comptime fits AST work, `World`-capability-style I/O via explicit allocators.
- **Rust** — mature ecosystem, first-class tree-sitter bindings, shares a codebase with the WGSL backend (which lives on `wgpu`, also Rust).

Likely split: **Zig for the interpreter + CanvasKit/audio side; Rust for the WGSL backend.** A C ABI sits between them.

## Testing

Conformance tests use [wasmtime](https://wasmtime.dev/) to run WASM-codegen output and compare values against the interpreter, headlessly in CI. Rendering tests use golden PNG diffs (CanvasKit native, `wgpu` headless).

Status: not started. See [Roadmap](/roadmap/) stage 4.
