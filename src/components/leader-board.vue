<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { TeamStatsViewModel } from '@/types/team'
import type { ApiMatch } from '@/types/match'
import { useStandings } from '../hooks/use-standings'
import ResponsiveTable, { type ColumnConfig } from './responsive-table.vue'
import PageH1 from './page-h1.vue'
import TeamRenderer from './team-renderer.vue'

const { matches } = defineProps<{ matches: ApiMatch[] }>()

const teamsForDisplay = ref<TeamStatsViewModel[]>([])

const columns: ColumnConfig<TeamStatsViewModel, keyof TeamStatsViewModel>[] = [
  { name: 'team', key: 'team', display: 'Name', cellRenderer: TeamRenderer },
  { name: 'mp', key: 'mp', display: 'MP', centered: true },
  { name: 'gf', key: 'gf', display: 'GF', centered: true },
  { name: 'ga', key: 'ga', display: 'GA', centered: true },
  { name: 'gd', key: 'gd', display: 'GD', centered: true },
  { name: 'points', key: 'points', display: 'Points', centered: true, style: 'font-weight: bold; font-size: 16px;' }
]

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
  <ResponsiveTable 
    :items="teamsForDisplay" 
    :columns  
    :desktop-hide="['gd']" 
    :tablet-hide="['gd']"
    :mobile-hide="['gf', 'ga']" 
  />
</template>
