<template>
  <div>
    <div>我是user的子组件</div>
    <div>id: {{ $route.params.id }}</div>
    <div>title: {{ $route.params.title }}</div>
  </div>
</template>

<script>
  export default {
    name: 'userComponent',
    data () {
      return {
        
      }
    }
  }
</script>

<style>

</style>