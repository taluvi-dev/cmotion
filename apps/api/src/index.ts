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
}

const TEST_SOURCE = `runner "0.0.1";

use std.shapes.*;

scene quick() -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: oklch(0.10, 0.04, 280));
  let fg = rect(width: 300px, height: 300px, fill: #ff3399);
  compose [bg, fg]
}
`;

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
  const now = Date.now();

  await env.DB.prepare(
    `INSERT INTO jobs (id, kind, source, params_json, status, created_at)
     VALUES (?, ?, ?, ?, 'pending', ?)`,
  )
    .bind(id, kind, body.source, params_json, now)
    .run();

  ctx.waitUntil(runJob(id, kind, body.source!, body.params ?? {}, env));

  return json({ job_id: id, status: "pending", kind }, 202);
}

async function runJob(
  id: string,
  kind: "video" | "frame",
  source: string,
  params: Record<string, unknown>,
  env: Env,
): Promise<void> {
  try {
    const container = getContainer(env.RENDER_RUNNER, "singleton");
    const containerRes = await container.fetch("http://container/", {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ jobId: id, source, kind, params }),
    });

    if (!containerRes.ok) {
      const errBody = await containerRes.text();
      await markError(env, id, errBody.slice(0, 500));
      return;
    }

    const ext = kind === "frame" ? "png" : "mp4";
    const mime = kind === "frame" ? "image/png" : "video/mp4";
    const key = `outputs/${id}.${ext}`;

    const bytes = await containerRes.arrayBuffer();
    await env.R2.put(key, bytes, {
      httpMetadata: { contentType: mime },
    });

    await env.DB.prepare(
      `UPDATE jobs
       SET status='ready', output_key=?, output_mime=?, completed_at=?
       WHERE id=?`,
    )
      .bind(key, mime, Date.now(), id)
      .run();
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    await markError(env, id, message.slice(0, 500));
  }
}

async function markError(env: Env, id: string, message: string): Promise<void> {
  await env.DB.prepare(
    `UPDATE jobs
     SET status='error', error_message=?, completed_at=?
     WHERE id=?`,
  )
    .bind(message, Date.now(), id)
    .run();
}

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

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

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

    if (path === "/test")    return handleSyncTest(env);
    if (path === "/healthz") return new Response("ok\n", { headers: { "content-type": "text/plain" } });

    return new Response(
      "cmotion api\n\n" +
        "POST /v1/render          { source, params? }  →  202 { job_id }\n" +
        "POST /v1/frame           { source, params? }  →  202 { job_id }\n" +
        "GET  /v1/jobs/<id>                              →  status + url when ready\n" +
        "GET  /v1/outputs/<file>                          →  streams the render\n" +
        "GET  /test                                       →  synchronous smoke test\n" +
        "GET  /healthz                                    →  liveness\n",
      { headers: { "content-type": "text/plain" } },
    );
  },
} satisfies ExportedHandler<Env>;
