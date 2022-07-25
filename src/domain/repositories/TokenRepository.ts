import RefreshToken from '../entities/RefreshToken'

interface TokenRepository {
  saveToken(userId: string): Promise<RefreshToken>
}

export default TokenRepository
