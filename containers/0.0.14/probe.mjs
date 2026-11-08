// Minimal probe — bare HTTP server, no Playwright, no fs access
// to viewer/, nothing that could fail at startup. If this won't
// boot on Cloudflare Containers, the problem is the image/runtime
// (not our render.mjs). If it does boot, the problem is something
// render.mjs imports or does on startup.

import http from "node:http";

console.log("[probe] starting");

const port = parseInt(process.env.PORT ?? "8080", 10);

http.createServer((req, res) => {
  console.log(`[probe] ${req.method} ${req.url}`);
  res.writeHead(200, { "content-type": "text/plain" });
  res.end(`probe alive · pid=${process.pid} · node=${process.version}\n`);
}).listen(port, "0.0.0.0", () => {
  console.log(`[probe] listening on 0.0.0.0:${port}`);
});
