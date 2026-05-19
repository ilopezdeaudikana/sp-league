<script setup lang="ts">
import { useMatches } from '../hooks/use-matches'
import { onMounted, ref } from 'vue'
import type { TeamStatsViewModel } from '@/types/team'
import { useStandings } from '../hooks/use-standings'
import PageH1 from '../components/page-h1.vue'
import TeamStatsTable from '../components/team-stats-table.vue'

const { data: matches, error, isPending } = useMatches()

const teamsForDisplay = ref<TeamStatsViewModel[]>([])

const { sortBy, parseMatches, extractTiedTeams, tieBreak, teamsByPoints } = useStandings()

onMounted(() => {
  teamsByPoints.value = sortBy(parseMatches(matches.value ?? []), 'points')

  const extracted = extractTiedTeams(teamsByPoints.value, 'points', true)

  if (extracted.length) {
    for (let index = 0; index < extracted.length; index++) {
      const tiedTeamsMatches = matches.value?.filter(
        (match) =>
          extracted[index].includes(match.homeTeam) && extracted[index].includes(match.awayTeam)
      )
      const parsed = parseMatches(tiedTeamsMatches ?? [])

      tieBreak(parsed, index, 0)
    }
  }
  teamsForDisplay.value = teamsByPoints.value.reduce((acc, stats) => {
    const { name, mp, gf, ga, gd, points } = stats
    acc.push({ team: { name, post: false }, mp, gf, ga, gd, points })
    return acc
  }, [] as TeamStatsViewModel[])
})
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
  <TeamStatsTable :rows="teamsForDisplay" />
</template>
<style lang="css" scoped>
.tie {
  padding: 1rem;
  margin: 0 0 1rem 0;
  border: 1px solid;
  border-radius: 0.5rem;
  border-color: var(--vt-c-indigo-faded);
  color: var(--vt-c-white-soft);
  background-color: var(--vt-c-indigo);
  box-shadow: var(--shadow-elevated);
}
</style>