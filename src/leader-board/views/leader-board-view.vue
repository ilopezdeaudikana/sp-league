<script setup lang="ts">
import { useStandings } from '../hooks/use-standings'
import PageH1 from '@/components/page-h1.vue'
import TeamStatsTable from '@/components/team-stats-table.vue'

const { teams, isPending, error } = useStandings()

</script>

<template>
  <PageH1>League Standings</PageH1>
  <div v-if="isPending">Loading...</div>
  <div v-if="error">Error loading matches</div>
  <div class="tie">
    <p>Tie-breaker rules</p>
    <p>In the event of a tie in the group standings, positions will be decided by the following criteria, in order:</p>
    <ul>
      <li>Head-to-head results. If multiple teams are tied, a mini-leaderboard is created using only the matches between
        those teams, sorted by points.</li>
      <li>Goal difference</li>
      <li>Number of goals scored</li>
      <li>Alphabetical order by team name</li>
    </ul>
  </div>
  <TeamStatsTable :rows="teams" />
</template>

<style lang="css" scoped>

.tie {
  padding: 1rem;
  margin: 0 0 1rem 0;
  border: 1px solid;
  border-radius: 0.5rem;
  border-color: var(--color-border);
  color: var(--color-text-contrast);
  background-color: var(--color-background-contrast);
  box-shadow: var(--shadow-elevated);
}

</style>