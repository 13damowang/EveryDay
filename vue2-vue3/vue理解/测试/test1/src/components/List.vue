<template>
  <ul>
    <itemComponent  
    v-for="item in listArr" 
    :key="item.id" 
    :item="item" 
    :deleteItem="deleteItem"
    :changeItem="changeItem"
    >
  </itemComponent>
  </ul>
</template>

<script>
import itemComponent from './item.vue'
export default {
  name: 'listComponent',
  props: {
    listArr: {
      type: Array,
      default: () => {}
    },
    changeItem: {
      type: Function,
      default: () => {}
    },
    deleteItem: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    itemComponent
  }
}
</script>

<style scoped>

</style>