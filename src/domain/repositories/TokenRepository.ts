import RefreshToken from '../entities/RefreshToken'

interface TokenRepository {
  deleteRefreshToken(userId: string): Promise<boolean>
  findRefreshToken(userId: string): Promise<RefreshToken>
  createRefreshToken(userId: string, expiresIn: number): Promise<RefreshToken>
}

export default TokenRepository
