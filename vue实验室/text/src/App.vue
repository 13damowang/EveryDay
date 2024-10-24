<template>
  <div id="app">
    <!-- 测试222222222
    <HelloWorld
    :data="table"
    /> -->
    <!-- <button @click="testFn">点我</button> -->
     {{textMode}}/
     <!-- <el-input v-model="textMode" id="box">

     </el-input> -->
     <textarea name="" id="box" cols="30" rows="10"></textarea>
     <el-button @click="modtest">点击</el-button>
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
    const box = document.getElementById('box')
    
    
  },

  methods: {
    modtest () {
      box.focus()
      const text = '2222'
      navigator.clipboard.writeText(text).then(()=>{
          alert("Copied.");
      });
      document.execCommand("paste");
    },
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
