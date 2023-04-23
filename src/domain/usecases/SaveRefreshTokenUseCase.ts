import dayjs from 'dayjs'
import RefreshToken from '@/domain/entities/RefreshToken'
import TokenRepository from '../repositories/TokenRepository'

import { InternalServerError } from 'http-errors'

export class SaveRefreshTokenUseCase {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute(refreshToken: string, userId: string): Promise<RefreshToken> {
    const isDeleted = await this.tokenRepository.deleteRefreshToken(userId)

    if (!isDeleted) {
      throw new InternalServerError('Error deleting refresh token')
    }

    const expiresIn = dayjs().add(20, 'seconds').unix()

    const newRefreshToken = await this.tokenRepository.createRefreshToken(
      userId,
      expiresIn
    )

    if (!refreshToken) {
      throw InternalServerError('Failled to save the token')
    }

    return newRefreshToken
  }
}
