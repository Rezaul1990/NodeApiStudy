const express = require('express');
const router = express.Router();
const controller = require('../controllers/profileController');

router.post('/', controller.createProfile);
router.get('/', controller.getAllProfiles);
router.get('/:id', controller.getProfileById);
router.put('/:id', controller.updateProfile);
router.delete('/:id', controller.deleteProfile);

module.exports = router;
