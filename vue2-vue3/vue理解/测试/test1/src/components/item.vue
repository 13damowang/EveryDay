<template>
  
  <li class="item">
    <input type="checkbox" 
    @change="changeItem(item.id)"
    :checked="item.flag"
    />{{ item.name }}
    <button @click="deleteItem(item.id)">删除</button>
    </li>
</template>

<script>
export default {
  name: 'itemComponent',
  props: {
    item: {
      type: Object,
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
  data () {
    return {
      newItem: this.item
    }
  }
}
</script>

<style scoped>
  .item {
    list-style: none;
    margin: 5px 0;
  }
</style>