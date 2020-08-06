//第一步需要先添加tsconfig.json文件，否则后面会报错  tsc --init
function sayHello(person) {
    return 'hello' + person;
}
var user = 'Tom';
var num = 7;
var isDone = true;
var numtest1 = NaN;
var strtestES6 = 'es6字符模版';
var strtest = "test" + strtestES6;
//void代表空值
function foo() {
    alert('void');
}
//void只能设置undefined||null
var voidTest = undefined;
//设置null和undefined原始数据类型
var n = null;
var u = undefined;
// any类型可以赋值任何类型，也可以改变其原先类型
// 声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值
var anyTest = 'string';
anyTest = 2;
//变量在声明时未定义类型，则为任意值类型（any）
var something;
something = 7;
something = 'seven';
something.somefunction('some');
//联合类型：可以设置多种类型
var strOrnum = 'seven';
strOrnum = 7;
strOrnum = true;
//创建了一个变量tom，定义类型，这样数据结构必须和同类型的接口一致
var tom = {
    name: 'zhao',
    age: 33
};
var peter = {
    name: 'zhao'
};
var jim = {
    name: 'zhao',
    // age: 22,    会报错，类型不统一
    age: '22',
    action: 'aaa'
};
var acline = {
    id: 1,
    name: 'zhao',
    age: 200,
    action: 'action'
};
//数组定义
//类型+[],数组中不可出现与设定的类型不同
// let arr1: number[] = [1,2,3,'4']    '4' 报错
var arr1 = [1, 2, 3, 4];
//数组的相对方法，也会限制类型
arr1.push('5');
console.log(sayHello(user));
