const express = require('express');
const path = require('path');
const {exec} = require('child_process');
const async = require('async');
const port = 6969;


const server = express();

server.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});
  
async.series([
    ()=> {
        console.info("building resume template");
        exec('npm run build')
    },
    server.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    })
]);

function getDir(dir){
    return path.join(__dirname,dir);
};