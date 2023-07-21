const express = require('express');
const router = express.Router();
const { savecollege ,fetchCollege,deletesavecollege} = require('../controllers/saveCollegeController'); 
const authMiddleware = require('../middleware/auth');

router.route('/').get(authMiddleware,fetchCollege);
router.route('/:id').post(authMiddleware,savecollege)
router.route('/:id').delete(authMiddleware,deletesavecollege)


module.exports = router;
