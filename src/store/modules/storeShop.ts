import { storeShopMethod } from '@/api/storeShopRequest'

export default {
  state: {
    genres: [],
    authors: [],
    addresses: [],
    publishers: [],
    books: []
  },
  getters: {
    getGenres (state: any): Array<any> {
      return state.genres
    },
    getAuthors (state: any): Array<any> {
      return state.authors
    },
    getAddresses (state: any): Array<any> {
      return state.addresses
    },
    getPublishers (state: any): Array<any> {
      return state.publishers
    },
    getBooks (state: any): Array<any> {
      return state.books
    }
  },
  mutations: {
    setGenres (state: any, genres: Array<any>) {
      state.genres = genres
    },
    setAuthors (state: any, authors: Array<any>) {
      state.authors = authors
    },
    setAddresses (state: any, addresses: Array<any>) {
      state.addresses = addresses
    },
    setPublishers (state: any, publishers: Array<any>) {
      state.publishers = publishers
    },
    setBooks (state: any, books: Array<any>) {
      state.books = books
    }
  },
  actions: {
    async updateGenres (context: any) {
      const response = await storeShopMethod.getAllGenres()
      if (response.status === 200) {
        context.commit('setGenres', response.data)
      }
    },
    async updateAuthors (context: any) {
      const response = await storeShopMethod.getAllAuthors()
      if (response.status === 200) {
        context.commit('setAuthors', response.data)
      }
    },
    async updateAddresses (context: any) {
      const response = await storeShopMethod.getAllAddresses()
      if (response.status === 200) {
        context.commit('setAddresses', response.data)
      }
    },
    async updatePublishers (context: any) {
      const response = await storeShopMethod.getAllPublishers()
      if (response.status === 200) {
        context.commit('setPublishers', response.data)
      }
    },
    async updateBooks (context: any) {
      const response = await storeShopMethod.getAllBooks()
      if (response.status === 200) {
        context.commit('setBooks', response.data)
      }
    },
    async addGenre (context: any, genre: any) {
      await storeShopMethod.addGenre(genre)
    },
    async addAuthor (context: any, author: any) {
      await storeShopMethod.addAuthor(author)
    },
    async addAddress (context: any, address: any) {
      await storeShopMethod.addAddress(address)
    },
    async addPublisher (context: any, publisher: any) {
      await storeShopMethod.addPublisher(publisher)
    },
    async addBook (context: any, book: any) {
      await storeShopMethod.addBook(book)
    },
    async updateGenre (context: any, genre: any) {
      await storeShopMethod.updateGenre(genre)
    },
    async updateAuthor (context: any, author: any) {
      await storeShopMethod.updateAuthor(author)
    },
    async updateAddress (context: any, address: any) {
      await storeShopMethod.updateAddress(address)
    },
    async updatePublisher (context: any, publisher: any) {
      await storeShopMethod.updatePublisher(publisher)
    },
    async updateBook (context: any, book: any) {
      await storeShopMethod.updateBook(book)
    },
    async removeGenre (context: any, genreId: any) {
      await storeShopMethod.removeGenre(genreId)
    },
    async removeAuthor (context: any, authorId: any) {
      await storeShopMethod.removeAuthor(authorId)
    },
    async removeAddress (context: any, addressId: any) {
      await storeShopMethod.removeAddress(addressId)
    },
    async removePublisher (context: any, publisherId: any) {
      await storeShopMethod.removePublisher(publisherId)
    },
    async removeBook (context: any, bookId: any) {
      await storeShopMethod.removeBook(bookId)
    }
  }
}
