import GetUserUseCase from '@/domain/usecases/GetUserUseCase'
import UsersGroupRepostoryImpl from '@/infra/repositories/UserRepository'
import { Request, Response } from 'express'

export class GetUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = res.locals

    console.log({ userId })

    // const userRepository = new UserRepositoryImpl()

    const userRepositoryPg = new UsersGroupRepostoryImpl()

    const getUserUseCase = new GetUserUseCase(userRepositoryPg)

    const user = await getUserUseCase.execute(userId)
    return res.json(user)
  }
}
