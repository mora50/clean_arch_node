import LoginUserUseCase from '@/domain/usecases/LoginUserUseCase'
import RefreshTokenUseCase from '@/domain/usecases/RefreshTokenUseCase'
import { TokenRepositoryImpl } from '@/infra/repositories/TokenRepository'
import UsersGroupRepostoryImpl from '@/infra/repositories/UserRepository'
import { Request, Response } from 'express'

export class LoginUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const userRepository = new UsersGroupRepostoryImpl()

    const loginUserUseCase = new LoginUserUseCase(userRepository)

    const tokenRepository = new TokenRepositoryImpl()

    const refreshTokenUseCase = new RefreshTokenUseCase(tokenRepository)

    const { token, userId } = await loginUserUseCase.execute(email, password)

    const refreshToken = await refreshTokenUseCase.execute(userId)

    const response = { token, refreshToken }

    return res.json(response)
  }
}
