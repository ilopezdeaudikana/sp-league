# sports-league

Stack: Vue 3, Vite, Vitest, Typescript.

## Requirements: 

### Routes
- `/` - should open the Schedule Page.
- `/schedule` - should open the Schedule Page.
- `/leaderboard` - should open the Leaderboard Page.
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

## API Details
The API will runs on http://localhots:3001/  

#### GET /api/version 
Authorization Required: NO

#### GET /api/v1/getAccessToken
Authorization Required: NO

#### GET /api/v1/getAllMatches
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
npx json-fake-server -m dev-mock-server-config.json
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
