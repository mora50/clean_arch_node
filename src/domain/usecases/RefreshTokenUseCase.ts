import RefreshToken from '@/domain/entities/RefreshToken'
import dayjs from 'dayjs'
import TokenRepository from '../repositories/TokenRepository'
import { InternalServerError } from 'http-errors'

export default class RefreshTokenUseCase {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute(userId: string): Promise<RefreshToken> {
    const expiresIn = dayjs().add(15, 'days').unix()

    try {
      await this.tokenRepository.deleteRefreshToken(userId)
    } catch (error) {
      throw new InternalServerError()
    }

    try {
      const refreshToken = this.tokenRepository.createRefreshToken(
        userId,
        expiresIn
      )

      return refreshToken
    } catch (error) {
      throw new InternalServerError()
    }
  }
}
