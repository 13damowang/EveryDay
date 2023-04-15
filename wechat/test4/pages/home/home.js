// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    gridList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSwiperalist()
    this.getGridList()
  },

  //获取轮播数据
  getSwiperalist() {
    wx.request({
      url: 'https://www.escook.cn/slides',
      method: "GET",
      data: {

      },
      success: (res) => {
        this.setData({
          swiperList: res.data
        })
      }
    })
  },

  //获取九宫格数据
  getGridList () {
    wx.request({
      url: 'https://www.escook.cn/categories',
      method: "GET",
      data: {

      },
      success: (res) => {
        this.setData({
          gridList: res.data
        })
      }
    })
  },

  navMes(e) {
    wx.switchTab({
      url: '/pages/message/message',
    })
  },

  navInfo (e) {
    wx.navigateTo({
      url: '/pages/info/info'
    })
  },

  paramsInfo (e) {
    wx.navigateTo({
      url: '/pages/info/info?name=xxx'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log('上拉触底效果触发')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})