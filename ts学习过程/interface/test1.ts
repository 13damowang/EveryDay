/**
 * interface(接口)用于定义对象类型的，可以对对象的形状进行描述
 * 定义interface一般首字母大写
 */

//属性必须和类型定义的时候完全一致
interface Person1 {
  name: string,
  age: number
}

const P1: Person1 = {
  name: 'aa',
  age: 18
}

//可选属性，在属性后面添加? 表示可选
interface Person2 {
  name: string,
  age?: number
}

const P2: Person2 = {
  name: 'aa'
}

//只读属性
interface Person3 {
  readonly id: number,
  name: string,
  age: number
}

const P3: Person3 = {
  id: 1,
  name: 'aa',
  age: 18
}

//P3.id = 2 在更改id的时候会报错，因为id被设置成了只读，所以不可以修改

//interface 描述函数类型
interface Ism {
  (x: number, y: number): number
}

const add: Ism = (num1, num2) => {
  return num1 + num2
}

console.log(add(5,6)) //11

//自定义属性（可索引的类型）,针对对象有多个不确定的属性
interface RandomKey {
  [propName: string]: string
}

const obj: RandomKey = {
  a: 'a',
  b: 'bb',
  c: 'ccc'
}

//也可以把属性名定义成number类型，成为类数组，看上去和数组一样
interface LikeArray {
  [proNames: number]: string
}

const arr: LikeArray = ['str', 'str1']
arr[0]  //str，可以通过数组下标访问到，但是没有数组方法（例如push等）