import bcrypt from "bcrypt";
import Unauthorized from "../../../../providers/errors/unauthorized";
import GenerateTokenProvider from "../../../../providers/GenerateTokenProvider";
import RefreshTokenProvider from "../../../../providers/refreshTokenProvider";
import { UserSchema } from "../../infra/schemas/UserSchema";
import Token from "../entities/Token";
import User from "../entities/User";

export default class LoginUserUseCase {
  constructor(/* private userRepository: UserRepository */) {}

  async execute(user: Omit<User, "name">): Promise<Token> {
    const { email, password } = user;

    if (!email) {
      throw Error("O email é obrigatório");
    }
    if (!password) {
      throw Error("O password é obrigatório");
    }

    const userExists = await UserSchema.findOne({ email });
    if (!userExists) {
      throw Error("Usuário não encontrado");
    }

    const checkPassword = await bcrypt.compare(password, userExists.password);

    if (!checkPassword) {
      throw new Unauthorized();
    }

    const generateTokenProvider = new GenerateTokenProvider();

    const token = generateTokenProvider.execute(userExists.id);

    const refreshTokenProvider = new RefreshTokenProvider();

    const refreshToken = await refreshTokenProvider.execute(userExists.id);

    return { token, refreshToken };

    // return this.userRepository.login(user);
  }
}
