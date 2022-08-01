import UnprocessableEntityError from '@/domain/errors/unprocessable'

import User from '../entities/User'

import BaseError from '@/domain/errors/baseError'
import passwordHashProvider from '@/providers/PasswordHashProvider'
import { validateUserFields } from '@/validations/User'
import UserRepository from '../repositories/UserRepository'

export default class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User, confirmPassword: string): Promise<User> {
    const { name, email, password } = user

    const hasErrorOnFields = await validateUserFields({
      ...user,
      confirmPassword,
    })

    if (hasErrorOnFields) {
      throw new UnprocessableEntityError(hasErrorOnFields.message)
    }

    const userExists = await this.userRepository.findUserByEmail(email)
    if (userExists) {
      throw new BaseError('Email already in use', 409)
    }

    const passwordHash = await passwordHashProvider(password)

    try {
      const response = await this.userRepository.save({
        name,
        email,
        password: passwordHash,
      })

      return response
    } catch (error) {
      throw new BaseError('Please try again', 500)
    }
  }
}
