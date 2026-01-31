// src/modules/specialties/dto/create-specialty.dto.ts
import { IsUUID } from 'class-validator';
import { Required } from 'src/common/decorators/require.decorator';
import { RequiredString } from 'src/common/decorators/string.decorator';

export class CreateSpecialtyDto {
  @RequiredString('Chuyên khoa')
  @Required('Chuyên khoa')
  value: string;

  @Required('Tên chuyên khoa')
  @RequiredString('Tên chuyên khoa')
  name: string;

  @Required('Tên phòng ban')
  @IsUUID()
  departmentId: string;
}
