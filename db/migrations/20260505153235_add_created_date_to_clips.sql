-- migrate:up
ALTER TABLE clips
   ADD created TIMESTAMP DEFAULT now();


-- migrate:down

