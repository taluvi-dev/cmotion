-- D1 schema for uploaded render assets.
--
-- Every file accepted by POST /v1/assets gets a row here alongside its
-- R2 staging object (`staging/<key>`). The table is the ledger a sweep
-- and a per-caller quota read from: R2 alone can't be enumerated
-- cheaply or attributed to a client, so we track uploads here.
--
-- Retention: a nightly cron deletes rows (and their R2 objects) older
-- than the retention window so a few users abusing the free tier can't
-- fill the bucket. `client_ip` backs a coarse per-IP upload quota.
--
-- External-URL assets are NOT recorded — they're fetched fresh at
-- render time and never persisted, so only uploads land here.

CREATE TABLE assets (
  key           TEXT PRIMARY KEY,     -- R2 staging key, e.g. 'asset_<uuid>'
  original_name TEXT NOT NULL,        -- filename from the upload
  size          INTEGER NOT NULL,     -- bytes
  content_type  TEXT,                 -- e.g. 'image/png'
  client_ip     TEXT,                 -- CF-Connecting-IP at upload (quota/abuse)
  created_at    INTEGER NOT NULL      -- unix ms
);

CREATE INDEX idx_assets_created ON assets(created_at);
CREATE INDEX idx_assets_ip_created ON assets(client_ip, created_at);
