import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { User, UserBody, UserFilters } from '@/types/user';
import { Any } from '@/types/common';
import { PaginationProps } from '@/types/pagination';

import db from '@/db';

class OrderModel extends BaseModel {
  static readonly table = 'user_orders';
  static readonly users = 'users';

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

  static baseQuery(trx?: Knex.Transaction): Knex.QueryBuilder {
    return this.queryBuilder(trx)
      .select({
        id: 'uo.id',
        userId: 'uo.user_id',
        mealType: 'uo.meal_type',
        orderTime: 'uo.order_time',
        createdAt: 'uo.created_at',
        createdBy: 'uo.created_by',
        updatedAt: 'uo.updated_at',
        updatedBy: 'uo.updated_by',
      })
      .from({ uo: this.table })
      .whereNull('uo.deletedAt')
      .orderBy('uo.created_at', 'desc');
  }

  static mapToModel(obj: Any) {
    return {
      id: obj.id,
      mealType: obj.mealType,
      orderTime: obj.orderTime,
      user: obj.userId && {
        id: obj.userId,
        name: obj.userName,
        designation: obj.userDesignation,
        department: obj.userDepartment,
      },
      createdAt: obj.createdAt,
      createdBy: obj.createdBy,
    };
  }

  static async fetchOrders(pagination: PaginationProps) {
    const query = this.baseQuery()
      .select({
        id: 'u.id',
        name: 'u.name',
        designation: 'u.designation',
        department: ' u.department',
      })
      .leftJoin({ u: this.users }, 'u.id', 'uo.user_id');

    console.log(query.toString());

    this.injectPagination(query, pagination);

    return query.then(q => this.mapToModel(q));
  }

  // static async create(order, query: Knex.QueryBuilder) {
  //   return this.queryBuilder().table(this.table).insert(order);
  // }

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

  static fetchOrderDetails(filters: UserFilters, trx?: Knex.Transaction): Promise<User[]> {
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
}

export default OrderModel;
