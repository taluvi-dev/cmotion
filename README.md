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

## Roadmap

The language and toolchain are being built in stages, from the parser up to
realtime GPU rendering. Each stage should be usable on its own before the next
one starts.

- [ ] **1. Tree-sitter grammar** — parser, syntax highlighting, AST.
- [ ] **2. Type system spec** — units, asset types, function types, and the
      determinism partition of stdlib. Lives as a separate document, not in
      BNF.
- [ ] **3. Minimal stdlib** — `rect`, `image`, `mesh3d`, `compose`, `animate`,
      `oklch`, `vec2`, `vec3`, `transport`, audio analyzers.
- [ ] **4. Reference interpreter in Rust** — walks the AST directly, no
      codegen. Lets us exercise the type system and stdlib without committing
      to WASM yet.
- [ ] **5. WASM component codegen** — once the language and stdlib are stable,
      this is mostly mechanical.
- [ ] **6. CanvasKit backend** — deterministic offline render.
- [ ] **7. WGSL codegen** — realtime preview on the GPU.

## License

MIT — see [LICENSE](./LICENSE).
