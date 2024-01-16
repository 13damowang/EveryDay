<template>
  <div id="app">
    <HelloWorld
      v-model="req"
      :reg-exp="'[^0-9]'"
    />
    <div>父组件的值{{ req }}</div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import RenderTestVue from './components/RenderTest'

export default {
  name: 'App',
  components: {
    HelloWorld,
    RenderTestVue
  },
  data() {
    return {
      req: ''
    }
  },

  mounted () {

  },

  methods: {
    reset () {
      this.$refs.Req.resetFields()
    }
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
