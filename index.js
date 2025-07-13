const express = require('express');
const mongoose = require('mongoose');

const students = require('./MOCK_DATA.json');

const studentRouter = require('./routers/student')

const app = express();
const port = 3000;

//connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/students')
.then(()=> console.log('Mongo Connected'))
.catch((err)=> console.log('Mongo Error'))

app.use('/students', studentRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});