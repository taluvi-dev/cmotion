// cmotion hosted render API — Worker entry point.
//
// At this stage we expose a single route, `GET /test`, that posts
// a hardcoded `.cm` source to the bound render container and pipes
// the rendered PNG back to the client. It exists to prove that the
// Containers binding + the pushed `cmotion-runner:0.0.1` image
// work end-to-end inside Cloudflare's environment, before we
// build out the public Hono API (`POST /v1/render` etc.) on top
// of a known-good dispatch path.

import { Container, getContainer } from "@cloudflare/containers";

type Env = {
  RENDER_RUNNER: DurableObjectNamespace<RenderRunner>;
};

// One Durable Object class owns the container lifecycle. The
// Containers SDK handles start/stop/sleep — we just declare the
// port the container listens on and how long it sticks around
// after the last request.
export class RenderRunner extends Container<Env> {
  // render.mjs listens on $PORT, which CF sets to defaultPort.
  defaultPort = 8080;
  // Idle timeout — after 2 minutes of no incoming requests the
  // container stops, so we don't pay for hours of Chromium idle.
  sleepAfter = "2m";
}

// Hardcoded test scene — a dark backdrop with one pink rect. Same
// shape as the local docker-run smoke test from earlier in the
// runner build-up. Small + fast (frame mode, no ffmpeg) so the
// /test route returns in ~1-2 s of cold-boot + render.
const TEST_SOURCE = `runner "0.0.1";

use std.shapes.*;

scene quick() -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: oklch(0.10, 0.04, 280));
  let fg = rect(width: 300px, height: 300px, fill: #ff3399);
  compose [bg, fg]
}
`;

async function handleTest(env: Env): Promise<Response> {
  const container = getContainer(env.RENDER_RUNNER, "singleton");
  try {
    console.log("[test] calling container.fetch");
    const rendered = await container.fetch("http://container/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jobId: "test",
        source: TEST_SOURCE,
        kind: "frame",
      }),
    });
    console.log(`[test] container response: ${rendered.status}`);
    return new Response(rendered.body, {
      status: rendered.status,
      headers: rendered.headers,
    });
  } catch (e: unknown) {
    const err = e instanceof Error ? `${e.name}: ${e.message}\n${e.stack ?? ""}` : String(e);
    console.error(`[test] threw: ${err}`);
    return new Response(`worker threw: ${err}`, { status: 500 });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/test") {
      return handleTest(env);
    }
    if (url.pathname === "/healthz") {
      return new Response("ok\n", { headers: { "content-type": "text/plain" } });
    }

    return new Response(
      "cmotion api · scaffolding\n\n" +
        "GET  /healthz   liveness\n" +
        "GET  /test      runs a hardcoded scene through the container, returns a PNG\n",
      { headers: { "content-type": "text/plain" } },
    );
  },
} satisfies ExportedHandler<Env>;
