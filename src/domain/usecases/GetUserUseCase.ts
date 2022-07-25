import BaseError from '@/providers/errors/baseError'
import User from '@/domain/entities/User'
import UserRepository from '@/domain/repositories/UserRepository'

export default class GetUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (userId: string): Promise<User> {
    const userExists = await this.userRepository.findUserById(userId)

    if (!userExists) {
      throw new BaseError('User not found', 400)
    }

    return userExists
  }
}
