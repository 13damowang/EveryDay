/*function flag(person: String){	//设置类型,如果传入的值不是规定的类型，那么将在编译的时候报错
    return 'Hello' + person;
}
var user ;
document.body.innerHTML = flag();*/
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = { firstName: "Jane", lastName: "User" };
document.body.innerHTML = greeter(user);
