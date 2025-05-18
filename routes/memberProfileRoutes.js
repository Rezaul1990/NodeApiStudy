const express = require('express');
const router = express.Router();
const controller = require('../controllers/memberProfileController');

router.post('/', controller.createMemberProfile);
router.get('/', controller.getAllMemberProfiles);

module.exports = router;
