import RefreshToken from './RefreshToken'

type Token = {
  token: string
  refreshToken?: RefreshToken
}

export default Token
