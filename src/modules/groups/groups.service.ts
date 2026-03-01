import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { CrudAction, Resource } from 'src/shared/Enum/messages';
import { buildCrudMessage } from 'src/shared/Helper/message.helper';
import { getEntityOrFail } from 'src/shared/utils/getEntityorFaild';
import { Group } from './entities/group.entity';
import { GroupMapper } from './mapper/group.mapper';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ResponseGroupDto, ResponseGroupsDto } from './dto/response-group.dto';
import { GroupRepository } from './repositories/group.repository';
import { IsNull } from 'typeorm';

@Injectable()
export class GroupsService extends BaseService<
  Group,
  CreateGroupDto,
  UpdateGroupDto,
  ResponseGroupDto,
  GroupMapper
> {
  constructor(
    private readonly repo: GroupRepository,
    mapper: GroupMapper,
  ) {
    super(repo, mapper, Resource.GROUP);
  }

  protected async beforeCreate(data: CreateGroupDto) {
    const existed = await this.repo.findOne({
      name: data.name,
      deletedAt: IsNull(),
    });
    if (existed) {
      throw new BadRequestException(
        buildCrudMessage(Resource.GROUP, CrudAction.ALREADY_EXISTS),
      );
    }
  }

  protected async beforeDelete(id: string): Promise<void> {
    await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.GROUP, CrudAction.NOT_FOUND),
    );
  }

  async findTree(): Promise<ResponseGroupsDto[]> {
    const groups = await this.repo.findTree();
    return this.mapper.toGroupTreeResponse(groups);
  }
}
