import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const authGuard = function (to: any, from: any, next: any) {
  if (isAuthorized) {
    next()
  } else {
    next({ name: 'login' })
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    beforeEnter: authGuard
  }
]

const isAuthorized = localStorage.getItem('accessToken')

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
