import { useQuery } from '@tanstack/vue-query'
import { LeagueService } from '../services/league-service'
import type { ApiMatch } from '@/types/match'

export const useMatches = <T = ApiMatch[]>(select?: (matches: ApiMatch[]) => T) => {
	
	const { data, isPending, error } = useQuery({
		queryKey: ['matches'],
		queryFn: LeagueService.getMatches,
		select: select
	})

	return { data, isPending, error }
}