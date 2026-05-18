<script setup lang="ts">

import PageH1 from '../components/page-h1.vue'
import MatchesTable from '../components/matches-table.vue'
import { ref } from 'vue'
import { useFilteredMatches } from '@/hooks/use-filtered-matches'

const filters = ref({
  matchPlayed: false
})

const { matches, isPending, error } = useFilteredMatches(filters)

const handlePlayedMatches = () => {
  filters.value.matchPlayed = !filters.value.matchPlayed
}
</script>

<template>
  <div v-if="isPending">Loading...</div>
  <div v-if="error">Error loading matches</div>
  <PageH1>League Schedule</PageH1>
  <button
    class="button"
    @click="handlePlayedMatches"
  >
    {{ filters.matchPlayed ? 'Show upcoming games' : 'Show previous games' }}
  </button>
  <MatchesTable
    v-if="matches"
    :rows="matches"
  />
</template>
<style scoped>
.button {
  width: max-content;
  margin-bottom: 1rem;
  background-color: var(--vt-c-indigo-faded);
  border: 1px solid var(--vt-c-indigo);
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  color: var(--vt-c-white-soft);
}
</style>
