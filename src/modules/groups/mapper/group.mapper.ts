import { Injectable } from '@nestjs/common';
import { BaseMapper } from 'src/common/base/base.mapper';
import { Group } from '../entities/group.entity';
import { ResponseGroupDto, ResponseGroupsDto } from '../dto/response-group.dto';

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
  toGroupTreeResponse(groups: Group[]): ResponseGroupsDto[] {
    return groups.map((group) => ({
      id: group.id,
      value: group.value,
      name: group.name,
      icon: group.icon || null,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,

      departments:
        group.departments?.map((dept) => ({
          id: dept.id,
          value: dept.value,
          name: dept.name,
          icon: dept.icon ?? null,
          createdAt: dept.createdAt,
          updatedAt: dept.updatedAt,
          groupId: dept.groupId ?? null,

          specialties:
            dept.specialties?.map((sp) => ({
              id: sp.id,
              value: sp.value,
              name: sp.name,
              departmentId: sp.departmentId,
              createdAt: sp.createdAt,
              updatedAt: sp.updatedAt,

              doctors:
                sp.doctors?.map((doc) => ({
                  id: doc.id,
                  name: doc.name,
                  avatar: doc.avatar,
                  slug: doc.slug,
                  featured: doc.featured,
                })) || [],
            })) || [],
        })) || [],
    }));
  }
}
