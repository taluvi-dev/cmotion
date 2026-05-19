#!/usr/bin/env bash
# Fetch native build dependencies into apps/cli/vendor/.
#
# Today:
#   - tree-sitter C runtime (MIT)
#   - stb_truetype.h          (public domain / MIT, single-header)
#   - DM Sans Bold TTF        (SIL Open Font License 1.1)
#
# Pinned to specific versions so builds are reproducible. Re-run after
# bumping any of the version pins below.

set -euo pipefail

# Pin to known-good versions. Bump deliberately.
TREE_SITTER_VERSION="${TREE_SITTER_VERSION:-v0.25.0}"
# stb_truetype.h is identified by commit; the file's content stays stable
# for years at a time but the upstream `master` is a moving target.
STB_TRUETYPE_REV="${STB_TRUETYPE_REV:-013ac3beddff3dbffafd5177e7972067cd2b5083}"
# Three.js pinned for the `cmo open` viewer (browser-side renderer).
# Reproducibility relies on the pair (cmotion interp WASM + three.js)
# being version-locked. Bump in lockstep with bundle compatibility tests.
THREE_VERSION="${THREE_VERSION:-r170}"

script_dir="$(cd "$(dirname "$0")" && pwd)"
cli_dir="$(cd "$script_dir/.." && pwd)"
vendor_dir="$cli_dir/vendor"
ts_dir="$vendor_dir/tree-sitter"
stb_dir="$vendor_dir/stb"
fonts_dir="$vendor_dir/fonts"
three_dir="$vendor_dir/three"

mkdir -p "$vendor_dir" "$stb_dir" "$fonts_dir" "$three_dir"

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

# stb_truetype.h — single-header TTF rasteriser.
stb_file="$stb_dir/stb_truetype.h"
if [[ ! -f "$stb_file" ]]; then
  echo "fetching stb_truetype.h @ ${STB_TRUETYPE_REV:0:7}"
  curl -fsSL "https://raw.githubusercontent.com/nothings/stb/${STB_TRUETYPE_REV}/stb_truetype.h" -o "$stb_file"
fi
echo "ok: $stb_file ($(wc -c <"$stb_file") bytes)"

# DM Sans Bold (OFL 1.1) — the v0 bundled font used by `text.glyph`.
# Pulled from googlefonts/dm-fonts so we get an upstream-attested copy.
font_file="$fonts_dir/DMSans-Bold.ttf"
license_file="$fonts_dir/OFL.txt"
if [[ ! -f "$font_file" ]]; then
  echo "fetching DM Sans Bold from googlefonts/dm-fonts"
  curl -fsSL "https://raw.githubusercontent.com/googlefonts/dm-fonts/main/Sans/Exports/DMSans-Bold.ttf" -o "$font_file"
fi
if [[ ! -f "$license_file" ]]; then
  curl -fsSL "https://raw.githubusercontent.com/googlefonts/dm-fonts/main/Sans/OFL.txt" -o "$license_file"
fi
echo "ok: $font_file ($(wc -c <"$font_file") bytes, OFL 1.1)"

# three.min.js — the browser-side renderer for `cmo open`. We pin to a
# release tag so the (cmotion interp WASM + three.js) pair stays
# reproducible: a saved bundle replays bit-for-bit on any host with the
# same two versions.
three_file="$three_dir/three.module.min.js"
if [[ ! -f "$three_file" ]] || ! grep -q "REVISION" "$three_file" 2>/dev/null; then
  echo "fetching three.js ${THREE_VERSION}"
  curl -fsSL "https://unpkg.com/three@0.170.0/build/three.module.min.js" -o "$three_file"
fi
echo "ok: $three_file ($(wc -c <"$three_file") bytes, MIT)"
