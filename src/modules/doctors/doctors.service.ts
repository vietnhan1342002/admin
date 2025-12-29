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
import { IsNull } from 'typeorm';
import { buildCrudMessage } from 'src/shared/Helper/message.helper';
import { User } from '../users/entities/user.entity';
import { Staff } from '../staffs/entities/staff.entity';
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
    mapper: DoctorMapper,
  ) {
    super(repo, mapper);
  }

  override async create(dto: CreateDoctorDto) {
    return this.repo.withTransaction(async (manager) => {
      // 1️⃣ Create User

      const existedUser = await manager.findOne(User, {
        where: { email: dto.user.email, deletedAt: IsNull() },
      });

      if (existedUser) {
        throw new ConflictException(
          buildCrudMessage(Resource.USER, CrudAction.ALREADY_EXISTS),
        );
      }
      const user = manager.create(User, {
        email: dto.user.email,
        password: await hashPassword(dto.user.password),
        role: UserRole.STAFF,
        isActive: true,
      });
      const savedUser = await manager.save(user);

      const existedStaff = await manager.findOne(Staff, {
        where: { phone: dto.staff.phone, deletedAt: IsNull() },
      });

      if (existedStaff) {
        throw new ConflictException(
          buildCrudMessage(Resource.USER, CrudAction.ALREADY_EXISTS),
        );
      }
      // 2️⃣ Create Staff
      const staff = manager.create(Staff, {
        userId: savedUser.id,
        firstName: dto.staff.firstName,
        lastName: dto.staff.lastName,
        phone: dto.staff.phone,
        position: dto.staff.position,
        dateAdded: dto.staff.dateAdded,
      });
      const savedStaff = await manager.save(staff);

      // 3️⃣ Create Doctor
      const doctor = manager.create(Doctor, {
        staffId: savedStaff.id,
        degrees: dto.doctor.degrees,
        experience: dto.doctor.experience,
        specialty: dto.doctor.specialty,
        department: dto.doctor.department,
        status: DoctorStatus.ACTIVE,
        dateAdded: dto.doctor.dateAdded,
      });
      const savedDoctor = await manager.save(doctor);

      // 4️⃣ Update role cuối cùng
      savedUser.role = UserRole.DOCTOR;
      await manager.save(savedUser);

      const staffWithStaff = await manager.findOne(Doctor, {
        where: { id: savedDoctor.id },
        relations: {
          staff: {
            user: true,
          },
        },
      });
      return this.mapper.toResponse(staffWithStaff!);
    });
  }

  // protected async beforeUpdate(
  //   id: string,
  //   data: UpdateDoctorDto,
  // ): Promise<void> {
  //   const doctor = await getEntityOrFail(
  //     this.repo,
  //     id,
  //     buildCrudMessage(Resource.DOCTOR, CrudAction.NOT_FOUND),
  //   );

  // }

  protected async beforeDelete(id: string): Promise<void> {
    await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.DOCTOR, CrudAction.NOT_FOUND),
    );

    // Có thể check business rule ở đây
  }
}
