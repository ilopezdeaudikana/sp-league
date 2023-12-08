export const VersionService = {
  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getVersion: async () => {
    const response = await fetch('http://localhost:3001/api/version')
    const { version } = await response.json()
    return version
  }
}
