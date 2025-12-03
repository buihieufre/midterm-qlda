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
      <div className="bg-white rounded-lg shadow p-12 text-center border border-gray-200">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-400 border-t-transparent mb-4"></div>
        <p className="text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!toaNhaList || toaNhaList.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center border border-gray-200">
        <p className="text-gray-600">Chưa có dữ liệu tòa nhà</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 h-full">
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 sticky top-0">
              <th className="px-4 py-3 text-left text-xs text-gray-700">
                Mã Vị trí
              </th>
              <th className="px-4 py-3 text-left text-xs text-gray-700">
                Tọa Độ X
              </th>
              <th className="px-4 py-3 text-left text-xs text-gray-700">
                Tọa Độ Y
              </th>
              <th className="px-4 py-3 text-right text-xs text-gray-700">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {toaNhaList.map((tn) => (
              <tr key={tn.maViTri} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {tn.maViTri}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {tn.toadoX}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {tn.toadoY}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={() => onEdit(tn)}
                    className="px-3 py-1 mr-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Sửa
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
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Xóa
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
