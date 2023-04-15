import observe from "./observe.js"
import Watcher from "./Watcher.js"
let obj = {
  a: {
    b: {
      c: {
        d: '我是d'
      }
    }
  },
  aa: '我是aa',
  arr: [11,22]
}

observe(obj)
new Watcher(obj, 'a.b.c', function (newValue) {
  console.log('触发了Watcher', newValue)
})
obj.a.b.c = 10
// console.log(obj)

/**
 * 整体思路：
 * 首先先调用observe，传入obj参数
 * observe中主要的功能是给对象上每一层都添加new Observer实例，绑定在__ob__身上
 * Observer是利用类创建出来的一个构造函数
 * def的作用是配置一些对象的配置，例如是否可以被枚举，修改，删除
 * walk是给对象内部 嵌套添加defineReactive
 * defineReactive的作用是开始绑定数据劫持，进行数据拦截 设置get set 开始监听
 * 在defineReactive中再次调用observe方法，此目的是给递归创造出口，
 * 因为在observe方法中有针对非对象进行return
 * 在set函数中再次调用observe的原因是防止后续给这个对象添加的值依然是一个对象
 * 那么就需要继续给这个新增的对象进行数据劫持
 * 由此，对一个对象的递归添加响应式就完成了
 */

/**
 * 针对数组类型添加响应式的方法：
 * 重新改写数组的7种方法
 * push
 * pop
 * shift
 * unshift
 * splice
 * sort
 * reverse
 * 这些方法都是基于Array.prototype上的方法，vue以Array.prototype为原型，创建了一个arrayMethods对象
 * 使用了es6中的Object.setPrototypeOf()方法强制让数组的__proto__指向了arrayMethods,从而触发新的对象中的函数
 * 
 * 
 * 
 * -------------------------发布订阅模式-------------------------
 * Dep类和Watcher类
 * 依赖就是Watcher。只有Watcher触发的getter才会收集依赖，哪个Watcher触发了getter，就把哪个Watcher收集到Dep中。
 * Dep使用发布订阅模式，当数据发生变化时，会循环依赖列表，把所有的Watcher都通知一遍。
 * 代码精髓：Watcher把自己设置到全局的一个指定位置，然后读取数据，因为读取了数据，所以会触发这个数据的getter。
 * 在getter中就能得到当前正在读取数据的Watcher，并把这个Watcher收集到Dep中
 */