const express = require('express');

const {connectMongoDB} = require('./connection')

const studentRouter = require('./routers/student')

const {logReqRes} = require('./middlewares')

const app = express();
const port = 3000;

//connect MongoDB
connectMongoDB('mongodb://127.0.0.1:27017/students').then(()=> console.log('DB started'))
 
//middleware to maintain a log
app.use(logReqRes('log.txt'))

//routers
app.use(express.urlencoded({extended:false}))
app.use('/students', studentRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});