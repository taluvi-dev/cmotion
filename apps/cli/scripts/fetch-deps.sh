#!/usr/bin/env bash
# Fetch native build dependencies into apps/cli/vendor/.
#
# Today: the tree-sitter C runtime (MIT-licensed). Pinned to a tag so builds
# are reproducible. Re-run after bumping TREE_SITTER_VERSION.

set -euo pipefail

# Pin to a known-good tree-sitter runtime. Bump deliberately.
TREE_SITTER_VERSION="${TREE_SITTER_VERSION:-v0.25.0}"

script_dir="$(cd "$(dirname "$0")" && pwd)"
cli_dir="$(cd "$script_dir/.." && pwd)"
vendor_dir="$cli_dir/vendor"
ts_dir="$vendor_dir/tree-sitter"

mkdir -p "$vendor_dir"

if [[ -d "$ts_dir/.git" ]]; then
  echo "tree-sitter already present at $ts_dir"
  current="$(git -C "$ts_dir" describe --tags --exact-match 2>/dev/null || echo "")"
  if [[ "$current" != "$TREE_SITTER_VERSION" ]]; then
    echo "  refreshing to $TREE_SITTER_VERSION (was: ${current:-detached})"
    git -C "$ts_dir" fetch --tags --depth 1 origin "$TREE_SITTER_VERSION"
    git -C "$ts_dir" checkout --detach "$TREE_SITTER_VERSION"
  fi
else
  echo "cloning tree-sitter $TREE_SITTER_VERSION into $ts_dir"
  git clone --depth 1 --branch "$TREE_SITTER_VERSION" \
    https://github.com/tree-sitter/tree-sitter.git "$ts_dir"
fi

echo "ok: $ts_dir ($(git -C "$ts_dir" rev-parse --short HEAD))"
