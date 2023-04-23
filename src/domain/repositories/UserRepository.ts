import User from '../entities/User'

export default interface UserRepository {
  save: (user: User) => Promise<Boolean>
  findUserByEmail: (email: String) => Promise<User | null>
  findUserById: (userId: String) => Promise<User | null>
}
