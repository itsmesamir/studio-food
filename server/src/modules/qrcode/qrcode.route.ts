import { Router } from 'express';

import { validateReqBody } from '@/utils/validator';

import { Roles } from '@/types/common';

import { requireAuth } from '@/middlewares/auth';
import { authorizeWithRoles } from '@/middlewares/authorizeWIthRoles';

import * as qrcodeController from './qrcode.controller';

const router = Router();

// router to create a qr code

router.post('/', requireAuth, qrcodeController.generateQR);

export default router;
