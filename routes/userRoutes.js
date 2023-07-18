const express =require('express');
const router=express.Router();
const {registerUser,loginUser,logoutUser,getUserDetails,editUserProfile} =require('../controllers/usersController');
const authMiddleware = require('../middleware/auth');

router.route("/newuser").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)

router.route("/user/edit/").put( authMiddleware, editUserProfile);
router.route("/users/getUserDetails").get(authMiddleware,getUserDetails)

module.exports=router;