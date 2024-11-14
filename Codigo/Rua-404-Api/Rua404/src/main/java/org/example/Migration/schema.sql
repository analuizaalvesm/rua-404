ALTER TABLE customer
ALTER COLUMN address TYPE bigint USING address::bigint;
