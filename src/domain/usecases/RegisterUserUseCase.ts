import UnprocessableEntityError from '@/providers/errors/unprocessable'

import User from '../entities/User'
import bcrypt from 'bcrypt'
import BaseError from '@/providers/errors/baseError'
import UserRepository from '../repositories/UserRepository'

export default class RegisterUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (user: User, confirmPassword: String): Promise<User> {
    const { name, email, password } = user

    if (!name) {
      throw new UnprocessableEntityError('Name is required')
    }
    if (!email) {
      throw new UnprocessableEntityError('Email is required')
    }
    if (!password) {
      throw new UnprocessableEntityError('Password is required')
    }

    if (!confirmPassword) {
      throw new UnprocessableEntityError('Confirm password is required')
    }

    if (confirmPassword !== password) {
      throw new UnprocessableEntityError('Password does not match')
    }

    const userExists = await this.userRepository.findUserByEmail(email)

    if (userExists) {
      throw new UnprocessableEntityError('Please use another e-mail')
    }
    const salt = await bcrypt.genSalt(12)

    const passwordHash = await bcrypt.hash(password, salt)

    try {
      return this.userRepository.save({
        name,
        email,
        password: passwordHash
      })
    } catch (error) {
      throw new BaseError('Please try again', 500)
    }
  }
}
