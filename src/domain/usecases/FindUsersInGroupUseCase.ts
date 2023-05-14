import UsersGroupRepostory from '../repositories/UsersGroup'
import { InternalServerError } from 'http-errors'
import User from '../entities/User'
export default class FindUsersInGroup {
  constructor(private readonly userRepository: UsersGroupRepostory) {}

  async execute(groupId: string): Promise<User[]> {
    try {
      return await this.userRepository.findUsersInGroup(groupId)
    } catch {
      throw InternalServerError()
    }
  }
}
