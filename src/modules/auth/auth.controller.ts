import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
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
import { ResponseException } from 'src/common/exceptions/resposeException';
// import { Public } from 'src/csrc/common/guard/local-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  getProfile(@Request() req: express.Request) {
    return this.authService.profile(req);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Res({ passthrough: true }) response: express.Response,
    @Body() loginDto: LoginDto,
  ) {
    const user = await this.authService.login(loginDto);

    if (!user) {
      throw new ResponseException(
        HttpMessages.LOGIN_FAILED,
        HttpStatus.UNAUTHORIZED,
        HttpMessages.LOGIN_FAILED,
      );
    }
    response.cookie('jwt', user.accessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return ResponseAPI.success(
      user.accessToken,
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
}
