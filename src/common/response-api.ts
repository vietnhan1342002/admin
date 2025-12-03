export interface IResponseAPI<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  statusCode?: number;
  errors?: any;
}
