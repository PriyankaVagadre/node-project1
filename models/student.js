const mongoose = require('mongoose');

//Schema
const studentSchema = new mongoose.Schema({
  firstName :{
    type: String,
    required: true
  },
  lastName:{
    type:String,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  gender:{
    type: String,
  }
}, {timestamps:true}) 

//model
const Student = mongoose.model('StudentModel', studentSchema);

module.exports = Student;