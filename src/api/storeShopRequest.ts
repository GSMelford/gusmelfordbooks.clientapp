import { AxiosResponse } from 'axios'
import { httpClient } from '@/api/axiosConfig'

export const storeShopMethod = {
  async getAllGenres (): Promise<AxiosResponse> {
    const url = 'api/store/genres'
    return await httpClient.get(url)
  },
  async addGenre (data: any): Promise<AxiosResponse> {
    const url = 'api/store/genre'
    return await httpClient.post(url, data)
  }
}
