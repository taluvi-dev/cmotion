# cmotion

[cmotion.org](https://cmotion.org)

A DSL for video and animation, plus the tools and surfaces around it.

This repository is a **monorepo** managed with [pnpm workspaces](https://pnpm.io/workspaces).

## Layout

```
cmotion/
├── apps/
│   ├── web/          # cmotion.org — Astro site
│   └── cli/          # the `cmotion` toolchain, in Zig
└── packages/
    └── tree-sitter-cmotion/   # grammar that backs `cmo parse`
```

## CLI

The toolchain binary is `cmotion`. The installer also creates a short `cmo`
alias when that name is free on your `PATH`, so day-to-day commands look
like:

```sh
cmo parse src/main.cm
cmo --json check src/main.cm
cmo explain CLI001
```

See `apps/cli/README.md` for build and install instructions, and for the
diagnostic packet shape (modeled on Vercel Zero's `--json` contract).

## Getting started

Requirements: Node.js 20+ and pnpm 10+.

```bash
pnpm install        # install all workspace dependencies
pnpm dev            # run the web app (apps/web) in dev mode
pnpm build          # build every workspace package
pnpm check          # run type checks across the workspace
```

## Apps

### `apps/web` — cmotion.org

The marketing site and (eventually) documentation for cmotion, built with Astro.
To work on it directly:

```bash
cd apps/web
pnpm dev
```

### `apps/api` — the render service (open source; run your own)

A Cloudflare Worker that takes a `.cm` source (plus optional image assets
or external URLs) and renders it to a video or a single frame via a
headless-Chrome container, with async jobs (D1) and outputs (R2).
`POST /v1/render`, `POST /v1/frame`, `GET /v1/jobs/:id`, `GET /v1/outputs/:file`.

**This is meant to be deployed by you, on your own Cloudflare account.**
Our `api.cmotion.org` instance — together with the `/editor` on
cmotion.org and the planned `@cmotion/mcp` — is a **playground/demo**, not
a hosted render-as-a-service: rate-limited, asset-capped, and swept
aggressively. For real or sustained use, stand up your own (`apps/api`
plus a `containers/<version>/` image).

A thin MCP server (`@cmotion/mcp`) is planned on top, wrapping the
upload → render → poll flow into single `render_video` / `render_frame`
tool calls — a playground convenience pointed at your own API, see
[`TODO.md`](./TODO.md).

## Roadmap

The language and toolchain are being built in stages, from the parser up to
realtime GPU rendering. Each stage should be usable on its own before the
next one starts. The [website roadmap](https://cmotion.org/roadmap/) carries
the authoritative status; this list is a quick orientation.

- [x] **1. Tree-sitter grammar** — parser, syntax highlighting, AST.
      v0.2 locked. `cmo parse`, `cmo check` (narrow semantic passes), and
      `cmo fmt` (v0, top-level decls) run against it today; see
      [`apps/cli/`](./apps/cli/).
- [ ] **2. Type system spec** — units, asset types, function types, and the
      determinism partition of stdlib. Lives as a separate document, not in
      BNF. `cmo check` implements a narrow first slice today
      (literal-vs-annotation, unit categories); the full spec is the gap.
- [ ] **3. Minimal stdlib** — `rect`, `image`, `mesh3d`, `compose`,
      `animate`, `oklch`, `vec2`, `vec3`, `transport`, audio analyzers.
- [ ] **4. Reference interpreter in Zig** — walks the AST directly, no
      codegen. Lets us exercise the type system and stdlib without
      committing to WASM yet, and serves as the conformance oracle for
      every later backend.
- [ ] **5. WASM component codegen** — once the language and stdlib are
      stable, this is mostly mechanical.
- [ ] **6. CanvasKit backend** — deterministic offline render.
- [ ] **7. WGSL codegen** — realtime preview on the GPU.

## License

MIT — see [LICENSE](./LICENSE).
