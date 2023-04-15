<template>
  <div id="app">
    <userSearch></userSearch>
    <userList
    ></userList>
  </div>
</template>

<script>

import userSearch from './components/userSearch'
import userList from './components/userList'

export default {
  name: 'App',
  components: {
    userSearch,
    userList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
