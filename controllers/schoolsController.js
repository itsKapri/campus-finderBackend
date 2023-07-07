const schoolsSchema=require('../models/schoolModels');

exports.getAllSchools = async (req, res) => {
  try {
    const schoolList = await schoolsSchema.find();
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

exports.createSchoolList = async (req, res) => {
  try {
    const newSchool = await schoolsSchema.create(req.body);
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

exports.updateSchoolList = async (req, res) => {
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
      return res.status(404).json({
        success: false,
        message: 'School not found',
      });
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

exports.deleteSchoolList = async (req, res) => {
  try {
    const deletedSchool = await schoolsSchema.findByIdAndDelete(req.params.id);
    if (!deletedSchool) {
      return res.status(404).json({
        success: false,
        message: 'School not found',
      });
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

exports.getSchoolById = async (req, res) => {
  try {
    const school = await schoolsSchema.findById(req.params.id);
    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found',
      });
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
