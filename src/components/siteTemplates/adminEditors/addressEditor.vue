<template>
  <div class="editor-container">
    <div class="editor-panel">
      <div class="editor-panel-header"><p>Edit Author</p></div>
      <div class="editor-panel-main">
        <site-input placeholder="Country" ref="countryInput"></site-input>
        <site-input placeholder="City" ref="cityInput"></site-input>
        <site-input placeholder="Street" ref="streetInput"></site-input>
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
          <th>Country</th>
          <th>City</th>
          <th>Street</th>
        </tr>
        </thead>
        <tbody v-for="row in this.getAddresses" :key="row.id">
        <tr @click="edit(row.id)">
          <td>{{row.country}}</td>
          <td>{{row.city}}</td>
          <td>{{row.street}}</td>
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
  name: 'addressEditor',
  components: { SiteInput, SiteButton },
  data () {
    return {
      isEditorActive: false,
      countryInput: SiteInput,
      cityInput: SiteInput,
      streetInput: SiteInput,
      selectedAddress: { id: String, country: String, city: String, street: String }
    }
  },
  computed: mapGetters(['getAddresses']),
  methods: {
    ...mapActions(['updateAddresses', 'addAddress', 'updateAddress', 'removeAddress']),
    async add () {
      await this.addAddress({
        country: this.countryInput.getValue(),
        city: this.cityInput.getValue(),
        street: this.streetInput.getValue()
      })
      await this.updateAddresses()
      this.refreshEditor()
    },
    async edit (authorId: any) {
      this.selectedAddress = this.getAddresses.find((value: any) => value.id === authorId)
      this.countryInput.setValue(this.selectedAddress.country)
      this.cityInput.setValue(this.selectedAddress.city)
      this.streetInput.setValue(this.selectedAddress.street)
      this.isEditorActive = true
    },
    async update () {
      await this.updateAddress({
        id: this.selectedAddress.id,
        country: this.countryInput.getValue(),
        city: this.cityInput.getValue(),
        street: this.streetInput.getValue()
      })
      await this.updateAddresses()
      this.refreshEditor()
    },
    async remove () {
      await this.removeAddress(this.selectedAddress.id)
      await this.updateAddresses()
      this.refreshEditor()
    },
    cancel () {
      this.refreshEditor()
    },
    refreshEditor () {
      this.countryInput.clear()
      this.cityInput.clear()
      this.streetInput.clear()
      this.isEditorActive = false
    }
  },
  async mounted () {
    await this.updateAddresses()
    this.countryInput = (this.$refs.countryInput as typeof SiteInput)
    this.cityInput = (this.$refs.cityInput as typeof SiteInput)
    this.streetInput = (this.$refs.streetInput as typeof SiteInput)
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
