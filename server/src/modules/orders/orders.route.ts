import { Router } from 'express';

import { validateReqQuery } from '@/utils/validator';

import { requireAuth } from '@/middlewares/auth';

import * as orderSchema from './orders.validator';
import * as orderController from './orders.controller';

const router = Router();

// TODO: use requireAuth
router.get('/', requireAuth, validateReqQuery(orderSchema.fetch), orderController.fetchOrders);

router.get('/', requireAuth, validateReqQuery(orderSchema.fetch), orderController.fetchOrders);

export default router;
