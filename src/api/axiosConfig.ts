import axios from 'axios'
import store from '@/store'
import router from '@/router'

const config = {
  baseURL: 'https://localhost:44397/',
  headers: {
    'Content-Type': 'application/json'
  }
}

const httpClient = axios.create(config)

httpClient.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  if (error.status === 401) {
    await store.dispatch('onLogout')
    await router.push({ name: 'login' })
  }
  return Promise.reject(error)
})

export { httpClient }
