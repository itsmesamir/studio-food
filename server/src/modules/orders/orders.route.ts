import { Router } from 'express';

import { validateReqQuery } from '@/utils/validator';

import { requireAuth } from '@/middlewares/auth';

import * as orderSchema from './orders.validator';
import * as orderController from './orders.controller';

const router = Router();

// TODO: use requireAuth
router.get('/', validateReqQuery(orderSchema.fetch), orderController.fetchOrders);

router.post('/', requireAuth, validateReqQuery(orderSchema.create), orderController.createOrder);

export default router;
