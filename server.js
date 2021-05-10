const express = require('express');
const path = require('path');
const {exec} = require('child_process');
const async = require('async');
const port = 6969;
const fs = require("fs");
const fsp = fs.promises;

const server = express();
const publicPath = './public';

server.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});

(async ()=> {  
    if (!fs.existsSync(publicPath)){
        await fsp.mkdir(publicPath);
        console.log("public folder created");
    }
    console.info("building resume template");
    const child = exec('npm run build');
    await promiseFromChildProcess(child);
    server.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    })
})();

function getDir(dir){
    return path.join(__dirname,dir);
};

function promiseFromChildProcess(child) {
    return new Promise(function (resolve, reject) {
        child.addListener("error", reject);
        child.addListener("exit", resolve);
    });
}