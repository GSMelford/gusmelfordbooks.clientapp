import { AxiosResponse } from 'axios'
import { httpClient } from '@/api/axiosConfig'

export const storeShopMethod = {
  async addGenre (data: any): Promise<AxiosResponse> {
    const url = 'api/store/genre'
    return await httpClient.post(url, data)
  },
  async addAuthor (data: any): Promise<AxiosResponse> {
    const url = 'api/store/author'
    return await httpClient.post(url, data)
  },
  async addAddress (data: any): Promise<AxiosResponse> {
    const url = 'api/store/address'
    return await httpClient.post(url, data)
  },
  async addPublisher (data: any): Promise<AxiosResponse> {
    const url = 'api/store/publisher'
    return await httpClient.post(url, data)
  },
  async addBook (data: any): Promise<AxiosResponse> {
    const url = 'api/store/book'
    return await httpClient.post(url, data)
  },
  async getAllGenres (): Promise<AxiosResponse> {
    const url = 'api/store/genre/all'
    return await httpClient.get(url)
  },
  async getAllAuthors (): Promise<AxiosResponse> {
    const url = 'api/store/author/all'
    return await httpClient.get(url)
  },
  async getAllAddresses (): Promise<AxiosResponse> {
    const url = 'api/store/address/all'
    return await httpClient.get(url)
  },
  async getAllPublishers (): Promise<AxiosResponse> {
    const url = 'api/store/publisher/all'
    return await httpClient.get(url)
  },
  async getAllBooks (): Promise<AxiosResponse> {
    const url = 'api/store/book/all'
    return await httpClient.get(url)
  },
  async updateGenre (data: any): Promise<AxiosResponse> {
    const url = 'api/store/genre'
    return await httpClient.patch(url, data)
  },
  async updateAuthor (data: any): Promise<AxiosResponse> {
    const url = 'api/store/author'
    return await httpClient.patch(url, data)
  },
  async updateAddress (data: any): Promise<AxiosResponse> {
    const url = 'api/store/address'
    return await httpClient.patch(url, data)
  },
  async updatePublisher (data: any): Promise<AxiosResponse> {
    const url = 'api/store/publisher'
    return await httpClient.patch(url, data)
  },
  async updateBook (data: any): Promise<AxiosResponse> {
    const url = 'api/store/book'
    return await httpClient.patch(url, data)
  },
  async removeGenre (data: any): Promise<AxiosResponse> {
    const url = 'api/store/genre?genreId=' + data
    return await httpClient.delete(url)
  },
  async removeAuthor (data: any): Promise<AxiosResponse> {
    const url = 'api/store/author?authorId=' + data
    return await httpClient.delete(url)
  },
  async removeAddress (data: any): Promise<AxiosResponse> {
    const url = 'api/store/address?addressId=' + data
    return await httpClient.delete(url)
  },
  async removePublisher (data: any): Promise<AxiosResponse> {
    const url = 'api/store/publisher?publisherId=' + data
    return await httpClient.delete(url)
  },
  async removeBook (data: any): Promise<AxiosResponse> {
    const url = 'api/store/book?bookId=' + data
    return await httpClient.delete(url)
  }
}
