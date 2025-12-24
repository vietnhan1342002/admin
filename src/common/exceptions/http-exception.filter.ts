/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Lỗi hệ thống';
    let errors: string[] | undefined;

    // ✅ HttpException (ValidationPipe, BadRequest, Forbidden...)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse() as any;

      message = res.message ?? exception.message;
      errors = res.errors;
    }

    // ✅ DB error: thiếu field NOT NULL
    else if (
      exception.name === 'QueryFailedError' &&
      exception.message?.includes("doesn't have a default value")
    ) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Thiếu trường dữ liệu bắt buộc';

      const match = exception.message.match(/Field '(.+?)'/);
      if (match) {
        errors = [`Trường ${match[1]} là bắt buộc`];
      }
    }

    // ✅ DB error khác
    else if (exception.name === 'QueryFailedError') {
      status = HttpStatus.CONFLICT;
      message = 'Lỗi dữ liệu trong cơ sở dữ liệu';
    }

    // ✅ Error thường
    else if (exception instanceof Error) {
      message = exception.message;
    }

    // ✅ Log lỗi hệ thống
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `HTTP ${status} ${request.method} ${request.url}`,
        exception.stack,
      );
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      errors,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
