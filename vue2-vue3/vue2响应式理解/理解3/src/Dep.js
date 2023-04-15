var uid = 0
export default class Dep {
  constructor () {
    console.log('我是是Dep类的构造器')
    this.id = uid++;

    //用数组存储自己的订阅者
    //这个数组里面放的是Watcher的实例
    this.subs = []
  }
  //添加订阅
  addSub(sub) {
    this.subs.push(sub)
  }
  //添加依赖
  depend () {
    //Dep.target是自己指定的全局的一个位置
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
  //通知更新
  notify () {
    //浅拷贝一份
    const subs = this.subs.slice()
    //遍历
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}