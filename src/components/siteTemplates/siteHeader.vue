<template>
  <div class="header-container">
    <site-button text="HOME" @click="changeEditor('HOME')"></site-button>
    <site-button text="GENRES" @click="changeEditor('GENRES')"></site-button>
    <site-button text="AUTHORS" @click="changeEditor('AUTHORS')"></site-button>
    <site-button text="ADDRESSES" @click="changeEditor('ADDRESSES')"></site-button>
    <site-button text="PUBLISHERS" @click="changeEditor('PUBLISHERS')"></site-button>
    <site-button text="BOOKS" @click="changeEditor('BOOKS')"></site-button>
  </div>
</template>class="nav-buttons"

<script lang="ts">
import SiteButton from '@/components/siteTemplates/siteButton.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'siteHeader',
  components: { SiteButton },
  methods: {
    changeEditor (editorName: string) {
      this.$emit('change-editor', editorName)
    }
  }
})
</script>

<style scoped>

.header-container {
  background-color: #1f1f1f;
}

</style>
