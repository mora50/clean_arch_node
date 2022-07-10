import BaseError from "../../../../shared/errors/baseError";
import { UserModel } from "../../infra/models/User";
import User from "../entities/User";

export default class GetUserUseCase {
  constructor() {}

  async execute(userId: string): Promise<User> {
    const userExists = await UserModel.findById(userId, "-password");

    if (!userExists) {
      throw new BaseError("User not found", 400);
    }

    return userExists;
  }
}
