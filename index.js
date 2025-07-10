const express = require('express');

const students = require('./MOCK_DATA.json');

const app = express();
const port = 3000;

//Routes

app.get('/students', (req,res)=>{
  const html = `
  <ul>
   ${students.map((student)=> `<li>${student.first_name}</li>`).join(',')}
  </ul>
  `;
  return res.send(html)
})

app.get('/api/students', (req,res)=>{
  return res.json(students);
})

app.post('/api/students', (req,res)=>{
  //POST 1 student
  return res.json({status: 'POST Pending'})
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
.get((req,res)=>{
    const id = Number(req.params.id);
    const student = students.find((student)=> student.id === id);
    return res.json(student);
  })
.patch((req,res)=>{
    //PATCH 1 student
    return res.json({status: 'PATCH Pending'})
  })
.delete((req,res)=>{
    //DELETE 1 student
    return res.json({status: 'DELETE Pending'})
  })

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});