import { useMatches } from './use-matches'
import { computed, type ComputedRef, type Ref } from 'vue'
import type { ApiMatch } from '@/types/match'
import { toTypedKeys } from '@/utils/toTypedKeys'

export const useFilteredMatches = <K extends keyof ApiMatch>(filters: Ref<Record<K , boolean | string>>) => {

  const { data, isPending, error } = useMatches()

  const matches: ComputedRef<ApiMatch[]> = computed(() => {
    return data.value?.filter(match => {
      toTypedKeys(filters.value).forEach((key) => {
        return match[key] === filters.value[key]
      })
    }) ?? []
  })

  return { matches, isPending, error }
}