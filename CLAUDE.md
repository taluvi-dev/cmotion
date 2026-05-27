# CLAUDE.md — orientation for Claude Code sessions in this repo

cmotion is a typed DSL for video, motion graphics, and animation. The
authoritative roadmap is at https://cmotion.org/roadmap/ and mirrored in
`README.md`. The authoritative syntactic spec is the EBNF at
https://cmotion.org/language/grammar/#ebnf, mirrored at the repo root as
`GRAMMAR.md` (and rendered from `apps/web/src/content/docs/language/grammar.md`).
**Read it before extending the parser, the AST, or the interpreter** —
it covers forms not yet implemented (e.g. lambdas) and pins the
precedence ladder. This file (CLAUDE.md) is the working note for AI
sessions: where things live, how to build and test, and the contracts
that aren't always obvious from the source.

## Repo layout

- `apps/cli/` — the `cmotion` (`cmo`) binary, written in Zig 0.15.1. The
  only execution surface today. Parses, type-checks (narrowly), and
  formats `.cm` files.
- `apps/web/` — cmotion.org, an Astro static site. Docs + an unlinked
  `/editor` page. The homepage `ScenePreview` is driven by
  `cmotion-render.wasm` (the same interpreter `cmo open` and `/editor`
  use); a Three.js translator in `src/scripts/cmotion-viewer.ts`
  consumes the JSON value tree the WASM emits.
- `packages/tree-sitter-cmotion/` — the grammar (`grammar.js`) and its
  generated `parser.c`, `grammar.json`, `node-types.json`. Per the
  tree-sitter convention, the generated files are committed.

## Build & test

- Zig is pinned in `apps/cli/.zigversion` (0.15.1). The session-start hook
  at `.claude/hooks/session-start.sh` installs it into
  `~/.local/zig-<ver>` in cloud sessions; locally users install it
  themselves.
- `apps/cli/scripts/fetch-deps.sh` vendors the tree-sitter C runtime into
  `apps/cli/vendor/tree-sitter/`. Required before the first build; the
  hook calls it. The vendor dir is gitignored.
- From `apps/cli/`:
  - `zig build` — debug build at `zig-out/bin/cmotion`
  - `zig build test --summary all` — unit tests, currently 17/17
  - `zig build -Doptimize=ReleaseFast` — release build
- From the repo root, `pnpm install` covers `apps/web` and the
  tree-sitter package; `pnpm dev` runs the web app.

## Rendering & previewing (how to see what a `.cm` produces)

Three surfaces, by fidelity for *visual* features:

- **Browser viewer — the source of truth.** `pnpm dev` (repo root) →
  open `/editor`, paste a source or deep-link
  `/editor/#source=<urlencoded .cm>`. Real Three.js + WASM viewer
  (`apps/web/src/scripts/cmotion-viewer.ts`): sprites, 3D, lights,
  textures. If it looks right here, it's right.
- **Native CLI — fast, 2D only.** `cmo render --at <t> --out f.ppm <file>`
  (one frame) or `cmo bounce` (APNG). `render.zig` is a 2D software
  raster (rect / text-glyph / flat fallback for 3D); `sprite()` draws
  only a **placeholder block** there — no image decoder natively. Good
  for layout/position, not textured output. `cmo eval --at <t>` dumps the
  sampled value tree (what the viewer consumes) without rendering.
- **Hosted render API — `api.cmotion.org`.** `POST /v1/frame
  {source, params:{at,width,height}}` → poll `GET /v1/jobs/:id` →
  download the `url` (PNG); `/v1/render` → video (MP4). See `apps/api`.

**Gotcha — the hosted API lags the branch.** It renders with the viewer
**baked into the deployed container image** (`containers/<version>/viewer`),
not your working tree, so new viewer features (e.g. `sprite()`) and new
`/img` assets only appear there after the container is rebuilt + deployed.
To check a branch's visual change, use the local browser viewer.

**For AI sessions:** you can view rendered PNGs directly (Read the file),
so a downloaded frame is how you "see" output. There's **no headless
browser in the cloud sandbox** — you can't run the WebGL viewer yourself;
have a human run `pnpm dev`, or inspect a rendered frame. Outbound TLS to
`api.cmotion.org` may also fail cert validation from a cloud session.

## Deploy

There is **no automated git-triggered deploy** for cmotion.org. The
site ships only when someone runs the deploy manually from a checkout
that has `wrangler` auth and access to the Cloudflare account that
owns the Pages project. Pushing to `main` does **not** publish.

- `pnpm deploy:web` (from the repo root) — builds `apps/web` (the
  `prebuild` hook copies the WASM artifact into `public/`) and runs
  `wrangler pages deploy apps/web/dist --project-name cmotion-web`.
- The repo is public, so the Cloudflare account ID is **not** baked
  into any file. Set `CLOUDFLARE_ACCOUNT_ID` in the environment
  before running `deploy:web` if your wrangler login is associated
  with more than one account.

**Deploying from a Claude Code cloud session is possible.** A
provisioned remote session has `CLOUDFLARE_ACCOUNT_ID` and
`CLOUDFLARE_API_TOKEN` set in the environment, and the npm registry +
Cloudflare API are reachable, so you can deploy without a separate
`wrangler login` (token auth). `wrangler` isn't a repo dependency —
run it via `npx wrangler@4 ...` so the lockfile stays untouched.
Prefer a **preview** deploy so you don't clobber production
`cmotion.org`:

```
pnpm --filter @cmotion/web build
npx wrangler@4 pages deploy apps/web/dist \
  --project-name cmotion-web --branch <preview-name> --commit-dirty=true
```

A non-production `--branch` yields a preview URL
(`https://<branch>.cmotion-web.pages.dev`); only deploying the
project's production branch publishes the live site. Confirm with the
human before a production deploy.

## MCP server

The repo has **no MCP server code yet**. A thin stdio `@cmotion/mcp` is
planned (lands as `apps/mcp`, publishes to npm): it wraps the `apps/api`
upload → render → poll flow into single `render_video` / `render_frame`
tool calls — see `README.md` and `TODO.md`. Any MCP servers attached to a
Claude Code session are environment-provided and **unrelated to this
repo** — don't document or depend on them here.

## Where things live in `apps/cli/src/`

- `main.zig` — entry point, stdio + arg plumbing, `refAllDecls` smoke
  test that pulls in every module.
- `cli.zig` — subcommand dispatch, global flag parsing (`--json`,
  `--no-color`), shared `Context` struct that every command takes.
- `commands/*.zig` — one file per subcommand. Thin: they read the file,
  call into the engine, emit the envelope. Add a new subcommand by
  dropping a file here and wiring it into `cli.zig:parseCommand`.
- `tree_sitter.zig` — Zig FFI shim over the tree-sitter C runtime. Wraps
  parse, node traversal, source slicing, error detection.
- `ast.zig` — typed AST. Tagged unions for `Expr`, `Type`, `Pattern`,
  `TopDecl`. Arena-allocated; identifier/literal text is a zero-copy
  slice into the source buffer, so the source must outlive the AST.
- `lower.zig` — CST → AST lowering. One `Lowerer` per parse. Field-name
  driven: the grammar's `field('foo', …)` annotations match the lookups
  here.
- `check.zig` — narrow semantic checks (NAM003/004/005/006, TYP002,
  UNT001/002). Not a full typechecker — see "What's intentionally
  missing".
- `fmt.zig` — formatter engine (v0). Walks `program.decls`, rewrites
  top-level `use` and `let`, slices source verbatim for everything else.
- `diagnostics.zig` — the diagnostic envelope. **Stable contract** — see
  below.
- `timing.zig` — monotonic per-invocation timer attached to every
  envelope.

## Contracts that matter

### Diagnostic envelope

Every subcommand under `--json` emits exactly one JSON object with the
shape `{ schemaVersion: 1, ok: bool, diagnostics: [...], <per-subcommand
extras>, timing: { totalNs } }`. The diagnostic shape itself is also
fixed (severity, code, message, span?, expected?, actual?, help?,
fixSafety, repair{id,summary}, related[]). Field names are hand-written,
not auto-derived — they survive Zig identifier renames.

When you add a diagnostic, you add three things:
1. The emit site (in whichever pass produces the diagnostic).
2. An explain entry in `commands/explain.zig` (otherwise
   `cmo explain CODEXXX` returns CLI006 "no explanation registered").
3. If the code uses a new prefix, a row in the namespace table in
   `apps/cli/README.md`.

### Code namespaces

Live prefixes: `CLI*`, `PAR*`, `LWR*`, `NAM*`, `TYP*`, `UNT*`, `FMT*`.
Reserved (no codes yet): `TIM*`, `ANM*`, `COL*`, `CMP*`, `ASS*`, `DET*`,
`BKE*`. Pick the prefix that matches the *stage* that produced the
diagnostic, not the symptom.

### CST vs source slicing

When deciding "is this construct present", walk the CST — don't `endsWith`
the source slice. Whitespace handling makes string comparisons fragile.
The `glob` field on `ImportDecl` was wrong for ~one commit because it
string-checked `endsWith(".*")` and `std . shapes . *` doesn't match
(`apps/cli/src/lower.zig:578` is the fixed version — walks children for a
`*` token).

## What's intentionally missing

The roadmap is stages 2 (full type system), 3 (stdlib), 4 (reference
interpreter), 5 (WASM codegen), 6 (CanvasKit), 7 (WGSL). All not started.
The CLI today is a *language frontend*, not a runtime: it never produces
the values your code computes, only descriptions of your code.

`cmo check` covers a deliberately narrow slice of stage 2 — see the
comment at the top of `apps/cli/src/check.zig` for the exact scope and
what's deferred to the future full typechecker.

## Don't touch

- `apps/cli/vendor/` — vendored by `fetch-deps.sh`, gitignored.
- `packages/tree-sitter-cmotion/src/parser.c`, `grammar.json`,
  `node-types.json` — generated from `grammar.js`. Regenerate with
  `pnpm --filter @cmotion/tree-sitter-cmotion generate`. Don't hand-edit.
- `apps/cli/.zig-cache/`, `apps/cli/zig-out/` — build artifacts.

## Architectural invariants

These survive across branches — respect them in every session.

- **The value tree is renderer-agnostic.** Eval and the sampler produce
  descriptions; the renderer interprets them. When the 3D pipeline wants a
  new shape (`Mesh`, `Light`, …), add a `Value.<x>` variant *and* graduate
  the corresponding `Constructed("x", ...)` callers — don't pre-bake
  renderer concerns into eval.
- **The sampler is shape-stable.** Its output is a Value tree with the
  same shape as eval's output. The renderer is the only consumer that
  knows about pixels, normals, transforms, lights.
- **`check.zig` grows by pull, not push.** Stage 2 typechecking expands
  when a renderer or downstream pass finds an ambiguity it needs
  resolved — not as a standalone "let's add more rules" side quest.
- **`apps/web`'s homepage `ScenePreview` is marketing.** The real preview
  surface is `/editor` and `cmo render`. Don't pull the homepage Three.js
  viewer into the production rendering path.

## Style

- Diagnostic-first error handling. When a pass can't continue, emit a
  diagnostic with a `repair` and let the CLI's exit code reflect it
  (1 for an error diagnostic, 0 for clean). Don't `@panic`.
- Comments explain *why* (a non-obvious invariant, a workaround, a
  hidden constraint), not *what* — see existing modules for the bar.
- Tests live at the bottom of the module they cover (`test "…" { … }`).
  Per-helper unit tests for pure logic, end-to-end tests for anything
  that touches the parser/lowerer.
- Don't add backwards-compat shims for code that isn't shipped yet.
