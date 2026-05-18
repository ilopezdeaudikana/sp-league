import { ref } from 'vue'

export const useMatchFilters = (options?: { matchPlayed?: boolean }) => {
  const filters = ref({
    matchPlayed: !!options?.matchPlayed
  })

  const handlePlayedMatches = () => {
    filters.value.matchPlayed = !filters.value.matchPlayed
  }
  return { filters, handlePlayedMatches }
}