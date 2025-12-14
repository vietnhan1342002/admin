import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { Repository } from 'typeorm';
import { Banner } from '../entities/banner.entity';

@Injectable()
export class BannerRepository extends BaseRepository<Banner> {
  constructor(@InjectRepository(Banner) repo: Repository<Banner>) {
    super(repo);
  }
}
