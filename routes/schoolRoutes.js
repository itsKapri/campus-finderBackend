const express =require('express');

const {getAllSchools}=require('../controllers/schoolsController')
const router=express.Router();

router.route("/school").get(getAllSchools)

module.exports=router;