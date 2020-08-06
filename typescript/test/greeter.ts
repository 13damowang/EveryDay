//第一步需要先添加tsconfig.json文件，否则后面会报错  tsc --init

function sayHello (person: string) {    //:定义参数类型，传入的参数必须匹配定义的类型
    return 'hello' + person
}
let user = 'Tom';
let num: number = 7;
let isDone: boolean = true;
let numtest1: number = NaN
let strtestES6: string = 'es6字符模版'
let strtest: string = `test${strtestES6}`

//void代表空值
function foo (): void {
    alert('void')
}

//void只能设置undefined||null
let voidTest: void = undefined

//设置null和undefined原始数据类型
let n: null = null;
let u: undefined = undefined;

// any类型可以赋值任何类型，也可以改变其原先类型
// 声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值
let anyTest: any = 'string'
anyTest = 2

//变量在声明时未定义类型，则为任意值类型（any）
let something
something = 7
something = 'seven'
something.somefunction('some')

//联合类型：可以设置多种类型
let strOrnum : string | number | boolean = 'seven'
strOrnum = 7
strOrnum = true

//接口interface
// 定义接口的类，和对象的类匹配，其格式和属性必须也匹配
//创造一个接口，并且给他定义一个类型
interface Person {
    name: string
    age: number
}

//创建了一个变量tom，定义类型，这样数据结构必须和同类型的接口一致
let tom: Person = {
    name: 'zhao',
    age: 33
}

//可选属性，属性后带有？表示可以不需要这个属性
interface Variable {
    name: string
    age?: number
}
let peter: Variable = {
    name: 'zhao'
}

//任意属性，任意属性，类型固定，
//如果一个接口里鱼鸥任意属性，那么这个接口里的所有类型必须和任意属性的类型  一样
//任意属性如果设置类型为any，则不会报错
interface Arbitrarily {
    name: string;
    // age?: number;   会报错，类型不统一
    age: string;
    [propName: string]: string;
}
let jim: Arbitrarily = {
    name: 'zhao',
    // age: 22,    会报错，类型不统一
    age: '22',
    action: 'aaa'
}

//只读属性，限制了只能在创建对象的时候赋值，不能更改，若没有赋值，则一样不能在后续赋值
interface ReadonlyTest {
    readonly id: number
    name: string
    age?: number
    [propName: string]: any
}

let acline: ReadonlyTest = {
    id: 1,
    name: 'zhao',
    age: 200,
    action: 'action'
}

//数组定义
//类型+[],数组中不可出现与设定的类型不同
// let arr1: number[] = [1,2,3,'4']    '4' 报错
let arr1: number[] = [1,2,3,4]

//数组的相对方法，也会限制类型
// arr1.push('5') 报错
arr1.push(5)

//数组泛型
let arr2: Array<number> = [5,4,3,2]
console.log(sayHello(user));

function creatArray (length: number, value: any) :Array<any> {
    let result = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}

creatArray(4,'xxx')