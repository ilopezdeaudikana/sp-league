<script setup lang="ts">
import { useMatches } from '@/hooks/use-matches'
import { parseMatches } from '@/utils/stats'
import type { ApiMatch } from '@/types/match'
import type { NamedTeamStats } from '@/types/team'
import TeamRenderer from '@/components/team-renderer.vue'

const transformMatches = (matches: ApiMatch[]) => {
  const teamStats = parseMatches(matches)
  const teams = teamStats.reduce((result, team) => {
    if (team.gf > result.bestScorer.gf) result.bestScorer = team
    if (team.ga < result.bestDefense.ga) result.bestDefense = team
    return result
  }, { bestScorer: { gf: 0 } as NamedTeamStats, bestDefense: { ga: Infinity } as NamedTeamStats })

  const matchSummary = matches.reduce((result, match) => {
    const diff = Math.abs(match.awayTeamScore - match.homeTeamScore)
    const goals = match.awayTeamScore + match.homeTeamScore
    result.totalGoals += goals
    if (match.awayTeamScore === match.homeTeamScore) result.draws++
    if (diff > result.biggestWin) {
      result.biggestWinGame = match
      result.biggestWin = diff
    }
    if (goals > result.highestScore) {
      result.highestScoreGame = match
      result.highestScore = goals
    }
    return result
  }, {
    totalGoals: 0, draws: 0, highestScore: 0, highestScoreGame: {} as ApiMatch, biggestWin: 0, biggestWinGame: {} as ApiMatch
  })
  return {
    teams,
    matchSummary: { ...matchSummary, totalGames: matches.length }
  }
}

const { data, error, isPending } = useMatches(transformMatches)

</script>

<template>
  <div v-if="isPending">Loading...</div>
  <div v-if="error">Error loading matches</div>
  <template v-if="data">
    <section class="container">
      <article class="stats">
        <h3>Games played: {{ data?.matchSummary.totalGames }}</h3>
        <h3>Best scorer team: <span class="strong">{{ data?.teams.bestScorer.name }}</span> with {{ data?.teams.bestScorer.gf }}
          goals</h3>
        <h3>Best defense team: <span class="strong">{{ data?.teams.bestDefense.name }}</span> with {{
          data?.teams.bestDefense.ga }} goals</h3>
        <div>
          <h3>Biggest win</h3>
          <div class="match">
            <TeamRenderer
              :name="data?.matchSummary.biggestWinGame.homeTeam"
              :post="false"
            />
            <p>{{ data?.matchSummary.biggestWinGame.homeTeamScore }} - {{
              data?.matchSummary.biggestWinGame.awayTeamScore }}</p>
            <TeamRenderer
              :name="data?.matchSummary.biggestWinGame.awayTeam"
              post
            />
          </div>
        </div>
        <div>
          <h3>Highest-scoring match</h3>
          <div class="match">
            <TeamRenderer
              :name="data?.matchSummary.highestScoreGame.homeTeam"
              :post="false"
            />
            <p>{{ data?.matchSummary.highestScoreGame.homeTeamScore }} - {{
              data?.matchSummary.highestScoreGame.awayTeamScore }}</p>
            <TeamRenderer
              :name="data?.matchSummary.highestScoreGame.awayTeam"
              post
            />
          </div>
        </div>
        <h3>Draw rate: {{ (data?.matchSummary.draws / data?.matchSummary.totalGames).toFixed(2) }}</h3>
        <h3>Average goals per game: {{ (data?.matchSummary.totalGoals / data?.matchSummary.totalGames).toFixed(2) }}
        </h3>
      </article>
    </section>
  </template>


</template>
<style scoped>
.container {
  display: grid;
  gap: 1rem;
  width: max-content;
  align-self: center;
  padding-top: 2rem;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.match {
  display: grid;
  grid-template-columns: 1fr 2.5rem 1fr;
  width: 25rem;
  gap: 0.5rem;
  align-items: center;
  margin: 1rem 0;
  padding: 0 1rem;
}

.strong {
  font-weight: bolder;
}
</style>
