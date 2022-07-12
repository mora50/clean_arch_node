import User from '../../domain/entities/User'
import UserRepository from '../../domain/repositories/UserRepository'
import { UserSchema } from '../schemas/UserSchema'

export default class UserRepositoryImpl implements UserRepository {
  async save (user: User): Promise<User> {
    throw new Error('Method not implemented.')
  }

  async findUserByEmail (email: String): Promise<User | null> {
    const userExists = await UserSchema.findOne({ email })

    return userExists
  }
}
