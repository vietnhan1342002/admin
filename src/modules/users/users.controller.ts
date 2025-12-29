// src/modules/users/users.controller.ts
import {
  Controller,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from './enum/user-role.enum';
import { BaseController } from 'src/common/base/base.controller';
import { UserResponseDto } from './dto/response-user.dto';
import { ResponseAPI } from 'src/shared/Helper/ResposeApi.helper';
import { HttpMessages } from 'src/shared/Enum/messages';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('users')
export class UsersController extends BaseController<
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto
> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }
  // admin resets or user changes password — choose flow
  @Patch('change-password/:id')
  changePassword(@Param('id') id: string, @Body() dto: ChangePasswordDto) {
    return ResponseAPI.success(
      this.usersService.changePassword(id, dto),
      HttpMessages.SUCCESS,
      HttpStatus.ACCEPTED,
    );
  }

  @Patch('deactive/:id')
  async deactive(@Param('id') id: string) {
    return ResponseAPI.success(
      await this.usersService.deactive(id),
      HttpMessages.SUCCESS,
      HttpStatus.ACCEPTED,
    );
  }

  @Patch('active/:id')
  async active(@Param('id') id: string) {
    return ResponseAPI.success(
      await this.usersService.active(id),
      HttpMessages.SUCCESS,
      HttpStatus.ACCEPTED,
    );
  }
}
