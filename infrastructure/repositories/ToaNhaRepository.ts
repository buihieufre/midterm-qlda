import ToaNha from "../../domain/models/ToaNha";
import { IToaNhaRepository } from "../../domain/repository/IToaNhaRepository";
import sql from "../config/database";
import { handleTableNotExistsError } from "../database/migration";

/**
 * Repository Implementation: ToaNhaRepository
 * Infrastructure Layer - Implementation cụ thể của IToaNhaRepository
 * Chịu trách nhiệm tương tác với database thông qua Neon Serverless
 * Implement các phương thức CRUD sử dụng raw SQL
 * Tuân theo Dependency Inversion Principle
 */
class ToaNhaRepository implements IToaNhaRepository {
  /**
   * Tạo mới ToaNha trong database
   * Tự động tạo bảng nếu chưa tồn tại
   */
  async create(toaNha: ToaNha) {
    return handleTableNotExistsError(async () => {
      const result = await sql`
        INSERT INTO toanha ("toadoX", "toadoY", created_at, updated_at)
        VALUES (${toaNha.toadoX}, ${toaNha.toadoY}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING "maViTri", "toadoX", "toadoY", created_at, updated_at
      `;

      if (result.length === 0) {
        throw new Error("Failed to create toa nha");
      }

      return ToaNha.fromJSON({
        maViTri: result[0].maViTri,
        toadoX: result[0].toadoX,
        toadoY: result[0].toadoY,
      });
    });
  }

  /**
   * Lấy tất cả ToaNha
   * Tự động tạo bảng nếu chưa tồn tại
   */
  async findAll() {
    return handleTableNotExistsError(async () => {
      const rows = await sql`
        SELECT "maViTri", "toadoX", "toadoY", created_at, updated_at
        FROM toanha
        ORDER BY "maViTri" DESC
      `;

      return rows.map((row) =>
        ToaNha.fromJSON({
          maViTri: row.maViTri,
          toadoX: row.toadoX,
          toadoY: row.toadoY,
        })
      );
    });
  }

  /**
   * Lấy ToaNha theo maViTri
   * Tự động tạo bảng nếu chưa tồn tại
   */
  async findByMaViTri(maViTri: number) {
    return handleTableNotExistsError(async () => {
      const result = await sql`
        SELECT "maViTri", "toadoX", "toadoY", created_at, updated_at
        FROM toanha
        WHERE "maViTri" = ${maViTri}
      `;

      if (result.length === 0) {
        return null;
      }

      return ToaNha.fromJSON({
        maViTri: result[0].maViTri,
        toadoX: result[0].toadoX,
        toadoY: result[0].toadoY,
      });
    });
  }

  /**
   * Cập nhật ToaNha
   * Tự động tạo bảng nếu chưa tồn tại
   */
  async update(toaNha: ToaNha) {
    return handleTableNotExistsError(async () => {
      const result = await sql`
        UPDATE toanha
        SET "toadoX" = ${toaNha.toadoX}, "toadoY" = ${toaNha.toadoY}, updated_at = CURRENT_TIMESTAMP
        WHERE "maViTri" = ${toaNha.maViTri}
        RETURNING "maViTri", "toadoX", "toadoY", created_at, updated_at
      `;

      if (result.length === 0) {
        throw new Error("ToaNha not found");
      }

      return ToaNha.fromJSON({
        maViTri: result[0].maViTri,
        toadoX: result[0].toadoX,
        toadoY: result[0].toadoY,
      });
    });
  }

  /**
   * Xóa ToaNha
   * Tự động tạo bảng nếu chưa tồn tại
   */
  async delete(maViTri: number) {
    return handleTableNotExistsError(async () => {
      await sql`
        DELETE FROM toanha
        WHERE "maViTri" = ${maViTri}
      `;

      return true;
    });
  }
}

export default ToaNhaRepository;
