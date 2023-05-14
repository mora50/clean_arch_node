import FindUsersInGroup from '@/domain/usecases/FindUsersInGroupUseCase'
import UsersGroupRepostoryImpl from '@/infra/repositories/UsersGroupRepository'
import { Request, Response } from 'express'

export class FindUsersInGroupController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { groupId } = req.params

    const findUsersInGroupRepository = new UsersGroupRepostoryImpl()

    const findUsersInGroup = new FindUsersInGroup(findUsersInGroupRepository)

    const users = await findUsersInGroup.execute(String(groupId))

    return res.status(200).json(users)
  }
}
