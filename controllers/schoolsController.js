const schoolsSchema=require('../models/schoolModels');
const ErrorHandler = require('../utils/ErrorHandler');

exports.getAllSchools = async (req, res,next) => {
  try {
    const schoolList = await schoolsSchema.find();
    if(!schoolList){
      return next(new ErrorHandler("school is not found",404))
    }
    console.log(schoolList.length);
    res.status(200).json({
      success: true,
      schoolList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

exports.createSchoolList = async (req, res,next) => {
  try {
    const newSchool = await schoolsSchema.create(req.body);
    if(!newSchool){
      return next(new ErrorHandler("school is not found",404))
    }
    res.status(201).json({
      success: true,
      newSchool,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

exports.updateSchoolList = async (req, res,next) => {
  try {
    const updatedSchool = await schoolsSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    if (!updatedSchool) {
      return next(new ErrorHandler("school is not found",404))
    }
    res.status(200).json({
      success: true,
      updatedSchool,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

exports.deleteSchoolList = async (req, res,next) => {
  try {
    const deletedSchool = await schoolsSchema.findByIdAndDelete(req.params.id);
    if (!deletedSchool) {
      return next(new ErrorHandler("school is not found",404))
    }
    res.status(200).json({
      success: true,
      message: 'School deleted',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

exports.getSchoolById = async (req, res,next) => {
  try {
    const school = await schoolsSchema.findById(req.params.id);
    if (!school) {
      return next(new ErrorHandler("school is not found",404))
    }
    res.status(200).json({
      success: true,
      school,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
