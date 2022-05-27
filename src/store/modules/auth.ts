import { AxiosResponse } from 'axios'
import { authMethod } from '@/api/authRequet'
import { defaultAxios } from '@/api/authConfig'

export default {
  state: {
    token: String,
    userRole: String
  },
  getters: {
    getUserRole (state: any) {
      return state.userRole
    }
  },
  mutations: {
    setAccessToken (state: any, accessToken: string) {
      state.accessToken = accessToken
      localStorage.setItem('accessToken', accessToken)
    },
    setUserRole (state: any, userRole: string) {
      state.credentials.userRole = userRole
      localStorage.setItem('userRole', userRole)
    },
    deleteAccessToken (state: any) {
      state.credentials.accessToken = null
      localStorage.removeItem('accessToken')
    },
    deleteUserRole (state: any) {
      state.credentials.userRole = null
      localStorage.removeItem('userRole')
    }
  },
  actions: {
    async onLogin (context: any, payload: any): Promise<boolean> {
      const response = await authMethod.login(payload.email, payload.password)
      if (response.status === 200) {
        context.commit('setAccessToken', response.data.accessToken)
        context.commit('setUserRole', response.data.userRole)
        defaultAxios.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`
        return true
      }
      return false
    },
    onLogout (context: any) {
      context.commit('deleteAccessToken')
      context.commit('deleteUserRole')
      delete defaultAxios.defaults.headers.common.Authorization
    }
  }
}
