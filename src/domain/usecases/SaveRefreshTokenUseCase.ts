import BaseError from '@/providers/errors/baseError'
import dayjs from 'dayjs'
import RefreshToken from '@/domain/entities/RefreshToken'
import TokenRepository from '../repositories/TokenRepository'

export class SaveRefreshTokenUseCase {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute(refreshToken: string, userId: string): Promise<RefreshToken> {
    const isDeleted = await this.tokenRepository.deleteRefreshToken(userId)

    if (!isDeleted) {
      throw new BaseError('Error deleting refresh token', 500)
    }

    const expiresIn = dayjs().add(20, 'seconds').unix()

    const newRefreshToken = await this.tokenRepository.saveToken(
      userId,
      expiresIn
    )

    if (!refreshToken) {
      throw new BaseError('Failled to save the token', 500)
    }

    return newRefreshToken
  }
}
