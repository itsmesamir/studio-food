import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { getFormattedDate } from '@/utils/data';

import { User, UserBody, UserFilters } from '@/types/user';
import { Any } from '@/types/common';
import { PaginationProps } from '@/types/pagination';

import db from '@/db';
import { YYYY_MM_DD, yyyy_MM_dd } from '@/constants/date';
import { Sort } from '@/constants/sortings';

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
        name: obj.name,
        designation: obj.designation,
        department: obj.department,
      },
      createdAt: obj.createdAt,
      createdBy: obj.createdBy,
    };
  }

  static injectSortBy(query: Knex.QueryBuilder, filter: Any) {
    const order = filter.order || Sort.Asc;

    query.orderBy('uo.created_at', order);
  }

  static async fetchOrders(pagination: PaginationProps, filter: Any) {
    const query = this.baseQuery()
      .select({
        name: 'u.name',
        designation: 'u.designation',
        department: ' u.department',
      })
      .leftJoin({ u: this.users }, 'u.id', 'uo.user_id');

    this.injectOrderFilter(query, filter);

    this.injectSortBy(query, filter);

    this.injectPagination(query, pagination);

    return query.then(q => q.map(this.mapToModel));
  }

  static async fetchOrdersCount(pagination: PaginationProps, filter: Any) {
    const query = this.baseQuery();
    query.clearSelect();
    query.count('* AS count').leftJoin({ u: this.users }, 'u.id', 'uo.user_id');

    this.injectOrderFilter(query, filter);

    return query.then(([result]: [{ count: number }]) => {
      return result?.count;
    });
  }

  static async createOrder({ userId, mealType }: { userId: number; mealType: string }) {
    const data = await db(this.table).insert({
      user_id: userId,
      meal_type: mealType,
      order_time: new Date(),
    });

    return data;
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

  /**
   * Inject filter in query.
   *
   * @param {Knex.QueryBuilder} query
   * @param {FilterNotesParams} filters
   */
  static injectOrderFilter(query: Knex.QueryBuilder, filters: Any) {
    console.log(
      'getFormattedDate(filters.date)',
      getFormattedDate(filters.date, YYYY_MM_DD),
      filters.date
    );
    if (filters?.mealType) {
      query.where('uo.meal_type', filters.mealType);
    }

    if (filters?.userIds) {
      query.whereIn('u.id', filters.userIds);
    }

    if (filters?.date) {
      query.whereRaw('CAST(uo.order_time AS DATE) = ?', [
        getFormattedDate(filters.date, YYYY_MM_DD),
      ]);
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
