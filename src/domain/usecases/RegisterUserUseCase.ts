import { UnprocessableEntity } from 'http-errors'

import User from '../entities/User'

import BaseError from '@/domain/errors/baseError'
import passwordHashProvider from '@/providers/PasswordHashProvider'
import { validateUserFields } from '@/validations/User'
import UserRepository from '../repositories/UserRepository'
import CreateUserInput from '../entities/CreateUserInput'

export default class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userInput: CreateUserInput): Promise<User> {
    const validationError = await validateUserFields(userInput)
    if (validationError) {
      throw new UnprocessableEntity(validationError.message)
    }

    const { email, password, name } = userInput
    const userExists = await this.userRepository.findUserByEmail(email)
    if (userExists) {
      throw new BaseError('Email already in use', 409)
    }

    const passwordHash = await passwordHashProvider(password)
    const newUser = new User(name, email, passwordHash)
    const savedUser = await this.userRepository.save(newUser)

    if (!savedUser) {
      throw new BaseError('Failed to save user', 500)
    }

    return { name: newUser.name, email: newUser.email, id: newUser.id }
  }
}
