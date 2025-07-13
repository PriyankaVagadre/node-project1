const Student = require('../models/student');

async function handleGetAllStudents(req, res){
    const response = await Student.find({})
    return res.status(200).json(response);
}

async function handleGetStudentById(req,res){
    const student = await Student.findById(req.params.id);
    return res.json(student);
  }

async function handlePatchStudentById(req,res) {
    const result = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email:req.body.email,
        gender:req.body.gender
    };
    
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, result)
    return res.status(203).json({status: 'updated Value', response: updatedStudent})
}

async function handleDeleteStudentById(req,res){
    const deletedId = await Student.findByIdAndDelete(req.params.id);
    return res.status(200).json({status:'Deleted', deletedId: deletedId})
}

async function handelPostStudent(req,res) {
  if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.gender){
    return res.status(400).json({status: 'ALL fields are required'})
  }

  const result = await Student.create({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email:req.body.email,
    gender:req.body.gender
  })

  console.log('result', result)
  return res.status(201).json({status: 'success'})
}

module.exports = {
    handleGetAllStudents,
    handleGetStudentById,
    handlePatchStudentById,
    handleDeleteStudentById,
    handelPostStudent
}