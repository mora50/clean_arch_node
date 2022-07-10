import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Unauthorized from "../../../../shared/errors/unauthorized";
import { UserModel } from "../../infra/models/User";
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

    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
      throw Error("Usuário não encontrado");
    }

    const checkPassword = await bcrypt.compare(password, userExists.password);

    if (!checkPassword) {
      throw new Unauthorized();
    }

    try {
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign({ id: userExists._id }, secret!);

      return { token };
    } catch (error) {
      throw Error("Falha ao autenticar");
    }

    // return this.userRepository.login(user);
  }
}
