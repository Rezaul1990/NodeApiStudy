const express = require('express');
const { createClass,updateClass, deleteClass, getAllClasses,enrollInClass,getMyEnrolledClasses,getClassesWithEnrollments } = require('../controllers/classController');

const router = express.Router();


router.get('/', getAllClasses); 
router.post('/enroll/:classId', enrollInClass);
router.get('/user-enroll-class', getMyEnrolledClasses); 
router.get('/admin-enroll-class', getClassesWithEnrollments);


router.post('/', createClass);
router.put('/:id', updateClass); 
router.delete('/:id', deleteClass);



module.exports = router;
