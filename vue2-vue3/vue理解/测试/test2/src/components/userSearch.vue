<template>
  <div>
    <input type="text" v-model="userInfo">
    <button @click="search">嗖嗖</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      userInfo: ''
    }
  },
  methods: {
    search () {
      axios.get(`https://api.github.com/search/users?q=${this.userInfo}`).then(
        res => {
          console.log(res.data.items);
          this.$bus.$emit('getUserList', res.data.items)
        }, err => {
          console.log(err);
        }
      )
    }
  }
}
</script>

<style>

</style>