var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//定义一个类
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.speak = function () {
        console.log("".concat(this.name, " speak"), 22222);
    };
    return Person;
}());
var P1 = new Person('wang'); //新建实例
P1.name; //访问属性
P1.speak(); //访问方法
//继承
//利用extends实现继承，定义一个Student类继承自Person类
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Student.prototype.study = function () {
        console.log("".concat(this.name, " needs study"));
    };
    return Student;
}(Person));
var S1 = new Student('student wang');
S1.study();
//继承完之后，Student可以访问到Person上的属性和方法
S1.speak(); //student wang speak
console.log(S1.name); //student wang
//super，如果Student类有自己的属性，就要用到super关键字来把父类的属性继承过来
//比如新增一个grade属性
var Student1 = /** @class */ (function (_super) {
    __extends(Student1, _super);
    function Student1(name, grade) {
        var _this = _super.call(this, name) || this;
        _this.grade = grade;
        return _this;
    }
    return Student1;
}(Person));
var S2 = new Student1('student1wang', 100);
console.log('S2.grade', S2.grade); //100
console.log('S2.name', S2.name); //student1wang
console.log('S2.speak', S2.speak()); //student1wang speak
//多态
//子类对父类的方法进行了重写，子类和父类调用同一个方法时会不一样
var Student2 = /** @class */ (function (_super) {
    __extends(Student2, _super);
    function Student2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Student2.prototype.speak = function () {
        return "Student ".concat(_super.prototype.speak.call(this));
    };
    return Student2;
}(Person));
var S3 = new Student2('student2wang');
console.log(S3.speak());
//public 公有的，一个类里默认所有的方法和属性都是public，比如之前定义的Person
var Person2 = /** @class */ (function () {
    function Person2() {
    }
    Person2.prototype.consrtuctor = function (name) {
        this.name = name;
    };
    Person2.prototype.speak = function () {
        console.log("".concat(this.name, " is speaking"));
    };
    return Person2;
}());
//public可写可不写
//private，私有的，只属于这个类自己，它的实例和继续子类都访问不到
//把Person类的name改为private
var Person3 = /** @class */ (function () {
    function Person3(name) {
        this.name = name;
    }
    Person3.prototype.speak = function () {
        console.log("".concat(this.name, " is speaking"));
    };
    return Person3;
}());
var P3 = new Person3('Person3wang');
// P3.name 报错，私有属性，不可以通过实例访问，只能在类的内部访问
var Student3 = /** @class */ (function (_super) {
    __extends(Student3, _super);
    function Student3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Student3.prototype.study = function () {
        // console.log(`${this.name} is speaking`) 
        //此处访问的this.name是Person3a中的name，但是name是私有，所以子类不允许访问
    };
    return Student3;
}(Person3));
//protected，受保护的，继续它的子类可以访问，实例不能访问
//将Person的name属性改为protected
var Person4 = /** @class */ (function () {
    function Person4(age) {
        this.age = age;
    }
    Person4.prototype.speak = function () {
        console.log("\u5E74\u9F84\u662F\uFF1A".concat(this.age));
    };
    return Person4;
}());
var P4 = new Person4(18);
// P4.age  age是受保护属性，只能在类内部或者继承它的子类中使用
var Student4 = /** @class */ (function (_super) {
    __extends(Student4, _super);
    function Student4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Student4.prototype.study = function () {
        console.log("Person\u7684\u5E74\u9F84\u662F\uFF1A".concat(this.age));
    };
    return Student4;
}(Person4));
var S4 = new Student4(256);
S4.speak();
S4.study();
//static，静态的属性，类上的一些常量，实例不能访问
var Circle = /** @class */ (function () {
    function Circle(radius) {
        this.radius = radius;
    }
    Circle.prototype.calcLength = function () {
        return Circle.pi * this.radius * 2;
    };
    Circle.pi = 3.14;
    return Circle;
}());
var c1 = new Circle(10);
// c1.pi 实例访问会报错
//抽象类
//TS 通过 public、private、protected 三个修饰符来增强了 JS 中的类。
// 其实 TS 还对 JS 扩展了一个新概念——抽象类。
// 所谓抽象类，是指只能被继承，但不能被实例化的类
// 抽象类有两个特点：
// 抽象类不允许被实例化
// 抽象类中的抽象方法必须被子类实现
// 抽象类用一个 abstract 关键字来定义
var AnimalTest = /** @class */ (function () {
    function AnimalTest() {
    }
    return AnimalTest;
}());
// const a = new Animal()  实例出来就报错
//抽象类中的抽象方法必须被子类实现
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
//定义了一个Dog累，继承了Animal，但是没有实现Animal类上的抽象方法sayHi 报错
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    //必须要添加sayHi方法
    Dog.prototype.sayHi = function () {
        console.log('dog');
    };
    return Dog;
}(Animal));
//抽象方法和多态
//多态是面向对象的三大基本特征之一
//多态指的是，父类定义一个抽象方法，在多个子类中有不同的实现，运行的时候不同的子类就对应不同的操作
var Animal1 = /** @class */ (function () {
    function Animal1(name) {
        this.name = name;
    }
    return Animal1;
}());
var Dog1 = /** @class */ (function (_super) {
    __extends(Dog1, _super);
    function Dog1(name) {
        return _super.call(this, name) || this;
    }
    Dog1.prototype.sayHi = function () {
        console.log('dog1');
    };
    return Dog1;
}(Animal1));
var Dog2 = /** @class */ (function (_super) {
    __extends(Dog2, _super);
    function Dog2(name) {
        return _super.call(this, name) || this;
    }
    Dog2.prototype.sayHi = function () {
        console.log('dog2');
    };
    return Dog2;
}(Animal1));
//Dog1和Dog2都继承了Animal1类，都不同实现了sayHi这个方法
//this类型
//类的成员方法可以直接返回一个this，这样就可以很方便的实现链式调用
var StudyStep = /** @class */ (function () {
    function StudyStep() {
    }
    StudyStep.prototype.step1 = function () {
        console.log('listen');
        return this;
    };
    StudyStep.prototype.step2 = function () {
        console.log('write');
        return this;
    };
    return StudyStep;
}());
var s = new StudyStep();
s.step1().step2(); // 链式调用
var StudyStep1 = /** @class */ (function () {
    function StudyStep1() {
    }
    StudyStep1.prototype.step1 = function () {
        console.log('listen');
        return this;
    };
    StudyStep1.prototype.step2 = function () {
        console.log('write');
        return this;
    };
    return StudyStep1;
}());
var MystudyStep = /** @class */ (function (_super) {
    __extends(MystudyStep, _super);
    function MystudyStep() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MystudyStep.prototype.next = function () {
        console.log('before done');
        return this;
    };
    return MystudyStep;
}(StudyStep1));
var m = new MystudyStep();
m.step1().next().step2().next(); //父类和子类上的方法可以随意调用
