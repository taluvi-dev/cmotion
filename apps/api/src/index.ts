// cmotion hosted render API.
//
// Async job model:
//   POST /v1/render  { source, params?: { fps?, duration?, width?, height? } }
//                      → 202 { job_id, status: 'pending' }    (kind=video)
//   POST /v1/frame   { source, params?: { at?, width?, height? } }
//                      → 202 { job_id, status: 'pending' }    (kind=frame)
//   GET  /v1/jobs/:id
//                      → 200 { job_id, status: 'ready', kind, url }
//                      → 200 { job_id, status: 'pending' }
//                      → 500 { job_id, status: 'error', message }
//                      → 404 { error: 'not_found' }
//   GET  /v1/outputs/<filename>   streams the R2 object inline
//
// The Worker writes a `pending` row to D1, returns immediately,
// and uses ctx.waitUntil() to run the container render in the
// background. When the container responds with bytes, the Worker
// uploads them to R2 and flips the row to `ready`. Errors land in
// the same row as `status='error'`.
//
// Debug:
//   GET /test       hardcoded scene, synchronous PNG response
//   GET /healthz    liveness

import { Container, getContainer } from "@cloudflare/containers";

type Env = {
  RENDER_RUNNER: DurableObjectNamespace<RenderRunner>;
  DB: D1Database;
  R2: R2Bucket;
};

export class RenderRunner extends Container<Env> {
  defaultPort = 8080;
  // 5 min idle keep-alive — long enough that a couple of back-to-
  // back renders share the same warm Chromium, short enough that
  // we don't pay for hours of idle.
  sleepAfter = "5m";

  // RPC entry point called from the Worker. We kick off the actual
  // render work via the DO's own `ctx.waitUntil()` so the calling
  // Worker request can return 202 immediately. The DO's waitUntil
  // budget is bounded by the DO's lifetime (minutes-to-hours when
  // active), not the Worker request's ~30 s cap that bit us when
  // we tried to render inline.
  async runJob(
    id: string,
    kind: "video" | "frame",
    source: string,
    params: Record<string, unknown>,
    assets: Record<string, string>,
  ): Promise<void> {
    this.ctx.waitUntil(this.executeJob(id, kind, source, params, assets));
  }

  // The actual render lifecycle — runs inside the DO via waitUntil,
  // so it doesn't share the Worker request's deadline.
  private async executeJob(
    id: string,
    kind: "video" | "frame",
    source: string,
    params: Record<string, unknown>,
    assets: Record<string, string>,
  ): Promise<void> {
    try {
      console.log(`[do] ${id} assets received:`, JSON.stringify(assets));
      // Fetch each referenced asset from R2 staging and inline
      // it as base64 in the request to the container. Inlining
      // bytes (instead of giving the container a signed URL) keeps
      // the container free of CF credentials and the storage
      // pipeline single-direction (Worker → Container → R2 outputs).
      const assetBytes: Record<string, string> = {};
      for (const [pathInSource, key] of Object.entries(assets)) {
        const obj = await this.env.R2.get(`staging/${key}`);
        if (!obj) {
          console.error(`[do] ${id} asset NOT FOUND in R2: staging/${key}`);
          await markErrorInDb(this.env, id, `asset not found: ${key}`);
          return;
        }
        const bytes = await obj.arrayBuffer();
        assetBytes[pathInSource] = bufferToBase64(bytes);
        console.log(`[do] ${id} loaded asset ${pathInSource} = ${bytes.byteLength} bytes`);
      }

      const containerRes = await this.containerFetch(
        new Request("http://container/", {
          method: "POST",
          headers: JSON_HEADERS,
          body: JSON.stringify({ jobId: id, source, kind, params, assets: assetBytes }),
        }),
      );

      if (!containerRes.ok) {
        const errBody = await containerRes.text();
        await markErrorInDb(this.env, id, errBody.slice(0, 500));
        return;
      }

      const ext = kind === "frame" ? "png" : "mp4";
      const mime = kind === "frame" ? "image/png" : "video/mp4";
      const key = `outputs/${id}.${ext}`;

      const bytes = await containerRes.arrayBuffer();
      await this.env.R2.put(key, bytes, { httpMetadata: { contentType: mime } });

      await this.env.DB.prepare(
        `UPDATE jobs
         SET status='ready', output_key=?, output_mime=?, completed_at=?
         WHERE id=?`,
      )
        .bind(key, mime, Date.now(), id)
        .run();
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      await markErrorInDb(this.env, id, message.slice(0, 500));
    }
  }
}

// Workers don't have Node's Buffer.toString("base64"); roll one
// from the ArrayBuffer manually. Modern V8 makes this fast enough
// for the few-MB image payloads the API takes.
function bufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
  return btoa(bin);
}

// Standalone DB-update helper so both the DO and any future
// non-DO error path can call it.
async function markErrorInDb(env: Env, id: string, message: string): Promise<void> {
  await env.DB.prepare(
    `UPDATE jobs
     SET status='error', error_message=?, completed_at=?
     WHERE id=?`,
  )
    .bind(message, Date.now(), id)
    .run();
}

const TEST_SOURCE = `runner "0.0.1";

use std.shapes.*;

scene quick() -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: oklch(0.10, 0.04, 280));
  let fg = rect(width: 300px, height: 300px, fill: #ff3399);
  compose [bg, fg]
}
`;

// Machine-readable contract. Kept inline (not loaded from a file)
// so every Worker deploy ships with a spec that matches the code
// it's serving. Bump `info.version` when adding or removing
// endpoints; the API is at v0 so additive shape changes don't
// bump it.
const OPENAPI_SPEC = {
  openapi: "3.1.0",
  info: {
    title: "cmotion render API",
    version: "0.0.1",
    description:
      "Hosted render service for cmotion sources. POST a `.cm` source, poll until the job is ready, then download the resulting PNG or MP4. No authentication in v0; protected by Cloudflare edge rate-limiting. See https://cmotion.org/api/ for the human-readable reference.",
    license: { name: "MIT" },
  },
  servers: [{ url: "https://api.cmotion.org" }],
  paths: {
    "/v1/render": {
      post: {
        summary: "Enqueue a video render",
        description:
          "Schedules a video render job. Returns immediately with a `job_id`; poll `GET /v1/jobs/{id}` until status is `ready`, then fetch the URL it returns.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RenderRequest" },
            },
          },
        },
        responses: {
          "202": {
            description: "Job accepted, rendering in the background.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EnqueueResponse" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
        },
      },
    },
    "/v1/frame": {
      post: {
        summary: "Enqueue a single-frame render",
        description:
          "Schedules a single-frame render at the requested time. Returns immediately with a `job_id`.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/FrameRequest" },
            },
          },
        },
        responses: {
          "202": {
            description: "Job accepted, rendering in the background.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EnqueueResponse" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
        },
      },
    },
    "/v1/jobs/{id}": {
      get: {
        summary: "Poll render job status",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "Current job state. Status is one of `pending` / `ready` / `error`.",
            content: {
              "application/json": {
                schema: {
                  oneOf: [
                    { $ref: "#/components/schemas/JobPending" },
                    { $ref: "#/components/schemas/JobReady" },
                  ],
                },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": {
            description: "Render failed.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/JobError" },
              },
            },
          },
        },
      },
    },
    "/v1/outputs/{filename}": {
      get: {
        summary: "Download a rendered output",
        description:
          "Streams the rendered PNG or MP4 inline. Returned by the `url` field of a `ready` job — clients shouldn't construct this URL manually.",
        parameters: [
          {
            name: "filename",
            in: "path",
            required: true,
            schema: { type: "string", pattern: "^[A-Za-z0-9._-]+$" },
          },
        ],
        responses: {
          "200": {
            description: "Rendered output.",
            content: {
              "image/png": { schema: { type: "string", format: "binary" } },
              "video/mp4": { schema: { type: "string", format: "binary" } },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/healthz": {
      get: {
        summary: "Liveness probe",
        responses: {
          "200": {
            description: "Worker is alive.",
            content: { "text/plain": { schema: { type: "string" } } },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      RenderRequest: {
        type: "object",
        required: ["source"],
        properties: {
          source: {
            type: "string",
            maxLength: 65536,
            description:
              "The `.cm` source. Should pin its target runner with a `runner \"<semver>\";` declaration at the top.",
          },
          params: {
            type: "object",
            properties: {
              fps: { type: "integer", minimum: 1, maximum: 60, default: 30 },
              duration: {
                type: "number",
                minimum: 0.1,
                maximum: 300,
                description:
                  "Render duration in seconds. Defaults to the scene's declared duration.",
              },
              width: { type: "integer", minimum: 16, maximum: 3840, default: 1920 },
              height: { type: "integer", minimum: 16, maximum: 2160, default: 1080 },
            },
          },
        },
      },
      FrameRequest: {
        type: "object",
        required: ["source"],
        properties: {
          source: { type: "string", maxLength: 65536 },
          params: {
            type: "object",
            properties: {
              at: {
                type: "number",
                minimum: 0,
                default: 0,
                description: "Time in seconds to seek to before screenshotting.",
              },
              width: { type: "integer", minimum: 16, maximum: 3840, default: 1920 },
              height: { type: "integer", minimum: 16, maximum: 2160, default: 1080 },
            },
          },
        },
      },
      EnqueueResponse: {
        type: "object",
        required: ["job_id", "status", "kind"],
        properties: {
          job_id: { type: "string", format: "uuid" },
          status: { type: "string", enum: ["pending"] },
          kind: { type: "string", enum: ["video", "frame"] },
        },
      },
      JobPending: {
        type: "object",
        required: ["job_id", "kind", "status", "created_at"],
        properties: {
          job_id: { type: "string", format: "uuid" },
          kind: { type: "string", enum: ["video", "frame"] },
          status: { type: "string", enum: ["pending"] },
          created_at: { type: "integer", description: "Unix milliseconds." },
        },
      },
      JobReady: {
        type: "object",
        required: ["job_id", "kind", "status", "url", "mime"],
        properties: {
          job_id: { type: "string", format: "uuid" },
          kind: { type: "string", enum: ["video", "frame"] },
          status: { type: "string", enum: ["ready"] },
          url: {
            type: "string",
            description:
              "Relative URL on this host pointing at the rendered file. Prepend the API base.",
          },
          mime: { type: "string", enum: ["image/png", "video/mp4"] },
          created_at: { type: "integer" },
          completed_at: { type: "integer" },
        },
      },
      JobError: {
        type: "object",
        required: ["job_id", "kind", "status", "message"],
        properties: {
          job_id: { type: "string", format: "uuid" },
          kind: { type: "string", enum: ["video", "frame"] },
          status: { type: "string", enum: ["error"] },
          message: {
            type: "string",
            description: "Human-readable error. CLI diagnostic prefixes (PAR…, LWR…, …) surface here verbatim when applicable.",
          },
          code: { type: "string", nullable: true },
          created_at: { type: "integer" },
          completed_at: { type: "integer" },
        },
      },
      ErrorEnvelope: {
        type: "object",
        required: ["error"],
        properties: {
          error: { type: "string" },
          code: { type: "string" },
        },
      },
    },
    responses: {
      BadRequest: {
        description: "Malformed request — missing `source`, bad JSON, or oversize body.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorEnvelope" },
          },
        },
      },
      NotFound: {
        description: "Job id or output filename not found.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorEnvelope" },
          },
        },
      },
    },
  },
} as const;

const JSON_HEADERS = { "content-type": "application/json" };

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function err(status: number, message: string, code?: string): Response {
  return json(code ? { error: message, code } : { error: message }, status);
}

interface JobBody {
  source?: string;
  params?: Record<string, unknown>;
  // Mapping of friendly path-in-source ("/earth.png") to the
  // R2 staging key returned by POST /v1/assets ("asset_<uuid>").
  assets?: Record<string, string>;
}

async function readJobBody(request: Request): Promise<JobBody | { error: string }> {
  let body: JobBody;
  try {
    body = (await request.json()) as JobBody;
  } catch (e) {
    return { error: `bad json: ${e instanceof Error ? e.message : String(e)}` };
  }
  if (typeof body?.source !== "string" || body.source.length === 0) {
    return { error: "missing 'source'" };
  }
  // Cap source size to keep D1 / log volume sane. Tighten once we
  // have a real measurement of typical sources.
  if (body.source.length > 64 * 1024) {
    return { error: "'source' exceeds 64 KiB" };
  }
  return body;
}

async function handleEnqueue(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  kind: "video" | "frame",
): Promise<Response> {
  if (request.method !== "POST") return err(405, "method not allowed");

  const body = await readJobBody(request);
  if ("error" in body) return err(400, body.error);

  const id = crypto.randomUUID();
  const params_json = JSON.stringify(body.params ?? {});
  const assets = body.assets ?? {};
  const now = Date.now();

  await env.DB.prepare(
    `INSERT INTO jobs (id, kind, source, params_json, status, created_at)
     VALUES (?, ?, ?, ?, 'pending', ?)`,
  )
    .bind(id, kind, body.source, params_json, now)
    .run();

  // Hand the work off to the singleton RenderRunner DO via an
  // RPC call. The DO method returns immediately because it
  // schedules the actual render inside its *own* waitUntil; the
  // Worker request's lifecycle ends with the 202 below. This
  // dodges the ~30 s cap on Worker-level waitUntil that was
  // cancelling longer videos before they could upload to R2.
  const stub = env.RENDER_RUNNER.get(env.RENDER_RUNNER.idFromName("singleton"));
  ctx.waitUntil(stub.runJob(id, kind, body.source!, body.params ?? {}, assets));

  return json({ job_id: id, status: "pending", kind }, 202);
}

// The actual render orchestration lives on the RenderRunner DO
// (see `executeJob` above). The Worker just enqueues a row and
// kicks the DO; this keeps the long-running work out of the
// Worker request's lifetime.

async function handleJobGet(env: Env, id: string): Promise<Response> {
  const row = await env.DB.prepare(
    `SELECT id, kind, status, output_key, output_mime, error_code, error_message,
            created_at, completed_at
       FROM jobs WHERE id = ?`,
  )
    .bind(id)
    .first<{
      id: string;
      kind: string;
      status: string;
      output_key: string | null;
      output_mime: string | null;
      error_code: string | null;
      error_message: string | null;
      created_at: number;
      completed_at: number | null;
    }>();

  if (!row) return err(404, "not_found");

  if (row.status === "ready") {
    // output_key looks like 'outputs/<uuid>.<ext>'; surface only the
    // filename portion in the URL.
    const filename = row.output_key?.split("/").pop() ?? "";
    return json({
      job_id: row.id,
      kind: row.kind,
      status: "ready",
      url: `/v1/outputs/${filename}`,
      mime: row.output_mime,
      created_at: row.created_at,
      completed_at: row.completed_at,
    });
  }

  if (row.status === "error") {
    return json(
      {
        job_id: row.id,
        kind: row.kind,
        status: "error",
        message: row.error_message,
        code: row.error_code,
        created_at: row.created_at,
        completed_at: row.completed_at,
      },
      500,
    );
  }

  return json({
    job_id: row.id,
    kind: row.kind,
    status: row.status,
    created_at: row.created_at,
  });
}

async function handleOutput(env: Env, filename: string): Promise<Response> {
  if (!/^[A-Za-z0-9._-]+$/.test(filename)) return err(400, "bad filename");
  const obj = await env.R2.get(`outputs/${filename}`);
  if (!obj) return err(404, "not_found");
  return new Response(obj.body, {
    headers: {
      "content-type": obj.httpMetadata?.contentType ?? "application/octet-stream",
      "content-length": String(obj.size),
      "cache-control": "public, max-age=86400",
    },
  });
}

// Synchronous one-shot — kept around for smoke-testing the
// container path without involving D1 or R2. Returns the PNG
// inline like the original /test did.
async function handleSyncTest(env: Env): Promise<Response> {
  const container = getContainer(env.RENDER_RUNNER, "singleton");
  const rendered = await container.fetch("http://container/", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ jobId: "test", source: TEST_SOURCE, kind: "frame" }),
  });
  return new Response(rendered.body, {
    status: rendered.status,
    headers: rendered.headers,
  });
}

// Allow the docs site (playground page) + arbitrary tools to call
// the API from a browser. The endpoints don't read cookies and
// don't do anything auth-sensitive in v0, so wide-open CORS is
// fine. Once auth/rate-limit ladders land, narrow this to known
// origins.
const CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type",
  "access-control-max-age": "86400",
};

function withCors(res: Response): Response {
  for (const [k, v] of Object.entries(CORS_HEADERS)) res.headers.set(k, v);
  return res;
}

// Multipart upload — every part with a filename becomes an
// R2 staging entry under `staging/asset_<uuid>`. Response maps
// the original filename to the staging key, e.g.
//   { assets: { "earth.png": "asset_<uuid>", "starry.jpg": "asset_<uuid>" } }
// The caller threads those keys into POST /v1/render's `assets`
// field. Files older than 24h get swept by the cron worker
// (TODO).
async function handleAssets(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") return err(405, "method not allowed");

  let form: FormData;
  try {
    form = await request.formData();
  } catch (e) {
    return err(400, `multipart parse failed: ${e instanceof Error ? e.message : String(e)}`);
  }

  // Per-upload count + size caps. Conservative until we have
  // real numbers; lift once we see actual usage.
  const MAX_FILES = 10;
  const MAX_SIZE = 25 * 1024 * 1024; // 25 MiB each

  const out: Record<string, string> = {};
  let count = 0;

  for (const [, value] of form) {
    // `value` is FormDataEntryValue (string | File-like). In Workers
    // the File-like has `.name`, `.size`, `.arrayBuffer()` — duck-type
    // it instead of `instanceof File` (the types don't line up).
    if (typeof value === "string") continue;
    const file = value as { name: string; size: number; type?: string; arrayBuffer: () => Promise<ArrayBuffer> };
    if (typeof file.arrayBuffer !== "function") continue;
    if (count++ >= MAX_FILES) return err(400, `too many files (max ${MAX_FILES})`);
    if (file.size > MAX_SIZE) {
      return err(400, `'${file.name}' exceeds ${MAX_SIZE / 1024 / 1024} MiB cap`);
    }
    const key = `asset_${crypto.randomUUID().replace(/-/g, "")}`;
    const bytes = await file.arrayBuffer();
    await env.R2.put(`staging/${key}`, bytes, {
      httpMetadata: { contentType: file.type || "application/octet-stream" },
      customMetadata: { original_name: file.name },
    });
    out[file.name] = key;
  }

  if (count === 0) return err(400, "no files in upload");
  return json({ assets: out });
}

async function route(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/v1/assets") return handleAssets(request, env);
    if (path === "/v1/render") return handleEnqueue(request, env, ctx, "video");
    if (path === "/v1/frame")  return handleEnqueue(request, env, ctx, "frame");

    if (path.startsWith("/v1/jobs/")) {
      const id = path.slice("/v1/jobs/".length);
      if (!id) return err(400, "missing job id");
      return handleJobGet(env, id);
    }

    if (path.startsWith("/v1/outputs/")) {
      return handleOutput(env, path.slice("/v1/outputs/".length));
    }

    if (path === "/openapi.json") {
      // Public spec — allow cross-origin reads so browser tools
      // (Scalar, Stoplight Elements, Postman web) can fetch it.
      return new Response(JSON.stringify(OPENAPI_SPEC), {
        headers: {
          "content-type": "application/json",
          "access-control-allow-origin": "*",
          "cache-control": "public, max-age=300",
        },
      });
    }
    if (path === "/test")    return handleSyncTest(env);
    if (path === "/healthz") return new Response("ok\n", { headers: { "content-type": "text/plain" } });

    // Root "/" gets the help text. Any other unknown path is a 404
    // — returning 200 with help text would let a bad client URL
    // silently land on the help page, which then trips up
    // `await response.json()` parsers with the cryptic
    // "Unexpected token 'c', 'cmotion ap'…" error.
    if (path === "/" || path === "") {
      return new Response(
        "cmotion api\n\n" +
          "POST /v1/render          { source, params? }  →  202 { job_id }\n" +
          "POST /v1/frame           { source, params? }  →  202 { job_id }\n" +
          "GET  /v1/jobs/<id>                              →  status + url when ready\n" +
          "GET  /v1/outputs/<file>                          →  streams the render\n" +
          "GET  /openapi.json                               →  OpenAPI 3.1 schema\n" +
          "GET  /test                                       →  synchronous smoke test\n" +
          "GET  /healthz                                    →  liveness\n",
        { headers: { "content-type": "text/plain" } },
      );
    }
    return err(404, `unknown route: ${path}`);
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // CORS preflight — answered before any routing.
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    const res = await route(request, env, ctx);
    return withCors(res);
  },
} satisfies ExportedHandler<Env>;
