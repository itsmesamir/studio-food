import { Router } from 'express';

import { validateReqQuery } from '@/utils/validator';

import * as orderSchema from 'schemas/order';
import * as orderController from 'controllers/order';

const router = Router();

/**
 * GET /api/orders
 */
router.get('/orders', validateReqQuery(orderSchema.fetch), orderController.getAllOrders);

export default router;
