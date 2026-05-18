<script lang="ts" setup>
import PageH1 from './page-h1.vue'
import type { ApiMatch } from '@/types/match'
import MatchesTable from './matches-table.vue'

const { matches } = defineProps<{ matches: ApiMatch[] }>()

</script>

<template>
  <PageH1>League Schedule</PageH1>
  <MatchesTable 
    v-if="matches" 
    :rows="matches" 
  />
</template>
