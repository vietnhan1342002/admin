import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { BaseService } from 'src/common/base/base.service';
import { Doctor } from './entities/doctor.entity';
import { ResponseDoctorDto } from './dto/response-doctor.dto';
import { DoctorRepository } from './repositories/doctor.repository';
import { DoctorMapper } from './mapper/doctor.mapper';
import { getEntityOrFail } from 'src/shared/utils/getEntityorFaild';
import { CrudAction, Resource } from 'src/shared/Enum/messages';
import { IsNull, Not } from 'typeorm';
import { buildCrudMessage } from 'src/shared/Helper/message.helper';

@Injectable()
export class DoctorsService extends BaseService<
  Doctor,
  CreateDoctorDto,
  UpdateDoctorDto,
  ResponseDoctorDto
> {
  constructor(
    private readonly repo: DoctorRepository,
    mapper: DoctorMapper,
  ) {
    super(repo, mapper);
  }

  protected async beforeCreate(_data: CreateDoctorDto): Promise<void> {
    const existedEmail = await this.repo.findOne({
      contactEmail: _data.contactEmail,
      deletedAt: IsNull(),
    });

    const existedPhone = await this.repo.findOne({
      contactPhone: _data.contactPhone,
      deletedAt: IsNull(),
    });

    if (existedEmail || existedPhone) {
      {
        throw new ConflictException(
          buildCrudMessage(Resource.DOCTOR, CrudAction.ALREADY_EXISTS),
        );
      }
    }
  }

  protected async beforeUpdate(
    id: string,
    data: UpdateDoctorDto,
  ): Promise<void> {
    const doctor = await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.DOCTOR, CrudAction.NOT_FOUND),
    );

    if (data.contactEmail && data.contactEmail !== doctor.contactEmail) {
      const existed = await this.repo.findOne({
        contactEmail: data.contactEmail,
        deletedAt: IsNull(),
        id: Not(id),
      });

      if (existed) {
        throw new ConflictException(
          buildCrudMessage(Resource.DOCTOR, CrudAction.ALREADY_EXISTS),
        );
      }
    }

    if (data.contactPhone && data.contactPhone !== doctor.contactPhone) {
      const existed = await this.repo.findOne({
        contactPhone: data.contactPhone,
        deletedAt: IsNull(),
        id: Not(id),
      });

      if (existed) {
        throw new ConflictException(
          buildCrudMessage(Resource.DOCTOR, CrudAction.ALREADY_EXISTS),
        );
      }
    }
  }

  protected async beforeDelete(id: string): Promise<void> {
    await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.DOCTOR, CrudAction.NOT_FOUND),
    );

    // Có thể check business rule ở đây
  }
}
