import RefreshTokenUseCase from '@/domain/usecases/RefreshTokenUseCase'
import { Request, Response } from 'express'

export class RefreshTokenControler {
  async handle(req: Request, res: Response): Promise<Response> {
    const { refresh_token: refreshToken } = req.body

    const refreshTokenUseCase = new RefreshTokenUseCase()

    const token = await refreshTokenUseCase.execute(refreshToken)

    return res.json({ token })
  }
}
