import BaseEntity from './BaseEntities'

export default class User extends BaseEntity {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public role?: string
  ) {
    super()
  }
}
