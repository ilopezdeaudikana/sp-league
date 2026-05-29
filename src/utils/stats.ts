import type { ApiMatch } from '@/types/match'
import type { NamedTeamStats, TeamStats } from '@/types/team'

const initialStats: TeamStats = {
  mp: 0,
  gf: 0,
  ga: 0,
  gd: 0,
  points: 0
}

export const calculateTeamStats = (
  team: TeamStats,
  ownScore: number,
  opponentsScore: number
): TeamStats => {
  const points = ownScore > opponentsScore ? 3 : ownScore === opponentsScore ? 1 : 0
  return {
    mp: team.mp + 1,
    gf: team.gf + ownScore,
    ga: team.ga + opponentsScore,
    gd: team.gf + ownScore - (team.ga + opponentsScore),
    points: team.points + points
  }
}

export const createStatsPerTeam = (items: ApiMatch[]): Record<string, TeamStats> => {
  return items.reduce<Record<string, TeamStats>>((acc, cur) => {
    const { homeTeam: ht, awayTeam: awt, matchPlayed, homeTeamScore, awayTeamScore } = cur

    if (!matchPlayed) return acc

    const homeTeam = acc[ht] ?? { ...initialStats }
    const awayTeam = acc[awt] ?? { ...initialStats }

    const homeTeamChanges = calculateTeamStats(homeTeam, homeTeamScore, awayTeamScore)
    const awayTeamChanges = calculateTeamStats(awayTeam, awayTeamScore, homeTeamScore)

    return { ...acc, [ht]: homeTeamChanges, [awt]: awayTeamChanges }
  }, {})
}

export const parseMatches = (items: ApiMatch[]): NamedTeamStats[] => {
  const results = createStatsPerTeam(items)

  return Object.keys(results).map((key: string) => {
    const { mp, gf, ga, points, gd } = results[key]
    return { name: key, mp, gf, ga, gd, points }
  })
}