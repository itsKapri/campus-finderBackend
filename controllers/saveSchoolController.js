const ErrorHandler = require('../utils/ErrorHandler');
const saveSchoolSchema=require('../models/saveSchoolModel')
const schoolsSchema = require('../models/schoolModels');

exports.saveSchool = async (req, res) => {
  try {
    const id = req.params.id;
    const school = await schoolsSchema.findById(id);
    const isSchoolSaved = await saveSchoolSchema.exists({ school: id, user: req.user.id });
    if (isSchoolSaved) {
      return res.status(200).json({
        success: true,
        message: 'Already saved',
      });
    }
    const saveCollege = await saveSchoolSchema.create({
      school: school,
      user: req.user.id,
      username: req.user.name,
    });
    res.status(201).json({
      success: true,
      message: 'School successfully saved',
      saveCollege,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

exports.fetchSchool = async (req, res) => {
  const userId = req.user.id;
  try {
    const savedSchools = await saveSchoolSchema
      .find({ user: userId })
      .populate('school'); 
    res.status(200).json({
      success: true,
      savedSchools,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};


exports.deletesaveschool = async (req, res) => {
  const userId = req.user.id;
  try {
    const savedSchool = await saveSchoolSchema.findByIdAndDelete(req.params.id);
    if (!savedSchool) {
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