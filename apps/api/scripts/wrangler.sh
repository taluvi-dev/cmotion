#!/usr/bin/env bash
# Wrap `wrangler <subcommand>` with placeholder substitution so the
# committed `wrangler.jsonc` (which contains CF_ACCOUNT_PLACEHOLDER
# and D1_DB_ID_PLACEHOLDER) can be used for any wrangler command —
# not just `deploy`.
#
# Usage:
#   scripts/wrangler.sh d1 migrations apply cmotion-jobs --remote
#   scripts/wrangler.sh tail
#   scripts/wrangler.sh d1 execute cmotion-jobs --command "SELECT 1"

set -euo pipefail

if [[ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
  echo "wrangler.sh: CLOUDFLARE_ACCOUNT_ID must be set" >&2
  exit 1
fi
if [[ -z "${D1_DB_ID:-}" ]]; then
  echo "wrangler.sh: D1_DB_ID must be set" >&2
  exit 1
fi

api_dir="$(cd "$(dirname "$0")/.." && pwd)"
cd "$api_dir"

tmp_cfg="$api_dir/.wrangler-deploy.jsonc"
trap 'rm -f "$tmp_cfg"' EXIT

sed -e "s/CF_ACCOUNT_PLACEHOLDER/$CLOUDFLARE_ACCOUNT_ID/g" \
    -e "s/D1_DB_ID_PLACEHOLDER/$D1_DB_ID/g" \
    wrangler.jsonc > "$tmp_cfg"

exec pnpm exec wrangler --config "$tmp_cfg" "$@"
