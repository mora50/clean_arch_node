interface UserGroup {
  id: string
  roleId?: string
}

interface UsersGroup {
  name: string
  users: UserGroup[]
}

export default UsersGroup
