---
title: For agents
description: How an AI agent renders cmotion — use the hosted API, or build your own instance in a sandbox. Plus how to build and test the toolchain.
---

cmotion is **infrastructure you can drive programmatically**. It parses,
type-checks, evaluates, and renders 3D scenes to PNG or MP4 — there's a
working interpreter, a hosted render API, and a self-contained render
container. This page is the fast path for an agent.

Machine-readable discovery, for agents that prefer structured input:

- [`/.well-known/agent.json`](https://cmotion.org/.well-known/agent.json) — a manifest: API base, endpoints, OpenAPI, and self-host pointers.
- [`api.cmotion.org/openapi.json`](https://api.cmotion.org/openapi.json) — the OpenAPI 3.1 contract (CORS-open).
- [`/llms.txt`](https://cmotion.org/llms.txt) — the site summary for crawlers.

## Option A — render via the hosted API

No setup. `POST` a `.cm` source, poll until ready, fetch the file. See
the [Render API reference](/api/) for the full contract; the loop is:

```sh
# enqueue a frame
JOB=$(curl -sS -X POST https://api.cmotion.org/v1/frame \
  -H 'content-type: application/json' \
  -d '{"source":"runner \"0.0.3\"; use std.shapes.*; scene s() -> Frame { rect(width:1920px,height:1080px,fill:#ff3399) }","params":{"at":0}}')
ID=$(echo "$JOB" | jq -r .job_id)
# poll, then download
until R=$(curl -sS https://api.cmotion.org/v1/jobs/$ID); \
      [ "$(echo "$R" | jq -r .status)" != pending ]; do sleep 2; done
curl -sS -o out.png "https://api.cmotion.org$(echo "$R" | jq -r .url)"
```

The hosted endpoint is a **shared, single-container** service — it
serializes everyone's jobs through one renderer. Fine for a few calls;
for anything more, use Option B.

## Option B — build your own instance in your sandbox (recommended for testing)

If you have a sandbox with Docker, stand up a **private** renderer — no
shared queue, faster iteration, same engine. Build the frozen runner and
run it directly:

```sh
docker build -t cmotion-runner containers/0.0.3
docker run --rm -p 8080:8080 cmotion-runner      # serves HTTP on :8080
```

Then render with a single `POST`:

```sh
curl -sS -X POST http://localhost:8080/ \
  -H 'content-type: application/json' \
  -d '{"source":"<.cm source>","kind":"frame","params":{"at":0,"width":640,"height":360}}' \
  -o out.png
# kind: "frame" -> image/png, "video" -> video/mp4. GET /healthz -> ok
```

The container runs the same wasm interpreter through a headless-Chromium
viewer (and ffmpeg for video), so its bytes match the hosted API for the
same `runner` pin.

## Building and testing the toolchain

To work on the language itself (not just render), bootstrap a checkout
with **`init.sh`** at the repo root — it installs the pinned Zig,
vendors the native deps, installs the pnpm workspace, and builds the CLI
+ the WASM interpreter:

```sh
git clone https://github.com/taluvi-dev/cmotion && cd cmotion
./init.sh
cd apps/cli && zig build test     # headless unit tests, no display
./zig-out/bin/cmotion check file.cm   # parse + narrow type checks (JSON via --json)
./zig-out/bin/cmotion render --out frame.ppm file.cm
```

`cmo check --json` emits a stable diagnostic envelope (codes like
`PAR100`, `NAM003`, `LWR001`) — see [Diagnostics](/language/diagnostics/)
— so you can act on failures programmatically.

## Determinism

Pin the runner at the top of every source: `runner "0.0.3";`. Each
runner version is frozen in git under `containers/<version>/`, so a
pinned source renders the same bytes forever, even as the live stack
moves on. Omitting the pin uses the latest runner. See
[Determinism](/api/#determinism).
