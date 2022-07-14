import { RefreshTokenSchema } from '@/infra/schemas/RefreshTokenSchema'
import dayjs from 'dayjs'
import RefreshToken from '@/domain/entities/RefreshToken'

export default class RefreshTokenProvider {
  async execute (userId: string): Promise<RefreshToken> {
    await RefreshTokenSchema.deleteMany({ userId })

    const expiresIn = dayjs().add(20, 'seconds').unix()

    const refreshToken = await RefreshTokenSchema.create({
      userId,
      expiresIn
    })

    return refreshToken
  }
}
