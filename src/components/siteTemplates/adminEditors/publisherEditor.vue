<template>
  <div class="editor-container">
    <div class="editor-panel">
      <div class="editor-panel-header"><p>Edit Publisher</p></div>
      <div class="editor-panel-main">
        <site-input placeholder="Name" ref="nameInput"></site-input>
        <site-input placeholder="Phone" ref="phoneInput"></site-input>
        <br> <label>Address</label>
        <select name="cars" id="cars" class="site-select" v-model="addressValue">
          <option v-for="address in this.getAddresses" :key="address.id" :value="address.id">
            {{`${address.country} ${address.city} ${address.street}`}}
          </option>
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
          <th>Name</th>
          <th>Phone</th>
          <th>Address</th>
        </tr>
        </thead>
        <tbody v-for="row in this.getPublishers" :key="row.id">
        <tr @click="edit(row.id)">
          <td>{{row.name}}</td>
          <td>{{row.phone}}</td>
          <td>{{row.address}}</td>
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
  name: 'publisherEditor',
  components: { SiteInput, SiteButton },
  data () {
    return {
      isEditorActive: false,
      nameInput: SiteInput,
      phoneInput: SiteInput,
      addressValue: String,
      selectedPublisher: { id: String, name: String, phone: String, address: String }
    }
  },
  computed: mapGetters(['getPublishers', 'getAddresses']),
  methods: {
    ...mapActions(['updatePublishers', 'addPublisher', 'updatePublisher', 'removePublisher', 'updateAddresses']),
    async add () {
      await this.addPublisher({
        name: this.nameInput.getValue(),
        phone: this.phoneInput.getValue(),
        addressId: this.addressValue
      })
      await this.updatePublishers()
      this.refreshEditor()
    },
    async edit (authorId: any) {
      this.selectedPublisher = this.getPublishers.find((value: any) => value.id === authorId)
      this.nameInput.setValue(this.selectedPublisher.name)
      this.phoneInput.setValue(this.selectedPublisher.phone)
      this.addressValue = this.selectedPublisher.address
      this.isEditorActive = true
    },
    async update () {
      await this.updatePublisher({
        id: this.selectedPublisher.id,
        name: this.nameInput.getValue(),
        phone: this.phoneInput.getValue(),
        addressId: this.addressValue
      })
      await this.updatePublishers()
      this.refreshEditor()
    },
    async remove () {
      await this.removePublisher(this.selectedPublisher.id)
      await this.updatePublishers()
      this.refreshEditor()
    },
    cancel () {
      this.refreshEditor()
    },
    refreshEditor () {
      this.nameInput.clear()
      this.phoneInput.clear()
      this.isEditorActive = false
    }
  },
  async mounted () {
    await this.updatePublishers()
    await this.updateAddresses()
    this.nameInput = (this.$refs.nameInput as typeof SiteInput)
    this.phoneInput = (this.$refs.phoneInput as typeof SiteInput)
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

.site-select {
  font-family: 'Open Sans', sans-serif;
  padding: 2px;
  font-weight: bold;
  margin: 10px;
  font-size: 12px;
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
</style>
