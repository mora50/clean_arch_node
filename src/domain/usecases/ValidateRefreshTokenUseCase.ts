import Unauthorized from '@/domain/errors/unauthorized'
import { RefreshTokenSchema } from '@/infra/schemas/RefreshTokenSchema'
import GenerateTokenProvider from '@/providers/GenerateTokenProvider'
import Token from '../entities/Token'
import BaseError from '@/domain/errors/baseError'
import dayjs from 'dayjs'
import TokenRepository from '@/domain/repositories/TokenRepository'

export default class ValidateRefreshTokenUseCase {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute(refreshToken: string): Promise<Input> {
    const refreshTokenExists = await this.tokenRepository.findRefreshToken(
      refreshToken
    )

    if (!refreshTokenExists) {
      throw new Unauthorized()
    }

    const unixDateNow = dayjs(Date.now()).unix()

    if (unixDateNow > refreshTokenExists.expiresIn) {
      throw new BaseError('Expired refresh token', 401)
    }

    const generateTokenProvider = new GenerateTokenProvider()

    const token = generateTokenProvider.execute(refreshTokenExists.userId)

    return { token, userId: refreshTokenExists.userId }
  }
}

type Input = Token & { userId: string }
