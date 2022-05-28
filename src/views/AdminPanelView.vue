<template>
  <div class="container">
    <div class="header">
      <div class="header-title"><h3>GusMelford <i>Books</i> Admin Panel</h3></div>
      <div><button @click="logout" type="button" value="logout" name="logout">Logout</button></div>
    </div>
    <div class="user-info"></div>
    <div class="edit-bar">
      <div class="nav-buttons">
        <button @click="showGenres" type="button" value="genres" name="genres-button">Genres</button>
        <button type="button" value="authors" name="authors-button">Authors</button>
        <button type="button" value="books" name="books-button">Books</button>
        <button type="button" value="publishers" name="publishers-button">Publishers</button>
      </div>
      <hr>
      <div class="edit-container">
        <input class="edit-input" v-for="input in inputs" :key="input.id" v-model="inputValues[input.name]" type="text" :name="input.name" :id="input.id" :placeholder="input.placeholder">
      </div>
      <div class="edit-button">
        <button type="button" value="do" name="do" @click="addNew">Add</button>
      </div>
    </div>
    <div class="tables">
      <customTable v-bind:headers="headers" v-bind:rows="rows"></customTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import customTable from '@/components/customTable.vue'

let inputValues: any

export default defineComponent({
  name: 'AdminPanelView',
  data () {
    return {
      headers: [''],
      rows: [{}],
      inputs: [{}],
      isTableNow: '',
      inputValues: {}
    }
  },
  computed: mapGetters(['getGenres']),
  components: {
    customTable
  },
  methods: {
    ...mapActions(['updateGenres', 'addGenre', 'onLogout']),
    logout () {
      this.onLogout()
      location.reload()
    },
    async showGenres () {
      await this.updateGenres()
      this.inputs = [
        { id: 1, name: 'name', placeholder: 'Name' },
        { id: 2, name: 'description', placeholder: 'Description' }
      ]
      this.headers = ['Name', 'Description']
      this.rows = this.getGenres
      this.isTableNow = 'Genre'
    },
    async addNew () {
      inputValues = this.inputValues
      switch (this.isTableNow) {
        case 'Genre':
          await this.addGenre({
            name: inputValues.name,
            description: inputValues.description
          })
          inputValues.name = ''
          inputValues.description = ''
          await this.showGenres()
          break
      }
    }
  }
})

</script>

<style scoped>

.edit-button > button {
  width: 60%;
  height: 32px;
  background: #21252b;
  color: snow;
  border: 0;
}

.edit-container, .edit-button {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.edit-input {
  margin: 10px;
  width: 80%;
  height: 24px;
  background: #4f5964;
  color: snow;
  border: 0;
}

input[type="text"]::-webkit-input-placeholder {
  color: #ffffff;
}

.nav-buttons {
  margin: 5px;
}

.nav-buttons > button {
  border: 0;
  margin: 2px;
  color: snow;
  background: transparent;
}

.header > div > button {
  border: 0;
  margin-left: auto;
  margin-right: auto;
  color: snow;
  background: transparent;
  height: 100%;
}

.nav-buttons > button:hover, .edit-button > button:hover, .header > div > button:hover {
  background: #485159;
}

.nav-buttons > button:active, .edit-button > button:active, .header > div > button:active  {
  background: #9cb2bf;
  color: black;
}

.container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto 1fr 1fr 1fr auto;
  grid-template-areas:
    "header header header"
    "user-info tables tables"
    "edit-bar tables tables"
    "edit-bar tables tables"
    "footer footer footer";
}

.header {
  grid-area: header;
  background: #282c34;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: snow;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
}

.header-title {
  margin: 10px;
}

.header > div > h3 {
  margin: 0;
  padding: 0;
}

.user-info {
  grid-area: user-info;
}

.tables {
  grid-area: tables;
}

.edit-bar {
  grid-area: edit-bar;
}

.user-info, .edit-bar, .tables {
  margin: 16px;
  background: #202431;
  border: #031d4d 1px solid;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 14px -1px rgba(90,99,196,1);
  -moz-box-shadow: 0px 0px 14px -1px rgba(90,99,196,1);
  box-shadow: 0px 0px 14px -1px rgba(90,99,196,1);
}
</style>
