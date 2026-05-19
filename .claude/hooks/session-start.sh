#!/usr/bin/env bash
# Session-start setup for Claude Code on the web.
#
# Installs the Zig toolchain pinned in apps/cli/.zigversion, vendors the
# tree-sitter C runtime, and installs pnpm workspace deps. Locally, users
# manage their own toolchain — this script bails when not running in a
# remote container.

set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

ZIG_VERSION="$(cat "$CLAUDE_PROJECT_DIR/apps/cli/.zigversion")"
ZIG_DIR="$HOME/.local/zig-$ZIG_VERSION"
ZIG_BIN="$ZIG_DIR/zig"

if [ ! -x "$ZIG_BIN" ]; then
  arch="$(uname -m)"
  case "$arch" in
    x86_64)          ZIG_ARCH=x86_64 ;;
    aarch64|arm64)   ZIG_ARCH=aarch64 ;;
    *) echo "session-start: unsupported arch '$arch'" >&2; exit 1 ;;
  esac
  url="https://ziglang.org/download/$ZIG_VERSION/zig-$ZIG_ARCH-linux-$ZIG_VERSION.tar.xz"
  echo "session-start: installing zig $ZIG_VERSION from $url"
  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' EXIT
  curl -fsSL "$url" -o "$tmp/zig.tar.xz"
  mkdir -p "$ZIG_DIR"
  tar -xJf "$tmp/zig.tar.xz" -C "$ZIG_DIR" --strip-components=1
  trap - EXIT
  rm -rf "$tmp"
fi

# Persist PATH for the rest of the session.
echo "export PATH=\"$ZIG_DIR:\$PATH\"" >> "$CLAUDE_ENV_FILE"
export PATH="$ZIG_DIR:$PATH"

# Vendor the tree-sitter C runtime — fetch-deps.sh is itself idempotent.
"$CLAUDE_PROJECT_DIR/apps/cli/scripts/fetch-deps.sh"

# pnpm workspace deps (web build, tree-sitter generate). zig build itself
# doesn't need these, but the wider monorepo does.
cd "$CLAUDE_PROJECT_DIR" && pnpm install --frozen-lockfile

# Pre-build the WASM renderer so the browser editor (and the parity
# test) can find it at apps/cli/zig-out/bin/cmotion-render.wasm
# without a cold-cache wait on the first session command. Non-fatal:
# the native build is still the primary deliverable; a broken WASM
# step shouldn't stop the session from booting.
echo "session-start: building WASM renderer artifact"
(cd "$CLAUDE_PROJECT_DIR/apps/cli" && "$ZIG_BIN" build wasm) || {
  echo "session-start: WARNING — zig build wasm failed (continuing without WASM artifact)" >&2
}

echo "session-start: ready (zig $ZIG_VERSION, tree-sitter vendored, pnpm installed, wasm built)"
