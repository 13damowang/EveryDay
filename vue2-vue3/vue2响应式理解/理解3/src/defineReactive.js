import observe from "./observe.js"
import Dep from "./Dep.js"

export default function defineReactive (data, key, val) {
  const dep = new Dep()

  //如果传入只有2个参数的话，那么val的值就等于data[key]
  if (arguments.length == 2) {
    val = data[key]
  }
  let childOb = observe(val)

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get () {
      console.log(`你正在访问${key}属性`)
      //如果现在处于收集依赖的阶段
      if (Dep.target) {
        dep.depend()
        //判断有没有子元素
        if (childOb) {
          //数组收集依赖
          childOb.dep.depend()
        }
      }
      return val
    },
    set (newValue) {
      if (val === newValue) return
      console.log(`你正在修改${key}属性,修改的值是${newValue}`)
      val = newValue
      //当设置了新值，这个新值也要被observe
      childOb = observe(newValue)

      //发布订阅模式，同时dep
      //当修改值的时候就会触发该函数
      dep.notify()
    }
  })
};