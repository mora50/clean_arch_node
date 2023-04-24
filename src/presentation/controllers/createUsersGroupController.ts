import UsersGroup from '@/domain/entities/UsersGroup'
import CreateUsersGroupUseCase from '@/domain/usecases/CreateUsersGroupUseCase'
import UsersGroupRepostoryImpl from '@/infra/repositories/UsersGroupRepository'
import { Request, Response } from 'express'

export class CreateUsersGroupController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { userId: currentUserId } = res.locals

    const data: UsersGroup = req.body

    const usersGroupRepostoryImpl = new UsersGroupRepostoryImpl()

    const createUsersGroupUseCase = new CreateUsersGroupUseCase(
      usersGroupRepostoryImpl
    )

    const user = await createUsersGroupUseCase.execute(data, currentUserId)
    return res.status(201).json({ worked: 'worked' })
  }
}
