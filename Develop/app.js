const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");

// values for psuhing team members to the array 
const teamArray = [];


// Write code to use inquirer to gather information about the development team members,

// and to create objects for each team member (using the correct classes as blueprints!)

//1. inquirer.prompt to call questions based on the class. 

const projectLeader = () => {
    inquirer.prompt([{
        name: "name",
        message: "What is your Name?",
        type: "input",
    },
    {
        name: "id",
        message: "What is your Employee's ID Number (must be a Number Input)?",
        type: "number",
    },
    {
        name: "email",
        message: "What is your Email Address for Contact?",
        type: "input"
    },
    {
        name: "officeNumber",
        message: "What is your Office Number, Where is it located?",
        type: "input",
    },

    ]) .then( data => {
        const projectLeader = new Manager(data.name, data.id, data.email, data.officeNumber);
        
        console.log(projectLeader);
        teamArray.push(projectLeader);

        memberSelection();

    }) .catch(error => {
        console.log(error);
        //invalid for number input

    })
}
// selector for other team members to trigger team member functions
let otherMembersPrompt = 
    {
        name: "otherMembers",
        message: "Are there Any other members in your team?",
        type: "list",
        choices: ['Intern','Engineer','Finished'],

    }

// function to trigger additional team member information based on the above selection.
function memberSelection () {
    inquirer.prompt(otherMembersPrompt).then((answers) => {
        if (answers.otherMembers === 'Engineer') {
            engineerTeamMember ();
        } else if (answers.otherMembers === 'Intern') {
            internTeamMember ();
        } else if (answers.otherMembers === 'Finished') {

            // Once Manager is done will build, render and construct html.
            console.log("Formatting team members");

            console.log("Contstructing team.html!")
        
            fs.writeFile(outputPath, render(teamArray), function(err) {
                if (err) {

                console.log(err)

                } else {
                    console.log("team.html has been successfully built!")
                }
            });
        }
    });
}
// seperate function to determine type to call employee type.

function engineerTeamMember() {
    // Inquirer.prompt for Engineer class
    inquirer.prompt([
        {
            name: "name",
            message: "What is your Name?",
            type: "input",
        },
        {
            name: "id",
            message: "What is your Employee's ID Number (must be a Number Input)?",
            type: "number",
        },
        {
            name: "email",
            message: "What is your Email Address for Contact?",
            type: "input"
        },
        {
            name: "github",
            message: "What is your github username?",
             type: "input",
        },
        
        ]) .then( data => {
                let engineer = new Engineer(data.name, data.id, data.email, data.github);

                teamArray.push(engineer)
                // calling for additional members
                memberSelection();
        }) .catch(error => {
                console.log(error);
        
            })

          } 
// function for intern functions
function internTeamMember () {
    inquirer.prompt([
        {
            name: "name",
            message: "What is your Name?",
            type: "input",
        },
        {
            name: "id",
            message: "What is your Employee's ID Number (must be a Number Input)?",
            type: "number",
        },
        {
            name: "email",
            message: "What is your Email Address for Contact?",
            type: "input"
        },
        {
            name: "school",
            message: "Which school are you from?",
                type: "input",
        },

        ]) .then( data => {
                let intern = new Intern(data.name, data.id, data.email, data.school);

                teamArray.push(intern);

                memberSelection()
        }) .catch(error => {
                console.log(error);
    
        })

} 
// to run the program
projectLeader();


/* 
After the user has input all employees desired, call the `render` function (required
 above) and pass in an array containing all employee objects; the `render` function will
 generate and return a block of HTML including templated divs for each employee! 
 */


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.



// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
