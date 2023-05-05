//定义一个类
class Person {
  name: string
  constructor (name: string) {
    this.name = name
  }
  speak () {
    console.log(`${this.name} speak`,22222)
  }
}
const P1 = new Person('wang') //新建实例
P1.name //访问属性
P1.speak()  //访问方法

//继承
//利用extends实现继承，定义一个Student类继承自Person类
class Student extends Person {
  study () {
    console.log(`${this.name} needs study`)
  }
}
const S1 = new Student('student wang')
S1.study()
//继承完之后，Student可以访问到Person上的属性和方法
S1.speak()  //student wang speak
console.log(S1.name)  //student wang

//super，如果Student类有自己的属性，就要用到super关键字来把父类的属性继承过来
//比如新增一个grade属性
class Student1 extends Person {
  grade: number
  constructor (name: string, grade: number) {
    super(name)
    this.grade = grade
  }
}
const S2 = new Student1('student1wang', 100)
console.log('S2.grade',S2.grade)  //100
console.log('S2.name',S2.name)  //student1wang
console.log('S2.speak',S2.speak())  //student1wang speak

//多态
//子类对父类的方法进行了重写，子类和父类调用同一个方法时会不一样
class Student2 extends Person {
  speak () {
    return `Student ${super.speak()}`
  }
}
const S3 = new Student2('student2wang')
console.log(S3.speak())

//public 公有的，一个类里默认所有的方法和属性都是public，比如之前定义的Person
class Person2 {
  public name: string
  public consrtuctor (name: string) {
    this.name = name
  }
  public speak () {
    console.log(`${this.name} is speaking`)
  }
}

//public可写可不写

//private，私有的，只属于这个类自己，它的实例和继续子类都访问不到
//把Person类的name改为private
class Person3 {
  private name: string
  public constructor (name: string) {
    this.name = name
  }
  public speak () {
    console.log(`${this.name} is speaking`)
  }
}

const P3 = new Person3('Person3wang')
// P3.name 报错，私有属性，不可以通过实例访问，只能在类的内部访问

class Student3 extends Person3 {
  study () {
    // console.log(`${this.name} is speaking`) 
    //此处访问的this.name是Person3a中的name，但是name是私有，所以子类不允许访问
  }
}

//protected，受保护的，继续它的子类可以访问，实例不能访问
//将Person的name属性改为protected
class Person4 {
  protected age: number
  public constructor (age: number) {
    this.age = age
  }
  public speak () {
    console.log(`年龄是：${this.age}`)
  }
}
const P4 = new Person4(18)
// P4.age  age是受保护属性，只能在类内部或者继承它的子类中使用
class Student4 extends Person4 {
  study () {
    console.log(`Person的年龄是：${this.age}`)
  }
}
const S4 = new Student4(256)
S4.speak()
S4.study()

//static，静态的属性，类上的一些常量，实例不能访问
class Circle {
  static pi = 3.14
  public radius: number
  public constructor (radius: number) {
    this.radius = radius
  }
  public calcLength () {
    return Circle.pi * this.radius * 2
  }
}
const c1 = new Circle(10)
// c1.pi 实例访问会报错

//抽象类
//TS 通过 public、private、protected 三个修饰符来增强了 JS 中的类。
// 其实 TS 还对 JS 扩展了一个新概念——抽象类。
// 所谓抽象类，是指只能被继承，但不能被实例化的类
// 抽象类有两个特点：
// 抽象类不允许被实例化
// 抽象类中的抽象方法必须被子类实现
// 抽象类用一个 abstract 关键字来定义
abstract class AnimalTest {}
// const a = new Animal()  实例出来就报错

//抽象类中的抽象方法必须被子类实现
abstract class Animal {
  constructor (name: string) {
    this.name = name
  }
  public name: string
  public abstract sayHi(): void
}

//定义了一个Dog累，继承了Animal，但是没有实现Animal类上的抽象方法sayHi 报错
class Dog extends Animal {
  constructor (name: string) {
    super(name)
  }
  //必须要添加sayHi方法
  public sayHi () {
    console.log('dog')
  }
}

//抽象方法和多态
//多态是面向对象的三大基本特征之一
//多态指的是，父类定义一个抽象方法，在多个子类中有不同的实现，运行的时候不同的子类就对应不同的操作
abstract class Animal1 {
  constructor (name: string) {
    this.name = name
  }
  public name: string
  public abstract sayHi(): void
}

class Dog1 extends Animal1 {
  constructor (name: string) {
    super(name)
  }
  public sayHi () {
    console.log('dog1')
  }
}

class Dog2 extends Animal1 {
  constructor (name: string) {
    super(name)
  }
  public sayHi () {
    console.log('dog2')
  }
}
//Dog1和Dog2都继承了Animal1类，都不同实现了sayHi这个方法


//this类型
//类的成员方法可以直接返回一个this，这样就可以很方便的实现链式调用
class StudyStep {
  step1() {
    console.log('listen')
    return this
  }
  step2() {
    console.log('write')
    return this
  }
}
const s = new StudyStep()
s.step1().step2()    // 链式调用

class StudyStep1 {
  step1 () {
    console.log('listen')
    return this
  }

  step2 () {
    console.log('write')
    return this
  }
}

class MystudyStep extends StudyStep1 {
  next () {
    console.log('before done')
    return this
  }
}
const m = new MystudyStep()
m.step1().next().step2().next() //父类和子类上的方法可以随意调用

//implements
interface MusicInterfaceTest {
  playMusic(): void
}

//定义了约束后，class必须要满足接口上的所有条件
//如果 Cellphone 类上不写 playMusic 方法，会报错
class CellphoneTest implements MusicInterfaceTest {
  playMusic () {
    console.log('playMusic')
  }
}

//处理公共的属性和方法
//不同的类有一些共同的属性和方法，使用继承很难完成，需要使用implements
interface MusicInterface {
  playMusic(): void
}

interface callInterface {
  makePhoneCall(): void
}

class Car implements MusicInterface {
  playMusic() {}
}

class Cellphone implements MusicInterface {
  playMusic() {}
}

//约束2个类
class DoubleCellphone implements MusicInterface, callInterface {
  playMusic () {}
  makePhoneCall () {}
}

//约束构造函数和静态属性
interface CircleStatic {
  new (radius: number): void
  pi: number
}

const Circle1:CircleStatic = class Circle {
  static pi = 3.14
  public radius: number
  public constructor (radius: number) {
    this.radius = radius
  }
}