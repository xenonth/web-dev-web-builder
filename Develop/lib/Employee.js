// TODO: Write code to define and export the Employee class
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
    // name setter argument
    nameSetter() {
        inquirer.prompt([{
            name: "name",
            message: "What is the team member's name?",
            type: "input",
        }]).then(function({name}) {
            console.log(name);
        })
        
        
    }


    //id setter

    // email setter using inquirer.

}
let newEmployee = new Employee (newEmployee.nameSetter(), 32, "test@test.com");
