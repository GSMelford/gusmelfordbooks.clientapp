<template>
  <div class="editor-container">
    <div class="editor-panel">
      <div class="editor-panel-header"><p>Edit Book</p></div>
      <div class="editor-panel-main">
        <site-input placeholder="Title" ref="titleInput"></site-input>
        <site-input placeholder="Language" ref="languageInput"></site-input>
        <site-input placeholder="Description" ref="descriptionInput"></site-input>
        <site-input placeholder="Price" ref="priceInput"></site-input>
        <label v-if="!isEditorActive">Authors</label><br>
        <select v-if="!isEditorActive" class="site-select" v-model="authorValue">
          <option v-for="author in this.getAuthors" :key="author.id" :value="author.id">
            {{`${author.firstName} ${author.middleName} ${author.lastName}`}}
          </option>
        </select>
        <label v-if="!isEditorActive">Genres</label><br>
        <select v-if="!isEditorActive" class="site-select-multiple" v-model="genreValues" multiple>
          <option v-for="genre in this.getGenres" :key="genre.id" :value="genre.id">{{genre.name}}</option>
        </select>
        <label v-if="!isEditorActive">Publishers</label><br>
        <select v-if="!isEditorActive" class="site-select-multiple" v-model="publisherValues" multiple>
          <option v-for="publisher in this.getPublishers" :key="publisher.id" :value="publisher.id">{{publisher.name}}</option>
        </select>
      </div>
      <div v-if="!isEditorActive" class="editor-button">
        <site-button text="ADD" width="80%" @click="add"></site-button>
      </div>
      <div v-else class="editor-button">
        <site-button text="UPDATE" width="40%" @click="update"></site-button>
        <site-button text="REMOVE" width="40%" @click="remove"></site-button>
        <site-button text="CANCEL" width="80%" @click="cancel"></site-button>
      </div>
    </div>
    <div class="editor-table">
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
        <tbody v-for="row in this.getBooks" :key="row.id">
        <tr :class="{'active-row': activeRows[row.id]}" @click="edit(row.id)">
          <td>{{row.title}}</td>
          <td>{{row.authorName}}</td>
          <td>{{row.language}}</td>
          <td>{{row.description}}</td>
          <td>{{row.price}}</td>
          <td>{{row.publishers}}</td>
          <td>{{row.genres}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import SiteButton from '@/components/siteTemplates/siteButton.vue'
import SiteInput from '@/components/siteTemplates/siteInput.vue'

export default defineComponent({
  name: 'bookEditor',
  components: { SiteInput, SiteButton },
  data () {
    return {
      isEditorActive: false,
      titleInput: SiteInput,
      languageInput: SiteInput,
      descriptionInput: SiteInput,
      priceInput: SiteInput,
      authorValue: String,
      genreValues: [],
      publisherValues: [],
      selectedBook: { id: String, title: String, language: String, description: String, price: String },
      activeRows: Array<boolean>()
    }
  },
  computed: mapGetters(['getAuthors', 'getPublishers', 'getGenres', 'getBooks']),
  methods: {
    ...mapActions(['updateBooks', 'updateAuthors', 'updatePublishers', 'updateGenres', 'addBook', 'updateBook', 'removeBook']),
    async add () {
      await this.addBook({
        title: this.titleInput.getValue(),
        language: this.languageInput.getValue(),
        description: this.descriptionInput.getValue(),
        price: this.priceInput.getValue(),
        authorId: this.authorValue,
        genreIds: this.genreValues,
        publisherIds: this.publisherValues
      })
      await this.updateBooks()
      this.refreshEditor()
    },
    async edit (index: any) {
      this.resetChoose()
      this.activeRows[index] = !this.activeRows[index]
      this.selectedBook = this.getBooks.find((value: any) => value.id === index)
      this.titleInput.setValue(this.selectedBook.title)
      this.languageInput.setValue(this.selectedBook.language)
      this.descriptionInput.setValue(this.selectedBook.description)
      this.priceInput.setValue(this.selectedBook.price)
      this.isEditorActive = true
    },
    async update () {
      await this.updateBook({
        id: this.selectedBook.id,
        title: this.titleInput.getValue(),
        language: this.languageInput.getValue(),
        description: this.descriptionInput.getValue(),
        price: this.priceInput.getValue(),
        authorId: this.authorValue,
        genreIds: this.genreValues,
        publisherIds: this.publisherValues
      })
      await this.updateBooks()
      this.refreshEditor()
    },
    async remove () {
      await this.removeBook(this.selectedBook.id)
      await this.updateBooks()
      this.refreshEditor()
    },
    cancel () {
      this.refreshEditor()
    },
    refreshEditor () {
      this.titleInput.clear()
      this.languageInput.clear()
      this.descriptionInput.clear()
      this.priceInput.clear()
      this.isEditorActive = false
      this.resetChoose()
    },
    resetChoose () {
      this.activeRows = this.activeRows.map(x => false)
    }
  },
  async mounted () {
    await this.updateBooks()
    await this.updateGenres()
    await this.updateAuthors()
    await this.updatePublishers()
    this.titleInput = (this.$refs.titleInput as typeof SiteInput)
    this.languageInput = (this.$refs.languageInput as typeof SiteInput)
    this.descriptionInput = (this.$refs.descriptionInput as typeof SiteInput)
    this.priceInput = (this.$refs.priceInput as typeof SiteInput)
  }
})
</script>

<style scoped>

.editor-container {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr;
  grid-template-areas:
    'editor-panel editor-table';
  gap: 20px;
  margin: 20px;
}

.editor-panel, .editor-table {
  font-family: 'Open Sans', sans-serif;
  color: snow;
  background-color: #232323;
  border-radius: 10px;
  box-shadow: #c38fff 0 1px 4px;
}

.editor-panel {
  grid-area: editor-panel;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items:flex-start;
  align-content:flex-start;
}

.editor-panel-main {
  text-align: center;
  width: 100%;
}

.editor-button {
  text-align: center;
  width: 100%;
}

.editor-table {
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

.styled-table thead tr {
  background-color: #8245bd;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

td {
  cursor: pointer;
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

.site-select {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  padding: 2px;
  font-weight: bold;
  margin: 10px;
  font-size: 18px;
  width: 80%;
  height: 36px;
  box-sizing: border-box;
  border: 3px solid #dab9ff;
  -webkit-transition: 0.8s;
  transition: 0.8s;
  outline: none;
  background-color: #e4d5f6;
}

.site-select:focus {
  border: 3px solid #913294;
}

.site-select::placeholder {
  color: rgba(0, 0, 0, 0.60);
}

.site-select-multiple {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  padding: 2px;
  font-weight: bold;
  margin: 10px;
  font-size: 18px;
  width: 80%;
  height: 128px;
  box-sizing: border-box;
  border: 3px solid #dab9ff;
  -webkit-transition: 0.8s;
  transition: 0.8s;
  outline: none;
  background-color: #e4d5f6;
}

.site-select-multiple:focus {
  border: 3px solid #913294;
}

.site-select-multiple::placeholder {
  color: rgba(0, 0, 0, 0.60);
}

</style>
