<template>
  <view class="mySearch"
  :style="{'background': bgColor}"
  @click="searchClick"
  >
    <view class="my-search"
    :style="{'border-radius': radius + 'px'}"
    >
      <uni-icons type="search" size="17"></uni-icons>
      <text class="inputContent">搜索</text>
    </view>
  </view>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  name: "search",
  props: {
    //背景颜色
    bgColor: {
      type: String,
      default: '#C00000'
    },
    //圆角尺寸
    radius: {
      type: Number,
      default: 20 //px
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    searchClick () {
      this.$emit('click')
    }
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
}) 
</script>

<style lang="scss" scoped>
.mySearch {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;

  .my-search {
    background: #fff;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    .inputContent {
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>