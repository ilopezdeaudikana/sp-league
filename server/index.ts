import express from 'express'
import cors from 'cors'
import { validateToken } from './token.ts'
import jwt from 'jsonwebtoken'

const app = express()
const port = 3001

const corsOptions = {
  origin: 'http://localhost:5173'
}

app.use(cors(corsOptions))

app.get('/api/v1/matches', (req, res) => {

  try {
    validateToken(req, res)
    res.send({
      "matches": [
        {
          "matchDate": 1651744228685,
          "stadium": "Maracanã",
          "homeTeam": "Brazil",
          "awayTeam": "Serbia",
          "matchPlayed": true,
          "homeTeamScore": 1,
          "awayTeamScore": 0
        },
        {
          "matchDate": 1651744228685,
          "stadium": "Stade de Suisse",
          "homeTeam": "Switzerland",
          "awayTeam": "Serbia",
          "matchPlayed": true,
          "homeTeamScore": 2,
          "awayTeamScore": 2
        },
        {
          "matchDate": 1651744228685,
          "stadium": "Stadion Rajko Mitic",
          "homeTeam": "Serbia",
          "awayTeam": "Cameroon",
          "matchPlayed": true,
          "homeTeamScore": 0,
          "awayTeamScore": 1
        },
        {
          "matchDate": 1651744228685,
          "stadium": "Maracanã",
          "homeTeam": "Brazil",
          "awayTeam": "Switzerland",
          "matchPlayed": true,
          "homeTeamScore": 3,
          "awayTeamScore": 0
        },
        {
          "matchDate": 1651744228685,
          "stadium": "Maracanã",
          "homeTeam": "Brazil",
          "awayTeam": "Cameroon",
          "matchPlayed": true,
          "homeTeamScore": 4,
          "awayTeamScore": 4
        },
        {
          "matchDate": 1651744228685,
          "stadium": "Stade de Suisse",
          "homeTeam": "Switzerland",
          "awayTeam": "Cameroon",
          "matchPlayed": true,
          "homeTeamScore": 2,
          "awayTeamScore": 2
        }
      ]
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
