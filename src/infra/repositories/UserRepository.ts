import { client } from '@/config/postgresConfig'
import User from '@/domain/entities/User'
import UserRepository from '@/domain/repositories/UserRepository'
export default class UserRepositoryImpl implements UserRepository {
  async save(user: User): Promise<Boolean> {
    const { id, name, email, password } = user

    const query = client('users').insert({ id, name, email, password })

    try {
      await query
      return true
    } catch (error) {
      return false
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await client('users')
      .select('id', 'password')
      .where('email', email)
      .first()

    return user
  }

  async findUserById(userId: string): Promise<User> {
    const user = await client('users')
      .select('name', 'email', 'id')
      .where('id', userId)
      .first()

    return user
  }
}
