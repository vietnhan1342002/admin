import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { BaseRepository } from 'src/common/base/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async findByIdWithPassword(id: string) {
    return this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();
  }
}
