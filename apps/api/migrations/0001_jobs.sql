-- D1 schema for the cmotion render API.
--
-- A `jobs` row is created the moment a client POSTs /v1/render or
-- /v1/frame. The Worker kicks off the container render in the
-- background (ctx.waitUntil); the container result is uploaded to
-- R2 and this row is updated to `status='ready'` with the R2
-- output key. The polling endpoint GET /v1/jobs/:id reads from
-- here.

CREATE TABLE jobs (
  id            TEXT PRIMARY KEY,
  kind          TEXT NOT NULL,        -- 'video' | 'frame'
  source        TEXT NOT NULL,        -- raw .cm source
  params_json   TEXT NOT NULL DEFAULT '{}',
  status        TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'ready' | 'error'
  output_key    TEXT,                 -- R2 key (e.g. 'outputs/<uuid>.mp4'); null until ready
  output_mime   TEXT,                 -- e.g. 'image/png', 'video/mp4'
  error_code    TEXT,                 -- reserved for upstream diagnostic codes (PAR100…)
  error_message TEXT,
  created_at    INTEGER NOT NULL,     -- unix ms
  completed_at  INTEGER
);

CREATE INDEX idx_jobs_status_created ON jobs(status, created_at);
