---
title: Diagnostics
description: Stable diagnostic codes emitted by the cmotion toolchain.
---

The cmotion CLI emits **stable diagnostic codes** — `CLI001`, `PAR100`,
`NAM003` — that don't get renumbered between releases. Every code is
namespaced by the stage that emits it, carries a typed repair plan, and
has a long-form explanation reachable from the command line:

```sh
cmo explain NAM003
cmo --json explain NAM003
```

Every diagnostic lives inside the same JSON envelope on `--json`. See the
[CLI README](https://github.com/taluvi-dev/cmotion/blob/main/apps/cli/README.md)
for the envelope contract; this page documents only the codes.

## Fix-safety ladder

Each diagnostic carries a `fixSafety` label so agents and editors know
how much trust to extend to the repair:

| Label | Meaning | What a tool should do |
|---|---|---|
| `format-only` | only formatting changes | auto-apply |
| `behavior-preserving` | preserves runtime semantics | auto-apply |
| `local-edit` | confined to a local scope or file | apply, but show diff |
| `api-changing` | changes a signature / exported name / call site | propose only |
| `requires-human-review` | ambiguous, risky, or context-dependent | propose only |

## Namespaces

| Prefix | Stage | Status |
|---|---|---|
| `CLI*` | CLI argument parsing, file IO | implemented |
| `PAR*` | Parser (tree-sitter) | implemented |
| `LWR*` | CST → AST lowering | implemented |
| `NAM*` | Name resolution | implemented |
| `TYP*` | Type checker | partial (TYP002 only) |
| `UNT*` | Unit checker | partial (UNT001, UNT002) |
| `TIM*` | Timeline (negative duration, out-of-range keyframe) | reserved |
| `ANM*` | Animate / keyframe rules | reserved |
| `COL*` | Color space | reserved |
| `CMP*` | Compose | reserved |
| `ASS*` | Asset (missing, wrong type) | reserved |
| `DET*` | Determinism partition violations | reserved |
| `BKE*` | Backend lowering (CanvasKit / WGSL) | reserved |

---

## `CLI*` — CLI surface

### `CLI001` — Unknown subcommand

The CLI was invoked with a subcommand it does not recognise. Run
`cmo help` to see the list of available subcommands.

- **Repair:** `use-known-subcommand` — replace with one of `help`,
  `version`, `parse`, `check`, `fmt`, `explain`.
- **Fix safety:** `requires-human-review`.

### `CLI002` — Missing required argument

A subcommand expected a positional argument that was not supplied. Most
subcommands take exactly one `.cm` source file path.

- **Repair:** `supply-source-file` (or `supply-diagnostic-code` for
  `cmo explain`).
- **Fix safety:** `requires-human-review`.

### `CLI003` — Unknown flag

A flag was passed that the subcommand does not accept. Global flags are
`--json` and `--no-color`; subcommand-specific flags are listed in
`cmo <subcommand> --help`.

- **Fix safety:** `requires-human-review`.

### `CLI004` — Subcommand not yet implemented

The subcommand exists but its implementation is still a stub. The
diagnostic's `repair.id` names the stage that needs to ship. See the
[roadmap](/roadmap/) for the order in which stages land.

- **Fix safety:** `requires-human-review`.

### `CLI005` — Source file not found

The path passed to the subcommand does not resolve to a readable file.
Check the path, file permissions, and current working directory.

- **Repair:** `supply-valid-path`.
- **Fix safety:** `requires-human-review`.

### `CLI006` — No explanation registered

`cmo explain CODE` was called with a code that has no long-form entry.
This usually means the code is mistyped or the binary is older than the
code you're looking up.

- **Repair:** `register-diagnostic-code`.
- **Fix safety:** `requires-human-review`.

---

## `PAR*` — Parser

### `PAR000` — Parser failed to initialise

The tree-sitter parser could not be created or could not accept the
generated cmotion language. This is an internal error — the runtime and
grammar are out of sync, or the binary was built against the wrong
runtime version.

- **Repair:** `report-bug`.
- **Fix safety:** `requires-human-review`.

### `PAR100` — Syntax error in source

The parser produced a tree containing `ERROR` or `MISSING` nodes. The
span on the diagnostic points at the first invalid token; run
`cmo parse --json <file>` to inspect the full CST and locate every
error node.

- **Repair:** `fix-syntax`.
- **Fix safety:** `requires-human-review`.

---

## `LWR*` — Lowering

### `LWR000` — Lowering failed on a clean CST

The tree-sitter parse produced no `ERROR`/`MISSING` nodes, but the
lowering pass (`src/lower.zig`) failed to map some node kind into the
AST. This means lowering has a gap: the grammar emits a node kind that
the AST builder doesn't yet handle. The diagnostic's `message` field
names the Zig error variant that fired.

- **Repair:** `extend-lowering`.
- **Fix safety:** `requires-human-review`.

---

## `NAM*` — Name resolution

### `NAM003` — Unknown identifier

A name was referenced that resolves to nothing in the current scope
chain (local lets, parameters, top-level declarations, imported names).

The check is **suppressed when any `use foo.*` wildcard import is
present**, since cmotion does not yet have module manifests — we
don't know what names a wildcard brings into scope. Once manifests
land, `NAM003` will fire through wildcards too.

Repair is one of:

- add a `let name = ...;` before the use site
- bring the name into scope with `use mod.name;` or `use mod as alias;`
- fix a typo

- **Repair:** `declare-or-import`.
- **Fix safety:** `local-edit`.

### `NAM005` — Duplicate top-level declaration

Two top-level declarations resolve to the same local name (for example
two `component title` or a `let answer = 1;` next to a `scene answer`).
The diagnostic's `actual` field names the previous declaration's line
and column so an agent can see both sites without re-parsing.

- **Repair:** `rename-duplicate`.
- **Fix safety:** `api-changing` — renaming a top-level changes the
  exported name and any callers.

### `NAM006` — Duplicate parameter name

A signature lists the same parameter name twice. Parameter names must
be unique within a single component, scene, filter, or lambda
signature. The diagnostic's `actual` field cross-references the prior
parameter's location.

- **Repair:** `rename-duplicate-param`.
- **Fix safety:** `api-changing` — the parameter name is part of the
  named-argument API.

---

## `TYP*` — Type checker

### `TYP002` — Type mismatch on an annotated value

An annotated `let`, `param`, or `export` was assigned a literal value
whose category doesn't match the annotation. The check is deliberately
narrow today: it only fires when both sides are inferable.

**Fires when** the annotation is a `simple_type` whose name is a known
category (`String`, `Bool`, `Color`, or one of the number-like types:
`Number`, `Int`, `Float`, `Duration`, `Time`, `Angle`, `Length`,
`Pixels`, `Frequency`, `Tempo`, `Bars`, `Beats`, `Percent`) **and**
the value is a literal (number, string, bool, or color).

**Skipped when** the value is a call, identifier, or anything that needs
real inference — the full typechecker takes over for those.

Examples:

```cm
let name: String = 42                    // TYP002: expected 'String', got a number literal
let active: Bool = "yes"                 // TYP002: expected 'Bool', got a string literal
component title(bg: Color = 0) -> Frame  // TYP002 on the default: expected 'Color', got a number literal
```

Unit-category mismatches **within** the number family
(`let x: Duration = 6deg`) belong to `UNT*` codes, not `TYP002`.

- **Repair:** `align-value-with-type`.
- **Fix safety:** `local-edit` — usually only the value or annotation
  changes, no call sites move.

---

## `UNT*` — Unit checker

### `UNT001` — Unit category mismatch

An annotated number-family `let`, `param`, or `export` was assigned a
number literal whose unit suffix lives in the wrong category. The check
cascades from `TYP002`: it runs only when both sides are number-side,
the annotated type name pins a unit category, and the literal carries
a unit.

Type → unit category mapping:

| Type | Allowed units |
|---|---|
| `Duration` / `Time` | `s`, `ms`, `us`, `ns` |
| `Angle` | `deg`, `rad`, `turn` |
| `Length` / `Pixels` | `px` |
| `Percent` | `%` |
| `Frequency` | `hz`, `khz` |
| `Tempo` | `bpm` |
| `Bars` | `bars` |
| `Beats` | `beats` |
| `Number` / `Int` / `Float` | (no unit) |

Examples:

```cm
let timeout: Duration = 6deg    // UNT001: Duration expects Time, got 6deg (Angle)
let count: Number  = 5ms        // UNT001: Number expects unitless, got 5ms (Time)
let timeout: Duration = 500ms   // OK
```

If the literal has **no unit at all** (`let x: Duration = 42`), see
`UNT002` below.

- **Repair:** `align-unit-with-type`.
- **Fix safety:** `local-edit`.

### `UNT002` — Missing required unit

An annotated number-family `let`, `param`, or `export` was assigned a
unitless number literal where a unit is required (the annotation pins
a non-`Number` unit category). The diagnostic's `repair.summary` names
the canonical unit for the category so an agent can fix it in one edit:

```cm
let timeout: Duration = 42     // UNT002: requires a Time unit (suggested: '42s')
let angle: Angle = 90          // UNT002: requires an Angle unit (suggested: '90deg')
let count: Number = 42         // OK — Number requires an unmarked literal
```

Canonical units used in the suggestion:

| Annotation category | Suggested unit |
|---|---|
| `Duration` / `Time` | `s` |
| `Angle` | `deg` |
| `Length` / `Pixels` | `px` |
| `Percent` | `%` |
| `Frequency` | `hz` |
| `Tempo` | `bpm` |
| `Bars` | `bars` |
| `Beats` | `beats` |

- **Repair:** `add-required-unit`.
- **Fix safety:** `local-edit`.

---

## Stability promise

- **Codes never get renumbered.** Once a code has shipped, its name is
  permanent. Retired codes are marked as such on this page but kept in
  the table.
- **Field shapes** in the JSON envelope (`code`, `message`, `path`,
  `line`, `column`, `length`, `expected`, `actual`, `help`, `fixSafety`,
  `repair`, `related`) are versioned by the envelope's `schemaVersion`.
  Additive fields are not a breaking change; removed fields bump the
  version.
- **`cmo explain CODE`** is the authoritative long-form text. This page
  mirrors it; if the two ever drift, `cmo explain` wins.
