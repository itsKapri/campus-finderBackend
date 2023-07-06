const express =require('express');
const { getAllColleges, createCollegeList,updateCollegeList ,deleteCollegeList,getbyidCollegeList} = require('../controllers/collegeController');
const router=express.Router();



router.route("/colleges").get(getAllColleges)
router.route("/college/new").post(createCollegeList)
router.route("/college/:id").put(updateCollegeList).delete(deleteCollegeList).get(getbyidCollegeList)



module.exports=router;