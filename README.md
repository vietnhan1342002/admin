# Admin API (NestJS)

Tài liệu chi tiết cho dự án **Admin API** xây dựng bằng **NestJS + TypeORM + MySQL**, phục vụ backend quản trị cho hệ thống bệnh viện/phòng khám.

---

## Mục lục

1. [Tổng quan](#1-tổng-quan)
2. [Kiến trúc & công nghệ](#2-kiến-trúc--công-nghệ)
3. [Cấu trúc thư mục](#3-cấu-trúc-thư-mục)
4. [Các module nghiệp vụ](#4-các-module-nghiệp-vụ)
5. [Yêu cầu môi trường](#5-yêu-cầu-môi-trường)
6. [Biến môi trường (`.env`)](#6-biến-môi-trường-env)
7. [Cài đặt & chạy dự án](#7-cài-đặt--chạy-dự-án)
8. [Database & Migration](#8-database--migration)
9. [Xác thực, phân quyền, bảo mật](#9-xác-thực-phân-quyền-bảo-mật)
10. [Quy ước API](#10-quy-ước-api)
11. [Danh sách route chính](#11-danh-sách-route-chính)
12. [Mail template](#12-mail-template)
13. [Redis](#13-redis)
14. [Scripts quan trọng](#14-scripts-quan-trọng)
15. [Kiểm thử](#15-kiểm-thử)
16. [Troubleshooting](#16-troubleshooting)
17. [Định hướng mở rộng tài liệu](#17-định-hướng-mở-rộng-tài-liệu)

---

## 1) Tổng quan

Admin API cung cấp các chức năng cốt lõi cho hệ quản trị:

- Xác thực người dùng và kiểm soát truy cập bằng JWT.
- Quản lý người dùng, nhóm quyền, nhân sự (staff).
- Quản lý bác sĩ, chuyên khoa, phòng ban.
- Quản lý lịch làm việc bác sĩ (ngày làm việc / ca / slot).
- Quản lý banner.
- Tích hợp Redis và gửi email theo template.

Ứng dụng sử dụng global prefix: **`/api`**.

Ví dụ: nếu app chạy ở `http://localhost:8000`, endpoint users có dạng `http://localhost:8000/api/users`.

---

## 2) Kiến trúc & công nghệ

### 2.1 Tech stack

- **Framework:** NestJS 11
- **Ngôn ngữ:** TypeScript
- **ORM:** TypeORM
- **CSDL:** MySQL
- **Cache:** Redis
- **Auth:** Passport (`local`, `jwt`) + `@nestjs/jwt`
- **Validation:** `class-validator`, `class-transformer`, global `ValidationPipe`
- **Bảo mật:** `helmet`, `cookie-parser`, `@nestjs/throttler`
- **Mail:** `@nestjs-modules/mailer` + Handlebars

### 2.2 Luồng xử lý tổng quan

1. Request đi vào `main.ts`, áp dụng các middleware/pipes/global filters.
2. JWT guard + Roles guard xử lý xác thực/phân quyền.
3. Controller nhận request và gọi Service.
4. Service xử lý nghiệp vụ, truy cập Repository.
5. Repository thao tác DB qua TypeORM.
6. Kết quả trả về theo format response của hệ thống.

---

## 3) Cấu trúc thư mục

```text
src/
├── common/
│   ├── base/                  # Base controller/service/repository/mapper
│   ├── decorators/            # Role, Public, Require...
│   ├── exceptions/            # Exception filter, flatten-errors
│   ├── guard/                 # JWT guard, Roles guard, Local guard
│   └── interceptors/          # API response, cache
├── config/                    # database.config, auth.config, mail.config
├── modules/
│   ├── auth/
│   ├── users/
│   ├── groups/
│   ├── staffs/
│   ├── doctors/
│   ├── doctor-schedules/
│   ├── departments/
│   ├── specialties/
│   └── banner/
├── shared/
│   ├── redis/                 # Redis module/service/controller
│   ├── utils/                 # Utility helpers
│   └── Helper/                # Message/Response helpers
├── template/email/            # Handlebars templates
├── app.module.ts
└── main.ts
```

---

## 4) Các module nghiệp vụ

- **AuthModule:** đăng nhập, chiến lược local/jwt, phát hành token.
- **UsersModule:** CRUD người dùng, đổi mật khẩu, mapping DTO.
- **GroupsModule:** quản lý nhóm người dùng/nhóm quyền.
- **StaffsModule:** quản lý thông tin nhân sự nội bộ.
- **DoctorsModule:** quản lý bác sĩ.
- **DoctorSchedulesModule:** quản lý ngày làm việc, ca làm, slot khám của bác sĩ.
- **DepartmentsModule:** quản lý khoa/phòng ban.
- **SpecialtiesModule:** quản lý chuyên khoa.
- **BannerModule:** quản lý banner hiển thị.
- **RedisModule:** kiểm tra và thao tác Redis.

---

## 5) Yêu cầu môi trường

- Node.js: khuyến nghị **>= 20**
- npm: khuyến nghị **>= 10**
- MySQL: **8.x** (khuyến nghị)
- Redis: **7.x** (khuyến nghị)

---

## 6) Biến môi trường (`.env`)

Tạo file `.env` tại root dự án:

```env
# App
NODE_ENV=development
PORT=8000

# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME_DEV=admin_dev
DB_NAME=admin_prod

# JWT
JWT_SECRET=replace_with_a_very_strong_secret

# Mail
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=example_user
MAIL_PASSWORD=example_password
MAIL_SENDER="Admin API <no-reply@example.com>"

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

### 6.1 Quy tắc chọn database theo môi trường

Dựa trên cấu hình TypeORM:

- `NODE_ENV=production` -> dùng `DB_NAME`
- Các môi trường khác -> dùng `DB_NAME_DEV`

### 6.2 Lưu ý bảo mật

- Không commit `.env` lên git.
- JWT secret cần dài, ngẫu nhiên.
- Mật khẩu DB/Mail nên quản lý qua secret manager ở production.

---

## 7) Cài đặt & chạy dự án

### 7.1 Cài dependencies

```bash
npm install
```

### 7.2 Chạy local (development)

```bash
npm run dev
```

### 7.3 Build & chạy production

```bash
npm run build
npm run start:prod
```

Mặc định app lắng nghe trên: `0.0.0.0:${PORT}`.

---

## 8) Database & Migration

Dự án dùng TypeORM CLI với data-source tại `src/data-source.ts`.

### 8.1 Generate migration

```bash
npm run migration:generate
```

### 8.2 Run migration (dev)

```bash
npm run migration:run:dev
```

### 8.3 Run migration (production build)

```bash
npm run migration:run
```

### 8.4 Revert migration

```bash
npm run migration:revert
```

> Khuyến nghị: Không dùng `synchronize` ở production, luôn dùng migration để kiểm soát thay đổi schema.

---

## 9) Xác thực, phân quyền, bảo mật

### 9.1 Auth

- Sử dụng Passport `local` cho đăng nhập.
- Dùng Passport `jwt` để xác thực request.
- JWT token hết hạn theo cấu hình hiện tại (`15m`).

### 9.2 Guard toàn cục

Tại `AppModule`, hệ thống gắn global guards:

- `JwtAuthGuard`: kiểm tra token.
- `RolesGuard`: kiểm tra vai trò (roles).

### 9.3 Validation toàn cục

`ValidationPipe` được bật global với:

- `transform: true`
- `whitelist: true`
- `forbidNonWhitelisted: true`
- Custom `exceptionFactory` để format lỗi rõ ràng.

### 9.4 Bảo mật HTTP

- `helmet()` cho header bảo mật.
- `cookie-parser` để xử lý cookie.
- `@nestjs/throttler` giới hạn tần suất request.

### 9.5 CORS

- Dev: cho phép danh sách origin dev đã cấu hình.
- Prod: cho phép origin production đã cấu hình.

---

## 10) Quy ước API

### 10.1 Prefix

Tất cả endpoint dùng prefix chung: `/api`.

### 10.2 JSON body

- Gửi body theo đúng DTO.
- Field không nằm trong DTO sẽ bị từ chối (do `forbidNonWhitelisted`).

### 10.3 Mã trạng thái HTTP

- `200/201`: thành công
- `400`: dữ liệu không hợp lệ
- `401`: chưa xác thực / token không hợp lệ
- `403`: không đủ quyền
- `404`: không tìm thấy tài nguyên

### 10.4 Gợi ý làm việc với client

- Luôn parse lỗi validation theo danh sách `errors` trả về.
- Truyền token JWT qua Authorization header (Bearer token) theo chuẩn API.

---

## 11) Danh sách route chính

Các route controller hiện có:

- `/api/auth`
- `/api/users`
- `/api/groups`
- `/api/staffs`
- `/api/doctors`
- `/api/doctor-schedules`
- `/api/departments`
- `/api/specialties`
- `/api/banners`
- `/api/redis-test`

> Chi tiết từng endpoint (method, payload mẫu, response mẫu) nên được tách thành tài liệu API riêng hoặc Swagger.

---

## 12) Mail template

- Thư mục template: `src/template/email`
- Engine template: Handlebars
- Cấu hình tại: `src/config/mail.config.ts`

Muốn thêm template mới:

1. Tạo file `.hbs` trong `src/template/email`.
2. Truyền context tương ứng khi gọi mailer service.

---

## 13) Redis

- Redis module nằm tại `src/shared/redis`.
- Có controller test tại `/api/redis-test` để kiểm tra tích hợp.

---

## 14) Scripts quan trọng

- `npm run build` — build source TypeScript.
- `npm run dev` — chạy watch mode.
- `npm run start` — chạy mode chuẩn Nest.
- `npm run start:prod` — chạy bản build production.
- `npm run lint` — eslint + auto fix.
- `npm run test` — unit test.
- `npm run test:e2e` — e2e test.
- `npm run test:cov` — test coverage.
- `npm run migration:*` — thao tác migration.

---

## 15) Kiểm thử

Chạy lần lượt:

```bash
npm run lint
npm run test
npm run test:e2e
npm run build
```

Nếu CI/CD có pipeline, nên bắt buộc tối thiểu `lint + test + build` trước khi merge.

---

## 16) Troubleshooting

### 16.1 Không kết nối được DB

- Kiểm tra `DB_HOST`, `DB_PORT`, user/password.
- Xác nhận DB đã được tạo (`DB_NAME_DEV` hoặc `DB_NAME`).
- Kiểm tra user DB có quyền truy cập từ host hiện tại.

### 16.2 Lỗi JWT/401 liên tục

- Kiểm tra token còn hạn hay không.
- Kiểm tra `JWT_SECRET` giữa lúc tạo token và verify có khớp.
- Kiểm tra header `Authorization: Bearer <token>`.

### 16.3 Lỗi gửi mail

- Kiểm tra host/port SMTP.
- Kiểm tra account SMTP có bật app password hoặc quyền gửi.
- Kiểm tra `MAIL_SENDER` đúng định dạng.

### 16.4 Validation lỗi do field thừa

- API đang bật `forbidNonWhitelisted`, nên field ngoài DTO sẽ bị reject.
- Cập nhật payload theo đúng DTO tương ứng.

---

## 17) Định hướng mở rộng tài liệu

Nên bổ sung tiếp:

- Swagger/OpenAPI cho toàn bộ endpoint.
- Bảng role-permission chi tiết theo module.
- Sequence diagram cho luồng login và phân quyền.
- Postman collection kèm environment (dev/staging/prod).
- Runbook deploy production (PM2/Docker/K8s).

---

Nếu bạn muốn, mình có thể viết tiếp **API handbook theo từng module** (ví dụ `auth`, `users`, `doctor-schedules`) với request/response mẫu chi tiết để frontend tích hợp ngay.
