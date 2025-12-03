-- Script tạo bảng toanha
-- Chạy script này trong Neon SQL Editor

CREATE TABLE IF NOT EXISTS toanha (
  "maViTri" SERIAL PRIMARY KEY,
  "toadoX" NUMERIC(10, 2) NOT NULL,
  "toadoY" NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tạo function để tự động update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Tạo trigger để tự động update updated_at
DROP TRIGGER IF EXISTS update_toanha_updated_at ON toanha;
CREATE TRIGGER update_toanha_updated_at
    BEFORE UPDATE ON toanha
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

