import { storeShopMethod } from '@/api/storeShopRequest'

export default {
  state: {
    genres: []
  },
  getters: {
    getGenres (state: any): Array<any> {
      return state.genres
    }
  },
  mutations: {
    setGenres (state: any, genres: Array<any>) {
      state.genres = genres
    }
  },
  actions: {
    async updateGenres (context: any) {
      const response = await storeShopMethod.getAllGenres()
      if (response.status === 200) {
        context.commit('setGenres', response.data)
      }
    },
    async addGenre (context: any, genre: any) {
      const response = await storeShopMethod.addGenre(genre)
      if (response.status === 200) {
        context.commit('setGenres', response.data)
      }
    }
  }
}
