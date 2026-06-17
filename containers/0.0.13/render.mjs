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

// Lazy-import Playwright so the HTTP server can bind to its port
// *before* we incur Chromium's startup cost — Cloudflare Containers
// pings the port to mark the instance healthy, and a slow / failing
// playwright import on the import line would prevent that ping
// from ever succeeding.
let chromiumPromise = null;
function getChromium() {
  if (!chromiumPromise) {
    chromiumPromise = import("playwright-core").then((m) => m.chromium);
  }
  return chromiumPromise;
}

const VIEWER_DIR = path.join(import.meta.dirname, "viewer");

// Per-job asset overlay. When a render request comes in with an
// `assets` map (path-in-source → base64 bytes), we write the
// decoded files into `currentUploadsDir` and the static viewer
// server checks here *first* before falling back to VIEWER_DIR.
// Cleared after each render. Single-job-at-a-time is enforced by
// the Worker's `max_instances: 1` Containers binding.
let currentUploadsDir = null;

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
  if (!["frame","video","gif","mesh"].includes(kind)) {
    fail("ENV003", `KIND must be 'frame', 'video', 'gif' or 'mesh' (got '${kind}')`);
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
    // Per-job uploaded assets win over the baked-in viewer
    // bundle: a source can write `image("/earth.png")` and a
    // matching uploaded asset will resolve here first. We refuse
    // any path that escapes the uploads root.
    if (currentUploadsDir) {
      const upload = path.join(currentUploadsDir, url);
      if (upload.startsWith(currentUploadsDir + path.sep) || upload === currentUploadsDir) {
        try {
          const stat = fs.statSync(upload);
          if (stat.isFile()) {
            const mime = mimes[path.extname(upload)] ?? "application/octet-stream";
            res.writeHead(200, { "content-type": mime, "cache-control": "no-store" });
            fs.createReadStream(upload).pipe(res);
            return;
          }
        } catch { /* fall through to viewer */ }
      }
    }
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

// Decode an `assets` map ({ "/earth.png": "<base64>" }) into a
// per-job directory the viewer server can serve. Returns the dir
// so the caller can unmount it when the render is done.
function mountAssets(jobId, assets) {
  if (!assets || Object.keys(assets).length === 0) return null;
  const dir = path.join("/tmp", "uploads", jobId);
  fs.mkdirSync(dir, { recursive: true });
  for (const [rawPath, b64] of Object.entries(assets)) {
    if (typeof b64 !== "string") continue;
    // Source paths typically start with `/` ("/earth.png"); the
    // viewer fetches them at root. Normalise to a relative path
    // inside the uploads dir.
    const rel = rawPath.replace(/^\/+/, "");
    if (!/^[A-Za-z0-9._\-\/]+$/.test(rel) || rel.includes("..")) {
      throw new Error(`bad asset path: ${rawPath}`);
    }
    const dest = path.join(dir, rel);
    if (!dest.startsWith(dir + path.sep)) {
      throw new Error(`asset path escapes uploads dir: ${rawPath}`);
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(b64, "base64"));
  }
  currentUploadsDir = dir;
  return dir;
}

function unmountAssets(dir) {
  if (!dir) return;
  try { fs.rmSync(dir, { recursive: true, force: true }); } catch {}
  if (currentUploadsDir === dir) currentUploadsDir = null;
}

// Boots Chromium, loads /render/ with the job's source injected,
// waits for the viewer to be ready, and yields a `{ page, dispose }`
// the caller drives frame-by-frame.
async function bootViewer(env) {
  const { server, base } = await startViewerServer();
  const width  = env.params.width  ?? 1920;
  const height = env.params.height ?? 1080;

  const chromium = await getChromium();
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
    // Wait for deferred assets (vectorize() traces) to resolve before render.
    await page.waitForFunction(() => !window.__viewer || window.__viewer.pending === 0, null, { timeout: 45_000 }).catch(() => {});
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
  const uploadDir = mountAssets(env.jobId, env.assets);
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
    unmountAssets(uploadDir);
  }
}

async function renderVideo(env) {
  const uploadDir = mountAssets(env.jobId, env.assets);
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
    unmountAssets(uploadDir);
  }
}

// Run ffmpeg with the given args, resolving on a clean exit. Used by the
// GIF path's two-pass palette encode.
function runFfmpeg(args) {
  return new Promise((res, rej) => {
    const ff = spawn("ffmpeg", args, { stdio: ["ignore", "inherit", "inherit"] });
    ff.on("close", (code) => (code === 0 ? res() : rej(new Error(`ffmpeg exit ${code}`))));
    ff.on("error", rej);
  });
}

// Animated GIF over the scene's loop. Unlike the mp4 path (which pipes
// PNGs straight into a single ffmpeg), a quality GIF needs a two-pass
// palette: write the frames to disk, build an optimal 256-colour palette
// from all of them (palettegen, full stats), then map the frames through
// it (paletteuse with error-diffusion dither). `-loop 0` loops forever.
// Default fps is lower than video (GIF is palette-indexed and grows fast).
async function renderGif(env) {
  const uploadDir = mountAssets(env.jobId, env.assets);
  const { page, dispose } = await bootViewer(env);
  try {
    const fps = env.params.fps ?? 20;
    const duration = env.params.duration
      ?? await page.evaluate(() => window.__viewer.durationSeconds);
    const totalFrames = Math.max(1, Math.round(duration * fps));

    const framesDir = path.join("/tmp", "gif-frames", env.jobId);
    fs.rmSync(framesDir, { recursive: true, force: true });
    fs.mkdirSync(framesDir, { recursive: true });

    for (let i = 0; i < totalFrames; i++) {
      const t = i / fps;
      await page.evaluate((tt) => window.__viewer.seek(tt), t);
      await page.evaluate(() => new Promise(requestAnimationFrame));
      const png = await page.locator("canvas").screenshot({ type: "png" });
      fs.writeFileSync(path.join(framesDir, `f${String(i).padStart(5, "0")}.png`), png);
      if (i === 0 || (i + 1) % fps === 0 || i === totalFrames - 1) {
        process.stdout.write(`[render] gif frame ${i + 1}/${totalFrames} (t=${t.toFixed(2)}s)\n`);
      }
    }

    fs.mkdirSync(env.outDir, { recursive: true });
    const outPath = path.join(env.outDir, `${env.jobId}.gif`);
    const palette = path.join(framesDir, "palette.png");
    const pattern = path.join(framesDir, "f%05d.png");

    await runFfmpeg([
      "-y", "-loglevel", "error",
      "-framerate", String(fps),
      "-i", pattern,
      "-vf", "palettegen=stats_mode=full",
      palette,
    ]);
    await runFfmpeg([
      "-y", "-loglevel", "error",
      "-framerate", String(fps),
      "-i", pattern,
      "-i", palette,
      "-lavfi", "paletteuse=dither=sierra2_4a",
      "-loop", "0",
      outPath,
    ]);

    fs.rmSync(framesDir, { recursive: true, force: true });
    process.stdout.write(`[render] gif → ${outPath}\n`);
  } finally {
    await dispose();
    unmountAssets(uploadDir);
  }
}

// SVG → 3D mesh (.glb). Unlike frame/video/gif this never renders pixels:
// it loads the viewer page in mesh mode (no scene/wasm boot) and calls the
// viewer's svgToGlb export, which builds the same solid the svg() primitive
// renders and serialises it with three's GLTFExporter. `env.source` is the
// SVG string; params: { depth?, size? } in mesh units.
async function renderMesh(env) {
  const { server, base } = await startViewerServer();
  const chromium = await getChromium();
  const browser = await chromium.launch({ args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  try {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    page.on("console", (msg) => {
      if (msg.type() === "error") process.stderr.write(`[viewer] ${msg.text()}\n`);
    });
    await page.addInitScript(() => { window.__meshMode = true; });
    await page.goto(`${base}/render/`);
    await page.waitForFunction(() => typeof window.__svgToGlbB64 === "function", null, { timeout: 30_000 });
    const depth = env.params.depth ?? 0.4;
    const size = env.params.size ?? 2;
    const round = env.params.round ?? 0;
    const b64 = await page.evaluate(
      ([s, d, z, r]) => window.__svgToGlbB64(s, d, z, r),
      [env.source, depth, size, round],
    );
    fs.mkdirSync(env.outDir, { recursive: true });
    const outPath = path.join(env.outDir, `${env.jobId}.glb`);
    fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
    process.stdout.write(`[render] mesh → ${outPath} (${fs.statSync(outPath).size} bytes)\n`);
  } finally {
    await browser.close().catch(() => {});
    server.close();
  }
}

// Raster image → centreline SVG (vectorize). The image is mounted from the
// job's `assets` and served by the viewer's static server; the page loads it
// and runs the skeletonize/trace in canvas, returning a uniform-stroke SVG.
// `env.source` is the image path (e.g. "/in.png"); params: { strokeWidth?,
// threshold?, simplify?, maxDim? }.
async function renderVectorize(env) {
  const uploadDir = mountAssets(env.jobId, env.assets);
  const { server, base } = await startViewerServer();
  const chromium = await getChromium();
  const browser = await chromium.launch({ args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  try {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    page.on("console", (msg) => { if (msg.type() === "error") process.stderr.write(`[viewer] ${msg.text()}\n`); });
    await page.addInitScript(() => { window.__meshMode = true; });
    await page.goto(`${base}/render/`);
    await page.waitForFunction(() => typeof window.__vectorize === "function", null, { timeout: 30_000 });
    const opts = {
      strokeWidth: env.params.strokeWidth ?? env.params.stroke_width ?? 6,
      threshold: env.params.threshold ?? 0.5,
      simplify: env.params.simplify ?? 1.5,
      maxDim: env.params.maxDim ?? 700,
      bridge: env.params.bridge ?? 2,
      stitch: env.params.stitch ?? 6,
    };
    // env.source is the in-source image path; the mounted asset is served at
    // the same origin, so a root-relative URL resolves to it.
    const url = env.source.startsWith("/") ? env.source : "/" + env.source;
    const svg = await page.evaluate(([u, o]) => window.__vectorize(u, o), [url, opts]);
    fs.mkdirSync(env.outDir, { recursive: true });
    const outPath = path.join(env.outDir, `${env.jobId}.svg`);
    fs.writeFileSync(outPath, svg, "utf8");
    process.stdout.write(`[render] vectorize → ${outPath} (${fs.statSync(outPath).size} bytes)\n`);
  } finally {
    await browser.close().catch(() => {});
    server.close();
    unmountAssets(uploadDir);
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
        // Optional `assets`: { "/earth.png": "<base64 bytes>" }
        // mapping path-in-source to file contents. Mounted ahead
        // of the baked-in viewer so the source can reference them
        // by friendly path.
        assets: job.assets ?? {},
        outDir: "/tmp/render-out",
      };
      if (!["frame", "video", "gif", "mesh", "vectorize"].includes(env.kind)) {
        res.writeHead(400).end(`bad kind: ${env.kind}`); return;
      }

      try {
        if (env.kind === "frame") await renderFrame(env);
        else if (env.kind === "gif") await renderGif(env);
        else if (env.kind === "mesh") await renderMesh(env);
        else if (env.kind === "vectorize") await renderVectorize(env);
        else await renderVideo(env);
        const ext = env.kind === "frame" ? "png" : env.kind === "gif" ? "gif" : env.kind === "mesh" ? "glb" : env.kind === "vectorize" ? "svg" : "mp4";
        const mime = env.kind === "frame" ? "image/png" : env.kind === "gif" ? "image/gif" : env.kind === "mesh" ? "model/gltf-binary" : env.kind === "vectorize" ? "image/svg+xml" : "video/mp4";
        const outFile = path.join(env.outDir, `${env.jobId}.${ext}`);
        const stat = fs.statSync(outFile);
        res.writeHead(200, {
          "content-type": mime,
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
  // HTTP server is the only run mode. CF Containers doesn't set
  // PORT by default (that's a load-balancer pattern, not a
  // Containers SDK one), so we'd previously fall into a one-shot
  // mode and exit immediately — the whole reason the binding
  // looked broken on the first deploy. Listen on $PORT if set
  // (CF binding uses it), else 8080.
  await runHttpServer();
}

main().catch((e) => fail("CRASH", e?.stack ?? e?.message ?? String(e)));
