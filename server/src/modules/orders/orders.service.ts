import { Knex } from 'knex';

import UserRolesModel from '@/modules/user/userRoles.model';

import logger from '@/services/logger';
import { getFromStore } from '@/services/store';

import { compareHash, generateHash } from '@/utils/crypto';

import { BadRequestError } from '@/errors/errors';

import { User, UserFilters } from '@/types/user';
import { Designation, Role, Roles, UserRole } from '@/types/common';

import db from '@/db';

import OrderModel from './orders.model';

const log = logger.withNamespace('modules/user.service');

/**
 * Fetch list of users.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const fetchOrders = async (
  filters: UserFilters,
  trx?: Knex.Transaction
): Promise<User[]> => {
  log.info('Fetching users');

  const users = await OrderModel.fetchOrderDetails(filters, trx);

  return users;
};
