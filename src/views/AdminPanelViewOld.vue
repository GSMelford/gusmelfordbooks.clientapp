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
        <button @click="showAuthors" type="button" value="authors" name="authors-button">Authors</button>
        <button @click="showAddresses" type="button" value="addresses" name="addresses-button">Addresses</button>
        <button @click="showPublishers" type="button" value="publishers" name="publishers-button">Publishers</button>
        <button type="button" value="books" name="books-button">Books</button>
      </div>
      <hr>
      <div class="edit-container">
        <input class="edit-input" v-for="input in inputs" :key="input.id" v-model="inputValues[input.name]" type="text" :name="input.name" :id="input.id" :placeholder="input.placeholder">
        <div v-if="!isSelectHide" class="select-container">
          <div v-for="selectItem in selects" :key="selectItem.id">
            <label>{{selectItem.name}}</label>
            <select class="edit-select" :name="selectItem.name" :id="selectItem.id" :ref="selectItem.id">
              <option v-for="optionItem in selectItem.options" :key="optionItem.id" :value="optionItem.id">{{optionItem.name}}</option>
            </select>
          </div>
        </div>
        <div v-if="!isSelectHide" class="select-container">
          <div v-for="selectItem in selects" :key="selectItem.id">
            <label>{{selectItem.name}}</label>
            <select class="edit-select" :name="selectItem.name" :id="selectItem.id" :ref="selectItem.id">
              <option v-for="optionItem in selectItem.options" :key="optionItem.id" :value="optionItem.id">{{optionItem.name}}</option>
            </select>
          </div>
        </div>
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
  name: 'AdminPanelOldView',
  data () {
    return {
      headers: [''],
      rows: [{}],
      inputs: [{}],
      selects: [{}],
      isSelectHide: true,
      tableNow: '',
      inputValues: {}
    }
  },
  computed: mapGetters(['getGenres', 'getAuthors', 'getAddresses', 'getPublishers']),
  components: {
    customTable
  },
  methods: {
    ...mapActions(['updateGenres', 'addGenre', 'onLogout', 'updateAuthors', 'addAuthor', 'updateAddresses', 'updatePublishers', 'addAddress', 'addPublisher']),
    logout () {
      this.onLogout()
      location.reload()
    },
    async showGenres () {
      await this.updateGenres()
      this.inputs = [
        { id: 'firstInput', name: 'name', placeholder: 'Name' },
        { id: 'secondInput', name: 'description', placeholder: 'Description' }
      ]
      this.isSelectHide = true
      this.headers = ['Name', 'Description']
      this.rows = this.getGenres.map((value: any) => ({
        name: value.firstName,
        description: value.middleName
      }))
      this.tableNow = 'Genres'
    },
    async showAuthors () {
      await this.updateAuthors()
      this.inputs = [
        { id: 'firstInput', name: 'firstName', placeholder: 'First Name' },
        { id: 'secondInput', name: 'middleName', placeholder: 'Middle Name' },
        { id: 'thirdInput', name: 'lastName', placeholder: 'Last Name' },
        { id: 'fourthInput', name: 'dataOfBirth', placeholder: 'Data Of Birth' }
      ]
      this.isSelectHide = true
      this.headers = ['First Name', 'Middle Name', 'Last Name', 'Data Of Birth']
      this.rows = this.getAuthors.map((value: any) => ({
        firstName: value.firstName,
        middleName: value.middleName,
        lastName: value.lastName,
        dataOfBirth: value.dataOfBirth
      }))
      this.tableNow = 'Authors'
    },
    async showAddresses () {
      await this.updateAddresses()
      this.inputs = [
        { id: 'firstInput', name: 'country', placeholder: 'Country' },
        { id: 'secondInput', name: 'city', placeholder: 'City' },
        { id: 'thirdInput', name: 'street', placeholder: 'Street' }
      ]
      this.isSelectHide = true
      this.headers = ['Country', 'City', 'Street']
      this.rows = this.getAddresses.map((value: any) => ({
        country: value.country,
        city: value.city,
        street: value.street
      }))
      this.tableNow = 'Addresses'
    },
    async showPublishers () {
      await this.updatePublishers()
      this.inputs = [
        { id: 'firstInput', name: 'name', placeholder: 'Name' },
        { id: 'secondInput', name: 'phone', placeholder: 'Phone' }
      ]
      this.isSelectHide = false
      this.headers = ['Name', 'Phone']
      this.rows = this.getPublishers.map((value: any) => ({
        name: value.name,
        phone: value.phone
      }))
      this.tableNow = 'Publishers'
      const optionsList: { id: any; name: string }[] = []

      await this.updateAddresses()
      this.getAddresses.forEach(function (address: any) {
        optionsList.push({ id: address.id, name: `${address.country} ${address.city} ${address.street}` })
      })

      this.selects = [{ id: 'firstSelect', name: 'Addresses', options: optionsList }]
    },
    async addNew () {
      inputValues = this.inputValues
      switch (this.tableNow) {
        case 'Genres':
          await this.addGenre({
            name: inputValues.name,
            description: inputValues.description
          })
          inputValues.name = ''
          inputValues.description = ''
          await this.showGenres()
          break
        case 'Authors':
          await this.addAuthor({
            firstName: inputValues.firstName,
            middleName: inputValues.middleName,
            lastName: inputValues.lastName,
            dataOfBirth: inputValues.dataOfBirth
          })
          inputValues.firstName = ''
          inputValues.middleName = ''
          inputValues.lastName = ''
          inputValues.dataOfBirth = ''
          await this.showAuthors()
          break
        case 'Addresses':
          await this.addAddress({
            country: inputValues.country,
            city: inputValues.city,
            street: inputValues.street
          })
          inputValues.country = ''
          inputValues.city = ''
          inputValues.street = ''
          await this.showAddresses()
          break
        case 'Publishers':
          await this.addPublisher({
            name: inputValues.name,
            phone: inputValues.phone,
            addressId: (this.$refs.firstSelect as any)[0].value
          })
          inputValues.country = ''
          inputValues.city = ''
          inputValues.street = ''
          await this.showPublishers()
          break
      }
    }
  }
})

</script>

<style scoped>
.select-container {
  text-align: center;
}

label {
  color: white;
}

.edit-button > button {
  width: 60%;
  height: 32px;
  background: #21252b;
  color: snow;
  border: blue 1px solid;
}

.edit-container, .edit-button {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.edit-input, .edit-select {
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
  border: blue 1px solid;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 14px -1px rgba(90,99,196,1);
  -moz-box-shadow: 0px 0px 14px -1px rgba(90,99,196,1);
  box-shadow: 0px 0px 14px -1px rgba(90,99,196,1);
}
</style>
