import type { ApiMatch } from '@/types/match'
import { authFetch } from '../utils/authFetch'
import { VersionService } from './version-service'

export const LeagueService = {

  getMatches: async (): Promise<ApiMatch[]> => {
    const response = await authFetch(`http://localhost:3001/api/v${VersionService.getVersion()}/matches`)
    const { matches } = await response.json()
    return matches 
  }
}
