import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users_group', function (table) {
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table
      .integer('role_id')
      .notNullable()
      .references('id')
      .inTable('roles')
      .onDelete('CASCADE')
    table.string('name').notNullable()
    table.primary(['user_id', 'role_id'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users_group')
}
