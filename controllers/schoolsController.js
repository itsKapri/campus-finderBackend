const schoolsSchema = require('../models/schoolModels');
const ErrorHandler = require('../utils/ErrorHandler');
const mongoose =require("mongoose")


exports.getAllSchools = async (req, res, next) => {
  try {
    const schoolList = await schoolsSchema.find();
    if (!schoolList) {
      return next(new ErrorHandler("school is not found", 404))
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

exports.createSchoolList = async (req, res, next) => {
  try {
    const newSchool = await schoolsSchema.create(req.body);
    if (!newSchool) {
      return next(new ErrorHandler("school is not found", 404))
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

exports.updateSchoolList = async (req, res, next) => {
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
      return next(new ErrorHandler("school is not found", 404))
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

exports.deleteSchoolList = async (req, res, next) => {
  try {
    const deletedSchool = await schoolsSchema.findByIdAndDelete(req.params.id);
    if (!deletedSchool) {
      return next(new ErrorHandler("school is not found", 404))
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

exports.getSchoolById = async (req, res, next) => {
  try {
    const school = await schoolsSchema.findById(req.params.id);
    if (!school) {
      return next(new ErrorHandler("school is not found", 404))
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

// Create New Review or Update the review
exports.createSchoolReview = 
  async (req, res) => {
    try {
      
      const { rating, comment, schools_Id } = req.body;
      // Validate schoolsId format
      if (!mongoose.isValidObjectId(schools_Id)) {
        return res.status(400).json({ success: false, message: 'Invalid schoolsId' });
      }
      const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };
      const school = await schoolsSchema.findById(schools_Id); 

      const isReviewed = school.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
      );

      if (isReviewed) {
        school.reviews.forEach((rev) => {
          if (rev.user.toString() === req.user._id.toString()) {
            rev.rating = rating;
            rev.comment = comment;
          }
        });
      } else {
        school.reviews.push(review);
      }

      let avg = 0;

      school.reviews.forEach((rev) => {
        avg += rev.rating;
      });
      school.ratings = avg / school.reviews.length;

      await school.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        message: 'Rating submitted successfully.',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
       
      });
    }
  },

// Get All Reviews of a school
exports.getschoolReviews = async (req, res, next) => {
  try {
    const schools = await schoolsSchema.find();
    if (!schools) {
      return next(new ErrorHandler('Schools not found', 404)); 
    }

    const reviewsAndRatings = schools.reduce((acc, school) => {
      if (school.reviews && school.reviews.length > 0) {
        acc.push({
          schoolId: school._id,
          reviews: school.reviews,
          ratings: school.ratings || 0,
        });
      }
      return acc;
    }, []);

    res.status(200).json({
      success: true,
      reviewsAndRatings: reviewsAndRatings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};



// Delete Review by Review ID
exports.deleteSchoolReview = async (req, res) => {
  try {
    const { schoolId, reviewId } = req.params;
    if (!mongoose.isValidObjectId(reviewId)) {
      return res.status(400).json({ success: false, message: 'Invalid schoolId or reviewId' });
    }
    const school = await schoolsSchema.findById(schoolId);
    if (!school) {
      return res.status(404).json({ success: false, message: 'School not found' });
    }
    const reviewIndex = school.reviews.findIndex((rev) => rev._id.toString() === reviewId);
    if (reviewIndex === -1) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    const review = school.reviews[reviewIndex];
    // Check if the review is associated with the current user
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'You are not authorized to delete this review' });
    }
    const test=school.reviews.splice(reviewIndex, 1);
    console.log(test);
    let avg = 0;
    school.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    school.ratings = school.reviews.length > 0 ? avg / school.reviews.length : 0;
    await school.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

