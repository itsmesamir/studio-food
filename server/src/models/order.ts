import { Knex } from 'knex';

import { PaginationProps } from '@/types/pagination';
import { Any } from '@/types/common';

import db from 'db';

import BaseModel from './baseModel';

class Order extends BaseModel {
  static readonly userOrder = 'user_orders';
  static readonly users = 'users';

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
      .from({ uo: this.userOrder })
      .whereNull('uo.deletedAt')
      .orderBy('uo.created_at', 'desc');
  }

  static mapToModel(obj: Any) {
    return {
      id: obj.id,
      mealType: obj.mealType,
      orderTime: obj.orderTime,
      user: {
        id: obj.userId,
        name: obj.userName,
        designation: obj.userDesignation,
        department: obj.userDepartment,
      },
      createdAt: obj.createdAt,
      createdBy: obj.createdBy,
    };
  }

  static async getOrders(pagination: PaginationProps) {
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
}

export default Order;
