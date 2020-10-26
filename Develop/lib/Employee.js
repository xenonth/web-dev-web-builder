// TODO: Write code to define and export the Employee class
/*
*/
const inquirer = require("inquirer");

class Employee {
    constructor (name, id, email) {
        // error catching if not all constructor fields are met.
        if (!name) {
            throw new Error("You are missing the name.");
        }
        if (!id) {
            throw new Error("You are missing the employee's id.");
        }
        if (!email) {
            throw new Error("You are missing the employee's email.");
        }

        this.name = name;
        this.id = id;
        this.email = email;
    }
    // name retrieval
    getName() {
        console.log(`Employee's name is ${this.name}`);
    }
    
    //id setter
    getId() {
        console.log(`Employee's ID is ${this.id}`)
    }
    // email setter using inquirer.
    getId() {
        console.log(`Employee's email is${this.email}`)
    }
    getRole() {
        return Employee ();
    }

}
module.exports.Employee = Employee ();
