import dayjs from 'dayjs'
import RefreshToken from '../modules/auth/domain/entities/RefreshToken'
import { RefreshTokenSchema } from '../modules/auth/infra/schemas/RefreshTokenSchema'

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
