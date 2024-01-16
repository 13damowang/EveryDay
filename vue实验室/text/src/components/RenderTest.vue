<template>
  <div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      content: '啊上帝就卡是假的啊上帝多少啊',
      content1: '啊',
      content2: '上帝',
      content3: '就卡是假的啊',
      arr: [],
      arr2: []
    }
  },
  props: {
    dataTest: {
      type: [Object, Array],
      default: () => {}
    }
  },
  created() {
    console.log(this.dataTest);
    let index = this.content.indexOf('上帝')
    let num = 0
    while (index !== -1) {
      this.arr.push(index)
      index = this.content.indexOf('上帝', index + 1)
    }
    this.arr.forEach((item, index) => {
      if (index === 0) {
        this.arr2.push(this.content.slice(index, item))
      } else {
        this.arr2.push(item)
      }
    })

  },
  // render(h) {
  //   return h('div', {}, [
  //     h('span', {}, this.content1),
  //     h('span', {
  //       class: 'red'
  //     }, this.content2),
  //     h('span', {}, this.content3),
  //   ])
  // }
}
</script>

<style>
.red {
  color: red;
}
</style>