/**
* 为了让对象能递归，每一层都变成响应式
* 理解图：
* observe(obj) => 看obj身上有没有__ob__ => 创建实例 new Observer()，添加到__ob__上 => 遍历下一层属性，逐个defineReactive
*/
import Observer from './Observer.js'

//创建observe函数
export default function (value) {
 //监测是否为对象，针对对象变成响应式
 if (typeof value != 'object') return
 //定义ob
 var ob
 if (typeof value.__ob__ != 'undefined') {
   ob = value.__ob__
 } else {
   ob = new Observer(value)
 }
 return ob
}