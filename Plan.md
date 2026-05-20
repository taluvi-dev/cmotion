# Plan.md — handoff for the next agent

Working hand-off. Read `CLAUDE.md` first for durable project
orientation; this file is *what just shipped* and *what to pick up*.
The canonical syntactic spec lives at
https://cmotion.org/language/grammar/#ebnf (mirrored as `GRAMMAR.md`).

## What just shipped

The visual-fidelity arc, the WASM interpreter, and a working
browser editor are all done. Recent work, in rough order:

- **Browser editor at `/editor`** runs the WASM interpreter and
  feeds the resulting JSON value tree into a Three.js viewer. Same
  pipeline drives the homepage `ScenePreview`.
- **CodeMirror in the editor** with line numbers, drawn selections,
  active-line highlight, indent-with-tab, and full undo/redo.
- **Toolbar above the code pane** with Undo / Redo / Copy / Clear.
  History buttons reflect `undoDepth` / `redoDepth` live.
- **Dot-triggered member completion.** Type `.` after `std`,
  `easing`, an aliased module (`text` once `use std.text;` is in
  scope), or a closing `)` and a small popover appears next to the
  caret. Hand-curated symbol table in
  `apps/web/src/scripts/cmotion-completion.ts`; positions via
  `view.coordsAtPos` and renders `position: fixed` on `<body>` so
  `.cm-editor`'s `overflow: hidden` doesn't clip it.
- **Video export records the timeline live.** Scrub bar and time
  label sweep through 0→duration during `captureClip`; the
  capture is no longer a frozen step-by-step.
- **`pnpm deploy:web`** at the repo root — builds `apps/web` then
  runs `wrangler pages deploy apps/web/dist --project-name
  cmotion-web`. Requires `CLOUDFLARE_ACCOUNT_ID` in env (the repo
  is public, so no account ID is baked in). **No automated
  git-triggered deploy** exists — pushing to `main` does not
  publish.

## What to pick up — Hosted render API on Cloudflare

Spec lives in `TODO.md` under "Top priority — infrastructure". A
new `apps/api/` package for the Worker, separate from `apps/web/`,
so the API and the docs site deploy independently. The render
container lives at the repo root under `containers/<version>/` —
each version is a frozen runner generation, and `.cm` sources declare
which runner they target so renders stay reproducible across
stack bumps.

Topology summary (full version in TODO.md):

```
client → Worker (Hono) ──┬── Container (Playwright + Chromium + ffmpeg, one-shot, max 1)
                         ├── D1   (jobs table — source, params, manifest, status)
                         └── R2   (outputs/, staging/, gallery/ prefixes)
```

Endpoints: `POST /v1/assets`, `POST /v1/render`, `POST /v1/frame`,
`GET /v1/jobs/:id`. One concurrent container, ever — the cost
ceiling. No auth in v0, just CF rate limiting + per-job clamps.

### Open before writing code

These are decisions we left implicit in TODO.md that need to land
before the first commit:

- **Worker framework.** TODO says Hono. Confirm or pick.
- **Container base image tag.** TODO names
  `mcr.microsoft.com/playwright:v1.56.0-noble` — verify it's still
  current; pin the exact tag in the Dockerfile.
- **Image build path.** TODO calls for `wrangler containers
  deploy` from a GH Action on pushes to main affecting
  `apps/web/src/scripts/`, `apps/cli/src/wasm_entry.zig`, or
  `apps/api/container/`. Decide whether v0 builds the image
  manually instead, to avoid blocking on CI plumbing.
- **D1 / R2 names + bindings.** Drop into `apps/api/wrangler.toml`.
  Pick names now so they don't churn later.
- **Local dev story.** `wrangler dev` covers the Worker. The
  container side likely runs against a real Cloudflare account
  (Containers don't have a local emulator at writing). Document
  the workflow before depending on it.
- **NSFW classifier choice.** TODO names Workers AI image
  classification with SightEngine fallback. Pick one path for v0;
  fallback ladder can come later.

### First commit shape

Scaffolding only — no container, no render path yet:

1. `apps/api/` with `package.json`, `wrangler.toml`, `src/index.ts`
   (Hono app), and a D1 migration creating the `jobs` table from
   TODO.md.
2. `GET /v1/jobs/:id` backed by D1, returning the documented
   status envelope.
3. Stub `POST /v1/render` that writes a `pending` row, returns the
   id, and does nothing else. Lets the polling shape settle
   before the container exists.

The Container, ffmpeg loop, R2 outputs, and asset upload pipeline
land as separate commits on top of this scaffold.

## What's deferred

- **Native renderer polish** (bevels, smooth normals, GGX,
  `cmo bounce`) — `TODO.md` → "Native renderer polish (deferred)".
  Doesn't block anything since cloud renders go through headless
  Chromium and the JS viewer, not `render.zig`.
- **`Signal<T>` as a first-class type** — `TODO.md` → "Top
  priority — type system". The other top-priority track. Open it
  after the API ships, or in parallel if a different contributor
  picks it up.
- **High-impact language features** (`group`, `seq`, particles,
  camera DSL, custom shaders) — all wait on `Signal<T>`.
