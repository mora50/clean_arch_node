import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users_group', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
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
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users_group')
}
