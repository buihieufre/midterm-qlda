"use client";

import React from "react";
import type { ToaNhaListProps } from "../types";

const ToaNhaList: React.FC<ToaNhaListProps> = ({
  toaNhaList,
  onEdit,
  onDelete,
  loading,
}) => {
  if (loading) {
    return (
      <div className="glass-effect rounded-2xl shadow-glow p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-500 border-t-transparent mb-4"></div>
        <p className="text-gray-700 font-medium">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!toaNhaList || toaNhaList.length === 0) {
    return (
      <div className="glass-effect rounded-2xl shadow-glow p-12 text-center">
        <div className="text-6xl mb-4">🏢</div>
        <p className="text-gray-600 font-medium text-lg">Chưa có dữ liệu tòa nhà</p>
        <p className="text-gray-400 text-sm mt-2">Hãy thêm tòa nhà đầu tiên của bạn</p>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl shadow-glow overflow-hidden border border-white/20 h-full">
      <div className="px-6 py-4 bg-gradient-to-r from-gray-100 via-gray-100 to-gray-200 border-b border-white/20">
        <h2 className="text-xl font-bold bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent">
          Danh Sách Tòa Nhà
        </h2>
        <p className="text-xs text-gray-700 mt-1 font-medium">
          Tổng số: <span className="font-bold text-gray-700">{toaNhaList.length}</span> tòa nhà
        </p>
      </div>

      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0">
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Mã
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Tọa Độ X
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Tọa Độ Y
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {toaNhaList.map((tn, index) => (
              <tr 
                key={tn.maViTri} 
                className="hover:bg-gradient-to-r hover:from-gray-50 hover:via-gray-100 hover:to-gray-200 transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white font-bold text-xs">
                    {tn.maViTri}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {tn.toadoX}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {tn.toadoY}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(tn)}
                    className="inline-flex items-center px-3 py-1.5 mr-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium text-xs"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Bạn có chắc chắn muốn xóa tòa nhà mã "${tn.maViTri}"?`
                        )
                      ) {
                        onDelete(tn.maViTri!);
                      }
                    }}
                    className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-200 font-medium text-xs"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToaNhaList;

