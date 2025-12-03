"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ToaNhaForm from "../components/ToaNhaForm";
import ToaNhaList from "../components/ToaNhaList";
import type { ToaNha } from "../types";

const ToaNhaPage: React.FC = () => {
  const [toaNhaList, setToaNhaList] = useState<ToaNha[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingToaNha, setEditingToaNha] = useState<ToaNha | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" });

  const loadToaNhaList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/toanha");
      if (response.data.success) {
        setToaNhaList(response.data.data);
      } else {
        showMessage("error", response.data.message || "Lỗi khi tải danh sách tòa nhà");
      }
    } catch (error: any) {
      console.error("Error loading toa nha list:", error);
      showMessage("error", error.response?.data?.message || "Lỗi khi tải danh sách tòa nhà");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadToaNhaList();
  }, []);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 5000);
  };

  const handleSubmit = async (data: { toadoX: number; toadoY: number }) => {
    try {
      if (editingToaNha) {
        // Update
        const response = await axios.put(`/api/toanha/${editingToaNha.maViTri}`, data);
        if (response.data.success) {
          showMessage("success", "Cập nhật tòa nhà thành công");
          setEditingToaNha(null);
          loadToaNhaList();
        } else {
          showMessage("error", response.data.message || "Lỗi khi cập nhật tòa nhà");
        }
      } else {
        // Create
        const response = await axios.post("/api/toanha", data);
        if (response.data.success) {
          showMessage("success", "Tạo tòa nhà thành công");
          loadToaNhaList();
        } else {
          showMessage("error", response.data.message || "Lỗi khi tạo tòa nhà");
        }
      }
    } catch (error: any) {
      console.error("Error submitting toa nha:", error);
      showMessage("error", error.response?.data?.message || "Lỗi khi lưu tòa nhà");
    }
  };

  const handleDelete = async (maViTri: number) => {
    try {
      const response = await axios.delete(`/api/toanha/${maViTri}`);
      if (response.data.success) {
        showMessage("success", "Xóa tòa nhà thành công");
        loadToaNhaList();
      } else {
        showMessage("error", response.data.message || "Lỗi khi xóa tòa nhà");
      }
    } catch (error: any) {
      console.error("Error deleting toa nha:", error);
      showMessage("error", error.response?.data?.message || "Lỗi khi xóa tòa nhà");
    }
  };

  const handleEdit = (toaNha: ToaNha) => {
    setEditingToaNha(toaNha);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingToaNha(null);
  };

  return (
    <div className="space-y-6">
      {message.text && (
        <div
          className={`p-4 rounded shadow ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:sticky lg:top-6 lg:h-fit">
          <ToaNhaForm
            toaNha={editingToaNha}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
          />
        </div>

        <div>
          <ToaNhaList
            toaNhaList={toaNhaList}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ToaNhaPage;

