import { NotFoundException } from '@nestjs/common';

export const getEntityOrFail = async <T>(
  repo: { findOne: (criteria: any) => Promise<T | null> },
  id: string,
  notFoundMessage: string,
): Promise<T> => {
  const entity = await repo.findOne({ id });
  if (!entity) {
    throw new NotFoundException(notFoundMessage);
  }
  return entity;
};
