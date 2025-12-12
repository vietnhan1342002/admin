// src/modules/users/users.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserMapper } from './mapper/user.mapper';
import { ResponseException } from 'src/common/exceptions/resposeException';
import { HttpMessages } from 'src/shared/Enum/messages';
import { hashPassword, comparePassword } from 'src/shared/utils/hashPassword';
import { UserRole } from './enum/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource, // optional for transactions
  ) {}

  private async emailExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return !!user;
  }

  private async findOrFail(id: string, withPassword = false): Promise<User> {
    if (withPassword) {
      // need to explicitly select password
      const user = await this.usersRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.id = :id', { id })
        .getOne();
      if (!user)
        throw new ResponseException(
          HttpMessages.RECORD_NOT_FOUND,
          HttpStatus.NOT_FOUND,
          'User not found',
        );
      return user;
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user)
      throw new ResponseException(
        HttpMessages.RECORD_NOT_FOUND,
        HttpStatus.NOT_FOUND,
        'User not found',
      );
    return user;
  }

  // Create user (admin only)
  async create(dto: CreateUserDto) {
    if (await this.emailExists(dto.email)) {
      throw new ResponseException(
        HttpMessages.RECORD_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
        'Email already exists',
      );
    }

    const hashed = await hashPassword(dto.password);

    const roles =
      Array.isArray(dto.roles) && dto.roles.length
        ? dto.roles
        : [UserRole.USER];

    const newUser = this.usersRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashed,
      roles,
    });

    await this.usersRepository.save(newUser);

    return UserMapper.toResponse(newUser);
  }

  // List users (admin)
  async findAll() {
    const users = await this.usersRepository.find();
    return UserMapper.toListResponse(users);
  }

  // Get single user
  async findOne(id: string) {
    const user = await this.findOrFail(id);
    return UserMapper.toResponse(user);
  }

  // Update user
  // NOTE: role changes should be allowed only for admin — enforced at Guard/Controller level
  async update(id: string, dto: UpdateUserDto) {
    const user = await this.findOrFail(id);

    if (dto.email && dto.email !== user.email) {
      if (await this.emailExists(dto.email)) {
        throw new ResponseException(
          HttpMessages.RECORD_ALREADY_EXISTS,
          HttpStatus.BAD_REQUEST,
          'Email already exists',
        );
      }
    }

    // Merge allowed fields only
    if (dto.name !== undefined) user.name = dto.name;
    if (dto.email !== undefined) user.email = dto.email;
    if (dto.roles !== undefined)
      user.roles = Array.isArray(dto.roles) ? dto.roles : [dto.roles];

    const updated = await this.usersRepository.save(user);
    return UserMapper.toResponse(updated);
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
    await this.usersRepository.save(user);
    return { message: 'Password updated successfully' };
  }

  // Soft delete
  async remove(id: string) {
    const user = await this.findOrFail(id);
    await this.usersRepository.softRemove(user);
    return { message: 'User deleted successfully' };
  }

  // Restore
  async restore(id: string) {
    await this.usersRepository.restore(id);
    return { message: 'User restored' };
  }
}
