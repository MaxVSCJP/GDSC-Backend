const readline = require("readline");

const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

const fl = require("fs");

const path = require("path");

const filePath = path.join(__dirname, "employeeRecords.json");


let EmployeeCatalog; 
let employeeArray = [];

fl.readFile(filePath, (err, data) => {
    if (err) {
        console.log("error ocurred")
        throw err;
    }
    else {
        EmployeeCatalog = data.toString();
        console.log(EmployeeCatalog);
        employeeArray = JSON.parse(EmployeeCatalog);
        main();
    }
});


function saveEmployeeRecords(){
    fl.writeFile(filePath, EmployeeCatalog, (err) => {
        if (err) throw err;
        console.log("Employee records saved successfully");
        });
}

function addEmployee(id, name, position, department){
    for (const emp of employeeArray) {
        if(id == emp.id){
            console.log("Employee ID taken");
            return -1;
        }
    }
    let employee = {
        id: id,
        name: name,
        position: position,
        department: department
    }
    employeeArray.push(employee);
    EmployeeCatalog = JSON.stringify(employeeArray);
    console.log("Employee Added Successfully");
}

function listEmployees(){
    for (const emp of employeeArray) {
        console.log(`ID: ${emp.id}`);
        console.log(`Name: ${emp.name}`);
        console.log(`Position: ${emp.position}`);
        console.log(`Department: ${emp.department}`);
    }
}

function findEmployee(id){
    let empNotFound = true;
    for (const emp of employeeArray) {
        if (emp.id == id) {
            empNotFound = false;

            console.log(`ID: ${emp.id}`);
            console.log(`Name: ${emp.name}`);
            console.log(`Position: ${emp.position}`);
            console.log(`Department: ${emp.department}`);

            return emp;
        }
    }
    if (empNotFound) {
        console.log(`No such Employee with ID: ${id}`);
        return null;
    }
}

function updateEmployee(id, newName, nwPosition, newDepartment){
    let emp = findEmployee(id);
    if (emp == null) {
        console.log(`No such Employee with ID: ${id}`);
    }
    else{
        emp.name = newName;
        emp.position = nwPosition;
        emp.department = newDepartment;
        console.log("Employee Updated Successfully");
    }
    EmployeeCatalog = JSON.stringify(employeeArray);
}

function deleteEmployee(id){
    let emp = findEmployee(id);
    if (emp == null) {
        console.log(`No such Employee with ID: ${id}`);
    }
    else{
        employeeArray.splice(employeeArray.indexOf(emp), 1);
        console.log("Employee Deleted Successfully");
    }
    EmployeeCatalog = JSON.stringify(employeeArray);
    
}

function main(){
    console.log("What would you like to do?");
    console.log("1. Add Employee");
    console.log("2. List all Employees");
    console.log("3. Find Employee");
    console.log("4. Update Employee");
    console.log("5. Delete Employee");
    console.log("6. Exit");
    
    rl.question("Choose!", (answer) => {
        let id;
        let name;
        let position;
        let department;
        switch (answer) {
            case "1":
                rl.question("Enter Employee ID: ", (id) => {
                    rl.question("Enter Employee Name: ", (name) => {
                        rl.question("Enter Employee Position: ", (position) => {
                            rl.question("Enter Employee Department: ", (department) => {
                                addEmployee(id, name, position, department);
                                main();
                            });
                        });
                    });
                });
                break;


            case "2":
                listEmployees();
                main();
                break;


            case "3":
                rl.question("Enter Employee ID: ", (id) => {
                    findEmployee(id);
                    main();
                });

                findEmployee(id);
                main();
                break;


            case "4":
                rl.question("Enter Employee ID: ", (id) => {
                    rl.question("Enter New Name: ", (name) => {
                        rl.question("Enter New Position: ", (position) => {
                            rl.question("Enter New Department: ", (department) => {
                                updateEmployee(id, name, position, department);
                                main();
                            });
                        });
                    });
                });
                break;

            case "5":
                rl.question("Enter Employee ID: ", (id) => {
                    findEmployee(id);
                    main();
                });

                deleteEmployee(id);
                main();
                break;

            case "6":
                console.log("Goodbye!");
                saveEmployeeRecords();
                return 0;

            default:
                console.log("Invalid Input");
                main();
        }
    }); 
}
