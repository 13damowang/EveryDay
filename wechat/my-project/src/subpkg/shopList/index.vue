<template>
  <view>
    <view class="shopList">
      <view v-for="(item, index) in shopList" @click="gotoShopDeatil(item.goods_id)">
        <my-shops :Req="item"></my-shops>
      </view>
    </view>
  </view>
</template>

<script>
import {myShops} from '../../components/my-shops/index'
export default {
  components: {
    'my-shops' : myShops
  },
  data() {
    return {
      Req: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
      },
      shopList: [],
      total: 0,
      isLoading: false,
    }
  },
  computed: {},
  methods: {
    getShopList (callback) {
      this.isLoading = true
      uni.showLoading({
        title: '加载中',
        mask: true
      })
      uni.request({
        url: `${uni.$beseUrl}/api/public/v1/goods/search`,
        data: this.Req,
        success: (data) => {
          const {data: res} = data
          if (res.meta.status !== 200) return uni.$showMeg()
          this.shopList = [...this.shopList,...res.message.goods]
          this.total = res.message.total
          this.isLoading = false
          callback && callback()
        },
        fail: () => {
          console.log('fail');
        },
        complete: () => {
          uni.hideLoading()
        }
      });
    },

    gotoShopDeatil (id) {
      uni.navigateTo({
        url: `/subpkg/shopDetail/index?goods_id=${id}`
      })
    }


  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.Req.query = options.query || ''
    this.Req.cid = options.cid || ''
    this.getShopList()
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
  onPullDownRefresh() {
    this.Req.pagenum = 0
    this.total = 0
    this.isLoading = false,
    this.shopList = []
    this.getShopList(() => uni.stopPullDownRefresh())
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {
    if (this.Req.pagenum * this.Req.pagesize >= this.total) return uni.$showMeg('没有更多数据！')
    if (!this.isLoading) {
      this.Req.pagenum ++
      this.getShopList()
    }
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
} 
</script>

<style lang="scss" scoped>


</style>