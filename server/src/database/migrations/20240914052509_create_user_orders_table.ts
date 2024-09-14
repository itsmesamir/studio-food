import type { Knex } from 'knex';

exports.up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable('user_orders', function (table) {
    table.bigIncrements('id').primary().unsigned();
    table.integer('user_id').unsigned().notNullable();
    table.enu('meal_type', ['Breakfast', 'Lunch', 'Dinner', 'Midnight Snack']).notNullable();
    table.timestamp('order_time').defaultTo(knex.fn.now());

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at');

    table
      .specificType('updated_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .nullable();

    table.timestamp('deleted_at').nullable();

    table
      .specificType('deleted_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .unsigned()
      .nullable();
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_orders');
};
