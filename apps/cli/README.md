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
cmo parse src/main.cm       # parse and print the AST       (stub)
cmo check src/main.cm       # type-check                    (stub)
cmo fmt src/main.cm         # format in place               (stub)
cmo explain CLI001          # long-form help for a code
```

## Diagnostic packet

Every subcommand emits the same JSON envelope under `--json`, modeled on
Vercel Zero's diagnostic contract. Plain text by default; `--json` for
agents, CI, and editors.

**Contract: every `--json` invocation emits exactly one JSON object.** The
shared header — `schemaVersion`, `ok`, `diagnostics[]` — is the same on
every subcommand. Subcommands append their own fields to the same
envelope:

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
  "cst": "(program (scene_decl ... (MISSING \")\") ...))"
}
```

Per-subcommand extras:

| Subcommand | Extra fields |
| --- | --- |
| `parse`   | `path`, `cst` (S-expression CST as a string) |
| `explain` | `code`, `title`, `body` |
| `version` | `name`, `version` |
| `check` / `fmt` | (stubs today; will land with the typechecker / formatter) |

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

| Prefix | Stage |
| --- | --- |
| `CLI*` | CLI itself (argument parsing, file IO) |
| `PAR*` | Parser / tree-sitter surface |
| `NAM*` | Name resolution |
| `TYP*` | Type checker |
| `UNT*` | Unit checker (`ms` vs `bpm` vs `px` etc.) |
| `TIM*` | Timeline (negative duration, out-of-range keyframe) |
| `ANM*` | Animate / keyframe rules |
| `COL*` | Color space |
| `CMP*` | Compose |
| `ASS*` | Asset (missing, wrong type) |
| `DET*` | Determinism partition violations |
| `BKE*` | Backend lowering (CanvasKit / WGSL) |

Codes are stable across versions. Use `cmo explain <CODE>` for the long
form.
