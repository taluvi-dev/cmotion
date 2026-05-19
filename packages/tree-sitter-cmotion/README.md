# @cmotion/tree-sitter-cmotion

Tree-sitter grammar for the cmotion DSL. The authoritative EBNF spec lives
in `GRAMMAR.md` at the repo root (also published at
[cmotion.org/language/grammar](https://cmotion.org/language/grammar/#ebnf));
this package is its executable form.

## Rule-name mapping

Public rules in `grammar.js` match the EBNF rule names in `GRAMMAR.md` 1:1
(`program`, `import_decl`, `let_decl`, `component_decl`, `block`, `lambda`,
`if_expr`, `match_arm`, `animate_expr`, `keyframe`, `compose_expr`,
`record_expr`, `number_lit`, `color_lit`, ...).

Four EBNF wrapper rules (`expr`, `pattern`, `literal`, `type`) are hidden
with a leading underscore (`_expr`, `_pattern`, `_literal`, `_type`) so the
CST exposes concrete node kinds — `binary_expr_add`, `call_expr`,
`number_lit`, `oklch_color` — directly, instead of a useless
`expr → expr → expr → ...` chain. This is standard tree-sitter convention
and doesn't change what programs are accepted.

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
