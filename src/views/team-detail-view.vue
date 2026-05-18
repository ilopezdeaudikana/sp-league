<script setup lang="ts">
import { useMatches } from '@/hooks/useMatches'
import { computed } from 'vue'
import { router } from '../router'
import type { ApiMatch } from '@/types/match'
import { calculateTeamStats } from '../hooks/use-standings'
import type { TeamStats } from '@/types/team'
import TeamStatsTable from '../components/team-stats-table.vue'
import MatchesTable from '../components/matches-table.vue'
import PageH1 from '../components/page-h1.vue'

const { data: matches, isPending, error } = useMatches()

const team = computed(() => { return router.currentRoute.value.params.id as string })

const teamStats = computed(() => {
  return matches.value?.reduce((result, current) => {
    const { homeTeam: ht, awayTeam: awt, homeTeamScore, matchPlayed, awayTeamScore } = current
    if (ht === team.value || awt === team.value) {
      result.matches.push(current)
    }

    if (!matchPlayed) return result

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
    <PageH1>{{ team }}</PageH1>
    <TeamStatsTable
      v-if="teamStats"
      title="Stats"
      :rows="[{ team: { name: team, post: false }, ...teamStats.totals }]"
    />
    <MatchesTable
      v-if="teamStats"
      title="Matches"
      :rows="teamStats.matches"
    />
  </section>

</template>
<style scoped>
.teams {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;
}
</style>
