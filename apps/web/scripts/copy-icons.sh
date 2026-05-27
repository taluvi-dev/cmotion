#!/usr/bin/env bash
# Copy the bundled Lucide (ISC) icon set into apps/web/public/icons/ so the
# viewer can fetch /icons/<name>.svg at render time. Generated, gitignored —
# the icons live in the lucide-static dependency, not the repo. Invoked from
# apps/web's predev / prebuild hooks alongside copy-wasm.sh.
set -euo pipefail
script_dir="$(cd "$(dirname "$0")" && pwd)"
web_dir="$(cd "$script_dir/.." && pwd)"
pkg="$(cd "$web_dir" && node -e "process.stdout.write(require('path').dirname(require.resolve('lucide-static/package.json')))")"
dst="$web_dir/public/icons"
rm -rf "$dst"
mkdir -p "$dst"
cp "$pkg"/icons/*.svg "$dst"/
cp "$pkg"/LICENSE "$dst"/LICENSE
echo "copy-icons: $(ls "$dst"/*.svg | wc -l) Lucide icons → public/icons/"
