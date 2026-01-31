// src/modules/specialties/specialties.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Specialty } from './entities/specialty.entity';
import { SpecialtyRepository } from './repositories/specialty.repository';
import { SpecialtyMapper } from './mapper/specialty.mapper';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { ResponseSpecialtyDto } from './dto/response-specialty.dto';
import { buildCrudMessage } from 'src/shared/Helper/message.helper';
import { CrudAction, Resource } from 'src/shared/Enum/messages';
import { DepartmentsService } from '../departments/departments.service';

@Injectable()
export class SpecialtiesService extends BaseService<
  Specialty,
  CreateSpecialtyDto,
  UpdateSpecialtyDto,
  ResponseSpecialtyDto
> {
  constructor(
    private readonly repo: SpecialtyRepository,
    private readonly deparmentService: DepartmentsService,
    mapper: SpecialtyMapper,
  ) {
    super(repo, mapper, Resource.SPECIALTY);
  }

  protected async beforeCreate(data: CreateSpecialtyDto): Promise<void> {
    await this.deparmentService.findById(data.departmentId);
    const existed = await this.repo.findOne({ name: data.name });
    if (existed) {
      throw new BadRequestException(
        buildCrudMessage(Resource.SPECIALTY, CrudAction.ALREADY_EXISTS),
      );
    }
  }
}
