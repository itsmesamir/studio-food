import logger from '@/services/logger';

import { getPaginationOptions } from '@/utils/pagination';

import { PageProps } from '@/types/pagination';

import OrderModel from './orders.model';

const log = logger.withNamespace('modules/user.service');

/**
 * Fetch list of orders.
 *
 * @returns A promise that resolves to an array of order objects.
 */
export const fetchOrders = async (query: PageProps) => {
  log.info('Fetching Orders');

  const { page, size } = query;

  const paginationOptions = getPaginationOptions({ page, size });

  const data = await OrderModel.fetchOrders(paginationOptions);

  return data;
};

export const createOrder = async (req: Request, res: Response) => {
  log.info('Creating Order');

  // const { data } = OrderModel.create();
};
