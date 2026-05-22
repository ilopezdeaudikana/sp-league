import { describe, it, expect, vi, afterEach } from 'vitest'
import { useStandings } from './use-standings'

import type { NamedTeamStats } from '@/types/team'
import type { ApiMatch } from '@/types/match'

const matches = [
  {
    homeTeam: 'italy',
    awayTeam: 'australia',
    matchPlayed: true,
    homeTeamScore: 1,
    awayTeamScore: 3
  },
  {
    homeTeam: 'japan',
    awayTeam: 'italy',
    matchPlayed: true,
    homeTeamScore: 2,
    awayTeamScore: 2
  },
  {
    homeTeam: 'italy',
    awayTeam: 'uruguay',
    matchPlayed: true,
    homeTeamScore: 1,
    awayTeamScore: 3
  },
  {
    homeTeam: 'australia',
    awayTeam: 'japan',
    matchPlayed: true,
    homeTeamScore: 1,
    awayTeamScore: 3
  },
  {
    homeTeam: 'australia',
    awayTeam: 'uruguay',
    matchPlayed: true,
    homeTeamScore: 1,
    awayTeamScore: 2
  },
  {
    homeTeam: 'uruguay',
    awayTeam: 'japan',
    matchPlayed: true,
    homeTeamScore: 1,
    awayTeamScore: 3
  }
] as ApiMatch[]

describe('useStandings', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('parseMatches', () => {
    it('should return the correct results and type', () => {
      const { parseMatches } = useStandings()

      const parsed = parseMatches(matches)
      expect(parsed[0]).toEqual({
        ga: 8,
        gd: -4,
        gf: 4,
        mp: 3,
        name: 'italy',
        points: 1
      })
    })
  })

  describe('sortBy', () => {
    it('should return a sorted array', () => {
      const { sortBy } = useStandings()
      const disArray = [{ gd: -1 }, { gd: 10 }, { gd: 8 }] as NamedTeamStats[]
      const sorted = sortBy(disArray, 'gd')
      expect(sorted[0]).toEqual({
        gd: 10
      })
      expect(sorted[1]).toEqual({
        gd: 8
      })
    })
  })

  describe('buildTeamsPointsMap', () => {
    it('should generate a map of teams grouped by points', () => {
      const { buildTeamsPointsMap } = useStandings()
      const sortedArray = [
        { gd: 10, points: 1 },
        { name: 'tied1', points: 8, gd: 10 },
        { name: 'tied2', points: 8 },
        { name: 'tied3', points: 8 },
        { gd: 7, points: 3 },
        { name: 'tied1a', points: 6 },
        { name: 'tied2a', points: 6 },
        { gd: -1, points: 9 }
      ] as NamedTeamStats[]
      const tied = Array.from(
        buildTeamsPointsMap(sortedArray).values())
        .filter(value => value.length > 1)
        .map(teams => teams.map(team => team.name)
        )
      expect(tied.length).toBe(2)
      expect(tied).toEqual([
        ['tied1', 'tied2', 'tied3'],
        ['tied1a', 'tied2a']
      ])
    })
  })

  describe('breakTie', () => {
    it('should generate a map of teams grouped by points', () => {
      const { buildTeamsPointsMap, breakTie } = useStandings()
      const sortedArray = [
        { gd: 10, points: 1 },
        { name: 'tied1', points: 8, gd: 10 },
        { name: 'tied3', points: 8, gd: 4, gf: 5 },
        { name: 'tied2', points: 8, gd: 4, gf: 12 },
        { gd: 7, points: 3 },
        { name: 'first', points: 6, gd: 4, gf: 5 },
        { name: 'second', points: 6, gd: 4, gf: 5 },
        { gd: -1, points: 9 }
      ] as NamedTeamStats[]
      const teamsMap = buildTeamsPointsMap(sortedArray)
      const tiedTeams = Array.from(teamsMap.values()).filter(value => value.length > 1)

      breakTie(teamsMap, tiedTeams[1])

      expect(teamsMap.get(tiedTeams[1][0].points)).toEqual([
        {
          "gd": 4,
          "gf": 5,
          "name": "first",
          "points": 6,
        },
        {
          "gd": 4,
          "gf": 5,
          "name": "second",
          "points": 6,
        },
      ])
      breakTie(teamsMap, tiedTeams[0])

      expect(teamsMap.get(tiedTeams[0][0].points)).toEqual([
        {
          "gd": 10,
          "name": "tied1",
          "points": 8,
        },
        {
          "gd": 4,
          "gf": 12,
          "name": "tied2",
          "points": 8,
        },
        {
          "gd": 4,
          "gf": 5,
          "name": "tied3",
          "points": 8,
        },
      ])
    })
  })
})
