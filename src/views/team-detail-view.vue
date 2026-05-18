<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { router } from '../router'
import { calculateTeamStats } from '../hooks/use-standings'
import type { TeamStats, TeamStatsViewModel } from '@/types/team'
import TeamStatsTable from '../components/team-stats-table.vue'
import MatchesTable from '../components/matches-table.vue'
import PageH1 from '../components/page-h1.vue'
import { useFilteredMatches } from '@/hooks/use-filtered-matches'
import MatchesFilters from '@/components/matches-filters.vue'
import { useMatchFilters } from '@/hooks/use-match-filters'

const team = computed(() => { return router.currentRoute.value.params.id as string })

const teamStandings = ref<TeamStatsViewModel[]>([])

const { filters, handlePlayedMatches } = useMatchFilters({ matchPlayed: true })

const { teamMatches, isPending, error } = useFilteredMatches(filters, team.value)

const teamStats = computed(() => {
  return teamMatches.value?.reduce((result, current) => {
    const { homeTeamScore, matchPlayed, awayTeamScore } = current

    if (!matchPlayed) return result

    result = calculateTeamStats(result, awayTeamScore, homeTeamScore)

    return result
  }, { gf: 0, ga: 0, points: 0, mp: 0, gd: 0 } as TeamStats)
})

const { stop } = watch(teamMatches, () => {
  teamStandings.value = [{ team: { name: team.value, post: false }, ...teamStats.value }]
}, { immediate: true })

watch(teamStandings, () => {
  // Only meant to be calculated once
  if (teamStandings.value.length) stop()
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
      :rows="teamStandings"
    />
    <MatchesFilters
      v-bind="filters"
      @match-payed="handlePlayedMatches"
    />
    <MatchesTable
      v-if="teamStats"
      title="Matches"
      :rows="teamMatches"
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
