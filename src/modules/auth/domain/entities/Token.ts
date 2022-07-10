import RefreshToken from "./RefreshToken";

export default class Token {
  constructor(
    public readonly token: string,
    public readonly refreshToken: RefreshToken
  ) {}
}
