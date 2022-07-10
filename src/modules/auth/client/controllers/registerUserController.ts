import { Request, Response } from "express";
import RegisterUserUseCase from "../../domain/usecases/RegisterUserUseCase";

export default class RegisterUserController {
  async handler(req: Request, res: Response) {
    const { name, email, password, confirm_password } = req.body;

    const registerUserUseCase = new RegisterUserUseCase();

    const response = await registerUserUseCase.execute(
      { name, email, password },
      confirm_password
    );

    return res.status(200).json(response);
  }
}
