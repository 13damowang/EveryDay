<template>
  <div id="app">
    <!-- 测试222222222
    <HelloWorld
    :data="table"
    /> -->
    <!-- <button @click="testFn">点我</button> -->
     {{textMode}}/
     <enter-replace :value="textMode" @input="onInput"></enter-replace>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import RenderTestVue from './components/RenderTest'
import { mixins } from './mixin/index';
export default {
  name: 'App',
  mixins: [mixins],
  components: {
    HelloWorld,
    RenderTestVue
  },
  data() {
    return {
      textMode: '',
      req: '',
      table: [
        {
          test: 'ddd',
          req: ''
        }
      ]
    }
  },
  created() {
    console.log('我是app的created');
  },
  mounted () {
    console.log('我是app的mounted');
  },

  methods: {
    reset () {
      this.$refs.Req.resetFields()
    },
    testFn () {
      console.log('我是点击方法', this.msg);
    },
    onInput (e) {
      this.textMode = e
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
