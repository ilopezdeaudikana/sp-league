import { useMatches } from './use-matches'
import { computed, type ComputedRef, type Ref } from 'vue'
import type { ApiMatch } from '@/types/match'
import { toTypedKeys } from '@/utils/toTypedKeys'

type MatchKey = Exclude<keyof ApiMatch, 'stadium' | 'homeTeamScore' | 'awayTeamScore' | 'matchDate'>

type FiltersObject = {
  [K in MatchKey]?:  boolean | string
}

export const useFilteredMatches = (filters: Ref<FiltersObject>, team?: Ref<string>) => {

  const { data, isPending, error } = useMatches()

  const matchesFilterer = (match: ApiMatch): boolean => {
    const keysToMatch = toTypedKeys(filters.value)

    const hits = keysToMatch.reduce((result, current) => {
      if (match[current] === filters.value[current]) {
        result++
      }
      return result
    }, 0)

    if (hits === keysToMatch.length) return true
    return false
  }

  const matches: ComputedRef<ApiMatch[]> = computed(() => {
    return data.value?.filter(matchesFilterer) ?? []
  })

  const teamMatches: ComputedRef<ApiMatch[]> = computed(() => {
    const target = team?.value.toLowerCase()
    return matches.value?.filter(match => match.awayTeam.toLowerCase() === target || match.homeTeam.toLowerCase() === target)
  })

  return { matches, teamMatches, isPending, error }
}