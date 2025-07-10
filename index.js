const express = require('express');

const students = require('./MOCK_DATA.json');

const fs = require('fs');


const app = express();
const port = 3000;

app.use(express.urlencoded({extended:false}))


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
  const student = req.body;

  students.push({...student, id: students.length+1});

  fs.writeFile('./MOCK_DATA.json', JSON.stringify(students), (err,res)=>{
    console.log(res)
  })

  return res.json({status: 'success', studentId: students.length })
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
    const id = Number(req.params.id);
    const body = req.body;
    let studentArr = students.map(item => item.id === id ? body : item);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(studentArr), () => {
      res.json({status: 'PATCH', id: id});
    });
  })
.delete((req,res)=>{
    //DELETE 1 student
    const id = Number(req.params.id)
    let studentArr = students.filter(student=> student.id !== id);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(studentArr), () => {
      // return res.json({status: 'DELETED', id: id})
    })
    
  })

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});