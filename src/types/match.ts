interface MatchCommonProps {
  stadium: string
  matchPlayed: boolean
  homeTeamScore: number
  awayTeamScore: number
}
export interface Match extends MatchCommonProps{
  homeTeam: { name: string, post: boolean }
  awayTeam: { name: string, post: boolean }
  matchDate: string
}

export interface ApiMatch extends MatchCommonProps{
  homeTeam: string
  awayTeam: string
  matchDate: number
}

export interface MatchResult extends Match {
  result: string
}