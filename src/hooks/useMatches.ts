import { useQuery } from '@tanstack/vue-query'
import { LeagueService } from '../services/league-service'

export const useMatches = () => {

	const { data, isPending, error } = useQuery({
		queryKey: ['matches'],
		queryFn: LeagueService.getMatches,
	})

	return { data, isPending, error }
}