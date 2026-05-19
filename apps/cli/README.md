# @cmotion/cli

The cmotion toolchain, written in Zig.

The binary is `cmotion`. The install script also registers `cmo` as an alias
when that name is free on the user's `PATH`, so the daily-driver name is
short. Every example below uses `cmo`; substitute `cmotion` if the alias
isn't available on your machine.

## Build

Requires Zig 0.15.x (pinned in `.zigversion`).

```sh
cd apps/cli
zig build                              # debug build at zig-out/bin/cmotion
zig build -Doptimize=ReleaseFast       # release build
zig build run -- --json parse foo.cm   # build and run with args
zig build test                         # unit tests
```

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

```sh
cmo --json parse src/main.cm
```

```json
{
  "schemaVersion": 1,
  "ok": false,
  "diagnostics": [
    {
      "severity": "error",
      "code": "CLI004",
      "message": "`cmotion parse` is not implemented yet",
      "help": "the tree-sitter grammar in packages/tree-sitter-cmotion is still a stub",
      "fixSafety": "requires-human-review",
      "repair": {
        "id": "wire-tree-sitter-grammar",
        "summary": "Implement packages/tree-sitter-cmotion/grammar.js and link it into the CLI build."
      },
      "related": []
    }
  ]
}
```

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
