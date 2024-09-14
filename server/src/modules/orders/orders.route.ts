import { Router } from 'express';

import { validateReqBody } from '@/utils/validator';

import { Roles } from '@/types/common';

import { requireAuth } from '@/middlewares/auth';
import { authorizeWithRoles } from '@/middlewares/authorizeWIthRoles';

import * as orderController from './orders.controller';
import * as orderValidator from './orders.validator';

const router = Router();

// TODO: use requireAuth
router.get('/', orderController.fetchOrders);

export default router;
