const http = require("http");
const fs = require("fs");
const path = require("path");

const middleWareStack = [];

const server = http.createServer((req, res) => {
    executeMiddlewares(req, res);
});

server.listen(3000, () => {
    console.log("Server started on port 3000");
});


function use(middleWare) {
    middleWareStack.push(middleWare);
}


function executeMiddlewares(req,res){
    let index = 0;
    function next(){
        if(index < middleWareStack.length) {
            let middleware = middleWareStack[index];
            index++;
            middleware(req, res, next);
        }
    }
    next();
}


function logger(req, res, next){
    console.log(`Client: ${req.socket.remoteAddress}`);
    console.log(`Access Type: ${req.method}`);
    console.log(`Request made: ${req.url}`);
    console.log(`Request Body: ${JSON.stringify(req.headers)}`);
    console.log(`Time of Request: ${new Date().toISOString()}`);
    next();
}


function checkAvailability(req, res, next) {
    const dataDir= path.join(__dirname, "Data", req.url);
    console.log(dataDir);
    fs.open(dataDir,(err) => {
        if(err){
            console.log("File not found");
            res.setHeader("Content-type","text/plain");
            res.end("We got Nothing");
        }
        else{
            next();
        }
    });

}

function getData(req, res, next) {
    const dataDir= path.join(__dirname, "Data", req.url);
    let filetype = path.extname(req.url).toLocaleLowerCase();
    fs.readFile(dataDir,(err, data) => {
        if (filetype === ".xml") {
            res.writeHead(200, {"Content-Type": "application/xml"});
            res.end(data);
        }
        else if(filetype === ".json") {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(data);
        }
        else if(filetype === ".pdf") {
            res.writeHead(200, {"Content-Type": "application/pdf"});
            res.end(data);
        }
        else{
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end("File not Supported");
        }
    });
    next();
}

use(logger)
use(checkAvailability);
use(getData);
