<template>
  <div>
    <template v-for="(item, indexs) in datOptionsCopy">
      <div :key="indexs" v-if="item.type === 'c'">
        内容：{{ item.content }}
        <b>序号：{{ item.index }}</b>
        备注：{{ item.remark }}
        评价：{{ item.evaluate }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'data3Component',
  props: {
    datOptions: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      datOptionsCopy: this.datOptions
    }
  },
  watch: {
    datOptionsCopy (n) {
     this.datOptionsCopy = n
     console.log(this.datOptionsCopy,222)
    }
  }
}
</script>