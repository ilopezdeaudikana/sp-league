import type { ApiMatch } from '@/types/match'
import type { NamedTeamStats, TeamStats } from '@/types/team'
import { calculateTeamStats } from '@/utils/teamStats'

export const useStandings = () => {

  const initialStats: TeamStats = {
    mp: 0,
    gf: 0,
    ga: 0,
    gd: 0,
    points: 0
  }

  const createStatsPerTeam = (items: ApiMatch[]): Record<string, TeamStats> => {
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

  const parseMatches = (items: ApiMatch[]): NamedTeamStats[] => {
    const results = createStatsPerTeam(items)

    return Object.keys(results).map((key: string) => {
      const { mp, gf, ga, points, gd } = results[key]
      return { name: key, mp, gf, ga, gd, points }
    })
  }

  const sortBy = (items: NamedTeamStats[], key: keyof NamedTeamStats) => {
    // toSorted returns a new array
    return items.toSorted((a, b) => {
      if (a[key] < b[key]) return 1
      if (a[key] > b[key]) return -1
      return 0
    })
  }

  const buildTeamsPointsMap = (items: NamedTeamStats[]) => {
    const teamsPointsMap = new Map<number, NamedTeamStats[]>()
    items.forEach(team => {
      if (teamsPointsMap.has(team.points)) {
        const existing = teamsPointsMap.get(team.points)
        existing?.push(team)
        teamsPointsMap.set(team.points, existing ?? [])
      } else {
        teamsPointsMap.set(team.points, [team])
      }
    })
    return teamsPointsMap
  }


  const breakTie = (teamsPointsMap: Map<number, NamedTeamStats[]>, subset: NamedTeamStats[]) => {
    const byGoalDiff = sortBy(subset, 'gd')
    // different order breaks equality
    if (JSON.stringify(subset) === JSON.stringify(byGoalDiff)) {
      const byScoredGoals = sortBy(subset, 'gf')
      if (JSON.stringify(subset) === JSON.stringify(byScoredGoals)) {
        // Sorts inline, modifying the original array
        subset.sort((a, b) => a.name.localeCompare(b.name))
        teamsPointsMap.set(subset[0].points, subset)
      } else {
        teamsPointsMap.set(subset[0].points, byScoredGoals)
      }
    } else {
      teamsPointsMap.set(subset[0].points, byGoalDiff)
    }
  }

  return { sortBy, parseMatches, buildTeamsPointsMap, breakTie }
}
