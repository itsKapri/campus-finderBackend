const jwt = require('jsonwebtoken');
const userSchema = require('../models/usersModel');
const ErrorHandler = require('../utils/ErrorHandler');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return next(new ErrorHandler('Please log in to access this resource.', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userSchema.findById(decoded.id);

    if (!user) {
      return next(new ErrorHandler('User not found.', 404));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler('Invalid token. Please log in again.', 401));
  }
};

module.exports = authMiddleware;
