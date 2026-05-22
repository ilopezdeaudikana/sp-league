import { createRouter, createWebHistory } from 'vue-router'
import ScheduleView from '../schedule/views/schedule-view.vue'
import Four04View from '../views/four-04-view.vue'


// enums for route names
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      component: () => import('../leader-board/views/leader-board-view.vue')
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('../teams/views/teams-view.vue')
    },
    {
      path: '/team/:id',
      name: 'team',
      component: () => import('../teams/views/team-detail-view.vue')
    },
  ]
})

