<template>
  <div>
    我是子组件
    <button @click="tiaozhuan">子组件跳转页面</button>
  </div>
</template>

<script>
  export default {
    name: 'ChildrenItem1',
    created () {
      console.log('子组件created')
    },
    mounted () {
      console.log('子组件mounted')
    },
    methods: {
      tiaozhuan () {
        this.$router.push({
          name: 'ChildrenRouter'
        })
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>