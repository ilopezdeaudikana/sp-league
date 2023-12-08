<script lang="ts" setup>
import ResponsiveTable from './responsive-table.vue'
import PageH1 from './page-h1.vue'
import type { ApiMatch, MatchResult } from '@/types/match'
import TeamRenderer from './team-renderer.vue'
import { useMatchesStore } from '@/stores/matches'

const store = useMatchesStore()

const columns = [
  { name: 'matchDate', display: 'Date' },
  { name: 'stadium', display: 'Stadium' },
  { name: 'homeTeam', display: 'Home Team' },
  { name: 'result', display: '' },
  { name: 'awayTeam', display: 'Away Team' }
]

const columnsMetada = {
  homeTeam: {
    cellRenderer: TeamRenderer
  },
  awayTeam: {
    cellRenderer: TeamRenderer
  },
  result: {
    style: 'font-weight: bold; font-size: 16px; text-align: center'
  }
}

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

const parseMatches = (items: ApiMatch[]) => {
  return items.reduce<Partial<MatchResult>[]>((acc, cur) => {
    const { matchDate, stadium, homeTeam, awayTeam, matchPlayed, homeTeamScore, awayTeamScore } =
      cur

    if (matchPlayed) {
      acc.push({
        matchDate: toCustomDateFormat(matchDate),
        stadium,
        homeTeam: { name: homeTeam, post: true },
        result: `${homeTeamScore} : ${awayTeamScore}`,
        awayTeam: { name: awayTeam, post: false }
      })
    } else {
      acc.push({
        matchDate: toCustomDateFormat(matchDate),
        stadium,
        homeTeam: { name: homeTeam, post: true },
        result: `- : -`,
        awayTeam: { name: awayTeam, post: false }
      })
    }
    return acc
  }, [])
}
</script>

<template>
  <PageH1>League Schedule</PageH1>
  <ResponsiveTable
    v-if="store.matches"
    :items="parseMatches(store.matches)"
    :columns="columns"
    :meta="columnsMetada"
    :tablet-hide="['stadium']"
    :mobile-hide="['matchDate', 'stadium']"
  />
</template>
