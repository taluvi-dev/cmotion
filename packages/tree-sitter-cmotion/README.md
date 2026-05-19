# @cmotion/tree-sitter-cmotion

Tree-sitter grammar for the cmotion DSL. The authoritative spec lives in
`GRAMMAR.md` at the repo root; this package is its executable form.

## Status

Stub. Recognises only `use` imports today. Stages land in this order:

1. Imports + identifiers + comments  ← current
2. Top-level `let` / `component` / `scene` / `filter` / `export`
3. Expressions (arithmetic, logical, conditional)
4. Patterns and `match`
5. `animate { ... }` and `compose [ ... ]`
6. Number literals with units (`ms`, `bpm`, `deg`, `px`, ...)
7. Color literals (`#hex`, `oklch`, `oklab`, `srgb`)

The CLI in `apps/cli` links against the generated parser and emits parser
diagnostics under the `PAR*` code namespace.

## Develop

```sh
pnpm --filter @cmotion/tree-sitter-cmotion generate
pnpm --filter @cmotion/tree-sitter-cmotion test
```
