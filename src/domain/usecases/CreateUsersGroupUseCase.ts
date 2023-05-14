import UsersGroup from '../entities/UsersGroup'
import UsersGroupRepostory from '../repositories/UsersGroup'
import { InternalServerError } from 'http-errors'

export default class CreateUsersGroupUseCase {
  constructor(private readonly usersGroupRepostory: UsersGroupRepostory) {}

  async execute(usersGroup: UsersGroup, adminUserId: string) {
    usersGroup.users.push({
      id: adminUserId,
    })

    const data = new UsersGroup(usersGroup.name, usersGroup.users)

    data.segregateUsers(adminUserId)

    const createdGroup = await this.usersGroupRepostory.createGroup(data)

    if (createdGroup) {
      return createdGroup
    }

    throw InternalServerError()
  }
}
