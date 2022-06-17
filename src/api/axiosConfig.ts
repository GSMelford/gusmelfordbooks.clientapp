import axios, { AxiosError } from 'axios'
import store from '@/store'
import router from '@/router'

const config = {
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json'
  }
}

const httpClient = axios.create(config)

httpClient.interceptors.response.use(function (response) {
  return response
}, async function (response: AxiosError) {
  if (response.response?.data === 401) {
    await store.dispatch('onLogout')
    await router.push('login')
  }
  return Promise.reject(response)
})

export { httpClient }
