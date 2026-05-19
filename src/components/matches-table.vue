<script lang="ts" setup>
import type { ColumnConfig } from './responsive-table.vue'
import ResponsiveTable from './responsive-table.vue'
import TeamRenderer from './team-renderer.vue'
import { computed } from 'vue'
import type { ApiMatch, MatchResult } from '@/types/match'
import { toCustomDateFormat } from '@/utils/toCustomDate'

const { rows } = defineProps<{
  title?: string
  rows: ApiMatch[]
}>()

const columns: ColumnConfig<MatchResult, keyof MatchResult>[] = [
  { name: 'matchDate', key: 'matchDate', display: 'Date' },
  { name: 'stadium', key: 'stadium', display: 'Stadium' },
  { name: 'homeTeam', key: 'homeTeam', display: 'Home Team', cellRenderer: TeamRenderer },
  { name: 'result', key: 'result', display: '', style: 'font-weight: bold; font-size: 16px; text-align: center' },
  { name: 'awayTeam', key: 'awayTeam', display: 'Away Team', cellRenderer: TeamRenderer }
]

const matches = computed(() => {
  return rows.reduce<MatchResult[]>((acc, cur) => {
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
})

</script>
<template>
  <ResponsiveTable
    :title
    :rows="matches"
    :columns
    :tablet-hide="['stadium']"
    :mobile-hide="['matchDate', 'stadium']"
  />
</template>