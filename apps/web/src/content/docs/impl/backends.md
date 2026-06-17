---
title: Backends
description: WASM components, CanvasKit (offline), and WGSL (realtime GPU).
---

cmotion has multiple backends so the same program runs on a CPU server, in a browser, on a GPU, or embedded in a host application. The language semantics are defined by the [reference interpreter](/impl/interpreter/); every backend must agree with it.

Today the interpreter renders through two **interim** backends — a native software rasteriser (`cmo render`) and a Three.js/WebGL viewer (the editor, the homepage preview, and the hosted [API](/api/)) fed the interpreter's JSON value tree. They make the language usable now; the three backends below are the canonical replacements.

## WASM component codegen

Compiles a cmotion program to a WASM component (Component Model). The component is the portable artifact — any host with a Component Model runtime (wasmtime, jco, browser) can load and run it.

Status: not started. See [Roadmap](/roadmap/) stage 5.

## CanvasKit (offline)

Deterministic offline render. CanvasKit (Skia compiled to WASM) draws each frame to a buffer; output is bit-identical across machines. This is the canonical export path — `.mp4`/`.png` sequences for final delivery.

Status: not started — but offline render already works today via the headless-Chromium runner behind the hosted [API](/api/) (`.png`/`.mp4` out); CanvasKit is the planned canonical replacement. See [Roadmap](/roadmap/) stage 6.

## WGSL (realtime)

GPU codegen to WGSL for realtime preview. Runs through `wgpu` so the same shader code targets Vulkan, Metal, DX12, and WebGPU. This is the canonical editor/preview path — interactive scrubbing, parameter tweaking, live reload.

Status: not started — realtime preview already works today via the Three.js/WebGL viewer in the [editor](/playground/); WGSL is the planned canonical replacement. See [Roadmap](/roadmap/) stage 7.

## Conformance

Backends are tested against the reference interpreter:

| Layer | How tested |
|---|---|
| Values | wasmtime, headless, every commit |
| Offline render | CanvasKit + golden PNG diffs, every commit |
| GPU render | `wgpu` headless adapter + golden diffs, nightly |
