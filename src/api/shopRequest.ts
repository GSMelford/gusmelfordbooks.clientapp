import { AxiosResponse } from 'axios'
import { httpClient } from '@/api/axiosConfig'

export const shopMethod = {
  async getUserBooks (): Promise<AxiosResponse> {
    const url = 'api/shop/user-books'
    return await httpClient.get(url)
  },
  async buyBooks (data: any): Promise<AxiosResponse> {
    const url = 'api/shop/buy-books'
    return await httpClient.post(url, data)
  }
}
