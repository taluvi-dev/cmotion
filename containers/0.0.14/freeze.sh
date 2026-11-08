#!/usr/bin/env bash
# Freeze the current apps/web build into the runner's viewer//.
#
# Each runner version is self-contained — the viewer bundle and the
# WASM interpreter are committed alongside the Dockerfile so a 0.0.1
# image always renders 0.0.1 bytes, even after apps/cli and apps/web
# move on. This script copies the relevant slice of
# `apps/web/dist/` into `viewer/`. Run it once when creating the
# runner; re-running overwrites in place.

set -euo pipefail

script_dir="$(cd "$(dirname "$0")" && pwd)"
runner_dir="$script_dir"
repo_root="$(cd "$runner_dir/../.." && pwd)"
web_dir="$repo_root/apps/web"
dist_dir="$web_dir/dist"
viewer_dir="$runner_dir/viewer"

if [[ ! -d "$dist_dir" ]]; then
  echo "freeze: $dist_dir not found — running web build first"
  (cd "$repo_root" && pnpm --filter @cmotion/web build)
fi

if [[ ! -f "$dist_dir/render/index.html" ]]; then
  echo "freeze: $dist_dir/render/index.html not found after build — aborting" >&2
  exit 1
fi

rm -rf "$viewer_dir"
mkdir -p "$viewer_dir"

# Slice of dist that the /render page actually needs. Skipping
# Starlight chrome (search index, sitemap, doc pages, fonts beyond
# DM Sans) keeps the image lean.
cp -R "$dist_dir/render"             "$viewer_dir/render"
cp -R "$dist_dir/_astro"             "$viewer_dir/_astro"
cp    "$dist_dir/cmotion-render.wasm" "$viewer_dir/cmotion-render.wasm"
cp    "$dist_dir/DMSans-Bold.ttf"    "$viewer_dir/DMSans-Bold.ttf"
cp    "$dist_dir/favicon.svg"        "$viewer_dir/favicon.svg" 2>/dev/null || true
# Gallery images that ship with the runner (referenced by examples
# via `image("/img/<name>")`). Optional — the API will mount per-job
# uploaded assets in `staging/` separately.
if [[ -d "$dist_dir/img" ]]; then
  cp -R "$dist_dir/img"              "$viewer_dir/img"
fi

bytes=$(du -sh "$viewer_dir" | awk '{print $1}')
echo "freeze: viewer/ ← apps/web/dist/  ($bytes)"
