<template>
  <div>
    <input type="text" @keyup.enter="add()" v-model="search">
  </div>
</template>

<script>
import {nanoid} from 'nanoid'

export default {
  name: 'headerComponent',
  data () {
    return {
      search: ''
    }
  },
  // props: {
  //   addItem: {
  //     type: Function  //从app上接受到一个函数
  //   }
  // },
  methods: {
    add() { //当输入enter时才触发
      const itemObj = {
        id: nanoid(),
        name: this.search,
        flag: false
      }
      // this.addItem(itemObj) //调用这个函数，并且将数据以入参的方式传回去
      this.$emit('addItem', itemObj)
    }
  }
}
</script>

<style scoped>

</style>