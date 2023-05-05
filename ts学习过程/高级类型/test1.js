//联合类型
//一个变量定义多种类型
var num;
//nun可以为数值也可以为字符串
num = 1;
num = 'a';
function getName(n) {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
console.log(getName('wang'));
console.log(getName(function () { return 'wang2'; }));
var arr = [1, '2', 3]; //定义了一个数组，数组中的值可以是number类型也可以是string
//声明一个list数组，这个数组里包含了之前定义的Student1和Teacher，
//Student1里面含有Person1到name属性，然后又追加了grade，
//Teacher又在Student1的基础上追加了major
//所以Student1上应该要有2个属性（name,grade）
//Teacher上应该要有3个属性（name,grade,major)
var list = [
    {
        name: 'wang',
        grade: 100
    }, {
        name: 'wang2',
        major: 'ccc',
        grade: 200
    }
];
var Person23 = {
    name: '999'
};
console.log(Person23);
var add = function (num1, num2) {
    return num1 + num2;
};
var person = {
    name: 'wang',
    grade: 100
};
var person1 = {
    name: 'wang',
    grade: 100
};
