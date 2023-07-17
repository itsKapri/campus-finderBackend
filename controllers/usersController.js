  const ErrorHandler = require("../utils/ErrorHandler");
  const userSchema = require("../models/usersModel");
  const jwt = require('jsonwebtoken');

  //register
  exports.registerUser = async (req, res, next) => {
    try {
      const { name, email, password,avatar} = req.body;
      const newUser = await userSchema.create({
        name,
        email,
        password,
        avatar,
      });
      const token = newUser.getJWTToken();
      res.status(201).json({
        success: true,
        newUser,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

  // Login User
  exports.loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
      }
      const users = await userSchema.findOne({ email }).select("+password");
      if (!users) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }

      const isPasswordMatched = await users.comparePassword(password);
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }

      const token = users.getJWTToken();
      // options for cookie
      const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };

      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

  //logout
  exports.logoutUser = async (req, res) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "Logged Out",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

// Get user details
exports.getUserDetails = (req, res) => {
  try {
    if (!req.user) {
        return next(new ErrorHandler("please login", 401));
    }
    const { name, email, avatar } = req.user;
    res.status(200).json({
      success: true,
      data: {
        name,
        email,
        avatar,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


exports.editUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please log in to access this resource.",
      });
    }

    const { name, email, avatar } = req.body;

    // Validate and update user profile fields
    if (!name || !email || !avatar) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and avatar.",
      });
    }

    // Update user data in the database
    const updatedUser = await userSchema.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        avatar,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: {
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};