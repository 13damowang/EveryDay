<template>
  <view class="cart" v-if="cart.length !== 0">
    <my-address></my-address>

    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <uni-swipe-action>
      <block v-for="(item, index) in cart" :key="index">
        <uni-swipe-action-item
          :right-options="options"
          @click="clickHandler(item)"
        >
          <my-shops :Req="item" :showRadio="true" :showNum="true" @radio-change="radioChange" @change-value="changeValue"></my-shops>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>

    <my-settlement></my-settlement>
  </view>
  <view v-else>空空如也～</view>
</template>

<script>
import badgeMix from '@/mixins/tarbar-badge'
import {mapMutations, mapState, mapGetters} from 'vuex'
import {myShops} from '../../components/my-shops/index'
import {myAddress} from '../../components/my-address/index'
import {mySettlement} from '../../components/my-settlement/index'
export default {
  components: {
    'my-shops': myShops,
    'my-address': myAddress,
    'my-settlement': mySettlement,

  },
  mixins: [badgeMix],
  data() {
    return {
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#c00000'
          }
        }
      ]
    }
  },
  computed: {
    ...mapState('m_cart', [
      'cart',
    ]),
    ...mapGetters('m_cart', [
      'total'
    ])
  },
  methods: {
    ...mapMutations('m_cart', [
      'UPDATESHOPSSTATE',
      'UPDATASHOPSCOUNT',
      'REMOVESHOPS'
    ]),

    radioChange (e) {
      this.UPDATESHOPSSTATE(e)
    },

    changeValue (e) {
      this.UPDATASHOPSCOUNT(e)
    },

    clickHandler (item) {
      this.REMOVESHOPS(item)
    },

  },
  watch: {
    total () {
      this.setBadge()
    }
  },

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {

  },
  // 页面周期函数--监听页面隐藏
  onHide() {
    
  },
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
} 
</script>

<style lang="scss" scoped>
  .cart {
    padding-bottom: 50px;
    .cart-title {
      height: 40px;
      display: flex;
      align-items: center;
      padding-left: 5px;
      border-bottom: 1px solid #eee;

      .cart-title-text {
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }
</style>