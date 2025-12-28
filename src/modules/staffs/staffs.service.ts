import { ConflictException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Staff } from './entities/staff.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffResponseDto } from './dto/response-staff.dto';
import { StaffRepository } from './repositories/staff.repository';
import { StaffMapper } from './mapper/staff.mapper';
import { IsNull } from 'typeorm';
import { CrudAction, Resource } from 'src/shared/Enum/messages';
import { buildCrudMessage } from 'src/shared/Helper/message.helper';
import { getEntityOrFail } from 'src/shared/utils/getEntityorFaild';
import { UserRole } from '../users/enum/user-role.enum';
import { User } from '../users/entities/user.entity';
import { hashPassword } from 'src/shared/utils/hashPassword';
import { StaffStatus } from './enum/staff.enum';

@Injectable()
export class StaffsService extends BaseService<
  Staff,
  CreateStaffDto,
  UpdateStaffDto,
  StaffResponseDto
> {
  constructor(
    private readonly repo: StaffRepository,
    mapper: StaffMapper,
  ) {
    super(repo, mapper);
  }

  protected async beforeUpdate(
    id: string,
    data: UpdateStaffDto,
  ): Promise<void> {
    const staff = await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.USER, CrudAction.NOT_FOUND),
    );

    // Nếu update imageUrl → phải check unique
    if (data.phone && data.phone !== staff.phone) {
      const existed = await this.repo.findOne({
        phone: data.phone,
        deletedAt: IsNull(),
      });
      if (existed) {
        throw new ConflictException(
          buildCrudMessage(Resource.BANNER, CrudAction.ALREADY_EXISTS),
        );
      }
    }
  }

  protected async beforeDelete(id: string): Promise<void> {
    await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.USER, CrudAction.NOT_FOUND),
    );

    // Có thể check business rule ở đây
  }

  override async create(data: CreateStaffDto): Promise<StaffResponseDto> {
    return this.repo.withTransaction(async (manager) => {
      // 1️⃣ Check email user unique
      const existedUser = await manager.findOne(User, {
        where: { email: data.email, deletedAt: IsNull() },
      });

      if (existedUser) {
        throw new ConflictException(
          buildCrudMessage(Resource.USER, CrudAction.ALREADY_EXISTS),
        );
      }

      // 2️⃣ Create USER (auto STAFF)
      const user = manager.create(User, {
        email: data.email,
        password: await hashPassword(data.password),
        role: UserRole.STAFF,
        isActive: true,
      });

      const savedUser = await manager.save(user);

      // 3️⃣ Check phone staff unique
      const existedStaff = await manager.findOne(Staff, {
        where: { phone: data.phone, deletedAt: IsNull() },
      });

      if (existedStaff) {
        throw new ConflictException(
          buildCrudMessage(Resource.USER, CrudAction.ALREADY_EXISTS),
        );
      }

      // 4️⃣ Create STAFF
      const staff = manager.create(Staff, {
        userId: savedUser.id,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        position: data.position,
        status: StaffStatus.ACTIVE,
        dateAdded: new Date(),
      });

      const savedStaff = await manager.save(staff);

      const staffWithUser = await manager.findOne(Staff, {
        where: { id: savedStaff.id },
        relations: ['user'],
      });
      return this.mapper.toResponse(staffWithUser!);
    });
  }
}
