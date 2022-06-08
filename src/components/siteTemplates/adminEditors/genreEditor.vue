<template>
  <div class="editor-container">
    <div class="editor-panel">
      <div class="editor-panel-header"><p>Edit Genre</p></div>
      <div class="editor-panel-main">
        <site-input placeholder="Name" ref="nameInput"></site-input>
        <site-input placeholder="Description" ref="nameDescription"></site-input>
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
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody v-for="row in this.getGenres" :key="row.id">
          <tr @click="edit(row.id)">
            <td>{{row.name}}</td>
            <td>{{row.description}}</td>
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
  name: 'genreEditor',
  components: { SiteInput, SiteButton },
  data () {
    return {
      headers: Array<string>(),
      isEditorActive: false,
      inputName: SiteInput,
      inputDescription: SiteInput,
      selectedGenre: { id: String, name: String, description: String }
    }
  },
  computed: mapGetters(['getGenres']),
  methods: {
    ...mapActions(['updateGenres', 'addGenre', 'updateGenre', 'removeGenre']),
    async add () {
      await this.addGenre({
        name: this.inputName.getValue(),
        description: this.inputDescription.getValue()
      })
      await this.updateGenres()
      this.refreshEditor()
    },
    async edit (genreId: any) {
      this.selectedGenre = this.getGenres.find((value: any) => value.id === genreId)
      this.inputName.setValue(this.selectedGenre.name)
      this.inputDescription.setValue(this.selectedGenre.description)
      this.isEditorActive = true
    },
    async update () {
      await this.updateGenre({
        id: this.selectedGenre.id,
        name: this.inputName.getValue(),
        description: this.inputDescription.getValue()
      })
      await this.updateGenres()
      this.refreshEditor()
    },
    async remove () {
      await this.removeGenre(this.selectedGenre.id)
      await this.updateGenres()
      this.refreshEditor()
    },
    cancel () {
      this.refreshEditor()
    },
    refreshEditor () {
      this.inputName.clear()
      this.inputDescription.clear()
      this.isEditorActive = false
    }
  },
  async mounted () {
    await this.updateGenres()
    this.inputName = (this.$refs.nameInput as typeof SiteInput)
    this.inputDescription = (this.$refs.nameDescription as typeof SiteInput)
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
  font-weight: bold;
  color: #8245bd;
}

</style>
