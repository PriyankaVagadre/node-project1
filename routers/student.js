const express = require('express');

const router = express.Router();

const {handleGetAllStudents,
    handleGetStudentById,
    handlePatchStudentById,
    handleDeleteStudentById,
    handelPostStudent
} = require('../controllers/student')

// router.get('/', handleGetAllStudents)

// router.post('/', handelPostStudent)

router.route('/').get(handleGetAllStudents).post(handelPostStudent)

router.route('/:id')
.get(handleGetStudentById)
.patch(handlePatchStudentById)
.delete(handleDeleteStudentById)

  module.exports = router;