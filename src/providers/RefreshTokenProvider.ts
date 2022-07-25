import RefreshToken from '@/domain/entities/RefreshToken'
import { RefreshTokenSchema } from '@/infra/schemas/RefreshTokenSchema'
import dayjs from 'dayjs'

export default class RefreshTokenProvider {
  async execute(userId: string): Promise<RefreshToken> {
    await RefreshTokenSchema.deleteMany({ userId })

    const expiresIn = dayjs().add(20, 'seconds').unix()

    const refreshToken = await RefreshTokenSchema.create({
      userId,
      expiresIn,
    })

    return refreshToken
  }
}
