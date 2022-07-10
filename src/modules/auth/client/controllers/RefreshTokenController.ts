import { Request, Response } from "express";
import RefreshTokenUseCase from "../../domain/usecases/RefreshTokenUseCase";

export default class RefreshTokenControler {
  async handle(req: Request, res: Response) {
    const { refresh_token } = req.body;

    console.log({ refresh_token });
    const refreshTokenUseCase = new RefreshTokenUseCase();

    const token = await refreshTokenUseCase.execute(refresh_token);

    return res.json({ token });
  }
}
