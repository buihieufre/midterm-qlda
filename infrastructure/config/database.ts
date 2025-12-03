import { neon } from "@neondatabase/serverless";

/**
 * Database Connection Configuration
 * Kết nối đến Neon PostgreSQL database
 * Sử dụng @neondatabase/serverless cho serverless environments
 */
// Sử dụng POSTGRES_URL, fallback sang DATABASE_URL nếu không có
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "POSTGRES_URL or DATABASE_URL environment variable is not set"
  );
}

// Create Neon database client
const sql = neon(connectionString);

export default sql;
