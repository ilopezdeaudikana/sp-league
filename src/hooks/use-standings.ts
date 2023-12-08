import type { ApiMatch } from '@/types/match'
import type { NamedTeamStats, TeamStats } from '@/types/team'
import { ref } from 'vue'

export const useStandings = () => {
  const teamsByPoints = ref<NamedTeamStats[]>([])

  const initialStats: TeamStats = {
    mp: 0,
    gf: 0,
    ga: 0,
    gd: 0,
    points: 0
  }

  const precedence = ['points', 'gd', 'gf', 'name']

  const tiedIndexes: number[] = []

  const calculateTeamStats = (
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
    return items.sort((a, b) => {
      if (a[key] > b[key]) {
        return -1
      } else return 1
    })
  }

  const extractTiedTeams = (items: NamedTeamStats[], key: keyof NamedTeamStats, global = false) => {
    return items
      .reduce<string[][]>(
        (acc, stats, index) => {
          let tiedIndex = null
          const lastTiedTeamsSet = acc[acc.length - 1]
          const previousTeamStats = items[index - 1]
          if (previousTeamStats && previousTeamStats[key] === stats[key]) {
            lastTiedTeamsSet.push(stats.name)
            if (!lastTiedTeamsSet.includes(previousTeamStats.name))
              lastTiedTeamsSet.push(previousTeamStats.name)
            if (tiedIndex !== index && global) {
              tiedIndexes.push(index - 1)
            }
            tiedIndex = index
          } else {
            acc.push([])
          }
          return acc
        },
        [[]]
      )
      .filter((item) => item.length)
  }

  const reorderTeams = (index: number, reordered: NamedTeamStats[]) => {
    teamsByPoints.value.splice(
      tiedIndexes[index],
      reordered.length,
      ...reordered.map(
        (item) => teamsByPoints.value.filter((original) => original.name === item.name)[0]
      )
    )
  }

  const tieBreak = (tiedTeams: NamedTeamStats[], index: number, precendenceIndex: number) => {
    const key = precedence[precendenceIndex] as keyof NamedTeamStats
    const sorted = sortBy(tiedTeams, key)
    if (extractTiedTeams(sorted, key).length) {
      const nextKey = precedence[precendenceIndex + 1] as keyof NamedTeamStats
      const sortedByNextPrecedence = sortBy(sorted, nextKey)
      tieBreak(sortedByNextPrecedence, index, precendenceIndex + 1)
    } else {
      // Stop recursion if we end up sorting by name
      if (precendenceIndex === precedence.length - 1) reorderTeams(index, sorted.reverse())
      else reorderTeams(index, sorted)
    }
  }
  // reorderTeams is only returned for testing purposes
  return { sortBy, parseMatches, extractTiedTeams, tieBreak, reorderTeams, teamsByPoints }
}
