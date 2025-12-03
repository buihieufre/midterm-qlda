/**
 * Domain Model: ToaNha
 * Đại diện cho thực thể Tòa nhà trong domain layer
 */
class ToaNha {
  maViTri: number | null;
  toadoX: number;
  toadoY: number;

  constructor(maViTri: number | null, toadoX: number, toadoY: number) {
    this.maViTri = maViTri;
    this.toadoX = toadoX;
    this.toadoY = toadoY;
  }

  /**
   * Validate dữ liệu của ToaNha
   */
  validate() {
    const errors: string[] = [];

    if (this.toadoX === undefined || this.toadoX === null) {
      errors.push("Tọa độ X không được để trống");
    } else if (isNaN(this.toadoX)) {
      errors.push("Tọa độ X phải là số");
    }

    if (this.toadoY === undefined || this.toadoY === null) {
      errors.push("Tọa độ Y không được để trống");
    } else if (isNaN(this.toadoY)) {
      errors.push("Tọa độ Y phải là số");
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Convert to plain object
   */
  toJSON() {
    return {
      maViTri: this.maViTri,
      toadoX: this.toadoX,
      toadoY: this.toadoY,
    };
  }

  /**
   * Create from plain object
   */
  static fromJSON(data: any) {
    return new ToaNha(data.maViTri, data.toadoX, data.toadoY);
  }
}

export default ToaNha;
