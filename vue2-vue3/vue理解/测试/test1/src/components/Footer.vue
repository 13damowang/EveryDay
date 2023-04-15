<template>
  <div>
    <input type="checkbox">已完成{{checkedItem}}/全部{{ listArr.length }}
    <button>清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: 'footerComponent',
  props: {
    listArr: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      checkedArr: [],
    }
  },
  computed: {
    checkedItem () {
      let arr = this.listArr.filter(val => val.flag)
      return arr.length
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