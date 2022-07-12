import { Request, Response } from 'express'
import RegisterUserUseCase from '../../domain/usecases/RegisterUserUseCase'

export class RegisterUserController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { name, email, password, confirm_password: confirmPassword } = req.body

    const registerUserUseCase = new RegisterUserUseCase()

    const response = await registerUserUseCase.execute(
      { name, email, password },
      confirmPassword
    )

    return res.json(response)
  }
}
