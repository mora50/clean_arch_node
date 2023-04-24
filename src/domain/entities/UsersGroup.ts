import BaseEntity from './BaseEntities'

interface UserGroup {
  id: string
  roleId?: string
}

export default class UsersGroup extends BaseEntity {
  ADMIN_ROLE_ID = '1'
  GUEST_ROLE_ID = '2'

  constructor(public name: string, public users: UserGroup[]) {
    super()
  }

  segregateUsers(adminUserId: string) {
    this.users = this.users.map((user) => ({
      id: user.id,
      roleId: adminUserId === user.id ? this.ADMIN_ROLE_ID : this.GUEST_ROLE_ID,
    }))
  }
}
