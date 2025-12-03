"use client";

import React, { useState, useEffect } from "react";
import type { ToaNhaFormProps } from "../types";

const ToaNhaForm: React.FC<ToaNhaFormProps> = ({
  toaNha,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    toadoX: "",
    toadoY: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (toaNha) {
      setFormData({
        toadoX: toaNha.toadoX?.toString() || "",
        toadoY: toaNha.toadoY?.toString() || "",
      });
    } else {
      setFormData({
        toadoX: "",
        toadoY: "",
      });
    }
    setErrors({});
  }, [toaNha]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.toadoX.trim()) {
      newErrors.toadoX = "Tọa độ X không được để trống";
    } else if (isNaN(Number(formData.toadoX))) {
      newErrors.toadoX = "Tọa độ X phải là số";
    }

    if (!formData.toadoY.trim()) {
      newErrors.toadoY = "Tọa độ Y không được để trống";
    } else if (isNaN(Number(formData.toadoY))) {
      newErrors.toadoY = "Tọa độ Y phải là số";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        toadoX: parseFloat(formData.toadoX),
        toadoY: parseFloat(formData.toadoY),
      });
    }
  };

  return (
    <div className="glass-effect rounded-2xl shadow-glow p-6 border border-white/20 h-full">
      <div className="mb-5">
        <h2 className="text-xl font-bold bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
          {toaNha ? "Cập Nhật Tòa Nhà" : "Thêm Mới Tòa Nhà"}
        </h2>
        <p className="text-gray-600 text-xs font-medium">
          {toaNha
            ? "Chỉnh sửa thông tin tọa độ tòa nhà"
            : "Nhập thông tin tọa độ cho tòa nhà mới"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="toadoX"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Tọa Độ X <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="any"
              id="toadoX"
              name="toadoX"
              value={formData.toadoX}
              onChange={handleChange}
              className={`w-full px-3 py-2.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 ${
                errors.toadoX
                  ? "border-red-400 focus:ring-red-400 focus:border-red-500"
                  : "border-gray-300 focus:ring-gray-400 focus:border-gray-500"
              }`}
              placeholder="Ví dụ: 10.5"
            />
            {errors.toadoX && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠</span> {errors.toadoX}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="toadoY"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Tọa Độ Y <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="any"
              id="toadoY"
              name="toadoY"
              value={formData.toadoY}
              onChange={handleChange}
              className={`w-full px-3 py-2.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 ${
                errors.toadoY
                  ? "border-red-400 focus:ring-red-400 focus:border-red-500"
                  : "border-gray-300 focus:ring-gray-400 focus:border-gray-500"
              }`}
              placeholder="Ví dụ: 20.3"
            />
            {errors.toadoY && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠</span> {errors.toadoY}
              </p>
            )}
          </div>
        </div>

        <div className="flex space-x-3 pt-3">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white py-2.5 px-4 rounded-xl hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
          >
            {toaNha ? "✓ Cập Nhật" : "+ Thêm Mới"}
          </button>
          {toaNha && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold border-2 border-gray-200 text-sm"
            >
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ToaNhaForm;
