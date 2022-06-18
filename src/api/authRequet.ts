import { httpClient } from '@/api/axiosConfig'
import { AxiosResponse } from 'axios'

export const authMethod = {
  async login (email: string, password: string): Promise<AxiosResponse> {
    const url = 'auth/login'
    const data = { email, password }
    return await httpClient.post(url, data)
  },
  async register (payload: any): Promise<AxiosResponse> {
    const url = 'auth/register'
    return await httpClient.post(url, payload)
  }
}
