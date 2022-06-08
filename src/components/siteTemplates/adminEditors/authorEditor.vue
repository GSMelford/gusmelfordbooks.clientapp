<template>
  <div class="editor-container">
    <div class="editor-panel">
      <div class="editor-panel-header"><p>Edit Author</p></div>
      <div class="editor-panel-main">
        <site-input placeholder="First Name" ref="firstNameInput"></site-input>
        <site-input placeholder="Middle Name" ref="middleNameInput"></site-input>
        <site-input placeholder="Last Name" ref="lastNameNameInput"></site-input>
        <br><label>Date of Birth </label><site-input type="date" ref="dateOfBirthInput"></site-input>
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
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
        </tr>
        </thead>
        <tbody v-for="row in this.getAuthors" :key="row.id">
        <tr @click="edit(row.id)">
          <td>{{row.firstName}}</td>
          <td>{{row.middleName}}</td>
          <td>{{row.lastName}}</td>
          <td>{{row.dateOfBirth}}</td>
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
  name: 'authorEditor',
  components: { SiteInput, SiteButton },
  data () {
    return {
      isEditorActive: false,
      firstNameInput: SiteInput,
      middleNameInput: SiteInput,
      lastNameNameInput: SiteInput,
      dateOfBirthInput: SiteInput,
      selectedAuthor: { id: String, firstName: String, middleName: String, lastName: String, dateOfBirth: String }
    }
  },
  computed: mapGetters(['getAuthors']),
  methods: {
    ...mapActions(['updateAuthors', 'addAuthor', 'updateAuthor', 'removeAuthor']),
    async add () {
      await this.addAuthor({
        firstName: this.firstNameInput.getValue(),
        middleName: this.middleNameInput.getValue(),
        lastName: this.lastNameNameInput.getValue(),
        dateOfBirth: this.dateOfBirthInput.getValue()
      })
      await this.updateAuthors()
      this.refreshEditor()
    },
    async edit (authorId: any) {
      this.selectedAuthor = this.getAuthors.find((value: any) => value.id === authorId)
      this.firstNameInput.setValue(this.selectedAuthor.firstName)
      this.middleNameInput.setValue(this.selectedAuthor.middleName)
      this.lastNameNameInput.setValue(this.selectedAuthor.lastName)
      this.dateOfBirthInput.setValue(this.selectedAuthor.dateOfBirth)
      this.isEditorActive = true
    },
    async update () {
      await this.updateAuthor({
        id: this.selectedAuthor.id,
        firstName: this.firstNameInput.getValue(),
        middleName: this.middleNameInput.getValue(),
        lastName: this.lastNameNameInput.getValue(),
        dateOfBirth: this.dateOfBirthInput.getValue()
      })
      await this.updateAuthors()
      this.refreshEditor()
    },
    async remove () {
      await this.removeAuthor(this.selectedAuthor.id)
      await this.updateAuthors()
      this.refreshEditor()
    },
    cancel () {
      this.refreshEditor()
    },
    refreshEditor () {
      this.firstNameInput.clear()
      this.middleNameInput.clear()
      this.lastNameNameInput.clear()
      this.dateOfBirthInput.clear()
      this.isEditorActive = false
    }
  },
  async mounted () {
    await this.updateAuthors()
    this.firstNameInput = (this.$refs.firstNameInput as typeof SiteInput)
    this.middleNameInput = (this.$refs.middleNameInput as typeof SiteInput)
    this.lastNameNameInput = (this.$refs.lastNameNameInput as typeof SiteInput)
    this.dateOfBirthInput = (this.$refs.dateOfBirthInput as typeof SiteInput)
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
