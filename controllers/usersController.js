const ErrorHandler = require("../utils/ErrorHandler");
const userSchema = require("../models/usersModel");

//register
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userSchema.create({
      name,
      email,
      password,
      avatar: {
        public_id: "this is demo id",
        url: "profile_link",
      },
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

// Get User Detail
exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.user.id);
    if (!user) {
      return next(new ErrorHandler("user is not found", 404));
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
