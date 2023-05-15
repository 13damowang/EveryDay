/**
 * 泛型：
 * 可用解决输入输出要一致的问题
 */
//例子
function print(arg) {
    console.log(arg);
    return arg;
}
var res = print(123); //不符合效果，输入的是number，定义的却是string
//返回的是number类型，赋值的是string类型，因为print方法是any，所以不会报错，但是不是我们想要的结果
//泛型语法： <>里写类型参数，一般可以用T来代表
//泛型中的T就像一个占位符，或者说一个变量，在使用的时候可以把定义的的类型像参数一样传入，他可以原封不动的输出
function print1(arg) {
    console.log(arg);
    return arg;
}
// const res1:string = print1(123) 输入类型和输出类型不一致，会报错
var res1 = print1('123');
console.log(res1, 'res1');
print1('111'); //定义类型为string
print1('333'); //自行推导类型为string
var PrintFn = function (arg) {
    console.log('type:', arg);
    return arg;
};
PrintFn(1122);
function print3(arg) {
    console.log(arg);
    return arg;
}
var myPrint = print3;
function print4(arg) {
    console.log(arg);
    return arg;
}
var myPrint1 = print4;
//实现元祖交换
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
var res2 = swap(['abc', 18]);
console.log(res2); //['18', '17']
