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
import { DataSource } from 'typeorm';
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
    private readonly datasource: DataSource,
    mapper: DoctorMapper,
  ) {
    super(repo, mapper);
  }

  protected async beforeCreate(_data: CreateDoctorDto): Promise<void> {
    const doctorEmail = await this.repo.findOne({ email: _data.email });
    const doctorPhone = await this.repo.findOne({ phone: _data.phone });

    if (doctorEmail) {
      throw new ConflictException(
        buildCrudMessage(Resource.EMAIL, CrudAction.ALREADY_EXISTS),
      );
    }

    if (doctorPhone) {
      throw new ConflictException(
        buildCrudMessage(Resource.PHONE, CrudAction.ALREADY_EXISTS),
      );
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
