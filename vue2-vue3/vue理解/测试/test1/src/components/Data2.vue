<template>
  <div>
    <template v-for="(item, indexs) in datOptionsCopy">
      <div :key="indexs" v-if="item.type === 'b'">
        内容：{{ item.content }}
        <b>序号：{{ item.index }}</b>
        备注: {{ item.remark }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'data2Component',
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