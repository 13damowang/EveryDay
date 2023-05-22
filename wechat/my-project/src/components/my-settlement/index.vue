<template>
  <view class="settlement">
    <view class="settlement-content">

      <view class="allChecked">
        <radio
        :checked="checkedAll"
        color="#c00000"
        @click="allChecked"
        />
        全选
      </view>

      <view class="total">
        合计: 
        <text class="totalNum">¥{{ shopsPrice }}</text>
      </view>

      <view>
        <button class="buyBtn">结算（{{checkedCount}}）</button>
      </view>
    </view>
  </view>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: "my-settlement",
  props: {},
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('m_cart', [
      'checkedAll',
      'checkedCount',
      'shopsPrice'
    ])
  },
  methods: {
    ...mapMutations('m_cart', [
      'CHECKEDALL'
    ]),
    allChecked () {
      this.CHECKEDALL(!this.checkedAll)
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
} 
</script>

<style lang="scss" scoped>
  .settlement {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    z-index: 999;

    .settlement-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      padding-left: 5px;

      .allChecked {
        display: flex;
        align-items: center;
      }

      .total {
        .totalNum {
          color: #c00000;
        }
      }

      .buyBtn {
        background-color: #c00000;
        font-size: 13px;
        color: #fff;
        height: 50px;
        width: 114px;
        line-height: 50px;
        border-radius: 0px;
      }
    }
  }
</style>