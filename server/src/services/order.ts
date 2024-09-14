import OrderModel from '@/models/order';

import { getPaginationOptions } from '@/utils/pagination';

import { PageProps } from '@/types/pagination';

import logger from './logger';

const log = logger.withNamespace('services/order');

export const getAllOrders = async (query: PageProps) => {
  log.info('Fetching Orders');

  const { page, size } = query;

  const paginationOptions = getPaginationOptions({ page, size });

  const data = await OrderModel.getOrders(paginationOptions);

  return data;
};
