// src/modules/users/users.service.ts
import {
  Injectable,
  HttpStatus,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserMapper } from './mapper/user.mapper';
import { ResponseException } from 'src/common/exceptions/resposeException';
import { CrudAction, HttpMessages, Resource } from 'src/shared/Enum/messages';
import { hashPassword, comparePassword } from 'src/shared/utils/hashPassword';
import { buildCrudMessage } from 'src/shared/Helper/message.helper';
import { BaseService } from 'src/common/base/base.service';
import { UserResponseDto } from './dto/response-user.dto';
import { UserRepository } from './repositories/users.repository';
import { Request } from 'express';
import { UserRole } from './enum/user-role.enum';
import { DoctorRepository } from '../doctors/repositories/doctor.repository';
import { StaffRepository } from '../staffs/repositories/staff.repository';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Staff } from '../staffs/entities/staff.entity';

@Injectable()
export class UsersService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto
> {
  constructor(
    private repo: UserRepository,
    private staffRepo: StaffRepository,
    private doctorRepo: DoctorRepository,
    mapper: UserMapper,
  ) {
    super(repo, mapper);
  }

  private async emailExists(email: string): Promise<boolean> {
    const user = await this.repo.findOne({ email });
    return !!user;
  }

  private async findOrFail(id: string, withPassword = false): Promise<User> {
    if (withPassword) {
      // need to explicitly select password
      const user = await this.repo.findByIdWithPassword(id);
      if (!user)
        throw new NotFoundException(
          buildCrudMessage(Resource.USER, CrudAction.NOT_FOUND),
        );
      return user;
    }

    const user = await this.repo.findOne({ id });
    if (!user)
      throw new NotFoundException(
        buildCrudMessage(Resource.USER, CrudAction.NOT_FOUND),
      );
    return user;
  }

  // Create user (admin only)
  async create(dto: CreateUserDto) {
    if (await this.emailExists(dto.email)) {
      throw new ConflictException(
        buildCrudMessage(Resource.EMAIL, CrudAction.ALREADY_EXISTS),
      );
    }

    const hashed = await hashPassword(dto.password);

    const newUser = await this.repo.create({
      email: dto.email,
      password: hashed,
      role: UserRole.STAFF,
      firstName: dto.firstName,
      lastName: dto.lastName,
      avatarUrl: dto.avatarUrl,
      phone: dto.phone,
    });

    return this.mapper.toResponse(newUser);
  }

  // Change password (user or admin)
  async changePassword(userId: string, dto: ChangePasswordDto) {
    if (dto.newPassword !== dto.confirmPassword) {
      throw new ResponseException(
        HttpMessages.INVALID_INPUT,
        HttpStatus.BAD_REQUEST,
        'New password and confirm password do not match',
      );
    }

    const user = await this.findOrFail(userId, true); // get password

    const matched = await comparePassword(dto.oldPassword, user.password);
    if (!matched) {
      throw new ResponseException(
        HttpMessages.INVALID_INPUT,
        HttpStatus.BAD_REQUEST,
        'Old password is incorrect',
      );
    }

    user.password = await hashPassword(dto.newPassword);
    await this.repo.update(user.id, { password: user.password });
    return { message: 'Password updated successfully' };
  }

  async updateRole(id: string, role: UserRole) {
    const user = await this.repo.findOne({ id });
    if (!user) {
      throw new NotFoundException(
        buildCrudMessage(Resource.USER, CrudAction.NOT_FOUND),
      );
    }
    const newUser = await this.repo.update(id, { role });
    return this.mapper.toResponse(newUser!);
  }

  override async delete(id: string): Promise<void> {
    return this.repo.withTransaction(async (manager) => {
      const user = await manager.findOne(User, { where: { id } });
      if (!user) {
        buildCrudMessage(Resource.USER, CrudAction.NOT_FOUND);
      }
      await manager.softDelete(User, id);
      await manager.softDelete(Staff, { userId: id });
      await manager.softDelete(Doctor, { userId: id });
    });
  }
}
