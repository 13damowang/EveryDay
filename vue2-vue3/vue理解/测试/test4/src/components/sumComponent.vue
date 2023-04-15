<template>
  <div>
    <div>用vuex进阶用法</div>
    <h1>当前求和为：{{ sum }}</h1>
    <div>当前求和放大100倍为：{{ bigSum }}</div>
    <div>现在是测试环境，我在测试</div>
    <div>另一个组件的总人数是：1</div>
    <select v-model.number="req">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
    <button @click="add(req)">+</button>
    <button @click="subtraction(req)">-</button>
    <button @click="addOdd(req)">当前求和为奇数再加</button>
    <button @click="addWait(req)">等1秒再加</button>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    data () {
      return {
        req:1
      }
    },
    methods: {
      //mapActions是直接调用了actions中的对应方法，如果组件中绑定的事件和actions中的方法名相同，可以使用['actionsKey']
      //如果不同则{methodsName, 'actionsKey'} 
      ...mapActions(['add']),
      ...mapActions(['addOdd']),
      ...mapActions(['addWait']),
      //mapMutations是直接调用了mutations中的对应方法，如果组件中绑定的事件和mutations中的方法名相同，可以使用['mutationsKey']
      //如果不同则{methodsName, 'mutationsKey'}  第二个参数需要大写

      //************注意：mapMutations, mapActions使用时需要在模块中绑定的事件传入参数 */
      ...mapMutations({subtraction: 'SUBTRACTION'}),
    },
    computed: {
      //mapState映射出的是state中的值，如果定义的变量和state中的值相同，则可以使用['stateKey']的形式，
      //如果不同则{'computedName': 'stateKey'}来进行绑定
      ...mapState(['sum']),
      //mapGetters使用方式相同，不同的是变量需要和getters中的方法名相同
      ...mapGetters(['bigSum'])
    },
    mounted () {

    }
  }
</script>

<style>

</style>