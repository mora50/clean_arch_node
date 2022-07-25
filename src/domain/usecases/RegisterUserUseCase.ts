import UnprocessableEntityError from '@/providers/errors/unprocessable'

import User from '../entities/User'

import BaseError from '@/providers/errors/baseError'
import UserRepository from '../repositories/UserRepository'
import passwordHashProvider from '@/providers/PasswordHashProvider'
import validateUserFields from '@/validations/User'

export default class RegisterUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (user: User, confirmPassword: string): Promise<User> {
    const { name, email, password } = user

    const hasErrorOnFields = await validateUserFields({ ...user, confirmPassword })

    if (hasErrorOnFields) {
      throw new UnprocessableEntityError(hasErrorOnFields.message)
    }

    const userExists = await this.userRepository.findUserByEmail(email)
    if (userExists) {
      throw new UnprocessableEntityError('Please use another e-mail')
    }

    const passwordHash = await passwordHashProvider(password)

    try {
      const response = await this.userRepository.save({
        name,
        email,
        password: passwordHash
      })

      return response
    } catch (error) {
      throw new BaseError('Please try again', 500)
    }
  }
}
