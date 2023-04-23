import { client } from '@/config/postgresConfig'
import RefreshToken from '@/domain/entities/RefreshToken'
import dayjs from 'dayjs'

export default class RefreshTokenProvider {
  async execute(userId: string): Promise<RefreshToken> {
    const expiresIn = dayjs().add(15, 'days').unix()

    await client('refresh_tokens').where('user_id', userId).delete()

    const [refreshToken] = await client('refresh_tokens')
      .insert({ user_id: userId, expires_in: expiresIn })
      .returning('*')

    return refreshToken
  }
}
