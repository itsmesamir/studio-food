import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { Any } from '@/types/common';

import dbTables from '@/constants/db';

class UserRoleModel extends BaseModel {
  static table = dbTables.userRoles;

  static baseQuery(trx?: Knex.Transaction) {
    const query = this.queryBuilder(trx)
      .select({
        id: 'r.id',
        name: 'r.name',
        userId: 'ur.userId',
        userRoleId: 'ur.id',
      })
      .from({ ur: this.table })
      .leftJoin('roles as r', 'ur.role_id', 'r.id');

    return query;
  }

  /**
   * Inject filter in query.
   *
   * @param {Knex.QueryBuilder} query
   * @param {FilterNotesParams} filters
   */
  static injectFilter(query: Knex.QueryBuilder, filters: Any) {
    if (filters?.id) {
      query.where('ur.id', filters.id);
    }

    if (filters?.roleId) {
      query.where('r.id', filters.roleId);
    }

    if (filters?.userId) {
      query.where('ur.userId', filters.userId);
    }

    return query;
  }

  static fetch(filters: Any, trx?: Knex.Transaction) {
    const query = this.baseQuery(trx);

    this.injectFilter(query, filters);

    return query;
  }

  static fetchById(id: number, filters: Any, trx?: Knex.Transaction) {
    const query = this.baseQuery(trx);

    this.injectFilter(query, { ...filters, id });

    query.first();
  }

  /**
   * Insert data into role table.
   *
   * @param {Partial<Any>} data
   * @param {Knex.Transaction} trx
   * @returns  {Knex.QueryBuilder<number[]>}
   */
  static insert(data: Any | Any[], trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  static deleteById(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).del();
  }
}

export default UserRoleModel;
