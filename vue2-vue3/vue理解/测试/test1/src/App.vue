<template>
  <div id="app">
    <headers 
    @addItem="addItem"
    ref="headers"
    ></headers>
    <listComponent 
    :listArr="listArr" 

    :changeItem="changeItem"
    >
  </listComponent>
    <footerComponent 
    :listArr="listArr">
  </footerComponent>
  <div>
    <input type="text" v-model="firstName">
    <input type="text" v-model="lastName">
  </div>
  <div>
    测试监听
    {{ fullNameFun }}
    {{ fullName }}
  </div>
  <div>
    <div>分割线</div>
    <parentComponent></parentComponent>
  </div>
  </div>
</template>

<script>
import headers from './components/Header'
import listComponent from './components/List'
import footerComponent from './components/Footer'
import parentComponent from './components/Parent'

export default {
  name: 'App',
  data () {
    return {
      //读取历史记录数据
      listArr: JSON.parse(localStorage.getItem('listObj')) || [],
      firstName: '张',
      lastName: '三',
      fullName: ''
    }
  },
  computed: {
    fullNameFun () {
      return this.firstName + this.lastName
    }
  },
  methods: {
    addItem (item) {  //从header组件上接受到的入参
      this.listArr.unshift(item)
    },
    changeItem (id) {
      this.listArr.forEach(val => {
        if (val.id === id) val.flag = !val.flag
      })
    },
    deleteItem (id) {   //从list组件中的item组件接受到的入参
      this.listArr = this.listArr.filter(val => val.id !== id)
    },
  },
  watch: {
    //完整写法，为了监测数组内部的对象属性值的变化
    listArr: {
      deep: true, //开启深度监听
      handler (value) {
        localStorage.setItem('listObj', JSON.stringify(value))
      }
    },
    firstName (val) {
      this.fullName = val + this.lastName
    },
    lastName (val) {
      this.fullName = this.firstName + val
    }
  },
  components: {
    headers,
    listComponent,
    footerComponent,
    parentComponent
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
