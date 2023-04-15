<template>
  <view>
    <view class="search-box">
      <search :bgColor="'pink'" :radius="15"  @click="gotoSeach"></search>
    </view>
    <swiper class="swiper"
      indicator-dots
      autoplay
      circular
      interval="3000"
      duration="1000"
    >
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="`/subpkg/shopDetail/index?goods_id=${item.goods_id}`">
          <image
            :src="item.image_src"
            mode="scaleToFill"
          />
        </navigator>
      </swiper-item>
    </swiper>

    <view class="navList">
      <view v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
        <image
          class="navImg"
          :src="item.image_src"
          mode="scaleToFill"
        />
      </view>
    </view>

    <view class="floorList" v-for="(item, itemIndex) in floorList" :key="itemIndex">
      <view class="floor-title">
        <image
          :src="item.floor_title.image_src"
          mode="scaleToFill"
        />
      </view>
      <view class="floor-content">
        <navigator class="floor-left" 
        :url="item.product_list[0].url">
          <image
            :src="item.product_list[0].image_src"
            mode="widthFix"
            :style="{width: item.product_list[0].image_width + 'rpx'}"
          />
        </navigator>
        <view class="floor-right">
          <navigator class="right-image" 
            v-for="(val, valIndex) in item.product_list" 
            :key="valIndex" 
            v-if="valIndex !== 0"
            :url="val.url">
              <image
                :src="val.image_src"
                mode="widthFix"
                :style="{width: val.image_width + 'rpx'}"
              />
          </navigator>
        </view>
        
      </view>
    </view>

  </view>  
</template>

<script>
import Search from '../../components/search.vue';
export default {
  components: {Search},
  data() {
    return {
      swiperList: [],  //轮播图
      navList: [], //分类导航
      floorList: [], //首页楼层

    }
  },
  computed: {},
  methods: {
     getSwiperList () {
      uni.showLoading({
        title: '加载中'
      });
      uni.request({
        url: `${uni.$beseUrl}/api/public/v1/home/swiperdata`,
        data: {
          text: 'uni.request'
        },
        header: {
          'custom-header': 'hello' //自定义请求头信息
        },
        success: (data) => {
          const {data: res} = data
          if (res.meta.status !== 200) return uni.$showMeg()
          this.swiperList = res.message
        },
        complete: () => {
          uni.hideLoading();
        }
      });
    },

    getNavList () {
      uni.showLoading({
        title: '加载中'
      })
      uni.request({
        url: `${uni.$beseUrl}/api/public/v1/home/catitems`,
        data: {},
        method: 'GET',
        success: (data) => {
          const {data: res} = data
          if (res.meta.status !== 200) return uni.$showMeg()
          this.navList = res.message
        },
        fail: (error) => {},
        complete: () => {
          uni.hideLoading()
        }
      })
    },

    navClickHandler (item) {
      if (item.name === '分类') {
        uni.switchTab({
           url: '/pages/cate/index'
        });
      }
    },

    getFloorList () {
      uni.showLoading({
        title: '加载中'
      })
      uni.request({
        url: `${uni.$beseUrl}/api/public/v1/home/floordata`,
        data: {},
        method: 'GET',
        success: (data) => {
          const {data: res} = data
          if (res.meta.status !== 200) return uni.$showMeg()
          res.message.forEach(item => {
            item.product_list.forEach(val => {
              val.url = `/subpkg/shopList/index?${val.navigator_url.split('?')[1]}`
            })
          })
          this.floorList = res.message
        },
        fail: (error) => {},
        complete: () => {
          uni.hideLoading()
        }
      })
    },

    gotoSeach () {
      uni.navigateTo({
         url: '/subpkg/search/index'
      });
    },


  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    //初始化时调用轮播图接口
    this.getSwiperList()
    
    //分类导航接口
    this.getNavList()

    //首页楼层
    this.getFloorList()
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

<style scoped>
swiper {
  height: 330rpx;
}

swiper .swiper-item {
  width: 100%;
  height: 100%;
}

swiper .swiper-item image {
  width: 100%;
  height: 100%;
}

.navList {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
}

.navList .navImg {
  width: 128rpx;
  height: 140rpx;
}

.floor-title image {
  width: 100%;
  height: 60rpx;
}

.floor-content {
  display: flex;
  padding-left: 10rpx;
}

.floor-right {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}


</style>