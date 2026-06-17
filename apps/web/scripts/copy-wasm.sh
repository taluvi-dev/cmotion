#!/usr/bin/env bash
# Copy the cmotion interpreter WASM artifact into apps/web/public/ so
# the /play page can fetch it at runtime. Rebuilds the artifact first
# (via `zig build wasm`, a cache no-op when nothing changed) so the
# copied engine always matches the current source.
#
# Invoked from apps/web/package.json's `predev` and `prebuild` hooks.

set -euo pipefail

script_dir="$(cd "$(dirname "$0")" && pwd)"
web_dir="$(cd "$script_dir/.." && pwd)"
repo_root="$(cd "$web_dir/../.." && pwd)"
cli_dir="$repo_root/apps/cli"
wasm_src="$cli_dir/zig-out/bin/cmotion-render.wasm"
wasm_dst="$web_dir/public/cmotion-render.wasm"

# Always invoke `zig build wasm`: Zig's build cache makes this a no-op when
# nothing changed, and a real rebuild when the engine source moved. The old
# `[[ ! -f ]]` guard only rebuilt a *missing* artifact, so a stale wasm left
# in zig-out/ (e.g. from earlier work on another example) would be copied and
# deployed verbatim — shipping an engine older than the source. That stranded
# newer examples (triple-quoted strings, svg(), runner 0.0.5+) with
# "parse_eval failed" on the live site while older scenes kept working.
echo "copy-wasm: building $wasm_src"
(cd "$cli_dir" && zig build wasm)

if [[ ! -f "$wasm_src" ]]; then
  echo "copy-wasm: WASM artifact missing after build — aborting" >&2
  exit 1
fi

cp "$wasm_src" "$wasm_dst"
echo "copy-wasm: $(wc -c <"$wasm_dst") bytes → $wasm_dst"
