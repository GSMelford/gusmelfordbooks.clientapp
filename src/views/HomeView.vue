<template>
  <div class="container">
    <site-header class="header"></site-header>
    <div class="user-books-container">
      <div class="table">
        <table class="styled-table">
          <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Date Of Purchase</th>
          </tr>
          </thead>
          <tbody v-for="userBook in this.getUserBooks" :key="userBook.id">
          <tr>
            <td>{{userBook.title}}</td>
            <td>{{userBook.price}}</td>
            <td>{{userBook.dateOfPurchase}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="shop-books-container">
      <div class="book-table table">
        <table class="styled-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author Name</th>
              <th>Language</th>
              <th>Description</th>
              <th>Price</th>
              <th>Publishers</th>
              <th>Genres</th>
            </tr>
          </thead>
          <tbody v-for="book in this.getBooks" :key="book.id">
            <tr :class="{'active-row': bookRows[book.id]}" @click="choose(book.id)">
              <td>{{book.title}}</td>
              <td>{{book.authorName}}</td>
              <td>{{book.language}}</td>
              <td>{{book.description}}</td>
              <td>{{book.price}}</td>
              <td>{{book.publishers}}</td>
              <td>{{book.genres}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="buy-book-button-container">
      <div class="order-info">Price {{totalAmount}} Count {{countBook}}</div>
      <div>
        <site-button v-if="isCanBuy" text="BUY BOOKS" width="100%" @click="buy"></site-button>
      </div>
    </div>
    <site-footer class="footer"></site-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import SiteHeader from '@/components/siteTemplates/siteHeader.vue'
import SiteFooter from '@/components/siteTemplates/siteFooter.vue'
import SiteButton from '@/components/siteTemplates/siteButton.vue'

export default defineComponent({
  name: 'HomeView',
  data () {
    return {
      totalAmount: 0,
      countBook: 0,
      bookRows: Array<boolean>(),
      booksSelected: Array<string>(),
      isCanBuy: false
    }
  },
  computed: mapGetters(['getUserBooks', 'getBooks']),
  components: { SiteButton, SiteFooter, SiteHeader },
  methods: {
    ...mapActions(['buyBooks', 'updateUserBooks', 'updateBooks']),
    choose (index: any) {
      this.bookRows[index] = !this.bookRows[index]
      if (this.bookRows[index]) {
        this.booksSelected.push(index)
        console.log(this.booksSelected)
        this.countBook++
        this.totalAmount += this.getBooks.find((value: any) => value.id === index).price
      } else {
        this.booksSelected = this.booksSelected.filter(x => x !== index)
        this.countBook--
        this.totalAmount -= this.getBooks.find((value: any) => value.id === index).price
      }
      this.isCanBuy = this.countBook > 0
    },
    async buy () {
      await this.buyBooks({ bookIds: this.booksSelected })
      this.bookRows = this.bookRows.map(_ => false)
      this.booksSelected = Array<string>()
      this.totalAmount = 0
      this.countBook = 0
      await this.updateUserBooks()
    }
  },
  async mounted () {
    await this.updateUserBooks()
    await this.updateBooks()
  }
})
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto 1fr auto auto;
  gap: 10px;
  grid-template-areas:
    "header header"
    "user-books shop-books"
    "user-books buy-book-button"
    "footer footer";
}

.header {
  grid-area: header;
}
.user-books-container {
  grid-area: user-books;
}
.shop-books-container {
  grid-area: shop-books;
  overflow-y: scroll;
}
.buy-book-button-container {
  grid-area: buy-book-button;
}
.footer {
  grid-area: footer;
}

.buy-book-button-container {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.order-info{
  margin: 10px;
}

.user-books-container, .shop-books-container, .buy-book-button-container {
  font-family: 'Open Sans', sans-serif;
  color: snow;
  background-color: #232323;
  border-radius: 10px;
  box-shadow: #c38fff 0 1px 4px;
  margin: 10px;
}

.table {
  grid-area: editor-table;
  padding: 10px;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

td {
  cursor: pointer;
}
.styled-table thead tr {
  background-color: #8245bd;
  color: #ffffff;
  text-align: left;
}
.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #8245bd;
}

.styled-table tbody tr.active-row {
  color: #ffffff;
  background-color: #ab7ee1;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #3f3f3f;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #3f3f3f;
}

::-webkit-scrollbar-thumb:hover {
  color: #8245bd;
  border-radius: 10px;
}

</style>
