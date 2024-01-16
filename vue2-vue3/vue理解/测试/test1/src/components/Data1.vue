<template>
  <div>
    <template v-for="(item, indexs) in datOptions">
      <div :key="indexs" v-if="item.type === 'a'">
        内容：{{ item.content }}
        <b>序号：{{ item.index }}</b>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'data1Component',
  props: {
    datOptions: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  }
}
</script>