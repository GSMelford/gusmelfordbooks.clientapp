import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import { UserRoles } from '@/store/modules/roles'
import { httpClient } from '@/api/axiosConfig'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: 'Login | GusMelfordBooks'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'Home | Shop',
      requiresAuth: true
    }
  },
  {
    path: '/admin-panel',
    name: 'admin',
    component: () => import('../views/AdminPanelView.vue'),
    meta: {
      title: 'Admin Panel',
      requiresAuth: true,
      adminRoleRequired: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find((r) => r.meta && r.meta.title)
  document.title = `${nearestWithTitle?.meta.title || 'GusMelford Books'}`
  if (to.meta.requiresAuth) {
    httpClient.defaults.headers.common.Authorization = `Bearer ${store.getters.getToken}`
    if (store.getters.getAuthState) {
      const role = store.getters.getUserRole
      if (to.meta.adminRoleRequired) {
        if (role === UserRoles.Admin) {
          next()
        } else {
          next({ name: 'home' })
        }
      }
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
