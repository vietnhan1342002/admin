import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseException } from '../exceptions/resposeException';
import { HttpMessages } from 'src/shared/Enum/messages';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new ResponseException(
        HttpMessages.LOGIN_FAILED,
        HttpStatus.UNAUTHORIZED,
        HttpMessages.LOGIN_FAILED,
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }
}
