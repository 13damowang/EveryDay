<template>
  <div id="app">
    <sumComponent></sumComponent>
    <userList></userList>
  </div>
</template>

<script>
import  sumComponent from './components/sumComponent'
import  userList from './components/userList'

export default {
  name: 'App',
  components: {
    sumComponent,
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
