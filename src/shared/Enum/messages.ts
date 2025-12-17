// src/common/constants/messages.enum.ts
export enum HttpMessages {
  // ✅ General
  SUCCESS = 'Operation completed successfully',
  FAILED = 'Operation failed',

  // ✅ Auth
  LOGIN_SUCCESS = 'Login successful',
  LOGIN_FAILED = 'Invalid username or password',
  LOGOUT_SUCCESS = 'Logout successful',
  UNAUTHORIZED = 'Unauthorized access',
  FORBIDDEN = 'You do not have permission',

  // ✅ User
  USER_NOT_FOUND = 'User not found',
  USER_CREATED = 'User created successfully',
  USER_UPDATED = 'User updated successfully',
  USER_DELETED = 'User deleted successfully',
  USER_ALREADY_EXISTS = 'User already exists',

  // ✅ Post
  POST_NOT_FOUND = 'Post not found',
  POST_CREATED = 'Post created successfully',
  POST_UPDATED = 'Post updated successfully',
  POST_DELETED = 'Post deleted successfully',
  POST_ALREADY_EXISTS = 'Post already exists',

  // ✅ Validation
  VALIDATION_FAILED = 'Validation failed',
  INVALID_INPUT = 'Invalid input data',

  // ✅ JWT / Token
  TOKEN_EXPIRED = 'Token has expired',
  TOKEN_INVALID = 'Invalid token',
  TOKEN_NOT_FOUND = 'Token not found',

  // ✅ Common CRUD
  RECORD_NOT_FOUND = 'Record not found',
  RECORD_ALREADY_EXISTS = 'Record already exists',
}

export enum CrudAction {
  CREATED = 'created successfully',
  UPDATED = 'updated successfully',
  DELETED = 'deleted successfully',
  NOT_FOUND = 'not found',
  ALREADY_EXISTS = 'already exists',
}

export enum Resource {
  USER = 'User',
  POST = 'Post',
  BANNER = 'Banner',
  DOCTOR = 'Doctor',
  COMMENT = 'Comment',
  EMAIL = 'email',
}
