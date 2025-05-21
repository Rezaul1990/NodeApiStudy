const express = require('express');
const { createClass,updateClass, deleteClass, getAllClasses } = require('../controllers/classController');

const router = express.Router();

router.post('/', createClass);
router.get('/', getAllClasses); 
router.put('/:id', updateClass); 
router.delete('/:id', deleteClass);



module.exports = router;
