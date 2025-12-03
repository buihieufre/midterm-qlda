# Quản Lý Tòa Nhà - Clean Architecture Example

Ứng dụng quản lý tòa nhà được xây dựng theo kiến trúc Clean Architecture với Next.js.

## Cấu trúc dự án

```
QLDA-MIDTERM/
├── domain/                    # Domain Layer (Business Logic)
│   ├── models/               # Domain models
│   │   └── SinhVien.ts       # SinhVien entity
│   └── repository/           # Repository interfaces (contracts)
│       └── ISinhVienRepository.ts
│
├── usecases/                  # Use Cases Layer (Application Logic)
│   └── SinhVienService.ts    # Business logic cho SinhVien
│
├── infrastructure/            # Infrastructure Layer (External Concerns)
│   ├── config/               # Configuration
│   │   └── database.ts       # Database connection config
│   ├── repository/           # Repository implementations
│   │   └── SinhVienRepository.ts
│   └── database/            # Database scripts
│       └── init.sql          # SQL schema
│
├── presentation/              # Presentation Layer (UI)
│   ├── pages/
│   │   └── SinhVienPage.jsx  # Main page component
│   └── components/
│       ├── Header.jsx
│       ├── Footer.jsx
│       ├── MenuLeft.jsx
│       ├── SinhVienForm.jsx   # Form component
│       └── SinhVienList.jsx   # List component
│
└── app/                       # Next.js App Router
    ├── api/                   # API Routes
    │   └── sinhvien/
    │       ├── route.ts       # GET, POST
    │       └── [id]/
    │           └── route.ts   # GET, PUT, DELETE
    ├── layout.tsx
    ├── page.tsx
    └── globals.css
```

## Tính năng

- ✅ CRUD đầy đủ: Create, Read, Update, Delete
- ✅ Clean Architecture với 4 layers rõ ràng
- ✅ Validation ở domain layer
- ✅ Responsive UI với Tailwind CSS
- ✅ TypeScript support

## Cài đặt

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình database (Neon PostgreSQL)

1. Tạo file `.env.local` từ `env.example`:

```bash
cp env.example .env.local
```

2. Cập nhật POSTGRES_URL trong `.env.local`:

```env
POSTGRES_URL="postgresql://user:password@host/database?sslmode=require"
```

3. Tạo bảng trong Neon Database:

**Cách 1: Sử dụng API Migration (Khuyến nghị)**
```bash
# Chạy lệnh này một lần để tạo bảng
curl -X POST http://localhost:3000/api/migrate
```

**Cách 2: Sử dụng Neon SQL Editor**
- Mở Neon SQL Editor
- Copy và chạy script từ file `infrastructure/database/create-table.sql`
- Hoặc chạy toàn bộ script từ file `infrastructure/database/init.sql`

### 3. Chạy ứng dụng

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Truy cập: http://localhost:3000

## Clean Architecture Layers

### 1. Domain Layer (`domain/`)

- Chứa business entities và contracts (interfaces)
- Không phụ thuộc vào bất kỳ layer nào khác
- Files:
  - `domain/models/ToaNha.ts`: Domain entity
  - `domain/repository/IToaNhaRepository.ts`: Repository interface

### 2. Use Cases Layer (`usecases/`)

- Chứa business logic và use cases
- Phụ thuộc vào Domain layer
- File: `usecases/ToaNhaService.ts`

### 3. Infrastructure Layer (`infrastructure/`)

- Chứa các implementation cụ thể (database, external services)
- Phụ thuộc vào Domain layer (implement interfaces từ domain)
- Files:
  - `infrastructure/config/database.ts`: Database connection
  - `infrastructure/repository/ToaNhaRepository.ts`: Repository implementation
  - `infrastructure/database/init.sql`: SQL schema
- Sử dụng @neondatabase/serverless để tương tác với Neon PostgreSQL

### 4. Presentation Layer (`presentation/` và `app/api/`)

- Chứa UI components và API endpoints (Controllers)
- Phụ thuộc vào Use Cases layer
- Files:
  - `presentation/pages/`, `presentation/components/`: React components
  - `app/api/toanha/`: Next.js API routes

## API Endpoints

- `GET /api/toanha` - Lấy tất cả tòa nhà
- `POST /api/toanha` - Tạo mới tòa nhà
- `GET /api/toanha/[maViTri]` - Lấy tòa nhà theo mã
- `PUT /api/toanha/[maViTri]` - Cập nhật tòa nhà
- `DELETE /api/toanha/[maViTri]` - Xóa tòa nhà

## Thực thể ToaNha

- `maViTri`: Mã vị trí (primary key, tự động tăng)
- `toadoX`: Tọa độ X (required, số)
- `toadoY`: Tọa độ Y (required, số)

## Công nghệ sử dụng

- **Frontend**: Next.js 15.1.5, React 19.0.0, Tailwind CSS 3.4.17
- **Backend**: Next.js API Routes
- **Database**: Neon PostgreSQL với @neondatabase/serverless
- **Language**: TypeScript 5.7.2, JavaScript
- **HTTP Client**: Axios 1.7.9
- **Node.js**: 20+ (khuyến nghị)

## Database Setup

### Tạo Bảng

Chạy SQL script trong Neon SQL Editor:

```sql
-- File: infrastructure/database/init.sql
CREATE TABLE IF NOT EXISTS toanha (
  "maViTri" SERIAL PRIMARY KEY,
  "toadoX" NUMERIC(10, 2) NOT NULL,
  "toadoY" NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Xem file `NEON_SETUP.md` để biết chi tiết về cấu hình Neon.

Xem file `ARCHITECTURE.md` để biết chi tiết về cấu trúc Clean Architecture.
