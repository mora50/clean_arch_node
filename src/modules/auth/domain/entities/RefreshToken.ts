export default class RefreshToken {
  constructor(
    public id: string,
    public userId: string,
    public expiresIn: number
  ) {}
}
