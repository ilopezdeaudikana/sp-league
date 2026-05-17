<script setup lang="ts">
import { useMatches } from '@/hooks/useMatches'
import { computed } from 'vue'
import { router } from '../router'
import type { ApiMatch } from '@/types/match'
import { calculateTeamStats } from '../hooks/use-standings'
import type { TeamStats } from '@/types/team'

const { data: matches, isPending, error } = useMatches()

const team = computed(() => { return router.currentRoute.value.params.id })

const teamStats = computed(() => {
  return matches.value?.reduce((result, current) => {
    const { homeTeam: ht, awayTeam: awt, homeTeamScore, awayTeamScore } = current
    console.log(ht, team.value)
    if (ht === team.value || awt === team.value) {
      result.matches.push(current)
    }

    if (ht === team.value) {
      result.totals = calculateTeamStats(result.totals, homeTeamScore, awayTeamScore)
    }

    if (awt === team.value) {
      result.totals = calculateTeamStats(result.totals, awayTeamScore, homeTeamScore)
    }
    return result
  }, { matches: [] as ApiMatch[], totals: { gf: 0, ga: 0, points: 0, mp: 0, gd: 0 } as TeamStats })
})

</script>

<template>
  <div v-if="isPending">Loading...</div>
  <div v-if="error">Error loading matches</div>
  <section class="teams">
    <template
      v-for="value in teamStats"
      :key="value"
    >
      <p>{{ value }}</p>
    </template>
  </section>

</template>
<style scoped>
.teams {
  display: grid;
  gap: 1rem;
  width: 50rem;
  align-self: center;
  padding-top: 2rem;
  justify-content: flex-start;
  align-content: space-evenly;
  grid-template-columns: 1fr 1fr 1fr;
}

.flag {
  height: 12rem;
  width: 15rem;
  border: 1px solid;
  border-radius: 2rem;
  border-color: var(--vt-c-indigo);
  margin: 0 auto;
  cursor: pointer;
}
</style>
