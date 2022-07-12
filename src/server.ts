import 'module-alias/register'
import 'dotenv/config'
import express from 'express'
import 'express-async-errors'

import errorHandler from './middlewares/errorHandler'
import { router } from './routes'
import mongoDbConnection from './config/databaseConfig'

async function main (): Promise<void> {
  await mongoDbConnection()

  const app = express()
  app.use(express.json())
  app.use(router)
  app.use(errorHandler)
  const port = 3000
  app.listen(port)
}

main().catch(err => console.log(err))
