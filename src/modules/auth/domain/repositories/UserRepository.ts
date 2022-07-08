import Token from "../entities/Token";
import User from "../entities/User";

export default interface UserRepository {
  save(user: User): Promise<User>;

  login(user: Omit<User, "name">): Promise<Token>;
}
