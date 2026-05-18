<script setup lang="ts">

import PageH1 from '../components/page-h1.vue'
import MatchesTable from '../components/matches-table.vue'
import MatchesFilters from '../components/matches-filters.vue'
import { useFilteredMatches } from '@/hooks/use-filtered-matches'
import { useMatchFilters } from '@/hooks/use-match-filters'

const { filters, handlePlayedMatches } = useMatchFilters()

const { matches, isPending, error } = useFilteredMatches(filters)

</script>

<template>
  <div v-if="isPending">Loading...</div>
  <div v-if="error">Error loading matches</div>
  <PageH1>League Schedule</PageH1>
  <MatchesFilters v-bind="filters" @match-payed="handlePlayedMatches"/>
  <MatchesTable
    v-if="matches"
    :rows="matches"
  />
</template>

