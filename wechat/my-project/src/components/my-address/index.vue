<template>
  <view>
    <view class="address-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnAddress" @click="addAddress">请选择收货地址+</button>
    </view>

    <view class="address-info-box" v-else @click="addAddress">
      <view class="consigneeAndMobile">
        <view class="consignee">收货人：{{ address.userName }}</view>
        <view class="mobile">电话：{{ address.telNumber }}<uni-icons type="forward" color="" size="16"/>
        </view>
      </view>
      <view class="address">
        <view class="address-title">收货地址：</view>
        <view class="address-content">{{ deliveryAddress }}</view>
      </view>
    </view>

    <view class="footerBorder"></view>
  </view>
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex'
export default {
  name: "my-address",
  props: {},
  data() {
    return {

    }
  },
  computed: {
    ...mapState('m_user', [
      'address'
    ]),
    ...mapGetters('m_user', [
      'deliveryAddress'
    ])
  },
  methods: {
    ...mapMutations('m_user', [
      'UPDATAADDRESS'
    ]),
    addAddress () {
      uni.chooseAddress({
        success: (res) => {
          this.UPDATAADDRESS(res)
        },
        fail: (error) => {
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
  .address-box {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .address-info-box {
    display: flex;
    flex-direction: column;
    padding: 15px 5px;
    font-size: 13px;
    

    .consigneeAndMobile {
      display: flex;
      justify-content: space-between;
      margin-bottom: 7px;
    }

    .address {
      display: flex;
      align-items: center;

      .address-title {
        white-space: nowrap;
      }
    }

  }

  .footerBorder {
    width: 100%;
    border: 2px solid #f66;
  }
</style>