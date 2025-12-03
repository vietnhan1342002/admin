import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  //   UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const token: string = request.cookies?.['jwt'] as string;

    if (!token) {
      throw new UnauthorizedException('JWT not found in cookies');
    }

    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or expired JWT');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }
}
