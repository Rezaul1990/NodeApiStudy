const express = require('express');
const router = express.Router();
const controller = require('../controllers/profileController');
const upload = require('../middleware/upload');

// POST with image upload
router.post('/', upload.single('profilePhoto'), controller.createProfile);

// PUT with image upload
router.put('/:id', upload.single('profilePhoto'), controller.updateProfile);

// Other routes
router.get('/', controller.getAllProfiles);
router.get('/:id', controller.getProfileById);
router.delete('/:id', controller.deleteProfile);

module.exports = router;
