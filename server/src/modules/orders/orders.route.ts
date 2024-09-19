import { Router } from 'express';

import { validateReqBody, validateReqQuery } from '@/utils/validator';

import { requireAuth } from '@/middlewares/auth';
import { authorizeAdmin } from '@/middlewares/authorizeWIthRoles';

import * as orderSchema from './orders.validator';
import * as orderController from './orders.controller';

const router = Router();

router.get(
  '/',
  requireAuth,
  authorizeAdmin,
  validateReqQuery(orderSchema.fetchOrder),
  orderController.fetchOrders
);

router.post('/', requireAuth, validateReqBody(orderSchema.create), orderController.createOrder);

export default router;
