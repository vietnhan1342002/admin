// src/modules/departments/departments.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Department } from './entities/department.entity';
import { DepartmentRepository } from './repositories/department.repository';
import { DepartmentMapper } from './mapper/department.mapper';
import { ResponseDepartmentDto } from './dto/response-department.dto';
import { getEntityOrFail } from 'src/shared/utils/getEntityorFaild';
import { buildCrudMessage } from 'src/shared/Helper/message.helper';
import { CrudAction, Resource } from 'src/shared/Enum/messages';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService extends BaseService<
  Department,
  CreateDepartmentDto,
  UpdateDepartmentDto,
  ResponseDepartmentDto
> {
  constructor(
    private readonly repo: DepartmentRepository,
    mapper: DepartmentMapper,
  ) {
    super(repo, mapper, Resource.DEPARTMENT);
  }
  protected async beforeCreate(data: CreateDepartmentDto) {
    const existed = await this.repo.findOne({ name: data.name });
    if (existed) {
      throw new BadRequestException(
        buildCrudMessage(Resource.DEPARTMENT, CrudAction.ALREADY_EXISTS),
      );
    }
  }

  protected async beforeDelete(id: string): Promise<void> {
    await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.DEPARTMENT, CrudAction.NOT_FOUND),
    );
  }
}
