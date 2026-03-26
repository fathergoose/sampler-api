-- migrate:up
CREATE TABLE sample_files (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  path VARCHAR(255) UNIQUE
);


-- migrate:down

