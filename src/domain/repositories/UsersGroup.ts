import User from '../entities/User'
import UsersGroup from '../entities/UsersGroup'

export default interface UsersGroupRepostory {
  inviteToGroup(userId: string): Promise<boolean>

  createGroup(usersGroup: UsersGroup): Promise<boolean>

  removeUserFromGroup(userId: string): Promise<boolean>

  findUsersInGroup(groupId: string): Promise<User[]>
}
