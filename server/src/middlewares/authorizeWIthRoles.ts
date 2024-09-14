import { Request, Response, NextFunction } from 'express';

import * as userServices from '@/modules/user/user.service';

import { getFromStore } from '@/services/store';

import { BadRequestError, ForbiddenError } from '@/errors/errors';

import { User } from '@/types/user';

interface ExtraPrivilegeProps {
  req: Request;
  userId: number;
}

type ExtraPrivilege = ({ req, userId }: ExtraPrivilegeProps) => Promise<boolean>;

interface AuthorizeOptions {
  roles: string[];
  extraPrivilegePromises?: ExtraPrivilege[];
  selfAccessor?: string;
  isSelf?: boolean;
  userId?: number;
}

export const authorizeWithRoles = ({
  roles,
  extraPrivilegePromises = [],
  selfAccessor = 'userId',
  isSelf = false,
  userId,
}: AuthorizeOptions) => {
  return [
    async (req: Request, res: Response, next: NextFunction) => {
      const selfId: number =
        userId ||
        +(req.method === 'GET'
          ? req.params[selfAccessor] || req.query[selfAccessor]
          : req.body[selfAccessor]);

      const currentUser = getFromStore('currentUser') as User | undefined;

      if (isSelf && currentUser?.id && selfId === currentUser.id) {
        return next();
      }

      const userRoles = currentUser?.roles.map(role => role.name) || [];

      const isAuthorized = roles.some(role => userRoles.includes(role));

      if (isAuthorized) {
        return next();
      }

      if (!extraPrivilegePromises.length) {
        return next(new ForbiddenError('Forbidden'));
      }

      const extraPrivilegePromisesWithRequest = extraPrivilegePromises.map(extraPrivilege =>
        extraPrivilege({ req, userId: selfId })
      );

      try {
        const hasPrivilege = await Promise.all(extraPrivilegePromisesWithRequest);
        const isAuthorizedWithExtraPrivileges = hasPrivilege.some(privilege => privilege);

        if (isAuthorizedWithExtraPrivileges) {
          return next();
        }
      } catch (err) {
        return next(err);
      }

      next(new ForbiddenError('Forbidden'));
    },
  ];
};

export const authorizeUserManager = async ({
  req,
  userId,
}: ExtraPrivilegeProps): Promise<boolean> => {
  const currentUser = getFromStore('currentUser') as User | undefined;

  if (!currentUser) {
    return false;
  }

  try {
    const user = await userServices.fetchUserById(userId);

    return user.manager?.id === currentUser.id;
  } catch (error) {
    throw new BadRequestError(error);
  }
};
