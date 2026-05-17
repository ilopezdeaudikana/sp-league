<script lang="ts" setup>
import ResponsiveTable, { type ColumnConfig} from './responsive-table.vue'
import PageH1 from './page-h1.vue'
import type { ApiMatch, MatchResult } from '@/types/match'
import TeamRenderer from './team-renderer.vue'

const { matches } = defineProps<{ matches: ApiMatch[] }>()

const columns: ColumnConfig<MatchResult, keyof MatchResult>[]= [
  { name: 'matchDate', key: 'matchDate', display: 'Date' },
  { name: 'stadium', key: 'stadium', display: 'Stadium' },
  { name: 'homeTeam', key: 'homeTeam', display: 'Home Team', cellRenderer: TeamRenderer },
  { name: 'result', key: 'result', display: '', style: 'font-weight: bold; font-size: 16px; text-align: center' },
  { name: 'awayTeam', key: 'awayTeam', display: 'Away Team', cellRenderer: TeamRenderer }
]

const toCustomDateFormat = (matchDate: number): string => {
  return new Date(matchDate)
    .toLocaleString('de', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    .replace(',', '')
}

const parseMatches = (items: ApiMatch[]): MatchResult[] => {
  return items.reduce<MatchResult[]>((acc, cur) => {
    const { matchDate, stadium, homeTeam, awayTeam, matchPlayed, homeTeamScore, awayTeamScore } = cur

    acc.push({
      matchDate: toCustomDateFormat(matchDate),
      stadium,
      homeTeam: { name: homeTeam, post: true },
      result: matchPlayed ? `${homeTeamScore} : ${awayTeamScore}` : `- : -`,
      awayTeam: { name: awayTeam, post: false }
    })

    return acc
  }, [])
}
</script>

<template>
  <PageH1>League Schedule</PageH1>
  <ResponsiveTable 
    v-if="matches" 
    :items="parseMatches(matches)" 
    :columns 
    :tablet-hide="['stadium']" 
    :mobile-hide="['matchDate', 'stadium']" 
  />
</template>
