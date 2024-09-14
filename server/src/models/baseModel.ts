import { Knex } from 'knex';

import { Any } from '@/types/common';

import { PaginationProps } from 'types/pagination';
import db from 'db';

export function getConnectionOrTransaction(
  connection: Knex,
  trx?: Knex.Transaction
): Knex.Transaction | Knex {
  return trx || connection;
}

/**
 * Create a new model.
 */
class BaseModel {
  static connection: Knex = db;

  static getConnection(): Knex {
    return this.connection;
  }

  static queryBuilder(trx?: Knex.Transaction): Knex.Transaction | Knex {
    return getConnectionOrTransaction(db, trx);
  }

  static injectPagination(query: Knex.QueryBuilder, pagination: PaginationProps): void {
    const { limit, offset } = pagination;

    query.limit(limit).offset(offset);
  }

  static transaction<T>(callback: (trx: Knex.Transaction) => Promise<T>): Promise<T> {
    return this.connection.transaction(callback);
  }

  static async bulkInsertAndReturn(
    tableName: string,
    returnTypeList: string[],
    dataArray: Any[],
    trx?: Knex.Transaction
  ): Promise<Any[]> {
    return await this.queryBuilder(trx)
      .table(tableName)
      .insert(dataArray)
      .then(async () => {
        return await this.queryBuilder(trx)
          .table(tableName)
          .select(returnTypeList)
          .orderBy('createdAt', 'desc')
          .limit(dataArray.length);
      });
  }

  static async genericBulkInsert(tableName: string, dataArray: Any[], trx?: Knex.Transaction) {
    await this.queryBuilder(trx).table(tableName).insert(dataArray);
  }

  static async bulkConditionalUpdate(
    userNotesMap: Any,
    tableName: string,
    updateColumn: string[],
    trx?: Knex.Transaction
  ) {
    const updatePromises = userNotesMap.map(async ([key, value]: Any) => {
      return this.queryBuilder(trx)
        .table(tableName)
        .where(updateColumn[0], key)
        .update(updateColumn[1], value);
    });

    await Promise.all(updatePromises);
  }
}

export default BaseModel;
