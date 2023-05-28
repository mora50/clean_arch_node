import User from '@/domain/entities/User'

export default class UserGroupModel extends User {
  constructor(
    public name: string,
    public email: string,
    public role_name: string
  ) {
    super(name, email)
  }
}
