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

    describe('extractTiedTeams', () => {
      it('should extract an array of names of tied teams', () => {
        const { extractTiedTeams } = useStandings()
        const sortedArray = [
          { gd: 10 },
          { name: 'tied1', gd: 8 },
          { name: 'tied2', gd: 8 },
          { name: 'tied3', gd: 8 },
          { gd: 7 },
          { name: 'tied1a', gd: 6 },
          { name: 'tied2a', gd: 6 },
          { gd: -1 }
        ] as NamedTeamStats[]
        const tied = extractTiedTeams(sortedArray, 'gd')
        expect(tied.length).toBe(2)
        expect(tied).toEqual([
          ['tied2', 'tied1', 'tied3'],
          ['tied2a', 'tied1a']
        ])
      })
    })

    describe('reorderTeams', () => {
      it('should extract an array of tied teams', () => {
        const { reorderTeams, teamsByPoints, extractTiedTeams } = useStandings()
        const sortedArray = [
          { gd: 10 },
          { name: 'australia', gd: 8 },
          { name: 'japan', gd: 8 },
          { gd: -1 }
        ] as NamedTeamStats[]
        const tied = extractTiedTeams(sortedArray, 'gd', true)
        expect(tied).toEqual([['japan', 'australia']])

        teamsByPoints.value = [
          {
            name: 'italy'
          },
          {
            name: 'japan'
          },
          {
            name: 'australia'
          },
          {
            name: 'uruguay'
          }
        ] as NamedTeamStats[]
        reorderTeams(0, [
          {
            name: 'australia',
            gd: 14
          },
          {
            name: 'japan',
            gd: 60
          }
        ] as NamedTeamStats[])
        expect(teamsByPoints.value[0].name).toBe('italy')
        expect(teamsByPoints.value[1].name).toBe('australia')
        expect(teamsByPoints.value[1].gd).toBeUndefined()
        expect(teamsByPoints.value[2].name).toBe('japan')
        expect(teamsByPoints.value[2].gd).toBeUndefined()
        expect(teamsByPoints.value[3].name).toBe('uruguay')
      })
    })
  })
})
