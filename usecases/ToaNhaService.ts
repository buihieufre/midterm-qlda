import ToaNha from "../domain/models/ToaNha";
import type { IToaNhaRepository } from "../domain/repository/IToaNhaRepository";

/**
 * Use Case: ToaNhaService
 * Chứa các business logic cho ToaNha
 * Không phụ thuộc vào infrastructure (database, framework)
 * Sử dụng Dependency Inversion Principle
 */
class ToaNhaService {
  private toaNhaRepository: IToaNhaRepository;

  constructor(toaNhaRepository: IToaNhaRepository) {
    this.toaNhaRepository = toaNhaRepository;
  }

  /**
   * Tạo mới ToaNha
   */
  async createToaNha(toadoX: number, toadoY: number) {
    const toaNha = new ToaNha(null, toadoX, toadoY);

    // Validate
    const validation = toaNha.validate();
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    // Save to repository
    const savedToaNha = await this.toaNhaRepository.create(toaNha);
    return savedToaNha;
  }

  /**
   * Lấy tất cả ToaNha
   */
  async getAllToaNha() {
    return await this.toaNhaRepository.findAll();
  }

  /**
   * Lấy ToaNha theo maViTri
   */
  async getToaNhaByMaViTri(maViTri: number) {
    if (!maViTri) {
      throw new Error("Mã vị trí không được để trống");
    }
    return await this.toaNhaRepository.findByMaViTri(maViTri);
  }

  /**
   * Cập nhật ToaNha
   */
  async updateToaNha(maViTri: number, toadoX: number, toadoY: number) {
    if (!maViTri) {
      throw new Error("Mã vị trí không được để trống");
    }

    // Check if exists
    const existing = await this.toaNhaRepository.findByMaViTri(maViTri);
    if (!existing) {
      throw new Error("Tòa nhà không tồn tại");
    }

    const toaNha = new ToaNha(maViTri, toadoX, toadoY);

    // Validate
    const validation = toaNha.validate();
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    // Update
    const updatedToaNha = await this.toaNhaRepository.update(toaNha);
    return updatedToaNha;
  }

  /**
   * Xóa ToaNha
   */
  async deleteToaNha(maViTri: number) {
    if (!maViTri) {
      throw new Error("Mã vị trí không được để trống");
    }

    // Check if exists
    const existing = await this.toaNhaRepository.findByMaViTri(maViTri);
    if (!existing) {
      throw new Error("Tòa nhà không tồn tại");
    }

    await this.toaNhaRepository.delete(maViTri);
    return true;
  }
}

export default ToaNhaService;

