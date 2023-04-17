<template>
  <view class="shop-item">
    <view class="left-shop-item">
      <image
        :src="Req.goods_small_logo || defaultImageUrl"
        mode="scaleToFill"
      />
    </view>
    <view class="right-shop-item">
      <view class="right-shop-title">{{ Req.goods_name }}</view>
      <view class="right-shop-price">¥{{ Req.goods_price | tofiexed}}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "my-shops",
  props: {
    Req: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      defaultImageUrl: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
    }
  },
  computed: {},
  methods: {},
  watch: {},
  filters: {
    tofiexed (num) {
      return Number(num).toFixed(2)
    }
  },

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
} 
</script>

<style lang="scss" scoped>
.shop-item {
  display: flex;
  height: 100px;
  padding: 10px;
  border-bottom: 1px solid #eee;

  .left-shop-item {
    margin-right: 5px;

    image {
      width: 100px;
      height: 100px;
    }
  }

  .right-shop-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
    .right-shop-title {
      font-size: 15px;
    }

    .right-shop-price {
      color: red;
    }
  }
}
</style>