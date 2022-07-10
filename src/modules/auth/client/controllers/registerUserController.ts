import { Request, Response } from "express";
import RegisterUserUseCase from "../../domain/usecases/RegisterUserUseCase";

export default class RegisterUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, confirm_password } = req.body;

    const registerUserUseCase = new RegisterUserUseCase();

    const response = await registerUserUseCase.execute(
      { name, email, password },
      confirm_password
    );

    return res.json(response);
  }
}
