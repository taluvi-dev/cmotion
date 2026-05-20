#!/usr/bin/env bash
# Deploy @cmotion/api.
#
# Why this exists: the committed `wrangler.jsonc` uses
# `CF_ACCOUNT_PLACEHOLDER` in the container image path, so the
# Cloudflare account ID never lands in git. This script substitutes
# the real account ID from $CLOUDFLARE_ACCOUNT_ID into a tmp config
# and runs wrangler against that.

set -euo pipefail

if [[ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
  echo "deploy: CLOUDFLARE_ACCOUNT_ID must be set in the environment" >&2
  exit 1
fi

api_dir="$(cd "$(dirname "$0")/.." && pwd)"
cd "$api_dir"

# Substituted config has to live next to wrangler.jsonc so `main:
# "src/index.ts"` and other relative paths resolve. The file is in
# .gitignore so the rendered account_id never lands in git.
tmp_cfg="$api_dir/.wrangler-deploy.jsonc"
trap 'rm -f "$tmp_cfg"' EXIT

sed "s/CF_ACCOUNT_PLACEHOLDER/$CLOUDFLARE_ACCOUNT_ID/g" wrangler.jsonc > "$tmp_cfg"

exec pnpm exec wrangler deploy --config "$tmp_cfg" "$@"
