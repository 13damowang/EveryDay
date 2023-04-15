// custom-tab-bar/index.js
import {storeBindingsBehavior} from 'mobx-miniprogram-bindings'
import { store } from '../store/store'
Component({
  
  options: {
    
  },
  //配置mobx共享组件
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      sum: 'sum',
      active: 'activeTabBarIndex'
    },
    actions: {
      updataActiveTabBarIndex: 'updataActiveTabBarIndex'
    }
  },
  //监听数据
  observers: {
    'sum': function (sum) {
      console.log(sum)
      this.setData({
        'list[1].info': sum
      })
    }
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
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "/pages/messages/messages",
        "text": "消息",
        info: 0
      },
      {
        "pagePath": "/pages/concate/concate",
        "text": "联系我们"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      // this.setData({ active: event.detail });
      //利用mobx中的方法，动态更新索引
      this.updataActiveTabBarIndex(event.detail)
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })
    },
  }
})
