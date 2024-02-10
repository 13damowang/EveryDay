<template>
  <div id="app">
    <HelloWorld
      v-model="req"
      :reg-exp="'[^0-9]'"
    />
    <div>父组件的值{{ req }}</div>
    <span>a啊看见打卡机上帝看撒娇的卡拉斯京打卡手机打开垃圾上帝卡上生生世世啊上帝啊是大师大师的啊是大师大师大师大师老姜啊看大师大大大asdasda啊是大师大师的啊是大师的的撒卡萨的<p style="display: inline;">222000033.223</p>元撒大师的撒度，啊上帝撒的撒度</span>
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
