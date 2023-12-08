import type { ApiMatch } from '@/types/match'

export const LeagueService = {

  getMatches: async (token: string): Promise<ApiMatch[]> => {
    const response = await fetch('http://localhost:3001/api/v1/getAllMatches', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const { matches } = await response.json()
    return matches
  }
}
