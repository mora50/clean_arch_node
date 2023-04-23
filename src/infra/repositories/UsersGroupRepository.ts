import { client } from '@/config/postgresConfig'
import User from '@/domain/entities/User'
import UsersGroup from '@/domain/entities/UsersGroup'
import UsersGroupRepostory from '@/domain/repositories/UsersGroup'

export default class UsersGroupRepostoryImpl implements UsersGroupRepostory {
  inviteToGroup(userId: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  async createGroup(usersGroup: UsersGroup): Promise<boolean> {
    const { name, users } = usersGroup

    const query = client('users_groups').insert(
      users.map(({ id, roleId }) => ({ user_id: id, role_id: roleId, name }))
    )

    await query

    return true
  }
  removeUserFromGroup(userId: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  findUserOnGroup(userId: string, groupId: string): Promise<User> {
    throw new Error('Method not implemented.')
  }
}
