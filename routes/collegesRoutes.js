const express =require('express');
const { getAllColleges, createCollegeList,updateCollegeList ,deleteCollegeList,getbyidCollegeList,createCollegeReview,getCollegeReviews,deleteCollegeReview} = require('../controllers/collegeController');
const router=express.Router();

const authMiddleware = require('../middleware/auth');

router.route("/colleges").get(getAllColleges)
router.route("/college/new").post(createCollegeList)
router.route("/college/review").put(authMiddleware,createCollegeReview);
router.route("/college/reviews").get(getCollegeReviews)

router.route("/college/:collegeId/review/:reviewId").delete(authMiddleware,deleteCollegeReview)
router.route("/college/:id").put(updateCollegeList).delete(deleteCollegeList).get(getbyidCollegeList)



module.exports=router;