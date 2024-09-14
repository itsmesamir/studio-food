import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { User, UserBody, UserFilters } from '@/types/user';
import { Any } from '@/types/common';

import db from '@/db';

class UserModel extends BaseModel {
  static table = 'users';

  /**
   * Insert data into user table.
   *
   * @param {Partial<UserBody>} data
   * @param {Knex.Transaction} trx
   * @returns  {Knex.QueryBuilder<number[]>}
   */
  static insert(data: { password: string } & UserBody, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  /**
   * Fetch users.
   *
   * @param {id} number
   * @param {Knex.Transaction} trx
   * @returns
   */
  static baseQuery(trx?: Knex.Transaction) {
    const rolesQuery = this.queryBuilder(trx)
      .from('user_roles as ur')
      .leftJoin('roles as r', 'ur.role_id', 'r.id')
      .select(
        'ur.user_id',
        db.raw("JSON_ARRAYAGG(JSON_OBJECT('id', r.id, 'name', r.name)) as roles")
      )
      .groupBy('ur.user_id');

    const query = this.queryBuilder(trx)
      .select(
        'u.id as id',
        'u.name as name',
        'u.email as email',
        'c.name as country',
        'u.department as department',
        'u.phone as phone',
        'u.designation_id as designationId',
        'd.id as designation_id',
        'd.name as designation_name',
        'roles.roles as roles',
        'm.id as manager_id',
        'm.name as manager_name'
      )
      .from('users as u')
      .leftJoin(rolesQuery.as('roles'), 'u.id', 'roles.user_id')
      .leftJoin('designations as d', 'u.designation_id', 'd.id')
      .leftJoin('countries as c', 'u.country_id', 'c.id')
      .leftJoin('users as m', 'u.manager_id', 'm.id');

    return query;
  }

  /**
   * Fetch users.
   *
   * @param {id} number
   * @param {Knex.Transaction} trx
   * @returns
   */
  static fetch(filter?: UserFilters, trx?: Knex.Transaction) {
    const query = this.queryBuilder(trx).select('*').from('users as u');

    this.injectFilter(query, filter);

    return query;
  }

  /**
   * Inject filter in query.
   *
   * @param {Knex.QueryBuilder} query
   * @param {FilterNotesParams} filters
   */
  static injectFilter(query: Knex.QueryBuilder, filters: UserFilters) {
    if (filters?.id) {
      query.where('u.id', filters.id);
    }

    if (filters?.email) {
      query.where('u.email', filters.email);
    }

    if (filters?.excludeIds) {
      query.whereNotIn(
        'u.id',
        filters.excludeIds?.split(',').map(id => parseInt(id, 10))
      );
    }

    if (filters?.role) {
      query.where(db.raw(`JSON_CONTAINS(roles.roles, JSON_OBJECT('name', ?))`, [filters.role]));
    }

    return query;
  }

  static fetchUserDetails(filters: UserFilters, trx?: Knex.Transaction): Promise<User[]> {
    const query = this.baseQuery(trx);

    this.injectFilter(query, filters);

    return query.then(res => res.map(this.mapToModel));
  }

  /**
   * Fetch users by id.
   *
   * @param {id} number
   * @param {Knex.Transaction} trx
   * @returns
   */
  static fetchById(id: number, trx?: Knex.Transaction) {
    const query = this.baseQuery(trx);

    this.injectFilter(query, { id });

    return query.first().then(this.mapToModel);
  }

  static update(userId: number, updatedData: Partial<UserBody>, trx?: Knex.Transaction) {
    const query = this.queryBuilder(trx).table(this.table).update(updatedData).where('id', userId);

    return query;
  }

  static softDelete(userId: number, currentUserId: number, trx?: Knex.Transaction) {
    const query = this.queryBuilder(trx)
      .table(this.table)
      .update({ deleted_at: 'now()', deleted_by: currentUserId })
      .where('id', userId);

    return query;
  }

  static mapToModel(user: Any): User {
    const data = user.id && {
      id: user.id,
      name: user.name,
      country: user.country,
      designationId: user.designationId,
      email: user.email,
      phone: user.phone,
      department: user.department,
      designation: user.designationId && {
        id: user.designationId,
        name: user.designationName,
      },
      manager: user.managerId && {
        id: user.managerId,
        name: user.managerName,
      },
      roles: user.roles,
    };

    return data as User;
  }
}

export default UserModel;
