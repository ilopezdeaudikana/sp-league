import express from 'express'
import cors from 'cors'
import { validateToken } from './token.middleware.ts'

const app = express()
const port = 3001

const corsOptions = {
  origin: 'http://localhost:5173'
}

const cookieOptions: express.CookieOptions = {
  httpOnly: true,   // Prevents JS from reading the cookie (No XSS theft)
  secure: true,     // Only sent over HTTPS
  sameSite: 'lax',  // Balance between security and usability
  maxAge: 1000 * 60 * 60 * 24 // 24 hours
}

app.use(cors())


app.use((req, res, next) => {
  validateToken(req, res, next)
})

app.get('/api/v1/matches', (req, res) => {
  res.send({
    "success": true,
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
})

app.get('/api/v1/matches', (req, res) => {
  res.send({
    "success": true,
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
})

app.get('/api/v1/token', (req, res) => {
  res.send({
    "success": true,
    token: ''
  })
})

app.get('/api/version', (req, res) => {
  res.send({
    "success": true,
    "version": "1.0"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
