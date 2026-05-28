import { useMatches } from '@/hooks/use-matches'
import type { ApiMatch } from '@/types/match'
import type { NamedTeamStats, TeamStats, TeamStatsRow } from '@/types/team'
import { calculateTeamStats } from '@/utils/teamStats'
import { useStorage } from '@vueuse/core'
import { ref, watch } from 'vue'

export const useStandings = () => {

  const { data: matches, error, isPending } = useMatches()

  const teams = ref<TeamStatsRow[]>([])

  const favourite = useStorage('favourite-team', '')

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

  watch(matches, () => {
    if (!matches.value) return
    
    const teamsByPoints = sortBy(parseMatches(matches.value ?? []), 'points')

    const teamsPointsMap = buildTeamsPointsMap(teamsByPoints)

    const tiedTeams = Array.from(teamsPointsMap.values()).filter(value => value.length > 1)

    const matchesMap = new Map<string, ApiMatch>(matches.value.map(match => [`${match.homeTeam}-${match.awayTeam}`, match]))

    if (tiedTeams.length) {
      sortTiedTeams(tiedTeams, matchesMap, teamsPointsMap)
    }

    teams.value = Array.from(teamsPointsMap.values()).flat().reduce((acc, stats) => {
      if (!stats) return acc
      const { name, mp, gf, ga, gd, points } = stats
      acc.push({ team: { name, post: false }, mp, gf, ga, gd, points, highlighted: name === favourite.value })
      return acc
    }, [] as TeamStatsRow[])
  }, { immediate: true })

  return { teams, error, isPending }
}
