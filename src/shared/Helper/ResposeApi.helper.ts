export class ResponseAPI<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  statusCode?: number;
  errors?: any;

  constructor(partial: Partial<ResponseAPI<T>>) {
    Object.assign(this, partial);
  }

  static success<T>(data?: T, message?: string, statusCode?: number) {
    return new ResponseAPI<T>({ data, success: true, message, statusCode });
  }

  static fail<T>(errors?: string, statusCode?: number, message?: string) {
    return new ResponseAPI<T>({
      success: false,
      message,
      statusCode,
      errors,
    });
  }
}
