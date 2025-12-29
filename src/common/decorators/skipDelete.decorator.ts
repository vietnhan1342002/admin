import { SetMetadata } from '@nestjs/common';

export const SKIP_DELETE = 'SKIP_DELETE';
export const SkipDelete = () => SetMetadata(SKIP_DELETE, true);
