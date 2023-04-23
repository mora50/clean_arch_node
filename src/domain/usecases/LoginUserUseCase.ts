import GenerateTokenProvider from '@/providers/GenerateTokenProvider'
import { validateLoginFields } from '@/validations/User'
import bcrypt from 'bcrypt'
import { Unauthorized, NotFound, UnprocessableEntity } from 'http-errors'
import Token from '../entities/Token'
import UserRepository from '../repositories/UserRepository'

export default class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    email: string,
    password: string
  ): Promise<Token & { userId: string }> {
    const hasErrorOnFields = await validateLoginFields(email, password)

    if (hasErrorOnFields) {
      throw UnprocessableEntity(hasErrorOnFields.message)
    }

    const userExists = await this.userRepository.findUserByEmail(email)
    if (!userExists) {
      throw NotFound('Usuário não encontrado')
    }

    const checkPassword = await bcrypt.compare(password, userExists.password)

    if (!checkPassword) {
      throw Unauthorized()
    }

    const generateTokenProvider = new GenerateTokenProvider()

    const token = generateTokenProvider.execute(userExists.id)

    return { token, userId: userExists.id }
  }
}
