let EmployeeCatalog;

let employeeArray = JSON.parse(EmployeeCatalog);

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
    }
    EmployeeCatalog = JSON.stringify(employeeArray);
}