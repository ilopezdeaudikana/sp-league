import { useMatches } from '@/hooks/use-matches'
import type { ApiMatch } from '@/types/match'
import type { NamedTeamStats, TeamStatsRow } from '@/types/team'
import { sortBy } from '@/utils/sortBy'
import { parseMatches } from '@/utils/stats'
import { useStorage } from '@vueuse/core'

export const useStandings = () => {

  const favourite = useStorage('favourite-team', '')

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

  const sortTiedTeams = (tiedTeams: NamedTeamStats[][], matchesMap: Map<string, ApiMatch>, teamsPointsMap: Map<number, NamedTeamStats[]>) => {
    for (let index = 0; index < tiedTeams.length; index++) {
      const [teamA, teamB] = tiedTeams[index].map(team => team.name)
      const tiedTeamsMatches = [matchesMap.get(`${teamA}-${teamB}`), matchesMap.get(`${teamB}-${teamA}`)].filter(
        (match): match is ApiMatch => !!match && match.matchPlayed
      )
      if (tiedTeamsMatches?.length) {
        const subset = sortBy(parseMatches(tiedTeamsMatches ?? []), 'points')
        const sameOrder = tiedTeams[index].every((obj, index) => {
          const targetObj = subset[index]
          if (!targetObj) return false
          return obj.name === targetObj.name
        })
        if (sameOrder) {
          breakTie(teamsPointsMap, tiedTeams[index])
        } else {
          const ordered = tiedTeams[index].reduce<NamedTeamStats[]>((result, current) => {
            const index = subset.findIndex(team => team.name === current.name)
            result[index] = current
            return result
          }, [])

          teamsPointsMap.set(tiedTeams[index][0].points, ordered)
        }
      } else {
        breakTie(teamsPointsMap, tiedTeams[index])
      }
    }
  }

  const transformMatches = (matches: ApiMatch[]) => {
    const teamsByPoints = sortBy(parseMatches(matches), 'points')

    const teamsPointsMap = buildTeamsPointsMap(teamsByPoints)

    const tiedTeams = Array.from(teamsPointsMap.values()).filter(value => value.length > 1)

    const matchesMap = new Map<string, ApiMatch>(matches.map(match => [`${match.homeTeam}-${match.awayTeam}`, match]))

    if (tiedTeams.length) {
      sortTiedTeams(tiedTeams, matchesMap, teamsPointsMap)
    }

    return Array.from(teamsPointsMap.values()).flat().reduce((acc, stats) => {
      if (!stats) return acc
      const { name, mp, gf, ga, gd, points } = stats
      acc.push({ team: { name, post: false }, mp, gf, ga, gd, points, highlighted: name === favourite.value })
      return acc
    }, [] as TeamStatsRow[])
  }
  
  const { data: teams, error, isPending } = useMatches(transformMatches)

  return { teams, error, isPending }
}
