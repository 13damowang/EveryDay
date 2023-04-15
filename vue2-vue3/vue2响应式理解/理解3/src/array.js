import { def } from "./utils.js"

//得到Array.prototype
const arrayPrototype = Array.prototype
//以Array.prototype为原型，创建arrayMethods对象
export const arrayMethods = Object.create(arrayPrototype)
//暴露出去方法


//要被改写的7种方法
const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsNeedChange.forEach(methodName => {
  //备份原来的方法
  const original = arrayPrototype[methodName]

  //定义新的方法
  def(arrayMethods, methodName, function () {
    //调用备用中的方法, 这里的this指向当前的数组，arguments是数组方法中的参数
    //恢复原来的功能
    const result = original.apply(this, arguments)

    //arguments是伪数组，需要转成真的数组
    const args = [...arguments]
    //取出ob
    const ob = this.__ob__

    //有三种方法push/unshift/splice能够插入新的项，现在要把插入的新项也要observe
    //获取新增的项
    let inserted = []
    //判断是不是这3个方法
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        //splice(下标，数量，新项)，所以取arguments的第3个参数
        inserted = args.slice(2)
        break;
    }

    //判断有没有要插入的新项，让新项也变为响应式
    console.log('inserted', inserted);
    if (inserted) {
      ob.observeArray(inserted)
    }

    //数组也需要被触发notify 
    ob.dep.notify()
    
    return result
  }, false)
})

export default {}