/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import {
  BaseRepository,
  PaginatedResult,
  PaginationParams,
} from 'src/common/base/base.repository';
import { Doctor } from '../entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DoctorRepository extends BaseRepository<Doctor> {
  constructor(
    @InjectRepository(Doctor) repo: Repository<Doctor>,
    private readonly dataSource: DataSource,
  ) {
    super(repo, dataSource.createEntityManager());
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResult<Doctor>> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;

    const qb = this.repo
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.staff', 'staff')
      .leftJoinAndSelect('staff.user', 'user')
      .where('doctor.deletedAt IS NULL')
      .distinct(true);

    // filter
    if (params?.filter?.doctorStatus) {
      qb.andWhere('doctor.status = :doctorStatus', {
        doctorStatus: params.filter.doctorStatus,
      });
    }

    if (params?.filter?.staffStatus) {
      qb.andWhere('staff.status = :staffStatus', {
        staffStatus: params.filter.staffStatus,
      });
    }

    // sort
    const sortByMap: Record<string, string> = {
      createdAt: 'doctor.createdAt',
      staffCreatedAt: 'staff.createdAt',
    };

    const sortField =
      sortByMap[params?.sortBy ?? 'createdAt'] ?? 'doctor.createdAt';

    qb.orderBy(sortField, params?.order ?? 'DESC');

    // pagination
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

  async findById(id: string): Promise<Doctor | null> {
    const doctor = await this.repo.findOne({
      where: { id },
      relations: {
        staff: {
          user: true,
        },
      },
    });

    return doctor;
  }
}
