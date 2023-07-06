const collegesSchema = require('../models/collegesModels');


exports.getAllColleges = async (req, res) => {
    try {
        const collegeList = await collegesSchema.find();
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
            return res.status(404).json({
                success: false,
                message: 'College not found',
            });
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


exports.deleteCollegeList = async (req, res) => {
  try {
    const deletedCollege = await collegesSchema.findByIdAndDelete(req.params.id);
    if (!deletedCollege) {
      return res.status(404).json({
        success: false,
        message: 'College not found',
      });
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


exports.getbyidCollegeList = async (req, res) => {
  try {
    const college = await collegesSchema.findById(req.params.id);
    if (!college) {
      return res.status(404).json({
        success: false,
        message: 'College not found',
      });
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
