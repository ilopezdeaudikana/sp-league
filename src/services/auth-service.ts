export const AuthService = {
  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getToken: async () => {
    const response = await fetch('http://localhost:3001/api/v1/getAccessToken')
    const { access_token } = await response.json()
    return access_token
  }
}
