<template>
  <div class="header-container">
    <div class="buttons">
      <site-button v-if="!isAdmin" text="ADMIN PANEL" @click="changeEditor('ADMIN PANEL')"></site-button>
      <site-button v-if="isAdmin" text="HOME" @click="changeEditor('HOME')"></site-button>
      <site-button v-if="isAdmin" text="GENRES" @click="changeEditor('GENRES')"></site-button>
      <site-button v-if="isAdmin" text="AUTHORS" @click="changeEditor('AUTHORS')"></site-button>
      <site-button v-if="isAdmin" text="ADDRESSES" @click="changeEditor('ADDRESSES')"></site-button>
      <site-button v-if="isAdmin" text="PUBLISHERS" @click="changeEditor('PUBLISHERS')"></site-button>
      <site-button v-if="isAdmin" text="BOOKS" @click="changeEditor('BOOKS')"></site-button>
    </div>
    <div class="info-logout">
      <p>{{name}}</p>
      <site-button text="LOGOUT" @click="logout"></site-button>
    </div>
  </div>
</template>

<script lang="ts">
import SiteButton from '@/components/siteTemplates/siteButton.vue'
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'

export default defineComponent({
  name: 'siteHeader',
  components: { SiteButton },
  props: ['isAdmin'],
  data () {
    return {
      name: ''
    }
  },
  computed: mapGetters(['getName']),
  mounted () {
    this.name = this.getName
  },
  methods: {
    ...mapActions(['onLogout']),
    changeEditor (editorName: string) {
      this.$emit('change-editor', editorName)
    },
    logout () {
      this.onLogout()
      router.push('login')
    }
  }
})
</script>

<style scoped>

.header-container {
  background-color: #1f1f1f;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.info-logout {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

p {
  color: snow;
}

</style>
