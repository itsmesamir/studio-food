import logger from '@/services/logger';

import { getPaginationOptions } from '@/utils/pagination';

import { PageProps } from '@/types/pagination';
import { Any } from '@/types/common';
import { OrderFilter, OrderProps } from '@/types/orders';

import { MealTypes } from '@/enums/orders';

import OrderModel from './orders.model';

const log = logger.withNamespace('modules/user.service');

/**
 * Fetch list of orders.
 *
 * @returns A promise that resolves to an array of order objects.
 */
export const fetchOrders = async (query: Any) => {
  log.info(`Fetching Orders ${JSON.stringify(query)}`);

  console.log('query', query);

  const { page, size } = query;

  const paginationOptions = getPaginationOptions({ page, size });

  const data = await OrderModel.fetchOrders(paginationOptions, query);

  return data;
};

/**
 * Create a new order.
 *
 * @returns A promise that resolves to the created order object.
 */
export const createOrder = async (data: Any) => {
  log.info('Creating Order');

  const order = await OrderModel.createOrder(data);

  return order;
};
