// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '测试',
    coumt: 0,
    msg: '测试input同步消息',
    num: '',
    flag: false,
    arr1: ['测试1','测试2','测试3',],
    arrObj1: [
      {
        id: 0,
        name: '测试0'
      },
      {
        id: 1,
        name: '测试1'
      },
      {
        id: 2,
        name: '测试2'
      }
    ]
  },

  /**
   * 
   * 定义函数 
   */
  btnTap (e) {
    console.log(e)
  },
  add () {
    this.setData({
      coumt: this.data.coumt + 1
    })
  },
  paramadd (e) {
    //获取参数方法：event.target.dataset
    console.log(e.target.dataset.item)
  },
  inputAdd (e) {
    // 获取input输入框到内容方法：event.detail.value
    console.log(e.detail.value)
  },
  inputView (e) { 
    this.setData({
      msg: e.detail.value
    })
  },
  mathRound () {
    this.setData({
      num: Math.random() * 10
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})