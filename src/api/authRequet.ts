import { httpClient } from '@/api/axiosConfig'
import { AxiosResponse } from 'axios'

export const authMethod = {
  async login (email: string, password: string): Promise<AxiosResponse> {
    const url = '/login'
    const data = { email, password }
    return await httpClient.post(url, data)
  },
  async register (payload: any): Promise<AxiosResponse> {
    const url = '/register'
    return await httpClient.post(url, payload)
  }
}
