<script setup lang="ts">
import PageH1 from '../components/page-h1.vue'
import MatchesTable from '../components/matches-table.vue'
import MatchesFilters from '../components/matches-filters.vue'
import Calendar from '@/components/calendar.vue'
import { useFilteredMatches } from '@/hooks/use-filtered-matches'
import { useMatchFilters } from '@/hooks/use-match-filters'
import { computed, ref } from 'vue'

const byTeam = ref('')

const calendarView = ref(false)

const { filters, handlePlayedMatches } = useMatchFilters()

const { matches, teamMatches, isPending, error } = useFilteredMatches(filters, byTeam)

const matchDates = computed(()=> (byTeam.value ? teamMatches : matches).value.map(match => new Date(match.matchDate)).sort((a: Date, b: Date) => a.getTime() - b.getTime()))

</script>

<template>
  <div v-if="isPending">Loading...</div>
  <div v-if="error">Error loading matches</div>
  <PageH1>League Schedule</PageH1>
  <MatchesFilters 
    v-model:team="byTeam"
    v-bind="filters" 
    :calendar-view
    show-search
    @match-payed="handlePlayedMatches"
    @search="$e => byTeam = $e"
    @calendar-view="$e => calendarView = $e"
  />
  <MatchesTable
    v-if="matches && !calendarView"
    :rows="byTeam ? teamMatches: matches"
  />
  <Calendar 
    v-if="calendarView" 
    :match-dates 
    :matches="byTeam ? teamMatches : matches"
  />
</template>

