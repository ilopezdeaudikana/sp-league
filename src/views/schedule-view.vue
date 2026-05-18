<script setup lang="ts">
import PageH1 from '../components/page-h1.vue'
import MatchesTable from '../components/matches-table.vue'
import MatchesFilters from '../components/matches-filters.vue'
import { useFilteredMatches } from '@/hooks/use-filtered-matches'
import { useMatchFilters } from '@/hooks/use-match-filters'
import { ref } from 'vue'

const byTeam = ref('')

const { filters, handlePlayedMatches } = useMatchFilters()

const { matches, teamMatches, isPending, error } = useFilteredMatches(filters, byTeam)

</script>

<template>
  <div v-if="isPending">Loading...</div>
  <div v-if="error">Error loading matches</div>
  <PageH1>League Schedule</PageH1>
  <MatchesFilters 
    v-model:team="byTeam"
    v-bind="filters" 
    show-search
    @match-payed="handlePlayedMatches"
    @search="$e => byTeam = $e"
  />
  <MatchesTable
    v-if="matches"
    :rows="byTeam ? teamMatches: matches"
  />
</template>

