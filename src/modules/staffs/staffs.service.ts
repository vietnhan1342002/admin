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
import { User } from '../users/entities/user.entity';
import { StaffStatus } from './enum/staff.enum';
import { generateSlug } from 'src/shared/Helper/generate-slug.helper';
import { UsersService } from '../users/users.service';

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

    private readonly userService: UsersService,
  ) {
    super(repo, mapper, Resource.USER);
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
          buildCrudMessage(Resource.PHONE, CrudAction.ALREADY_EXISTS),
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
    const result = await this.repo.withTransaction(async (manager) => {
      const existedPhone = await manager.findOne(User, {
        where: { phone: data.user.phone, deletedAt: IsNull() },
      });

      if (existedPhone) {
        throw new ConflictException(
          buildCrudMessage(Resource.PHONE, CrudAction.ALREADY_EXISTS),
        );
      }

      const { user, token } = await this.userService.createUserInternal(
        manager,
        data.user,
      );

      const staff = await manager.save(Staff, {
        userId: user.id,
        position: data.position,
        status: StaffStatus.ACTIVE,
        slug: generateSlug(user.email),
        facility: data.facility,
        featured: data.featured ?? false,
        dateAdded: new Date(),
      });

      return { staff, user, token };
    });

    // ✅ SAU COMMIT → gửi mail
    await this.userService.sendVerifyEmail(result.user, result.token);

    return this.mapper.toResponse(result.staff);
  }
}
