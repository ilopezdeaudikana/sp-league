export const AuthService = {

  getToken: async (): Promise<{ access_token: string }> => {
    const response = await fetch('http://localhost:3001/api/v1/token')
    const { access_token } = await response.json()
    return access_token
  }
}
