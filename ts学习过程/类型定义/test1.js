//所有定义变量的类型都不可以改变
var isHandsome = true;
var age = 18;
var realName = 'aa';
var realName2 = "aa".concat(realName);
var u = undefined;
var n = null;
//如果设置中启用了strictNullChecks
//null 和 undefined 只能赋值给 void 和它们各自，不然会报错
//不开启的话，undefined和null可以赋值给任何类型的变量
// isHandsome = undefined
// isHandsome = null
// age = undefined
// age = null
// realName = undefined
// realName = null
//any，可以让该变量成为任何类型，在不确定的情况下使用
var anyOne = 'aa';
anyOne = 123;
anyOne = true;
anyOne.a = 1;
// anyOne.fun() 防止转变成js报错，所以注释
//unknown，和any一样，可以让变量成为任何类型，但是他是一个安全类型
function foo(params) {
    //用any就可以通过
    return params / 2;
}
function foo2(params) {
    //用unknown不通过，因为他不确定传进来的params是不是一个number类型，如果不是的话，就会报错了
    //return params/2
}
function foo3(params) {
    //配合类型断言，即可解决这个问题
    return params / 2;
}
//void，表示没有任何类型，比如函数没有明确返回值，默认返回void类型
function foo4() {
    console.log(333);
}
//never,表示永不存在的值的类型，比如：
// 1。函数抛出异常，那么这个函数永远不会有返回值，因为抛出异常之后会直接中断程序运行
// 2。函数中执行无限循环的代码，这样函数无法执行到函数返回值的那一步
function fn(msg) {
    throw new Error(msg);
}
function fn1() {
    while (true) { }
}
//never可以赋值给任何类型，但是其他类型不能赋值给never
var test1;
//test1 = 'aa' 报错
var test2;
var test3;
//test2 = test3 报错
//数组类型
var list = [1, 2, 3];
//此处number的定义为数组中的值的类型为number（如果定义成string，则需要['1', '2', '3']）
//push中的参数也需要和定义的类型一样
list.push(4);
list; //[1,2,3,4]
//元组类型，允许表示一个已知元素数量和类型的数组，各元素类型不必相同
var arr = [1, '2'];
//写错类型会报错
//let arr1: [number, string] = [1,2]  报错
//规定了数量，越界报错
//let arr2: [number, string] = [1,'2', 3]  报错
//对元祖push的时候，就不会有越界报错，但是push的参数类型必须是之前定义的类型中
arr.push(3);
//arr.push({a:1}) 没有定义object，push的时候会报错
//函数类型，函数需要定义输入参数类型和输出类型，不过输出类型可以忽略，TS可以根据返回语句自动推断出返回值类型
function fn2(a, b) {
    return a + b;
}
fn2(1, 2);
//函数没有返回值，默认返回Void类型
function fn3() {
    console.log('aa');
}
//函数表达式
var add2 = function (x, y) {
    return x + y;
};
//可选参数：参数后面加一个问号，表示这个参数是可选的
function add(x, y, z) {
    return x + y;
}
add(1, 2);
add(1, 2, 3);
//注意：可选参数要放在最后面，否则会报错
//默认参数
function add3(x, y) {
    if (y === void 0) { y = 100; }
    return x + y;
}
add3(100); //200
//如果把默认参数放在前面
function add4(x, y) {
    if (x === void 0) { x = 100; }
    return x + y;
}
//add4(200) 这样会认为是只传了x(200)，y没有传
add4(undefined, 200); //必须传入undefined来获取默认值  add4(undefined, 200) 300
//ts中函数不能随便赋值
function add5(x, y) {
    return x + y;
}
//add5 = '123'  报错
//可用定义一个函数，将之前的函数赋值给它
var add6 = add5;
console.log(add6(100, 300)); //400
//也可以不声明直接赋值，ts会自己判断
var add7 = add5;
function someAdd(x) {
    if (typeof x[0] === 'string') {
        return x.join();
    }
    if (typeof x[0] === 'number') {
        return x.reduce(function (acc, cur) { return acc + cur; });
    }
}
function someParamsAdd(x, y) {
    if (Array.isArray(y) && typeof y[0] === 'number') {
        return x.reduce(function (acc, cur) { return acc + cur; }) + y.reduce(function (acc, cur) { return acc + cur; });
    }
    if (Array.isArray(y) && typeof y[0] === 'string') {
        return x.join() + ',' + y.join();
    }
    if (typeof x[0] === 'string') {
        return x.join();
    }
    if (typeof x[0] === 'number') {
        return x.reduce(function (acc, cur) { return acc + cur; });
    }
}
console.log(someParamsAdd([1, 2, 3])); //6
console.log(someParamsAdd(['a', 'b', 'c'])); //'a,b,c'
console.log(someParamsAdd([1, 2, 3], [4, 5, 6])); //21
console.log(someParamsAdd(['a', 'b', 'c'], ['e', 'f', 'g'])); //'a','b','c','e','f','g'
