-- migrate:up
ALTER TABLE samples ADD COLUMN created DATE;


-- migrate:down

