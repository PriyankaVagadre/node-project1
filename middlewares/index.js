const fs  = require('fs');

function logReqRes(fileName){
    return (req, res, next)=>{
        fs.appendFile(fileName, `\nTime ${Date.now()} Method ${req.method} URL ${req.url}`, (err, data)=>{
            console.log(`Time ${Date.now()} Method ${req.method}\n`);
            next();
        })
    }
}

module.exports = {
    logReqRes
}