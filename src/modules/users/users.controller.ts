// src/modules/users/users.controller.ts
import {
  Controller,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
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
  @Patch(':id/change-password')
  changePassword(@Param('id') id: string, @Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(id, dto);
  }
}
