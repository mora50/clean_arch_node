import RegisterUserUseCase from '@/domain/usecases/RegisterUserUseCase'
import UsersGroupRepostoryImpl from '@/infra/repositories/UserRepository'
import { Request, Response } from 'express'

export class RegisterUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      confirm_password: confirmPassword,
    } = req.body
    const userRepository = new UsersGroupRepostoryImpl()

    const registerUserUseCase = new RegisterUserUseCase(userRepository)

    const response = await registerUserUseCase.execute({
      name,
      email,
      password,
      confirmPassword,
    })

    return res.status(201).json(response)
  }
}
