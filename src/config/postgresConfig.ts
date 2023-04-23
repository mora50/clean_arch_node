import Knex from 'knex'
import { knexSnakeCaseMappers } from 'objection'
const client = Knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE_NAME,
  },

  ...knexSnakeCaseMappers(),
})

export { client }
