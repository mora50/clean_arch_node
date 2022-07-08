import User from "../entities/User";
import UserRepository from "../repositories/UserRepository";

export default class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    if (!user.name) {
      throw Error("Nome é obrigatório");
    }

    if (!user.email) {
      throw Error("Email é obrigatório");
    }

    return this.userRepository.save(user);
  }
}
