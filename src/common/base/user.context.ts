import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      id: string;
    }
  }
}

@Injectable({ scope: Scope.REQUEST })
export class UserContextService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  get user() {
    return this.request.user;
  }

  get userId(): string | null {
    console.log(this.request.user);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.request.user?.id ?? null;
  }
}
