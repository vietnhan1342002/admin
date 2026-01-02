import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base/base.repository';
import { EmailVerificationToken } from '../entities/email.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class EmailRepository extends BaseRepository<EmailVerificationToken> {
  constructor(
    @InjectRepository(EmailVerificationToken)
    repo: Repository<EmailVerificationToken>,
    datasource: DataSource,
  ) {
    super(repo, datasource.createEntityManager());
  }

  async findTokenWithUser(filter: FindOptionsWhere<EmailVerificationToken>) {
    return this.repo.findOne({ where: filter, relations: ['user'] });
  }
}
