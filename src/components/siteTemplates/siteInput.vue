<template>
  <input class="site-input" type="text" :placeholder="placeholder" v-model="value">
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'siteInput',
  props: ['placeholder'],
  data () {
    return {
      value: ''
    }
  },
  methods: {
    getValue () {
      return this.value
    },
    setValue (value: any) {
      this.value = value
    },
    clear () {
      this.value = ''
    }
  }
})
</script>

<style scoped>

.site-input {
  font-family: 'Open Sans', sans-serif;
  padding: 10px;
  font-weight: bold;
  margin: 10px;
  font-size: 18px;
  width: 80%;
  height: 32px;
  box-sizing: border-box;
  border: 3px solid #dab9ff;
  -webkit-transition: 0.8s;
  transition: 0.8s;
  outline: none;
  background-color: #e4d5f6;
}

.site-input:focus {
  border: 3px solid #913294;
}

.site-input::placeholder {
  color: rgba(0, 0, 0, 0.60);
}

</style>
