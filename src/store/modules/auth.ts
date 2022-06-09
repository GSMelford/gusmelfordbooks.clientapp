import { authMethod } from '@/api/authRequet'
import { httpClient } from '@/api/axiosConfig'

export default {
  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    userRole: localStorage.getItem('userRole') || null,
    name: localStorage.getItem('name') || null
  },
  getters: {
    getToken (state: any): string {
      return state.accessToken
    },
    getAuthState (state: any): boolean {
      return state.accessToken !== null
    },
    getUserRole (state: any): string {
      return state.userRole
    },
    getName (state: any): string {
      return state.name
    }
  },
  mutations: {
    setAccessToken (state: any, accessToken: string) {
      state.accessToken = accessToken
      localStorage.setItem('accessToken', accessToken)
    },
    setUserRole (state: any, userRole: string) {
      state.userRole = userRole
      localStorage.setItem('userRole', userRole)
    },
    setName (state: any, name: string) {
      state.name = name
      localStorage.setItem('name', name)
    },
    deleteAccessToken (state: any) {
      state.accessToken = null
      localStorage.removeItem('accessToken')
    },
    deleteUserRole (state: any) {
      state.userRole = null
      localStorage.removeItem('userRole')
    },
    deleteName (state: any) {
      state.name = null
      localStorage.removeItem('name')
    }
  },
  actions: {
    async onLogin (context: any, payload: any): Promise<boolean> {
      const response = await authMethod.login(payload.email, payload.password)
      if (response.status === 200) {
        context.commit('setAccessToken', response.data.accessToken)
        context.commit('setUserRole', response.data.userRole)
        context.commit('setName', response.data.name)
        return true
      }
      return false
    },
    onLogout (context: any) {
      context.commit('deleteAccessToken')
      context.commit('deleteUserRole')
      context.commit('deleteName')
    },
    async register (context: any, payload: any): Promise<boolean> {
      const response = await authMethod.register(payload)
      if (response.status === 200) {
        return await context.dispatch('onLogin', payload)
      }
      return false
    }
  }
}
