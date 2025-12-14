import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

interface Payload {
  id: string;
  email: string;
  name: string;
  roles: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string | null => {
          if (
            request &&
            request.cookies &&
            typeof request.cookies['jwt'] === 'string'
          ) {
            return request.cookies['jwt'];
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: Payload) {
    return payload;
  }
}
