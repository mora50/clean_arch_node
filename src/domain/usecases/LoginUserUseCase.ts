import Unauthorized from '@/domain/errors/unauthorized'
import GenerateTokenProvider from '@/providers/GenerateTokenProvider'
import RefreshTokenProvider from '@/providers/RefreshTokenProvider'
import { validateLoginFields } from '@/validations/User'
import bcrypt from 'bcrypt'
import Token from '../entities/Token'
import UnprocessableEntityError from '../errors/unprocessable'
import UserRepository from '../repositories/UserRepository'

export default class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<Token> {
    const hasErrorOnFields = await validateLoginFields(email, password)

    if (hasErrorOnFields) {
      throw new UnprocessableEntityError(hasErrorOnFields.message)
    }

    const userExists = await this.userRepository.findUserByEmail(email)
    if (!userExists) {
      throw Error('Usuário não encontrado')
    }

    const checkPassword = await bcrypt.compare(password, userExists.password)

    if (!checkPassword) {
      throw new Unauthorized()
    }

    const generateTokenProvider = new GenerateTokenProvider()

    const token = generateTokenProvider.execute(userExists.id)

    const refreshTokenProvider = new RefreshTokenProvider()

    const refreshToken = await refreshTokenProvider.execute(userExists.id)

    return { token, refreshToken }
  }
}
