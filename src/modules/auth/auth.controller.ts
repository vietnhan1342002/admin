import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Query,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import express, { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { LocalAuthGuard } from 'src/common/guard/local-auth.guard';
import { ResponseAPI } from 'src/shared/Helper/ResposeApi.helper';
import { HttpMessages } from 'src/shared/Enum/messages';
// import { Public } from 'src/csrc/common/guard/local-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Res({ passthrough: true }) response: express.Response,
    @Body() loginDto: LoginDto,
  ) {
    const user = await this.authService.login(loginDto);

    // Production: set cookie
    response.cookie('jwt', user.accessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });
    // Dev: trả token qua body
    return ResponseAPI.success(
      { accessToken: user.accessToken },
      HttpMessages.LOGIN_SUCCESS,
      HttpStatus.ACCEPTED,
    );
  }

  @Public()
  @Post('logout')
  logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: false,
    });

    return ResponseAPI.success(
      true,
      HttpMessages.LOGOUT_SUCCESS,
      HttpStatus.ACCEPTED,
    );
  }

  @Get('profile')
  async getProfile(@Request() req: express.Request) {
    if (!req.user) {
      throw new UnauthorizedException('Người dùng chưa đăng nhập');
    }
    return ResponseAPI.success(
      await this.authService.profile(req.user.id),
      HttpMessages.SUCCESS,
      HttpStatus.ACCEPTED,
    );
  }

  @Public()
  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return ResponseAPI.success(
      await this.authService.verifyEMail(token),
      HttpMessages.SUCCESS,
      HttpStatus.ACCEPTED,
    );
  }

  @Get('check-cookie')
  checkCookie(@Req() req: express.Request) {
    const cookies = req.cookies; // toàn bộ cookie gửi lên
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jwtCookie = cookies['jwt'];

    if (jwtCookie) {
      this.logger.log(`JWT cookie found: ${jwtCookie}`);
    } else {
      this.logger.warn('JWT cookie not found in request');
    }

    return {
      message: jwtCookie ? 'JWT cookie found' : 'JWT cookie not found',
      cookies,
    };
  }
}
