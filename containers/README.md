# containers/

Versioned snapshots of the render container that
`apps/api/` dispatches. Each `<version>/` directory is a frozen
generation of the renderer stack; bumping any of the components
below means creating a new `<version>/` (semver-bumped), *never* mutating an existing
folder.

## Why versioned

A `.cm` source declares which runner it targets (e.g. `runner
"0.0.1";`) so renders stay reproducible after the stack moves
forward. Old sources keep producing identical bytes against their
pinned runner; new features land in the next runner version and
are opted into by raising the pin.

## What's committed per runner

Each `<version>/` is **self-contained**. The interpreter and viewer
artifacts are checked into git as frozen blobs, not fetched at
image-build time:

```
<version>/
  Dockerfile               How the image is assembled.
  render.mjs               Playwright driver.
  cmotion-render.wasm      Frozen WASM interpreter for this runner.
  viewer/                  Frozen viewer bundle (HTML + JS + assets).
```

This means:

- A runner 0.0.1 image always uses WASM 0.0.1 and viewer 0.0.1 —
  even after `apps/cli/` and `apps/web/` evolve. No "we'll
  rebuild what was in main at the time" hand-wave.
- The full diff of what changed between two runners is visible
  in git: `git diff containers/0.0.1 containers/0.0.2` shows the
  WASM blob, viewer JS, Dockerfile, driver — everything.
- Renderer regressions get bisected by checking out an old
  runner directory, not by archeology on the CLI build.

Size cost is small: WASM is ~350 KB compressed, viewer bundle ~1
MB. Ten runner versions = ~13 MB of binary blobs. Acceptable.

## What forces a version bump

- Chromium / Playwright major version
- ffmpeg major version or codec defaults
- Viewer bundle ABI (the `window.__viewer.seek(t)` /
  `window.__viewerReady` contract, or anything the driver script
  reaches into)
- WASM interpreter — *any* change to the rendered output.
  Determinism bumps too: even an opt-in faster fast path that
  produces identical bytes is fine inside a runner; a change
  that shifts a single pixel is a new runner.

Patch-level changes that don't touch the rendered output (a typo
in `render.mjs`, a Chromium PATCH bump) get a new image tag
without a version bump — same `containers/<version>/` source,
new SHA.

## Cross-version contract

Every `containers/<version>/` image must accept the same env-var
interface and exit with the same conventions, so the Worker
doesn't need a per-version dispatcher:

| Env var       | Meaning                                            |
|---------------|----------------------------------------------------|
| `JOB_ID`      | D1 row id; container uses this to name R2 outputs. |
| `SOURCE`      | The `.cm` source as a string.                      |
| `ASSETS_JSON` | `{ "/earth.png": "asset_<uuid>", … }`              |
| `KIND`        | `video` \| `frame`.                                |
| `PARAMS_JSON` | `{ fps?, duration?, at?, width?, height?, format? }` |
| `R2_PREFIX`   | Where to put outputs (`outputs/`).                 |

On success: exit 0, output written to
`<R2_PREFIX>/<JOB_ID>.<ext>`. On failure: non-zero exit, last
line on stderr is `code=<DIAGCODE> message=<one-liner>` so the
Worker can surface the diagnostic to the client.

## Status

- `0.0.1/` — deployed (`cmotion-runner:0.0.1-amd64`). Headless-Chromium
  driver + frozen viewer; renders the original examples.
- `0.0.2/` — adds the `metaballs` SDF shader, coloured + spot lights,
  and the per-letter title to the frozen viewer, so the lava-lamp
  example and the updated title render in the cloud. `apps/api/
  wrangler.jsonc` already pins `0.0.2-amd64`; to ship it, build the
  image from this directory and push it to the Cloudflare registry as
  `cmotion-runner:0.0.2-amd64` (the same way `0.0.1` was published),
  then redeploy the worker with `apps/api/scripts/deploy.sh`. Sources
  opt into the new features with `runner "0.0.2";`.
