-- Schema for digital-queue-system (Postgres)
CREATE TABLE IF NOT EXISTS counters (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  service TEXT,
  name TEXT,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'waiting',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  served_at TIMESTAMP WITH TIME ZONE,
  counter TEXT
);
