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
        message: "What is your Manager's Name?",
        type: "input",
    },
    {
        name: "id",
        message: "What is your Employee's ID Number (must be a Number Input)?",
        type: "input",
        
    },
    {
        name: "email",
        message: "What is your Email Address for Contact?",
        type: "input"
    },
    {
        name: "officeNumber",
        message: "What is your Office Number?",
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
                    console.log("Success! You can find team.html in the output directory/folder")
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
