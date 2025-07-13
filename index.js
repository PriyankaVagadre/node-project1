const express = require('express');
const mongoose = require('mongoose');

const students = require('./MOCK_DATA.json');

const Student = require('./models/student')

const fs = require('fs');

const app = express();
const port = 3000;

//connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/students')
.then(()=> console.log('Mongo Connected'))
.catch((err)=> console.log('Mongo Error'))

app.use(express.urlencoded({extended:false}))

//middleware

app.use((req,res,next)=>{
 console.log('Request received at:', new Date().toLocaleString());
 next();
})

app.use((req,res,next)=>{
  console.log('Request method: 2', req.method);
  next();
})

//add a middleware to maintain a log

app.use((req,res,next) =>{

  fs.appendFile('log.txt', `\nTime ${Date.now()} Method ${req.method} URL ${req.url}`, (err, data)=>{
   console.log(`Time ${Date.now()} Method ${req.method}\n`);
   next();
  })
})

//Routes

app.get('/students', (req,res)=>{
  const html = `
  <ul>
   ${students.map((student)=> `<li>${student.first_name}</li>`).join(',')}
  </ul>
  `;
  return res.send(html)
})

app.get('/api/students', async (req,res)=>{
  console.log(req.headers)
  res.setHeader('x-myHeader','CustomHeader')

  const response = await Student.find({})

  return res.status(200).json(response);
})

app.post('/api/students', async (req,res)=>{
  //POST 1 student
  const student = req.body;

  if(!req.body || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.gender){
    return res.status(400).json({status: 'ALL fields are required'})
  }

  const result = await Student.create({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email:req.body.email,
    gender:req.body.gender
  })



 
  // students.push({...student, id: students.length+1});

  // fs.writeFile('./MOCK_DATA.json', JSON.stringify(students), (err,res)=>{
  //   console.log(res)
  // })

  console.log('result', result)
  return res.status(201).json({status: 'success'})
})

// app.get('/api/students/:id', (req,res)=>{
//   const id = Number(req.params.id);
//   const student = students.find((student)=> student.id === id);
//   return res.json(student);
// })

// app.patch('/api/students/:id', (req,res)=>{
//   //PATCH 1 student
//   return res.json({status: 'PATCH Pending'})
// })

// app.delete('/api/students/:id', (req,res)=>{
//   //DELETE 1 student
//   return res.json({status: 'DELETE Pending'})
// })

//group the top 3 method in one

app.route('/api/students/:id')
.get(async (req,res)=>{
    // const id = Number(req.params.id);
    // const student = students.find((student)=> student.id === id);
    // if(!student){
    //   return res.status(404).json({error: 'Student not found'})
    // }

    const student = await Student.findById(req.params.id);
    return res.json(student);
  })
.patch(async (req,res)=>{
    //PATCH 1 student
    // const id = Number(req.params.id);
    // const body = req.body;
    // let studentArr = students.map(item => item.id === id ? body : item);
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(studentArr), () => {
    //   res.json({status: 'PATCH', id: id});
    // });
    const result = {
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email:req.body.email,
      gender:req.body.gender
    };

    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, result)
    return res.status(203).json({status: 'updated Value', response: updatedStudent})
  })
.delete(async(req,res)=>{
    //DELETE 1 student
    // const id = Number(req.params.id)
    // let studentArr = students.filter(student=> student.id !== id);

    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(studentArr), () => {
    //   // return res.json({status: 'DELETED', id: id})
    // })
    const deletedId = await Student.findByIdAndDelete(req.params.id);
    return res.status(200).json({status:'Deleted', deletedId: deletedId})
  })

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});