import ToaNha from "../models/ToaNha";

/**
 * Interface cho Repository (Domain Layer)
 * Định nghĩa contract cho repository, không phụ thuộc vào implementation
 * Tuân theo Dependency Inversion Principle
 */
export interface IToaNhaRepository {
  create(toaNha: ToaNha): Promise<ToaNha>;
  findAll(): Promise<ToaNha[]>;
  findByMaViTri(maViTri: number): Promise<ToaNha | null>;
  update(toaNha: ToaNha): Promise<ToaNha>;
  delete(maViTri: number): Promise<boolean>;
}

