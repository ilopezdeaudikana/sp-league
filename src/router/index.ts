import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ScheduleView from '../views/schedule-view.vue'
import LeaderBoardView from '../views/leader-board-view.vue'
import Four04View from '../views/four-04-view.vue'


// dynamic imports, enums for route names
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // }
    {
      path: '/:pathMatch(.*)*',
      name: 'Four04',
      component: Four04View
    },
    {
      path: '/',
      name: 'main',
      component: ScheduleView
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: ScheduleView
    },
    {
      path: '/leaderboard',
      name: 'leaderBoard',
      component: LeaderBoardView
    }
  ]
})

export default router
