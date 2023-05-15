/**
 * 泛型：
 * 可用解决输入输出要一致的问题
 */

//例子
function print (arg: any): any {
  console.log(arg)
  return arg
}
const res: string = print(123)  //不符合效果，输入的是number，定义的却是string

//返回的是number类型，赋值的是string类型，因为print方法是any，所以不会报错，但是不是我们想要的结果

//泛型语法： <>里写类型参数，一般可以用T来代表
//泛型中的T就像一个占位符，或者说一个变量，在使用的时候可以把定义的的类型像参数一样传入，他可以原封不动的输出
function print1<T> (arg: T): T {
  console.log(arg)
  return arg
}
// const res1:string = print1(123) 输入类型和输出类型不一致，会报错
const res1: string = print1('123')
console.log(res1, 'res1')

print1<string>('111') //定义类型为string
print1('333') //自行推导类型为string

//type使用泛型
type Print = <T>(arg: T) => T
const PrintFn: Print = function (arg) {
  console.log('type:',arg)
  return arg
}
PrintFn(1122)

//interface使用泛型
interface Iprint<T> {
  (arg: T): T
} 

function print3<T> (arg: T) {
  console.log(arg)
  return arg
}

const myPrint: Iprint<number> = print3

//默认参数
//如果要给泛型添加默认参数
interface Iprint <T = number> {
  (arg: T): T
}

function print4<T> (arg: T) {
  console.log(arg)
  return arg
}
const myPrint1: Iprint = print4

//实现元祖交换
//传入的参数里，第 0 项为 string 类型，第 1 项为 number 类型。
//在交换函数的返回值里，第 0 项为 number 类型，第 1 项为 string 类型。
function swap <T, U> (tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
const res2 = swap(['abc', 18])
console.log(res2) //[18, 'abc']

//函数副作用操作
//泛型不仅可以很方便地约束函数的参数类型，还可以用在函数执行副作用操作的时候
function request(url:string) {
  return fetch(url).then(res => res.json())
}

request('user/info').then(res =>{
  console.log(res)
})

//希望调用API都清晰的知道返回类型是什么数据结构
interface UserInfo {
  name: string,
  age: number
}

function request1<T> (url: string): Promise<T> {
  return fetch(url).then(res => res.json())
}

request1<UserInfo> ('user/info').then(res => {
  console.log(res)  //这里返回的res就是UserInfo数据结构
  res.age
  res.name
})

//约束泛型
//打印传入参数的长度
function printLength<T> (arg: T): T {
  // console.log(arg.length) 因为不确定T是否具有length属性，所以报错
  return arg
}

//搭配interface，约束类型
interface ILength {
  length: number
}

function printLength1<T extends ILength> (arg: T): T {
  console.log(arg.length)
  return arg
}
//注意：<T extends ILength>，让这个泛型继承接口ILength，这样就可以约束泛型

const str = printLength1('lin')
const arr = printLength1([1,2,3])
const obj = printLength1({ length: 10 })
// const bool = printLength1(true) bool类型没有length属性，报错

//在使用泛型，可用在定义函数，接口或者类的时候，不预先指定具体类型，而是在使用的时候再指定类型
//泛型约束类
class Stack<T> {
  private data: T[] = []
  push(item: T) {
    return this.data.push(item)
  }
  pop (): T | undefined {
    return this.data.pop()
  }
}

//在定义实例的时候，比如想要number类型
const s1 = new Stack<number>()
s1.push(123)
// s1.push('aaa')  因为定义的时候设置了number类型，所以string不行
const s2 = new Stack<string>()
s2.push('bbb')
// s2.push(222)  定义的是string，所以number不行
//注意：泛型无法约束类的静态成员（如果给pop添加static就会报错）

//泛型约束接口
interface IKeyValue<T, U> {
  key: T
  value: U
}

const k1:IKeyValue<number, string> = {key: 18, value: 'aa'}
const k2:IKeyValue<string, number> = {key: '18', value: 88}

//泛型定义数组
//2种写法
const arr1 : number [] = [1,2,3]
const arr2: Array<number> = [1,2,3]

/**
 * 泛型总结：
 * 泛型是指在定义函数、接口或者类的时候，不预先指定具体类型，而是在使用的时候再指定类型
 * 泛型中的T就像一个占位符，或者说是一个变量，在使用的时候可以把定义的的类型像参数一样传入，他可以原封不动的输出
 * 泛型在成员之间提供有意义的约束，这些成员可以是：函数参数、函数返回值、类的实例成员、类的方法等
 */