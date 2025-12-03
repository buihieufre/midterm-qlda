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
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200 h-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="toadoX"
              className="block text-sm text-gray-700 mb-2"
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
              className={`w-full px-3 py-2 border rounded focus:outline-none ${
                errors.toadoX
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-300 focus:border-gray-500"
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
              className="block text-sm text-gray-700 mb-2"
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
              className={`w-full px-3 py-2 border rounded focus:outline-none ${
                errors.toadoY
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-300 focus:border-gray-500"
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
            className="flex-1 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            {toaNha ? "Cập Nhật" : "Thêm Mới"}
          </button>
          {toaNha && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
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
