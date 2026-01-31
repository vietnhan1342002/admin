// src/common/constants/messages.enum.ts

export enum HttpMessages {
  // ✅ Chung
  SUCCESS = 'Thao tác thành công',
  FAILED = 'Thao tác thất bại',

  // ✅ Xác thực
  LOGIN_SUCCESS = 'Đăng nhập thành công',
  LOGIN_FAILED = 'Sai tên đăng nhập hoặc mật khẩu',
  LOGOUT_SUCCESS = 'Đăng xuất thành công',
  UNAUTHORIZED = 'Người dùng chưa đăng nhập',
  FORBIDDEN = 'Bạn không có quyền truy cập',

  // ✅ Người dùng
  USER_NOT_FOUND = 'Không tìm thấy người dùng',
  USER_CREATED = 'Tạo người dùng thành công',
  USER_UPDATED = 'Cập nhật người dùng thành công',
  USER_DELETED = 'Xóa người dùng thành công',
  USER_ALREADY_EXISTS = 'Người dùng đã tồn tại',

  // ✅ Bài viết
  POST_NOT_FOUND = 'Không tìm thấy bài viết',
  POST_CREATED = 'Tạo bài viết thành công',
  POST_UPDATED = 'Cập nhật bài viết thành công',
  POST_DELETED = 'Xóa bài viết thành công',
  POST_ALREADY_EXISTS = 'Bài viết đã tồn tại',

  // ✅ Kiểm tra dữ liệu
  VALIDATION_FAILED = 'Dữ liệu không hợp lệ',
  INVALID_INPUT = 'Dữ liệu đầu vào không hợp lệ',

  // ✅ JWT / Token
  TOKEN_EXPIRED = 'Token đã hết hạn',
  TOKEN_INVALID = 'Token không hợp lệ',
  TOKEN_NOT_FOUND = 'Không tìm thấy token',

  // ✅ CRUD chung
  RECORD_NOT_FOUND = 'Không tìm thấy bản ghi',
  RECORD_ALREADY_EXISTS = 'Bản ghi đã tồn tại',
}

export enum CrudAction {
  CREATED = 'đã được tạo thành công',
  UPDATED = 'đã được cập nhật thành công',
  DELETED = 'đã được xóa thành công',
  NOT_FOUND = 'không tồn tại',
  ALREADY_EXISTS = 'đã tồn tại',
}

export enum Resource {
  USER = 'Người dùng',
  POST = 'Bài viết',
  BANNER = 'Banner',
  DOCTOR = 'Bác sĩ',
  COMMENT = 'Bình luận',
  EMAIL = 'email',
  PHONE = 'Số điện thoại',
  DOCTOR_SCHEDULE = 'Lịch làm việc của bác sĩ',
  DEPARTMENT = 'Phòng ban',
  SPECIALTY = 'Chuyên khoa',
}
