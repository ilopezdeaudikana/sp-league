# sports-league

Stack: Vue 3, Vite, Vitest, Typescript.

## Requirements: 

### Routes
- `/` - opens the Schedule Page.
- `/schedule` -  opens the Schedule Page.
- `/leaderboard` - opens the Leaderboard Page.
- `/teams` - shows a list with all teams.
- `/teams/:id` - open a view for an specific team.
- Any other route should show the 404 Not Found page.

#### Tie Breaker: 
- For each victory teams will get 3 points.
- For each draw teams will get 1 point.
- Teams in the leaderboard are ordered by the number of points in descending order.

In case two or more teams have the same number of points a tiebreaker is done in the following order:
- The first tiebreaker is the number of points in head-to-head matches between the teams that have the same number of points. So, if multiple teams have the same number of points the order is defined by “creating” a mini leaderboard of those teams only and sorting them only by the number of points.
- The second tiebreaker is goal difference.
- The third tiebreaker is the number of scored goals.
- The final tiebreaker is alphabetic ascending order by name.

### API Details
The API will run on http://localhots:3001/  

#### GET /api/version 
Authorization Required: NO

#### GET /api/{version}/token
Authorization Required: NO

#### GET /api/{version}/matches
Authorization Required: YES (Bearer Token)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

```sh
cd server &&  node --env-file=.env index.ts
```

You need to create a `server/.env` file with two env variables for the mocked authorization to work
```
JWT_SECRET="foo"
APP_USER="bar"
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
