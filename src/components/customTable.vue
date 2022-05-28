<template>
  <div class="table-container">
    <table>
      <thead>
      <tr>
        <th v-for="header in headers" :key="header.id">{{header}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td v-for="item in row" :key="item.id">{{item}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'customTable',
  props: ['headers', 'rows']
}
</script>

<style scoped>
.table-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}

table {
  color: white;
  text-align: center;
  width: 100%;
}

th {
  border: black solid 1px;
}

td {
  border: black solid 1px;
}
</style>
