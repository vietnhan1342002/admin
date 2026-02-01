import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { DataSource, Repository } from 'typeorm';
import { Banner } from '../entities/banner.entity';

@Injectable()
export class BannerRepository extends BaseRepository<Banner> {
  constructor(
    @InjectRepository(Banner) repo: Repository<Banner>,
    datasource: DataSource,
  ) {
    super(repo, Banner, datasource.createEntityManager());
  }
  async findActive() {
    return this.repo
      .createQueryBuilder('banner')
      .where('banner.status = active')
      .orderBy('ASC')
      .getMany();
  }
}
