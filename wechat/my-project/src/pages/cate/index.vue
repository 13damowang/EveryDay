<template>
  <view>
    <view class="search-box">
      <search :bgColor="'#f66'" :radius="2" @click="gotoSeach"></search>
    </view>
    <view class="sroll-box">
      <scroll-view scroll-y :style="{height: wh + 'px'}" class="left-sroll-view">
        <block v-for="(item, index) in cateList" :key="index">
          <view :class="['sroll-item', item.active ? 'active' : '' ]" @click="naviShopChild(item)">{{ item.cat_name }}</view>
        </block>
      </scroll-view>
      <scroll-view scroll-y :style="{height: wh + 'px'}" class="right-sroll-view" :scroll-top="scrollTop">
        <view class="right-item"
        v-for="(item, index) in cateChild"
        :key="index"
        >
          <view class="right-sroll-title">/{{ item.cat_name }}/</view>
          <view class="right-child">
            <view class="right-image-item"
            v-for="(item, index) in item.children"
            :key="index"
            @click="goToShopList(item)"
            >
              <image
                :src="item.cat_icon"
                mode="widthFix"
              />
              <text>{{ item.cat_name }}</text>
          </view>
          </view>
        </view>
      </scroll-view>
    </view>

  </view>
</template>

<script>
import search from '../../components/search.vue'
export default {
  components: { search },
  data() {
    return {
      wh: 0,  //当前设备的高度
      cateList: [],  //分类列表
      cateChild: [],  //二级分类
      scrollTop: 0, //滚动条位置
    }
  },
  computed: {},
  methods: {
    getCateList () {
      uni.showLoading({
        title: '加载中'
      });
      uni.request({
        url: `${uni.$beseUrl}/api/public/v1/categories`,
        data: {
          text: 'uni.request'
        },
        header: {
          'custom-header': 'hello' //自定义请求头信息
        },
        success: (data) => {
          const {data: res} = data
          res.message.forEach(item => {
            item.active = false
          })
          res.message[0].active = true
          this.cateList = res.message
          this.cateChild = res.message[0].children

        },
        complete: () => {
          uni.hideLoading()
        }
      });
    },
    naviShopChild (item) {
      this.cateList.forEach(item => {
        item.active = false
      })
      item.active = true
      this.cateChild = item.children
      this.scrollTop = this.scrollTop === 0 ? 1 : 0
    },

    goToShopList (item) {
      uni.navigateTo({
         url: `/subpkg/shopList/index?cid=${item.cat_pid}`
      });
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
    const sysInfo = uni.getSystemInfoSync();
      //这里的50代表搜索组件的高度，修复可用高度不正确的bug
      this.wh = sysInfo.windowHeight - 50
      //获取分类列表
      this.getCateList()
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
.sroll-box {
  display: flex;
}
.left-sroll-view {
  width: 120px;
}
.left-sroll-view .sroll-item {
  background: #f7f7f7;
  line-height: 60px;
  font-size: 12px;
  text-align: center;
}

.sroll-item.active {
  background: #fff;
  position: relative;
}

.sroll-item.active::before {
  content: '';
  display: block;
  width: 3px;
  height: 30px;
  background: red;
  position: absolute;
  top: 15px;
}

.right-sroll-title {
  font-size: 12px;
  font-weight: bold;
  padding: 12px 0;
  text-align: center;
}

.right-child {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}

.right-child .right-image-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 33%;
  align-items: center;
  margin-top: 10px;
}

.right-image-item image {
  width: 60px;
  height: 60px;
}

.right-image-item text {
  font-size: 12px;
}

.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}

</style>