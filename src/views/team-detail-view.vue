<script setup lang="ts">
import { computed, ref } from 'vue'
import { router } from '../router'
import { calculateTeamStats } from '../hooks/use-standings'
import type { TeamStats } from '@/types/team'
import TeamStatsTable from '../components/team-stats-table.vue'
import MatchesTable from '../components/matches-table.vue'
import PageH1 from '../components/page-h1.vue'
import { useFilteredMatches } from '@/hooks/use-filtered-matches'


const team = computed(() => { return router.currentRoute.value.params.id as string })

const filters = ref({
  matchPlayed: false,
  awayTeam: team.value,
  homeTeam: team.value
})

const { matches, isPending, error } = useFilteredMatches(filters)

const teamStats = computed(() => {
  return matches.value?.reduce((result, current) => {
    const { homeTeamScore, matchPlayed, awayTeamScore } = current

    if (!matchPlayed) return result

    result = calculateTeamStats(result, awayTeamScore, homeTeamScore)

    return result
  }, { gf: 0, ga: 0, points: 0, mp: 0, gd: 0 } as TeamStats)
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
      :rows="[{ team: { name: team, post: false }, ...teamStats }]"
    />
    <MatchesTable
      v-if="teamStats"
      title="Matches"
      :rows="matches"
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
