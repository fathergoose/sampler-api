-- migrate:up
CREATE TABLE samples (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  path TEXT UNIQUE NOT NULL,
  source TEXT NOT NULL,
  created TIMESTAMP DEFAULT now()
);


-- migrate:down

