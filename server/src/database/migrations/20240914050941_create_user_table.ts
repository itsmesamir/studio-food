import { Knex } from 'knex';

exports.up = function (knex: Knex) {
  return knex.schema.createTable('users', function (table) {
    table.bigIncrements('id').primary().unsigned();
    table.string('name').notNullable();
    table.string('designation').notNullable();
    table.string('department').notNullable();

    table.string('email').unique().nullable(); // Email for login, only for authorized users
    table.string('password').nullable();
    table.boolean('is_login_enabled').defaultTo(false); // Indicates if the user can log in
    table.enu('role', ['user', 'staff', 'admin', 'manager']).defaultTo('user');

    table
      .specificType('created_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .nullable();

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

exports.down = function (knex: Knex) {
  return knex.schema.dropTable('users');
};
