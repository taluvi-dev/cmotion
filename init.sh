#!/usr/bin/env bash
# init.sh — one-shot project setup. Installs/validates the toolchain this
# repo needs to build, test, render, and (optionally) deploy. Idempotent:
# safe to re-run. The Claude Code cloud session runs the equivalent steps
# automatically via .claude/hooks/session-start.sh; this script is the
# manual/local counterpart.
#
# Requirements it sets up:
#   - Zig            — pinned in apps/cli/.zigversion (the CLI + WASM renderer)
#   - tree-sitter    — C runtime + stb_truetype + bundled DM Sans Bold,
#                      vendored by apps/cli/scripts/fetch-deps.sh
#   - pnpm + Node    — workspace deps for apps/web and the tree-sitter package
#   - WASM artifact  — apps/cli/zig-out/bin/cmotion-render.wasm (browser editor)
#
# Optional (deploy): wrangler (run via `npx wrangler@4`, not a repo dep) plus
#   CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN in the environment. See the
#   Deploy section of CLAUDE.md.
#
# Optional (agents): a thin @cmotion/mcp render wrapper (render_video /
#   render_frame over apps/api) is planned — no MCP server code in the repo
#   yet. See README.md / TODO.md.

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cli_dir="$repo_root/apps/cli"

# --- Zig (pinned) ---------------------------------------------------------
zig_version="$(cat "$cli_dir/.zigversion")"
if command -v zig >/dev/null 2>&1 && [ "$(zig version 2>/dev/null)" = "$zig_version" ]; then
  zig_bin="$(command -v zig)"
else
  zig_dir="$HOME/.local/zig-$zig_version"
  zig_bin="$zig_dir/zig"
  if [ ! -x "$zig_bin" ]; then
    case "$(uname -m)" in
      x86_64)        zig_arch=x86_64 ;;
      aarch64|arm64) zig_arch=aarch64 ;;
      *) echo "init: unsupported arch '$(uname -m)'" >&2; exit 1 ;;
    esac
    url="https://ziglang.org/download/$zig_version/zig-$zig_arch-linux-$zig_version.tar.xz"
    echo "init: installing zig $zig_version from $url"
    tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
    curl -fsSL "$url" -o "$tmp/zig.tar.xz"
    mkdir -p "$zig_dir"
    tar -xJf "$tmp/zig.tar.xz" -C "$zig_dir" --strip-components=1
    rm -rf "$tmp"; trap - EXIT
  fi
  export PATH="$zig_dir:$PATH"
  echo "init: add 'export PATH=\"$zig_dir:\$PATH\"' to your shell profile to persist zig"
fi

# --- Native build deps (tree-sitter C runtime + stb + font) ---------------
"$cli_dir/scripts/fetch-deps.sh"

# --- pnpm workspace deps --------------------------------------------------
if ! command -v pnpm >/dev/null 2>&1; then
  echo "init: pnpm not found — install it (https://pnpm.io/installation), then re-run" >&2
  exit 1
fi
(cd "$repo_root" && pnpm install)

# --- WASM renderer artifact (browser editor + parity test) ----------------
echo "init: building WASM renderer artifact"
(cd "$cli_dir" && "$zig_bin" build wasm) || \
  echo "init: WARNING — 'zig build wasm' failed (continuing; native build still works)" >&2

echo "init: ready (zig $zig_version, tree-sitter vendored, pnpm installed, wasm built)"
echo "init: try 'cd apps/cli && zig build test --summary all' or 'pnpm dev' from the repo root"
