const express =require('express');

const {getAllSchools,createSchoolList,updateSchoolList,deleteSchoolList,getSchoolById}=require('../controllers/schoolsController')
const router=express.Router();

router.route("/school").get(getAllSchools)
router.route("/school/new").post(createSchoolList)
router.route("/school/:id").put(updateSchoolList).delete(deleteSchoolList).get(getSchoolById)

module.exports=router;