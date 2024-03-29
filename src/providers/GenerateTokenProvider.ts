import jwt from 'jsonwebtoken'
export default class GenerateTokenProvider {
  execute(userId: string): string {
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({ id: userId }, secret, {
      expiresIn: '1000s',
      subject: userId,
    })

    return token
  }
}
