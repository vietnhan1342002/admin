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
  private readonly logger = new Logger(HttpException.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else if (exception.name === 'QueryFailedError') {
      // Bắt riêng lỗi DB
      status = HttpStatus.CONFLICT; // 409
      message = { message: 'Database error', detail: exception.message };
    } else if (exception instanceof Error) {
      message = { message: exception.message };
    }

    if (
      !(exception instanceof HttpException) ||
      status === HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      this.logger.error(
        `HTTP ${status} Error on ${request.method} ${request.url}`,
        exception.stack || exception,
      );
    }

    response.status(status).json({
      success: false,
      // ...(typeof res === 'object' ? res : { message: res }),
      ...message,
      // timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
