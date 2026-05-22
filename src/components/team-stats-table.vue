<script lang="ts" setup>
import type { TeamStatsRow } from '@/types/team'
import type { ColumnConfig } from '@/components/responsive-table.vue'
import ResponsiveTable from '@/components/responsive-table.vue'
import TeamRenderer from '@/components/team-renderer.vue'

defineProps<{
  title?: string
  rows: TeamStatsRow[]
}>()

const columns: ColumnConfig<TeamStatsRow, keyof TeamStatsRow>[] = [
  { name: 'team', key: 'team', display: 'Name', cellRenderer: TeamRenderer },
  { name: 'mp', key: 'mp', display: 'MP', centered: true },
  { name: 'gf', key: 'gf', display: 'GF', centered: true },
  { name: 'ga', key: 'ga', display: 'GA', centered: true },
  { name: 'gd', key: 'gd', display: 'GD', centered: true },
  { name: 'points', key: 'points', display: 'Points', centered: true, style: 'font-weight: bold; font-size: 16px;' }
]

</script>
<template>
  <ResponsiveTable 
    :title
    :rows
    :columns
    :tablet-hide="['gd']"
    :mobile-hide="['gf', 'ga']" 
  />
</template>