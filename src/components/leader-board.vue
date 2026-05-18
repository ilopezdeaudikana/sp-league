<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { TeamStatsViewModel } from '@/types/team'
import type { ApiMatch } from '@/types/match'
import { useStandings } from '../hooks/use-standings'
import PageH1 from './page-h1.vue'
import TeamStatsTable from './team-stats-table.vue'

const { matches } = defineProps<{ matches: ApiMatch[] }>()

const teamsForDisplay = ref<TeamStatsViewModel[]>([])

const { sortBy, parseMatches, extractTiedTeams, tieBreak, teamsByPoints } = useStandings()

onMounted(() => {
  teamsByPoints.value = sortBy(parseMatches(matches), 'points')

  const extracted = extractTiedTeams(teamsByPoints.value, 'points', true)

  if (extracted.length) {
    for (let index = 0; index < extracted.length; index++) {
      const tiedTeamsMatches = matches.filter(
        (match) =>
          extracted[index].includes(match.homeTeam) && extracted[index].includes(match.awayTeam)
      )
      const parsed = parseMatches(tiedTeamsMatches)

      tieBreak(parsed, index, 0)
    }
  }
  teamsForDisplay.value = teamsByPoints.value.reduce((acc, stats) => {
    const { name, mp, gf, ga, gd, points } = stats
    acc.push({ team: { name, post: false }, mp, gf, ga, gd, points })
    return acc
  }, [] as TeamStatsViewModel[])
})
</script>

<template>
  <PageH1>League Standings</PageH1>
  <TeamStatsTable 
    :rows="teamsForDisplay"
  />
</template>
