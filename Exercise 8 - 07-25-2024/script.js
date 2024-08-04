const fs = require("fs");

fs.watch("command.txt", "utf-8", () => {
    fs.readFile("command.txt", "utf8", (err, data) => {
        if (err) {console.log(err)}
        else{
            console.log(data);
            handleCommands(data);
        }

    })
});

function handleCommands(data){
    if(data.includes("create")){
        createFile(data);
    }
    else if(data.includes("delete")){
        deleteFile(data);
    }
    else if(data.includes("rename")){
        renameFile(data);
    }
    else if(data.includes("add to")){
        addToFile(data);
    }
    else{
        console.log("Unknown command");
    }
}

function createFile(data){
    console.log(data);
    let dataList = data.split(" ");
    console.log(dataList);
    let newFileName = dataList[dataList.length-1];
    console.log(newFileName);
    fs.writeFile(`./${newFileName}`, "", (err) => {
        if (err) console.log(err);
        else console.log("File Created");
    });
}


function deleteFile(data){
    let dataList = data.split(" ");
    let newFileName = dataList[dataList.length-1];
    fs.unlink(`./${newFileName}`, (err) => {
        if (err) console.log(err);
        else console.log("File Deleted");
    });
}


function renameFile(data){
    let dataList = data.split(" ");
    let oldFileName = dataList[dataList.length-3];
    let newFileName = dataList[dataList.length-1];
    fs.rename(`./${oldFileName}`, `./${newFileName}`, (err) => {
        if (err) console.log(err);
        else console.log("File Renamed");
    });
}


function addToFile(data){
    let dataList = data.split(" ")
    let newFileIndex = dataList.findIndex((item) => item.includes("."));
    let newFileName = dataList[newFileIndex];
    let dataWritten = ""
    dataWritten = dataList.reduce((accum, item) => {
        if(dataList.indexOf(item) > newFileIndex){
            return accum + " " + item;
        }
    });
    fs.writeFile(`./${newFileName}`, dataWritten.substring(10),(err) => {
        if (err) console.log(err);
        else console.log("File Written to");
    });
}