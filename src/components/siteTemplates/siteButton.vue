<template>
  <button class="site-button" type="button">{{text}}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'siteButton',
  props: ['text', 'width']
})
</script>

<style scoped>

.site-button {
  font-family: 'Open Sans', sans-serif;
  background-color: #c38fff;
  font-weight: bold;
  font-size: 14px;
  margin: 6px 2px 6px 2px;
  padding: 5px;
  border: #8b62b4 1px solid;
  border-radius: 4px;
  width: v-bind(width);
}

.site-button:hover {
  background-color: #dab9ff;
}

.site-button:active {
  background-color: #f4eeff;
}

</style>
