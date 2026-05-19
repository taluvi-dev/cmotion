#!/usr/bin/env bash
# Copy the cmotion interpreter WASM artifact into apps/web/public/ so
# the /play page can fetch it at runtime. Builds the artifact first if
# it doesn't already exist (or is older than its source).
#
# Invoked from apps/web/package.json's `predev` and `prebuild` hooks.

set -euo pipefail

script_dir="$(cd "$(dirname "$0")" && pwd)"
web_dir="$(cd "$script_dir/.." && pwd)"
repo_root="$(cd "$web_dir/../.." && pwd)"
cli_dir="$repo_root/apps/cli"
wasm_src="$cli_dir/zig-out/bin/cmotion-render.wasm"
wasm_dst="$web_dir/public/cmotion-render.wasm"

if [[ ! -f "$wasm_src" ]]; then
  echo "copy-wasm: building $wasm_src"
  (cd "$cli_dir" && zig build wasm)
fi

if [[ ! -f "$wasm_src" ]]; then
  echo "copy-wasm: WASM artifact missing after build — aborting" >&2
  exit 1
fi

cp "$wasm_src" "$wasm_dst"
echo "copy-wasm: $(wc -c <"$wasm_dst") bytes → $wasm_dst"
