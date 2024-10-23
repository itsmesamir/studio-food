import logger from '@/services/logger';

import { getMeta, getPaginationOptions } from '@/utils/pagination';

import { BadRequestError } from '@/errors/errors';

import { PageProps } from '@/types/pagination';
import { Any } from '@/types/common';
import { OrderFilter, OrderProps } from '@/types/orders';

import { MealTypes } from '@/enums/orders';

import OrderModel from './orders.model';
import UserModel from '../user/user.model';

const log = logger.withNamespace('modules/user.service');

/**
 * Fetch list of orders.
 *
 * @returns A promise that resolves to an array of order objects.
 */
export const fetchOrders = async (query: Any) => {
  log.info(`Fetching Orders ${JSON.stringify(query)}`);

  const { page, size } = query;

  const paginationOptions = getPaginationOptions({ page, size });

  const projectsDataPromise = OrderModel.fetchOrders(paginationOptions, query);

  const projectsDataCountPromise = OrderModel.fetchOrdersCount(paginationOptions, query);

  const [data, count] = await Promise.all([projectsDataPromise, projectsDataCountPromise]);

  const meta = getMeta({ page, size }, count);

  return { data, meta };
};

/**
 * Create a new order.
 *
 * @returns A promise that resolves to the created order object.
 */
export const createOrder = async (data: Any) => {
  log.info('Creating Order');

  const { userId, mealType } = data;

  const existingOrder = await fetchOrders({ userIds: userId, mealType, date: new Date() });
  const [allowedMultipleOrderUser] = await UserModel.fetch({ email: 'krishnatamang@gmail.com' });

  if (existingOrder.data.length > 0 && userId !== allowedMultipleOrderUser.id) {
    throw new BadRequestError(
      `Order already exists for user ${userId} and meal type ${mealType} on ${new Date().toDateString()}`
    );
  }

  const order = await OrderModel.createOrder(data);

  return order;
};
