import { Request, Response } from 'express'
import RefreshTokenUseCase from '../../domain/usecases/RefreshTokenUseCase'

export class RefreshTokenControler {
  async handle (req: Request, res: Response): Promise<Response> {
    const { refresh_token: refreshToken } = req.body

    const refreshTokenUseCase = new RefreshTokenUseCase()

    const token = await refreshTokenUseCase.execute(refreshToken)

    return res.json({ token })
  }
}
