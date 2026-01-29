import { applyDecorators } from '@nestjs/common';
import { IsString } from 'class-validator';

export function RequiredString(label: string) {
  return applyDecorators(IsString({ message: `${label} phải là chuỗi` }));
}
