import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseException } from '../exceptions/resposeException';
import { HttpMessages } from 'src/shared/Enum/messages';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private readonly logger = new Logger(LocalAuthGuard.name);
  handleRequest(err: any, user: any) {
    if (err || !user) {
      this.logger.warn(`Unauthorized access attempt local`);
      throw new ResponseException(
        HttpMessages.LOGIN_FAILED,
        HttpStatus.UNAUTHORIZED,
        HttpMessages.LOGIN_FAILED,
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.logger.log(`User authenticated: ${user.id} - ${user.email}`);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }
}
