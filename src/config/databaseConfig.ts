import mongoose from 'mongoose'

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ufkvcxx.mongodb.net/?retryWrites=true&w=majority`

const mongoDbConnection = async (): Promise<void> =>
  await mongoose.connect(uri).then(() => {
    console.log('connected to bd')
  })

export default mongoDbConnection
