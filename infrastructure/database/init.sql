-- Tạo bảng toanha cho PostgreSQL (Neon)
-- Chạy script này trong Neon SQL Editor hoặc psql

-- Xóa bảng cũ nếu tồn tại (cẩn thận: sẽ mất dữ liệu)
-- DROP TABLE IF EXISTS toanha CASCADE;

CREATE TABLE IF NOT EXISTS toanha (
  "maViTri" SERIAL PRIMARY KEY,
  "toadoX" NUMERIC(10, 2) NOT NULL,
  "toadoY" NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Sửa bảng nếu đã tồn tại mà không có DEFAULT
ALTER TABLE toanha 
  ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP,
  ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP;

-- Đảm bảo các cột không null
ALTER TABLE toanha 
  ALTER COLUMN created_at SET NOT NULL,
  ALTER COLUMN updated_at SET NOT NULL;

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

-- Insert dữ liệu mẫu
INSERT INTO toanha ("toadoX", "toadoY") VALUES
(10.5, 20.3),
(15.2, 25.7),
(8.9, 12.4)
ON CONFLICT DO NOTHING;
