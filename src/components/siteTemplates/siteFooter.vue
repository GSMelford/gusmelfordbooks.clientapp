<template>
  <div class="footer-container">
    <p>GusMelford Books © All rights reserved.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'siteFooter',
  props: ['text', 'width']
})
</script>

<style scoped>

.footer-container {
  background-color: #1f1f1f;
}

p {
  color: #e8caef;
  text-align: end;
  margin: 10px;
}

</style>
