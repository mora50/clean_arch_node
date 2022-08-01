import LoginUserUseCase from '@/domain/usecases/LoginUserUseCase'
import UserRepositoryImpl from '@/infra/repositories/UserRepository'
import { Request, Response } from 'express'

export class LoginUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const userRepository = new UserRepositoryImpl()

    const loginUserUseCase = new LoginUserUseCase(userRepository)

    const response = await loginUserUseCase.execute(email, password)

    return res.json(response)
  }
}
