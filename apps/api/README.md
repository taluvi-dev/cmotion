# @cmotion/api

Open-source render service for cmotion: a Cloudflare Worker that accepts
a `.cm` source + assets (uploads or external URLs) and returns a rendered
video or a single frame. **Deploy your own** — the `api.cmotion.org`
instance is a rate-limited playground, not a hosted service to build
against. Spec: `TODO.md` → "Hosted render API on Cloudflare".

## Layout

```
apps/api/
  src/              Worker code (Hono app, route handlers, D1/R2 wiring).
  migrations/       D1 schema migrations.
  wrangler.toml     Bindings + container image pin (by runner version).
```

The render container does **not** live under `apps/api/`. It's
versioned at the repo root under `containers/<version>/` — see
`containers/README.md`. The Worker's `wrangler.toml` pins a
specific runner version + image SHA so deploys stay reproducible.

## Status

Scaffolding. Not yet wired up.
