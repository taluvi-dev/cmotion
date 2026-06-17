#!/usr/bin/env bash
# init.sh — bootstrap a cmotion dev/test environment from a clean checkout.
#
# Installs the pinned Zig toolchain, vendors the native build deps
# (tree-sitter C runtime, stb_truetype, DM Sans, three.js), installs the
# pnpm workspace, and builds the CLI + the WASM interpreter. Idempotent —
# safe to re-run. Linux/macOS; Zig is fetched per-arch.
#
# After this, you can:
#   cd apps/cli && zig build test     # headless unit tests (no display)
#   cd apps/cli && zig build run -- render --out frame.ppm <file.cm>
#   pnpm --filter @cmotion/web dev    # the docs site + in-browser editor
#   docker build -t cmotion-runner containers/0.0.3   # the render runner
#
# (The Claude-Code-on-the-web SessionStart hook in .claude/ calls the same
# steps automatically; this script is the manual/standalone entry point.)

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$repo_root"

zig_version="$(cat apps/cli/.zigversion)"
zig_dir="$HOME/.local/zig-$zig_version"
zig_bin="$zig_dir/zig"

# --- Zig toolchain (pinned) ---------------------------------------------
if [ ! -x "$zig_bin" ]; then
  case "$(uname -m)" in
    x86_64)        zig_arch=x86_64 ;;
    aarch64|arm64) zig_arch=aarch64 ;;
    *) echo "init: unsupported arch '$(uname -m)'" >&2; exit 1 ;;
  esac
  case "$(uname -s)" in
    Linux)  zig_os=linux ;;
    Darwin) zig_os=macos ;;
    *) echo "init: unsupported OS '$(uname -s)' — install Zig $zig_version manually" >&2; exit 1 ;;
  esac
  url="https://ziglang.org/download/$zig_version/zig-$zig_arch-$zig_os-$zig_version.tar.xz"
  echo "init: installing Zig $zig_version from $url"
  tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
  curl -fsSL "$url" -o "$tmp/zig.tar.xz"
  mkdir -p "$zig_dir"
  tar -xJf "$tmp/zig.tar.xz" -C "$zig_dir" --strip-components=1
  rm -rf "$tmp"; trap - EXIT
else
  echo "init: Zig $zig_version already present ($zig_bin)"
fi
export PATH="$zig_dir:$PATH"

# --- native build deps (vendored, gitignored) ---------------------------
echo "init: vendoring native deps (tree-sitter, stb, fonts, three.js)"
bash apps/cli/scripts/fetch-deps.sh

# --- pnpm workspace (web + tree-sitter package) -------------------------
if command -v pnpm >/dev/null 2>&1; then
  echo "init: installing pnpm workspace"
  pnpm install --frozen-lockfile
else
  echo "init: pnpm not found — skipping JS deps (install Node 20+ and pnpm 10+ for the web app)"
fi

# --- build the CLI + WASM interpreter -----------------------------------
echo "init: building cmotion (native + wasm)"
( cd apps/cli && "$zig_bin" build )

cat <<EOF

init: done.
  Zig:      $zig_bin
  CLI:      apps/cli/zig-out/bin/cmotion
  WASM:     apps/cli/zig-out/bin/cmotion-render.wasm

Add Zig to your PATH for this shell:
  export PATH="$zig_dir:\$PATH"

Next:
  cd apps/cli && zig build test          # headless unit tests
  ./apps/cli/zig-out/bin/cmotion --help  # CLI usage
  docker build -t cmotion-runner containers/0.0.3   # build the render runner
EOF
