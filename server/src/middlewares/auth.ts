import { Request, Response, NextFunction } from 'express';

import * as usersServices from '@/modules/user/user.service';

import { addToStore, getFromStore } from '@/services/store';

import { verify } from '@/utils/jwt';

import { UnauthorizedError } from '@/errors/errors';

import { User } from '@/types/user';

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.startsWith('Bearer ') && authHeader.split(' ')[1];

  if (!accessToken) {
    addToStore({ currentUser: null });

    next();

    return;
  }

  const userPayload = verify(accessToken) as { data: User };

  const user = await usersServices.fetchUserById(userPayload?.data.id);

  addToStore({ currentUser: user });

  next();
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const currentUser = getFromStore('currentUser');

  if (!currentUser) {
    throw new UnauthorizedError('Forbidden. User not authenticated.');
  }

  next();
};

export default authenticationMiddleware;
