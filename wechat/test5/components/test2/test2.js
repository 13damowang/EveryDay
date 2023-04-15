// components/test2/test2.js
Component({
  options: {
    pureDataPattern: /^_/
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    rgb: {
      r: '0',
      g: '0',
      b: '0'
    },
    fullColor: '0,0,0'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeR () {
      this.setData({
        'rgb.r': (Math.random() * 100).toFixed(0) > 255 ? 255 : (Math.random() * 100).toFixed(0)
      })
    },

    changeG () {
      this.setData({
        'rgb.g': (Math.random() * 100).toFixed(2) > 255 ? 255 : (Math.random() * 100).toFixed(0)
      })
    },

    changeB () {
      this.setData({
        'rgb.b': (Math.random() * 100).toFixed(2) > 255 ? 255 : (Math.random() * 100).toFixed(0)
      })
    },

    changeRGB () {
      this.setData({
        'rgb.r': (Math.random() * 100).toFixed(0) > 255 ? 255 : (Math.random() * 100).toFixed(0),
        'rgb.g': (Math.random() * 100).toFixed(0) > 255 ? 255 : (Math.random() * 100).toFixed(0),
        'rgb.b': (Math.random() * 100).toFixed(0) > 255 ? 255 : (Math.random() * 100).toFixed(0)
      })
    },
  },

  observers: {
    // 'rgb.r, rgb.g, rgb.b': function (r, g, b) {
    //   this.setData({
    //     fullColor: `${r}, ${g}, ${b}`
    //   })
    //   console.log(this.data.fullColor)
    // }
    'rgb.**': function (rgb) {
      this.setData({
        fullColor: `${rgb.r}, ${rgb.g}, ${rgb.b}`
      })
    }
  },
  lifetimes: {
      created: function () {
        console.log('触发了created')
      },
      attached: function () {
        console.log('触发了attached')
      },
      detached: function () {
        console.log('触发了detached')
      },
  },
  pageLifetimes: {
    show: function () {
      console.log('触发了show')
      this.changeRGB()
    },
    hide: function () {
      console.log('触发了hide')
    },
    resize: function (size) {
      console.log('触发了reszie')
    },
  }
})
