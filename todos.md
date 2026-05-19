
Tiebreaker explanation panel
For teams tied on points, show why one team ranks above another: head-to-head points, then goal difference, then goals scored, then name. This would make the existing logic in use-standings.ts (line 1) visible and useful.

Live “next match” / “recent result” summary
Add a small dashboard strip above the schedule showing the next unplayed match and the most recent played result. It would make the first page feel more alive without changing the app’s core.

Favorites
Let a user mark a favorite team and highlight it across schedule and standings. This could be stored locally in localStorage, so it does not need backend work.

Better loading and error states
Right now the app shows plain Loading... and Error loading matches in schedule-view.vue (line 1) and leader-board-view.vue (line 1). Skeleton rows, retry buttons, and clearer API/auth errors would make it feel more finished.


League statistics page
   Add a /stats page with top scoring teams, best defense, biggest win, highest-scoring match, draw rate, and average goals per match. All can be derived from the existing match list.

folder structure