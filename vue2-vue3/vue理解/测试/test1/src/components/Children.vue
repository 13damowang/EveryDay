<template>
  <div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'childrenComponent',
    data () {
      return {
        text: '1',
        child1: '子组件数据1',
      }
    }
  }
</script>