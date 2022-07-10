import BaseError from "../../../../providers/errors/baseError";
import { UserSchema } from "../../infra/schemas/UserSchema";
import User from "../entities/User";

export default class GetUserUseCase {
  constructor() {}

  async execute(userId: string): Promise<User> {
    const userExists = await UserSchema.findById(userId, "-password");

    if (!userExists) {
      throw new BaseError("User not found", 400);
    }

    return userExists;
  }
}
