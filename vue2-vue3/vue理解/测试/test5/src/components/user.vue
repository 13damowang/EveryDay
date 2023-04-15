<template>
  <div>
  <div>我是user</div>
  <router-link :to="{
    name: 'userChildren',
    params: {
      id: '22',
      title: '我是title'
    }
  }">点我去user的子组件</router-link>
  <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'userComponent'
  }
</script>

<style>

</style>