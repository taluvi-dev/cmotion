# TODO.md — language design items in flight

Forward-looking design work for cmotion. `Plan.md` is the working
hand-off for whatever branch is open; this file is the longer-arc
list of language and stdlib decisions that aren't yet sketched in
the grammar or the sampler.

Ordered by leverage, not by what's easy.

---

## Top priority — infrastructure

### Hosted render API on Cloudflare

The renderer is **open source — anyone deploys this Worker + container
on their own Cloudflare account**. Our `api.cmotion.org` instance (and
the cmotion.org `/editor` + the planned `@cmotion/mcp`) is a
**playground/demo**, not a render-as-a-service: the caps, quotas, and
sweeps below are playground guardrails, not a pricing tier. For real
use, run your own.

A public endpoint that takes a `.cm` source plus its uploaded
asset images (or external URLs) and returns either a rendered video or a
single frame. The renderer is a one-shot Cloudflare Container per job,
capped at one concurrent instance; the Worker dispatches via the
Containers binding and tracks every job in D1. The Worker lives
in a new `apps/api/` package — separate from `apps/web/` so the
API and the docs site deploy independently. The container itself
lives at the repo root under `containers/<version>/`, versioned per
runner generation (Chromium / ffmpeg / viewer-ABI bump = new
folder, never mutate an existing one). A `.cm` source declares
which runner it targets (`runner "0.0.1";`) so renders stay byte-stable
across stack moves. See `containers/README.md` for the
cross-version env contract.

**Endpoints (v1):**

- `POST /v1/assets` — multipart upload, body is one or more files
  each with a friendly `name` (e.g. `earth.png`). Returns
  `200 { keys: ["asset_<uuid>", ...] }`. Per-upload size + count
  caps enforced.
- `POST /v1/render` — `{ source, assets: ["asset_<uuid>", ...],
  fps?, duration?, format? }` → `202 { job_id, kind: "video" }`.
  Default format `mp4`.
- `POST /v1/frame` — `{ source, assets: [...], at, width?,
  height? }` → `202 { job_id, kind: "frame" }`. Output is PNG.
- `GET /v1/jobs/:job_id` — poll. Returns one of:
  - `{ status: "pending" }` — still queued or rendering
  - `{ status: "ready", kind, url: "<r2 signed link>" }` — done
  - `{ status: "error", code, message }` — failed; surfaces the
    `cmo` diagnostic code (`PAR100`, `EVL002`, …) verbatim
  - `404 { error: "not_found" }` for unknown ids

**Topology:**

```
client → Worker (Hono) ──┬──→ Container (Playwright + Chromium, one-shot, max 1)
                         │       │  → loads bundled viewer, drives WebGL render
                         │       │  → ffmpeg muxes screenshots into mp4 (or single PNG for /frame)
                         │       └──→ R2 outputs (<guid>.mp4 / .png)
                         │           R2 staging (per-job assets, read via in-container http)
                         └──→ D1 (source + params + manifest + status + key)
```

**Assets.** A `.cm` references images two ways: an **external URL**
(`image("https://…")`) or a **user upload** staged in R2 (`POST
/v1/assets`, referenced by friendly path). The source stays small —
code that points at assets, never inlined base64 — so the size budget
lives on the assets, not the source (the 64 KiB source cap is for code).
The render container fetches both at render time and **bakes the pixels
into the output** PNG/MP4: nothing is linked in the result, so a remote
URL never leaks into a live document.

Allowing remote fetch reintroduces an outbound surface the first cut
deliberately avoided, so guard it: require an `http(s)` scheme and
**block private / link-local / loopback ranges** (10/8, 172.16/12,
192.168/16, 169.254/16, `::1`, …) so a source can't aim the renderer at
internal endpoints (SSRF). Uploads keep flowing through the R2 staging +
NSFW path below; remote URLs lean on the range guard, with content
moderation layered on later if abuse shows up. (Tighten to a host
allowlist if needed.)

Upload naming rules (the friendly path of an R2-staged asset):

- Leading slash optional, normalised to present: `earth.png` and
  `/earth.png` are the same key.
- Case-insensitive (`/Earth.PNG` == `/earth.png`).
- Character set `[a-zA-Z0-9._-/]+`; no `..`, no URL-shaped paths.
- Each job's asset names must be unique within the job.

A `/gallery/` prefix is reserved for curated shipped assets
(e.g. `/gallery/earth_4k.jpg`) — always available, cached
forever in a separate R2 bucket, no upload needed. Users can
mix gallery references with their own uploads in the same `.cm`.

**Local-cloud parity.** The same `.cm` works unchanged in the
browser preview (the editor intercepts `image("/earth.png")` and
serves from local IndexedDB / blob URLs) and against the cloud
API (assets uploaded, `.cm` submitted verbatim). No source
rewriting on the "Render in cloud" path.

**Asset lifecycle.** Uploaded assets land in an R2 staging
prefix (`staging/asset_<uuid>`) **and get a row in a D1 `assets`
table** (key, original_name, size, content_type, created_at,
client_ip). The table is the sweep + quota ledger: without it we
can't enumerate what's in R2 or attribute uploads to a caller.
A nightly cron Worker deletes assets older than the retention
window (start ~24 h) from both R2 and the table, so a few users
hammering the free tier can't fill the bucket indefinitely. The
`client_ip` column also backs a coarse per-IP upload quota
(count rows in the last hour/day before accepting more).
External-URL assets aren't stored — they're fetched fresh each
render and never persisted, so only uploads need this ledger.

**Input moderation.** Every uploaded asset runs through an NSFW
classifier (Cloudflare Workers AI image-classification, or
SightEngine fallback) at upload time. Flagged →
`400 { error: "asset_rejected", index: <i> }`. Asset never
lands in R2.

**Output protection.** R2 responses serve `X-Robots-Tag:
noindex, nofollow` and `Content-Disposition: attachment` so
outputs are never indexable and don't embed inline. Output URLs
are R2 signed links with a 1 h TTL; the file itself is deleted
by the nightly sweep at 24 h.

**Auth.** None in v0. Protected by Cloudflare Rate Limiting
Rules per-IP at the edge, plus app-level clamps on the expensive
render params (`duration`, `fps`, output dimensions). Turnstile
/ API keys land before the API goes truly public.

**Concurrency cap.** Hard limit of **one container instance**,
ever. This is the cost ceiling — render-seconds × $/s, no
parallel multiplier. Configured by:

- `wrangler.toml`: `[[containers]] max_instances = 1`
- queue consumer: `max_concurrency = 1`
- container `max_duration = 300s` (5 min per-job hard cap)

Trade-off: queue depth becomes user-visible wait time
(`render_seconds × position_in_queue`). Acceptable for v0; the
status endpoint's `pending` makes the wait obvious to clients.

**Backpressure.** Deferred: when queue depth > ~200,
`POST /v1/render` should return
`429 { error: "queue_full", retry_after_ms }`. Not needed for
v0 unless we see abuse fill the queue with cheap jobs.

**Stuck-job sweep.** Same nightly cron that handles staging
assets also marks any D1 row in `pending` state older than 1 h
as `error: orphaned` — catches container crashes / OOMs that
didn't fire a callback.

**Renderer: headless Chrome, not `cmo bounce`.** The bouncing-ball
example uses `sphere`, `image().as_texture(...)`, `material`,
`render3d` — all rendered today by the Three.js viewer in the
browser, *not* by `render.zig` (which only does 2D rect / circle
/ text-extrude). To get cloud renders that match the editor
preview exactly, the container loads the same viewer code in
headless Chrome (via Playwright), seeks frame-by-frame, captures
screenshots, and pipes them into ffmpeg for muxing. **`cmo` is
not in the container at all** — the rendering pipeline is pure
JS + WASM + WebGL.

This is deliberately one path for all scenes (no "fast lane for
2D"): one renderer, no behaviour divergence, no "why is this
scene slow?" debugging. When `render.zig` reaches feature parity
in stage 6 we can revisit a lean Zig-only path; until then this
is the renderer.

**Container.** One-shot per job; clean Chromium process every
time, no state hygiene logic. Cold start ~5 s (Chromium spawn).
Stays one-shot rather than a warm pool because the cap is one
instance and isolation is cheap insurance; revisit with a warm
pool if render volume justifies it.

```
Base:        mcr.microsoft.com/playwright:v1.56.0-noble   (~1 GB, browsers pre-installed)
Adds:        ffmpeg                                        (apt-get)
Bundles:     apps/api/container/render.mjs                 (Playwright driver script)
             dist/viewer/                                  (HTML + cmotion-render.wasm +
                                                            cmotion-viewer bundle + DM Sans)
Entrypoint:  read job from env → start local asset server →
             load /render/?source=... in Chrome → seek + screenshot
             each frame → pipe to ffmpeg → upload to R2 → callback Worker
```

**Viewer + WASM artifacts are committed into the runner folder**
(`containers/<version>/cmotion-render.wasm` and
`containers/<version>/viewer/`). The Dockerfile `COPY`s them in — no
"build the latest at image time" step, no runtime fetch from
cmotion.org. The git history is the source of truth for what each
runner version actually renders, so a `runner "0.0.1";` source pinned
today still produces identical bytes once the live CLI and viewer
have moved on. New runners are produced by a `freeze:runner:<N+1>`
script that builds + copies the current `apps/cli` WASM and
`apps/web/dist/` slice into a fresh `containers/<N+1>/` (to be
written when the first runner ships).

**Image build.** `Dockerfile` lives in `containers/<version>/`, deployed
via `wrangler containers deploy` from a GitHub Action on push to
main affecting `apps/web/src/scripts/`,
`apps/cli/src/wasm_entry.zig`, or `containers/<version>/`. Image tagged
by `runner-<version>-<gitshortsha>`; the Worker's `wrangler.toml` pins
to a specific runner version + image SHA so every deploy maps to
a known image.

**Render loop (rough):**

```js
const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(`http://localhost/render/?job=${jobId}`);
await page.waitForFunction(() => window.__viewerReady === true);

const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-r', `${fps}`,
                            '-i', '-', '-c:v', 'libx264',
                            '-pix_fmt', 'yuv420p', '/tmp/out.mp4']);
for (let f = 0; f < totalFrames; f++) {
  await page.evaluate(t => window.__viewer.seek(t), f / fps);
  ff.stdin.write(await page.locator('canvas').screenshot({ type: 'png' }));
}
ff.stdin.end();
```

For `POST /v1/frame`, the loop is a single seek + screenshot, no
ffmpeg invocation — output is the PNG directly.

**D1 schema (initial):**

```sql
CREATE TABLE jobs (
  id            TEXT PRIMARY KEY,   -- guid
  kind          TEXT NOT NULL,      -- 'video' | 'frame'
  source        TEXT NOT NULL,      -- raw .cm
  params        TEXT NOT NULL,      -- JSON: fps/duration/at/width/height/format
  assets        TEXT NOT NULL,      -- JSON: { "/earth.png": "asset_<uuid>", ... }
  status        TEXT NOT NULL,      -- 'pending' | 'ready' | 'error'
  output_key    TEXT,               -- '<guid>.mp4' or '<guid>.png'
  error_code    TEXT,               -- e.g. PAR100, EVL002
  error_message TEXT,
  created_at    INTEGER NOT NULL,
  completed_at  INTEGER
);
CREATE INDEX idx_jobs_created_at ON jobs(created_at);
CREATE INDEX idx_jobs_status     ON jobs(status, created_at);
```

**R2 layout:**

```
outputs/  <guid>.mp4 | <guid>.png   — rendered artifacts; 24 h TTL
staging/  <job_id>/<asset_uuid>     — uploaded inputs; deleted eagerly + nightly
gallery/  <name>.<ext>              — curated shipped assets; permanent
```

**CLI gap (not a cloud-API blocker).** `cmo render --at <t>`
writes PPM today, not PNG — only affects local CLI usage, since
the cloud renderer uses headless Chrome screenshots. Trivial
extension when convenient (~20 lines in
`apps/cli/src/commands/render.zig`).

**Editor integration.** The `/editor` page gains drag-and-drop
for image assets: dropping a file inserts an `image("/<name>")`
reference into the source, the file is held in IndexedDB for
the browser preview, and a "Render in cloud" button uploads to
`POST /v1/assets` + submits the `.cm` unchanged.

**LLM / Claude consumption.** A thin MCP server wraps the REST API
for one-shot agent rendering — promoted to its own item below (see
*MCP server*), now that the API is live.

**Open questions** (none block v0):

- **Streaming progress.** Polling is enough for v0; SSE /
  websocket if the editor wants live render progress later.
- **Queue position in status response.** `{ status: "pending",
  queue_position, eta_seconds }` would be a nice UX win but
  costs a D1 count query per poll. Add if users complain about
  polling blind.
- **Persistent user galleries.** v0 scopes uploads per-job. A
  v1 feature: tie uploads to a user account so the editor can
  keep a personal asset library. Needs auth first.

### MCP server (`@cmotion/mcp`)

Unblocked — the hosted render API above is live at `api.cmotion.org`.
Ship a small stdio MCP server that wraps the upload → render → poll
flow into one tool call so an agent can render a cmotion scene
directly:

- `render_video({ source, image_files? })` → finished video URL
- `render_frame({ source, image_files?, at? })` → finished frame URL

Hides the asset upload and the job-polling loop. ~150 lines; lands as
`apps/mcp` and publishes to npm as `@cmotion/mcp`.

---

## Top priority — type system

### `Signal<T>` as a first-class type

Every time-varying primitive in cmotion should return the same
type. `bounce`, `wave`, `noise`, `animate`, `on_event`,
`derivative`, audio envelopes — all of them produce a `Signal<T>`,
a value that can be sampled at a `Time`. The calculus library
then composes off one type:

```
derivative(s)                : Signal<T>
integrate(s)                 : Signal<T>
smoothstep(s, lo, hi)        : Signal<T>
remap(s, in_range, out_range): Signal<T>
sample(s, at: t)             : T
```

This is the single highest-leverage decision left in the type
system. If `Signal` stays implicit — just "function from Time" —
we'll be re-implementing the same calculus library ad hoc inside
the sampler for years, one entry per primitive, with no way for
user code to define its own time-varying values that compose with
the built-ins. With it, the sampler becomes a generic walker over
`Signal`-typed nodes and the stdlib reads like `numpy` for time.

**Do this before any further sampler primitives land** — every
new entry that pre-dates the type is a future migration.

---

## High-impact language features

### `group { ... }` — inheritable transforms

```
group {
  body, arm, head,
}.rotate(z: a).translate(x: 100px)
```

Children inherit the parent's transform stack. Lowers to a
`Constructed("group", ...)` whose translator wraps the children in
a `THREE.Group` on the GPU path and composes a parent matrix on
the CPU path. Main work: the grammar form for the brace-block as
an expression (today's `block` rule expects a trailing result
expression — `group` is a multi-element variant).

### `seq [ ... ]` — sequential composition with `.duration(...)`

```
seq [
  intro.duration(3s),
  body.duration(8s),
  outro.duration(2s),
]
```

Concatenates clips along the timeline. Each child gets its own
`[0, duration]` window remapped onto the seq's running total.
`.duration(...)` needs `Signal`-typed inputs to be much more than
constants — land after `Signal<T>`.

### `text.layout(...).glyphs.stagger(...)`

```
text.layout("Hello world", font: f, size: 72px, width: 800px)
  .glyphs                       // iterable
  .stagger(0.05s) { i, g => g.translate(y: bounce_for(i)) }
```

Lay out once, iterate over the glyph stream, stagger an effect by
index. Three pieces: (a) a layout primitive that produces an
iterable, (b) closure-binding parameters in the postfix block
(lambdas already exist; the `{ i, g => ... }` form is the spec
shape), (c) `stagger(d)` as a higher-order combinator that
shifts each child's time origin by `i · d`.

### `particles(...)` — emitter-driven instancing

```
particles(
  emitter: point(0px, 600px),
  rate: 40/s,
  lifetime: 2s,
  init: p => p
    .velocity(vec2(noise(p.id), -300px/s))
    .color(spark_palette),
).render()
```

Stateless particle system: each particle is a per-id function of
its age. `init` is the per-particle initialiser; if `velocity`
and `acceleration` are themselves `Signal`s there's no integration
loop at the language level. The `rate: 40/s` parameter wants the
`count / Duration` unit form — that lands with the full unit
algebra, not before.

### Camera DSL

```
let cam = perspective(fov: 28deg)
  .position(orbit(radius: 6, period: 12s))
  .lookat(vec3(0, 0, 0))

render3d(scene, lights, camera: cam)
```

Replaces the hard-coded `PerspectiveCamera` in `cmotion-viewer.ts`.
`.position(...)` takes a `Signal<Vec3>`; `orbit(...)` is one
stdlib helper that produces one. Composes cleanly with the
existing `render3d(...)` shape — just a new named arg.

### Custom shaders (`shader.fragment(...)`)

```
shader.fragment(
  wgsl: """ ... """,
  inputs: { time: Time, uv: vec2 },
) : Filter
```

User-authored WGSL surfaces as a typed `Filter`. The interpreter
forwards the `inputs` map to whichever backend executes the
filter — on the GPU path (stage 7) it's a real WebGPU pipeline;
on the CPU path we either ship a small software shader compiler
or refuse with a clear diagnostic. Slots naturally into the
stdlib once stage 7 is alive.

---

## Stdlib additions — lower priority, no foundation needed

None of these touch the type system or the interpreter
architecture. They're stdlib slots that can land any time after
their dependencies (mostly `Signal<T>`) exist:

- **HDRI / environment maps** for image-based lighting. Same
  pipeline as `image(...).as_texture(...)`, just attached to a
  `render3d` light list instead of a material's `fill`.

- **`shot { fps, size, color_space, duration }` metadata block.**
  Replaces the implicit "read the first rect for canvas size"
  heuristic in the viewer with a real, type-checked container at
  the scene level.

- **`video("clip.mp4")` as a source type.** Returns
  `Signal<Image>`. Demuxes via ffmpeg / libav on the native side;
  the WASM path defers to the browser's `<video>` element with
  a `currentTime`-driven sampler.

- **Export-format hints.** Annotations on the `scene` block that
  steer `cmo bounce` toward h264 / vp9 / image sequence / APNG
  without flag soup at the call site.

---

## Native renderer polish (deferred)

These items only affect what `cmo render` produces locally. Cloud
renders go through headless Chrome and the Three.js viewer, not
`render.zig`, so the native renderer's visual gaps don't block any
user-facing path. Listed in order of visible impact for whenever
someone returns to this work.

- **Bevels on `extrude` edges.** Single biggest visual jump for
  the native renderer. For each outline vertex, compute the inset
  position (moved inward by `bevel_radius` along the angle
  bisector); generate `bevel_segments` rings whose z slopes from
  `+half` to `+half − bevel_radius`. Front/back caps then
  triangulate the inset polygon, not the original. Default bevel:
  6 % of depth, 4 segments. Configurable via `extrude(..., bevel:
  <px>, bevel_segments: N)`; toggle off with `bevel: 0px` for the
  current sharp look. ~200 LOC.

- **Smooth normals on curved side walls.** Per side-wall vertex,
  store the average of the current outline edge's normal and its
  neighbour's. Tiny change in `extrudeContours`; no new data
  structures. ~30 LOC. Removes the faceted-curve appearance on
  letters with curves.

- **Real GGX + Fresnel + hemispheric ambient.** Replace the
  Blinn-Phong specular with GGX/Trowbridge-Reitz normal
  distribution + Smith geometric attenuation + Schlick Fresnel.
  Replace the flat ambient pedestal with a sky-cool / ground-warm
  hemispheric gradient (cheap IBL approximation that doesn't need
  an HDR environment map). ~150 LOC.

- **`cmo bounce --fps <n> --out scene.mp4`.** Local video export.
  Wraps the existing sample-and-render loop, writes a PNG sequence
  to a tmp dir, shells to ffmpeg for muxing. `--frames-dir` for
  the PNG-only path. Audio mux via `--audio scene.wav` deferred
  until `std.audio` lands. Distinct from the cloud render API
  above — that path is headless Chromium + the JS viewer; this is
  the Zig CLI rendering to disk.
