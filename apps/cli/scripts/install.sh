#!/usr/bin/env bash
# Install the cmotion binary, plus a `cmo` alias when the name is free.
#
# Usage:
#   ./scripts/install.sh [--prefix /usr/local] [--no-alias]
#
# The binary is read from zig-out/bin/cmotion and copied to $prefix/bin.
# If `cmo` is not already on PATH, a symlink `cmo -> cmotion` is created
# alongside the binary so users get the short name for free. Pass --no-alias
# to skip the alias regardless.

set -euo pipefail

prefix="/usr/local"
install_alias=1

while [[ $# -gt 0 ]]; do
  case "$1" in
    --prefix)   prefix="$2"; shift 2 ;;
    --prefix=*) prefix="${1#*=}"; shift ;;
    --no-alias) install_alias=0; shift ;;
    -h|--help)
      sed -n '2,12p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *)
      echo "install.sh: unknown flag: $1" >&2
      exit 2
      ;;
  esac
done

bindir="${prefix%/}/bin"
src="zig-out/bin/cmotion"

if [[ ! -x "$src" ]]; then
  echo "install.sh: $src not found. Run 'zig build -Doptimize=ReleaseFast' first." >&2
  exit 1
fi

mkdir -p "$bindir"
install -m 0755 "$src" "$bindir/cmotion"
echo "installed: $bindir/cmotion"

if [[ "$install_alias" -eq 0 ]]; then
  exit 0
fi

# Only register the `cmo` alias when the name is free. We treat the alias as
# "free" if `command -v cmo` returns nothing OR resolves to a symlink we own.
existing="$(command -v cmo 2>/dev/null || true)"
if [[ -z "$existing" ]]; then
  ln -sf cmotion "$bindir/cmo"
  echo "installed: $bindir/cmo -> cmotion"
elif [[ -L "$existing" && "$(readlink "$existing")" == "cmotion" ]]; then
  ln -sf cmotion "$bindir/cmo"
  echo "refreshed: $bindir/cmo -> cmotion"
else
  echo "note: 'cmo' is already on PATH at $existing — skipping alias."
  echo "      add 'alias cmo=cmotion' to your shell rc if you want it anyway."
fi
