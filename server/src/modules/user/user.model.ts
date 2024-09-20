import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { User, UserBody, UserFilters } from '@/types/user';
import { Any } from '@/types/common';

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
    const query = this.queryBuilder(trx).select('*').from('users as u');

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

    return query;
  }

  static fetchUserDetails(filters: UserFilters, trx?: Knex.Transaction): Promise<User[]> {
    const query = this.baseQuery(trx);

    this.injectFilter(query, filters);

    console.log('query', query.toString());

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
      email: user.email,
      phone: user.phone,
      designation: user.designation,
      department: user.department,
      roles: user.role,
    };

    return data as User;
  }
}

export default UserModel;
