let version: string | null = null

export const VersionService = {
  fetchVersion: async (): Promise<string> => {
    const response = await fetch('http://localhost:3001/api/version')
    const { version: apiVersion } = await response.json()
    version = apiVersion
    return apiVersion
  },
  getVersion: () => version
}
