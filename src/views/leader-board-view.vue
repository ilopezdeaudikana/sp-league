<script setup lang="ts">
import { useMatches } from '../hooks/use-matches'
import { ref, watch } from 'vue'
import type { NamedTeamStats, TeamStatsViewModel } from '@/types/team'
import { useStandings } from '../hooks/use-standings'
import PageH1 from '../components/page-h1.vue'
import TeamStatsTable from '../components/team-stats-table.vue'

const { data: matches, error, isPending } = useMatches()

const teamsForDisplay = ref<TeamStatsViewModel[]>([])

const { sortBy, parseMatches, buildTeamsPointsMap, breakTie } = useStandings()

watch(matches, () => {
  const teamsByPoints = sortBy(parseMatches(matches.value ?? []), 'points')

  const teamsPointsMap = buildTeamsPointsMap(teamsByPoints)

  const extracted = Array.from(teamsPointsMap.values()).filter(value => value.length > 1)

  if (extracted.length) {
    for (let index = 0; index < extracted.length; index++) {
      const teamNames = extracted[index].map(team => team.name)
      const tiedTeamsMatches = matches.value?.filter(
        (match) =>
          teamNames.includes(match.homeTeam) && teamNames.includes(match.awayTeam) && match.matchPlayed
      )
      if (tiedTeamsMatches?.length) {
        const subset = sortBy(parseMatches(tiedTeamsMatches ?? []), 'points')
        const sameOrder = extracted[index].every((obj, index) => {
          const targetObj = subset[index]
          if (!targetObj) return false
          return obj.name === targetObj.name
        })
        if (sameOrder) {
          breakTie(teamsPointsMap, extracted[index])
        } else {
          const ordered = extracted[index].reduce<NamedTeamStats[]>((result, current) => {
            const index = subset.findIndex(team => team.name === current.name)
            result[index] = current
            return result
          }, [])

          teamsPointsMap.set(extracted[index][0].points, ordered)
        }
      } else {
        breakTie(teamsPointsMap, extracted[index])
      }
    }
  }

  teamsForDisplay.value = Array.from(teamsPointsMap.values()).flat().reduce((acc, stats) => {
    if (!stats) return acc
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