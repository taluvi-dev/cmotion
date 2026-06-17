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
- `0.0.3/` — adds the extruded-path primitive: `path(points: [...])`
  in `std.shapes` + `extrude(path, depth)` in `std.mesh3d`, rendered by
  both the native renderer and the frozen viewer (`buildExtrudePath`).
  `apps/api/wrangler.jsonc` pins `0.0.3-amd64`; ship it by building the
  image from this directory, pushing it as `cmotion-runner:0.0.3-amd64`,
  and redeploying with `apps/api/scripts/deploy.sh`. Sources opt in with
  `runner "0.0.3";`. Note the single pinned image renders every runner's
  sources — the per-version directories exist so each generation's bytes
  can be reproduced, not for per-pin worker routing.

- `0.0.5/` — adds, to the frozen viewer + driver: material `opacity:`, a
  vertical emissive `gradient(top:, bottom:)`, opt-in `bloom(...)`, the
  `svg(src, depth:, size:)` primitive (SVG → extruded 3D mesh, fills +
  strokes), triple-quoted raw strings in the grammar, and a `KIND=gif`
  output (ffmpeg two-pass palette) wired to the API's `POST /v1/gif`.
  `apps/api/wrangler.jsonc` pins `0.0.5-amd64`; ship it by building the
  image from this directory, pushing it as `cmotion-runner:0.0.5-amd64`
  (`wrangler containers push`), and redeploying with
  `apps/api/scripts/deploy.sh`. Sources opt in with `runner "0.0.5";`.

- `0.0.6/` — adds a `KIND=mesh` output: SVG → extruded 3D mesh exported as
  binary glTF (`.glb`) via three's GLTFExporter (no pixels rendered — the
  driver loads the viewer in mesh mode and calls its `svgToGlb` export).
  Wired to the API's `POST /v1/mesh`. `apps/api/wrangler.jsonc` pins
  `0.0.6-amd64`; build from this directory, push as
  `cmotion-runner:0.0.6-amd64`, redeploy with `apps/api/scripts/deploy.sh`.

- `0.0.7/` — fixes SVG→mesh extraction: thicken each stroke/fill region
  independently (not a pre-merged soup), detect boundaries undirected
  (winding-independent), seal walls both-ways, and export double-sided — so
  the back cap and the side band are watertight (no holes). Pins
  `0.0.7-amd64`.



- `0.0.10/` — reworks SVG→mesh to the glyph principle: stroked paths are
  converted to OUTLINE polygons (centreline offset by half the line width,
  round caps; closed paths → outer ring + inner hole) and fed to
  THREE.ExtrudeGeometry (the same call that extrudes glyphs), so icons render
  as outlines, watertight by construction. Adds a `round` param that bevels
  the edges (0 = square "qube"; → depth/2 rounds toward a tube). Supersedes
  the 0.0.7 hand-rolled thickener. Pins `0.0.10-amd64`.

- `0.0.12/` — adds `POST /v1/vectorize`: a raster line drawing → uniform
  single-line **centreline** SVG (binarize → gap-bridge dilation →
  Zhang–Suen thinning → greedy straight-continuation trace → RDP simplify →
  endpoint stitch). Output feeds straight into /v1/mesh, so a hand drawing
  becomes a watertight 3D solid. Image arrives via the assets flow; params:
  strokeWidth, threshold, simplify, bridge, stitch, maxDim. Pins 0.0.12.
