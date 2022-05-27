import { defaultAxios } from '@/api/authConfig'
import { AxiosResponse } from 'axios'

export const authMethod = {
  async login (email: string, password: string): Promise<AxiosResponse> {
    const url = '/token'
    const data = { email, password }
    return await defaultAxios.post(url, data)
  }
}
