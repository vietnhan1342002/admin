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
import { DataSource, IsNull } from 'typeorm';
import { buildCrudMessage } from 'src/shared/Helper/message.helper';
import { User } from '../users/entities/user.entity';
import { hashPassword } from 'src/shared/utils/hashPassword';
import { UserRole } from '../users/enum/user-role.enum';
import { DoctorStatus } from './enum/doctor.enum';

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

  override async create(dto: CreateDoctorDto) {
    return this.repo.withTransaction(async (manager) => {
      //Create User

      const existedEmail = await manager.findOne(User, {
        where: { email: dto.user.email, deletedAt: IsNull() },
      });

      if (existedEmail) {
        throw new ConflictException(
          buildCrudMessage(Resource.USER, CrudAction.ALREADY_EXISTS_EMAIL),
        );
      }

      const existedPhone = await manager.findOne(User, {
        where: { phone: dto.user.phone, deletedAt: IsNull() },
      });

      if (existedPhone) {
        throw new ConflictException(
          buildCrudMessage(Resource.USER, CrudAction.ALREADY_EXISTS_PHONE),
        );
      }
      const user = manager.create(User, {
        email: dto.user.email,
        password: await hashPassword(dto.user.password),
        role: UserRole.DOCTOR,
        firstName: dto.user.firstName,
        lastName: dto.user.lastName,
        avatarUrl: dto.user.avatarUrl,
        phone: dto.user.phone,
        isActive: true,
      });

      const savedUser = await manager.save(user);

      //Create Doctor
      const doctor = manager.create(Doctor, {
        userId: savedUser.id,
        degrees: dto.doctor.degrees,
        experience: dto.doctor.experience,
        specialty: dto.doctor.specialty,
        department: dto.doctor.department,
        status: DoctorStatus.ACTIVE,
        dateAdded: dto.doctor.dateAdded,
      });
      const savedDoctor = await manager.save(doctor);

      await manager.save(savedUser);

      const doctorWithUser = await manager.findOne(Doctor, {
        where: { id: savedDoctor.id },
        relations: {
          user: true,
        },
      });
      return this.mapper.toResponse(doctorWithUser!);
    });
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
    if (data.user?.phone && data.user.phone !== doctor.user.phone) {
      const existedPhone = await this.datasource.getRepository(User).findOne({
        where: { phone: data.user.phone, deletedAt: IsNull() },
      });

      if (existedPhone) {
        throw new ConflictException(
          buildCrudMessage(Resource.USER, CrudAction.ALREADY_EXISTS_PHONE),
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
