import RefreshToken from '../entities/RefreshToken'

interface TokenRepository {
  saveToken(userId: string, expiresIn: number): Promise<RefreshToken>
  deleteRefreshToken(userId: string): Promise<boolean>
  findRefreshToken(userId: string): Promise<RefreshToken>
}

export default TokenRepository
