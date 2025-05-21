const express = require('express');
const router = express.Router();
const {
  createCoach,
  getCoaches,
  updateCoach,
  deleteCoach,
} = require('../controllers/coachController');

router.post('/', createCoach);
router.get('/', getCoaches);
router.put('/:id', updateCoach);
router.delete('/:id', deleteCoach);

module.exports = router;
