<template>
  <div class="container">
    <div class="header">header</div>
    <div class="user-info">user-info</div>
    <div class="books-bar">books-bar</div>
    <div class="footer">footer</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas:
    "header header header"
    "user-info books-bar books-bar"
    "footer footer footer";
}

.header {
  grid-area: header;
  background: rebeccapurple;
}
.user-info {
  grid-area: user-info;
  background: blue;
}
.books-bar {
  grid-area: books-bar;
  background: red;
}
.footer {
  grid-area: footer;
  background: aqua;
}

</style>
