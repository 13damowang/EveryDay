//索引类型
//keyof索引查询 T[K]索引访问 extends泛型约束
var type1; //string
var type2; //number
//表明了printLength方法有一个入参，入参中要有length属性，并且length属性是number类型
function printLength(arg) {
    console.log(arg.length);
    return arg;
}
var str = printLength('lin');
var arr = printLength([1, 2, 3]);
var obj = printLength({ length: 10 });
// const num = printLength(10) 因为number类型没有length属性，所以报错
//从对象中抽取一些属性的值,然后拼接成数组
var userInfo = {
    name: 'lin',
    age: '18',
};
function getValues(userInfo, keys) {
    return keys.map(function (key) { return userInfo[key]; });
}
// 抽取指定属性的值
console.log(getValues(userInfo, ['name', 'age'])); // ['lin', '18']
// 抽取obj中没有的属性:
console.log(getValues(userInfo, ['sex', 'outlook'])); // [undefined, undefined]
//定义泛型T、K，用于约束userInfo和keys
//为K增加一个泛型约束，使K继承userInfo的所有属性和联合类型，即K extends keyof T
//改造getValues
function getValues1(userInfo, keys) {
    return keys.map(function (key) { return userInfo[key]; });
}
getValues1(userInfo, ['name', 'age']);
console.log(getValues1(userInfo, ['name', 'age']), '改造后');
