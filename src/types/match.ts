import * as z from 'zod'

const MatchCommon = z.object({
  stadium: z.string(),
  matchPlayed: z.boolean(),
  homeTeamScore: z.number(),
  awayTeamScore: z.number()
})

type MatchCommonProps = z.infer<typeof MatchCommon>

export interface Match extends MatchCommonProps {
  homeTeam: { name: string, post: boolean }
  awayTeam: { name: string, post: boolean }
  matchDate: string
}

const ApiMatchObj = MatchCommon.extend(
  {
    homeTeam: z.string(),
    awayTeam: z.string(),
    matchDate: z.number()
  }
)

export type ApiMatch = z.infer<typeof ApiMatchObj>

export const ApiMatchSchema = z.object({ matches: z.array(ApiMatchObj)})

export interface MatchResult extends Omit<Match, 'homeTeamScore' | 'awayTeamScore' | 'matchPlayed'> {
  result: string
}