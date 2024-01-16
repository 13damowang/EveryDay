<template>
  <div>
    <!-- <template>
      <childrenComponent>
        <template v-for="(item, index) in arr">
          <div :key="index">
            <div>
              名字：{{ item.content }}
            </div>
            <div>
              序号： {{ item.index }}
            </div>
          </div>
        </template>
      </childrenComponent>
    </template> -->
    <data1Component :datOptions="arr"></data1Component>
    <data2Component :datOptions="arr"></data2Component>
    <data3Component :datOptions="arr"></data3Component>
    <button @click="btn">更新排序</button>
    <div>{{ arr }}</div>
  </div>
</template>



<script>
[
  {
    content:'a',
    index: 2
  },
  {
    content:'b',
    index: 1
  }
]
// import childrenComponent from './Children'
import data1Component from './Data1.vue'
import data2Component from './Data2.vue'
import data3Component from './Data3.vue'
export default {
  components: {
    // childrenComponent,
    data1Component,
    data2Component,
    data3Component
  },
  name: 'parentComponent',
  data () {
    return {
      text: '2',
      arr: [
        {
          index: 3,
          type: 'a',
          content: '文字1',
          updata: false
        },
        {
          index: 2,
          type: 'b',
          content: '文字2',
          remark: '备注2',
          updata: false
        },
        {
          index: 1,
          type: 'c',
          content: '文字3',
          remark: '备注3',
          evaluate: '评价3',
          updata: false
        }
      ]
    }
  },
  methods: {
    btn () {
      this.arr = this.arr.sort((a, b) => a.index- b.index)
      this.arr.forEach(val => {
      val.updata = true
    })
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.arr = this.arr.sort((a, b) => a.index- b.index)
    })
  },
  watch: {
    // arr: {
    //   handler: function () {
    //     this.arr = this.arr.sort((a, b) => a.index- b.index)
    //     console.log(this.arr)
    //   },
    //   immediate: true
    // }
  }
}
</script>