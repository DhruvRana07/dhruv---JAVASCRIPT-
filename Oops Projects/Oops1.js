// Question 1: Understanding Class Inheritance
// Consider the following code snippet:

class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}

let dog = new Dog('Buddy');
dog.speak();


//--------- Output ---------
// Buddy barks.


//--------- Explanation --------- 

//--> We define a class Animal with a constructor that takes a name parameter.Inside the constructor, we assign the name parameter to the instance variable this.name.

//--> The Animal class has a method speak(), which logs a message indicating that the animal makes a noise, using the name property of the instance.

//--> We define a subclass Dog that extends the Animal class using the extends keyword.This means that Dog inherits the properties and methods of Animal.

//--> The Dog class has its own speak() method, which overrides the speak() method inherited from Animal.This method logs a message indicating that the dog barks, using the name property of the instance.

//--> We create a new instance of Dog called dog, passing "Buddy" as the name parameter to the constructor.

//--> We call the speak() method on the dog instance.Since dog is an instance of the Dog class, JavaScript looks for the speak() method in the Dog class first. It finds the speak() method in the Dog class, so it executes that method, logging "Buddy barks." to the console.