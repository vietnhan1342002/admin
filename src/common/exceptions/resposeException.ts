import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseAPI } from 'src/shared/Helper/ResposeApi.helper';

export class ResponseException extends HttpException {
  constructor(
    message: string,
    statusCode: number = HttpStatus.BAD_REQUEST,
    errors?: string,
  ) {
    super(ResponseAPI.fail(errors, statusCode, message), statusCode);
  }
}
