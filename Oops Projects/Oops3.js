// Question 3: Accessing Parent Class Methods
// Consider the following

class Vehicle {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }
    getInfo() {
        return `Make: ${this.make}, Model: ${this.model}`;
    }
}

class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model);
        this.year = year;
    }
    getInfo() {
        return `${super.getInfo()}, Year: ${this.year}`;
    }
}

let myCar = new Car('Toyota', 'Camry', 2020);
console.log(myCar.getInfo());


//--------- Output ---------
// Make: Toyota, Model: Camry, Year: 2020


// --------- Explanation --------- 

//--> We define a class Vehicle with a constructor that takes make and model parameters. Inside the constructor, we assign the make and model parameters to the respective instance variables this.make and this.model.

//--> The Vehicle class has a method getInfo(), which returns a string containing information about the vehicle's make and model.

//--> We define a subclass Car that extends the Vehicle class using the extends keyword. This means that Car inherits the properties and methods of Vehicle.

//--> The Car class has its own constructor that takes make, model, and year parameters. It calls the superclass constructor using super(make, model), which initializes the make and model properties inherited from Vehicle. It then initializes its own year property with the provided value.

//--> The Car class also overrides the getInfo() method inherited from Vehicle. In the overridden method, it calls super.getInfo() to invoke the getInfo() method of the superclass (Vehicle), which returns the make and model information. Then it appends ", Year: " followed by the year property of the Car instance.

//--> We create a new instance of Car called myCar, passing "Toyota" as the make, "Camry" as the model, and 2020 as the year.

//--> We call the getInfo() method on the myCar instance. Since myCar is an instance of Car, JavaScript looks for the getInfo() method in Car first. It finds the overridden getInfo() method in Car, which returns a string combining the make, model, and year information.

//--> The super keyword is used to access methods of the parent class within the child class. In this code, super.getInfo() is used inside the Car class to call the getInfo() method of the Vehicle class, allowing the Car class to include the make and model information inherited from Vehicle in addition to its own year information.