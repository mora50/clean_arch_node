import UsersGroup from '../entities/UsersGroup'
import UsersGroupRepostory from '../repositories/UsersGroup'

export default class CreateUsersGroupUseCase {
  constructor(private readonly usersGroupRepostory: UsersGroupRepostory) {}

  async execute(usersGroup: UsersGroup, adminUserId: string) {
    const ADMIN_ROLE_ID = '1'
    const GUEST_ROLE_ID = '2'

    usersGroup.users.push({
      id: adminUserId,
    })

    const data: UsersGroup = {
      name: usersGroup.name,
      users: usersGroup.users.map((user) => ({
        id: user.id,
        roleId: adminUserId === user.id ? ADMIN_ROLE_ID : GUEST_ROLE_ID,
      })),
    }

    console.log(data)

    await this.usersGroupRepostory.createGroup(data)
  }
}
