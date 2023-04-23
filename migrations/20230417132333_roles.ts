import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('roles', function (table) {
    table.increments('id').primary()
    table.string('role_name').notNullable()
  })

  await knex('roles').insert([{ role_name: 'admin' }, { role_name: 'guest' }])
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('roles')
}
