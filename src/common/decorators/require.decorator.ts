import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

export function Required(label: string) {
  return applyDecorators(
    IsNotEmpty({ message: `${label} không được để trống` }),
  );
}
