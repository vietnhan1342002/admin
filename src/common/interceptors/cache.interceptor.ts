/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseCache } from '../base/base.redis';

export interface CacheInterceptorOptions {
  ttl?: number; // seconds
  keyPrefix?: string;
  skipCache?: (context: ExecutionContext) => boolean;
}

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private readonly cache: BaseCache<any>, // BaseCache generic
    private readonly options?: CacheInterceptorOptions,
  ) {}

  private getCacheKey(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const url = req.url;
    const params = req.params;
    const query = req.query;

    const key = `${this.options?.keyPrefix || 'cache'}:${url}:${JSON.stringify(params)}:${JSON.stringify(query)}`;
    return key;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    if (this.options?.skipCache?.(context)) {
      return next.handle();
    }

    const key = this.getCacheKey(context);

    return new Observable((observer) => {
      this.cache
        .get(key)
        .then((cached) => {
          if (cached) {
            observer.next(cached);
            observer.complete();
          } else {
            next
              .handle()
              .pipe(
                tap((data) => {
                  this.cache.set(key, data, { ttl: this.options?.ttl || 3600 });
                }),
              )
              .subscribe({
                next: (data) => observer.next(data),
                error: (err) => observer.error(err),
                complete: () => observer.complete(),
              });
          }
        })
        .catch(() => {
          // nếu Redis lỗi thì fallback: vẫn trả về data từ handler
          next.handle().subscribe(observer);
        });
    });
  }
}
