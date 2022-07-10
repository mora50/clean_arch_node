import UnprocessableEntityError from "../../../../providers/errors/unprocessable";
import { UserSchema } from "../../infra/schemas/UserSchema";
import User from "../entities/User";
import bcrypt from "bcrypt";
import BaseError from "../../../../providers/errors/baseError";
export default class RegisterUserUseCase {
  constructor(/* private userRepository: UserRepository */) {}

  async execute(user: User, confirm_password: String): Promise<User> {
    const { name, email, password } = user;

    if (!name) {
      throw new UnprocessableEntityError("Name is required");
    }
    if (!email) {
      throw new UnprocessableEntityError("Email is required");
    }
    if (!password) {
      throw new UnprocessableEntityError("Password is required");
    }

    if (!confirm_password) {
      throw new UnprocessableEntityError("Confirm password is required");
    }

    if (confirm_password !== password) {
      throw new UnprocessableEntityError("Password does not match");
    }

    const userExists = await UserSchema.findOne({ email });

    if (userExists) {
      throw new UnprocessableEntityError("Please use another e-mail");
    }
    const salt = await bcrypt.genSalt(12);

    const passwordHash = await bcrypt.hash(password, salt);

    const userModel = new UserSchema({
      name,
      email,
      password: passwordHash,
    });

    try {
      await userModel.save();

      return user;
    } catch (error) {
      throw new BaseError("Please try again", 500);
    }

    // return this.userRepository.save(user);
  }
}
