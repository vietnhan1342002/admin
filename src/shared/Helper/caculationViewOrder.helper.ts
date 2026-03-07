import { Banner } from 'src/modules/banner/entities/banner.entity';

export const ORDER_STEP = 100;

export const calculateOrder = (prev?: Banner | null, next?: Banner | null) => {
  if (!prev && !next) return ORDER_STEP;

  if (!prev && next) return Number(next.viewOrder) - ORDER_STEP;

  if (prev && !next) return Number(prev.viewOrder) + ORDER_STEP;

  return (Number(prev!.viewOrder) + Number(next!.viewOrder)) / 2;
};
