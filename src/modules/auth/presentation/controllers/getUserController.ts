import { Request, Response } from 'express'
import GetUserUseCase from '../../domain/usecases/GetUserUseCase'

export class GetUserController {
  async handle (req: Request, res: Response): Promise<Response> {
    const userId = req.params.id

    const getUserUseCase = new GetUserUseCase()

    const user = await getUserUseCase.execute(userId)
    return res.json({ user })
  }
}
