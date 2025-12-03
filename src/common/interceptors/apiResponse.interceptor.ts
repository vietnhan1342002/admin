import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { IResponseAPI } from '../response-api';
import { ResponseAPI } from 'src/shared/Helper/ResposeApi.helper';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseAPI<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponseAPI<T>> {
    return next.handle().pipe(map((data) => ResponseAPI.success(data)));
  }
}
