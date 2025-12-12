import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from './IUserRepository';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}
  async create(userData: CreateUserDto): Promise<User> {
    const user = this.repo.create({
      ...userData,
      roles: Array.isArray(userData.roles) ? userData.roles : [userData.roles],
    });
    return this.repo.save(user);
  }
  async findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async save(user: User) {
    return this.repo.save(user);
  }
  async findByIdWithPassword(id: string) {
    return this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();
  }
}
