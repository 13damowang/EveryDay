<template>
  <view>
    <view class="searchbar">
      <uni-search-bar @input="input" :radius="20" :focus="true" :cancelButton="'none'" :placeholder="'请输入需要搜索的内容'"></uni-search-bar>
    </view>

    <view class="searchList" v-if="searchList.length !== 0">
      <view class="search-item"
      v-for="(item, index) in searchList"
      :key="index"
      @click="gotoShopDetail(item.goods_id)"
      >
        <view class="searchname">{{ item.goods_name }}</view>
        <uni-icons type="forward" size="17"></uni-icons>
      </view>
    </view>

    <view class="historySearchList" v-else>
      <view class="searchHistory">
        <view>历史记录</view>
        <uni-icons @click="clearHistory" type="trash" size="24"></uni-icons>
      </view>
      <view class="historyList">
        <uni-tag :text="item" v-for="(item, index) in historys" :key="index" @click="gotoShopList(item)"></uni-tag>
      </view>
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
      historySearchList: []
    }
  },
  computed: {
    //历史数据反转，新添加的数据应该出现在最前面
    historys () {
      return [...this.historySearchList].reverse()
    }
  },
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
          const {data: res} = data
          if (res.meta.status !== 200) return uni.$showMeg()
          this.searchList = res.message

          //数组去重
          const set = new Set(this.historySearchList)
          //这里的删除是为了防止输入的是已经存在，则将原先的删除，让新的出现在最前面
          set.delete(this.searchValue)
          set.add(this.searchValue)
          //set是类数组，需要转成真正的数组
          this.historySearchList = Array.from(set)
          uni.setStorageSync('historySearchList', JSON.stringify(this.historySearchList))
        },
        complete: () => {
          uni.hideLoading()
        }
      });
    },

    gotoShopDetail (id) {
      uni.navigateTo({
         url: `/subpkg/shopDetail/index?goods_id=${id}`
      });
    },

    clearHistory () {
      this.historySearchList = []
      uni.setStorageSync('historySearchList', '[]')
    },

    gotoShopList (item) {
      uni.navigateTo({
        url: `/subpkg/shopList/index?query=${item}`
      })
    },

  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.historySearchList = JSON.parse(uni.getStorageSync('historySearchList') || '[]')
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
// 更改源码中的样式使用深度更改/deep/ 可以直接影响到源码中的样式
/deep/.uni-searchbar {
  background-color: #c00000;
}

.searchbar {
  position: sticky;
  top: 0;
  z-index: 999;
}

.searchList {
  padding: 0 5px;
  .search-item {
    display: flex;
    justify-items: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    .searchname {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 12px;
    }
  }
}

.historySearchList {

  .searchHistory {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 5px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .historyList {
    display: flex;
    padding: 0 5px;
    flex-wrap: wrap;

    /deep/ .uni-tag {
      background-color: #efefef;
      border: 1px solid #ececec;
      margin: 5px 3px;
      color: #000;
    }
  }
}
</style>