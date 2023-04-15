// components/test1/test1.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    max: Number,
    min: {
      type: Number,
      value: 10
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0,
    n1: 0,
    n2: 0,
    sum: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addCount () {
      if (this.data.count >= this.properties.max) {
        return wx.showToast({
          title: 'count值已经到上限'
        })
      }
      this.setData({
        count: this.data.count + 1
      })
      this._showCount()
    },
    _showCount () {
      wx.showToast({
        title: `count的值是${this.data.count}`,
        icon: 'none'
      })
    },
    
    addN1 () {
      this.setData({
        n1: this.data.n1 + 1
      })
    },

    addN2 () {
      this.setData({
        n2: this.data.n2 + 2
      })
    },
  },

  observers: {
    'n1, n2': function (newN1Value, newN2Value) {
      this.setData({
        sum: newN1Value + newN2Value
      })
    }
  }
})
