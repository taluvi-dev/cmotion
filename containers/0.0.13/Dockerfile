# cmotion render runner v0.0.13
#
# Headless Chromium + ffmpeg + the frozen apps/web /render bundle.
# Dispatched one-shot by apps/api per render job. Env-var contract
# documented in containers/README.md; driver code lives in
# render.mjs alongside this file.

FROM mcr.microsoft.com/playwright:v1.56.0-noble

# ffmpeg drives both KIND=video (image2pipe → h264 mp4) and KIND=gif
# (two-pass palettegen/paletteuse). Installed in the base layer so
# driver edits don't bust the expensive apt cache layer.
RUN apt-get update \
 && apt-get install -y --no-install-recommends ffmpeg \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /runner

# Install playwright-core (the rest of Playwright + Chromium binary
# already lives in the base image; this just pins the JS bindings
# to the matching major). Done before COPYing the bundle so the
# expensive layer caches across viewer/driver edits.
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

# The frozen viewer bundle (HTML + JS + WASM + DM Sans + gallery
# images) is committed into containers/0.0.13/viewer/ — see freeze.sh.
# COPYing rather than fetching at build time keeps the image
# reproducible across `apps/web` evolution.
COPY viewer ./viewer
COPY render.mjs ./render.mjs

# Default output goes to /out — caller bind-mounts to capture.
ENV OUT_DIR=/out

ENTRYPOINT ["node", "/runner/render.mjs"]
