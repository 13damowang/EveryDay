<template>
  <view class="shop-item">
    <view class="left-shop-item">
      <radio :checked="Req.goods_state" color="#c00000" v-if="showRadio" @click="radioChange"/>
      <image class="left-shop-img"
        :src="Req.goods_small_logo || defaultImageUrl"
        mode="scaleToFill"
      />
    </view>
    <view class="right-shop-item">
      <view class="right-shop-title">{{ Req.goods_name }}</view>
      <view class="right-shop-info-box">
        <view class="right-shop-price">¥{{ Req.goods_price | tofiexed}}</view>
        <uni-number-box :min="1" :value="Req.goods_count" v-if="showNum" @change="changeValue"></uni-number-box>
      </view>
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
    },
    showRadio: {
      type: Boolean,
      default: false
    },
    showNum: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultImageUrl: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
    }
  },
  computed: {},
  methods: {
    radioChange () {
      //$emit的第2个参数等于给外部定义的自定义事件传的参数
      this.$emit('radio-change', {
        goods_id: this.Req.goods_id,
        goods_state: !this.Req.goods_state,
      })
    },

    changeValue (value) {
      this.$emit('change-value', {
        goods_id: this.Req.goods_id,
        goods_count: value
      })
    },

  },
  watch: {},
  filters: {
    tofiexed (num) {
      return Number(num).toFixed(2)
    }
  },

  // 组件周期函数--监听组件挂载完毕
  mounted() {

  },
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
    display: flex;
    justify-items: space-between;
    align-items: center;
    margin-right: 5px;

    .left-shop-img {
      width: 100px;
      height: 100px;
    }
  }

  .right-shop-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
    flex: 1;
    .right-shop-title {
      font-size: 15px;
    }

    .right-shop-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .right-shop-price {
        color: red;
      }
    }

  }
}
</style>