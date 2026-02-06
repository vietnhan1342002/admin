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
import { UserRole } from './enum/user-role.enum';
import { Staff } from '../staffs/entities/staff.entity';
import { randomUUID } from 'crypto';
import { EmailRepository } from './repositories/email.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { DataSource, EntityManager, IsNull } from 'typeorm';
import { EmailVerificationToken } from './entities/email.entity';

@Injectable()
export class UsersService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto
> {
  constructor(
    private repo: UserRepository,
    private emailRepo: EmailRepository,
    private mailerService: MailerService,
    private readonly datasource: DataSource,
    mapper: UserMapper,
  ) {
    super(repo, mapper, Resource.USER);
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

  async createUserInternal(
    manager: EntityManager,
    dto: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    const existed = await manager.findOne(User, {
      where: { email: dto.email, deletedAt: IsNull() },
    });

    if (existed) {
      throw new ConflictException(
        buildCrudMessage(Resource.EMAIL, CrudAction.ALREADY_EXISTS),
      );
    }

    const user = await manager.save(User, {
      email: dto.email,
      password: await hashPassword(dto.password),
      role: dto.role,
      name: dto.name,
      avatarUrl: dto.avatarUrl,
      phone: dto.phone,
      isVerifyEmail: false,
      isActive: true,
    });

    const token = randomUUID();

    await manager.save(EmailVerificationToken, {
      userId: user.id,
      token,
      expiredAt: new Date(Date.now() + 15 * 60 * 1000),
    });

    return { user, token };
  }

  async sendVerifyEmail(user: User, token: string) {
    const verifyUrl = `${process.env.API_URL_DEV}auth/verify-email?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Xác nhận đăng ký tài khoản',
      template: 'verify-account',
      context: {
        name: `${user.name}`,
        verifyUrl,
        appName: 'ZaCare',
        supportEmail: 'support@zacare.vn',
        expiredIn: '15 phút',
        year: new Date().getFullYear(),
      },
    });
  }

  // Create user (admin only)
  async create(dto: CreateUserDto) {
    const { user, token } = await this.repo.withTransaction((manager) =>
      this.createUserInternal(manager, dto),
    );

    await this.sendVerifyEmail(user, token);

    return this.mapper.toResponse(user);
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
        throw new NotFoundException(
          buildCrudMessage(Resource.USER, CrudAction.NOT_FOUND),
        );
      }
      await manager.softDelete(User, id);
      await manager.softDelete(Staff, { userId: id });
    });
  }

  async active(id: string) {
    await this.repo.update(id, { isActive: true });
  }

  async deactive(id: string) {
    await this.repo.update(id, { isActive: false });
  }
}
