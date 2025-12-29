import { ConflictException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Staff } from './entities/staff.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffResponseDto } from './dto/response-staff.dto';
import { StaffRepository } from './repositories/staff.repository';
import { StaffMapper } from './mapper/staff.mapper';
import { DataSource, IsNull } from 'typeorm';
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
    private readonly dataSource: DataSource,

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
    if (data.user?.phone && data.user.phone !== staff.user.phone) {
      const existedPhone = await this.dataSource.getRepository(User).findOne({
        where: {
          phone: data.user.phone,
          deletedAt: IsNull(),
        },
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
      buildCrudMessage(Resource.USER, CrudAction.NOT_FOUND),
    );

    // Có thể check business rule ở đây
  }

  override async create(data: CreateStaffDto): Promise<StaffResponseDto> {
    return this.repo.withTransaction(async (manager) => {
      // 1️⃣ Check email user unique
      console.log(data.user.email);

      const existedUser = await manager.findOne(User, {
        where: { email: data.user.email, deletedAt: IsNull() },
      });

      if (existedUser) {
        throw new ConflictException(
          buildCrudMessage(Resource.USER, CrudAction.ALREADY_EXISTS_EMAIL),
        );
      }

      // 3️⃣ Check phone staff unique
      const existedPhone = await manager.findOne(User, {
        where: { phone: data.user.phone, deletedAt: IsNull() },
      });

      if (existedPhone) {
        throw new ConflictException(
          buildCrudMessage(Resource.USER, CrudAction.ALREADY_EXISTS_PHONE),
        );
      }

      // 2️⃣ Create USER (auto STAFF)
      const user = manager.create(User, {
        email: data.user.email,
        password: await hashPassword(data.user.password),
        role: UserRole.STAFF,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        avatarUrl: data.user.avatarUrl,
        phone: data.user.phone,
        isActive: true,
      });

      const savedUser = await manager.save(user);

      // 4️⃣ Create STAFF
      const staff = manager.create(Staff, {
        userId: savedUser.id,
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
