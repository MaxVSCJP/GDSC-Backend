const fs = require('fs');
const path = require('path');

let numberDir;

function addNumbers() {
    try {
        var numberDirName = "Number";
        numberDir = path.join(__dirname, numberDirName);
        var files = fs.readdirSync(numberDir, "utf-8");
    }
    catch (error){
        console.log(`No Directory of name "${numberDirName}"`);
        errorLogger(error, `Directory ${numberDirName}`);
        return;
    }


    files.forEach((file) => {
        fs.readFile(path.join(numberDir, file), (err, data) => {
            if (err){
                console.log("Failed to read file");
                errorLogger(err, file);
            }
            else {
                console.log(data);
                let nums = data.toString().split("\n");
                let numArray = nums.map(n => {
                    if(isNaN(parseInt(n))){
                        return undefined;
                    }
                    return parseInt(n.replace("\r", ""));
                });
                numArray = numArray.filter(n => n !== undefined);
                let sum = numArray.reduce((a, b) => a + b);
                console.log(sum);
            }
        });
    });
}


function errorLogger(err, file){
    let log = `
    Error Message: ${err.message}
    Error Location: ${err.location}
    Error Source: ${path.basename(file)}
    Time of Error: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
    
    `
    fs.appendFile(path.join(__dirname, "ErrorLogs.txt"), log, (err) => {
        if (err) {
            console.log("Failed to Log Error");
        }
    });
}

addNumbers();