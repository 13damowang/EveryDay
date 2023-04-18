<template>
  <view v-if="Req.goods_price" class="shopDetailContainer">
    <swiper
      indicator-dots
      autoplay
      circular
    >
      <swiper-item v-for="(item, index) in Req.pics" :key="index">
        <image
          :src="item.pics_big"
          mode="scaleToFill"
          @click="preview(index)"
        />
      </swiper-item>
    </swiper>
    <view class="shop-info-box">
      <view class="shop-price">¥{{ Req.goods_price }}</view>
      <view class="shop-tip">
        <view class="tip-content">{{Req.goods_name}}</view>
        <view class="collect">
          <uni-icons type="star" size="20"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="express">
        快递：免运费
      </view>
    </view>
    <rich-text :nodes="Req.goods_introduce"></rich-text>

    <view class="shop-nav">
      <uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      Req: {},
      id: '',
      options: [
        {
          icon: 'shop',
          text: '店铺',
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }
      ],
      buttonGroup: [
        {
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        },
        {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }
	    ]
    }
  },
  computed: {},
  methods: {
    getShopDeatil () {
      uni.showLoading({
        title: '数据加载中'
      })
      uni.request({
        url: `${uni.$beseUrl}/api/public/v1/goods/detail`,
        data: {
          goods_id: this.id
        },
        success: (data) => {
          const {data: res} = data
          console.log(res)
          if (res.meta.status !== 200) {
            return uni.$showMeg('数据加载失败！')
          }
          res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display: block;"').replace(/webp/g, 'jpg')
          this.Req = res.message
        },
        complete: () => {
          uni.hideLoading()
        }
      });
    },

    preview (index) {
      uni.previewImage({
        urls: this.Req.pics.map((item) => item.pics_big),
        current: index
      });
    },

    onClick (e) {
      if (e.content.text === '购物车') {
        uni.switchTab({
           url: '/pages/cart/index'
        });
      }
    },

    buttonClick (e) {

    }

  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.id = options.good_id
    this.getShopDeatil()
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
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
.shopDetailContainer {
  padding-bottom: 50px;

  swiper {
    height: 750rpx;
  
    image {
      width: 100%;
      height: 100%;
    }
  }
  
  .shop-info-box {
    padding: 10px;
    .shop-price {
      color: red;
      font-size: 18px;
      margin: 10px 0;
    }
  
    .shop-tip {
      display: flex;
      justify-content: space-between;
  
      .tip-content {
        font-size: 13px;
        margin-right: 10px;
      }
  
      .collect {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: gray;
        border-left: 1px solid #eee;
      }
    }
  
    .express {
      color: gray;
      font-size: 12px;
      margin: 10px 0;
    }
  
  }
  
  .shop-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>