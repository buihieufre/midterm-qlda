import { NextResponse } from 'next/server';
import sql from '@/infrastructure/config/database';

/**
 * POST /api/migrate
 * Tạo bảng toanha trong database
 * Chỉ chạy một lần khi setup database
 */
export async function POST() {
  try {
    // Tạo bảng toanha
    await sql`
      CREATE TABLE IF NOT EXISTS toanha (
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

    return NextResponse.json({
      success: true,
      message: 'Bảng toanha đã được tạo thành công'
    });
  } catch (error: any) {
    console.error('Error creating table:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Lỗi khi tạo bảng',
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

