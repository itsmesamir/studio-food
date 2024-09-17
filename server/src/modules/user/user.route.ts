import { Router } from 'express';

import { validateReqBody } from '@/utils/validator';

import { Roles } from '@/types/common';

import { requireAuth } from '@/middlewares/auth';
import { authorizeWithRoles } from '@/middlewares/authorizeWIthRoles';

import * as userController from './user.controller';
import * as userValidator from './user.validator';

const router = Router();

router.post('/signin', validateReqBody(userValidator.signInSchema), userController.signIn);

router.post('/signup', validateReqBody(userValidator.signUpSchema), userController.signUp);

router.post('/signout', userController.signOut);

router.get('/', userController.fetchUsers);

router.get('/currentuser', userController.fetchCurrentUser);

router.get('/:id', requireAuth, userController.fetchUserById);

router.put(
  '/:id',
  validateReqBody(userValidator.updateUserSchema),
  requireAuth,
  authorizeWithRoles({
    roles: [Roles.ADMIN],
    isSelf: true,
    selfAccessor: 'id',
  }),
  userController.updateUserById
);

export default router;
