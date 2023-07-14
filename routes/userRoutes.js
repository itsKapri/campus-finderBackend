const express =require('express');
const router=express.Router();
const {registerUser,loginUser} =require('../controllers/usersController');


router.route("/newuser").post(registerUser);
router.route("/login").post(loginUser)


module.exports=router;