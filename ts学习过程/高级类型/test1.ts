//联合类型
//一个变量定义多种类型
let num: number | string
//nun可以为数值也可以为字符串
num = 1
num = 'a'
// num = true  bool没有被定义
//但是该变量身上的属性必须是声明的类型同有点属性才可以，不能单独有

//交叉类型
//如果要对对象形状进行扩展，使用交叉类型：&
interface Person {
  name: string,
  age: number
}
type Student = Person & {grade: number}
//这和类的继承是一样的，Student继承了Person上的属性

/**
 * 联合类型 | 是指可以取几种类型中的任意一种，而交叉类型 & 是指把几种类型合并起来
 * 交叉类型和 interface 的 extends 非常类似，都是为了实现对象形状的组合和扩展。
 */

//类型别名(type)：给类型起个别名
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver //联合类型
function getName (n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}
console.log(getName('wang'))
console.log(getName(() => 'wang2'))

//类型别名用法：
type Name1 = string //基本类型
type arrItem = number | string  //联合类型
const arr: arrItem[] = [1, '2', 3]  //定义了一个数组，数组中的值可以是number类型也可以是string
type Person1 = {
  name: Name1 //代表name是一个string类型
}
type Student1 = Person1 & {grade: number} //交叉类型
type Teacher = Student1 & {major: string}
type StudentAndTeacherList = [Student1, Teacher]  //元祖类型
//声明一个list数组，这个数组里包含了之前定义的Student1和Teacher，
//Student1里面含有Person1到name属性，然后又追加了grade，
//Teacher又在Student1的基础上追加了major
//所以Student1上应该要有2个属性（name,grade）
//Teacher上应该要有3个属性（name,grade,major)
const list: StudentAndTeacherList = [
  {
    name: 'wang',
    grade: 100
  }, {
    name: 'wang2',
    major: 'ccc',
    grade: 200
  }
]

/**
 * type和interface到区别
 * 共同点：
 * 都可以定义一个对象或函数
 * 都允许继承
 * 
 * 不同点：
 * interface（接口）是TS设计出来用于定义对象类型的，可以对对象的形状进行描述
 * type是类型别名，用于给各种类型定义别名
 * type可以声明基本类型、联合类型、交叉类型、元祖，interface不行
 * interface可以合并重复声明，type不行
 */

//定义函数
type addType1 = (num1: number, num2: number) => number
interface addType2 {
  (num1: number, num2: number): number
}
const add: addType1 = (num1, num2) => {
  return num1 + num2
}

//继承
//interface 使用 extends 实现继承， type 使用交叉类型实现继承，两者可以相互继承
interface Person11 {
  name: string
}
interface Student11 extends Person11 {
  grade: number
}
const person:Student11 = {
  name: 'wang',
  grade: 100
}

type Person22 = {
  name: string
}
type Student22 = Person22 & {grade: number}
const person1: Student22 = {
  name: 'wang',
  grade: 100
}

//interface重复声明
interface Person33 {
  name: string
}
interface Person33 {
  age: number
}
const person33: Person33 = {
  name: 'wang',
  age: 22
}

//type不可以重复声明
// type Person44 = {
//   name: string
// }
// type Person44 = {
//   age: number
// }