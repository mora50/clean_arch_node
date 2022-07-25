import GetUserUseCase from '@/domain/usecases/GetUserUseCase'
import UserRepositoryImpl from '@/infra/repositories/UserRepository'
import { Request, Response } from 'express'

export class GetUserController {
  async handle (req: Request, res: Response): Promise<Response> {
    const userId = req.params.id

    const userRepository = new UserRepositoryImpl()

    const getUserUseCase = new GetUserUseCase(userRepository)

    const user = await getUserUseCase.execute(userId)
    return res.json({ user })
  }
}
