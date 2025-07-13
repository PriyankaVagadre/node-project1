const express = require('express');

const {connectMongoDB} = require('./connection')

const studentRouter = require('./routers/student')

const app = express();
const port = 3000;

//connect MongoDB
connectMongoDB('mongodb://127.0.0.1:27017/students')

app.use((req,res,next)=>{
  console.log('Request received at:', new Date().toLocaleString());
  next();
 })
 
 app.use((req,res,next)=>{
   console.log('Request method: 2', req.method);
   next();
 })
 
 //add a middleware to maintain a log
 
//  app.use((req,res,next) =>{
 
//    fs.appendFile('log.txt', `\nTime ${Date.now()} Method ${req.method} URL ${req.url}`, (err, data)=>{
//     console.log(`Time ${Date.now()} Method ${req.method}\n`);
//     next();
//    })
//  })

app.use('/students', studentRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});