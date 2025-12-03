import ViTri from "../../domain/models/ViTri";
import { IViTriRepository } from "../../domain/repository/IViTriRepository";
import sql from "../config/database";

/**
 * Repository Implementation: ViTriRepository
 * Infrastructure Layer - Implementation cụ thể của IViTriRepository
 * Chịu trách nhiệm tương tác với database thông qua Neon Serverless
 * Implement các phương thức CRUD sử dụng raw SQL
 * Tuân theo Dependency Inversion Principle
 */
class ViTriRepository implements IViTriRepository {
  /**
   * Tạo mới ViTri trong database
   */
  async create(viTri: ViTri) {
    const result = await sql`
      INSERT INTO vitri ("toadoX", "toadoY", created_at, updated_at)
      VALUES (${viTri.toadoX}, ${viTri.toadoY}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING "maViTri", "toadoX", "toadoY", created_at, updated_at
    `;

    if (result.length === 0) {
      throw new Error("Failed to create vi tri");
    }

    return ViTri.fromJSON({
      maViTri: result[0].maViTri,
      toadoX: result[0].toadoX,
      toadoY: result[0].toadoY,
    });
  }

  /**
   * Lấy tất cả ViTri
   */
  async findAll() {
    const rows = await sql`
      SELECT "maViTri", "toadoX", "toadoY", created_at, updated_at
      FROM vitri
      ORDER BY "maViTri" DESC
    `;

    return rows.map((row) =>
      ViTri.fromJSON({
        maViTri: row.maViTri,
        toadoX: row.toadoX,
        toadoY: row.toadoY,
      })
    );
  }

  /**
   * Lấy ViTri theo maViTri
   */
  async findByMaViTri(maViTri: number) {
    const result = await sql`
      SELECT "maViTri", "toadoX", "toadoY", created_at, updated_at
      FROM vitri
      WHERE "maViTri" = ${maViTri}
    `;

    if (result.length === 0) {
      return null;
    }

    return ViTri.fromJSON({
      maViTri: result[0].maViTri,
      toadoX: result[0].toadoX,
      toadoY: result[0].toadoY,
    });
  }

  /**
   * Cập nhật ViTri
   */
  async update(viTri: ViTri) {
    const result = await sql`
      UPDATE vitri
      SET "toadoX" = ${viTri.toadoX}, "toadoY" = ${viTri.toadoY}, updated_at = CURRENT_TIMESTAMP
      WHERE "maViTri" = ${viTri.maViTri}
      RETURNING "maViTri", "toadoX", "toadoY", created_at, updated_at
    `;

    if (result.length === 0) {
      throw new Error("ViTri not found");
    }

    return ViTri.fromJSON({
      maViTri: result[0].maViTri,
      toadoX: result[0].toadoX,
      toadoY: result[0].toadoY,
    });
  }

  /**
   * Xóa ViTri
   */
  async delete(maViTri: number) {
    await sql`
      DELETE FROM vitri
      WHERE "maViTri" = ${maViTri}
    `;

    return true;
  }
}

export default ViTriRepository;

