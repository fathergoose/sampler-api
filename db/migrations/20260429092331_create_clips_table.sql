-- migrate:up
CREATE TABLE clips (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    start_at    DECIMAL(10, 6) NOT NULL,
    end_at      DECIMAL(10, 6) NOT NULL,
    gain        DECIMAL(6, 4) NOT NULL DEFAULT 1.0,
    sample_id   INTEGER REFERENCES samples(id) ON DELETE SET NULL
);

-- migrate:down

