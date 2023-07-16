const express =require('express');
const router=express.Router();
const {registerUser,loginUser,logoutUser,getUserDetails} =require('../controllers/usersController');


router.route("/newuser").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/users/:id").get(logoutUser)


module.exports=router;