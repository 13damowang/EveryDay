// components/test4/test4.js
const myBehaviors = require('../../behaviors/behaviors')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: Number
  },

  /**
   * 组件导入behaviors
   */
  behaviors: [myBehaviors],

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    addCount () {
      this.setData({
        count: this.data.count + 1
      })
      //调用this.triggerEvent，把子组件更新的值传递给父组件函数中
      this.triggerEvent('sync', {
        value: this.properties.count
      })
    },
  }
})
