const collegesSchema = require('../models/collegesModels');
const ErrorHandler = require('../utils/ErrorHandler');
const { search, filter } = require('../utils/apiFeatures');

exports.createCollegeList = async (req, res) => {
    try {
        const collegeList = await collegesSchema.create(req.body);
        res.status(201).json({
            success: true,
            collegeList,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};


exports.getAllColleges = async (req, res,next) => {
    try {
      let query = collegesSchema.find();
     query = search(query, req.query);
     query = filter(query, req.query);

    const collegeList = await query;
        if (!collegeList) {
          return next(new ErrorHandler("collegeList is not found",404))
      }
      console.log(collegeList.length);
        res.status(200).json({
            success: true,
            collegeList,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};


exports.updateCollegeList = async (req, res, next) => {
    try {
        const updatedCollege = await collegesSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );
        if (!updatedCollege) {
          return next(new ErrorHandler("College not found",404))
        }
        res.status(200).json({
            success: true,
            updatedCollege,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};


exports.deleteCollegeList = async (req, res,next) => {
  try {
    const deletedCollege = await collegesSchema.findByIdAndDelete(req.params.id);
    if (!deletedCollege) {
      return next(new ErrorHandler("College not found",404))
    }
    res.status(200).json({
      success: true,
      message: 'College deleted',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};


exports.getbyidCollegeList = async (req, res,next) => {
  try {
    const college = await collegesSchema.findById(req.params.id);
    if (!college) {
      return next(new ErrorHandler("college is not found",404))
    }
    res.status(200).json({
      success: true,
      college,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
