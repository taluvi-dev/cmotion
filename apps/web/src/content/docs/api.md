---
title: Render API
description: Public HTTP API for rendering cmotion sources to PNG or MP4. Base URL is https://api.cmotion.org. No auth in v0. Designed for direct use by agents and scripts.
---

A hosted Cloudflare service that takes a `.cm` source and returns a
rendered single frame or video. The render runs inside a headless
Chromium that loads the same viewer used by [/editor](/editor) and
the homepage preview, so cloud output matches what authors see
locally.

**Base URL:** `https://api.cmotion.org`

**Machine-readable spec:** [`https://api.cmotion.org/openapi.json`](https://api.cmotion.org/openapi.json) (OpenAPI 3.1, served by the Worker itself, CORS-open). Point client generators or agents at this for the structured contract.

The API is async: every job goes through a `pending → ready` state
machine. You `POST` a source, get back a `job_id`, poll
`GET /v1/jobs/<id>` until the status flips, then `GET` the file
URL the response gives you.

Sources are expected to pin their runner with `runner "<semver>";`
at the top (e.g. `runner "0.0.3";`). Absent → the loader uses the
latest available runner. See [Determinism](#determinism) below for how
the pin keeps renders reproducible.

## Endpoints

### `POST /v1/render` — video (mp4)

Request body:

```json
{
  "source": "runner \"0.0.3\"; use std.shapes.*; scene s() -> Frame { rect(width: 1920px, height: 1080px, fill: #ff3399) }",
  "params": {
    "fps": 30,
    "duration": 6,
    "width": 1920,
    "height": 1080
  }
}
```

| Field             | Type             | Required | Notes                                                        |
| ----------------- | ---------------- | -------- | ------------------------------------------------------------ |
| `source`          | string           | yes      | The `.cm` source. Max 64 KiB.                                |
| `params.fps`      | integer          | no       | Default 30.                                                  |
| `params.duration` | number (seconds) | no       | Default reads from `scene s(duration: Duration = …)`.       |
| `params.width`    | integer          | no       | Default 1920.                                                |
| `params.height`   | integer          | no       | Default 1080.                                                |

Response **202**:

```json
{ "job_id": "9b6ace5e-d245-463b-b30e-6f1a7b73030b", "status": "pending", "kind": "video" }
```

### `POST /v1/frame` — single frame (png)

Request body:

```json
{
  "source": "runner \"0.0.3\"; …",
  "params": { "at": 1.5, "width": 1920, "height": 1080 }
}
```

`params.at` is the time in seconds to seek to before screenshotting. Default 0.

Response **202**: same shape as `/v1/render`, with `"kind": "frame"`.

### `GET /v1/jobs/<id>` — poll status

While pending:

```json
{ "job_id": "9b6…", "kind": "frame", "status": "pending", "created_at": 1779279543535 }
```

When ready:

```json
{
  "job_id":      "9b6…",
  "kind":        "frame",
  "status":      "ready",
  "url":         "/v1/outputs/9b6ace5e-d245-463b-b30e-6f1a7b73030b.png",
  "mime":        "image/png",
  "created_at":  1779279543535,
  "completed_at": 1779279547078
}
```

On failure (HTTP **500**):

```json
{ "job_id": "9b6…", "kind": "frame", "status": "error", "message": "PAR100 unexpected token" }
```

On unknown id (HTTP **404**):

```json
{ "error": "not_found" }
```

The `url` field is a path on this same host — prepend
`https://api.cmotion.org` to get the full URL.

### `GET /v1/outputs/<filename>` — fetch the render

Returns the rendered file inline with the appropriate
`content-type` (`image/png` or `video/mp4`). Cached for 24 hours.

### `GET /healthz` — liveness

Returns `ok\n`. Use for uptime checks.

## Polling cadence

A typical frame takes **3–6 s** end-to-end including container
cold-start; a typical video takes about **3 × duration** plus a
cold-start. Recommended polling interval: **2 s**. Files older
than 24 h get garbage-collected from R2.

## Limits

- One concurrent container instance, ever. Multiple incoming
  requests share the same render queue — long videos make
  subsequent requests wait.
- Max render duration: 5 min per job.
- Max source size: 64 KiB.
- No authentication in v0. Throughput is bounded by the
  single-container queue — only one render runs at a time, so
  requests serialize rather than fan out — plus the per-job size and
  duration clamps above. That single-instance cap is the effective
  rate limit and the cost ceiling.
- Container output is deleted from R2 after 24 h. Save what you
  want.

## Run your own instance

The hosted endpoint at `api.cmotion.org` is a shared, best-effort,
**single-container** service — fine for trying things and light use, but
it serializes everyone's jobs through one renderer. cmotion is
infrastructure, not a product, so **running your own instance is
encouraged** and is the right move for anything beyond casual use:
production workloads, higher throughput, private sources, or your own
size/duration limits.

Everything you need is in the (MIT-licensed) repo:

- the Worker — [`apps/api/`](https://github.com/taluvi-dev/cmotion/tree/main/apps/api) (`wrangler deploy`), and
- the frozen render runner — [`containers/<version>/`](https://github.com/taluvi-dev/cmotion/tree/main/containers) (`docker build` + push).

Point your client at your own base URL; the request/response shape is
identical. Run more than one container, or raise the per-job clamps, to
suit your own throughput and cost trade-offs.

**Agents:** if you have a sandbox, stand up a throwaway instance there
to test against — it's faster than the shared queue and fully private.
Build the runner and run it directly:

```sh
docker build -t cmotion-runner containers/0.0.3
docker run --rm -p 8080:8080 cmotion-runner   # serves HTTP on :8080
```

Then `POST /` with `{ "source": "<.cm>", "kind": "frame" | "video", "params": { … } }`
and it returns the rendered `image/png` or `video/mp4` directly (and
`GET /healthz` → `ok`). Same engine as the hosted API, no shared
container — ideal for iterating on a scene.

## CORS & agents

Every endpoint answers with fully open CORS —
`access-control-allow-origin: *`, and `allow-headers` / `allow-methods`
/ `expose-headers` all `*` — so an in-browser tool or agent can call the
API directly without a preflight rejecting a custom header. A
server-side agent doesn't deal with CORS at all (it's browser-enforced);
just `POST /v1/frame` (or `/v1/render`) and poll `GET /v1/jobs/<id>`.
The OpenAPI spec at `/openapi.json` is the structured contract to hand a
client generator.

## Determinism

Every renderer version is frozen in git under
[`containers/<version>/`](https://github.com/taluvi-dev/cmotion/tree/main/containers)
(`0.0.1`, `0.0.2`, `0.0.3`). A `.cm` source pinned to an older runner —
say `runner "0.0.1";` — is guaranteed to produce the same bytes against
that runner forever, even though the live stack is now at `0.0.3`.
Bumping the pin is an explicit opt-in to new behaviour.

## End-to-end example (curl + jq)

```bash
SRC='runner "0.0.3";
use std.shapes.*;
scene quick() -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: oklch(0.10, 0.04, 280));
  let fg = rect(width: 300px, height: 300px, fill: #ff3399);
  compose [bg, fg]
}'

# Enqueue
JOB=$(curl -sS -X POST https://api.cmotion.org/v1/frame \
  -H "content-type: application/json" \
  -d "$(jq -n --arg s "$SRC" '{source:$s}')")

ID=$(echo "$JOB" | jq -r .job_id)

# Poll
until RES=$(curl -sS https://api.cmotion.org/v1/jobs/$ID) \
      && STATUS=$(echo "$RES" | jq -r .status) \
      && [ "$STATUS" != "pending" ]; do
  sleep 2
done

# Download
URL=$(echo "$RES" | jq -r .url)
curl -sS -o quick.png "https://api.cmotion.org${URL}"
```

## End-to-end example (TypeScript / fetch)

```ts
const API = "https://api.cmotion.org";

async function renderFrame(source: string, at = 0): Promise<Blob> {
  const enq = await fetch(`${API}/v1/frame`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ source, params: { at } }),
  });
  if (!enq.ok) throw new Error(`enqueue failed: ${enq.status}`);
  const { job_id } = await enq.json();

  while (true) {
    await new Promise(r => setTimeout(r, 2000));
    const res = await fetch(`${API}/v1/jobs/${job_id}`);
    const body = await res.json();
    if (body.status === "ready") {
      const file = await fetch(`${API}${body.url}`);
      return file.blob();
    }
    if (body.status === "error") {
      throw new Error(`render failed: ${body.message}`);
    }
  }
}
```

## Error codes

`message` field surfaces upstream diagnostics from the CLI parser
(`PAR…`), lowerer (`LWR…`), namer (`NAM…`), and other passes —
see [Diagnostics](/language/diagnostics/) for the full namespace
table. Render-stage failures surface a short text reason on
`message` with no specific code in v0.

## Status

v0. Asset uploads (`POST /v1/assets`) are live — multipart upload
returns `{ assets: { "<filename>": "<key>" } }`, and the keys thread
into a render's `assets` field so a source can reference them by path.
Still expected: an MCP wrapper for one-shot agent use, rate-limit
headers, queue-depth in pending responses, and authentication. Removal
of fields will not happen without a versioned route.
