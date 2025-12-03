# Quản Lý Tòa Nhà - Clean Architecture

Ứng dụng quản lý tòa nhà được xây dựng theo kiến trúc Clean Architecture với Next.js, TypeScript và Neon PostgreSQL.

## 📋 Mục lục

- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Clean Architecture Layers](#clean-architecture-layers)
- [Luồng dữ liệu](#luồng-dữ-liệu)
- [Cài đặt và chạy](#cài-đặt-và-chạy)
- [API Endpoints](#api-endpoints)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)

## 🏗️ Cấu trúc dự án

```
midterm-qlda/
├── domain/                    # Domain Layer - Business Logic Core
│   ├── models/                # Domain Entities
│   │   └── ToaNha.ts         # Entity ToaNha với validation logic
│   └── repository/            # Repository Interfaces (Contracts)
│       └── IToaNhaRepository.ts  # Interface định nghĩa contract cho repository
│
├── usecases/                  # Use Cases Layer - Application Logic
│   ├── ToaNhaService.ts       # Business logic cho ToaNha (CRUD operations)
│   └── ViTriService.ts        # Business logic cho ViTri
│
├── infrastructure/            # Infrastructure Layer - External Concerns
│   ├── config/                # Configuration
│   │   └── database.ts       # Database connection (Neon Serverless)
│   ├── repositories/          # Repository Implementations
│   │   ├── ToaNhaRepository.ts    # Implementation của IToaNhaRepository
│   │   └── ViTriRepository.ts     # Implementation của IViTriRepository
│   └── database/              # Database Scripts
│       ├── init.sql          # SQL schema initialization
│       ├── create-table.sql  # Table creation script
│       └── migration.ts      # Migration utilities
│
├── presentation/             # Presentation Layer - UI Components
│   ├── pages/                # Page Components
│   │   └── ToaNhaPage.tsx   # Main page component (container)
│   ├── components/           # Reusable Components
│   │   ├── ToaNhaForm.tsx   # Form component (Create/Update)
│   │   ├── ToaNhaList.tsx   # List component (Display data)
│   │   ├── Header.jsx        # Header component
│   │   ├── Footer.jsx       # Footer component
│   │   └── MenuLeft.jsx     # Sidebar menu component
│   └── types/                # TypeScript types
│       └── index.ts         # Shared types/interfaces
│
└── app/                      # Next.js App Router
    ├── api/                  # API Routes (Controllers)
    │   ├── toanha/          # ToaNha API endpoints
    │   │   ├── route.ts     # GET (all), POST (create)
    │   │   └── [maViTri]/   # Dynamic route
    │   │       └── route.ts # GET (one), PUT (update), DELETE
    │   └── migrate/         # Migration endpoint
    │       └── route.ts     # POST /api/migrate (create table)
    ├── layout.tsx           # Root layout
    ├── page.tsx             # Home page
    └── globals.css          # Global styles
```

## 🎯 Clean Architecture Layers

### 1. Domain Layer (`domain/`)

**Mục đích**: Chứa business entities và contracts (interfaces), không phụ thuộc vào bất kỳ layer nào.

**Chức năng**:
- Định nghĩa các thực thể (entities) của domain
- Chứa business rules và validation logic
- Định nghĩa interfaces (contracts) cho repositories
- Hoàn toàn độc lập với framework, database, UI

**Files**:
- `domain/models/ToaNha.ts`: 
  - Entity ToaNha với các thuộc tính: `maViTri`, `toadoX`, `toadoY`
  - Method `validate()`: Kiểm tra tính hợp lệ của dữ liệu
  - Methods `toJSON()`, `fromJSON()`: Chuyển đổi giữa object và entity

- `domain/repository/IToaNhaRepository.ts`:
  - Interface định nghĩa contract cho repository
  - Các method: `create()`, `findAll()`, `findByMaViTri()`, `update()`, `delete()`
  - Tuân theo Dependency Inversion Principle

### 2. Use Cases Layer (`usecases/`)

**Mục đích**: Chứa business logic và use cases, điều phối các operations.

**Chức năng**:
- Chứa các use cases (business operations)
- Sử dụng domain entities và repository interfaces
- Không phụ thuộc vào infrastructure (database, framework)
- Xử lý validation, business rules phức tạp

**Files**:
- `usecases/ToaNhaService.ts`:
  - `createToaNha()`: Tạo mới tòa nhà với validation
  - `getAllToaNha()`: Lấy tất cả tòa nhà
  - `getToaNhaByMaViTri()`: Lấy tòa nhà theo mã
  - `updateToaNha()`: Cập nhật tòa nhà (kiểm tra tồn tại trước)
  - `deleteToaNha()`: Xóa tòa nhà (kiểm tra tồn tại trước)
  - Nhận repository qua constructor (Dependency Injection)

### 3. Infrastructure Layer (`infrastructure/`)

**Mục đích**: Chứa các implementation cụ thể của external concerns (database, APIs, file system).

**Chức năng**:
- Implement các interfaces từ domain layer
- Tương tác với database (Neon PostgreSQL)
- Xử lý database connections, queries
- Chứa database scripts và migrations

**Files**:
- `infrastructure/config/database.ts`:
  - Cấu hình kết nối database với Neon Serverless
  - Export `sql` template tag để thực thi queries

- `infrastructure/repositories/ToaNhaRepository.ts`:
  - Implement `IToaNhaRepository` interface
  - Thực hiện các SQL queries để CRUD
  - Chuyển đổi database rows thành domain entities
  - Tự động tạo bảng nếu chưa tồn tại (qua `handleTableNotExistsError`)

- `infrastructure/database/`:
  - `init.sql`: SQL schema để tạo bảng
  - `create-table.sql`: Script tạo bảng
  - `migration.ts`: Utilities để xử lý migrations

### 4. Presentation Layer (`presentation/` và `app/api/`)

**Mục đích**: Chứa UI components và API endpoints (Controllers).

**Chức năng**:
- Hiển thị UI cho người dùng
- Xử lý user interactions
- Gọi API endpoints
- API endpoints nhận requests, gọi use cases, trả về responses

**Files**:

**UI Components** (`presentation/`):
- `presentation/pages/ToaNhaPage.tsx`:
  - Container component quản lý state
  - Xử lý CRUD operations qua API calls
  - Quản lý loading, error states

- `presentation/components/ToaNhaForm.tsx`:
  - Form component để tạo/cập nhật tòa nhà
  - Client-side validation
  - Submit data qua props callback

- `presentation/components/ToaNhaList.tsx`:
  - Hiển thị danh sách tòa nhà dạng table
  - Buttons để edit/delete
  - Loading và empty states

**API Routes** (`app/api/`):
- `app/api/toanha/route.ts`:
  - `GET`: Lấy tất cả tòa nhà → gọi `toaNhaService.getAllToaNha()`
  - `POST`: Tạo mới → gọi `toaNhaService.createToaNha()`

- `app/api/toanha/[maViTri]/route.ts`:
  - `GET`: Lấy một tòa nhà → gọi `toaNhaService.getToaNhaByMaViTri()`
  - `PUT`: Cập nhật → gọi `toaNhaService.updateToaNha()`
  - `DELETE`: Xóa → gọi `toaNhaService.deleteToaNha()`

## 🔄 Luồng dữ liệu

### Luồng tạo mới tòa nhà:

```
1. User nhập form (ToaNhaForm.tsx)
   ↓
2. Submit → ToaNhaPage.tsx gọi API
   ↓
3. POST /api/toanha (app/api/toanha/route.ts)
   ↓
4. ToaNhaService.createToaNha() (usecases/ToaNhaService.ts)
   ↓
5. ToaNha.validate() (domain/models/ToaNha.ts)
   ↓
6. ToaNhaRepository.create() (infrastructure/repositories/ToaNhaRepository.ts)
   ↓
7. SQL INSERT (infrastructure/config/database.ts → Neon Database)
   ↓
8. Response trả về → UI cập nhật
```

### Dependency Flow:

```
Presentation Layer
    ↓ (depends on)
Use Cases Layer
    ↓ (depends on)
Domain Layer
    ↑ (implemented by)
Infrastructure Layer
```

**Nguyên tắc**:
- Domain layer không phụ thuộc vào bất kỳ layer nào
- Use Cases phụ thuộc vào Domain
- Infrastructure implement Domain interfaces
- Presentation phụ thuộc vào Use Cases

## 🚀 Cài đặt và chạy

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình database

Tạo file `.env.local`:

```env
POSTGRES_URL="postgresql://user:password@host/database?sslmode=require"
```

### 3. Tạo bảng database

**Cách 1: Sử dụng API Migration (Khuyến nghị)**
```bash
curl -X POST http://localhost:3000/api/migrate
```

**Cách 2: Sử dụng Neon SQL Editor**
- Copy và chạy script từ `infrastructure/database/create-table.sql`

### 4. Chạy ứng dụng

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Truy cập: http://localhost:3000

## 📡 API Endpoints

### ToaNha API

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/toanha` | Lấy tất cả tòa nhà |
| POST | `/api/toanha` | Tạo mới tòa nhà |
| GET | `/api/toanha/[maViTri]` | Lấy tòa nhà theo mã |
| PUT | `/api/toanha/[maViTri]` | Cập nhật tòa nhà |
| DELETE | `/api/toanha/[maViTri]` | Xóa tòa nhà |

### Migration API

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/migrate` | Tạo bảng `toanha` nếu chưa tồn tại |

### Request/Response Examples

**POST /api/toanha**
```json
// Request
{
  "toadoX": 10.5,
  "toadoY": 20.3
}

// Response
{
  "success": true,
  "data": {
    "maViTri": 1,
    "toadoX": 10.5,
    "toadoY": 20.3
  },
  "message": "Tạo tòa nhà thành công"
}
```

## 🛠️ Công nghệ sử dụng

- **Frontend Framework**: Next.js 15.1.5 (App Router)
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 3.4.17
- **Language**: TypeScript 5.7.2
- **Database**: Neon PostgreSQL
- **Database Client**: @neondatabase/serverless 0.10.4
- **HTTP Client**: Axios 1.7.9
- **Node.js**: 20+ (khuyến nghị)

## 📊 Database Schema

```sql
CREATE TABLE toanha (
  "maViTri" SERIAL PRIMARY KEY,
  "toadoX" NUMERIC(10, 2) NOT NULL,
  "toadoY" NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## ✨ Tính năng

- ✅ CRUD đầy đủ: Create, Read, Update, Delete
- ✅ Clean Architecture với 4 layers rõ ràng
- ✅ Validation ở domain layer
- ✅ Dependency Injection
- ✅ TypeScript support
- ✅ Responsive UI với Tailwind CSS
- ✅ Auto migration (tự động tạo bảng)
- ✅ Error handling

## 📝 Ghi chú

- Dự án tuân theo **Clean Architecture** principles
- Sử dụng **Dependency Inversion Principle** (DIP)
- Domain layer hoàn toàn độc lập, có thể test mà không cần database
- Dễ dàng thay đổi database hoặc framework mà không ảnh hưởng business logic
