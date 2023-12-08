export interface TeamStats {
  mp: number
  gf: number
  ga: number
  gd: number
  points: number
}

export interface NamedTeamStats extends TeamStats {
  name: string
}

export interface TeamStatsViewModel extends TeamStats {
  team: { name: string, post: boolean }
}