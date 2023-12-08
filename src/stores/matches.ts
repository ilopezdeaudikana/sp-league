import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ApiMatch } from '@/types/match'

export const useMatchesStore = defineStore('matches', () => {
  const matches = ref<ApiMatch[]>([])
  function setMatches(newMatches: ApiMatch[]) {
    matches.value = newMatches
  }

  return { matches, setMatches }
})
