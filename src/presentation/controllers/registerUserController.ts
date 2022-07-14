import { Request, Response } from 'express'
import RegisterUserUseCase from '@/domain/usecases/RegisterUserUseCase'
import UserRepositoryImpl from '@/infra/repositories/UserRepository'

export class RegisterUserController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { name, email, password, confirm_password: confirmPassword } = req.body
    const userRepository = new UserRepositoryImpl()

    const registerUserUseCase = new RegisterUserUseCase(userRepository)

    const response = await registerUserUseCase.execute(
      { name, email, password },
      confirmPassword
    )

    return res.json(response)
  }
}
