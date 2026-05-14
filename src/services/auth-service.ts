import { VersionService } from './version-service'

let bearerToken: string | null = null

export const AuthService = {

  getToken: async (): Promise<{ token: string }> => {
    const response = await fetch(`http://localhost:3001/api/v${VersionService.getVersion()}/token`)
    const { token } = await response.json()
    bearerToken = token
    return token
  },

  getBearerToken: () => bearerToken
}
