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
  `/play` editor. The homepage `ScenePreview` is driven by
  `cmotion-render.wasm` (the same interpreter `cmo open` and `/play`
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
