# @cmotion/cli

The cmotion toolchain, written in Zig.

The binary is `cmotion`. The install script also registers `cmo` as an alias
when that name is free on the user's `PATH`, so the daily-driver name is
short. Every example below uses `cmo`; substitute `cmotion` if the alias
isn't available on your machine.

## Build

Requires Zig 0.15.x (pinned in `.zigversion`) and Git.

First-time setup vendors the tree-sitter C runtime into `vendor/` and
regenerates `parser.c` from the grammar:

```sh
cd apps/cli
./scripts/fetch-deps.sh                                  # clones tree-sitter
pnpm --filter @cmotion/tree-sitter-cmotion generate      # regenerates parser.c
```

Then:

```sh
zig build                              # debug build at zig-out/bin/cmotion
zig build -Doptimize=ReleaseFast       # release build
zig build run -- parse src/main.cm     # build and run with args
zig build test                         # unit tests
```

The build links `vendor/tree-sitter/lib/src/lib.c` (MIT) and the generated
`packages/tree-sitter-cmotion/src/parser.c` into one static binary. No
runtime tree-sitter dependency is needed at install time.

## Install

```sh
cd apps/cli
zig build -Doptimize=ReleaseFast
./scripts/install.sh --prefix "$HOME/.local"
```

The install script copies `cmotion` into `$prefix/bin` and adds a `cmo`
symlink only when no other `cmo` is on `PATH`. Pass `--no-alias` to skip.

## Subcommands

```sh
cmo help                    # usage
cmo version                 # 0.0.1
cmo parse src/main.cm       # parse and print the CST/AST
cmo check src/main.cm       # narrow semantic checks (NAM*/TYP*/UNT*)
cmo fmt src/main.cm         # format to stdout (v0: imports + top-level let)
cmo fmt --write src/main.cm # rewrite the file in place
cmo fmt --check src/main.cm # exit non-zero if the file would change
cmo explain CLI001          # long-form help for a diagnostic code
```

## Diagnostic packet

Every subcommand emits the same JSON envelope under `--json`, modeled on
Vercel Zero's diagnostic contract. Plain text by default; `--json` for
agents, CI, and editors.

**Contract: every `--json` invocation emits exactly one JSON object.** The
shared header — `schemaVersion`, `ok`, `diagnostics[]` — is the same on
every subcommand, and the shared footer — `timing: { totalNs }` — is
also on every envelope so agents and CI can budget the call. Subcommands
append their own fields to the same envelope:

```sh
cmo --json parse src/broken.cm
```

```json
{
  "schemaVersion": 1,
  "ok": false,
  "diagnostics": [
    {
      "severity": "error",
      "code": "PAR100",
      "message": "syntax error in source",
      "path": "src/broken.cm",
      "line": 1, "column": 1, "length": 0,
      "help": "the parser produced a tree containing ERROR or MISSING nodes; the `cst` field on the envelope shows where",
      "fixSafety": "requires-human-review",
      "repair": {
        "id": "fix-syntax",
        "summary": "Resolve the syntax error reported by the parser."
      },
      "related": []
    }
  ],
  "path": "src/broken.cm",
  "cst": "(program (scene_decl ... (MISSING \")\") ...))",
  "timing": { "totalNs": 2815672 }
}
```

Plain text output ends with a `timing:` line (always on):

```
$ cmo version
cmotion 0.0.1
timing: 0.056ms
```

Per-subcommand extras:

| Subcommand | Extra fields |
| --- | --- |
| `parse`   | `path`, `cst` (S-expression CST as a string), `ast` (typed tree; `null` when syntax errors prevented lowering) |
| `check`   | `path`. The `diagnostics[]` carry the findings (NAM003/004/005/006, TYP002, UNT001/002, LWR000). Exits 0 on clean, 1 on any error diagnostic. |
| `explain` | `code`, `title`, `body` |
| `version` | `name`, `version` |
| `fmt`     | `path`, `changed` (bool), `formatted` (the rewritten source). FMT001 in `diagnostics[]` under `--check` when the file would change. Exits 1 only when `--check` and `changed`. |

### `cmo parse` AST shape

`cmo --json parse` emits both `cst` (tree-sitter S-expression string,
useful for grep) and `ast` (the typed tree from `src/ast.zig`). The AST
is a recursive tree of tagged unions; each node is rendered as a single-
key object whose key is the union tag. For example:

```jsonc
{ "ast": {
    "span": { "start": 0, "end": 1024, "line": 1, "column": 1 },
    "decls": [
      { "import": {
          "span": {...},
          "path": { "span": {...}, "segments": [...], "glob": true },
          "alias": null
      } },
      { "scene": {
          "span": {...},
          "name": { "span": {...}, "name": "title" },
          "params": [
            { "span": {...}, "name": {"name":"duration"},
              "type": { "simple": {"name":{"name":"Duration"}, "args":[]} },
              "default": { "literal": { "number": {"text":"6","unit":"s"} } }
            }
          ],
          "return_type": { "simple": { "name": {"name":"Frame"}, "args": [] } },
          "body": {
            "lets": [...],
            "result": { "call": {...} }
          }
      } }
    ]
} }
```

Categories and their tags:

| Category | Tags |
| --- | --- |
| `TopDecl` | `import`, `let`, `component`, `scene`, `filter`, `export` |
| `Expr`    | `literal`, `ident`, `paren`, `binary`, `unary`, `call`, `method_call`, `field_access`, `index`, `if_`, `match`, `lambda`, `animate`, `compose`, `record`, `array`, `block` |
| `Type`    | `simple`, `tuple`, `record`, `function` |
| `Pattern` | `literal`, `ident`, `wildcard` |
| `Literal` | `number`, `string`, `bool`, `color` |
| `Color`   | `hex`, `oklch`, `oklab`, `srgb` |

Every node carries a `span: { start, end }` (byte range only — line and
column are computed on demand by the diagnostic emitter via
`ast.locate(source, byte_offset)`, since most spans never feed a
diagnostic and the up-front cost was 8 bytes per node).
Identifiers and literal text are slices into the source file, not
interned strings, so reading them back is zero-copy. The AST is built
into an arena allocated by `cmo parse` and freed after the JSON is
written, so subsequent runs don't accumulate memory.

If `cst` is non-null but `ast` is `null`, the parse had syntax errors
(see `diagnostics[]`) and lowering was skipped; fix the syntax and
re-run.

### Field reference

| Field | Meaning |
| --- | --- |
| `schemaVersion` | Envelope version. Bumped only for breaking changes. |
| `ok` | `true` iff every diagnostic is severity `note` or lower. |
| `severity` | `error` \| `warning` \| `note` |
| `code` | Stable, namespaced code (e.g. `CLI001`, `PAR100`, `TYP002`). |
| `message` | One-line summary. No ANSI, no hyperlinks. |
| `path` / `line` / `column` / `length` | Span. Omitted for non-source diagnostics. |
| `expected` / `actual` | What the rule expected and what it saw. |
| `help` | One sentence pointing at the safest repair shape. |
| `fixSafety` | One of `format-only`, `behavior-preserving`, `local-edit`, `api-changing`, `requires-human-review`. Gate for tools deciding what to auto-apply. |
| `repair` | `{ id, summary }`. The `id` is stable so tools can pattern-match. |
| `related` | Sub-diagnostics with the same shape (recursive). |

### Code namespaces

| Prefix | Stage | Status |
| --- | --- | --- |
| `CLI*` | CLI itself (argument parsing, file IO) | live |
| `PAR*` | Parser / tree-sitter surface | live |
| `LWR*` | Lowering (CST → typed AST) | live |
| `NAM*` | Name resolution | live |
| `TYP*` | Type checker | live (narrow) |
| `UNT*` | Unit checker (`ms` vs `bpm` vs `px` etc.) | live |
| `FMT*` | Formatter | live |
| `TIM*` | Timeline (negative duration, out-of-range keyframe) | reserved |
| `ANM*` | Animate / keyframe rules | reserved |
| `COL*` | Color space | reserved |
| `CMP*` | Compose | reserved |
| `ASS*` | Asset (missing, wrong type) | reserved |
| `DET*` | Determinism partition violations | reserved |
| `BKE*` | Backend lowering (CanvasKit / WGSL) | reserved |

Codes are stable across versions. Use `cmo explain <CODE>` for the long
form.
