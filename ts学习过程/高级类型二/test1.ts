//索引类型
//keyof索引查询 T[K]索引访问 extends泛型约束

//keyof操作符可以用于获取某种类型的所有键，其返回类型是联合脸型
interface Iperson {
  name: string
  age: number
}
type Test = keyof Iperson;  //  'name' | 'age'

//T[K]索引访问 表示接口T的属性K所代表的类型
interface Iperson1 {
  name: string
  age: number
}
let type1: Iperson1['name'] //string
let type2: Iperson1['age']  //number

//extends 泛型约束
//T extends U 表示泛型变量可以通过继承某个类型，获得某些属性
interface ILength {
  length: number
}
//表明了printLength方法有一个入参，入参中要有length属性，并且length属性是number类型
function printLength<T extends ILength> (arg: T): T {
  console.log(arg.length)
  return arg
}
const str = printLength('lin')
const arr = printLength([1,2,3])
const obj = printLength({ length: 10 })
// const num = printLength(10) 因为number类型没有length属性，所以报错


//从对象中抽取一些属性的值,然后拼接成数组
const userInfo = {
  name: 'lin',
  age: '18',
}
function getValues(userInfo: any, keys: string[]) {
  return keys.map(key => userInfo[key])
}
// 抽取指定属性的值
console.log(getValues(userInfo, ['name','age']))  // ['lin', '18']
// 抽取obj中没有的属性:
console.log(getValues(userInfo, ['sex','outlook']))  // [undefined, undefined]

//定义泛型T、K，用于约束userInfo和keys
//为K增加一个泛型约束，使K继承userInfo的所有属性和联合类型，即K extends keyof T
//改造getValues
function getValues1<T, K extends keyof T> (userInfo: T, keys: K[]) : T[K] []{
  /**
   * 此处理解：
   * 这里的 T K 就是代表这个方法的2个入参的类型， T代表了userInfo， K代表的是获取到了T的所有键（就是定义userInfo的name和age）
   * K的作用就是来防止传的第二个参数，userInfo中没有匹配到key
   * keys: K[] 代表的意思是 是一个数组类型，然后数组中的值应该是userInfo中的2个key
   * T[K] [] 代表的意思是 指定了返回的格式 是一个数组，数组中的值是userInfo中name和age对应的值：[ userInfo.name, userInfo.age ]
   * T 就是入参userInfo， K 就是入参['name', 'age']
   */
  return keys.map(key => userInfo[key])
}
getValues1(userInfo, ['name', 'age'])
console.log(getValues1(userInfo, ['name', 'age']),'改造后') //['lin', '18']
// getValues1(userInfo, ['sex', 'outlock'])  此时userInfo中没有sex和outlock属性，检测就会报错

//映射类型：TS允许将一个类型映射成另外一个类型
//in操作符：用来对联合类型实现遍历
type Person = 'name' | 'age' | 'school'
type Obj = {
  [p in Person]: string
}

interface IPerson {
  name: string
  age: number
}

//使用了IPerson，就一定要传name和age
let p1: IPerson = {
  name: 'lin',
  age: 18
}

//用Partial改造一下，就可以变成可选属性
type Ipartial = Partial<Iperson>
let p2: Ipartial = {}

//Partial 原理
//Partial的实现用了in和keyof
// type Partial<T> = {
//   [P in keyof T]?: T[P]
// }

/**
 * [P in keyof T]遍历T上的所有属性
 * ?:设置为属性为可选的
 * T[P]设置类型为原来的类型
 */

//Readonly：Readonly<T>将T的所有属性映射为只读的
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P]
// }

/**
 * [P in keyof T]遍历T上的所有属性
 * readonly设置为属性为可选的
 * T[P]设置类型为原来的类型
 */
interface IPerson {
  name: string
  age: number
}
 
type IReadOnly = Readonly<IPerson>
 
let p3: IReadOnly = {
  name: 'lin',
  age: 18
}

// p3.age = 17 无法赋值，因为已经被设置为只读

//Pick：用于抽取对象子集，挑选一组属性并组成一个新的类型
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P]
// }

interface IPerson1 {
  name: string
  age: number
  sex: string
}
type IPick = Pick<IPerson1, 'name' | 'age'>
let p4:IPick = {
  name: 'wang',
  age: 18
}
/**
 * Pick映射类型有2个参数
 * 第一个参数T，表示要抽取的目标对象
 * 第二个参数K，具有一个约束：K一定要来自T所有属性字面量的联合类型
 */

//Record：会创建新属性的非同态映射类型
interface IPerson2 {
  name: string
  age: number
}
type IRecord = Record<string, IPerson2>
let personMap: IRecord = {
  person1: {
    name: 'wang',
    age: 18
  },
  person2: {
    name: 'wang11',
    age: 20
  },
}
/**
 * Record 映射类型有两个参数:
 * 第一个参数可以传入继承于 any 的任何值
 * 第二个参数，作为新创建对象的值，被传入
 */

//条件类型
//Exclude：意思是不包含，Exclude<T, U> 会返回 联合类型 T 中不包含 联合类型 U 的部分
type Test1 = Exclude<'a' | 'b' | 'c', 'a'>
let t:Test1 //'b' | 'c'

//Extract：Extract<T, U>提取联合类型 T 和联合类型 U 的所有交集
type Test2 = Extract<'key1' | 'key2', 'key1'>
let t2:Test2 //'key1'