const express = require('express');
const router = express.Router();
const { saveSchool,fetchSchool,deletesaveschool} = require('../controllers/saveSchoolController'); 
const authMiddleware = require('../middleware/auth');

router.route('/').get(authMiddleware,fetchSchool);
router.route('/:id').post(authMiddleware,saveSchool)
router.route('/:id').delete(authMiddleware,deletesaveschool)


module.exports = router;
