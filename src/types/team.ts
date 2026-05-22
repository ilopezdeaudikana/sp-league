export interface TeamStats {
  mp: number
  gf: number
  ga: number
  gd: number
  points: number
}

export interface TeamCell {
  name: string, post: boolean, highlighted?: boolean
}
export interface NamedTeamStats extends TeamStats {
  name: string
}

export interface TeamStatsRow extends TeamStats {
  team: TeamCell,
  highlighted?: boolean
}