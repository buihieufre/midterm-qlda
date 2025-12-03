import sql from "../config/database";

/**
 * Utility để đảm bảo bảng toanha tồn tại
 * Tự động tạo bảng nếu chưa có
 */
export async function ensureToaNhaTableExists(): Promise<void> {
  try {
    // Kiểm tra xem bảng đã tồn tại chưa
    const checkTable = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'toanha'
      )
    `;

    if (checkTable[0]?.exists) {
      // Bảng đã tồn tại
      return;
    }

    // Tạo bảng nếu chưa tồn tại
    await sql`
      CREATE TABLE toanha (
        "maViTri" SERIAL PRIMARY KEY,
        "toadoX" NUMERIC(10, 2) NOT NULL,
        "toadoY" NUMERIC(10, 2) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Tạo function để tự động update updated_at
    await sql`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ language 'plpgsql'
    `;

    // Tạo trigger
    await sql`
      DROP TRIGGER IF EXISTS update_toanha_updated_at ON toanha
    `;

    await sql`
      CREATE TRIGGER update_toanha_updated_at
          BEFORE UPDATE ON toanha
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column()
    `;

    console.log("✅ Bảng toanha đã được tạo tự động");
  } catch (error: any) {
    console.error("❌ Lỗi khi tạo bảng toanha:", error);
    throw error;
  }
}

/**
 * Kiểm tra và xử lý lỗi "relation does not exist"
 * Tự động tạo bảng nếu cần và retry operation
 */
export async function handleTableNotExistsError<T>(
  operation: () => Promise<T>,
  retries: number = 1
): Promise<T> {
  try {
    return await operation();
  } catch (error: any) {
    // Kiểm tra nếu lỗi là "relation does not exist"
    const isTableNotExistsError =
      error?.message?.includes("does not exist") ||
      error?.message?.includes("relation") ||
      error?.code === "42P01"; // PostgreSQL error code for "undefined_table"

    if (isTableNotExistsError && retries > 0) {
      console.log("⚠️ Bảng toanha chưa tồn tại, đang tạo tự động...");

      // Tạo bảng
      await ensureToaNhaTableExists();

      // Retry operation
      return await operation();
    }

    // Nếu không phải lỗi table not exists hoặc đã hết retries, throw error
    throw error;
  }
}
