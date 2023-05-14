import { client } from '@/config/postgresConfig'
import UsersGroup from '@/domain/entities/UsersGroup'
import UsersGroupRepostory from '@/domain/repositories/UsersGroup'
import UserGroupModel from '@/presentation/models/UserGroupModel'

export default class UsersGroupRepostoryImpl implements UsersGroupRepostory {
  inviteToGroup(userId: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  async createGroup(usersGroup: UsersGroup): Promise<boolean> {
    const { name, users } = usersGroup

    try {
      await client.transaction(async (trx) => {
        const [groupId] = await trx('groups').insert({ name }).returning('id')

        await trx('users_groups').insert(
          users.map(({ id, roleId }) => ({
            user_id: id,
            role_id: roleId,
            group_id: groupId.id,
          }))
        )
      })

      return true
    } catch (error) {
      console.log(error)

      return false
    }
  }
  async removeUserFromGroup(userId: string): Promise<boolean> {
    try {
      await client('users_groups').where('user_id', userId).del()

      return true
    } catch (error) {
      return false
    }
  }

  async findUsersInGroup(groupId: string): Promise<UserGroupModel[]> {
    try {
      const users = await client
        .select('name', 'email', 'role_id')
        .from('users')
        .innerJoin('users_groups', 'users.id', 'users_groups.user_id')
        .where('users_groups.group_id', groupId)

      return users
    } catch (error) {
      throw error
    }
  }
}
