CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL UNIQUE,
  submitted_at TIMESTAMPTZ NOT NULL,
  form_data JSONB NOT NULL
);

CREATE INDEX IF NOT EXISTS registrations_submitted_at_idx
  ON registrations (submitted_at DESC);
