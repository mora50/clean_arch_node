import User from '../entities/User'
import BaseError from '../errors/baseError'
import UserRepository from '../repositories/UserRepository'

export default class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<User> {
    const userExists = await this.userRepository.findUserById(userId)

    if (!userExists) {
      throw new BaseError('User not found', 400)
    }

    return userExists
  }
}
