<template>
  <view>
    <view class="searchbar">
      <uni-search-bar @input="input" :radius="20" :focus="true" :cancelButton="'none'" :placeholder="'请输入需要搜索的内容'"></uni-search-bar>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      timer: null,
      searchValue: '',
      searchList: [],
    }
  },
  computed: {},
  methods: {
    input (e) {
      //防抖处理
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.searchValue = e
        this.getSearchList()
      }, 500)
    },

    getSearchList () {
      if (this.searchValue === '') {
        this.searchList = []
        return
      }
      uni.showLoading({
        title: '加载中'
      })
      uni.request({
        url: `${uni.$beseUrl}/api/public/v1/goods/qsearch`, 
        data: {
          query: this.searchValue
        },
        success: (data) => {
          if (data.meta.status !== 200) return uni.$showMeg()
          const {data: res} = data.message
        }
      });
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
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
// 更改源码中的样式使用深度更改/deep/ 可以直接影响到源码中的样式
/deep/.uni-searchbar {
  background-color: #c00000;
}
</style>