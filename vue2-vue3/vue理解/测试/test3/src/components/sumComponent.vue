<template>
  <div>
    <div>用vuex基本用法</div>
    <h1>当前求和为：{{ $store.state.sum }}</h1>
    <div>当前求和放大100倍为：{{ $store.getters.bigSum }}</div>
    <div>现在是测试环境，我在测试</div>
    <div>另一个组件的总人数是：1</div>
    <select v-model.number="req">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
    <button @click="add">+</button>
    <button @click="subtraction">-</button>
    <button @click="addOdd">当前求和为奇数再加</button>
    <button @click="addWait">等1秒再加</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        req:1
      }
    },
    methods: {
      add () {
        //调用$store中的dispatch从而触发actions中的对应方法名，开始第一步
        //从组件中获取数据{{$store.state.key}}
        this.$store.dispatch('add', this.req) 
      },
      subtraction () {
        //如果actions中的方法不需要判断或者接口等其他操作，可以直接跳过dispatch，直接进入commit阶段，入参需要大写
        this.$store.commit('SUBTRACTION', this.req) 
      },
      addOdd () {
        this.$store.dispatch('addOdd', this.req) 
      },
      addWait () {
        this.$store.dispatch('addWait', this.req) 
      }
    }
  }
</script>

<style>

</style>