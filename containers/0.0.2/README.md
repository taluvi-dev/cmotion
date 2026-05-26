# containers/0.0.1 — render runner v0.0.1

The first version of the cmotion render container. One-shot
Chromium + ffmpeg, dispatched by `apps/api/` per render job.
Matches the runner pin emitted in the current examples (`runner
"0.0.1";`). See `TODO.md` → "Renderer: headless Chrome" and
"Container" sections for the full spec.

## Layout (planned)

```
0.0.1/
  Dockerfile               Playwright base + ffmpeg + bundled viewer.
  render.mjs               Playwright driver: load viewer/index.html,
                           seek + screenshot each frame, pipe to ffmpeg,
                           upload to R2.
  cmotion-render.wasm      Frozen WASM interpreter for runner 0.0.1.
  viewer/                  Frozen viewer bundle (HTML + JS + DM Sans).
```

The WASM and viewer artifacts are **committed to git**, not built
at image time. Image build just `COPY`s them in. See the top-level
`containers/README.md` for the reasoning.

## Status

Empty — scaffolding lives in `apps/api/` first; this gets fleshed
out once the Worker stub + dispatch wiring works against a fake
container.

See the top-level `containers/README.md` for the versioning
contract and the env-var-in / R2-output-out interface every
runner version must satisfy.
