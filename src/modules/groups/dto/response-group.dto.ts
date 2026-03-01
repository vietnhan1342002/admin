import { Type } from 'class-transformer';
import { ResponseDepartmentGroupDto } from 'src/modules/departments/dto/response-department.dto';

export class ResponseGroupDto {
  id: string;
  value: string;
  name: string;
  icon: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class ResponseGroupsDto {
  id: string;
  value: string;
  name: string;
  icon: string | null;
  createdAt: Date;
  updatedAt: Date;

  @Type(() => ResponseDepartmentGroupDto)
  departments: ResponseDepartmentGroupDto[];
}
