const express = require('express');

const students = require('./MOCK_DATA.json');

const app = express();
const port = 3000;

//Routes

app.get('/students', (req,res)=>{
  return res.json(students);
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});