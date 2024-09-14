import { Knex } from 'knex';

import UserRolesModel from '@/modules/user/userRoles.model';

import logger from '@/services/logger';
import { getFromStore } from '@/services/store';

import { compareHash, generateHash } from '@/utils/crypto';

import { BadRequestError } from '@/errors/errors';

import { User, UserFilters } from '@/types/user';
import { Designation, Role, Roles, UserRole } from '@/types/common';

import db from '@/db';

import UserModel from './user.model';

const log = logger.withNamespace('modules/user.service');

/**
 * Fetch list of users.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const fetchUsers = async (filters: UserFilters, trx?: Knex.Transaction): Promise<User[]> => {
  log.info('Fetching users');

  const users = await UserModel.fetchUserDetails(filters, trx);

  return users;
};

/**
 * Fetch list of users.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const fetchUserById = async (id: number, trx?: Knex.Transaction): Promise<User> => {
  log.info('Fetching users');

  const user = (await UserModel.fetchById(id, trx)) as User;

  return user;
};

/**
 * Fetch current user.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const getCurrentUser = async (): Promise<User | null> => {
  log.info('Fetching current user.');

  return getFromStore('currentUser') || null;
};

/**
 * Fetch current user.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const fetchCurrentUser = async (): Promise<User | null> => {
  log.info('Fetching current user.');

  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return null;
  }

  return UserModel.fetchById(currentUser?.id);
};

/**
 * Sign in the user.
 *
 * @param body - The user object containing the sign in details
 * @returns A promise that resolves when the user is signed in.
 */
export const signIn = async (body: { email: string; password: string }): Promise<User> => {
  log.info(`Signing in user with email: ${body.email}`);

  console.log(body);

  const [existingUser] = await UserModel.fetch({ email: body.email });

  console.log({ existingUser });

  if (!existingUser) {
    throw new BadRequestError('User not found.');
  }

  if (!compareHash(body.password, existingUser.password)) {
    throw new BadRequestError('Email or password does not match.');
  }

  const [user] = await UserModel.fetchUserDetails({ email: body.email });

  return user;
};

/**
 * Sign up a new user.
 *
 * @param user - The user object containing the sign up details.
 * @returns A promise that resolves when the user is signed up.
 */
export const signUp = async (userBody: { password: string } & Omit<User, 'id'>): Promise<User> => {
  log.info(`Signing up new user: ${userBody.email}`);

  const hashedPassword = await generateHash(userBody.password);

  const [existingUser] = await UserModel.fetchUserDetails({ email: userBody.email });

  if (existingUser) {
    throw new BadRequestError('User with email already exists.');
  }

  const insertedUserId = await db.transaction(async (trx: Knex.Transaction): Promise<number> => {
    const [userId] = await UserModel.insert({ ...userBody, password: hashedPassword }, trx);

    return userId;
  });

  const user = await UserModel.fetchById(insertedUserId);

  return user;
};

/**
 * Fetch list of users.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const fetchUserRolesByUserId = async (
  userId: number,
  trx?: Knex.Transaction
): Promise<Role[]> => {
  log.info('Fetching users');

  const roles = (await UserRolesModel.fetch({ userId }, trx)) as Role[];

  return roles;
};

async function updateRoles(
  newRoles: Role[],
  userRoles: UserRole[],
  userId: number,
  trx: Knex.Transaction
): Promise<void> {
  const currentUser = await getCurrentUser();
  const toCreate = newRoles.filter(role => !userRoles.find(r => r.id === role.id));
  const toDelte = userRoles.filter(role => !newRoles.find(r => r.id === role.id));

  if (toCreate.length) {
    await UserRolesModel.insert(
      toCreate.map(data => ({ roleId: data.id, userId, createdBy: currentUser.id })),
      trx
    );
  }

  if (toDelte.length) {
    toDelte.map(async data => await UserRolesModel.deleteById(data.userRoleId, trx));
  }

  return;
}

/**
 * Update the user.
 *
 * @param id - The ID of the user to update.
 * @param userBody - The user object containing the updated details.
 * @returns A promise that resolves when the user is updated.
 */
export const updateUserById = async (id: number, body: Partial<User>): Promise<User> => {
  log.info(`Updating user with ID: ${id}`);

  const { roleIds, ...userBody } = body;

  const { designationId, managerId } = userBody;

  const [existingUser] = await UserModel.fetchUserDetails({ id });

  if (!existingUser) {
    throw new BadRequestError('User not found.');
  }

  await db.transaction(async trx => {
    const userId = await UserModel.update(id, userBody, trx);

    return userId;
  });

  const user = await UserModel.fetchById(id);

  return user;
};
