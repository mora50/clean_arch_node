import Unauthorized from '@/providers/errors/unauthorized'
import GenerateTokenProvider from '@/providers/GenerateTokenProvider'
import RefreshTokenProvider from '@/providers/RefreshTokenProvider'
import bcrypt from 'bcrypt'
import Token from '../entities/Token'
import User from '../entities/User'
import UserRepository from '../repositories/UserRepository'

export default class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: Pick<User, 'email' | 'password'>): Promise<Token> {
    const { email, password } = user

    if (!email) {
      throw Error('O email é obrigatório')
    }
    if (!password) {
      throw Error('O password é obrigatório')
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
