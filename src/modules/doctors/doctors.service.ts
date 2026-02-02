import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { BaseService } from 'src/common/base/base.service';
import { Doctor } from './entities/doctor.entity';
import { ResponseDoctorDto } from './dto/response-doctor.dto';
import { DoctorRepository } from './repositories/doctor.repository';
import { DoctorMapper } from './mapper/doctor.mapper';
import { getEntityOrFail } from 'src/shared/utils/getEntityorFaild';
import { CrudAction, Resource } from 'src/shared/Enum/messages';
import { DataSource, EntityManager } from 'typeorm';
import { buildCrudMessage } from 'src/shared/Helper/message.helper';
import { generateSlug } from 'src/shared/Helper/generate-slug.helper';
import { SpecialtiesService } from '../specialties/specialties.service';
import { PaginationParams } from 'src/common/base/base.repository';
import { DoctorSpecialty } from '../specialties/entities/doctor-specialty.entity';

@Injectable()
export class DoctorsService extends BaseService<
  Doctor,
  CreateDoctorDto,
  UpdateDoctorDto,
  ResponseDoctorDto
> {
  constructor(
    private readonly repo: DoctorRepository,
    private readonly datasource: DataSource,
    private readonly specialtyService: SpecialtiesService,
    mapper: DoctorMapper,
  ) {
    super(repo, mapper, Resource.DOCTOR);
  }

  async generateUniqueSlug(
    name: string,
    manager?: EntityManager,
  ): Promise<string> {
    const baseSlug = generateSlug(name);
    let slug = baseSlug;
    let count = 1;

    const repo = manager ? manager.getRepository(Doctor) : this.repo;

    while (await repo.findOne({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    return slug;
  }

  protected async beforeCreate(
    data: CreateDoctorDto,
    manager?: EntityManager,
  ): Promise<void> {
    data.slug = await this.generateUniqueSlug(data.name, manager);

    await this.specialtyService.findById(data.specialty);
  }

  protected async afterCreate(
    entity: Doctor,
    data: CreateDoctorDto,
    manager?: EntityManager,
  ): Promise<void> {
    if (!data.specialty || !manager) return;

    await manager.insert(DoctorSpecialty, {
      doctor: { id: entity.id },
      specialty: { id: data.specialty },
    });
  }

  protected async beforeDelete(id: string): Promise<void> {
    await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.DOCTOR, CrudAction.NOT_FOUND),
    );

    // Có thể check business rule ở đây
  }

  override async findById(id: string) {
    return await super.findById(id, {
      relations: ['doctorSpecialties', 'doctorSpecialties.specialty'],
    });
  }

  override async findAll(pagination?: PaginationParams) {
    return super.findAll(pagination, {
      relations: ['doctorSpecialties', 'doctorSpecialties.specialty'],
    });
  }
}
