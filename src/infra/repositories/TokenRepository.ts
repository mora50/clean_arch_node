import RefreshToken from '@/domain/entities/RefreshToken'
import TokenRepository from '@/domain/repositories/TokenRepository'
import { RefreshTokenSchema } from '../schemas/RefreshTokenSchema'

export class TokenRepositoryImpl implements TokenRepository {
  async findRefreshToken(refreshToken: string): Promise<RefreshToken> {
    try {
      return await RefreshTokenSchema.findById(refreshToken)
    } catch (error) {
      return null
    }
  }
  async saveToken(userId: string, expiresIn: number): Promise<RefreshToken> {
    try {
      const refreshToken = await RefreshTokenSchema.create({
        userId,
        expiresIn,
      })

      return refreshToken
    } catch (error) {
      return null
    }
  }
  async deleteRefreshToken(userId: string): Promise<boolean> {
    try {
      await RefreshTokenSchema.deleteMany({ userId })

      return true
    } catch (error) {
      return false
    }
  }
}
