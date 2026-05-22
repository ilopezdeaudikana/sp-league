import type { TeamStats } from '@/types/team'

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