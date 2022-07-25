import User from '../entities/User'

export default interface UserRepository {
  save: (user: User) => Promise<User>
  findUserByEmail: (email: String) => Promise<User | null>
  findUserById: (userId: String) => Promise<User | null>
}
