<template>
  <view class="login">
    <uni-icons
      type="contact-filled"
      color="#cecece"
      size="80"
    />
    <button type="warn" class="loginBtn" @click="getUserProfile">一键登录</button>
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: "my-login",
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('m_user', [
      'redirectInfo'
    ])
  },
  methods: {
    ...mapMutations('m_user', [
      'UPDATEUSERINFO',
      'UPDATETOKEN',
      'UPDATEREDIRECTINFO'
    ]),
    getUserProfile () {
      uni.getUserProfile({
        desc: '测试',
        success: res => {
          this.UPDATEUSERINFO(res.userInfo)
          this.getToken(res)
        },
        fail: error => {
          uni.$showMeg('您取消了授权登录！')
        }
      })
    },
    getToken (info) {
      //获取code
      uni.login({
        success: res => {
          const query = {
            code: res.code,
            iv: info.iv,
            rawData: info.rawData,
            signature: info.signature
          }
          uni.request({
            url: `${uni.$beseUrl}/api/public/v1/users/wxlogin`,
            data: query,
            success: ({ data, statusCode, header }) => {
              uni.$showMeg('登录成功！')
              data.token = 'BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
              this.UPDATETOKEN(data.token)
              this.navigateBack();
            },
            fail: (error) => {}
          })
        },
        fail: error => {
          console.log(error)
          uni.$showMeg('登录失败！')
        }
      })
    },
    navigateBack () {
      if (this.redirectInfo && this.redirectInfo.openType === "switchTab") {
        uni.switchTab({
          url: this.redirectInfo.from,
          complete: () => {
            this.UPDATEREDIRECTINFO(null)
          }
        })
      }
    },
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
  .login {
    height: 750rpx;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .loginBtn {
      width: 90%;
      font-size: 13px;
      margin: 15px 0;
      border-radius: 100px;
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>