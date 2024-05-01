// Question 2: Multiple Levels of Inheritance
// Given the following 

class Shape {
    constructor(color) {
        this.color = color;
    }
    getColor() {
        return this.color;
    }
}

class Circle extends Shape {
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }
}

class ColoredCircle extends Circle {
    constructor(color, radius) {
        super(color, radius);
    }
}

let coloredCircle = new ColoredCircle('blue', 5);
console.log(coloredCircle.getColor());

//--------- Output ---------
// blue

//--------- Explanation --------- 

//-->  We define a class Shape with a constructor that takes a color parameter. Inside the constructor, we assign the color parameter to the instance variable this.color.

//--> The Shape class has a method getColor(), which simply returns the color property of the instance.

//--> We define a subclass Circle that extends the Shape class using the extends keyword. This means that Circle inherits the properties and methods of Shape.

//--> The Circle class has its own constructor that takes color and radius parameters. It calls the superclass constructor using super(color), which initializes the color property inherited from Shape. It then initializes its own radius property with the provided value.

//--> We define another subclass ColoredCircle that extends the Circle class.

//--> The ColoredCircle class has its own constructor that takes color and radius parameters. It calls the superclass constructor using super(color, radius), which initializes both the color and radius properties inherited from Circle.

//--> We create a new instance of ColoredCircle called coloredCircle, passing "blue" as the color and 5 as the radius.

//--> We call the getColor() method on the coloredCircle instance. Since coloredCircle is an instance of ColoredCircle, JavaScript looks for the getColor() method in ColoredCircle first. If it's not found there, it continues up the inheritance chain. In this case, it finds the getColor() method in the superclass Shape, which simply returns the color property of the instance. So, it returns "blue".