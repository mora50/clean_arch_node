import { client } from '@/config/postgresConfig'
import RefreshToken from '@/domain/entities/RefreshToken'
import TokenRepository from '@/domain/repositories/TokenRepository'

export class TokenRepositoryImpl implements TokenRepository {
  async createRefreshToken(
    userId: string,
    expiresIn: number
  ): Promise<RefreshToken> {
    try {
      const [refreshToken] = await client('refresh_tokens')
        .insert({ user_id: userId, expires_in: expiresIn })
        .returning(['id', 'expires_in'])
      return refreshToken
    } catch (error) {
      return null
    }
  }
  async findRefreshToken(refreshToken: string): Promise<RefreshToken> {
    try {
      const token = await client('refresh_tokens')
        .where({ id: refreshToken })
        .first()

      return token
    } catch (error) {
      return null
    }
  }

  async deleteRefreshToken(userId: string): Promise<boolean> {
    return await client('refresh_tokens').where({ user_id: userId }).delete()
  }
}
