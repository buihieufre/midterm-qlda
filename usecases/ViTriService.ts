import ViTri from "../domain/models/ViTri";
import type { IViTriRepository } from "../domain/repository/IViTriRepository";

/**
 * Use Case: ViTriService
 * Chứa các business logic cho ViTri
 * Không phụ thuộc vào infrastructure (database, framework)
 * Sử dụng Dependency Inversion Principle
 */
class ViTriService {
  private viTriRepository: IViTriRepository;

  constructor(viTriRepository: IViTriRepository) {
    this.viTriRepository = viTriRepository;
  }

  /**
   * Tạo mới ViTri
   */
  async createViTri(toadoX: number, toadoY: number) {
    const viTri = new ViTri(null, toadoX, toadoY);

    // Validate
    const validation = viTri.validate();
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    // Save to repository
    const savedViTri = await this.viTriRepository.create(viTri);
    return savedViTri;
  }

  /**
   * Lấy tất cả ViTri
   */
  async getAllViTri() {
    return await this.viTriRepository.findAll();
  }

  /**
   * Lấy ViTri theo maViTri
   */
  async getViTriByMaViTri(maViTri: number) {
    if (!maViTri) {
      throw new Error("Mã vị trí không được để trống");
    }
    return await this.viTriRepository.findByMaViTri(maViTri);
  }

  /**
   * Cập nhật ViTri
   */
  async updateViTri(maViTri: number, toadoX: number, toadoY: number) {
    if (!maViTri) {
      throw new Error("Mã vị trí không được để trống");
    }

    // Check if exists
    const existing = await this.viTriRepository.findByMaViTri(maViTri);
    if (!existing) {
      throw new Error("Vị trí không tồn tại");
    }

    const viTri = new ViTri(maViTri, toadoX, toadoY);

    // Validate
    const validation = viTri.validate();
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    // Update
    const updatedViTri = await this.viTriRepository.update(viTri);
    return updatedViTri;
  }

  /**
   * Xóa ViTri
   */
  async deleteViTri(maViTri: number) {
    if (!maViTri) {
      throw new Error("Mã vị trí không được để trống");
    }

    // Check if exists
    const existing = await this.viTriRepository.findByMaViTri(maViTri);
    if (!existing) {
      throw new Error("Vị trí không tồn tại");
    }

    await this.viTriRepository.delete(maViTri);
    return true;
  }
}

export default ViTriService;

