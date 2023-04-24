import UsersGroup from '../entities/UsersGroup'
import UsersGroupRepostory from '../repositories/UsersGroup'

export default class CreateUsersGroupUseCase {
  constructor(private readonly usersGroupRepostory: UsersGroupRepostory) {}

  async execute(usersGroup: UsersGroup, adminUserId: string) {
    usersGroup.users.push({
      id: adminUserId,
    })

    const data = new UsersGroup(usersGroup.name, usersGroup.users)

    data.segregateUsers(adminUserId)

    await this.usersGroupRepostory.createGroup(data)
  }
}
