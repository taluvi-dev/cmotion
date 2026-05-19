# Plan.md — handoff for the next agent

This file is the working hand-off. Read `CLAUDE.md` first for the durable
project orientation; this file covers *what we just did* and *what to
pick up*.

## What just shipped on this branch (`claude/start-formatter-5VAW2`)

Five commits, all green:

1. **`cmo fmt` v0 — the formatter started.** Engine in
   `apps/cli/src/fmt.zig`, CLI plumbing in `apps/cli/src/commands/fmt.zig`.
   Scope: rewrites top-level `use` and `let` from the AST; slices source
   verbatim for everything else. Output modes: stdout (default),
   `--write`, `--check`, plus `--json` envelope adding `path`, `changed`,
   `formatted`. 8 end-to-end tests in `fmt.zig`.
2. **Session-start hook** at `.claude/hooks/session-start.sh` installs
   Zig 0.15.1 in cloud sessions, vendors tree-sitter, and runs
   `pnpm install`. Registered in `.claude/settings.json`.
3. **Glob-detection bug fix in `lower.zig`.** The path's `.*` glob now
   comes from a CST walk, not an `endsWith` on the source slice — so
   `use std . shapes . * ;` no longer drops `.*`. Regression test added.
4. **Explain entries for `CLI007/008/009/010` and `FMT001`** registered
   in `commands/explain.zig`, restoring the "every emitted code resolves
   through explain" contract that the formatter commit had broken.
5. **README sync.** Stage 1 marked done; stage 4 fixed to "in Zig" (was
   "in Rust"); subcommand examples no longer say `(stub)`; diagnostic
   namespace table grew a Status column and rows for `LWR*` / `FMT*`.

State: `zig build` and `zig build test` (17/17 pass) both work in-session
via the hook-installed Zig.

## What to pick up — in order

### 1. Two small safety nets before the pivot (~half a day total)

Both came up during this session and are cheap regression prevention.

**1a. Test: every emitted diagnostic code has an explain entry.**
The `CLI007–010` / `FMT001` regression shipped because nothing forced
consistency between the emit sites and the explain table. Add a test
that:
- Scans the source for every `.code = "XXX",` string literal in
  `apps/cli/src/` outside `commands/explain.zig`.
- Asserts each one resolves through `explain.lookup`.

The simplest place is a new test in `commands/explain.zig` using
`@embedFile` on a generated list, or — pragmatically — a hand-maintained
const slice of codes in the test that has to be touched whenever a new
code lands. (Static introspection of source text from inside a Zig test
is awkward; a hand-maintained checklist plus a CI grep would also work.
Pick whichever feels less fragile.)

**1b. Audit `lower.zig` for other `endsWith` / `startsWith` /
`indexOf`-on-source patterns.**
The glob bug was a string check on the source slice that whitespace
broke. Grep for similar patterns:

```sh
grep -n 'std.mem.(endsWith|startsWith|indexOf|eql).*self.source\|sourceSlice.*\)' apps/cli/src/lower.zig
```

For each hit, ask: would this fail if the source had extra whitespace
between tokens? If yes, replace with a CST walk (see `lowerPath` after
the fix for the pattern).

### 2. The pivot — start the reference interpreter (stage 4)

This is the next *motivating* milestone. The CLI is solid as a language
frontend; the interpreter is what makes cmotion code do anything.

**Strict roadmap order is 1 → 2 → 3 → 4 (grammar → type system → stdlib
→ interpreter). In practice you'll drag 2 and 3 along behind 4 — the
interpreter is the forcing function that pins down ambiguities in the
spec.** Don't try to finish stage 2 before touching stage 4.

#### Starting slice — ~1 week of focused work to "the cmotion.org sample evaluates to a value"

Suggested branch: `claude/start-interpreter` off `main` (after this one
merges).

1. **`apps/cli/src/value.zig`** — `Value` union: number-with-unit,
   string, bool, color, function/closure, record, array, lambda. Keep it
   small. Arena-allocated like the AST.
2. **`apps/cli/src/eval.zig`** — tree-walking evaluator. Handles
   literals, idents (lookup in env), arithmetic + comparison + logic,
   blocks with `let`, `if`, `match` on literals, function calls. Skip
   `animate`, `compose`, `match` on non-literal patterns until later.
3. **`apps/cli/src/stdlib.zig`** — five-ish functions to start: `oklch`,
   `rect`, `compose`, `animate`, `vec3`. Just enough to evaluate the
   cmotion.org "A taste" example to *some* value. The result is a tree
   of records describing a frame, not pixels.
4. **`apps/cli/src/commands/run.zig`** — new subcommand. Same diagnostic
   envelope contract. Pretty-prints the resulting value in text mode;
   `--json` emits a structured `result` field in the envelope.
5. **Wire into `cli.zig`**: add `.run` to the `Command` enum, the
   command-name table, and the help text.
6. **Tests in `eval.zig`**: end-to-end through parser + lowerer + eval
   for each handled node type. Mirror the pattern in `fmt.zig`.

Done when: `cmo run apps/web/src/content/docs/index.mdx` (extract the
fenced sample) evaluates without diagnostics, even if its output is just
a JSON dump of the frame description.

#### What's still off the table after that

- Pixels. The interpreter produces values, not images. A renderer is a
  separate, smaller piece of work after the interpreter is stable.
- Full type system. Stage 2 grows out of what the interpreter found
  ambiguous, not from a clean-sheet spec.
- Backends (5/6/7). Conformance work against the reference interpreter,
  not until it's stable.

## Decisions left to the user

- Do the safety nets (1a/1b) first, or skip straight to the interpreter?
  Recommendation: do them — they're half a day combined and stop a known
  bug class.
- Use `cmo run` or a different subcommand name? `cmo eval` is the other
  obvious option.
- Frame value representation in the interpreter: typed records all the
  way (like the AST), or a generic `dyn`-style value tree? Recommendation:
  typed records — keeps the stage 4 / stage 6 boundary clean.

## Don't

- Don't go for a WASM build yet. We discussed it; agreed to develop
  natively first because the iteration loop is faster and the interpreter
  needs to exist before WASM-packaging it makes sense.
- Don't add backends (5/6/7) before the interpreter. They're tested
  *against* the interpreter — without it, there's nothing to conform to.
- Don't expand `check.zig` into a full typechecker as a side quest.
  Grow it in response to interpreter needs.
