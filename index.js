const express = require('express');

const students = require('./MOCK_DATA.json');

const app = express();
const port = 3000;

//Routes

app.get('/api/students', (req,res)=>{
  return res.json(students);
})

app.get('/students', (req,res)=>{
  const html = `
  <ul>
   ${students.map((student)=> `<li>${student.first_name}</li>`).join(',')}
  </ul>
  `;
  return res.send(html)
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});