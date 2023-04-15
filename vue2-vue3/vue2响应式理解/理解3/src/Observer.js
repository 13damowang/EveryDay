import {def} from './utils.js'
import defineReactive from './defineReactive.js'
import {arrayMethods} from './array.js'
import observe from './observe.js'
import Dep from './Dep.js'

//作用：将一个正常的object转换为每个层级的属性都是响应式（可以被侦测的）的object
export default class Observer {
  //构造器
  constructor (value) {
    //每一个Observer的实例身上，都有一个dep
    this.dep = new Dep()

    //给实例（构造函数中的this不是表示类本身，而是表示实例）添加了__ob__属性，值是这次new的实例
    def(value, '__ob__', this, false)
    
    if (Array.isArray(value)) {
      //如果是数组，将强行使用arrayMethods身上的改写的方法
      //参数解释：指定要设置其原型的对象，该对象的新原型
      Object.setPrototypeOf(value, arrayMethods)
      
      //给数组添加
      this.observeArray(value)
    } else {
      this.walk(value)
    }

  }

  //遍历object用于给每一层都添加defineReactive
  walk (value) {
    for (let key in value) {
      defineReactive(value, key)
    }
  }

  //数组的特殊遍历
  observeArray (arr) {
    for (let i = 0, l = arr.length; i < l; i++) {
      //逐个进行observe
      observe(arr[i])
    }
  }
}