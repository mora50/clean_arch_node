import 'dotenv/config'
import express from 'express'
import 'express-async-errors'

import errorHandler from '../middlewares/errorHandler'
import { router } from './routes'

async function main(): Promise<void> {
  //  await mongoDbConnection()

  const app = express()
  app.use(express.json())

  app.use(router)
  app.use(errorHandler)
  const port = process.env.PORT || 3000
  app.listen(port, () => console.log('server is running'))
}

main()
