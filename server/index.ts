import express from 'express'
import cors from 'cors'
import { validateToken } from './token.ts'
import jwt from 'jsonwebtoken'

const app = express()
const port = 3001

const corsOptions = {
  origin: 'http://localhost:5173'
}

const baseMatches = [
  {
    matchDate: Date.UTC(2026, 3, 4, 15, 0),
    stadium: 'Maracanã',
    homeTeam: 'Brazil',
    awayTeam: 'Serbia',
    matchPlayed: true,
    homeTeamScore: 2,
    awayTeamScore: 0
  },
  {
    matchDate: Date.UTC(2026, 3, 4, 18, 0),
    stadium: 'Stade de Suisse',
    homeTeam: 'Switzerland',
    awayTeam: 'Cameroon',
    matchPlayed: true,
    homeTeamScore: 1,
    awayTeamScore: 1
  },
  {
    matchDate: Date.UTC(2026, 3, 5, 15, 0),
    stadium: 'Estadio Centenario',
    homeTeam: 'Uruguay',
    awayTeam: 'Japan',
    matchPlayed: true,
    homeTeamScore: 3,
    awayTeamScore: 2
  },
  {
    matchDate: Date.UTC(2026, 3, 5, 18, 0),
    stadium: 'Estádio da Luz',
    homeTeam: 'Portugal',
    awayTeam: 'Ghana',
    matchPlayed: true,
    homeTeamScore: 2,
    awayTeamScore: 1
  },
  {
    matchDate: Date.UTC(2026, 3, 11, 15, 0),
    stadium: 'Stadion Rajko Mitic',
    homeTeam: 'Serbia',
    awayTeam: 'Cameroon',
    matchPlayed: true,
    homeTeamScore: 0,
    awayTeamScore: 1
  },
  {
    matchDate: Date.UTC(2026, 3, 11, 18, 0),
    stadium: 'Maracanã',
    homeTeam: 'Brazil',
    awayTeam: 'Switzerland',
    matchPlayed: true,
    homeTeamScore: 3,
    awayTeamScore: 1
  },
  {
    matchDate: Date.UTC(2026, 3, 12, 15, 0),
    stadium: 'Saitama Stadium',
    homeTeam: 'Japan',
    awayTeam: 'Ghana',
    matchPlayed: true,
    homeTeamScore: 2,
    awayTeamScore: 2
  },
  {
    matchDate: Date.UTC(2026, 3, 12, 18, 0),
    stadium: 'Estadio Centenario',
    homeTeam: 'Uruguay',
    awayTeam: 'Portugal',
    matchPlayed: true,
    homeTeamScore: 1,
    awayTeamScore: 1
  },
  {
    matchDate: Date.UTC(2026, 3, 18, 15, 0),
    stadium: 'Maracanã',
    homeTeam: 'Brazil',
    awayTeam: 'Cameroon',
    matchPlayed: true,
    homeTeamScore: 4,
    awayTeamScore: 2
  },
  {
    matchDate: Date.UTC(2026, 3, 18, 18, 0),
    stadium: 'Stade de Suisse',
    homeTeam: 'Switzerland',
    awayTeam: 'Serbia',
    matchPlayed: true,
    homeTeamScore: 2,
    awayTeamScore: 2
  },
  {
    matchDate: Date.UTC(2026, 3, 19, 15, 0),
    stadium: 'Estádio da Luz',
    homeTeam: 'Portugal',
    awayTeam: 'Japan',
    matchPlayed: true,
    homeTeamScore: 6,
    awayTeamScore: 0
  },
  {
    matchDate: Date.UTC(2026, 3, 19, 18, 0),
    stadium: 'Baba Yara Stadium',
    homeTeam: 'Ghana',
    awayTeam: 'Uruguay',
    matchPlayed: true,
    homeTeamScore: 2,
    awayTeamScore: 5
  },
  {
    matchDate: Date.UTC(2026, 4, 2, 15, 0),
    stadium: 'Saitama Stadium',
    homeTeam: 'Japan',
    awayTeam: 'Brazil',
    matchPlayed: true,
    homeTeamScore: 1,
    awayTeamScore: 1
  },
  {
    matchDate: Date.UTC(2026, 4, 2, 18, 0),
    stadium: 'Baba Yara Stadium',
    homeTeam: 'Ghana',
    awayTeam: 'Switzerland',
    matchPlayed: true,
    homeTeamScore: 0,
    awayTeamScore: 2
  },
  {
    matchDate: Date.UTC(2026, 4, 3, 15, 0),
    stadium: 'Stadion Rajko Mitic',
    homeTeam: 'Serbia',
    awayTeam: 'Uruguay',
    matchPlayed: true,
    homeTeamScore: 1,
    awayTeamScore: 2
  },
  {
    matchDate: Date.UTC(2026, 4, 3, 18, 0),
    stadium: 'Ahmadou Ahidjo Stadium',
    homeTeam: 'Cameroon',
    awayTeam: 'Portugal',
    matchPlayed: true,
    homeTeamScore: 2,
    awayTeamScore: 2
  },
  {
    matchDate: Date.UTC(2026, 4, 23, 15, 0),
    stadium: 'Maracanã',
    homeTeam: 'Brazil',
    awayTeam: 'Ghana',
    matchPlayed: false,
    homeTeamScore: 0,
    awayTeamScore: 0
  },
  {
    matchDate: Date.UTC(2026, 4, 23, 18, 0),
    stadium: 'Stade de Suisse',
    homeTeam: 'Switzerland',
    awayTeam: 'Uruguay',
    matchPlayed: false,
    homeTeamScore: 0,
    awayTeamScore: 0
  },
  {
    matchDate: Date.UTC(2026, 4, 24, 15, 0),
    stadium: 'Estádio da Luz',
    homeTeam: 'Portugal',
    awayTeam: 'Serbia',
    matchPlayed: false,
    homeTeamScore: 0,
    awayTeamScore: 0
  },
  {
    matchDate: Date.UTC(2026, 4, 24, 18, 0),
    stadium: 'Saitama Stadium',
    homeTeam: 'Japan',
    awayTeam: 'Cameroon',
    matchPlayed: false,
    homeTeamScore: 0,
    awayTeamScore: 0
  },
  {
    matchDate: Date.UTC(2026, 4, 30, 15, 0),
    stadium: 'Estadio Centenario',
    homeTeam: 'Uruguay',
    awayTeam: 'Brazil',
    matchPlayed: false,
    homeTeamScore: 0,
    awayTeamScore: 0
  },
  {
    matchDate: Date.UTC(2026, 4, 30, 18, 0),
    stadium: 'Stade de Suisse',
    homeTeam: 'Switzerland',
    awayTeam: 'Portugal',
    matchPlayed: false,
    homeTeamScore: 0,
    awayTeamScore: 0
  },
  {
    matchDate: Date.UTC(2026, 4, 31, 15, 0),
    stadium: 'Stadion Rajko Mitic',
    homeTeam: 'Serbia',
    awayTeam: 'Japan',
    matchPlayed: false,
    homeTeamScore: 0,
    awayTeamScore: 0
  },
  {
    matchDate: Date.UTC(2026, 4, 31, 18, 0),
    stadium: 'Ahmadou Ahidjo Stadium',
    homeTeam: 'Cameroon',
    awayTeam: 'Ghana',
    matchPlayed: false,
    homeTeamScore: 0,
    awayTeamScore: 0
  },
  {
    matchDate: Date.UTC(2026, 5, 6, 15, 0),
    stadium: 'Estádio da Luz',
    homeTeam: 'Portugal',
    awayTeam: 'Brazil',
    matchPlayed: false,
    homeTeamScore: 0,
    awayTeamScore: 0
  },
  {
    matchDate: Date.UTC(2026, 5, 6, 18, 0),
    stadium: 'Saitama Stadium',
    homeTeam: 'Japan',
    awayTeam: 'Switzerland',
    matchPlayed: false,
    homeTeamScore: 0,
    awayTeamScore: 0
  },
  {
    matchDate: Date.UTC(2026, 5, 7, 15, 0),
    stadium: 'Baba Yara Stadium',
    homeTeam: 'Ghana',
    awayTeam: 'Serbia',
    matchPlayed: false,
    homeTeamScore: 0,
    awayTeamScore: 0
  },
  {
    matchDate: Date.UTC(2026, 5, 7, 18, 0),
    stadium: 'Ahmadou Ahidjo Stadium',
    homeTeam: 'Cameroon',
    awayTeam: 'Uruguay',
    matchPlayed: false,
    homeTeamScore: 0,
    awayTeamScore: 0
  }
]

const teamName = (team: string) => team.trim().toLowerCase()
const matchupKey = (homeTeam: string, awayTeam: string) => `${teamName(homeTeam)}:${teamName(awayTeam)}`

const existingMatchups = new Set(baseMatches.map(({ homeTeam, awayTeam }) => matchupKey(homeTeam, awayTeam)))

const reverseMatches = baseMatches
  .filter(({ homeTeam, awayTeam }) => !existingMatchups.has(matchupKey(awayTeam, homeTeam)))
  .map((match) => ({
    ...match,
    homeTeam: match.awayTeam,
    awayTeam: match.homeTeam,
    homeTeamScore: match.awayTeamScore,
    awayTeamScore: match.homeTeamScore
  }))

const matches = [...baseMatches, ...reverseMatches]

app.use(cors(corsOptions))

app.get('/api/v1/matches', (req, res) => {

  try {
    validateToken(req, res)
    res.send({
      matches
    })
  } catch (error) {
    res.status(401).send(error)
  }

})

app.get('/api/v1/token', (_, res) => {
  const payload = {
    sub: process.env.APP_USER,
    iat: Math.floor(Date.now() / 1000)
  }

  // Sign the token
  const token = jwt.sign(payload, process.env.JWT_SECRET ?? '', { expiresIn: '1h' })

  // 1. Send it in a cookie for automatic persistence
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  })

  res.send({
    token
  })
})

app.get('/api/version', (_, res) => {
  res.send({
    "version": "1"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
