# TODO.md — language design items in flight

Forward-looking design work for cmotion. `Plan.md` is the working
hand-off for whatever branch is open; this file is the longer-arc
list of language and stdlib decisions that aren't yet sketched in
the grammar or the sampler.

Ordered by leverage, not by what's easy.

---

## Top priority — infrastructure

### Hosted render API on Cloudflare

A public endpoint that takes a `.cm` source and returns either a
rendered video or a single frame. The renderer is a one-shot
Cloudflare Container per job; the Worker dispatches via the
Containers binding and tracks every job in D1. Lives in a new
`apps/api/` package — separate from `apps/web/` so the API and
the docs site deploy independently.

**Endpoints (v1):**

- `POST /v1/render` — `{ source, fps?, duration?, format? }` →
  `202 { job_id, kind: "video" }`. Default format `mp4`.
- `POST /v1/frame` — `{ source, at, width?, height? }` →
  `202 { job_id, kind: "frame" }`. Output is PNG.
- `GET /v1/jobs/:job_id` — poll. Returns one of:
  - `{ status: "pending" }` — still queued or rendering
  - `{ status: "ready", kind, url: "<r2 signed link>" }` — done
  - `{ status: "error", code, message }` — failed; surfaces the
    `cmo` diagnostic code (`PAR100`, `EVL002`, …) verbatim
  - `404 { error: "not_found" }` for unknown ids

**Topology:**

```
client → Worker (Hono) ──┬──→ Container (one-shot) ──→ R2  (<guid>.mp4 / .png)
                         │           ↑
                         └──→ D1 (source + params + status + key)
```

**Assets.** `.cm` may reference external image URLs
(`image("https://…/earth.jpg")`). The container fetches them at
render time — *we never persist input assets*. Outputs only
(`<guid>.mp4`, `<guid>.png`) live in R2. The container's
entrypoint enforces:

- `--max-asset-bytes` per fetched URL (~25 MiB) and per job
  (~100 MiB)
- per-fetch wall-clock timeout (~15 s)
- private-IP block (refuse RFC1918, link-local, IPv6 ULAs, and
  resolve-then-recheck against DNS-rebinding)

**Auth.** None in v0. Protected solely by Cloudflare Rate
Limiting Rules per-IP at the edge, plus app-level clamps on the
expensive render params (`duration`, `fps`, output dimensions).
Turnstile / API keys land before the API goes public.

**Container.** One-shot per job (not a long-lived poller), so the
process gets a clean `/tmp` every time and no state hygiene logic
to maintain. Cold start runs ~1–2 s; revisit with a warm pool if
that becomes a perceptible drag. Image bundles a pinned `cmo`
release + ffmpeg + the DM Sans font set; CI rebuilds on each
release tag.

**D1 schema (initial):**

```sql
CREATE TABLE jobs (
  id            TEXT PRIMARY KEY,   -- guid
  kind          TEXT NOT NULL,      -- 'video' | 'frame'
  source        TEXT NOT NULL,      -- raw .cm
  params        TEXT NOT NULL,      -- JSON: fps/duration/at/width/height/format
  status        TEXT NOT NULL,      -- 'pending' | 'ready' | 'error'
  output_key    TEXT,               -- '<guid>.mp4' or '<guid>.png'
  error_code    TEXT,               -- e.g. PAR100, EVL002
  error_message TEXT,
  created_at    INTEGER NOT NULL,
  completed_at  INTEGER
);
CREATE INDEX idx_jobs_created_at ON jobs(created_at);
```

**R2** holds the rendered outputs only. No lifecycle policy
initially. Cleanup is a follow-up cron Worker — sweep anything
older than N days, or whose D1 row was already deleted.

**CLI gap.** `cmo render --at <t>` writes PPM today, not PNG.
Trivial extension (the APNG encoder in `cmo bounce` already
emits PNG IDAT chunks) — ~20 lines in `apps/cli/src/commands/render.zig`.
Lands in the same PR that ships `POST /v1/frame`.

**Open questions** (none block v0):

- **Output URL signing.** Public R2 (with unguessable guid keys)
  vs. signed URLs with TTL. Signed URLs cost nothing extra and
  let us narrow the abuse window — go with signed.
- **Streaming progress.** Polling is enough for v0; SSE /
  websocket if the editor wants live render progress later.
- **CI image build.** A Dockerfile + GitHub Action rebuilding on
  release tag, pushing to Cloudflare's registry.
- **Editor integration.** The `/editor` page's "Save video"
  button currently uses in-browser `canvas.captureStream`; once
  the API exists we'd offer a "Render in cloud" option that
  hits `POST /v1/render` and polls — better quality, no laptop
  GPU dependency.

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
