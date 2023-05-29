<template>
  <view class="userinfo">
    <view class="top-box">
      <image class="avatar"
        :src="userinfo.avatarUrl"
      />
      <view class="nickname">{{ userinfo.nickName }}</view>
    </view>
    <view class="userOperation">
      <view class="footprint gloalItem">
        <view class="footprintItem">
          <text>111</text>
          <text>收藏的店铺</text>
        </view>
        <view class="footprintItem">
          <text>111</text>
          <text>收藏的商品</text>
        </view>
        <view class="footprintItem">
          <text>111</text>
          <text>关注的商品</text>
        </view>
        <view class="footprintItem">
          <text>111</text>
          <text>足迹</text>
        </view>
      </view>

      <view class="order gloalItem">
        <view class="order-title">我的订单</view>
        <view class="order-content">
          <view class="orderItem">
            <uni-icons
              type="wallet"
              color="#e06d6d"
              size="45"
            />
            <text>待付款</text>
          </view>
          <view class="orderItem">
            <uni-icons
              type="cart-filled"
              color="#e06d6d"
              size="45"
            />
            <text>待收货</text>
          </view>
          <view class="orderItem">
            <uni-icons
              type="gift-filled"
              color="#e06d6d"
              size="45"
            />
            <text>退款/退货</text>
          </view>
          <view class="orderItem">
            <uni-icons
              type="shop"
              color="#e06d6d"
              size="45"
            />
            <text>全部订单</text>
          </view>
        </view>
      </view>

      <view class="setting gloalItem">
        <view class="settingItem">
          <view>收货地址</view>
          <uni-icons
            type="right"
            color=""
            size="20"
          />
        </view>
        <view class="settingItem">
          <view>联系客服</view>
          <uni-icons
            type="right"
            color=""
            size="20"
          />
        </view>
        <view class="settingItem" @click="logOut">
          <view>退出登录</view>
          <uni-icons
            type="right"
            color=""
            size="20"
          />
        </view>
       
      </view>

    </view>
  </view>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default {
  name: "my-userinfo",
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('m_user', [
      'userinfo'
    ])
  },
  methods: {
    ...mapMutations('m_user', [
      'UPDATAADDRESS',
      'UPDATEUSERINFO',
      'UPDATETOKEN'
    ]),
    logOut () {
      uni.showModal({
        title: '提示',
        content: '确定退出登录？',
        success: res => {
          if (res.confirm) {
            this.UPDATAADDRESS({})
            this.UPDATEUSERINFO({})
            this.UPDATETOKEN('')
          }
        },
        fail: error => {
          console.log(error)
        }
      })
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
  .userinfo {
    height: 100%;
    background-color: #f4f4f4;
    .top-box {
      height: 400rpx;
      background-color: #c00000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .avatar {
        width: 90px;
        height: 90px;
        border-radius: 100%;
        border: 1px solid #fff;
        box-shadow: 0 1px 5px black;
      }
      .nickname {
        font-size: 16px;
        color: #fff;
        font-weight: bold;
        margin-top: 10px;
      }
    }

    .userOperation {
      padding: 0 10px;
      position: relative;
      top: -20px;

      .gloalItem {
        background: #fff;
        border-radius: 5px;
        margin-top: 10px;
      }
      .footprint {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 14px;
        padding: 10px;

        .footprintItem {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }

      .order {
        .order-title {
          font-size: 17px;
          border-bottom: 1px solid #f1f1f1;
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          margin-bottom: 8px;
        }
        .order-content {
          display: flex;
          justify-content: space-around;
          padding-bottom: 10px;

          .orderItem {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 14px;
          }
        }
      }

      .setting {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .settingItem {
          display: flex;
          justify-content: space-between;
          padding: 10px;
        }
      }
    }
  }
</style>