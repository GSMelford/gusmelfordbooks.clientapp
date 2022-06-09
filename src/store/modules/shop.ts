import { shopMethod } from '@/api/shopRequest'

export default {
  state: {
    userBooks: []
  },
  getters: {
    getUserBooks (state: any): Array<any> {
      return state.userBooks
    }
  },
  mutations: {
    setUserBooks (state: any, userBooks: Array<any>) {
      state.userBooks = userBooks
    }
  },
  actions: {
    async updateUserBooks (context: any) {
      const response = await shopMethod.getUserBooks()
      if (response.status === 200) {
        context.commit('setUserBooks', response.data)
      }
    },
    async buyBooks (context: any, data: any) {
      await shopMethod.buyBooks(data)
    }
  }
}
