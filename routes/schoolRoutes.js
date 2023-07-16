const express = require('express');

const { getAllSchools, createSchoolList, updateSchoolList, deleteSchoolList, getSchoolById, getschoolReviews, createSchoolReview } = require('../controllers/schoolsController')
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.route("/school").get(getAllSchools)
router.route("/school/new").post(createSchoolList)
router.route("/school/:id").put(updateSchoolList).delete(deleteSchoolList).get(getSchoolById)
router.route("/school/review/").put(authMiddleware,createSchoolReview);
router.route("/school/reviews").get(getschoolReviews)
module.exports = router;