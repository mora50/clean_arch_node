import Unauthorized from "../../../../providers/errors/unauthorized";
import { RefreshTokenSchema } from "../../infra/schemas/RefreshTokenSchema";
import GenerateTokenProvider from "../../../../providers/GenerateTokenProvider";
import Token from "../entities/Token";
import RefreshTokenProvider from "../../../../providers/refreshTokenProvider";
import BaseError from "../../../../providers/errors/baseError";
import dayjs from "dayjs";

export default class RefreshTokenUseCase {
  constructor() {}

  async execute(refresh_token: string): Promise<Token> {
    const refreshTokenExists = await RefreshTokenSchema.findById(refresh_token);

    if (!refreshTokenExists) {
      throw new Unauthorized();
    }

    const unixDateNow = dayjs(Date.now()).unix();

    if (unixDateNow > refreshTokenExists.expiresIn) {
      throw new BaseError("Expired refresh token", 401);
    }

    const generateTokenProvider = new GenerateTokenProvider();

    const token = generateTokenProvider.execute(refreshTokenExists.userId);

    const refreshTokenProvider = new RefreshTokenProvider();

    const newRefreshToken = await refreshTokenProvider.execute(
      refreshTokenExists.userId
    );

    console.log(newRefreshToken);

    return { token, refreshToken: newRefreshToken };
  }
}
