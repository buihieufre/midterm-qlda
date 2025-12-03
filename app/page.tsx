import ToaNhaPage from "@/presentation/pages/ToaNhaPage";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
            Quản Lý Tòa Nhà
          </h1>
          <p className="text-gray-700 font-medium">
            Quản lý thông tin tọa độ các tòa nhà
          </p>
        </div>
        <ToaNhaPage />
      </main>
    </div>
  );
}
