import { Injectable } from '@nestjs/common';
import { BaseMapper } from 'src/common/base/base.mapper';
import { Group } from '../entities/group.entity';
import { ResponseGroupDto } from '../dto/response-group.dto';

@Injectable()
export class GroupMapper extends BaseMapper<Group, ResponseGroupDto> {
  toResponse(entity: Group): ResponseGroupDto {
    return {
      id: entity.id,
      value: entity.value,
      name: entity.name,
      icon: entity.icon || null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
