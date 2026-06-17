# containers/0.0.3 — render runner v0.0.3

The third version of the cmotion render container. One-shot
Chromium + ffmpeg, dispatched by `apps/api/` per render job.
Same driver and env-var contract as `0.0.2`; the only change is the
frozen interpreter + viewer bundle.

## What 0.0.3 adds

- **Extruded 2D paths.** `path(points: [vec2(x, y), …])` in
  `std.shapes` is the generic outline primitive, and
  `extrude(path, depth)` in `std.mesh3d` turns it into a solid that
  `render3d` projects to a `Layer`. The frozen WASM evaluates the
  `path` constructor and the viewer's `buildExtrudePath` translates it
  to a `THREE.Shape` → `ExtrudeGeometry`. Flat-shaded; no
  refraction/dispersion in this slice.

Sources opt in with `runner "0.0.3";`. `0.0.1` and `0.0.2` stay
byte-for-byte stable — their `containers/<version>/` directories are
untouched, so rebuilding either image reproduces its original output.

## Layout

```
0.0.3/
  Dockerfile               Playwright base + ffmpeg + bundled viewer.
  render.mjs               Playwright driver (HTTP-server + one-shot modes).
  probe.mjs                Smoke probe for the frozen viewer.
  package.json             Pins playwright-core to the base image's major.
  viewer/                  Frozen viewer bundle (HTML + JS + WASM + DM Sans + img).
```

The WASM and viewer artifacts are **committed**, not built at image
time — `freeze.sh` copies the relevant slice of `apps/web/dist/` into
`viewer/`. See the top-level `containers/README.md` for the versioning
contract and the env-var-in / R2-output-out interface.

## Shipping it

Build the image from this directory and push it to the Cloudflare
registry as `cmotion-runner:0.0.3-amd64` (the same way `0.0.1` /
`0.0.2` were published), then redeploy the worker with
`apps/api/scripts/deploy.sh`. `apps/api/wrangler.jsonc` pins
`0.0.3-amd64`.
