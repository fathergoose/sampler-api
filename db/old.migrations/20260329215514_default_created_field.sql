-- migrate:up
ALTER TABLE samples ADD COLUMN created TIMESTAMP DEFAULT now();

-- migrate:down

