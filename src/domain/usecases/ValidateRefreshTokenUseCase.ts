import { Unauthorized } from 'http-errors'
import GenerateTokenProvider from '@/providers/GenerateTokenProvider'
import Token from '../entities/Token'
import dayjs from 'dayjs'
import TokenRepository from '@/domain/repositories/TokenRepository'

export default class ValidateRefreshTokenUseCase {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute(refreshToken: string): Promise<Token & { userId: string }> {
    const refreshTokenExists = await this.tokenRepository.findRefreshToken(
      refreshToken
    )

    if (!refreshTokenExists) {
      throw new Unauthorized()
    }

    const unixDateNow = dayjs(Date.now()).unix()

    if (unixDateNow > refreshTokenExists.expiresIn) {
      throw new Unauthorized('Expired refresh token')
    }

    const generateTokenProvider = new GenerateTokenProvider()

    const token = generateTokenProvider.execute(refreshTokenExists.userId)

    return { token, userId: refreshTokenExists.userId }
  }
}
