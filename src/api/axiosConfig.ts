import axios, { AxiosError } from 'axios'

const config = {
  baseURL: 'https://localhost:44397/',
  headers: {
    'Content-Type': 'application/json'
  }
}

const httpClient = axios.create(config)

httpClient.interceptors.response.use(function (response) {
  return response
}, async function (response: AxiosError) {
  if (response.response!.status === 0) {
    /* alert('SERVER ERROR')
    await store.dispatch('onLogout')
    await router.push({ name: 'login' }) */
  }
  return Promise.reject(response)
})

export { httpClient }
