import { Injectable } from '@nestjs/common';
import {
  BaseRepository,
  PaginatedResult,
  PaginationParams,
} from 'src/common/base/base.repository';
import { Staff } from '../entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class StaffRepository extends BaseRepository<Staff> {
  constructor(
    @InjectRepository(Staff) repo: Repository<Staff>,
    private readonly dataSource: DataSource,
  ) {
    super(repo, Staff, dataSource.createEntityManager());
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResult<Staff>> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;

    const qb = this.repo
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.user', 'user')
      .where('staff.deletedAt IS NULL')
      .distinct(true);

    // filter
    if (params?.filter?.status) {
      qb.andWhere('staff.status = :status', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        status: params.filter.status,
      });
    }

    // sort
    qb.orderBy('staff.createdAt', params?.order ?? 'DESC');

    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<Staff | null> {
    const doctor = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });
    return doctor;
  }
}
