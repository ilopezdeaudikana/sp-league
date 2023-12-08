<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { TeamStatsViewModel } from '@/types/team'
import { useStandings } from '../hooks/use-standings'
import ResponsiveTable from './responsive-table.vue'
import PageH1 from './page-h1.vue'
import TeamRenderer from './team-renderer.vue'
import { useMatchesStore } from '@/stores/matches'

const store = useMatchesStore()

const teamsForDisplay = ref<TeamStatsViewModel[]>([])

const columns = [
  { name: 'team', display: 'Name' },
  { name: 'mp', display: 'MP' },
  { name: 'gf', display: 'GF' },
  { name: 'ga', display: 'GA' },
  { name: 'gd', display: 'GD' },
  { name: 'points', display: 'Points' }
]

const columnsMetada = {
  team: {
    cellRenderer: TeamRenderer
  },
  points: {
    style: 'font-weight: bold; font-size: 16px;'
  }
}

const { sortBy, parseMatches, extractTiedTeams, tieBreak, teamsByPoints } = useStandings()

onMounted(() => {
  teamsByPoints.value = sortBy(parseMatches(store.matches), 'points')

  const extracted = extractTiedTeams(teamsByPoints.value, 'points', true)

  if (extracted.length) {
    for (let index = 0; index < extracted.length; index++) {
      const tiedTeamsMatches = store.matches.filter(
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
  <ResponsiveTable
    :items="teamsForDisplay"
    :columns="columns"
    :meta="columnsMetada"
    :desktop-hide="['gd']"
    :tablet-hide="['gd']"
    :mobile-hide="['gf', 'ga']"
  />
</template>
