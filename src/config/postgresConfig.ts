import Knex from 'knex'
import { knexSnakeCaseMappers } from 'objection'

const client = Knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
  searchPath: ['public'],
})

export { client }
