import { Request, Response } from "express";
import LoginUserUseCase from "../../domain/usecases/LoginUserUseCase";

export default class LoginUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const loginUserUseCase = new LoginUserUseCase();

    const response = await loginUserUseCase.execute({ email, password });

    return res.json(response);
  }
}
