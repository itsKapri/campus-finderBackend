const ErrorHandler = require('../utils/ErrorHandler');
const saveCollegeSchema = require('../models/saveModels');
const collegesSchema = require('../models/collegesModels');

exports.savecollege = async (req, res) => {
  try {
    const id=req.params.id
    const college = await collegesSchema.findById(id);
    console.log("college",college.stringfy);
    const saveCollege = await saveCollegeSchema.create({
      college: college,
      user: req.user.id,
      username:req.user.name
    });
    console.log("savecollge ",JSON.stringify(college))
    res.status(201).json({
      success: true,
      saveCollege,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
exports.fetchCollege = async (req, res) => {
  const userId = req.user.id;
  try {
    const savedColleges = await saveCollegeSchema
      .find({ user: userId })
      .populate('college'); 
    res.status(200).json({
      success: true,
      savedColleges,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};


exports.deletesavecollege = async (req, res) => {
  const userId = req.user.id;
  try {
    const savedCollege = await saveCollegeSchema.findByIdAndDelete(req.params.id);
    if (!savedCollege) {
      return res.status(404).json({
        success: false,
        message: 'College not found in the saved colleges',
      });
    }

    res.status(200).json({
      success: true,
      message: 'College successfully removed from saved colleges',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};