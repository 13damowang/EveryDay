//枚举
//const用来定义常量，但是有些是一定范围内的常量，比如：一周7天，方向有上下左右4个
//这个时候就可以用enum
//基本使用方法
enum Direction {
  Up,
  Down,
  Left,
  Right
}
//有2个特点
//数字递增
//反向映射
//枚举成员会被赋值为从0开始递增的数字
console.log(Direction.Up) //0
console.log(Direction.Down) //1
console.log(Direction.Left) //2
console.log(Direction.Right)  //3

//枚举会对枚举值到枚举名进行反向映射
console.log(Direction[0]) //Up
console.log(Direction[1]) //Down
console.log(Direction[2]) //Left
console.log(Direction[3]) //Right

//如果枚举的第一个元素赋有初始值，则从初始值开始递增
enum Direction1 {
  Up = 66,
  Down,
  Left,
  Right
}

console.log(Direction1.Up) //66
console.log(Direction1.Down) //67
console.log(Direction1.Left) //68
console.log(Direction1.Right)  //69

//手动赋值
//定义一个枚举来管理外卖状态，分别有已下单、配送中、已接受三种状态
enum ItemStatus {
  Buy = 1,
  Send,
  Receive
}
console.log(ItemStatus['Buy'])   //1
console.log(ItemStatus['Send']) //2
console.log(ItemStatus['Receive'])  //3

//也可以手动赋值
enum ItemStatusTest {
  Buy = 100,
  Send = 'ss',
  Receive = 'dd'
}

//字符串枚举
enum DirectionSrt {
  Up = 'Up',
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
const value = 'Up'
if (value === DirectionSrt.Up) {
  console.log('判断相同')
}

//用const定义一个常量枚举
const enum DirectionConstStr {
  Up = 'Up',
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
const value1 = 'Up'
//这样js编译之后的代码更简洁
if (value1 === DirectionConstStr.Up) {
  console.log('判断相同')
}
