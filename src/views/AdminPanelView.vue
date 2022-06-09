<template>
  <div class="main-container">
    <site-header is-admin="true" class="site-header" @change-editor="changeEditor"></site-header>
    <genre-editor class="editor" v-if="editorNow === 'GENRES'"></genre-editor>
    <author-editor class="editor" v-if="editorNow === 'AUTHORS'"></author-editor>
    <address-editor class="editor" v-if="editorNow === 'ADDRESSES'"></address-editor>
    <publisher-editor class="editor" v-if="editorNow === 'PUBLISHERS'"></publisher-editor>
    <book-editor class="editor" v-if="editorNow === 'BOOKS'"></book-editor>
    <site-footer class="footer"></site-footer>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SiteHeader from '@/components/siteTemplates/siteHeader'
import GenreEditor from '@/components/siteTemplates/adminEditors/genreEditor'
import SiteFooter from '@/components/siteTemplates/siteFooter'
import AuthorEditor from '@/components/siteTemplates/adminEditors/authorEditor'
import AddressEditor from '@/components/siteTemplates/adminEditors/addressEditor'
import PublisherEditor from '@/components/siteTemplates/adminEditors/publisherEditor'
import BookEditor from '@/components/siteTemplates/adminEditors/bookEditor'

export default defineComponent({
  name: 'AdminPanelView',
  data () {
    return {
      editorNow: 'GENRES'
    }
  },
  components: { BookEditor, AddressEditor, AuthorEditor, SiteFooter, GenreEditor, SiteHeader, PublisherEditor },
  methods: {
    changeEditor (editorName) {
      if (editorName === 'HOME') {
        this.$router.push('home')
      }
      this.editorNow = editorName
    }
  }
})
</script>

<style scoped>
.main-container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'editor'
    'footer';
}

.site-header {
  grid-area: header;
}

.editor {
  grid-area: editor;
}

.footer {
  grid-area: footer;
}
</style>
