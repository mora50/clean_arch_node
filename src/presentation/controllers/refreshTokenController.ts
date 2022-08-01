import { SaveRefreshTokenUseCase } from '@/domain/usecases/SaveRefreshTokenUseCase'
import ValidateRefreshTokenUseCase from '@/domain/usecases/ValidateRefreshTokenUseCase'
import { TokenRepositoryImpl } from '@/infra/repositories/TokenRepository'
import { Request, Response } from 'express'

export class RefreshTokenControler {
  async handle(req: Request, res: Response): Promise<Response> {
    const { refresh_token: refreshToken } = req.body

    const tokenRepository = new TokenRepositoryImpl()

    const validateRefreshTokenUseCase = new ValidateRefreshTokenUseCase()

    const { token, userId } = await validateRefreshTokenUseCase.execute(
      refreshToken
    )

    const saveRefreshTokenUseCase = new SaveRefreshTokenUseCase(tokenRepository)

    const newRefreshToken = await saveRefreshTokenUseCase.execute(
      refreshToken,
      userId
    )

    return res.json({ token, refreshToken: newRefreshToken })
  }
}
