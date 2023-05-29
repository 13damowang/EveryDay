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
        <button class="buyBtn" @click="pay">结算（{{checkedCount}}）</button>
      </view>
    </view>
  </view>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
import $ from '../../utils/request'
export default {
  name: "my-settlement",
  props: {},
  data() {
    return {
      seconds: 3,
      timer: null
    }
  },
  computed: {
    ...mapGetters('m_cart', [
      'checkedAll',
      'checkedCount',
      'shopsPrice'
    ]),
    ...mapGetters('m_user', [
      'deliveryAddress'
    ]),
    ...mapState('m_user', [
      'token'
    ]),
    ...mapState('m_cart', [
      'cart'
    ]),
  },
  methods: {
    ...mapMutations('m_cart', [
      'CHECKEDALL'
    ]),
    ...mapMutations('m_user', [
      'UPDATEREDIRECTINFO'
    ]),

    allChecked () {
      this.CHECKEDALL(!this.checkedAll)
    },

    pay () {
      //判断购物车是否勾选了商品
      if (!this.checkedCount) {
        return uni.$showMeg('请选择要结算的商品！')
      }
      if (!this.deliveryAddress) {
        return uni.$showMeg('请选择收货地址！')
      }
      if (!this.token) {
        this.delayNavigate()
      }

      //支付
      this.pay()
    },

    //倒计时
    delayNavigate () {
      this.seconds = 3
      this.showTips(this.seconds)

      this.timer = setInterval(() => {
        this.seconds --
        if (this.seconds <= 0) {
          clearInterval(this.timer)
          uni.switchTab({
            url: '/pages/my/index',
            success: () => {
              this.UPDATEREDIRECTINFO({
                openType: 'switchTab',
                from: '/pages/cart/index'
              })
            }
          })
          return
        }
        this.showTips(this.seconds)
      }, 1000);
    },

    showTips (n) {
      uni.showToast({
        title: `请登录后再结算，${n}秒后自动跳转到登录页！`,
        icon: 'none',
        mask: true
      })
    },

    pay () {
      //1.创建订单
      const order = {
        //开发环境价格修改为0.01
        // order_price: this.shopsPrice,
        order_price: 0.01,
        consignee_addr: this.deliveryAddress,
        goods: this.cart.filter(item => item.goods_state).map(item => {
          return {
            goods_id: item.goods_id,
            goods_number: item.goods_count,
            goods_price: item.goods_price
          }
        })
      }

      //创建订单
      let params = {
        url: '/api/public/v1/my/orders/create',
        data: order
      }
      $.request(params, res => {
        console.log(res);
      })

      /**
       * 由于token原因，创建订单无法拿到订单编号，提示token无效，故后续无法继续，所以只能用文字表述后续逻辑
       * 拿到上面创建订单的返回值后，获得订单编号，将订单编号当作参数传入下一个预支付接口中
       * 预支付接口返回的是微信支付相关必要的参数
       * 调用微信支付uni.requestPayment(),将预支付返回的结果传入进去
       * 完成了支付，调用查询支付的结果
       */
    }
  },
  watch: {},

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