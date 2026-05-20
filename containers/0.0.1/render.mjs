// Playwright driver for the cmotion render runner.
//
// Reads a job description from the environment, opens the bundled
// viewer in headless Chromium, drives it to render the requested
// frame (or, later, frame sequence + ffmpeg), and writes the
// result to `$OUT_DIR` (defaults to `/out`).
//
// Env contract — see `containers/README.md` for the spec the
// Worker dispatches against:
//
//   JOB_ID        Required. Names the output file (`<JOB_ID>.png`).
//   SOURCE        Required. The `.cm` source as a string.
//   KIND          'frame' (default) | 'video'. v0 supports 'frame'.
//   PARAMS_JSON   Optional JSON: { at?, width?, height?, fps?, duration? }.
//   ASSETS_JSON   Optional JSON: { "/earth.png": "asset_<uuid>", ... }.
//                 (Not wired in v0 — gallery-only.)
//   OUT_DIR       Output directory (default '/out').
//
// On failure: non-zero exit, last stderr line is
//   `code=<DIAGCODE> message=<one-liner>`
// so the Worker can surface the diagnostic upstream.

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "playwright-core";

const VIEWER_DIR = path.join(import.meta.dirname, "viewer");

function fail(code, message) {
  process.stderr.write(`code=${code} message=${message}\n`);
  process.exit(1);
}

function readEnv() {
  const jobId = process.env.JOB_ID;
  const source = process.env.SOURCE;
  if (!jobId) fail("ENV001", "JOB_ID is required");
  if (!source) fail("ENV002", "SOURCE is required");
  const kind = process.env.KIND ?? "frame";
  if (kind !== "frame" && kind !== "video") {
    fail("ENV003", `KIND must be 'frame' or 'video' (got '${kind}')`);
  }
  let params = {};
  if (process.env.PARAMS_JSON) {
    try { params = JSON.parse(process.env.PARAMS_JSON); }
    catch (e) { fail("ENV004", `PARAMS_JSON: ${e.message}`); }
  }
  const outDir = process.env.OUT_DIR ?? "/out";
  return { jobId, source, kind, params, outDir };
}

// Minimal static file server for the viewer bundle. Listens on a
// random port on 127.0.0.1 so concurrent containers on the same
// host don't collide.
async function startViewerServer() {
  const mimes = {
    ".html": "text/html; charset=utf-8",
    ".js":   "application/javascript",
    ".mjs":  "application/javascript",
    ".css":  "text/css",
    ".svg":  "image/svg+xml",
    ".png":  "image/png",
    ".jpg":  "image/jpeg",
    ".jpeg": "image/jpeg",
    ".ttf":  "font/ttf",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".wasm": "application/wasm",
    ".json": "application/json",
  };
  const server = http.createServer((req, res) => {
    let url = decodeURIComponent((req.url ?? "/").split("?")[0]);
    if (url.endsWith("/")) url += "index.html";
    const file = path.join(VIEWER_DIR, url);
    if (!file.startsWith(VIEWER_DIR)) { res.writeHead(403).end(); return; }
    fs.stat(file, (err, stat) => {
      if (err || !stat.isFile()) { res.writeHead(404).end("not found"); return; }
      const mime = mimes[path.extname(file)] ?? "application/octet-stream";
      res.writeHead(200, { "content-type": mime, "cache-control": "no-store" });
      fs.createReadStream(file).pipe(res);
    });
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const { port } = server.address();
  return { server, base: `http://127.0.0.1:${port}` };
}

// Boots Chromium, loads /render/ with the job's source injected,
// waits for the viewer to be ready, and yields a `{ page, dispose }`
// the caller drives frame-by-frame.
async function bootViewer(env) {
  const { server, base } = await startViewerServer();
  const width  = env.params.width  ?? 1920;
  const height = env.params.height ?? 1080;

  const browser = await chromium.launch({
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const dispose = async () => {
    await browser.close().catch(() => {});
    server.close();
  };
  try {
    const ctx = await browser.newContext({ viewport: { width, height } });
    const page = await ctx.newPage();
    page.on("console", (msg) => {
      if (msg.type() === "error") process.stderr.write(`[viewer] ${msg.text()}\n`);
    });
    await page.addInitScript((source) => {
      window.__job = { source };
    }, env.source);
    await page.goto(`${base}/render/`);
    await page.waitForFunction(
      () => window.__viewerReady === true || window.__viewerError != null,
      null,
      { timeout: 30_000 },
    );
    const viewerError = await page.evaluate(() => window.__viewerError ?? null);
    if (viewerError) {
      await dispose();
      fail(viewerError.code ?? "VIEWER", viewerError.message ?? "unknown viewer error");
    }
    return { page, dispose };
  } catch (e) {
    await dispose();
    throw e;
  }
}

async function renderFrame(env) {
  const { page, dispose } = await bootViewer(env);
  try {
    const at = env.params.at ?? 0;
    await page.evaluate((t) => window.__viewer.seek(t), at);
    await page.evaluate(() => new Promise(requestAnimationFrame));

    fs.mkdirSync(env.outDir, { recursive: true });
    const outPath = path.join(env.outDir, `${env.jobId}.png`);
    await page.locator("canvas").screenshot({ path: outPath, type: "png" });
    process.stdout.write(`[render] frame → ${outPath}\n`);
  } finally {
    await dispose();
  }
}

async function renderVideo(env) {
  const { page, dispose } = await bootViewer(env);
  try {
    const fps = env.params.fps ?? 30;
    const duration = env.params.duration
      ?? await page.evaluate(() => window.__viewer.durationSeconds);
    const totalFrames = Math.max(1, Math.round(duration * fps));

    fs.mkdirSync(env.outDir, { recursive: true });
    const outPath = path.join(env.outDir, `${env.jobId}.mp4`);

    // ffmpeg reads PNGs from stdin (`image2pipe`) at the source
    // framerate, encodes h264 yuv420p so iOS / browser playback is
    // happy, and writes a single mp4. `+faststart` puts the moov
    // atom at the head so the file plays while streaming.
    const ff = spawn("ffmpeg", [
      "-y",
      "-loglevel", "error",
      "-f", "image2pipe",
      "-framerate", String(fps),
      "-i", "-",
      "-c:v", "libx264",
      "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      "-r", String(fps),
      outPath,
    ], { stdio: ["pipe", "inherit", "inherit"] });

    const ffDone = new Promise((res, rej) => {
      ff.on("close", (code) => code === 0 ? res() : rej(new Error(`ffmpeg exit ${code}`)));
      ff.on("error", rej);
    });

    for (let i = 0; i < totalFrames; i++) {
      const t = i / fps;
      await page.evaluate((tt) => window.__viewer.seek(tt), t);
      await page.evaluate(() => new Promise(requestAnimationFrame));
      const png = await page.locator("canvas").screenshot({ type: "png" });
      if (!ff.stdin.write(png)) {
        await new Promise((r) => ff.stdin.once("drain", r));
      }
      if (i === 0 || (i + 1) % fps === 0 || i === totalFrames - 1) {
        process.stdout.write(`[render] frame ${i + 1}/${totalFrames} (t=${t.toFixed(2)}s)\n`);
      }
    }
    ff.stdin.end();
    await ffDone;
    process.stdout.write(`[render] video → ${outPath}\n`);
  } finally {
    await dispose();
  }
}

// HTTP-server mode. Cloudflare Containers proxies requests to a
// port the container exposes, so when CF launches us we run an
// HTTP server instead of the env-driven one-shot path. POST / with
//   { jobId?, source, kind?, params? }
// returns the rendered bytes (image/png for kind=frame, video/mp4
// for kind=video). PORT env var triggers this mode; local Docker
// runs without PORT keep using the env-var one-shot contract.
async function runHttpServer() {
  const port = parseInt(process.env.PORT ?? "8080", 10);
  const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/healthz") {
      res.writeHead(200, { "content-type": "text/plain" }).end("ok\n");
      return;
    }
    if (req.method !== "POST") { res.writeHead(405).end(); return; }
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (c) => { body += c; });
    req.on("end", async () => {
      let job;
      try { job = JSON.parse(body); }
      catch (e) { res.writeHead(400).end(`bad json: ${e.message}`); return; }
      if (!job?.source) { res.writeHead(400).end("missing source"); return; }

      const env = {
        jobId: job.jobId ?? `req-${Date.now()}`,
        source: job.source,
        kind: job.kind ?? "frame",
        params: job.params ?? {},
        outDir: "/tmp/render-out",
      };
      if (env.kind !== "frame" && env.kind !== "video") {
        res.writeHead(400).end(`bad kind: ${env.kind}`); return;
      }

      try {
        if (env.kind === "frame") await renderFrame(env);
        else await renderVideo(env);
        const ext = env.kind === "frame" ? "png" : "mp4";
        const outFile = path.join(env.outDir, `${env.jobId}.${ext}`);
        const stat = fs.statSync(outFile);
        res.writeHead(200, {
          "content-type": env.kind === "frame" ? "image/png" : "video/mp4",
          "content-length": stat.size,
        });
        fs.createReadStream(outFile)
          .on("end", () => fs.unlink(outFile, () => {}))
          .pipe(res);
      } catch (e) {
        process.stderr.write(`[render] error: ${e.stack ?? e.message}\n`);
        res.writeHead(500, { "content-type": "application/json" })
          .end(JSON.stringify({ error: e.message }));
      }
    });
  });
  server.listen(port, "0.0.0.0", () => {
    process.stdout.write(`[render] HTTP mode on :${port}\n`);
  });
}

async function main() {
  // Cloudflare Containers always sets PORT; local `docker run` with
  // env vars (SOURCE / JOB_ID / KIND) keeps using the one-shot path.
  if (process.env.PORT) {
    await runHttpServer();
    return;
  }
  const env = readEnv();
  if (env.kind === "frame") {
    await renderFrame(env);
  } else {
    await renderVideo(env);
  }
}

main().catch((e) => fail("CRASH", e?.stack ?? e?.message ?? String(e)));
