const collegesSchema = require('../models/collegesModels');
const ErrorHandler = require('../utils/ErrorHandler');
const { search, filter } = require('../utils/apiFeatures');
const mongoose = require('mongoose');

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


exports.createCollegeReview = async (req, res) => {
  try {
    const { rating, comment, collegeId } = req.body;
    // Validate collegeId format
    if (!mongoose.isValidObjectId(collegeId)) {
      return res.status(400).json({ success: false, message: 'Invalid collegeId' });
    }
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const college = await collegesSchema.findById(collegeId);
    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }

    const isReviewed = college.reviews.find((rev) => rev.user.toString() === req.user._id.toString());
    if (isReviewed) {
      college.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      college.reviews.push(review);
    }
    let avg = 0;
    college.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    college.ratings = avg / college.reviews.length;
    await college.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: 'Rating submitted successfully.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

exports.getCollegeReviews = async (req, res, next) => {
  try {
    const colleges = await collegesSchema.find();
    if (!colleges) {
      return next(new ErrorHandler('Colleges not found', 404)); 
    }
    const reviewsAndRatings = colleges.reduce((acc, college) => {
      if (college.reviews && college.reviews.length > 0) {
        acc.push({
          collegeId: college._id,
          reviews: college.reviews,
          ratings: college.ratings || 0,
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



//delete the review
exports.deleteCollegeReview = async (req, res) => {
  try {
    const { collegeId, reviewId } = req.params;
    if (!mongoose.isValidObjectId(reviewId)) {
      return res.status(400).json({ success: false, message: 'Invalid collegeId or reviewId' });
    }
    const college = await collegesSchema.findById(collegeId);
    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }
    const reviewIndex = college.reviews.findIndex((rev) => rev._id.toString() === reviewId);
    if (reviewIndex === -1) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    const review = college.reviews[reviewIndex];

    // Check if the review is associated with the current user
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'You are not authorized to delete this review' });
    }

    college.reviews.splice(reviewIndex, 1);
    let avg = 0;
    college.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    college.ratings = college.reviews.length > 0 ? avg / college.reviews.length : 0;
    await college.save({ validateBeforeSave: false });
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
