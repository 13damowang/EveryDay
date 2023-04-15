// index.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
// 获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  async getInfo () {
    const res = await wx.p.request({
      url: 'https://www.escook.cn/api/get',
      method: 'GET',
      data: {
        name: 'zxc',
        age: 22
      }
    })
    console.log(res)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['numA', 'numB', 'sum'],
      actions: ['updataNum1']
    })
  },

  numAadd (e) {
    //根据页面上设置的参数，通过e.target.dataset中获取
    console.log(e.target.dataset)
    this.updataNum1(e.target.dataset.step)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.storeBindings.destroyStoreBindings() //销毁
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
