import UsersGroupRepostory from '../repositories/UsersGroup'
import { InternalServerError } from 'http-errors'
import UsersGroup from '../entities/UsersGroup'
import { Forbidden } from 'http-errors'
export default class RemoveUserFromGroupUseCase {
  constructor(private readonly userRepository: UsersGroupRepostory) {}

  async execute(userId: string): Promise<void> {
    const [user] = await this.userRepository.findUsersInGroup(userId)

    if (user.role != UsersGroup.ADMIN_ROLE_ID) {
      throw Forbidden()
    }

    const hasRemovedUser = await this.userRepository.removeUserFromGroup(userId)

    if (hasRemovedUser) {
      return
    }

    throw InternalServerError()
  }
}
