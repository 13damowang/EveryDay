//创建Store实例对象
import { observable, action } from 'mobx-miniprogram'

export const store = observable({
  numA: 1,
  numB: 2,
  activeTabBarIndex: 0,

  //计算属性，get表示只读，不可修改函数内的值
  get sum () {
    return this.numA + this.numB
  },

  //定义action方法
  updataNum1: action(function (step) {
    this.numA += step
  }),

  updataNum2: action(function (step) {
    this.numB += step
  }),

  updataActiveTabBarIndex: action(function (index) {
    this.activeTabBarIndex = index
  })
})